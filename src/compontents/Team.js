import React from 'react'
import styled from "styled-components"
import { MdDateRange } from "react-icons/md";

const Team = () => {
  return (
    <Container>
        <div className='Cardbox'>
            <div className="imgbox">사진</div>

            <div className='subbox'>






            <div className='titlebox'> 스프링 기반 프로젝트 참여하고 싶습니다</div>


            <div className='datebox'>
            <div className='dateinfo'>
              <div className='iconbox'><MdDateRange></MdDateRange></div>
              <div>2023-07-04</div>
            </div>
            <div className='who'>👨‍🔧개발자</div>


            </div>


            <div className='contentbox'>나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고나는 내용이고 너도 내용이고 우리도 내용이고 언제나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고나 나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고내용이고 이거는 내용이고나는 내용이고 너도 내용이고 우리도 내용이고 언제나 내용이고 이거는 내용이고 저거도 내용이고 저거도 내용이고</div>








            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
width:70%;
margin: auto;
height: 200px;
margin-bottom: 20px;


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

.iconbox{
  display: flex;
  align-items: center;
}

.who{
  font-weight: 700;
}

.contentbox{
  margin:15px;
  padding: 7px;
  height: 80px;
  overflow: hidden;
}







`

export default Team