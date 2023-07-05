import React from 'react'
import styled from 'styled-components'

const Pcard = () => {
  return (
    <Container>
        <div className='Box'>
        <div className='imgBox'>사진</div>
        </div>
        <div className='imgtitle'>프로젝트 명</div>
    </Container>

  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;

.Box{
    border: 1px solid black;
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.imgBox{
    border: 1px solid black;
    width:250px;
    height: 250px;
}

.imgtitle{
    width: 300px;
    padding: 15px;
    text-align: center;
    font-size: 17px;
    font-weight: 500;
}
`
export default Pcard