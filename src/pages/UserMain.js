import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'
import { AiOutlineDoubleRight } from "react-icons/ai";
import {getDocs, collection , serverTimestamp,onSnapshot,query,where,orderBy} from 'firebase/firestore'
import {db} from '../server/firebase'
import {useRecoilState} from 'recoil'
import { ProjectChat } from '../server/atoms';
import MyChat from '../pages/Project/MyChat'

const UserMain = () => {
    const [data,setData] = useState([])
    const projectRef = collection(db, 'projects');
    const [chatOn,setChatOn]  = useRecoilState(ProjectChat) 
    const [id,setId] = useState('')
    const nickname = localStorage.getItem('nickname')
    console.log(data)


    useEffect(()=>{
        const getProject = async() =>{
            const querySnapshot = await getDocs(query(projectRef, where("writer", "==", nickname)))
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
            <div className='chat-title'>진행중인 프로젝트 서버 리스트</div>
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

        

             </div>
            <div className='main-two'>

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

.main-one{
    height:60%;
}

.main-two{
    height: 40%;
}
`
const TabMenu = styled.div`
  width: 70%;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  .MenuBar{
    width:100%;
    display: flex;
    justify-content : space-between; 
    align-items: center;
  }

  .plus{
    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
  }

  .submenu {
  // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    width: calc(30% /2);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    font-size: 16px;
    background-color: #D9F0E6;
    color: #fff;
    cursor : pointer;
    display: flex;
    justify-content: space-between;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: #005B56;
    color: #fff;
  }

  & div.desc {
    text-align: center;
  }
` 

const Desc = styled.div`
.grid-box{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    width:100%;
    padding: 0px 20px 20px 20px;
}

.more{
    display: flex;
    align-items : center;
    background: #fff;
    color: gray;
    font-size:20px;
    cursor: pointer;
    margin-left:80px;
    font-weight:500;
}

.more:hover{
    color: black;
}
`
const ListCard = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    width:100%;
    padding: 20px;
    position: relative;
    bottom: 40px;
    
`
export default UserMain