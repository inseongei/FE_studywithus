import React from 'react'
import styled from "styled-components"

const Team = () => {
  return (
    <Container>
        <div className='Cardbox'>
            <div className="imgbox">사진</div>
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
background-color: #CDCFEA;
border-radius: 8px;

}

.imgbox{
  border: 1px solid black;
  border-radius: 8px;
  width:15%;
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
  background-color: #EBEEFF;
}







`

export default Team