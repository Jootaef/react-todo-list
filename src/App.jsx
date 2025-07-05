import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap"

function App() {
  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState([
    { text: "Complete React Todo List project", completed: false },
    { text: "Study for upcoming exams", completed: true },
    { text: "Buy groceries for the week", completed: false }
  ])
  const [isHovered, setIsHovered] = useState(null)

  const handleMouseOver = (index) => {
    setIsHovered(index);   
  };
  
  const handleMouseOut = () => {
    setIsHovered(null);
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue.trim(), completed: false }])
      setInputValue("")
    } else if (e.key === 'Enter' && inputValue.trim() === ''){
      alert('Please enter a valid task!')
    }
  }

  const handleOnDelete = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index)
    setTodos(updatedTodos)
  }

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h1 className="text-center mb-0">Todo List</h1>
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="What do you need to do?" 
                  value={inputValue} 
                  onChange={handleOnChange} 
                  onKeyDown={handleOnKeyDown}
                />
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    if (inputValue.trim() !== '') {
                      setTodos([...todos, { text: inputValue.trim(), completed: false }])
                      setInputValue("")
                    } else {
                      alert('Please enter a valid task!')
                    }
                  }}
                >
                  Add
                </button>
              </div>
              
              <ul className="list-group list-group-flush">
                {todos.length > 0 ? todos.map((todo, index) => (
                  <li 
                    key={index} 
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      todo.completed ? 'text-muted' : ''
                    }`}
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={() => handleMouseOut(null)}
                  >
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        className="form-check-input me-3"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(index)}
                      />
                      <span 
                        style={{ 
                          textDecoration: todo.completed ? 'line-through' : 'none',
                          color: todo.completed ? '#6c757d' : '#000'
                        }}
                      >
                        {todo.text}
                      </span>
                    </div>
                    {isHovered === index && (
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleOnDelete(index)}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                )) : (
                  <li className="list-group-item text-center text-muted">
                    No tasks yet. Add one above!
                  </li>
                )}
              </ul>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">
                {todos.length} total tasks • {completedCount} completed • {todos.length - completedCount} remaining
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

