/* eslint-disable */
import React,{useState} from 'react'
import styled from 'styled-components'
import { GoChevronDown,GoPersonFill,GoMoveToStart } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom'
import { FiChevronRight,FiClipboard,FiBookOpen,FiPower } from "react-icons/fi";
import user from '../images/user.png'
import { CheckLogin } from '../Recoil/Atom/CheckAtom';
import { useRecoilState } from 'recoil';

const Header = () => {
  // openMenu : 헤더이름메뉴(state) , Login : 로그인여부체크(state) 
  const [openMenu , setopenMenu] = useState(false)
  const [Login,setLogin] = useRecoilState(CheckLogin); 

  // 로그아웃함수 (로컬저장소 토큰값 변경)
  const LogOut = () =>{
    localStorage.setItem('accessToken',''),localStorage.setItem('kakao',false),localStorage.setItem('naver',false)
    setopenMenu(false),setLogin('')
  }



  return (
    <Container>
      <nav className='NavBar'>
      {Login !== '' ? <Link to="/UserMain"><span>StudyWithus</span></Link> : <Link to="/"><span>StudyWithus</span></Link>  }
      <div className='search-box'>
        <input type={'text'} className="searchBar" placeholder='원하는 프로젝트와 팀원을 찾아보세요 !'/>
        <FiSearch className='search-icon'></FiSearch>
      </div>

      <div className='LoginBtn'>
        {Login !==''  ?
        <button onClick={()=>setopenMenu(!openMenu)}>정인성님 <GoChevronDown></GoChevronDown></button> 
        :
        <Link to="/Login"><button>로그인</button></Link>
        }
      </div>

      {openMenu ?       
        <div className='sub-menu-wrap'>
          <div className='sub-menu'>
            <div className='user-info'>
              <img src={user} alt="사진"/>
              <h3>정인성</h3>
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
  background-color: #fff;
  padding:20px;
  margin:10px;
  border-radius: 8px;
}

.user-info{
  display: flex;
  align-items: center;
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

.sub-menu hr{
  border: 0;
  height: 1px;
  width: 100%;
  background: #ccc;
  margin:10px 0 10px;
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
}

.searchBar:focus{ 
  border: 1px solid #6750A4;
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
  background-color: #458B70;
  font-family: Pretendard;
  cursor: pointer;
  margin-right: 10px;
  line-height: 1;
  white-space: nowrap;
}

.LoginBtn button:hover{
  background-color:#005B56;
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