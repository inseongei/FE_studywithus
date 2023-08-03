import React from 'react'
import Spinner from '../assets/Spinner.gif'
import styled from 'styled-components'




const Loading = () => {

  return (
    <Load>
      <img src={Spinner} alt="로딩" width="20%"/>
      <div className='info'>잠시만 기다려주세요</div>
    </Load>
  )
}

const Load = styled.div`
height: 100vh;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
img {
  background-color: #ffffff;
  opacity: 0.5;
}

.info{
  font-size: 20px;
  font-weight: 500;
}
`
export default Loading