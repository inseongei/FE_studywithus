import {atom} from 'recoil';

// accessToken의 길이로 로그인 여부 체크 
export const CheckLogin = atom({
  key: 'CheckLogin',
  default: localStorage.getItem('accessToken').length  
});