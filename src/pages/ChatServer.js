import React,{useEffect,useState} from 'react'
import Header from '../compontents/Header'
import styled from 'styled-components'
import {useRecoilState} from 'recoil'
import { makeRoom } from '../server/atoms'
import RoomModal from '../compontents/RoomModal'
import { db, dbRealtime } from '../server/firebase'
import { onValue, ref, set,remove,onDisconnect } from 'firebase/database';
import { collection,getDocs,orderBy,query } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom';


const ChatServer = () => {
    const [on,setOn] = useRecoilState(makeRoom)
    const [user,setUser] = useState([])
    const [list,setList] = useState([])
    const [page,setPage] = useState(1)
    const [first,setFirst] = useState(0)
    const [last, setLast] = useState(6)
    const nickname = localStorage.getItem('nickname')
    const userdata = ref(dbRealtime,'users/' + nickname)
    const roomlist = collection(db,'rooms')
    const usersRef = ref(dbRealtime, 'users');
    const navigate = useNavigate();
    let Lastpage = Math.ceil(list.length / 6)
    console.log(list.slice(0,6))
    console.log(list.slice(6,12))
    console.log(list)

    useEffect(()=>{
        if(nickname){
            set(userdata, { nickname });
            onValue(usersRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                  const userNicknames = Object.values(data).map(user => user.nickname);
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


    useEffect(()=>{
        const rooms = async() =>{
            const timequery = query(roomlist, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(timequery)
            querySnapshot.docs.map((doc) =>{
                const cardData = doc.data();
                setList((pre)=>[...pre,cardData])
            });
        } 
        rooms()
    },[])


    const passwordcheck = (password,id) =>{
        if(password === null){
            navigate(`/Meeting/${id}`)
        }else{
            const check = prompt('패스워드를 입력하세요')
            password === check ?   navigate(`/Meeting/${id}`) : alert('패스워드가 맞지 않습니다.')
        }
        
    }


    const moreRoom = () =>{
        setFirst(last)
        setLast(last + 6)
    }

    const lessRoom = () =>{
        setFirst(first-6)
        setLast(last-6)
    }




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
                {list && list.slice(first,last).map((data, idx) => (
                <div className='room' key={idx} onClick={()=>{
                    passwordcheck(data.password,data.roomId)
                }}>
                <div className='room-title'>{data.title}</div>
                <div className='sub-info'>
                    <div>{data.password === null ? '🔓OPEN' : '🔒PASSWORD' }</div>
                    <div>👨‍💼{data.user}</div>
                </div>
                </div>

))}
</div>


            </div>
            <div className='pagenation'>
                <div className='pagenation-list'>
                 <div onClick={lessRoom} className="pagebtn">◀</div>
                 <div className='page'>{page} | {Lastpage}</div>    
                 <div onClick={moreRoom} className="pagebtn">▶</div>   
                </div>
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

.pagenation-list{
    display: flex;
}

.page{
    margin: 0px 20px;
}

.userList{
    width:90%;
    height: 90%;
    margin: auto;
    border-radius: 10px;
    overflow-y: auto;
    background-color: rgb(250,250,250);
}

.pagebtn{
    cursor: pointer;
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