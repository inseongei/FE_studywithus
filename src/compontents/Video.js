import React,{useRef,useEffect,useState} from 'react'
import styled from 'styled-components'
import { addDoc, collection, deleteDoc, onSnapshot,updateDoc,doc,getDoc,where,getDocs,query } from 'firebase/firestore';
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
  }, [nickname, roomId]);
  

  useEffect(() => {
    const ice = collection(db, "ice");
    const offer = collection(db, "offer");
    const answer = collection(db, "answer");
    const localpc = new RTCPeerConnection(servers);
    const remoteStream = new MediaStream();
    console.log(localpc)
    const setupSources = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log(localStream)
  
        localStream.getTracks().forEach((track) => {
          localpc.addTrack(track, localStream);
        });
  
        localpc.ontrack = (event) => {
          
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
        };
  
        localRef.current.srcObject = localStream;
        remoteRef.current.srcObject = remoteStream;
        setVideo(true);
      } catch (error) {
        console.error(error);
        setVideo(false);
      }

      if (mode === 'create') {

  
        localpc.onicecandidate = (event) =>{
          if (event.candidate){
            addDoc(ice,{
              candidate : event.candidate.toJSON(),
              roomId
            })
          }
        }

        const offerDescription = await localpc.createOffer();
        await localpc.setLocalDescription(offerDescription);

        const Firebaseoffer = {
          sdp: offerDescription.sdp,
          type: offerDescription.type,
          roomId
};
        await addDoc(offer,Firebaseoffer) 

        const answercheck = onSnapshot(collection(db, 'answer'), (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const data = change.doc.data();
              if (!localpc.currentRemoteDescription && data) {
                const answerDescription = new RTCSessionDescription(data);
                localpc.localpc.currentRemoteDescription(answerDescription);
              }
            }
          });
        });


        const icecheck = onSnapshot(collection(db, 'ice'), (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added' && localpc.currentRemoteDescription) {
              const iceCandidateData = change.doc.data().candidate;
              const candidate = new RTCIceCandidate(iceCandidateData);
        
              localpc.addIceCandidate(candidate)
                .then(() => {
                })
                .catch((error) => {
                  console.error('Error adding ICE candidate:', error);
                });
            }
          });
        });

  
      
      } else if (mode === 'join') {


        localpc.onicecandidate = (event) =>{
          if (event.candidate){
            addDoc(ice,{
              candidate : event.candidate.toJSON(),
              roomId
            })
          }
        }

        const querySnapshot = await getDocs(query(collection(db, 'offer'), where('roomId', '==', roomId)));
        querySnapshot.forEach((doc) => {
          const offerData = doc.data();
          const offerDescription = offerData

          localpc.setRemoteDescription(
          new RTCSessionDescription(offerDescription)
  );
        });



        const answerDescription = await localpc.createAnswer();
        await localpc.setLocalDescription(answerDescription);

        const Firebaseanswer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
};

        await addDoc(answer,Firebaseanswer) 











      }
    };
  
    setupSources();
  

  }, [mode]);













    




  return (
      <Container style={{"--grid-size": gridCol,"--grid-col-size": gridColSize,"--grid-row-size": gridRowSize}}>
          <div className='participant'>
          <div className='card'>
          <video 
          className={video ? 'video':'offvideo'}
          ref={localRef}
          autoPlay
          playsInline
          muted
          />
          <video ref={remoteRef} autoPlay playsInline muted className='video'/>
          {video ? '' : <div className='avatar'>{nickname}</div>}
          
          </div>
        </div>


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