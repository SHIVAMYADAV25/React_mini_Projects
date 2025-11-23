import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let instrument = ["Hi-hat-foot", "Tom-tom", "floor tom", "Ride cymbal","Hi-hat" ,"Snare drum" ,"Bass drum" ];
  const [grid,setGrid] = useState(instrument.map(() => Array(16).fill(0)));
  const [currentBeat,setCurrentBeat] = useState(0);
  const [isPlaying , setIsPlaying] = useState(false);

  const sounds1 = [
  new Audio("../public/sounds/hihat-foot.mp3"),
  new Audio("../public/sounds/tom1.mp3"),
  new Audio("../public/sounds/floor-tom.mp3"),
  new Audio("../public/sounds/ride.mp3"),
  new Audio("../public/sounds/hihat.mp3"),
  new Audio("../public/sounds/snare-drum.mp3"),
  new Audio("../public/sounds/bass.mp3"),
];

const sound2 = [
  null,          // hi-hat-foot
  new Audio("../public/sounds/tom2.mp3"),  // Tom-tom special
  null,          // floor
  null,          // ride
  new Audio("../public/sounds/hihat-open.mp3"),      // hi-hat special
  new Audio("../public/sounds/snare-stick.mp3"),  // snare special
  null           // bass
]

const specialInstruments = ["Tom-tom", "Hi-hat", "Snare drum"];


function isSpecialInstrument(instrumentName) {
    return specialInstruments.includes(instrumentName);
}



    // console.log(grid);

useEffect(()=>{
  if(!isPlaying) return;

  const interval = setInterval(()=>{
    setCurrentBeat(prev => (prev + 1)%16)
  },180)

  return () => clearInterval(interval);
},[isPlaying])

// click karke uska value ko 1 , 2 ,3 karne ka kaam iska hai aur use update bhi karta hai
function toggelCell(row,col){
  const newGrid = structuredClone(grid);
  if (isSpecialInstrument(instrument[row])) {
    newGrid[row][col] = (newGrid[row][col] + 1) % 3;
    // console.log(newGrid[row][col])
  }else{
    newGrid[row][col] = newGrid[row][col] === 0 ? 1 : 0;
  }
  setGrid(newGrid); 
}

useEffect(()=>{
  if (!isPlaying) return;
  grid.forEach((row,rowIndex) => {

    // console.log(row[currentBeat] === true);
    // console.log(isSpecialInstrument(instrument[rowIndex]))

    if(row[currentBeat] === 1){
        sounds1[rowIndex].currentTime = 0;
        sounds1[rowIndex].play();
      }

    if(row[currentBeat] === 2){
      if(sound2[rowIndex]){
        sound2[rowIndex].currentTime = 0;
        sound2[rowIndex].play();
      }
    }

  })
},[currentBeat])

  return(
    <>
    <button onClick={() => setIsPlaying(!isPlaying)}>play</button>
    <div className='parent'>
  {instrument.map((instrumentName,rowIndex) =>{
    return <div className='row' key={rowIndex}>
      <span className={"instrument-name"}>{instrumentName}</span>
      {grid[rowIndex].map((colValue, colIndex) => {
          let className = "box";
            if (colValue === 1) className += " active";
            if (colValue === 2) className += " alt";
            if (colIndex === currentBeat) className += " playing";
            return <div 
            className= {className} 
            onClick={() => toggelCell(rowIndex,colIndex)} 
            key={colIndex}
            ></div>
         })}
    </div>
  })
  }
  </div>
  </>
)
}

export default App
