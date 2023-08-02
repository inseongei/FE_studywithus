import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'
import Card from '../compontents/Card'
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TfiWrite } from "react-icons/tfi";
import Pcard from './../compontents/Pcard';
import {getDocs,collection  } from 'firebase/firestore';
import {db} from '../server/firebase'


const ProjectMain = () => {




  return (
    <>
    <Header/>
    <Container>
        <div className='Box'>
            <div className='SearchBox'>
                <div className='SearchTitle'>
                    <div>내가 원하는 프로젝트를 찾아보세요!</div>
                    <Link to ="/ProjectWrite"><TfiWrite className='writeicon'></TfiWrite></Link>
                </div>
                <div className='Searchbar'>
                    <input type={'text'} placeholder="찾고 싶은 프로젝트를 검색해보세요."/>
                    <div className='iconbox'><BsSearch className='icon'></BsSearch></div>
                </div>
            </div>
            <div>
            </div>
        </div>

        <div className='CardContainer'>
        <div className='CardBox'>
            <Card/>
        </div>
        </div>

    </Container>
    </>
  )
}

const Container = styled.div`
margin-top: 80px;

.Box{
    height: 200px;
}

.SearchBox{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.Searchbar{
    display:flex;
    justify-content: center;
    width: 100vw;
}

.Searchbar input {
    padding: 10px 20px;
    border-radius: 28px;
    outline: unset;
    border: 1px solid #dedede;
    background-color: #fff;
    width:550px;
}

.Searchbar input:focus {
    border: 1px solid #005B56;
    transition: all .2s;
}

.SearchTitle{
    padding: 40px 0px 20px 0px;
    font-size: 24px;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.writeicon{
    margin-left: 15px;
    position: relative;
    top:3px;
    font-size: 30px;
}

.writeicon:hover{
    transform: scale(1.1);
}

.icon{
    font-size: 20px;
    position: relative;
    right:40px;
    cursor: pointer;
}

.iconbox{
    display: flex;
    align-items: center;
}

input::placeholder{
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
}



.CardContainer{
    display: flex;
    justify-content: center;
    padding:30px;
}

.writeBtn{
    height: 40px;
    width:100px;
    font-size: 13px;
    padding: 0 16px;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-weight: 700;
    background-color: #505050;
    cursor: pointer;
}

.writeBtn:hover{
    background-color: #282828;
}

.writeBtnbox{
    border: 1px solid black;
    width: 80vw;
    margin: auto ;
}




`
export default ProjectMain