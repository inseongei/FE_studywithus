/* eslint-disable */
import React,{useState} from 'react'
import styled from 'styled-components'
import { GoChevronDown,GoPersonFill,GoMoveToStart } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom'

const Header = () => {
  // 드롭다운 메뉴 여는 state : 0일때 보이고 1일때 보임
  const [openMenu , setopenMenu] = useState(false)
  return (
    <Container>
      <nav className='NavBar'>
      <Link to="/"><span>StudyWithus</span></Link>
      <div className='search-box'>
        <input type={'text'} className="searchBar" placeholder='원하는 프로젝트와 팀원을 찾아보세요 !'/>
        <FiSearch className='search-icon'></FiSearch>
      </div>

      <div className='LoginBtn'>
      <Link to="/Login"><button>로그인</button></Link>
      {/* <button onClick={()=>setopenMenu(!openMenu)}>정인성님 <GoChevronDown></GoChevronDown></button>  */}
      </div>

      {openMenu ?       
      <ul className='ToggleMenu'>
        <li ><GoPersonFill className='icon'></GoPersonFill> 마이페이지</li>
        <li><GoMoveToStart className='icon'></GoMoveToStart> 로그아웃</li>
      </ul>
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