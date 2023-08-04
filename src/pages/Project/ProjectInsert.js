/* eslint-disable */
import React,{useRef,useState,useEffect} from 'react'
import styled from "styled-components"
import Header from '../../compontents/Header'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { updateDoc,serverTimestamp } from "firebase/firestore";
import {db,storage} from '../../server/firebase'
import { ref, uploadBytes,getDownloadURL,deleteObject } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import Loading from '../../pages/Loading'
const ProjectWrite = () => {
    const [img ,setImg] = useState('') // base64의 url 주소가 뽑힘
    const [image,setImage] = useState('')
    const title = useRef()
    const content = useRef()
    const date = useRef()
    const navigate = useNavigate();
    const {projectId} = useParams();
    const projects = doc(db,'projects',projectId)
    const [project, setProject] = useState();
/*==========================================================================================================================================*/


// 첫 렌더링 시 한번만 실행
useEffect(() => {
    fetchProject();
  }, []);


// 해당 프로젝트 아이디의 정보를 가져오는 함수
const fetchProject = async () => {
    try {
      const projectSnapshot = await getDoc(projects);

      if (projectSnapshot.exists()) {
        const projectData = projectSnapshot.data();
        setProject(projectData);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  };


// 게시글 내용 확인 함수 
const checkInput = () =>{
    if(!title.current.value){
        alert('제목을 입력해주세요')
    } else if(!content.current.value){
        alert('내용을 입력해주세요')
    } else if(!date.current.value){
        alert('날짜를 지정하지 않았습니다.')
    } else {
        handleEdit()
    }
}


// 수정할 때 기존 이미지 삭제
const deleteImage = () =>{
    const previousImageUrl = project.rep_image;
    const previousImageRef = ref(storage, previousImageUrl);
    deleteObject(previousImageRef)
}


// 게시글 수정 함수
const handleEdit = () => {
  // 파이어베이스 스토리지 경로설정 → images/이미지이름
  const storageRef = ref(storage, 'images/' + image.name);

  deleteImage()
  // 업로드 → url가져오기
  uploadBytes(storageRef, image)
    .then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        const newData = {
          title: title.current.value,
          content: content.current.value,
          end_date: date.current.value,
          rep_image: url.includes('undefined') ? project : url,
          writer: localStorage.getItem('nickname'),
          createdAt: serverTimestamp(),
        };

        // 게시글 문서 업데이트
        updateDoc(doc(db, 'projects', projectId), newData)
          .then(() => {
            alert('게시글을 수정했습니다');
            navigate(-1); // 이전 페이지로 돌아가기
          })
          .catch((err) => alert(err));
      });
    })
    .catch((error) => {
      alert(error);
    });
};



// 이미지 url 뽑아오는 함수(encodeFileToBase64)
const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
return new Promise((resolve) => {
    reader.onload = () => {
    setImg(reader.result) 
    resolve()
}})
}


// 프로젝트 state 받아오기전 로딩화면 렌더링
if (!project) {
    return <Loading/>;
}


/*==========================================================================================================================================*/
  return (
    <>
    <Header/>
    <Container>
      <div className='Project-title'>작성한 프로젝트를 수정해 보세요 !</div>
        <div className='main-box'> 
        <div className='image-box'>
            {!img ? 
            <img src={project.rep_image} alt="사진"/>
            :
            <img src={img} alt="사진"/>
            }
        </div>
        <div className='content-box'>
            <input type={'text'} className='title' placeholder='프로젝트명' ref={title} defaultValue={project.title}/>
            <div className='date'>
                    <div><input type={'date'} className='icon-box' ref={date} defaultValue={project.end_date}/></div>
                    <div className='info'> ( 모집 마감일 )</div>
            </div>
            <textarea className='content' placeholder='내용을 적어주세요!' ref={content} defaultValue={project.content}></textarea>
        </div>
        </div>
        <div className='Btn-box'>
        <div className="filebox">
              <label htmlFor="ex_file">대표사진 업로드</label> 
              <input type="file" id="ex_file" accept='image/*' onChange={(e)=>{
                encodeFileToBase64(e.target.files[0])
                setImage(e.target.files[0])
              }}/> 
        </div> 
        <div>
        <Link to={`/ProjectDetail/${projectId}`}><button>돌아가기</button></Link>
            <button onClick={checkInput}>수정완료</button>
        </div>

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
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-box img {
  width:100%;
  height: 100%;
  border-radius: 10px;
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
    justify-content: space-between;
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
.filebox {
    display:inline-block;
    margin-right: 10px;
}


.filebox label {
  padding: .5em .75em;
  color: #999;
  background-color: #fdfdfd;
  cursor: pointer;
  border: 1px solid #ebebeb;
  border-bottom-color: #e2e2e2;
  border-radius: .25em;
  height: 40px;
  display: flex;
  align-items: center;
  margin-left:170px;
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




