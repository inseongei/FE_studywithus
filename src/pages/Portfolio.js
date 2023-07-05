import React from 'react'
import Header from '../compontents/Header'
import styled from 'styled-components'
import Pcard from '../compontents/Pcard'

const Portfolio = () => {
  return (
    <>
    <Header/>
    <Container>
    <div className='FirstBox'>
        <div className='FirstImg'>이미지</div>
        <div className='FirstStack'>
            <div className='stack-title'>
                <div>사용스택</div>
                <div>
                
                <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
                </label>
                </div>
            </div>
            <div className='stack-box'>react</div>
        </div>
        <div className='Btn-box'><button className='Btn'>아직 미정 버튼</button></div>
    </div>
    <div className='SecondBox'>
        <div className='SecondTitle'>홍길동 님의 포트폴리오</div>
        <div className='SecondCardbox'><Pcard/><Pcard/><Pcard/><Pcard/></div> 
        <div className='Page'>페이지네이션 자리</div>
    </div>
    </Container>
    </>
  )
}

const Container = styled.div`
width:90%;
margin:80px auto auto auto;
height: 90vh;
display: flex;
background-color: #FCF8FF;

.FirstBox{
    display: flex;
    flex-direction: column;
    width: 20%;
    border-right: 1px solid black;
    background-color: #4B4453;
}

.FirstImg{
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.FirstStack{
    height: 60%;
}

.stack-title{
    font-size: 20px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    margin: 5px 20px 10px 20px;
}

.stack-box{
    width: 90%;
    margin:auto;
    background-color: #B0A8B9;
    border-radius: 8px;
    height: 90%;
    padding:20px;
}

.SecondBox{
    width: 80%;
    display: flex;
    flex-direction: column;
}

.SecondTitle{
    height: 10%;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #557087;
}

.SecondCardbox{
    width:100%;
    margin: auto;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.Btn-box{
    height:10%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.Btn{
    width:300px;
    height: 45px;
    border: none;
}

.Page{
    padding: 15px;
    text-align: center;
    background-color: #557087;
}







`
export default Portfolio