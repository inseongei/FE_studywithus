import React from 'react'
import styled from 'styled-components'
import { GrReactjs } from "react-icons/gr";
import { BiLogoSpringBoot } from "react-icons/bi";

const Footer = () => {
  return (
    <Container>
        <div className='footer-main'>
            <div className='footer-first'>
            Thank you for using our service
            </div>
            <div className='footer-second'>
            <div> made by. StudyWithus Team</div>
            </div>

        </div>
    </Container>
  )
}

const Container = styled.div`
height : 100%;
margin-top: 100px;

.footer-main{
  position : relative;
  transform : translateY(-0%);
  background-color: #E1F1EE;
  width:100%;
  display: flex;
  flex-direction: row;
  height: 50px;
  background-image: linear-gradient(to right top, #b1cdc8, #bbd6cf, #c5ded7, #cfe7de, #d9f0e6);
}

.footer-first {
  display: flex;
  justify-content: center;
  align-items: center;
  width:50%;
  font-weight: 500;

}

.footer-first div{
    font-size: 16px;
    margin-right: 20px;
}


.footer-second {
  width:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
}

.footer-second div{
    margin-right: 10px;
}

`

export default Footer