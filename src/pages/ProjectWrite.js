import React,{useRef,useState} from 'react'
import styled from "styled-components"
import Header from '../compontents/Header'
import axios from 'axios'
import AWS from 'aws-sdk'
import { Link } from 'react-router-dom'


const ProjectWrite = () => {
    const [img ,setImg] = useState('')
    const [image,setImage] = useState('')
    const title = useRef()
    const content = useRef()
    const date = useRef()

    // AWS S3 정보 및 객체 이미지 저장 + 이미지 가져오기
    const GET_PUT_S3_AWS = async() =>{
      AWS.config.update({
        accessKeyId: process.env.REACT_APP_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
      })
  
      const myBucket = new AWS.S3({
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
      })

      const params = {
        ACL: 'public-read',
        Body: image,
        Bucket: process.env.REACT_APP_BUCKET_NAME,
        Key: image.name
      };

      myBucket.putObject(params).promise()
      .then(info=>{
        let s3url =  myBucket.getSignedUrl('getObject',{Bucket : process.env.REACT_APP_BUCKET_NAME, Key:image.name})
        const data = {
          "member_id" : "123123",
          "title" : title.current.value,
          "content" : content.current.value,
          "end_date" : date.current.value,
          "rep_image" : s3url
        }
        axios.post(`${process.env.REACT_APP_API_KEY}/projects`,data)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
      }) 
      .catch((err) =>{
        console.log(err)
      })
    }


    // 이미지 url 뽑아오는 함수(encodeFileToBase64)
    const encodeFileToBase64 = (fileBlob) => {
      console.log(fileBlob)
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImg(reader.result); // base64의 url 주소가 뽑힘
            resolve();
          };
        });
      };


    // 프로젝트 모집글 작성 함수(handlePost)
    const handlePost = () =>{
      GET_PUT_S3_AWS();
    }




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
          <button onClick={handlePost}>작성하기</button>
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




