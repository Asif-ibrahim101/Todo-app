import React, { useState } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [Completed, setCompleted] = useState(false);
  const [mode, setMode] = useState(false);


  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    if (input) {
      // add todo
      handleBtnClick(input);
      // clear form after submission
      setInput('');
    }
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  }

  const handleBtnClick = (todos) => {
    setTodo([
      ...todo,
      { id: uuidv4(), task: todos, completed: false }
    ]);
  }

  const completedTask = (id) => {
    setTodo(todo.filter((todo) => todo.id !== id))
  }

  const handleMode = () => {
    setMode(!mode)
  };


  return (
    <>
      <div
        style={{ backgroundColor: mode ? '#181818' : 'white' }}
        className="main_body transition-all h-[100vh] bg-black">

        <section className='main transition-all'>
          <div className="body flex flex-col items-center justify-center">
            <div className="heading flex justify-between align-middle w-[500px] pt-[10rem]">
              <div className="title">
                <p className="logo text-white text-4xl tracking-widest font-bold">TODO</p>
              </div>
              <button onClick={() => handleMode()} className="mode">
                {mode ? <NightlightRoundIcon fontSize='large' sx={{ color: 'white' }} /> : <WbSunnyIcon fontSize='large' sx={{ color: 'white' }} />}
              </button>
            </div>

            <div className="input transition my-8 flex bg-white rounded-md align-middle w-[500px]">

              <form
                style={{ backgroundColor: mode ? '#3C4048' : 'white', color: mode ? 'white' : 'black' }}
                onSubmit={handleSubmit}
                className={`flex rounded-md shadow-2xl w-full ${mode ? 'shadow-gray-900' : ''}`}
                action="/">

                <input type="text"
                  style={{ backgroundColor: mode ? '#3C4048' : 'white', color: mode ? 'white' : 'black' }}
                  value={input}
                  onChange={handleChange}
                  className='w-full py-4 px-4 rounded-md font-medium outline-none'
                  placeholder='Create a new tobo...' />
              </form>

            </div>

            {todo.length === 0 ? '' : (

              <div
                style={{ backgroundColor: mode ? '#3C4048' : 'white', color: mode ? 'white' : 'black' }}
                className=
                {`${mode ? 'shadow-gray-900' : ''} todoItems  transition flex flex-col bg-white rounded-md shadow-2xl  w-[500px]`}>
                {
                  todo.map((todoItem) => (
                    <div key={todoItem.id} className='transition-all'>
                      <div className="todo-div flex items-center px-2 py-4">
                        <button
                          onClick={() => completedTask(todoItem.id)}
                          className={`hover:bg-[#0E2954] p-[1px] transition-all hover:text-white Todo_btn ml-2 rounded-full border-solid border-2 cursor-pointer ${mode ? 'border-gray-500' : 'border-gray-200'}`}>
                            <CloseIcon/>
                          </button>
                        <div style={{ textDecoration: Completed ? 'line-through' : 'none' }} className="todo pl-4">{todoItem.task}</div>
                      </div>
                      {/* divider */}
                      < div className={`w-full ${mode ? 'bg-gray-600' : 'bg-gray-300'} h-[1px]`} />
                    </div>
                  ))
                }

                {/* divider
              <div className='w-full bg-gray-400 h-[1px]' /> */}

                <div className="bottom_div transition py-2 flex px-4 justify-between items-center">
                  <div className="items">
                    <p className={`${mode ? 'text-gray-300' : 'text-gray-500'} font-medium`}>{todo.length} items</p>
                  </div>

                  <div className='items_done'>
                    <button className='mx-2 text-gray-400 font-medium'>All</button>
                    <button className='mx-2 text-gray-400 font-medium'>Active</button>
                    <button className='mx-2 text-gray-400 font-medium'>Completed</button>
                  </div>

                  <div className='clear'>
                    <button onClick={() => setTodo('')} className={`${mode ? 'text-gray-200' : 'text-gray-600'} font-semibold`}>Clear All</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default App
