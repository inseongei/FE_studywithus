import React from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'
import { AiFillCalendar } from "react-icons/ai";

const PortfolioDetail = () => {
  return (
    <>
    <Header/>
    <Container>
    <div className='firstBox'>
        <div className='img-box'>
            <div className='big-img'>사진</div>
            <div className='small-img'>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
        </div>
        <div className='info-box'>
            <div className='info-title'>프로젝트 명</div>
            <div className='info-date'><AiFillCalendar></AiFillCalendar>프로젝트 기간</div>
            <div className='info-content'>
                <div>
                    <div className='title'>프로젝트 소개</div>
                    <div className='content'>내용</div>
                </div>
            </div>
        </div>
    </div>


    <div className='SecondBox'>
        <div className='stack'>
            <div>✍사용 기술</div>
            <div className='stack-box'>
                <div>기술1</div>
                <div>기술2</div>
                <div>기술3</div>
                <div>기술4</div>
                <div>기술4</div>
            </div>

        </div>

        <div className='skill'>
            <div>🤸경험 스킬</div>
            <div className='skill-box'>
                <div>⭐스킬1</div>
                <div>⭐스킬2</div>
                <div>⭐스킬3</div>
                <div>⭐스킬4</div>
            </div>
        </div>

    </div>
    </Container>
    </>
  )
}


const Container = styled.div`
width: 80vw;
margin: 80px auto auto auto;
border: 1px solid black;
height: 100%;
display: flex;
flex-direction: column;

.firstBox{
    display: flex;
    height: 50%;
    border-bottom: 1px solid black;
}

.SecondBox{
    height: 500px;
    display: flex;
    
}

.img-box{
    width: 30%;
}

.info-box{
    width: 70%;
}

.big-img{
    border: 1px solid black;
    width: 100%;
    height: 350px;
}

.small-img{
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
.small-img div {
    border: 1px solid black;
    width:200px;
    height: 150px;
}

.info-title{
    height: 15%;
    font-size: 27px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-weight: 500;
}

.info-date{
    height: 5%;
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: gray;
}

.info-content{
    height: 80%;
    padding: 20px 0px 15px 15px;

}

.title{
    font-size: 18px;
    margin-bottom: 10px;
}

.content{
    width:80%;
    border-radius: 6px;
    height: 300px;
    padding: 10px;
    background-color: aliceblue;
}

.stack{
    width:50%;
    height: 100%;
    border-right: 1px solid black;
    padding:20px;
    font-size: 22px;
    font-weight: 500;
}

.skill{
    width:50%;
    height: 100%;
    padding:20px;
    font-size: 22px;
    font-weight: 500;
}

.stack-box{
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap:15px;
}

.stack-box div{
    border-radius: 20px;
    text-align: center;
    background-color: antiquewhite;
}

.skill-box{
    padding: 20px;
    overflow: hidden;
}

.skill-box div {
    margin-bottom: 20px;
}







`
export default PortfolioDetail