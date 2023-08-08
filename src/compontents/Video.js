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
  const pc = new RTCPeerConnection(servers);
  console.log(mode)



  useEffect(() => {
    addUser()
    // Firestore에서 사용자 정보 실시간 감시
    const unsubscribe = onSnapshot(collection(db, 'chatuser'), (snapshot) => {
      const userArray = [];
      snapshot.forEach((doc) => {
        userArray.push({ id: doc.id,...doc.data() });
      });
      setUsers(userArray);
    });
    const setupSources = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
  
        const remoteStream = new MediaStream();
  
        localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream)
        });
  
        pc.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
        };
  
        localRef.current.srcObject = localStream;
        // remoteRef.current.srcObject = remoteStream;
        setVideo(true); // 카메라가 있으므로 videocheck 상태를 true로 설정    
      } catch (error) {
        console.error(error);
        setVideo(false); // 카메라가 없으므로 videocheck 상태를 false로 설정
      }
    };
  
    setupSources();




    // 컴포넌트가 언마운트될 때 구독 해제
    return () => {
      unsubscribe();
      setupSources();
    };
  }, [nickname]); 









  

























  const addUser = async () => {
    try {
      const userQuerySnapshot = await getDocs(
        query(collection(db, 'chatuser'), where('roomId', '==', roomId))
      );
      const userExists = !userQuerySnapshot.empty;
  
      if (!userExists) {
        setMode('create');
      } else {
        setMode('join');
      }
  
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