import React,{useRef,useEffect,useState} from 'react'
import styled from 'styled-components'
import { addDoc, collection, deleteDoc, onSnapshot,updateDoc,doc } from 'firebase/firestore';
import {db} from '../server/firebase'

const Video = () => {
  const [users, setUsers] = useState([]);
  const nickname = localStorage.getItem('nickname')

  let gridCol =users.length === 1 ? 1 : users.length <= 4 ? 2 : 4;
  const gridColSize = users.length <= 4 ? 1 : 2;
  let gridRowSize = users.length <= 4 ? users.length: Math.ceil(users.length / 2);

  useEffect(() => {
    addUser()
    // Firestore에서 사용자 정보 실시간 감시
    const unsubscribe = onSnapshot(collection(db, 'chatuser'), (snapshot) => {
      const userArray = [];
      snapshot.forEach((doc) => {
        userArray.push({ id: doc.id, ...doc.data() });
      });
      setUsers(userArray);
    });

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => {
      unsubscribe();
    };
  }, [nickname]); 

  const addUser = async () => {
    try {
      const docRef = await addDoc(collection(db, 'chatuser'), {
        nickname,
      });
      // 생성된 문서의 id로 업데이트
      await updateDoc(doc(db, 'chatuser', docRef.id), {
        id: docRef.id
      });
    } catch (error) {
      console.error('사용자 추가 및 업데이트 에러:', error);
    }
  };

    




  return (
      <Container style={{"--grid-size": gridCol,"--grid-col-size": gridColSize,"--grid-row-size": gridRowSize}}>
      {users&&users.map((data)=>(
      <div className='participant'>
        <div className='card'>
        <video className='video'> </video>
        <div className='avatar'>이름</div>
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