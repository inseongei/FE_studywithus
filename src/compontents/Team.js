import React from 'react'
import styled from "styled-components"

const Team = () => {
  return (
    <Container>
        <div className='Cardbox'>
            <div className="imgbox">
              <img src="https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png" alt="사진"/>
            </div>
            <div className='subbox'>
            <div className='titlebox'> 홍길동</div>
            <div className='datebox'>
            <div className='who'>👨‍🔧개발자</div>
            </div>
            <div className='contentbox'>사용 스택</div>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
width:70%;
margin: auto;
height: 200px;
margin-bottom: 30px;

.Cardbox{
height: 200px;
display: flex;
background-color: #d9f0e6;
border-radius: 8px;
cursor: pointer;
}

.Cardbox:hover{
  transform: scale(1.01);
}

.imgbox{
  border-radius: 8px;
  width:15%;
  height: 200px;
}

.imgbox img {
  width: 100%;
  height: 200px;
}

.titlebox{
  margin:15px;
  font-size: 20px;
  font-weight: 600;
}

.subbox{
  width:100%;
}

.datebox{
  margin:15px;
  display: flex;
}

.dateinfo{
  display: flex;
}

.datebox div:nth-child(2){
  margin-right: 15px;
}

.who{
  font-weight: 700;
}

.contentbox{
  margin:15px;
  padding: 7px;
  height: 80px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
}







`

export default Team