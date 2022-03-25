import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import { guess, startGame, restart } from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleStart = async ()=>{
    try{
      let msg = await startGame();
      console.log(msg);
      setHasStarted(true);
    }catch(e){
      alert(e.name + ': ' + e.message);
    }
  }

  const handleInput = (value)=>{
    setNumber(value);
    setStatus("");
  }

  const handleGuess = async ()=>{
    try{
      const response = await guess(number);
      if(response==="Equal"){
        setHasWon(true);
      }else{
        setStatus(response);
        setNumber("");
      }
    }catch(e){
      if(e.message==="Network Error"){
        alert(e.name + ': ' + e.message);
      }else{
        setStatus(`${number} is not a legal number.`);
        setNumber("");
      }
    }
  }

  const hanhleRestart = async ()=>{
    try{
      await restart();
      setHasWon(false);
      setNumber("");
      setStatus("");
    }catch(e){
      alert(e.name + ': ' + e.message);
    }
  }

  const startMenu =
    <div>
      <button onClick={handleStart}> start game </button>
    </div>

  const gameMode =
    <>
      <p>Guess a number between 1 to 100</p>
      <input value={number} onChange={(e)=>{handleInput(e.target.value)}}></input>
      <button onClick={handleGuess} disabled={!number}>
        guess!
      </button>
      <p>{status}</p>
    </>

  const winningMode = 
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={hanhleRestart}> restart </button>
    </>

  const game = 
  <div>
    {hasWon?winningMode:gameMode}
  </div>

  return(
    <div className="App">
      {hasStarted?game:startMenu}
    </div>
  )
}

export default App;
