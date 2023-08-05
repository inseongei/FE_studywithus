import React from 'react'
import styled from 'styled-components'
import { AiOutlineClose , AiOutlineCheck } from "react-icons/ai";
const Modal = (close) => {

  return (
    <>
    <Container>
    <div className='modal-title'>
    <div>react project 신청자 리스트</div>
    <div className='close'><AiOutlineClose onClick={close.close}></AiOutlineClose></div>

    </div>
    <div className='check-box'>
        <div className='check'>
            <div className='check-title'>ㅇㅇㅇㅇㅇㅇㅇ</div>
            <div className='name'>
                <span>정인성님</span>
                <span className='icon-box'><AiOutlineCheck className='point-one'></AiOutlineCheck> <AiOutlineClose className='point-two'></AiOutlineClose></span>
            </div>
        </div>
    </div>
    </Container>
    </>
  )
}


const Container = styled.div`
position: absolute;
right:180px;
top:190px;
border: 1px solid black;
width:450px;
height: 600px;
background-color: antiquewhite;
border-radius: 6px;

.modal-title{
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    padding: 8px;
    display: flex;
    justify-content: space-between;
}
.modal-title div{
    margin: 0px 15px;
    font-size: 19px;
}

.check-box{
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.check{
    border: 1px solid black;
    width:90%;
    height: 70px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.name{
    text-align: right;
    margin-right: 10px;
}

.name span {
    margin-right: 7px;
}

.check-title{
    padding-left: 7px;
    font-size: 18px;
    font-weight: 500;
}

.icon-box{
    position: relative;
    top: 2px;
}

.point-one{
    cursor: pointer;
}

.point-one:hover{
    color: green;
}

.point-two{
    cursor: pointer;
}
.point-two:hover{
    color:red;
}

.close{
    display: flex;
    align-items: center;
    cursor: pointer;
}




`
export default Modal