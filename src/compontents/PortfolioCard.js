import React from 'react'
import styled from "styled-components"

const PortfolioCard = () => {
  return (
    <Container>
        <div className='Cardbox'>
            <div className='titlebox'> 홍길동</div>
        </div>
    </Container>
  )
}

const Container = styled.div`
width:75%;
margin: 30px auto;
height: 50px;
cursor: pointer;

.Cardbox{
height: 50px;
display: flex;
background-color: #d9f0e6;
border-radius: 8px;
padding: 10px;
}

.imgbox{
  border: 1px solid black;
  border-radius: 8px;
  width:15%;
  height: 200px;
}

.titlebox{
  margin:15px;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.subbox{
  width:100%;
}

.datebox{
  margin:15px;
  display: flex;
}

.dateinfo{
  display: flex;
}

.datebox div:nth-child(2){
  margin-right: 15px;
}

.who{
  font-weight: 700;
}

.contentbox{
  margin:15px;
  padding: 7px;
  height: 80px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #EBEEFF;
}







`

export default PortfolioCard