import React from 'react'
import styled from "styled-components"
import { AiFillCalendar } from "react-icons/ai";


const Card = () => {
  return (
    <Case>
      <div className='imgBox'></div>
      <div className='ContentBox'>
        <span>프로젝트 하실분 모집 !!</span>
        <span>React Native 프로젝트 할사람 구해요 편하게 연락주세요</span>
        <span><AiFillCalendar></AiFillCalendar>D-5</span>
      </div>
    </Case>

  )
}

const Case = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  border-radius: 12px;
  cursor: pointer;
  margin:20px;

  .imgBox{
    width:100%;
    background-image: url('https://i.pinimg.com/736x/60/82/1a/60821a03c1c237507a22dae15890c715.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 12px 12px 0px 0px;
    height:180px;
  }
  &:hover{
    box-shadow: 0 16px 24px rgba(0,0,0,.06);
  }

  .ContentBox{
    background-color: #EFF3F5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border-radius: 0px 0px 12px 12px ;
    height: 180px;
    padding: 20px 24px 24px;
    
  }

  .ContentBox span:nth-child(1){
    color: #141617;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    width:100%;
    height: 20%;
  }
  .ContentBox span:nth-child(2){
    width:100%;
    height: 60%;
    font-size: 16px;
    color: #5F666B;
    font-weight: 500;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ContentBox span:nth-child(3){
    width:100%;
    height: 20%;
    display: flex;
    gap: 5px;
    font-weight: 600;
    font-size: 13px;
    line-height: 150%;
    color: #81898F;
    margin-top: 4px;
  }
`

export default Card