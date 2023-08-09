import React,{useRef,useEffect,useState} from 'react'
import styled from 'styled-components'
import { addDoc, collection, deleteDoc, onSnapshot,updateDoc,doc,getDoc,where,getDocs,query,setDoc} from 'firebase/firestore';
import {db} from '../server/firebase'
import {servers} from '../server/iceservers'
import {useRecoilState} from 'recoil'
import {videocheck} from '../server/atoms'
import { useParams } from 'react-router-dom';


const Video = () => {
  const [users, setUsers] = useState([]);
  const [mode,setMode] = useState('')
  const [video,setVideo] = useRecoilState(videocheck); 
  let gridCol =users.length === 1 ? 1 : users.length <= 4 ? 2 : 4;
  let gridColSize = users.length <= 4 ? 1 : 2;
  let gridRowSize = users.length <= 4 ? users.length: Math.ceil(users.length / 2);
  const nickname = localStorage.getItem('nickname')
  const localRef = useRef();
  const remoteRef = useRef();
  const {roomId} = useParams();
  const pc = new RTCPeerConnection(servers);

 
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'chatuser'), (snapshot) => {
      const userArray = [];
      snapshot.forEach((doc) => {
        userArray.push({ id: doc.id,...doc.data() });
      });
      setUsers(userArray);
    });
    const addUser = async () => {
      try {
        const userQuerySnapshot = await getDocs(
          query(collection(db, 'chatuser'), where('roomId', '==', roomId))
        );
        const userExists = !userQuerySnapshot.empty;

        !userExists ? setMode('create') : setMode('join')
  
        const docRef = await addDoc(collection(db, 'chatuser'), {
          nickname,
          roomId,
        });
  
        await updateDoc(docRef, {
          id: docRef.id,
        });
      } catch (error) {
        console.error('사용자 추가 및 업데이트 에러:', error);
      }
    };
    addUser();
    return () =>{
      unsubscribe();
    }
  }, [nickname]);
  
