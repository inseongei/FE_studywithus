import React from 'react'
import styled from 'styled-components'
import Chat from '../compontents/Chat'
import Video from './../compontents/Video';

const Meeting = () => {
  return (
    <Container>
        <div className='video-box'>
            <div className='title'> <b>프로젝트 제목</b> 의 화상 채팅방</div>
            <div className='videos'>
                <Video/>
            </div>
            <div className='videoiconsbox'></div>
        </div>
        <div className='chatting-box'><Chat/></div>
    </Container>

  )
}


const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;

.video-box{
    width:70vw;
    height: 100vh;
}

.chatting-box{
    width: 30vw;
    height: 100vh;   
}

.title{
    width: 100%;
    height: 10%;
    padding:20px;
    background-color: #E5E5E5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    font-weight: 500;
}

.videos{
    width: 100%;
    height: 80%;
}

.videoiconsbox{
    width: 100%;
    height: 10%;
    padding:20px;
    background-color: #E5E5E5;

}
`
export default Meeting