import React, { Component } from 'react';

export default class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  onInput = (e) => {
    const timestamp = new Date().toLocaleString();
    this.setState({
      name: e.target.value + " created at: " + timestamp
    });
  }

  addTodo = () => {
    const { todos, name} = this.state;
    this.setState({
      todos: [...todos, name]
    });
    const todoInput = document.querySelector('.todoInput');
    todoInput.value = '';
  }

  doneTodo = (index) => {
    const { todos } = this.state;
    const timestamp = new Date().toLocaleString();
    const doneTodo = todos[index] + ' Done at: ' + timestamp;
    this.setState({
      todos: [...todos.slice(0, index), doneTodo, ...todos.slice(index + 1)]
    });
    if (doneTodo.includes('Done')) {
      const doneLi = document.querySelectorAll('li')[index];
      doneLi.style.textDecoration = 'line-through';
      const doneBtn = document.querySelectorAll('.doneBtn')[index];
      doneBtn.style.display = 'none';
      const editBtn = document.querySelectorAll('.editBtn')[index];
      editBtn.style.display = 'none';
    }
  }

  editTodo = (index) => {
    const { todos } = this.state;
    const editTodo = prompt('Change this ToDo to:', todos[index].name);
    this.setState({
      todos: [...todos.slice(0, index), editTodo + ' edited at: ' + new Date().toLocaleString(), ...todos.slice(index + 1)]
    });
  }

  removeTodo = (index) => {
    const { todos } = this.state;
    this.setState({
      todos: [...todos.slice(0, index), ...todos.slice(index + 1)]
    });
  }

  render() {
    const { todos } = this.state;    
    return (
    <div>
      <h1>Todo</h1>
      <input type="text" className="todoInput" onInput={this.onInput}/>
      <button className="modenBtn regBtn" onClick={this.addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => <li key={index}>
          {todo}
          <button className="modenBtn editBtn" onClick={() => { this.editTodo(index)}}>Edit</button>
          <button className="modenBtn doneBtn" onClick={() => { this.doneTodo(index)}}>Done</button>
          <button className="modenBtn delBtn" onClick={() => { this.removeTodo(index) }}>Delete</button>
        </li>)}
      </ul>
    </div>);
  }
}