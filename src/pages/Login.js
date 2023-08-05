import React,{useRef} from 'react'
import Header from '../compontents/Header'
import styled from "styled-components"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'


const Login = () => {
   const idinput = useRef('')
   const passwordinput = useRef('')
   const navigate = useNavigate();


   const loginhandle = () =>{
         let email = idinput.current.value
         let password = passwordinput.current.value

         const auth = getAuth();
         signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem('nickname',userCredential.user.displayName)
          localStorage.setItem('email',userCredential.user.email)
          localStorage.setItem('photoUrl',userCredential.user.photoURL)
          localStorage.setItem('accessToken',userCredential.user.accessToken)
          alert('로그인 되셨습니다')
          navigate('/')
        })
        .catch((error) => {
          alert(error.message)
        });
       

   }
  return (
    <>
    <Header/>
    <Container>
    <div className='LoginBox'>
      <div className='LoginContent'>
         <div className='Logintitle'> StudyWithus Login</div>
         <div className='Login-inputbox'>
            <input type="text" placeholder='아이디를 입력해주세요' ref={idinput}/>
            <input type="password" placeholder='패스워드를 입력해주세요' ref={passwordinput}/>
            <button className='LoginBtn' onClick={loginhandle}>로그인</button>
         </div>
      </div>
    </div>

    </Container>
    </>
  )
}

const Container = styled.div`
width:100vw;
height: 90vh;
margin-top: 80px;
display: flex;
justify-content: center;
align-items: center;

 .LoginBox{
    width:35%;
    height: 35vh;
    background: #fff;
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
    border: none;
    border-radius: 10px;
    padding:25px;
 }

 .Logintitle{
   font-size: 28px;
   font-weight: 500;
   text-align: center;
   padding :20px;
 }


.Login-inputbox{
   display: flex;
   flex-direction: column;
   align-items: center;
   width:100%;
}
.Login-inputbox input {
   border: 1px solid #E5E5E5;
   outline: none;
   min-height: 40px;
   transition: all .2s;
   width:50%;
   padding:0px 15px;
   border-radius: 5px;
   margin-bottom: 3px;
}

.LoginBtn{
   border: none;
   font-weight: 700;
   min-height: 44px;
   transition: all .2s;
   width:50%;
   padding:0px 15px;
   border-radius: 5px;
   margin-top: 10px;
   background-color: #D9F0E6;
}

.LoginBtn:hover{
   background-color: #B1CDC8;
}

.Login-inputbox input:focus{
   border: 1px solid #005B56;
}

.LoginContent{
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
}
`

export default Login