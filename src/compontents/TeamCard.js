import React from 'react'
import styled from "styled-components"
import { FiUser } from "react-icons/fi";


const TeamCard = () => {
  return (
    <Case>
      <div className='imgBox'></div>
      <div className='ContentBox'>
        <span>정인성</span>
        <span>기술스택</span>
        <span className='who'><FiUser></FiUser>개발자</span>
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
    background-color: #f2f6f8;
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
    margin-bottom: 5px;
  }
  .ContentBox span:nth-child(2){
    width:100%;
    height: 60%;
    font-size: 12px;
    background-color: #FFF4F9;
    color: #5F666B;
    font-weight: 500;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius:8px;
    padding: 7px;
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

  .who{
    display: flex;
    align-items: center;
  }
`

export default TeamCard