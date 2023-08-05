import React,{useState,useRef} from 'react'
import Header from './../compontents/Header';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";


const Signup = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [Id,setId] = useState('')
    const [password,setPassword] = useState('')
    const [passwordcheck,setPasswordcheck] = useState('')
    const [nickname,setNickname] = useState('')
    const [pwd , setPwd] =useState('')



    const idinput = useRef('')
    const passwordinput = useRef('')
    const passwordcheckinput = useRef('')
    const nicknameinput = useRef('')
    const checked = (Id === '좋은 아이디입니다!' && password === '안전한 패스워드입니다' && passwordcheck === '패스워드가 일치합니다' && nickname === '사용 가능한 닉네임입니다')

/*==================================================================================================================================================================*/
    // 회원가입     
    const usersignup = () =>{
      let email = idinput.current.value
      let password = passwordinput.current.value

       createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          updateProfile(auth.currentUser, {
              displayName: nicknameinput.current.value, photoURL: 's3url'
            }).then(() => {
              alert('회원가입에 성공하셨습니다')
              navigate('/Login')
            }).catch((error) => {
              alert(error)
            });
        })
        .catch((error) => {
                alert(error)
        });




    }


    























        


















  return (
    <Container>
    <Header/>
    <SignUpBox>
        <div className='signuptitle'>회원가입</div>
        <div className='inputbox'>
            <div>아이디</div> 
            <input type="text" placeholder='이메일을 적어주세요' ref={idinput} 
            onChange={(e)=>e.target.value.includes('@') ? setId('좋은 아이디입니다!') : setId('올바른 이메일 형식이 아닙니다')}/>
            <div className={Id === '좋은 아이디입니다!' ? 'good-subinfo' : 'bad-subinfo'}>{Id}</div>
        </div>
        <div className='inputbox'>
            <div>비밀번호</div>
            <input type="password" placeholder='6자 이상 만들어주세요' autoComplete="off"  ref={passwordinput}
            onChange={(e)=>{
                setPwd(e.target.value)
                    e.target.value.length > 5 ? (
                    setPassword('안전한 패스워드입니다')
                )
                    : setPassword('안전하지 않은 패스워드입니다')
            }}
            />
            <div className={password === '안전한 패스워드입니다' ? 'good-subinfo' : 'bad-subinfo'}>{password}</div>
        </div>
        <div className='inputbox'>
            <div>비밀번호 확인</div>
            <input type="password"placeholder='패스워드를 다시 적어주세요' autoComplete="off" ref={passwordcheckinput}
            onChange={(e)=>{
                pwd === e.target.value ? setPasswordcheck('패스워드가 일치합니다') :setPasswordcheck('패스워드가 일치하지 않습니다')
            }}
            />
             <div className={passwordcheck === '패스워드가 일치합니다' ? 'good-subinfo' : 'bad-subinfo'}>{passwordcheck}</div>
        </div>
        <div className='inputbox'>
            <div>닉네임</div>
            <input type="text"placeholder='사용하실 닉네임을 적어주세요' ref={nicknameinput}
            onChange={(e)=>e.target.value.length <= 1 ? setNickname('닉네임을 적어주세요') :setNickname('사용 가능한 닉네임입니다')}
            />
            <div className={nickname === '사용 가능한 닉네임입니다' ? 'good-subinfo' : 'bad-subinfo'}>{nickname}</div>
            <button 
            className={ checked ? 'success-signupBtn' : 'failed-signupBtn'}
            onClick={usersignup}
            disabled={checked ? false : true}
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
.text-info{
    text-align: center;
    color: #005B56;
    padding-top: 10px;
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
   font-weight: 700;
}


.Profile-image{
    margin-top: 20px;
    border: 1px solid #E5E5E5;
    width:150px;
    height: 150px;
    border-radius: 50%;
}

.image-size{
    width:150px;
    height: 150px;
    border-radius: 50%;
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
   font-weight: 700;
}

.good-subinfo{
    font-size: 14px;
    color:green;
}

.bad-subinfo{
    font-size: 14px;
    color:#EA6D6D;
}

.filebox {
    text-align: center;
}


.filebox label {
  display: inline-block;
  padding: .5em .75em;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: .25em;
  margin-top: 15px;
}

.filebox input[type="file"] {  /* 파일 필드 숨기기 */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip:rect(0,0,0,0);
  border: 0;
}

.imagebox{
    display: flex;
    justify-content: center;
}

`

export default Signup