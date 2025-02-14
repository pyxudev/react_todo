import React, { Component } from 'react';

export default class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    const { todos } = this.state;
    const dbUrl = "http://localhost:3100/logs";
    const readFetch = () => {
      fetch(dbUrl).then((response) => {
        if(!response.ok) {
          console.log('Read error!');
          throw new Error('error');
        }
        return response.json();
      }).then((logs)  => {
        const names = logs.slice(-1)[0]["names"]
        for (let i = 0; i < names.length; i++) {
          const thisLog = names[i]["name"];
          todos.push(thisLog);
        }
      }).catch((error) => {
        console.log(error);
      });
  };

  readFetch();
  }

  onInput = (e) => {
    const timestamp = new Date().toLocaleString();
    this.setState({
      name: e.target.value + " created at: " + timestamp
    }); 
  }

  addTodo = () => {
    const { todos, name } = this.state;
    if (name === undefined) {
      alert('Please write something to add!');
      return;
    } else {
      this.setState({
        todos: [...todos, name]
      });
      const todoInput = document.querySelector('.todoInput');
      todoInput.value = '';
    }
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

  save = () => {
    const { todos } = this.state;
    const names = [];
    for (const i in todos) {
      names.push({name: todos[i]});
    }
    const log = {names};
    const dbUrl = "http://localhost:3100/logs";
    fetch(dbUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    }).then((response) => {
      if(!response.ok) {
        console.log('Save error!');
        throw new Error('error');
      }
      return response.json();
    }).then((data) => {
      console.log('Success!');
    }).catch((error) => {
      console.error('Error:', error);
    });
    // const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(log));
    // const a = document.createElement('a');
    // a.href = 'data:' + data;
    // a.download = 'log.json';
    // a.innerHTML = 'download JSON';
    // a.click();
  }

  clearAll = () => {
    this.setState({
      todos: []
    }) 
  }

  render() {
    const { todos } = this.state;    
    return (
    <div className="todos">
      <div className="todoReg">
        <h1>Todo</h1>
        <input type="text" className="todoInput" onInput={this.onInput}/>
        <button className="modenBtn regBtn" onClick={this.addTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => <li key={index}>
            {todo}
            <button className="modenBtn editBtn" onClick={() => { this.editTodo(index)} }>Edit</button>
            <button className="modenBtn doneBtn" onClick={() => { this.doneTodo(index)} }>Done</button>
            <button className="modenBtn delBtn" onClick={() => { this.removeTodo(index) }}>Delete</button>
          </li>)}
        </ul>
      </div>
      <button className="modenBtn doneBtn" onClick={() => { this.save()} }>Save Logs</button>
      <button className="modenBtn delBtn" onClick={() => { this.clearAll()} }>Clear All</button>
    </div>
    );
  }
}