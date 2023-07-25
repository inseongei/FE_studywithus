import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'
import Card from '../compontents/Card'
import { BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProjectMain = () => {
    const [card,setCard] = useState('')

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_KEY}/projects`)
        .then((data)=>setCard(data.data))
        .catch((err)=>console.log(err))
    },[card])


  return (
    <>
    <Header/>
    <Container>
        <div className='Box'>
            <div className='SearchBox'>
                <div className='SearchTitle'>내가 원하는 프로젝트를 찾아보세요!</div>
                <div className='Searchbar'>
                    <input type={'text'} placeholder="찾고 싶은 프로젝트를 검색해보세요."/>
                    <div className='iconbox'><BsSearch className='icon'></BsSearch></div>
                </div>
                <Link to ="/ProjectWrite"><button className='writeBtn'> 모집하기</button></Link>
            </div>
        </div>

        <div className='CardContainer'>
        <div className='CardBox'>
            <Card/><Card/><Card/><Card/><Card/><Card/><Card/><Card/>
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
    padding: 14px 20px;
    border-radius: 28px;
    outline: unset;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.2);
    border: 1px solid #dedede;
    background-color: #fff;
    width:550px;
    position: relative;
}

.Searchbar input:focus {
    outline: unset;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,.2);
    border-color: #4279FF;
    transition: all .2s;
}

.SearchTitle{
    padding: 40px 0px 20px 0px;
    font-size: 24px;
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

.CardBox{
    width:80vw;
    height: auto;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap:15px;
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
    font-family: Pretendard;
    cursor: pointer;
    position: relative;
    bottom: 42px;
    left:400px;
}

.writeBtn:hover{
    background-color: #282828;
}






`
export default ProjectMain