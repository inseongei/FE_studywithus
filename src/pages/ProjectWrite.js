import React,{useState} from 'react'
import styled from "styled-components"
import Header from '../compontents/Header'
import axios from 'axios'
import AWS from 'aws-sdk'


const ProjectWrite = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [date,setDate] = useState('')
    const [img ,setImg] = useState('')
    const [image,setImage] = useState('')
    const [test,setTest] = useState('')
    console.log(image)
    
    
  console.log('안녕')
    // const config = {
    //     bucketName : process.env.REACT_APP_BUCKET_NAME,
    //     region : process.env.REACT_APP_REGION,
    //     accessKeyId : process.env.REACT_APP_ACCESS_KEY,
    //     secretAccessKey : process.env.REACT_APP_SECRET_ACCESS_KEY
    // }

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
  })

  const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_BUCKET_NAME},
    region: process.env.REACT_APP_REGION,
  })






    // 프로젝트 모집글 작성 함수(handlePost)
    const handlePost = () =>{
        // e.preventDefault();
        // const formData = new FormData();
        // formData.append("title",title)
        // formData.append("content",content)
        // formData.append("date",date)
        // formData.append("img",img)

        // axios.post(`${process.env.REACT_APP_API_KEY}/projects`,formData)
        // .then((res)=>console.log(res))
        // .catch((err)=>console.log(err))

        const params = {
          ACL: 'public-read',
          Body: image,
          Bucket: process.env.REACT_APP_BUCKET_NAME,
          Key: image.name
      };


      myBucket.putObject(params).promise()
      .then(data=>{
        const url =  myBucket.getSignedUrl('getObject',{Bucket : process.env.REACT_APP_BUCKET_NAME, Key:image.name})
        console.log(url)
        setTest(url)
      })
      .catch(err =>{
        console.log(err)
      })











    }











    // 이미지 url 뽑아오는 함수(encodeFileToBase64)
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
          reader.onload = () => {
            setImg(reader.result);
            resolve();
          };
        });
      };







  return (
    <>
    <Header/>
    <Container>
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
            <input type={'text'} className='title' placeholder='프로젝트명' onChange={(e)=>setTitle(e.target.value)}/>
            <div className='date'>
                    <div><input type={'date'} className='icon-box' onChange={(e)=>setDate(e.target.value)}/></div>
                    <div className='info'> ( 모집 마감일 )</div>
            </div>
            <textarea className='content' placeholder='내용을 적어주세요!' onChange={(e)=>setContent(e.target.value)}></textarea>
        </div>
        </div>
        <div className='Btn-box'>
            <button>돌아가기</button>
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
    border: 1px solid #CDCFEA;
    width:100%;
}

.title:focus{
    outline: none;
    border: 1px solid #6750A4;
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
}

.Btn-box button:nth-child(1){
    margin-right: 20px;
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




