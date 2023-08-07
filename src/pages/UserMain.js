import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'
import { AiOutlineDoubleRight } from "react-icons/ai";
import {getDocs, collection,query,where,orderBy} from 'firebase/firestore'
import {db} from '../server/firebase'
import {useRecoilState} from 'recoil'
import { ProjectChat } from '../server/atoms';
import MyChat from '../pages/Project/MyChat'
import { Link } from 'react-router-dom';
import programmer from '../assets/programmer.png'
import SwiperCard from '../compontents/SwiperCard';

const UserMain = () => {
const [data,setData] = useState([])
const projectRef = collection(db, 'projects');
const [chatOn,setChatOn]  = useRecoilState(ProjectChat) 
const [id,setId] = useState('')
const nickname = localStorage.getItem('nickname')


// 첫 렌더링시 writer 와 내 닉네임이 같은 프로젝트 게시글 뽑아옴
useEffect(()=>{
const getProject = async() =>{
    const ProjectList = query(projectRef, where("writer", "==", nickname))
    const querySnapshot = await getDocs(ProjectList)
    const postList = [];
    querySnapshot.docs.map((doc) =>{
        const cardData = doc.data();
        postList.push({
            id : doc.id,
            ...cardData
        })
        setData(postList)
    });
}
getProject()
},[])


/*==========================================================================================================================================*/
  return (
    <>
        <Header/>
        <Container>
        <div className='ChatServer'>
            <div className='chat-title'>작성게시글 채팅방 리스트</div>
            <div className='chat-list-box'>
      {data&&data.map((item, index) => (
          <div className='chat-list-title' key ={index} onClick={()=>{
            setChatOn(true)
            setId(item)
          }}>
            <div>{item.title}</div>
            <div className='icon'><AiOutlineDoubleRight /></div>
          </div>
      ))}
    </div>
        </div>
    
    
        <div className='main-box'>
            <div className='main-one'>
            <div className='MenuBox'>
                <Link to="/ProjectMain" className='moreBtn'><div>모집글 더보기</div></Link>
                <Link to="/ChatServer" className='goChat'><div>채팅 서버 이동</div></Link>
                <img src={programmer} alt="사진"/>
            </div>
                <SwiperCard data={data}/>

             </div>

        </div>
    </Container>
    {chatOn ? <MyChat id={id}/> : ''}

    </>
  )
}


const Container = styled.div`
margin-top: 80px;
display: flex;
height: calc(100vh - 80px);

.sub-title{
    width: 90%;
    padding-top: 20px;
    height: 10%;
    font-size: 18px;
    font-weight: 500;
    margin: auto;
}

.main-two{
    display: flex;
}
.sub-main{
    width:50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.sub-main-container{
    width: 90%;
    padding:10px;
    border-radius: 10px;
    background-color: #D9F0E6;
}

.ChatServer{
    width: 15vw;
}

.chat-title{
    font-size: 17px;
    font-weight: 600;
    text-align: center;
    padding: 15px;
}

.chat-list-box{
    height: 600px;
    overflow-x: hidden;
}


.chat-list-title:hover{
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
}

.chat-list-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    font-weight: 500;
    margin-bottom: 10px;
    border-radius: 8px;
    cursor: pointer;
    background-color:#D9F0E6;
}

.icon{
    display: flex;
    align-items: center;
}

.main-box{
    width:85vw;
}



.MenuBox{
    width: 100%;
    height: 50px;
    margin: 20px auto;
    display: flex;
    padding-left: 20px;
}

.MenuBox img {
    margin-left: 20px; 
}

.moreBtn{
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgb(250,250,250);
    margin-right: 10px;
    font-weight: 500;
    border-radius: 10px;
}

.moreBtn:hover{
    background-color: #E5E5E5;
}
.goChat:hover{
    background-color: #E5E5E5;
}
.goChat{
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgb(250,250,250);
    font-weight: 500;
    border-radius: 10px;
}
`


export default UserMain