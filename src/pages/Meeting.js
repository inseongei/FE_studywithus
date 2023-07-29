import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash,faMicrophoneSlash,faDesktop } from '@fortawesome/free-solid-svg-icons'
import React,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components'
import { IoMdSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import {db} from '../server/firebase'
import {addDoc, collection , serverTimestamp,onSnapshot,query,where,orderBy} from 'firebase/firestore'



const Meeting = () => {
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

    useEffect(() => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);



    useEffect(()=>{
        const queryMessages = query(messageRef,where("roomId", "==", roomId),
        orderBy("createdAt")
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
  return (
    <Container>
        <div className='videoBox'>
            <div className='titlebox'></div>
            <div className='mevideobox'>
                <div className='meinfo'>
                    <div className="mename"></div>
                    <div className='iconbox'>
                        <div className="meeting-icons"><FontAwesomeIcon icon={faVideoSlash}/></div>
                        <div className="meeting-icons"><FontAwesomeIcon icon={faMicrophoneSlash}/></div>
                        <div className="meeting-icons"><FontAwesomeIcon icon={faDesktop}/></div>
                    </div>
                </div>
            </div>
            <div className='youvideobox'>
                <div className='usersvideo'>
                    <div className="one">
                        <div className="mename"></div>
                        <div className="meeting-icons"><FontAwesomeIcon icon={faMicrophoneSlash}/></div>
                    </div>
                </div>
                <div className='usersvideo'></div>
                <div className='usersvideo'></div>
            </div>
        </div>

        <div className='chattingBox'>
            <div className="chatBox">
                <div className="userchat">
                    <div className="userlist">
                        <div>User List</div>
                        <div className="userbox">
                            <div>user1</div>
                            <div>user2</div>
                            <div>user3</div>
                            <div>user4</div>
                        </div>
                    </div>
                    <div className="messageBox">
                        {messages.map((message)=>
                        <div key={message.id}>
                            
                        {message.user === nickname ? 
                        
                            <div className="My-message">
                                <div className="message-content">
                                {message.text}
                                </div>
                                <div className="message-time">{message.date}</div>
                            </div>
                    :  

                    <div className="you-message">
                        <div className="user-info-box">
                            <div>
                                <img src="https://mblogthumb-phinf.pstatic.net/MjAxODAxMjJfNDkg/MDAxNTE2NTUyMjA5NzQ0.OZSXOIazSZGiJN8HfDnmMviQMyOm3eLSrVc969WRdcog.RQwWjj_sppraKAdn3Hkl9ncivKB4-pCWvZOD5uiO1DIg.PNG.d_hye97/31.png?type=w800" alt="사진"className="user-profile-image"/>
                            </div>
                            <div className="username">{message.user}</div>
                        </div>
                        <div className="my-message-content">
                        {message.text}
                        </div>
                        <div className="message-time">{message.date}</div>
                    </div>






                        }

                        </div>
                        )}    
                        <div ref={messageEndRef}></div>   
                    </div>
                </div>
                <div className="chatinput">
                    <input type="text" placeholder="메시지를 입력하세요" onChange={(e)=> setNewMessage(e.target.value)} value={newMessage}/>
                    <IoMdSend className="icon" onClick={handleSend}></IoMdSend>
                </div>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
.videoBox{
    height: 90vh;
    width: 65%;
    padding:20px;
}

.titlebox{
    background-color: rgb(250,250,250);
    width: 100%;
    height: 10%;
    border-radius: 10px;
}

.mevideobox{
    width: 100%;
    height: 60%;
    background-color: rgb(250,250,250);
    margin: 20px 0px;
    border-radius: 10px;
}

.youvideobox{
    height: 30%;
    display: flex;
    width:100%;
    background-color: rgb(250,250,250);
    padding: 15px;
}

.usersvideo{
    width:100%;
    background-color: #fff;
    margin: 0px 20px;
    border-radius: 10px;
}

.meinfo{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:20px;
}

.iconbox{
    display: flex;
}

.meeting-icons{
    color: white;
    border-radius: 50%;
    background-color:#E5E5E5;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.mename{
    width:100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    background-color: #E5E5E5;
}

.users{
    float: right;
    height: 30%;
}

.one{
    height: 30%;
    width: 100%;
    float: right;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
}

.chattingBox{
    width: 35%;
    padding:20px;
}

.chatBox{
    background-color: rgb(250,250,250);
    height: 90vh;
    border-radius: 10px;
    padding: 20px;
}

.userchat{
    height: 90%;
}

.chatinput{
    height: 10%;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chatinput input {
   border: 1px solid #E5E5E5;
   outline: none;
   height: 50px;
   transition: all .2s;
   width:100%;
   padding:0px 15px;
   margin-bottom: 3px;
   border-radius: 40px;
   background-color: transparent; 
}

.icon{
   font-size :30px;
   position: relative;
   right: 40px;
   cursor: pointer;
}

.userlist{
    background-color: #E5E5E5;
    border-radius: 5px;
    height: 15%;
    padding: 15px;
}

.userbox{
    display: flex;
}

.userbox div{
    margin: 20px;
}

.messageBox{
    height: 85%;
    padding:30px;
    width:100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
}

.user-profile-image{
    width: 50px;
    height: 50px;
    border-radius : 50%;
}

.My-message{
    width:100%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}


.you-message{
    width:100%;
    margin-bottom: 30px;
    float: right;
    display: flex;
}

.user-info-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3px;
}

.you-info-box{
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 3px;
}

.message-time{
    padding: 5px;
    font-weight: 600;
    color: #005B56;
    font-size: 12px;
    height: fit-content;
    width: fit-content;
    position: relative;
    top:15px;
}

.you-message-time{
    padding-top: 5px;
    font-weight: 600;
    color: #005B56;
    float: right;
    border: 1px solid black;
}

.username{
    font-weight: 600;
}



.message-content{
    background-color:#D9F0E6;
    padding: 10px;
    border-radius: 10px 0px 10px 10px;
    font-weight: 600;
    display: inline-block;
    width:fit-content;
    height: 100%;
    margin-right: 10px;
}

.my-message-content{
    background-color:#FFF;
    padding: 10px;
    border-radius: 0px 10px 10px 10px;
    font-weight: 600;
    display: inline-block;
    width:fit-content;
    height: 100%;
    margin-left: 10px;
}












`

export default Meeting