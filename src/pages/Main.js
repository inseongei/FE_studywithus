import React,{useEffect} from 'react'
import styled from 'styled-components'
import { FiSearch } from "react-icons/fi";
import Logo from '../assets/Logo.mp4'
import { useState } from 'react';
import Card from '../compontents/Card'
import Header from '../compontents/Header'
import Team from '../compontents/Team'
import { FaPlusCircle } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom'

const Main = () => {
    const [currentTab, clickTab] = useState(0);
    const selectMenuHandler = (index) => {clickTab(index)}
    const menuArr = [
        { name: <><div>프로젝트 모집</div> <Link to ="/ProjectMain"><FaPlusCircle className='plus'></FaPlusCircle></Link></>,content: <><Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/></> },
        { name: <><div>팀원 찾기</div> <FaPlusCircle className='plus'></FaPlusCircle></>, contentTwo: <><Team/><Team/><Team/><Team/></> },
    ]




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
        <video muted autoPlay loop height={'480px'}>
            <source src={Logo} type="video/mp4"/>
        </video>
        </div>
    </div>
    </Container>



    <TabMenu>
    {menuArr.map((el,index) => (
        <li key={index} className={index === currentTab ? "submenu focused" : "submenu" }
        onClick={() => selectMenuHandler(index)}><div className='MenuBar'>{el.name}</div></li>
    ))}
    </TabMenu>

    <Desc>
        <div className='grid-box'>
        {menuArr[currentTab].content}
        </div>
    </Desc>

    <ListCard>
        {menuArr[currentTab].contentTwo}
    </ListCard>
    </>
  )
}

const Container = styled.div`
margin-top:80px;
height : 480px;
width:100%;
background-color:#D9F0E6;

.MainBox{
    width: 70%;
    height: 100%;
    margin:auto;
    display: flex;
}

.SubBox{
 display: flex;
 justify-content: center;
 width:50%;
 height: 100%;
 flex-direction : column;
}

.SubBox span{
    font-size:32px;
    width:500;
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
  width: 70%;
  background-color: rgb(255,255,255);
  color: gray;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin: auto;

  .MenuBar{
    width:100%;
    display: flex;
    justify-content : space-between; 
    align-items: center;
  }

  .plus{
    font-size: 20px;
    color: #fff;
    display: flex;
    align-items: center;
  }

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
    background-color: #d9f0e6;
    color: #fff;
    cursor : pointer;
    display: flex;
    justify-content: space-between;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: #005b56;
    color: #fff;
  }

  & div.desc {
    text-align: center;
  }
` 

const Desc = styled.div`
width:70%;
margin: auto;
.grid-box{
    display: grid;
    grid-template-columns: repeat(4,1fr);

    width:100%;
}

.more{
    display: flex;
    align-items : center;
    background: #fff;
    color: gray;
    font-size:20px;
    cursor: pointer;
    margin-left:80px;
    font-weight:500;
}

.more:hover{
    color: black;
}
`
const ListCard = styled.div`
padding: 20px;
`
export default Main