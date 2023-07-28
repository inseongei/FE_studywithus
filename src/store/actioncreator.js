import {ADD_USERS,REMOVE_USERS,SET_USERS} from './actiontypes'

export const setUser = (user) =>{
    return {
        type: SET_USERS,
        payload : {
            nowUser : user,
        }
    }
}

export const addUser = (users) =>{
    return {
        type: ADD_USERS,
        payload : {
            users,
        }
    }
}

export const removeUser = (userKey) =>{
    return {
        type: REMOVE_USERS,
        payload : {
            userKey,       
        }
    }
}