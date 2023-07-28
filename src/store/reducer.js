import {ADD_USERS,REMOVE_USERS,SET_USERS} from './actiontypes'
// 초기값 : nowUser(현재 사용자) , users(사용자목록)
let initialState ={
    nowUser : null, 
    users : {}
}

export const reducer = (state = initialState,action) =>{
    switch(action.type){
        case SET_USERS:{
            let {payload} = action;
            state = {...state,nowUser : {...payload.nowUser}}
            return state
        }
        case ADD_USERS:{
            let {payload} = action;
            const nowUserId = Object.keys(state.nowUser)[0]
            const usersId = Object.keys(payload.users)[0]
            if(nowUserId === usersId) {
                payload.users[usersId].nowUser = true
            }
            let users = {...state.users,...payload.user}
            state = {...state,users}
            return state
        }
        case REMOVE_USERS:{
            let {payload} = action;
            let users = {...state.users}
            delete users[payload.userKey]
            state = {...state,users}
            return state
        }
        default:{
            return state;
        }
    }
}