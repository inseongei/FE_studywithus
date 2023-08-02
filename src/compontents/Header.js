/* eslint-disable */
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { GoChevronDown } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { Link,useNavigate } from 'react-router-dom'
import { FiChevronRight,FiClipboard,FiBookOpen,FiPower } from "react-icons/fi";
import axios from 'axios';


const Header = () => {
  // 메뉴 , 유저정보 , 로컬저장소token , 페이지이동훅
    const [openMenu , setopenMenu] = useState(false)  
    const token = localStorage.getItem('accessToken') 
    const nickname = localStorage.getItem('nickname')
    const navigate = useNavigate();


  // 로그아웃함수 (로컬저장소 토큰값 변경)
    const LogOut = () =>{
      localStorage.removeItem('nickname')
      localStorage.removeItem('email')
      localStorage.removeItem('photoUrl')
      localStorage.removeItem('accessToken')
      alert('로그아웃 되셨습니다')
      navigate('/Login')
      setopenMenu(false)
    }


/*==========================================================================================================================================*/

  return (
    <Container>
      <nav className='NavBar'>
      {token? <Link to="/UserMain"><span>StudyWithus</span></Link> : <Link to="/"><span>StudyWithus</span></Link>  }
      <div className='search-box'>
        <input type={'text'} className="searchBar" placeholder='원하는 프로젝트와 팀원을 찾아보세요 !'/>
        <FiSearch className='search-icon'></FiSearch>
      </div>

      <div className='LoginBtn'>
        {!token?
        <>
        <Link to="/Signup"><button>회원가입</button></Link>
        <Link to="/Login"><button>로그인</button></Link>
        </>
        :
        <button onClick={()=>setopenMenu(!openMenu)}>{nickname}님 <GoChevronDown></GoChevronDown></button> 
        }
      </div>

      {openMenu ?       
        <div className='sub-menu-wrap'>
          <div className='sub-menu'>
            <div className='user-info'>
              <h3>{nickname}님 환영합니다😊</h3>
            </div>
            <hr/>

            <Link to="/Portfolio" className='sub-menu-link'>
            <div className='icon'><FiBookOpen></FiBookOpen></div>
              <p>포트 폴리오</p>
              <div className='icon-box'><FiChevronRight></FiChevronRight></div>
            </Link>
            <Link to="/Schedule" className='sub-menu-link'>
            <div className='icon'><FiClipboard></FiClipboard></div>
              <p>일정 관리</p>
              <div className='icon-box'><FiChevronRight></FiChevronRight></div>
            </Link>
            <div className='sub-menu-link' onClick={LogOut}>
            <div className='icon'><FiPower></FiPower></div>
              <p>로그아웃</p>
              <div className='icon-box'><FiChevronRight></FiChevronRight></div>
            </div>
          </div>
        </div>
      : null}
      </nav>
    </Container>
  )
}


const Container = styled.div`
padding: 0 60px;
width: 100%;
height: 80px;
border: 1px solid #e5e8eb;
border-bottom-color: #e5e8eb;
position: fixed;
top: 0;
right: 0;
left: 0;
z-index: 2;
background-color: #fff;


.sub-menu-wrap{
  position: absolute;
  top:100%;
  right: 0;
  width:320px;
  max-height : 350px;
}

.icon-box{
  display: flex;
  align-items: center;
}
.sub-menu{
  background-color: rgb(250,250,250);
  padding:20px;
  margin:10px;
  border-radius: 8px;
}

.user-info{
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-info h3{
  font-weight: 500;
  
}

.user-info img {
  width:60px;
  height: 55px;
  border-radius: 50%;
  margin-right: 15px;
}

.sub-menu-link{
  display: flex;
  align-items: center;
  color:#525252;
  margin:12px 0;
  cursor: pointer;
}

.sub-menu-link p{
  width:100%;
}

.icon {
  display: flex;
  align-items: center;
  width:40px;
  background-color: #e5e5e5;
  border-radius: 50%;
  padding:8px;
  margin-right: 15px;
}

.sub-menu-link div{
  font-size: 22px;
  transition: transform 0.5s;
}

.sub-menu-link:hover div{
  transform: translateX(5px);
}

.sub-menu-link:hover p{
  font-weight: 600;
}
















.NavBar{
  margin: 0 auto;
  max-width: 2560px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  height: 100%;

}
.NavBar span{
  position: absolute;
  font-size: 22px;
  font-weight: 400;
  top: 22px;
  left: 0;
  width: 76px;
  height: 40px;
  z-index: 10;
  cursor : pointer;
}

.searchBar{
  min-height: 44px;
  outline:none;
  border: 1px solid #E5E5E5;
  transition: all .2s;
  width: 400px;
  padding: 0px 15px;
  border-radius: 36px;
  transition: all .2s;
}

.searchBar:focus{ 
  border: 1px solid #005B56;
}

.search-icon{
  font-size:20px;
  position: relative;
  right: 40px;
  cursor: pointer;
}

.search-box{
  display: flex;
  align-items : center;
}
.LoginBtn{
  position: absolute;
  top: 22px;
  right: 0;
}



.LoginBtn button {
  height : 36px;
  font-size : 13px;
  padding : 0 16px;
  border: none;
  border-radius: 5px;
  color: #fff;
  line-height: 0;
  font-weight: 700;
  background-color: #005B56;
  font-family: Pretendard;
  cursor: pointer;
  margin-right: 10px;
  line-height: 1;
  white-space: nowrap;
}

.LoginBtn button:hover{
  background-color:#458B70;
}

.ToggleMenu{
  left: auto;
  right: 0;
  width: 145px;
  background-color: hsla(0,0%,100%,.98);
  border-radius: 7px;
  box-shadow: 0 0 1px rgba(0,0,0,.25), 0 8px 20px rgba(0,0,0,.15);
  position: absolute;
  white-space: nowrap;
  top: 75%;
  opacity: 1;
  cursor: pointer;
}

.ToggleMenu li {
  font-weight: 600;
  width: 145px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ToggleMenu li:hover{
  background-color: rgba(139,149,161,.1);
}

.icon{
  position: relative;
  top:1px;
  right:2px;
}

`
export default Header