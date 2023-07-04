import React from 'react'
import styled from "styled-components"
import Header from '../compontents/Header'
import { MdDateRange } from "react-icons/md";


const ProjectDetail = () => {
  return (
    <>
    <Header/>
    <Container>
        <div className='main-box'> 
        <div className='image-box'>사진박스</div>
        <div className='content-box'>
            <div className='title'>프로젝트명</div>
            <div className='date'>
                <div className='icon-box'><MdDateRange className='icon'></MdDateRange></div>
                <div>23-07-05</div>
            </div>
            <div className='content'>
                <div>내용</div>
            </div>
        </div>
        </div>

        <div className='Btn-box'>
            <button>돌아가기</button>
            <button>신청하기</button>
        </div>
    </Container>
    </>

  )
}

const Container = styled.div`
margin-top: 80px;

.main-box{
    width:60vw;
    margin: auto;
    display: flex;
    align-items: center;
}


.image-box{
    width:550px;
    height: 450px;
    border: 1px solid black;
}

.content-box{
    width:55%;
}

.title{
    font-size: 24px;
    font-weight: 500;
    padding:15px 15px 15px 20px;
}

.date{
    margin: 6px 0 8px 20px;
    font-size: 18px;
    color:#E5E5E5;
    display: flex;
    align-items: center;
}

.content{
    margin: 20px 0 8px 20px;
    background-color: rgb(250,250,250);
    width:100%;
    height: 300px;
}

.content div {
    padding:20px;
}

.Btn-box{
    display: flex;
    justify-content: flex-end;
    width:60vw;
    margin: auto; 
    position: relative;
    left:20px;
}

.Btn-box button {
    width:140px;
    height: 40px;
    border: none;
}

.Btn-box button:nth-child(1){
    margin-right: 20px;
}

.icon{
 font-size: 18px;
 margin-right: 5px;
}

.icon-box{
    display: flex;
    align-items: center;
}
`
export default ProjectDetail