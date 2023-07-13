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
import { ChangeView } from '../Recoil/Atom/Atoms';




const UserMain = () => {
    const [currentTab, clickTab] = useState(0);
    const selectMenuHandler = (index) => {clickTab(index)}
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const token = localStorage.getItem('accessToken')
    const Change = useRecoilValue(ChangeView)

    
    const menuArr = [
        { name: <><div>프로젝트 모집</div> <Link to ="/ProjectMain"><FaPlusCircle className='plus'></FaPlusCircle></Link></>,content: <><Card/><Card/><Card/><Card/></> },
        { name: <><div>팀원 찾기</div> <FaPlusCircle className='plus'></FaPlusCircle></>, contentTwo: <><TeamCard/><TeamCard/><TeamCard/><TeamCard/></> },
    ]

  return (
    <>
    {Change === false && token? 
    <>
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
                    <div className='sub-main-container'>
                    <div className='sub-title'>😵 신청한 프로젝트</div>
                    <div><PortfolioCard/><PortfolioCard/><PortfolioCard/></div>
                    </div>
                </div>
                <div className='sub-main'>
                    <div className='sub-main-container'>
                    <div className='sub-title'>🙋 모집중인 프로젝트</div>
                    <div><PortfolioCard/><PortfolioCard/><PortfolioCard/></div>
                    </div>
                </div>
            </div>
        </div>
    </Container>
    </> : <Main/>}

    {isModalOpen ? <Modal close={()=>setIsModalOpen(false)}/> : null}
    </>
  )
}


const Container = styled.div`
margin-top: 80px;
display: flex;
height: calc(100vh - 80px);
background-color: #F2F6F8;

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
    background-color: #CFD6DE;
}

.ChatServer{
    width: 15vw;
    background-color: #F2F6F8;
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
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    background-color: #9C95A7;
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
    background-color: #CFD6DE;
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
  background-color: #F2F6F8;
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
    background-color: #CFD6DE;
    color: #fff;
    cursor : pointer;
    display: flex;
    justify-content: space-between;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: #897487;
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
    background-color: #F2F6F8;
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
    background-color: #F2F6F8;
`
export default UserMain