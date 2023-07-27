import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from "styled-components"
import moment from 'moment';


const Timebook = () => {
    const [value, setvalue] = useState(new Date());
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}년 ${month}월 ${day}일`;

    
  return (
    <Container>
    <Calendar 
    onChange={setvalue}
    value={value}
    showNeighboringMonth={false}  
    formatDay={(locale, date) => moment(date).format("DD")}
    />

    <div className='Memo-Book'>
        <div className='Memo-title'>
           <span> {formattedDate} 메모 </span>
        </div>
        <textarea className='Memo-text'/>
    </div>
    <button className='save-btn'>작성을 완료 했다면 저장을 위해 이 버튼을 눌러주세요 !</button>
    </Container>
  )
}


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;


.react-calendar { 
 width: 600px;
 border-radius: 8px;
 box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
 font-family: Pretendard;
 padding:20px;
 border: none;
 margin:40px;
}


.react-calendar button {
    font-family: Pretendard;
}
.react-calendar__navigation button {
 color: #6f48eb;
 min-width: 44px;
 background: none;
 font-size: 16px;
 font-family: Pretendard;
 margin-top: 8px;
}

.Memo-Book{
    width: 600px;
    height: 300px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
    display: flex;
    flex-direction: column;
}

.Memo-title{
    padding:15px 0px 15px 30px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
}

.Memo-subtitle{
    font-size: 16px;
    font-weight: 500;
    padding:15px 0px 15px 30px;
    color: #5F666B;
}

.Memo-text{
    height:100%;
    border: 1px solid rgb(233, 233, 233);
    padding: 20px;
    font-size: 22px;
    font-family: Pretendard;
}

.save-btn{
    margin-top: 20px;
    width:600px;
    height: 50px;
    border: none;
    background-color: #D9F0E6;
    border-radius: 5px;
    font-weight: 700;
}

.save-btn:hover{
    background-color: #458B70;
}

`

export default Timebook


