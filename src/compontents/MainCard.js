/* eslint-disable */
import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import { AiFillCalendar } from "react-icons/ai";
import {getDocs,collection, orderBy, query } from 'firebase/firestore';
import {db} from '../server/firebase'
import { Link } from 'react-router-dom';
import { cardDataState } from '../server/atoms';
import {useRecoilState} from 'recoil'
const MainCard = () => {
    const projectsCollectionRef = collection(db, 'projects');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    const [cardData,setCardData]  = useRecoilState(cardDataState) 


    // 날짜 계산 함수
    const abcdate = (idx) =>{
      const date1 = new Date(cardData[idx].end_date)
      const date2 = new Date(formattedDate)
      const timeDiff = date2.getTime() - date1.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
      const result = `D${daysDiff}`;
      return result
}

const axiosProjects = async () => {
  try {
    const timequery = query(projectsCollectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(timequery);
    const postList = [];
    querySnapshot.docs.map((doc) =>{
      const cardData = doc.data();
      postList.push({
        id : doc.id,
        ...cardData
      })
    });
    setCardData(postList)
  } catch (error) {
    alert(error)
  }
}

useEffect(() => {
  axiosProjects();
}, []);

  return (
    <Case>
      {cardData&&cardData.slice(0,8).map((data,idx)=>(
        <Link to={`/ProjectDetail/${data.id}`} key={data.id}>
        <div className='one-card'>
        <div className='imgBox'>
          <img src ={data.rep_image} alt="사진"/>
        </div>
          <div className='ContentBox'>
            <span>{data.title}</span>
            <span>{data.content}</span>
            <span><AiFillCalendar></AiFillCalendar>{abcdate(idx)}</span>
        </div>
        </div>
        </Link>
      ))}
    </Case>

  )
}


const Case = styled.div`
  width:80vw;
  height: auto;
  border-radius: 12px;
  margin:20px 20px 20px 0px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap:15px;

  .imgBox{
    width:100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 12px 12px 0px 0px;
    height:200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .one-card {
    width: 17vw;
    border-radius: 12px;
    margin: 20px;
    cursor: pointer;
    border: 1px solid #e5e5e5;
  }

  .one-card:hover{
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
  }
  

  .imgBox > img{
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 12px 12px 0px 0px;
    height: 200px;
  }


  .ContentBox{
    background-color: rgb(250,250,250);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border-radius: 0px 0px 12px 12px ;
    height: 180px;
    padding: 20px 24px 24px;
    
  }

  .ContentBox span:nth-child(1){
    color: #141617;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    width:100%;
    height: 20%;
  }
  .ContentBox span:nth-child(2){
    width:100%;
    height: 60%;
    font-size: 16px;
    color: #5F666B;
    font-weight: 500;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ContentBox span:nth-child(3){
    width:100%;
    height: 20%;
    display: flex;
    gap: 5px;
    font-weight: 600;
    font-size: 13px;
    line-height: 150%;
    color: #81898F;
    margin-top: 4px;
    padding: 20px 0px;
  }
`

export default MainCard