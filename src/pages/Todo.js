import React, { useState } from 'react';
import styled from 'styled-components'
import { BsPlusSquareDotted,BsFillHandIndexThumbFill } from "react-icons/bs";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleAddTodo = () => {
    if (inputValue !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  }

 const activeButton = (e) =>{
    if(e.key === "Enter") {
        handleAddTodo();
      }
 }


  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <Container>
        <div className='oneBox'>
         <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={activeButton} className="todo-input" placeholder='할일을 적고 우측 버튼을 눌러주세요 !'/>
         <BsPlusSquareDotted onClick={handleAddTodo}  className="AddBtn">Add</BsPlusSquareDotted>
        </div>

      <div>
        {todos.map((todo, index) => (
          <div key={index} className="todolist">{todo} <BsFillHandIndexThumbFill className='checkbtn' onClick={() => handleDeleteTodo(index)}>Delete</BsFillHandIndexThumbFill></div>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
width:100%;
height: 100%;

.todo-input{
    border: 1px solid #005B56;
    outline: none;
    min-height: 40px;
    transition: all .2s;
    width: 50%;
    padding: 0px 15px;
    border-radius: 5px;
    margin-bottom: 3px;
    width:90%;
    height: 100%;
}

.AddBtn{
    width:10%;
    font-size: 30px;
    cursor: pointer;
}

.AddBtn:hover{
   color: #88AEE1;
}


.oneBox{
    width:100%;
    display: flex;
    align-items: center;
}

.todolist{
    border: 1px solid #E5E5E5;
    outline: none;
    min-height: 40px;
    transition: all .2s;
    width: 50%;
    padding: 0px 15px;
    border-radius: 5px;
    margin-bottom: 3px;
    width:90%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content:space-between;
    font-weight: 700;
}

.checkbtn{
    font-size: 24px;
  
}

.checkbtn:hover{
    color: #88AEE1;
}







`

export default Todo;
