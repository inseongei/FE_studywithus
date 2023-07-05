import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from "styled-components"
import moment from 'moment';


const Timebook = () => {
    const [value, setvalue] = useState(new Date());
    // value로 받은 날짜값 원하는 형식으로 만들기
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}년 ${month}월 ${day}일`;

    console.log(formattedDate)

  return (
    <Container>
    <Calendar 
    onChange={setvalue}
    value={value}
    showNeighboringMonth={false}  
    className="abs"
    formatDay={(locale, date) => moment(date).format("DD")}
    />

    <div className='Memo-Book'>
        <div className='Memo-title'>
           <span> {formattedDate} 메모 </span>
           <span className='saveBtn'> 저장하기</span>
        </div>
        <textarea className='Memo-text'/>
    </div>
    </Container>
  )
}


const Container = styled.div`
.react-calendar { 
 width: 600px;
 max-width: 100%;
 background-color: #fff;
 color: #222;
 border-radius: 8px;
 box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
 font-family: Pretendard;
 line-height: 1.125em;
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
    width:100%;
    height: 300px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
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

.saveBtn{
    padding-right: 20px;
    color:#009874;
    cursor: pointer;
    font-weight: 700;
}

.saveBtn:hover{
transform: scale(1.05);
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
`

export default Timebook


