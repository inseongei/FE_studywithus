import React from 'react'
import styled from "styled-components"
import artist from '../assets/artist.png'
import programmer from '../assets/programmer.png'

const Team = () => {
  return (
    <Container>
      <div className='TeamContainer'>
        <img src={artist} alt="개발자"/>
        <div className='info'>개발자</div>
        <div className='pull rd'>
        안녕하세요 저는 <b>홍길동</b> 입니다 <br/>
        제가 사용하는 기술 스택은 이렇습니다<br/>
        <b>React AWS Recoil</b>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;

.TeamContainer{
  width:50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.TeamContainer:hover{
  transform: scale(1.05);
}

img {
  width:200px;
  height: 200px;
}
.pull {
  position:relative; 
  bottom: 10px;
  right:120px;
  margin: 50px; 
  padding: 20px;
  width:300px; 
  height:100%;
  border-radius: 10px; 
  background-color: rgb(250,250,250);
}

.pull:after {
 border: 1px solid black;
 position: absolute;
 top: 10px;
 right: -30px; 
 border-left:30px solid #000;
 border-top: 10px solid transparent;
 border-bottom: 10px solid transparent;
}

.pull.rd:after {
  content:"";
  position: absolute;
  top: -40px; 
  right: 100px;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent; 
  border-bottom: 30px solid rgb(250,250,250);
}

.info{
  font-weight: 600;
  text-align: center;
  padding-top: 10px;
}
`

export default Team