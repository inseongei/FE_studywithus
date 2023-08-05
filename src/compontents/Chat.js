import React,{useEffect,useState,useRef} from 'react'
import { useParams } from "react-router-dom";
import {addDoc, collection , serverTimestamp,onSnapshot,query,where,orderBy} from 'firebase/firestore'
import {db} from '../server/firebase'
import { IoMdSend } from "react-icons/io";
import styled from 'styled-components'



const Chat = () => {
    const [newMessage ,setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messageRef = collection(db,"chats")
    const {roomId} =useParams()
    const nickname = localStorage.getItem('nickname');
    const messageEndRef = useRef(null);
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${hours}시 ${minutes}분 `;


    const activeButton = (e) =>{
        if(e.key === "Enter") {
            handleSend();
          }
     }

     const handleSend = async() =>{
        if (newMessage ==="") return;
        await addDoc(messageRef,{
         text : newMessage,
         date : formattedDate,
         createdAt : serverTimestamp(),
         user: localStorage.getItem('nickname'),
         roomId,
        })
        setNewMessage('')
    }


      useEffect(() => {
         messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);

      useEffect(()=>{
        const queryMessages = query(messageRef,where("roomId", "==", roomId),
        orderBy("createdAt",'desc')
        )
        const unsuscribe = onSnapshot(queryMessages,(snapshot)=>{
            let messages = [];
            snapshot.forEach((doc) =>{
                messages.push({...doc.data(),id: doc.id})
            })
            setMessages(messages)
        })

        return () => unsuscribe();
    },[])







  return (
    <Container>
        <div className='chatBox'>
        <div className='chat-content-box'>
            {messages &&messages.map((data,idx)=>(
        <>
            {data.user === nickname ? 
            <div className='my-chat' key={idx}>
                <div className='my-nickname'>{nickname}</div>
                <div className='my-chatting'>{data.text}</div>
            </div>  
        : 
            <div className='your-chat'>
                <div className='your-nickname'>{data.user}</div>
                <div className='your-chatting'>{data.text}</div>
            </div>
            }
        </>
            ))}

        </div>
        <div className='inputBox'>
        <div  ref={messageEndRef}></div>
            <input type={'text'} placeholder="메시지를 입력해주세요"onKeyDown={activeButton} value={newMessage} onChange={(e)=> setNewMessage(e.target.value)}/>
            <IoMdSend className='send-icon' onClick={handleSend}></IoMdSend>
        </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
.chatBox{
    width:100%;
    height: 100vh;
    background-color: #E5E5E5;
    display: flex;
    flex-direction: column;
    box-shadow: 10px 10px 20px 10px rgba(0,0,0,.05);
    overflow: auto;
}

.inputBox{
    width: 100%;
    height: 50px;
    border-radius: 10px;
    background-color: rgb(250,250,250);   
    display :flex;
}

.inputBox input{
    width: 100%;
    height: 50px;
    background-color: rgb(250,250,250); 
    border :none;
    padding-left: 20px;
    outline: none;
}

.inputBox input:focus{
    box-shadow: 0 16px 24px rgba(0,0,0,.06);
}

.send-icon{
    font-size: 30px;
    height: 50px;
    margin-right: 20px;
    cursor: pointer;
}

.chat-content-box{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
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

/* 아래의 모든 코드는 영역::코드로 사용 */
.chatBox::-webkit-scrollbar {
    width: 10px;  
}

.chatBox::-webkit-scrollbar-thumb {
    height: 30%; 
    background:  #005B56;
    border-radius: 10px;
}

.chatBox::-webkit-scrollbar-track {
    background: #D9F0E6;
}


`

export default Chat