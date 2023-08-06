import React from 'react'
import {makeRoom} from '../server/atoms'
import {useRecoilState} from 'recoil'
import styled from 'styled-components'
import Modal from './Modal';


const RoomModal = () => {
    const [on ,setOn] = useRecoilState(makeRoom) 

  return (
    <Container>
        <div className='one-box'>
            <div></div>
            <div className='modal-title'>채팅방 만들기 </div>
            <div className='close-icon' onClick={()=>setOn(false)}>❌</div>
        </div>

        <div className='two-box'>
            <input type="text" placeholder='방 제목을 입력하세요'/>
            <input type="password" placeholder='패스워드가 없을 경우 공개방으로 생성됩니다.'/>
            <button>만들기</button>
        </div>
    </Container>
  )
}

const Container = styled.div`
width:30%;
height: 30vh;
margin: auto;
position: relative;
bottom: 750px;
left:100px;
background-color: gray;
border-radius: 10px;

.one-box{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 10%;
}

.two-box{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    height: 90%;
}

.two-box input {
    border: 1px solid #E5E5E5;
    outline: none;
    transition: all .2s;
    padding: 0px 15px;
    border-radius: 5px;
    margin-bottom: 3px;
    width: 70%;
    height: 50px;
}

.two-box button {
    width: 150px;
    height: 50px;
    background-color: #fff000;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: 700;
    margin-top: 20px;
}

.two-box button:hover{
    transform: scale(1.02);
}

.modal-title{
    font-size: 24px;
    font-weight: 500;
    color:#fff;
}

.close-icon{
    font-size: 24px;
    cursor: pointer;
}

.close-icon:hover{
    transform: scale(1.02);
}
`
export default RoomModal