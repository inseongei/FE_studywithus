import React from 'react'
import Header from '../compontents/Header'
import styled from "styled-components"
import kakao from '../assets/kakao.png'
import naver from '../assets/naver.jpg'
import google from '../assets/google.png'

const Login = () => {
  return (
    <>
    <Header/>
    <Container>
    <div className='LoginBox'>
        <div className='Logintitle'>SNS 간편 로그인</div>
        <ul>
            <li><img src={kakao} alt="카카오로그인"/></li>
            <li><img src={naver} alt="네이버로그인"/></li>
            <li><img src={google} alt="구글로그인"/></li>
        </ul>
        <div className='LoginName'>
            <span className='A'>카카오로그인</span>
            <span>네이버로그인</span>
            <span>구글로그인</span>
        </div>

    </div>

    </Container>
    </>
  )
}

const Container = styled.div`
width:100vw;
height: 90vh;
margin-top: 80px;
display: flex;
justify-content: center;
align-items: center;

 .LoginBox{
    width:45%;
    height: 550px;
    background: #fff;
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
    border: none;
 }

 .LoginBox ul {
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
 }

 .LoginBox ul li {
    margin: 20px;
    cursor: pointer;
 }

 .LoginBox ul li:nth-child(3){
    border : 2px solid #e5e8eb;
    border-radius: 50%;
 }

 .LoginBox ul li img {
    width:120px;
    height: 120px;
    border-radius: 50%;
 }

 .LoginBox ul li:hover{
    transform: translateY(-10px);
 }
.LoginName{
    display: flex;
    justify-content: center;
}

 .LoginName span{
    margin: 10px 20px 20px 20px;
    width:120px;
    font-weight: 500;
    text-align: center;
 }
 
 .Logintitle{
    font-size: 30px;
    color: #8b95a1;
    text-align: center;
    padding:20px;
 }
`

export default Login