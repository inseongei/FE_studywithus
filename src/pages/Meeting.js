import React from 'react'
import styled from 'styled-components'
import Chat from '../compontents/Chat'

const Meeting = () => {
  return (
    <Container>
        <div className='video-box'></div>
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
`
export default Meeting