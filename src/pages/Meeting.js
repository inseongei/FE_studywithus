import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash,faMicrophoneSlash,faDesktop } from '@fortawesome/free-solid-svg-icons'
import React,{useEffect} from 'react'
import styled from 'styled-components'
import { IoMdSend } from "react-icons/io";
import {dbRef, userName,connectRef} from '../server/firebase'
import { useParams } from "react-router-dom";
import {connect, useSelector} from 'react-redux'
import { setUser,addUser,removeUser } from "../store/actioncreator";

const Meeting = (props) => {
    const users = useSelector((state)=> state.users)
    console.log(users)
    const {id} = useParams();
    const userRef = dbRef.child(`${id}번방`) // dbRef (데이터베이스를 참조하는 변수)

    useEffect(()=>{
        connectRef.on('value',snapshot =>{
            if(snapshot.val()){
                const userinfo = userRef.push({
                    "userName" : userName,
                    "audio" : true,
                    "video" : false,
                    "screen" : false
                })
                props.setUser({
                    [userinfo.key] : {
                        ...userinfo
                    }
                })
                userinfo.onDisconnect().remove();
            }
        })  
    },[])

    useEffect(()=>{
        if(props.user){
            userRef.on("child_added",(snap) =>{
                const {userinfo} = snap.val();
                props.addUser({
                    [snap.key] : {
                        ...userinfo
                    }
                })
            })
    
            userRef.on("child_removed",(snap) =>{
                props.removeUser(snap.key)
            })
        }

    },[props.user])



  return (
    <Container>
        <div className='videoBox'>
            <div className='titlebox'></div>
            <div className='mevideobox'>
                <div className='meinfo'>
                    <div className="mename">{userName}</div>
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
                        <div className="mename">{userName}</div>
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
                </div>
                <div className="chatinput">
                    <input type="text" placeholder="메시지를 입력하세요"/>
                    <IoMdSend className="icon"></IoMdSend>
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

`

const mapStateToProps = (state) =>{
    return{
        user : state.nowUser,
        users : state.users
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setUser : (user) => dispatch(setUser(user)),
        addUser : (users) => dispatch(addUser(users)),
        removeUser : (userKey) => dispatch(removeUser(userKey))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Meeting)