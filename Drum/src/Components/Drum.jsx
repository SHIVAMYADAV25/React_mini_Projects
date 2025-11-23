import {useState} from "react";

function Drum(){
    let instrument = ["Hi-hat", "Tom-tom", "floor tom", "Ride cymbal","Hi-hat" ,"Snare drum" ,"Bass drum" ];
    const [grid,setGrid] = useState(instrument.map(() => Array(16).fill(false)))
}

