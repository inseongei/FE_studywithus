import React from 'react'
import Header from '../compontents/Header'
import styled from 'styled-components'
import Team from '../compontents/Team'

const TeamMain = () => {
  return (
    <Container>
    <Header/>
    <div className='title-Box'>
        <div className='title'>개발자와 디자이너를 찾아 팀을 만들어보세요 !</div>
        <p> 해당 사용자들은 포트폴리오를 공개로 설정한 사용자들 입니다</p>
    </div>

    <div className='contentBox'>
    <Team/><Team/><Team/><Team/><Team/><Team/>
    </div>
    </Container>
  )
}

const Container = styled.div`
margin-top: 80px;

.title-Box{
    width:100%;
    text-align: center;
    padding: 40px 0px 20px 0px;
}
.title-Box > p {
    margin: 10px;
}

.title{
    font-size: 24px;
}

.contentBox{
    width:70vw;
    height: 100%;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3,1fr);
}









`
export default TeamMain