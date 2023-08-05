import {atom} from 'recoil';

export const CommentData = atom({
  key: 'CommentData',
  default: ''
})

export const TodoData = atom({
    key: 'TodoData',
    default: []
})

export const MemoData = atom({
    key: 'MemoData',
    default: ''
})

export const TodoList = atom({
    key: 'TodoList',
    default: []
})

export const cardDataState = atom({
    key: 'cardDataState',
    default: []
});

export const ProjectChat = atom({
    key: 'ProjectChat',
    default: false
});