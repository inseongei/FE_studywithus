import React,{useRef,useState} from 'react'
import styled from "styled-components"
import Header from '../../compontents/Header'
import { Link,useNavigate } from 'react-router-dom'
import { collection, addDoc,serverTimestamp } from "firebase/firestore";
import {db,storage} from '../../server/firebase'
import { ref, uploadBytes,getDownloadURL  } from 'firebase/storage';
import project from '../../assets/project.png'

const ProjectWrite = () => {
    const [img ,setImg] = useState('')
    const [image,setImage] = useState('')
    const title = useRef()
    const content = useRef()
    const date = useRef()
    const navigate = useNavigate();
    const projects = collection(db,'projects')


    const checkInput = () =>{
      if(!title.current.value){
        alert('제목을 입력해주세요')
      } else if(!content.current.value){
        alert('내용을 입력해주세요')
      } else if(!date.current.value){
        alert('날짜를 지정하지 않았습니다.')
      } else {
        handlePost()
      }
    }
    


    const handlePost = () =>{
      // 파이어베이스 스토리지 경로설정 → images/이미지이름
      const storageRef = ref(storage, 'images/' + image.name)
      // 업로드 → url가져오기 → addDoc
      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => {
          const data = {
            title : title.current.value,
            content : content.current.value,
            end_date : date.current.value,
            rep_image : url.includes('undefined') ? project : url ,
            writer : localStorage.getItem('nickname'),
            createdAt : serverTimestamp(),
          }
          addDoc(projects,data)
          .then((res)=>{
            alert('게시글을 등록했습니다')
            navigate('/ProjectMain')
          })
          .catch((err)=>alert(err))
        }).catch((error) => {
          alert(error)
        })
      }).catch((error) => {
        alert(error)
      });
    }

    // 이미지 url 뽑아오는 함수(encodeFileToBase64)
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImg(reader.result); // base64의 url 주소가 뽑힘
            resolve();
          };
        });
      };


  return (
    <>
    <Header/>
    <Container>
      <div className='Project-title'>만들고 싶은 프로젝트를 모집해 보세요 !</div>
        <div className='main-box'> 
        <div className='image-box'>
            {img === '' ? 
            <div className="filebox">
              <label htmlFor="ex_file">대표사진 업로드</label> 
              <input type="file" id="ex_file" accept='image/*' onChange={(e)=>{
                encodeFileToBase64(e.target.files[0])
                setImage(e.target.files[0])
              }}/> 
            </div> 
        : 
            <img src={img} alt="사진"/>
            }
        </div>
        <div className='content-box'>
            <input type={'text'} className='title' placeholder='프로젝트명' ref={title}/>
            <div className='date'>
                    <div><input type={'date'} className='icon-box' ref={date}/></div>
                    <div className='info'> ( 모집 마감일 )</div>
            </div>
            <textarea className='content' placeholder='내용을 적어주세요!' ref={content}></textarea>
        </div>
        </div>
        <div className='Btn-box'>
          <Link to="/ProjectMain"><button>돌아가기</button></Link>
          <button onClick={checkInput}>작성하기</button>
        </div>
    </Container>
    </>

  )
}

const Container = styled.div`
margin-top: 80px;

.main-box{
    width:60vw;
    margin: auto;
    display: flex;
    align-items: center;
}


.image-box{
    width:550px;
    height: 450px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-box img {
  width:100%;
  height: 100%;
}

.info{
    font-size: 13px;
}

.content-box{
    width:55%;
}

.title{
    font-size: 16px;
    font-weight: 500;
    padding:15px 15px 15px 20px;
    margin:15px 15px 15px 20px;
    width:100%;
}

.Project-title{
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  padding: 20px;
}



.date{
    margin: 6px 0 8px 20px;
    font-size: 18px;
    display: flex;
    align-items: center;
}

.content{
    padding:20px;
    margin: 20px 0 8px 20px;
    background-color: rgb(250,250,250);
    width:100%;
    font-size: 14px;
    font-family: Pretendard;
    height: 300px;
}

.content div {
    padding:20px;
}

.Btn-box{
    display: flex;
    justify-content: flex-end;
    width:60vw;
    margin: auto; 
    position: relative;
    left:20px;
}

.Btn-box button {
    width:140px;
    height: 40px;
    border: none;
    font-weight: 500;
}

.Btn-box button:hover{
  font-weight: 700;
}

.Btn-box button:nth-child(1){
    margin-right: 20px;
}

.Btn-box button:nth-child(2){
    background-color: #88AEE1;
}



.icon{
 font-size: 18px;
 margin-right: 5px;
}

.icon-box{
    display: flex;
    align-items: center;
    border: none;
    padding: 5px;
}

.where {
  display: block;
  margin: 25px 15px;
  font-size: 11px;
  color: #000;
  text-decoration: none;
  font-family: verdana;
  font-style: italic;
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
export default ProjectWrite




