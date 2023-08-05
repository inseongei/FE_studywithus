import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components'
import { FaRegTimesCircle} from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import {useRecoilState} from 'recoil'
import {ProjectChat} from '../../server/atoms'
import {addDoc, collection , serverTimestamp,onSnapshot,query,where,orderBy} from 'firebase/firestore'
import {db} from '../../server/firebase'



const MyChat = (id) => {
  const [chatOn,setChatOn]  = useRecoilState(ProjectChat) 
  const [message,setMessage] = useState('')
  const [data,setData] = useState([])
  const messageRef = collection(db,"projectchats")
  const nickname = localStorage.getItem('nickname')
  const chatboxRef = useRef(null); 

// props로 받아온 id값 과 projectId가 동일한 문서 출력해서 data state에 저장
useEffect(()=>{
    const queryMessages = query(messageRef,where("projectId", "==", id.id.id),
    orderBy("createdAt",'asc')
    )
    const unsuscribe = onSnapshot(queryMessages,(snapshot)=>{
        let messages = [];
        snapshot.forEach((doc) =>{
            messages.push({...doc.data(),id: doc.id})
        })
        setData(messages)
})
return () => unsuscribe();
},[id.id.id])


// 엔터키 조작
const activeButton = (e) =>{
    if(e.key === "Enter") {
        handleSend();
        }
}

// 메시지 보내는 함수 - addDoc
const handleSend = async() =>{
    const data = {
        createdAt : serverTimestamp(),
        user : nickname,
        message,
        projectId : id.id.id,
    }

if (message ==="") return
await addDoc(messageRef,data)
setMessage('')
}


// data 배열이 업데이트될 때마다 스크롤을 아래로 내리는 코드
useEffect(() => {
if (chatboxRef.current) {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
}
}, [data]);





  return (
    <Container>
        <div className='oneBox'>
          <div></div>
          <div className='title'>{id.id.title}</div>
          <div><FaRegTimesCircle className='close-icon' onClick={()=>setChatOn(false)}></FaRegTimesCircle></div>
        </div>

        <div className='secondBox'>
          <div className='chatbox' ref={chatboxRef}>
          {data&&data.map((data)=>(
            <>
            {data.user === nickname ? 
            <div className='my-chat' key={data.projectId}>
                <div className='my-nickname'>{nickname}</div>
                <div className='my-chatting'>{data.message}</div>
            </div>  
            : 
            <div className='your-chat'>
                <div className='your-nickname'>{data.user}</div>
                <div className='your-chatting'>{data.message}</div>
            </div>

            }


        </>
            ))}
          


          </div>











          
          <div className='inputbox'>
            <div className='scroll-box'></div>
            <div className='three-box'>
              <input type="text"
              className='chat-input' 
              placeholder='작성자와 대화를 나눠보세요'
              onChange={(e)=>setMessage(e.target.value)}
              value={message}
              onKeyDown={activeButton}
              />
              <AiOutlineSend className='chat-icon' onClick={handleSend}></AiOutlineSend>
            </div>
            
          </div>
        </div>
    </Container>
  )
}


const Container = styled.div`
  width: 40%;
  height: 80%;
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #e5e5e5;
  border-radius: 10px;


  .title{
    font-size: 24px;
    font-weight: 500;
    padding:15px 15px 15px 20px;
}
  .oneBox{
    border-radius: 10px;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .secondBox{
    border-radius: 10px;
    height: 90%;
  }

  .three-box{
    display: flex;
    height: 90%;
    align-items: center;
  }

  .close-icon{
    font-size: 25px;
    margin-right: 20px;
    cursor: pointer;
  }

  .close-icon:hover{
    color: red;
  }

  .chatbox{
    height: 92%;
    overflow-y: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }

  .inputbox{
    height: 8%;
    border-radius: 10px;
  }

  .chat-input{
    width:100%;
    background-color: rgb(250,250,250);
    height: 100%;
    border: none;
    border-radius: 10px;
    outline: none;
    padding-left: 10px;
    font-weight: 500;
  }

  .chat-input::placeholder{
    font-weight: 500;
  }

  .chat-icon{
    font-size: 25px;
    position: absolute;
    right:10px;
    cursor: pointer;
  }

  .scroll-box{
    height: 10%;
  }

.my-chat{
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.your-chat{
    width:100%;
    display: flex;
    flex-direction: column;
}

.my-chatting {
    background-color: #D9F0E6;
    width:300px;
    height:fit-content;
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
    padding: 10px 10px 10px 20px;
    border-radius: 20px 20px 0px 20px;
    margin: 0px 10px 20px 0px;
    font-weight: 500;
}

.my-nickname{
    font-weight: 700;
    margin-right: 20px;
    color:#005B56;
}

.your-chatting {
    background-color:rgb(250,250,250);
    width:300px;
    height:fit-content;
    padding: 10px 10px 10px 20px;
    border-radius: 20px 20px 20px 0px;
    margin: 0px 0px 20px 10px;
    font-weight: 500;
}

.your-nickname{
    margin-left : 10px;
    font-weight: 700;
}















`
export default MyChat