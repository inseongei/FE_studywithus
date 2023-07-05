import React from 'react'
import Header from '../compontents/Header';
import styled from "styled-components"
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import  Timebook  from '../compontents/Timebook'

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
    <div className='Today'>
        <span>Today is {formattedDate}</span>
        <div>
        <div className='Today-Date'></div>
        </div>
    </div>

    <div className='Today'>
        <span>COMMENT</span>
        <div>
        <input type='text' placeholder='오늘의 다짐를 적어보세요'/>
        <button>확인</button>
        </div>
    </div>


    <div className='Today'>
        <span>TODO LIST</span>
        <div>
        <div className='TodoListBox'>
            <div className='Subbox'>
                <div className='Title'>
                    <span>Total : 7개</span>
                    <span>ToDo : 4개</span>
                    <span>Finish : 3개 </span>
                </div>
                <div className='List'>
                <div>React 공부하기</div> 
                <div><BsCheckLg className='icon'></BsCheckLg><AiOutlineDelete className='icon'></AiOutlineDelete></div> 
                </div>
                <div className='List'>
                <div>일정리스트</div> 
                <div><BsCheckLg  className='icon'></BsCheckLg><AiOutlineDelete  className='icon'></AiOutlineDelete></div> 
                </div>
            </div>


            <div>
            <div className='ChatBar'>
                <input type="text" placeholder='할일을 적어주세요'/>
                <div>버튼</div>
            </div>

            </div>
        </div>
        <div></div>
        </div>

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
background-color: #fff;
background-image:
linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
linear-gradient(#eee .1em, transparent .1em);
background-size: 600% 1.2em;
display: flex;

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
    padding: 40px;
}

.Today span {
    padding:5px;
    font-size: 22px;
    font-weight: 500;
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