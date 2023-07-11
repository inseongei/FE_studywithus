import React from 'react'
import Header from '../compontents/Header'
import styled from "styled-components"
import kakao from '../assets/kakao.png'
import naver from '../assets/naver.jpg'
import google from '../assets/google.png'
import { useRecoilState } from 'recoil';

const Login = () => {

   const SocialKakao = ()=>
   {
       const Rest_api_key='c1bdfceae4fa27db44e9e244a7f2e1fa' //REST API KEY
       const redirect_uri = 'http://localhost:3000/' //Redirect URI
       // oauth 요청 URL
       const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
       window.location.href = kakaoURL
   }

   const SocialNaver = () =>{
      const client_id = 'JOiWuaZqH5Qj5O4A1m6e';
      const Redirect_url = "http://localhost:3000/UserMain";
      const state = 123;
      const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${Redirect_url}`;
      window.location.href = NAVER_AUTH_URL;
   }


  return (
    <>
    <Header/>
    <Container>
    <div className='LoginBox'>
        <div className='Logintitle'>SNS 간편 로그인</div>
        <ul>
            <li><img src={kakao} alt="카카오로그인" onClick={SocialKakao}/></li>
            <li><img src={naver} alt="네이버로그인" onClick={SocialNaver}/></li>
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
    height: 60vh;
    background: #fff;
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
    border: none;
    border-radius: 10px;
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