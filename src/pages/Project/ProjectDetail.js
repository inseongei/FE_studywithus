import React,{useEffect,useState} from 'react'
import styled from "styled-components"
import Header from '../../compontents/Header'
import { MdDateRange } from "react-icons/md";
import { useParams,Link,useNavigate } from 'react-router-dom';
import { doc, getDoc,deleteDoc  } from 'firebase/firestore';
import { ref,deleteObject } from 'firebase/storage';
import {db,storage} from '../../server/firebase'
import Loading from '../Loading'
import {ProjectChat} from '../../server/atoms'
import {useRecoilState} from 'recoil'
import ChatModal from './ChatModal';

const ProjectDetail = () => {
    const {projectId} = useParams();
    const [project, setProject] = useState();
    const navigate = useNavigate();
    const [chatOn,setChatOn]  = useRecoilState(ProjectChat) 

    useEffect(() => {
        const fetchProject = async () => {
          try {
            const projectRef = doc(db, 'projects', projectId);
            const projectSnapshot = await getDoc(projectRef);
    
            if (projectSnapshot.exists()) {
              const projectData = projectSnapshot.data();
              setProject(projectData);
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            alert(error)
          }
        };
    
        fetchProject();
      }, [projectId]);

      if (!project) {
        return <Loading/>;
      }



const handleDelete = () => {
  // 문서 삭제
  const previousImageUrl = project.rep_image;
  const previousImageRef = ref(storage, previousImageUrl);
  deleteObject(previousImageRef)
  deleteDoc(doc(db, 'projects', projectId))
    .then(() => {
      // 이미지 삭제 등 추가 작업을 수행할 수 있습니다.
      alert('게시글을 삭제했습니다');
      navigate('/ProjectMain'); // 삭제 후 이동할 경로 설정
    })
    .catch((error) => {
      alert('게시글 삭제 실패:', error);
    });
};

  return (
    <>
    <Header/>
    <Container>
        <div className='main-box'> 
        <div className='image-box'>
            <img src={project.rep_image} alt="사진"/>
        </div>
        <div className='content-box'>
            <div className='title'>{project.title}</div>
            <div className='date'>
                <div className='icon-box'><MdDateRange className='icon'></MdDateRange></div>
                <div>{project.end_date}</div>
            </div>
            <div className='content'>
                <div>{project.content}</div>
            </div>
        </div>
        </div>

        <div className='Btn-box'>
            {project.writer === localStorage.getItem('nickname') ? 
            <>
            <button className='deleteBtn' onClick={handleDelete}>삭제하기</button>
            <Link to={`/ProjectInsert/${projectId}`}><button className='insertBtn'>수정하기</button></Link>
            </>
            : 
            <>
            <Link to ="/ProjectMain"><button className='gobackBtn'>돌아가기</button></Link>
            <button className='choiceBtn' onClick={()=>setChatOn(true)}>신청하기</button>
            </>
            }
        </div>
        {chatOn ? <ChatModal project={project}/>: '' }
    </Container>
    </>

  )
}

const Container = styled.div`
margin-top: 160px;

.main-box{
    width:60vw;
    margin: auto;
    display: flex;
    align-items: center;
}


.image-box{
    width:550px;
    height: 450px;
    border-radius: 10px;
}

.image-box img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: transform 0.3s;
}

img:hover{
  transform: scale(1.02);
}

.content-box{
    width:55%;
    margin-left: 10px;
}

.title{
    font-size: 24px;
    font-weight: 500;
    padding:15px 15px 15px 20px;
}

.date{
    margin: 6px 0 8px 20px;
    font-size: 18px;
    display: flex;
    align-items: center;
}

.content{
    margin: 20px 0 8px 20px;
    background-color: rgb(250,250,250);
    width:100%;
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

.Btn-box button:hover{
    transform: scale(1.02);
}

.icon{
 font-size: 18px;
 margin-right: 5px;
}

.icon-box{
    display: flex;
    align-items: center;
}

.insertBtn{
    margin-left: 20px;
    background-color: #88AEE1;
    font-weight: 700;
}

.deleteBtn{
    background-color: #DC7F7F;
    font-weight: 700;
}

.choiceBtn{
    margin-left: 20px;
    background-color: #005B56;
    color:#fff;
}
`
export default ProjectDetail