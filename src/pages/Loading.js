import React,{useEffect} from 'react'
import Spinner from '../assets/Spinner.gif'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const Loading = () => {
  const code = new URL(window.location.href).searchParams.get("code");   // SNS 로그인 파라미터 Code 추출
  const navigate = useNavigate(); // 라우터 이동Hook
  const kakao = localStorage.getItem('kakao')
  const naver = localStorage.getItem('naver')

  useEffect(()=>{
    if(kakao === 'true'){
    axios.post(`${process.env.REACT_APP_API_KEY}/api/auth/kakao`,{authorizationCode:code})
    .then((res)=>{
      console.log('카카오 로그인')
       localStorage.setItem('accessToken',res.data.accessToken);
       navigate("/UserMain");
    })
    .catch((err)=>console.log('실패'))
    }

    if(naver === 'true'){
    const data = {state : '123', authorizationCode:code}
    axios.post(`${process.env.REACT_APP_API_KEY}/api/auth/naver`,data)
    .then((res)=>{
        console.log('네이버 로그인')
        localStorage.setItem('accessToken',res.data.accessToken);
        navigate("/UserMain");
    })
    .catch((err)=>console.log(err))
    }
  },[])






  return (
    <Load>
      <img src={Spinner} alt="로딩" width="20%"/>
      <div className='info'> 로그인 중입니다 잠시만 기다려주세요</div>
    </Load>
  )
}

const Load = styled.div`
height: 100vh;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
img {
  background-color: #ffffff;
  opacity: 0.5;
}

.info{
  font-size: 20px;
  font-weight: 500;
}
`
export default Loading