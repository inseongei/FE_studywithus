import React from 'react'
import styled from 'styled-components'
import Header from '../compontents/Header'

const PortfolioWrite = () => {
  return (
    <>
    <Header/>
    <Container>
    <div className='firstBox'>
        <div className='img-box'>
            <div className='big-img'>
            <div className="filebox">
              <label for="ex_file">사진 업로드-최대4장</label> 
              <input type="file" id="ex_file"/> 
            </div>
            </div>
            <div className='small-img'>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
        </div>
        <div className='info-box'>
            <input type="text"className='info-title' placeholder='제목을 입력하세요'/>
            <input type="date" className='info-date'/>
            <div className='info-content'>
                <div>
                    <div className='title'>프로젝트 소개</div>
                    <textarea className='content' placeholder='내용을 적어주세요'></textarea>
                </div>
            </div>
        </div>
    </div>


    <div className='SecondBox'>
        <div className='stack'>
        ✍사용 기술 :  <input type="text" placeholder='ex) React '/>
        <div className='stack-box'>
            </div>
        </div>

        <div className='skill'>
            <div>🤸경험 스킬 : <input type="text" placeholder='ex) AWS S3를 이용한 사이트 배포 '/></div>
            <div className='skill-box'>
            </div>
        </div>

    </div>
    </Container>
    </>
  )
}


const Container = styled.div`
width: 80vw;
margin: 80px auto auto auto;
border: 1px solid black;
height: 100%;
display: flex;
flex-direction: column;

.firstBox{
    display: flex;
    height: 50%;
    border-bottom: 1px solid black;
}

.SecondBox{
    height: 500px;
    display: flex;
}

.SecondBox input {
    width:50%;
    padding: 7px;
}

.img-box{
    width: 30%;
}

.info-box{
    width: 70%;
}

.big-img{
    border: 1px solid black;
    width: 100%;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.small-img{
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}
.small-img div {
    border: 1px solid black;
    width:200px;
    height: 150px;
}

.info-title{
    height: 15%;
    font-size: 27px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    font-weight: 500;
    border: none;
}

.info-date{
    height: 5%;
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: gray;
    border: none;
}

.info-content{
    height: 80%;
    padding: 20px 0px 15px 15px;

}

.title{
    font-size: 18px;
    margin-bottom: 10px;
}

.content{
    width:80%;
    border-radius: 6px;
    height: 300px;
    padding: 10px;
    background-color: aliceblue;
    border: none;
}

.stack{
    border-right: 1px solid black;
    width: 50%;
    padding: 20px;
    font-size: 22px;
    font-weight: 500;
}


.skill{
    width:50%;
    padding:20px;
    font-size: 22px;
    font-weight: 500;
}

.stack-box{
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap:15px;
}

.stack-box div{
    border-radius: 20px;
    text-align: center;
    background-color: antiquewhite;
}

.skill-box{
    padding: 20px;
    overflow: hidden;
}

.skill-box div {
    margin-bottom: 20px;
}

.filebox {display:inline-block; margin-right: 10px;}


.filebox label {
  display: inline-block;
  padding: .5em .75em;
  color: #999;
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: .25em;
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

.filebox.bs3-primary label {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}

.filebox.bs3-success label {
  color: #fff;
  background-color: #5cb85c;
  border-color: #4cae4c;
}





`
export default PortfolioWrite