import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'
import { Link,useNavigate } from 'react-router-dom'
import { AiOutlineDoubleRight } from "react-icons/ai";
import PortfolioCard from '../compontents/PortfolioCard'
import Modal from '../compontents/Modal'
import axios from 'axios'
import Card from '../compontents/Card'
import TeamCard from '../compontents/TeamCard';
import { FaPlusCircle } from "react-icons/fa";
import Main from '../pages/Main'
import { useRecoilValue } from 'recoil';
import { CheckLogin } from '../Recoil/Atom/CheckAtom';



const UserMain = () => {
    const [currentTab, clickTab] = useState(0);
    const selectMenuHandler = (index) => {clickTab(index)}
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const Login = useRecoilValue(CheckLogin)
    const menuArr = [
        { name: <><div>프로젝트 모집</div> <Link to ="/ProjectMain"><FaPlusCircle className='plus'></FaPlusCircle></Link></>,content: <><Card/><Card/><Card/><Card/></> },
        { name: <><div>팀원 찾기</div> <FaPlusCircle className='plus'></FaPlusCircle></>, contentTwo: <><TeamCard/><TeamCard/><TeamCard/><TeamCard/></> },
    ]

    

  return (
    <>
    {Login.length !== 0 ? <>
    <Header/>
    <Container>
    <div className='ChatServer'>
        <div className='chat-title'>진행중인 프로젝트 서버 리스트</div>
        <div className='chat-list-box'>
                <div className='chat-list-title'>
                   <div> React Project</div>
                   <div className='icon'><AiOutlineDoubleRight></AiOutlineDoubleRight></div>
                </div>

                <div className='chat-list-title'>
                   <div> React Project</div>
                   <div className='icon'><AiOutlineDoubleRight></AiOutlineDoubleRight></div>
                </div>

                <div className='chat-list-title'>
                   <div> React Project</div>
                   <div className='icon'><AiOutlineDoubleRight></AiOutlineDoubleRight></div>
                </div>

                <div className='chat-list-title'>
                   <div> React Project</div>
                   <div className='icon'><AiOutlineDoubleRight></AiOutlineDoubleRight></div>
                </div>
        </div>

    </div>


    <div className='main-box'>
        <div className='main-one'>
        <TabMenu>
        {menuArr.map((el,index) => (
            <li key={index} className={index === currentTab ? "submenu focused" : "submenu" }
            onClick={() => selectMenuHandler(index)}><div className='MenuBar'>{el.name}</div></li>
        ))}
        </TabMenu>
    
        <Desc>
            <div className='grid-box'>
            {menuArr[currentTab].content}
            </div>
        </Desc>
    
        <ListCard>
            {menuArr[currentTab].contentTwo}
        </ListCard>
         </div>
        <div className='main-two'>
            <div className='sub-main'>
                <div className='sub-title'>😵 신청한 프로젝트</div>
                <div><PortfolioCard/><PortfolioCard/><PortfolioCard/></div>
            </div>
            <div className='sub-main-two'>
                <div className='sub-title'>🙋 모집중인 프로젝트</div>
                <div><PortfolioCard/><PortfolioCard/><PortfolioCard/></div>
            </div>
        </div>
    </div>
    {isModalOpen ? <Modal close={()=>setIsModalOpen(false)}/> : null}
    </Container>
    </> : <Main/>}
    </>
  )
}


const Container = styled.div`
margin-top: 80px;
display: flex;
height: calc(100vh - 80px);

.sub-title{
    padding-left: 20px;
    height: 10%;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    align-items: center;
}

.main-two{
    display: flex;
}
.sub-main{
    width:50%;
}
.sub-main-two{
    border-left: 1px solid lightgray;
    width:50%;
}

.ChatServer{
    width: 15vw;
    border-right: 1px solid lightgray;
}

.chat-title{
    font-size: 17px;
    text-align: center;
    padding: 15px;
}

.chat-list-box{
    height: 600px;
    overflow-x: hidden;
}


.chat-list-title:hover{
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.chat-list-title{
    display: flex;
    background-color: antiquewhite;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    font-weight: 500;
    margin-bottom: 10px;
    border-radius: 8px;
    cursor: pointer;
    background-color: #D9F0E6;
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
    border-bottom: 1px solid lightgray;
}

.main-two{
    height: 40%;
}
`
const TabMenu = styled.div`
  width: 70%;
  background-color: rgb(255,255,255);
  color: gray;
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
    background-color: #d9f0e6;
    color: #fff;
    cursor : pointer;
    display: flex;
    justify-content: space-between;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: #005b56;
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
    padding: 20px;
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