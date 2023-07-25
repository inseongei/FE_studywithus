import React,{useState,useRef} from 'react'
import Header from './../compontents/Header';
import styled from 'styled-components'

const Signup = () => {
    const [Id,setId] = useState('')
    const [password,setPassword] = useState('')
    const [passwordcheck,setPasswordcheck] = useState('')
    const [nickname,setNickname] = useState('')
    const [info , setInfo] =useState('failed-signupBtn')
    const [pwd , setPwd] =useState(false)
    console.log(pwd)

    const idinput = useRef('')
    const passwordinput = useRef('')
    const passwordcheckinput = useRef('')
    const nicknameinput = useRef()
/*==================================================================================================================================================================*/
    const usersignup = () =>{
        console.log('ㅎㅇ')
    }



  return (
    <Container>
    <Header/>
    <SignUpBox>
        <div className='signuptitle'>회원가입</div>
        <div className='inputbox'>
            <div>아이디</div>
            <input type="text" placeholder='이메일을 적어주세요' ref={idinput} 
            onChange={(e)=>e.target.value.includes('@') ? setId('좋은 아이디네요!') : setId('이메일형식이 아니에요')}/>
            <div className={Id === '좋은 아이디네요!' ? 'good-subinfo' : 'bad-subinfo'}>{Id}</div>
        </div>
        <div className='inputbox'>
            <div>비밀번호</div>
            <input type="password" placeholder='6자 이상 만들어주세요' autoComplete="off"  ref={passwordinput}
            onChange={(e)=>e.target.value.length > 5 ? (
                setPassword('비밀번호에 적합해요') ,
                setPwd(e.target.value)
            )
                : setPassword('안전하게 만들어주세요')}
            />
            <div className={password === '비밀번호에 적합해요' ? 'good-subinfo' : 'bad-subinfo'}>{password}</div>
        </div>
        <div className='inputbox'>
            <div>비밀번호 확인</div>
            <input type="password"placeholder='패스워드를 다시 적어주세요' autoComplete="off" ref={passwordcheckinput}
            onChange={(e)=>pwd === e.target.value ? setPasswordcheck('일치하는 패스워드에요') :setPasswordcheck('패스워드가 틀려요') }
            />
             <div className={passwordcheck === '일치하는 패스워드에요' ? 'good-subinfo' : 'bad-subinfo'}>{passwordcheck}</div>
        </div>
        <div className='inputbox'>
            <div>닉네임</div>
            <input type="text"placeholder='사용하실 닉네임을 적어주세요' ref={nicknameinput}
            onChange={(e)=>e.target.value.length <= 1 ? setNickname('닉네임을 적어주세요') :setNickname('좋은 닉네임이네요')}
            />
            <div className={nickname === '좋은 닉네임이네요' ? 'good-subinfo' : 'bad-subinfo'}>{nickname}</div>
            <button 
            className={Id === '좋은 아이디네요!' && password === '비밀번호에 적합해요' && passwordcheck === '일치하는 패스워드에요' && nickname === '좋은 닉네임이네요' ? 'success-signupBtn' : 'failed-signupBtn'}
            onClick={usersignup}
            disabled={Id === '좋은 아이디네요!' && password === '비밀번호에 적합해요' && passwordcheck === '일치하는 패스워드에요' && nickname === '좋은 닉네임이네요' ? false : true}
            >완료</button>   
        </div>
    </SignUpBox>
    </Container>
  )
}

const Container = styled.div`
width:100vw;
height: 90vh;
margin-top: 80px;
display: flex;
justify-content: center;
align-items: center;
`
const SignUpBox = styled.div`
width:40%;
height: 60vh;
background: #fff;
box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
border: none;
border-radius: 10px;
padding:25px;

.signuptitle{
    text-align: center;
    font-size: 28px;
    font-weight: 500;
}

.inputbox{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
}


.inputbox input {
   border: 1px solid #E5E5E5;
   outline: none;
   min-height: 40px;
   transition: all .2s;
   width:50%;
   padding:0px 15px;
   border-radius: 5px;
   margin-bottom: 3px;
}

.inputbox div{
    width: 50%;
}

.success-signupBtn{
   border: none;
   min-height: 44px;
   transition: all .2s;
   width:50%;
   font-weight: 500;
   padding:0px 15px;
   border-radius: 5px;
   margin-top: 20px;
   background-color: #88AEE1;
}

.failed-signupBtn{
   border: none;
   min-height: 44px;
   transition: all .2s;
   width:50%;
   padding:0px 15px;
   border-radius: 5px;
   margin-top: 20px;
   font-weight:500;
   cursor: auto;
}

.good-subinfo{
    font-size: 14px;
    color:green;
}

.bad-subinfo{
    font-size: 14px;
    color:#EA6D6D;
}
`

export default Signup