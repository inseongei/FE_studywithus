import firebase from 'firebase/app'
import database from 'firebase/database'

// firebase 연결 구성 함수 (initializeApp)
const firebaseConfig = {
    apiKey : 'AIzaSyD_BsDXdRPTpPKxvsFEWX7rfWJ4bLcoG-w',
    databaseURL : 'https://meet-aa3bd-default-rtdb.asia-southeast1.firebasedatabase.app/' 
}
firebase.initializeApp(firebaseConfig)

// firebase 실시간 데이터베이스에 참조하기 위해 사용되는 메서드
export let dbRef = firebase.database().ref(); 
// firebase 실시간 데이터베이스에 연결 상태를 감지한다. (info/connected) 경로는 연결 상태를 나타내는 특별한 경로
export let connectRef = firebase.database().ref(".info/connected");

export const userName = localStorage.getItem('userName')
