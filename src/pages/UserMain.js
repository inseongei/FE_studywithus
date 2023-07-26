import React,{useState} from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'
import { Link } from 'react-router-dom'
import { AiOutlineDoubleRight } from "react-icons/ai";
import PortfolioCard from '../compontents/PortfolioCard'
import Modal from '../compontents/Modal'
import Card from '../compontents/Card'
import { FaPlusCircle } from "react-icons/fa";
import Team from '../compontents/Team'


const UserMain = () => {
    // 메뉴(currentTab), 모달(isModalOpen) , 메뉴함수(selectMenuHandler) , 메뉴배열관리(menuArr)
        const [currentTab, clickTab] = useState(0);
        const [isModalOpen, setIsModalOpen] = React.useState(false);
        const selectMenuHandler = (index) => {clickTab(index)}
        const menuArr = [
            { name: <><div>프로젝트 모집</div> <Link to ="/ProjectMain"><FaPlusCircle className='plus'></FaPlusCircle></Link></>,content: <><Card/><Card/><Card/><Card/></> },
            { name: <><div>팀원 찾기</div> <Link to ="/TeamMain"><FaPlusCircle className='plus'></FaPlusCircle></Link></>, contentTwo: <><Team/><Team/><Team/><Team/></> },
        ]


/*==========================================================================================================================================*/
  return (
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
    {isModalOpen ? <Modal close={()=>setIsModalOpen(false)}/> : null}
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