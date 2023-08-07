import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import {db} from '../server/firebase'
import { where, collection, deleteDoc, getDoc,query,doc,getDocs } from 'firebase/firestore';
import Chat from '../compontents/Chat'
import Video from './../compontents/Video';
import Header from '../compontents/Header';
import {useNavigate,useParams } from 'react-router-dom'
import {
    faMicrophone,
    faVideo,
    faDesktop,
    faVideoSlash,
    faMicrophoneSlash,
    faPhoneSlash,
    faSignOutAlt 
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Meeting = () => {
    const nickname = localStorage.getItem('nickname')
    const navigate = useNavigate();
    const [documentData, setDocumentData] = useState('');
    const { roomId } = useParams(); // 파라미터에서 ID값 가져오기

    console.log(documentData)
    console.log(roomId)

    useEffect(() => {
        const fetchDocument = async () => {
          try {
            const docRef = doc(db, 'rooms', roomId); // 'yourCollectionName'에 해당하는 이름 사용
            const docSnapshot = await getDoc(docRef); // 문서 정보 가져오기
      
            if (docSnapshot.exists()) {
              // 문서가 존재할 경우
              setDocumentData(docSnapshot.data()); // 상태에 문서 데이터 저장
            } else {
              console.log('문서가 존재하지 않습니다.');
            }
          } catch (error) {
            console.error('문서 정보 가져오기 에러:', error);
          }
        };
      
        fetchDocument();
      }, [roomId]); // id 값이 변경될 때마다 useEffect 실행


    const deleteUser = async () => {
        try {
          const q = query(collection(db, 'chatuser'), where('nickname', '==', nickname));
          const querySnapshot = await getDocs(q);
    
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
            console.log('사용자 삭제 완료');
            navigate('/ChatServer')
          });
        } catch (error) {
          console.error('사용자 삭제 에러:', error);
        }
      };


  return (
    <>
    <Header/>
    <Container>
        <div className='video-box'>
            <div className='title'> <b className='video-title-bold'>{documentData.title}</b>의 화상 채팅방</div>
            <div className='videos'>
                <Video/>
            </div>
            <div className='videoiconsbox'>
                <FontAwesomeIcon icon={faVideo} className="icons"/>
                <FontAwesomeIcon icon={faDesktop} className="icons"/>
                <FontAwesomeIcon icon={faMicrophone} className="icons"/>
                <FontAwesomeIcon icon={faSignOutAlt} className="icons-out" onClick={deleteUser}/>
            </div>
        </div>
        <div className='chatting-box'><Chat/></div>
    </Container>
    </>
  )
}


const Container = styled.div`
width: 100vw;
display: flex;
margin-top: 80px;

.video-box{
    width:70vw;
    height: calc(100vh - 80px)
}

.chatting-box{
    width: 30vw;  
}

.title{
    width: 100%;
    height: 10%;
    padding:20px;
    background-color: #E5E5E5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 500;
}

.video-title-bold{
    margin: 0px 10px;
    color: blue;
}

.videos{
    width: 100%;
    height: 80%;
    background: #3c4043;
}

.videoiconsbox{
    width: 100%;
    height: 10%;
    padding:20px;
    background-color: #E5E5E5;
    display: flex;
    justify-content: center;
    align-items: center;
}

.icons{
    margin: 10px;
    color: white;
    border-radius: 50%;
    background:#3c4043;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 20px;
}

.icons-out{
    margin: 10px;
    color: white;
    border-radius: 50%;
    background:#DC7F7F;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 20px;
}

.icons-out:hover{
    background-color: red;
}



`
export default Meeting