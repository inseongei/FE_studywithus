import React,{useEffect,useState} from 'react'
import Header from '../compontents/Header'
import styled from 'styled-components'
import {useRecoilState} from 'recoil'
import { makeRoom } from '../server/atoms'
import RoomModal from '../compontents/RoomModal'
import { dbRealtime } from '../server/firebase'
import { onValue, ref, set,remove,onDisconnect } from 'firebase/database';


const ChatServer = () => {
    const [on,setOn] = useRecoilState(makeRoom)
    const [user,setUser] = useState([])
    const nickname = localStorage.getItem('nickname')
    const userdata = ref(dbRealtime,'users/' + nickname)
    const usersRef = ref(dbRealtime, 'users');
    useEffect(()=>{
        if(nickname){
            set(userdata, { nickname });
            onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                  const userNicknames = Object.values(data).map(user => user.nickname);
                  console.log(userNicknames)
                  setUser(userNicknames);
                }
              });
              const disconnectRef = onDisconnect(userdata);
              disconnectRef.remove();
        }
        return () =>{
            remove(userdata)
        }
    },[])












  return (
    <>
    <Header/>
    <Container>
        <div className='user-Container'>
        <div className='userList-title'>실시간 유저 목록</div>
            <div className='userList'>
            {user.map((item, index) => (
                <div className='users' key={index}>
                    {item}
                </div>
                 ))}
            </div>
        </div>
        <div className='room-Container'>
            <div className='room-List'>
                <div className='make-room'>
                    <button className='roomBtn' onClick={()=>setOn(true)}>방 만들기</button>
                </div>

                <div className='rooms'>
                    <div className='room'>
                        <div className='room-title'>제목</div>
                        <div className='sub-info'>
                            <div>🔒 PASSWORD</div>
                            <div>👨‍💼정인성</div>
                        </div>
                    </div>

                    <div className='room'>
                        <div className='room-title'>제목</div>
                        <div className='sub-info'>
                            <div>🔒 PASSWORD</div>
                            <div>👨‍💼정인성</div>
                        </div>
                    </div>

                    <div className='room'>
                        <div className='room-title'>제목</div>
                        <div className='sub-info'>
                            <div>🔒 PASSWORD</div>
                            <div>👨‍💼정인성</div>
                        </div>
                    </div>

                    <div className='room'>
                        <div className='room-title'>제목</div>
                        <div className='sub-info'>
                            <div>🔒 PASSWORD</div>
                            <div>👨‍💼정인성</div>
                        </div>
                    </div>

                    <div className='room'>
                        <div className='room-title'>제목</div>
                        <div className='sub-info'>
                            <div>🔒 PASSWORD</div>
                            <div>👨‍💼정인성</div>
                        </div>
                    </div>

                    <div className='room'>
                        <div className='room-title'>제목</div>
                        <div className='sub-info'>
                            <div>🔒 PASSWORD</div>
                            <div>👨‍💼정인성</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pagenation'>
                <div>1 | 2 </div>
            </div>
        </div>
    </Container>
    {on ? <RoomModal/> : ''}
    </>
  )
}

const Container = styled.div`
margin-top: 80px;
display: flex;

.user-Container{
    width:15vw;
    height: calc(100vh - 80px);
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.users{
    border-bottom: 1px solid #E5E5E5;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
}

.userList{
    width:90%;
    height: 90%;
    margin: auto;
    border-radius: 10px;
    overflow-y: auto;
    background-color: rgb(250,250,250);
}

.userList::-webkit-scrollbar {
    width: 10px;  
}

.userList::-webkit-scrollbar-thumb {
    height: 30%; 
    background-color: #e5e5e5;
    border-radius: 10px;
}

.userList::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgb(250,250,250);
}

.room-Container{
    width:85vw;
    height: calc(100vh - 80px);
    display:flex;
    flex-direction: column;
}

.userList-title{
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    padding: 20px;
}

.room-List{
    width: 100%;
    height: 95%;
}

.pagenation{
    width:100%;
    height: 5%;
    display:flex;
    justify-content: center;
    align-items: center;
}

.make-room{
    width:100%;
    height: 10%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.roomBtn{
    width:200px;
    height: 50px;
    background-color: #fff000;
    border: none;
    border-radius: 10px;
    font-size: 24px;
    font-weight: 500;
    margin-right: 20px;
}

.roomBtn:hover{
    transform: scale(1.02);
}

.rooms{
    border-top: 1px solid #e5e5e5;
    height: 90%;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(2,1fr);
    gap: 10px;
}

.room{
    background-color: #E5E5E5;
    width:600px;
    height: 120px;
    margin: auto;
    border-radius: 5px;
    cursor: pointer;
    transition: transform .2s ease 0s;
    box-shadow: 0 0 2px rgba(0,0,0,.08), 4px 12px 36px rgba(0,0,0,.09);
}

.room:hover{
    transform: translateY(-7px);
}

.room-title{
    font-size: 20px;
    text-align: center;
    font-weight: 500;
    padding: 20px;
}

.sub-info{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: 500;
}











































































`
export default ChatServer