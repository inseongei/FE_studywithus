import React from 'react'
import styled from 'styled-components'
import { FiSearch } from "react-icons/fi";
import Logo from '../assets/Logo.png'
import { useState } from 'react';
import Card from '../compontents/Card'
import Header from '../compontents/Header'



const Main = () => {
    const [currentTab, clickTab] = useState(0);

    // 메뉴바 이름,내용
    const menuArr = [
        { name: '프로젝트 모집', content: <><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/></> },
        { name: '팀원 찾기', contentTwo: 'Tab menu TWO' },
      ];

      const selectMenuHandler = (index) => {
        // parameter로 현재 선택한 인덱스 값을 전달해야 하며, 이벤트 객체(event)는 쓰지 않는다
        // 해당 함수가 실행되면 현재 선택된 Tab Menu 가 갱신.
        clickTab(index);
      };


  return (
    <>
    <Header/>
    <Container>
    <div className='MainBox'>
        <div className='SubBox'>
            <span>원하는 프로젝트와 원하는 팀원을<br/> 스터디위더스에서 찾아보세요 !</span>
            <div className='ThirdBox'>
            <input type={'text'} placeholder="검색어를 입력하세요." className='MainSearch'/>
            <FiSearch className='icon'></FiSearch>
            </div>
        </div>
        <div className='imageBox'>
            <img src={Logo} alt="로고 사진"/>
        </div>
    </div>
    </Container>



    <TabMenu>
    {menuArr.map((el,index) => (
        <li key={index} className={index === currentTab ? "submenu focused" : "submenu" }
        onClick={() => selectMenuHandler(index)}>{el.name}</li>
    ))}
    </TabMenu>
    <Desc>
          {menuArr[currentTab].content}
    </Desc>
    <div>
        {menuArr[currentTab].contentTwo}
    </div>
    </>
  )
}

const Container = styled.div`
margin-top:80px;
height : 480px;
background-color:#F8EBFF;

.MainBox{
    width: 60%;
    height: 100%;
    margin:auto;
    display: flex;
}

.SubBox{
 display: flex;
 width:50%;
 flex-direction : column;
 padding: 50px;
}

.SubBox span{
    font-size:32px;
    weight:500;
    padding: 20px;
}

.MainSearch{
    min-height: 50px;
    outline: none;
    border: 1px solid #E5E5E5;
    transition: all .2s;
    width: 450px;
    padding: 0px 15px;
    border-radius: 36px;
}

.ThirdBox{
    display: flex;
    align-items : center;
}

.icon{
    font-size: 20px;
    position : relative;
    right:40px;
}

.imageBox{
    width:50%;
}

.imageBox img {
    object-fit: cover;
    width: 100%;
    height: 480px;
}

`

const TabMenu = styled.div`
  background-color: rgb(255,255,255);
  color: gray;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: 7rem;
  margin-top: 10px;

  .submenu {
  // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    margin-top:30px;
    width: calc(30% /2);
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    border-radius: 10px 10px 0px 0px;
    font-size: 16px;
    background-color: #F8EBFF;
    color: #fff;
    cursor : pointer;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: #9A88BC;
    color: #fff;
  }

  & div.desc {
    text-align: center;
  }
` 

const Desc = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    column-gap: 20px;
    margin-left:100px;
`

export default Main