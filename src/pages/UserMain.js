import React,{useEffect} from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'
import { AiOutlineDoubleRight } from "react-icons/ai";
import PortfolioCard from '../compontents/PortfolioCard'
import Modal from '../compontents/Modal'
import axios from 'axios'

const UserMain = () => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    console.log(code)

    const data = {
        state : '123',
        authorizationCode : code
    }
    useEffect(()=>{
        axios.post('http://43.201.106.193:8080/api/auth/naver',data)
        .then((res)=>{
          console.log(res)
        })
        .catch((err)=>console.log(err))
    })


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


        <div className='menu'>
            <div>프로젝트 찾아보러 가기</div>
            <div>원하는 팀원 구하러 가기</div>
        </div>

    </div>











    <div className='MainBox'>
        <div className='first-box'>
            <div className='sizebox'>
                <div className='title'>
                     신청한 프로젝트
                </div>
                <div className='card-box' >
                <PortfolioCard />
                <PortfolioCard/>
                </div>
                </div>

                <div className='sizebox'>
                <div className='title'>
                     모집중인 프로젝트
                </div>
                <div className='card-box'>
                    <div onClick={()=>setIsModalOpen(true)}><PortfolioCard/></div>
                    <div><PortfolioCard/></div>
                    <div><PortfolioCard/></div>
                </div>
                </div>

        </div>
    </div>
    {isModalOpen ? <Modal close={()=>setIsModalOpen(false)}/> : null}
    </Container>
    </>
  )
}


const Container = styled.div`
margin-top: 80px;
display: flex;
height: calc(100vh - 80px);

.ChatServer{
    border: 1px solid black;
    width: 15%;
}

.MainBox{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width:85%;
}

.first-box{
    display: flex;
    border: 1px solid black;
    height: 100%;
}

.second-box{
    display: flex;
    border: 1px solid black;
    height: 50%;
}

.sizebox{
    width:50%;
    border: 1px solid black;
}

.title {
    padding: 20px;
    height: 10%;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
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
}

.icon{
    display: flex;
    align-items: center;
}

.menu{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
}

.menu div {
    padding: 20px;
    width: 100%;
    text-align: center;
    background-color: azure;
    cursor: pointer;
}

.menu div:hover{
    font-weight: 700;
}

.card-box{
    border: 1px solid black;
    height: calc(100% - 10%);
}











`
export default UserMain