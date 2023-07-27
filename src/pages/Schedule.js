import React from 'react'
import Header from '../compontents/Header';
import styled from "styled-components"
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import  Timebook  from '../compontents/Timebook'
import Todo from './Todo';

const Schedule = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <>
    <Header/>
    <Container>
    <div className='TodoBox'>
        <div className='TodoBoxContainer'>
            <div className='borderbox'>
                <div className='oneborder'></div>
                <div className='twoborder'>Date</div>
                <div className='threeborder'></div>
            </div>

            <div className='bordercontent'>{formattedDate}</div>

            <div className='borderbox'>
                <div className='oneborder'></div>
                <div className='twoborder'>COMMENT</div>
                <div className='threeborder'></div>
            </div>

            <div className='bordercontent'>
                <input type={'text'} placeholder="오늘 하루를 알차게 보낼 수 있는 한마디를 적어보세요 !" className='content-input'/>
            </div>
            
            <div className='borderbox'>
                <div className='oneborder'></div>
                <div className='twoborder'>TASKS</div>
                <div className='threeborder'></div>
            </div>
        
            <Todo/> 
        </div>
    </div>




    <div className='MemoBox'>
        <Timebook/>
    </div>
    </Container>
    </>
  )
}

const Container = styled.div`
margin:80px auto 0px auto;
width:100%;
height: 90vh;
display: flex;

.TodoBoxContainer{
    width:80%;
    height: 90%;
    margin: 40px auto;
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
    padding: 20px;
}

.content-input{
    width: 100%;
    height: 30px;
    padding: 15px;
    outline: none;
    border: none;
}

.content-input::placeholder{
    color:#88AEE1;
    
}

.borderbox{
    display: flex;
    align-items: center;
}

.oneborder{
    width: 10%;
    height: 0px;
    border: 1px solid black;
}

.twoborder{
    margin: 0px 10px;
    font-weight: 700;
}

.threeborder{
    width:90%;
    height: 0px;
    border: 1px solid black;
}

.fourborder{
    width:100%;
    height: 0px;
    border: 1px solid black;
}

.bordercontent{
    padding: 5px 10px 10px 10px;
}

.TodoBox{
    width:50%;
    height: 90vh;
    border-right : 2px solid rgb(233, 233, 233);
}

.MemoBox{
    width:50%;
    height: 90vh;
    display: flex;
    justify-content: center;
}
.Today{
    display: flex;
    flex-direction: column;
    padding:40px;
}

.Today span {
    padding:5px;
    font-size: 24px;
}

.Today input {
  width: 500px;
  height: 32px;
  font-size: 15px;
  border: none;
  border-radius: 8px;
  outline: none;
  padding-left: 15px;
  background-color: #fff;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

input::placeholder{
    font-family: Pretendard;
    color: #1a1a1a;
    font-weight: 400;
}

.Today button{
    width:100px;
    height: 32px;
    border: none;
    border-radius: 8px;
    background-color: #fff;
    position: relative;
    right:100px;
    font-weight: 700;
    color:gray;
}

.Today button:hover{
    color: #1a1a1a;
}

.TodoListBox{
  width: 700px;
  height: 400px; 
  background-color: #F2F4F8;
}

.Subbox{
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow:auto;
    border-radius: 8px;
    background-color: #fff;
}

.Subbox div{
    width: 100%;
}


hr{
    width:90%;
}

.List{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #1a1a1a;
    padding: 20px 20px 10px 20px;
}

.List div:nth-child(2){
    text-align: right;
}

.icon {
    font-size: 18px;
    margin-left: 10px;
    cursor: pointer;
}

.icon:nth-child(1):hover{
    color:green;
}
.icon:nth-child(2):hover{
    color:red;
}

.Title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1a1a1a;
    padding: 20px 20px 10px 20px; 
    font-size: 20px;
    background-color: rgb(233, 233, 233);
}

.Title span {
    font-size: 18px;
}



.Subbox::-webkit-scrollbar {
    width: 10px;
  }
  .Subbox::-webkit-scrollbar-thumb {
    background-color: grey;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  .Subbox::-webkit-scrollbar-track {
    background-color: rgb(233, 233, 233);
    box-shadow: inset 0px 0px 5px white;
  }

  .ChatBar{
    display: flex;
  }

.ChatBar input{
    background-color: rgb(233, 233, 233);
    width: 90%;
    height: 40px;
    font-size: 15px;
    border: none;
    border-radius: 0px;
    outline: none;
    padding-left: 15px;
    border-radius: 8px;
}

.ChatBar div{
    width: 10%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 700;
    border-radius: 8px;
}

.ChatBar div:hover{
    background-color: #D0BCFF;
}
`

export default Schedule