useEffect(()=>{
  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
    const remoteStream = new MediaStream();

    // localStream 에 있는 비디오와 오디오 트랙을 pc 라는 PeerConnection 객체에 추가하여 원격 피어와의 연결을 설정 (전송 받을 준비)
    localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream); // localStream에 속한 track을 pc에 추가해라.
    });

    // 상대방의 마이크와 카메라를 을 준비를 한다 remoteStream에 추가함으로써
    pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
        if (remoteRef.current) {
          remoteRef.current.srcObject = remoteStream;
          console.log("리모트 있어요");
        }
    };

    // 미디어 스트림을 비디오 요소에 연결하여 비디오를 표시하고 재생하는 기능을 구현하는 사용
    if (localRef.current) {
      localRef.current.srcObject = localStream;
      console.log("로컬있어요");
    }
    
    // 웹캠 활성화가 false 로 바뀜 (제거)
    setVideo(false);


    if (mode === "create") {
        // 파이어베이스 스토어를 사용해서 비디오 콜 생성 및 저장
        const callDocRef = doc(collection(db, "calls")); // 새로운 문서를 만듦
        const offerCandidatesRef = collection(callDocRef, "offerCandidates");
        const answerCandidatesRef = collection(callDocRef, "answerCandidates");
        
        // WebRTC를 사용하여 피어 간의 연결을 설정할 때, 로컬 피어의 ICE candidate를 수집하고 offerCandidates 컬렉션에 저장
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            addDoc(offerCandidatesRef, event.candidate.toJSON());
          }
        };

        // WebRTC를 사용하여 피어 간의 연결을 설정할 때, 로컬 피어에서 offer를 생성하고 로컬 디스크립션으로 설정하는 데 사용될 수 있습니다.
        const offerDescription = await pc.createOffer();
        await pc.setLocalDescription(offerDescription);

        //WebRTC에서 생성한 offerDescription 객체의 sdp와 type 속성 값을 사용하여 offer 객체를 생성하는 역할을 합니다.
        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        // callDoc 라는 컬렉션에 만든 offer를 지정한다
        await setDoc(callDocRef, { 
          offer,
          roomId
         });

        /* Firestore의 변경 사항을 듣고 이에 따라 스트림을 업데이트합니다.*/


        // Firestore의 `callDoc` 문서의 변경 사항을 감시하고, 변경이 있을 경우에는 SDP 응답을 가져와 피어 연결의 원격 설명을 설정하는 역할
        onSnapshot(callDocRef, (docSnapshot) => {
          const data = docSnapshot.data();
          if (!pc.currentRemoteDescription && data?.answer) {
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
          }
        });


        // Firestore의 `answerCandidates` 컬렉션에서 `icecandidate` 정보를 가져와 WebRTC 연결에 추가하는 역할
        onSnapshot(answerCandidatesRef, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const candidate = new RTCIceCandidate(
                change.doc.data()
              );
              pc.addIceCandidate(candidate);
              console.log(pc)
            }
          });
        });


     } else if (mode === "join") {
      const callDocQuery = query(collection(db, 'calls'), where('roomId', '==', roomId));
      const callDocSnapshot = await getDocs(callDocQuery);
      const callDocRef = doc(db, 'calls',callDocSnapshot.docs[0].id);
      const answerCandidatesRef = collection(callDocRef, 'answerCandidates');
      const offerCandidatesRef = collection(callDocRef, 'offerCandidates');


        // pc의 ice-candidate를 answerCandidates 컬렉션에 추가
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            addDoc(answerCandidatesRef, event.candidate.toJSON());
          }
        };

        // firestore에서 callDoc 라는 문서를 가져와서 해당 변수에 저장
        const offerdata = await getDoc(callDocRef);
        const callData = offerdata.data();

        // callDate의 원격 설명서를 해당 변수에 저장
        const offerDescription = callData.offer;
        // pc 객체의 원격 설명서를 설정한다
        await pc.setRemoteDescription(
            new RTCSessionDescription(offerDescription)
        );

        // Answer를 만들어서 로컬 디스크립션에 넣어줌
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);
        // answer 환경구성
        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };
        // callDoc 를 업데이트 시킨다
        await updateDoc(callDocRef, { answer });

        onSnapshot(offerCandidatesRef, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const candidate = new RTCIceCandidate(
                change.doc.data()
              );
              pc.addIceCandidate(candidate);
              console.log(pc)
            }
          });
        });
    }

    
    pc.onconnectionstatechange = (event) => {
        if (pc.connectionState === "disconnected") {
            hangUp();
        }
    };
};
setupSources();
},[mode])















    const hangUp = async () => {
        pc.close();

        if (roomId) {
            let roomRef = db.collection("calls").doc(roomId);
            await roomRef
                .collection("answerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
            await roomRef
                .collection("offerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });

            await roomRef.delete();
        }

    };








    





































































console.log(users)


  return (
      <Container style={{"--grid-size": gridCol,"--grid-col-size": gridColSize,"--grid-row-size": gridRowSize}}>
            {users && users.map((data,idx)=>(
          <div className='participant' key={idx}>
            <div className='card'>
            {data.nickname === nickname ? (
              <video 
                className={video ? 'video':'offvideo'}
                ref={localRef}
                autoPlay
                playsInline
                muted
              />
            ) : (
              <video 
                className='remote-video'
                ref={remoteRef}
                autoPlay
                playsInline
              />
            )}
             {video ? <div className='video-avatar'>{data.nickname}</div> : <div className='avatar'>{data.nickname}</div>}
            </div>
          </div>
        ))}


     </Container>
  )

}

const Container = styled.div`
display: grid;
grid-template-columns: repeat(var(--grid-size), 1fr);
grid-gap: 20px;
height: 100%;
padding: 10px;

.participant{
  background-color: #353b48;
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 5px;
  min-height: 200px;
}

.card{
  background: #3c4043;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.video{
  background-color: #353b48;
  height: 100%;
  width: 100%;
  position: relative;
  object-fit: cover;
  border-radius: 5px;
}

.offvideo{
  display: none;
}

.video-avatar{
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background: #E5E5E5;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  position: absolute;
  top: 0%;
  right: 0;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  background: #E5E5E5;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

`
export default Video