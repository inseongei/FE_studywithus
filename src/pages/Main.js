import React from 'react'
import styled from 'styled-components'
import { FiSearch } from "react-icons/fi";
import Logo from '../assets/Logo.mp4'
import MainCard from '../compontents/MainCard'
import Header from '../compontents/Header'
import UserMain from '../pages/UserMain';
import Footer from '../compontents/Footer';
import programmer from '../assets/programmer.png'
import { Link } from 'react-router-dom';


const Main = () => {
        const token = localStorage.getItem('accessToken')
/*==========================================================================================================================================*/
  return (
    <>
    {!token ?   
        <>
        <Header/>
        <Container>
        <div className='MainBox'>
            <div className='SubBox'>
                <span>원하는 프로젝트와 원하는 팀원을<br/> 스터디위더스에서 찾아보세요 !</span>
                <div className='ThirdBox'>
                <input type={'text'} placeholder="검색어를 입력하세요." className='MainSearch'/>
                <FiSearch className='icon'></FiSearch>
                </div>
            </div>
            <div className='imageBox'>
            <video muted autoPlay loop height={'480px'}>
                <source src={Logo} type="video/mp4"/>
            </video>
            </div>
        </div>

        <div className='Main-cardbox'>
            <div className='MenuBox'>
                <Link to="/ProjectMain" className='moreBtn'><div>모집글 더보기</div></Link>
                <Link to="/ChatServer"  className='goChat'><div>채팅 서버 이동</div></Link>
                <img src={programmer} alt="사진"/>
            </div>

            <div className='showCard'>
                <MainCard/>
            </div>
        </div>




















        </Container>
    <Footer/>
    </>
 
    :
    <UserMain/>  
    }
    
    </>
  )
}

const Container = styled.div`
margin-top:80px;
height : 480px;
width:100%;
background-color:#D9F0E6;

.MainBox{
    width: 70%;
    height: 100%;
    margin:auto;
    display: flex;
}

.Main-cardbox{
    height: 100%;
    width:70%;
    margin:auto;
}

.MenuBox{
    width: 100%;
    height: 10%;
    margin: 20px auto;
    display: flex;
}

.MenuBox img {
    margin-left: 20px; 
}



.showCard{
    height: 90%;
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



.SubBox{
 display: flex;
 justify-content: center;
 width:50%;
 height: 100%;
 flex-direction : column;
}

.SubBox span{
    font-size:32px;
    width:500;
    padding: 20px;
}

.MainSearch{
    min-height: 50px;
    outline: none;
    border: 1px solid #E5E5E5;
    transition: all .2s;
    width: 450px;
    padding: 0px 25px;
    border-radius: 36px;
}

.ThirdBox{
    display: flex;
    align-items : center;
}

.icon{
    font-size: 20px;
    position : relative;
    right:40px;
    cursor: pointer;
}

.imageBox{
    width:50%;
}

.imageBox img {
    object-fit: cover;
    width: 100%;
    height: 480px;
}





`
export default Main