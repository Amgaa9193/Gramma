// src/index.js
import "./styles/index.scss";
import axios from 'axios';

const mic = document.querySelector('.mic')
const onclick = document.querySelector('.on-click')
const inputText = document.querySelector('.input-text')
const outputText = document.querySelector('.output-text')

const checkbtn = document.querySelector('.check-btn');
const outputtext = document.querySelector('.output-text')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let userAgentString = window.navigator.userAgent;
let chromeAgent = userAgentString.indexOf("Chrome") > -1;


// fetching grammar bot responce
const fetchOutput = (sentenceCase) => {
    return axios.post(`/grammarcheck/?text=${sentenceCase}`)
}

if(chromeAgent) {
    // event listener
    mic.addEventListener('click', () => {
        recognition.start();
        onclick.innerText = 'Gramma is listening...';
    })
    
    checkbtn.addEventListener('click', () => {
        outputtext.style.color = 'green'; 
    })
    
    
    // functions  
    recognition.onsoundend = function() {
        onclick.innerText = "";
    }
    
    
    recognition.onresult = function(event) {
        console.log(event)
        const text = event.results[0][0].transcript;

        const sentenceCase = text[0].toUpperCase() + text.slice(1)
        inputText.innerText = sentenceCase;

        fetchOutput(sentenceCase)
        .then( output => {
            console.log(output)
            outputText.innerText = output.data.matches[0].message;
            
        });
        
       
    }
    
    recognition.onerror = function(event) {
        console.log(event);
        inputtext.innerText = 'Try Again'
    }

} else {
    console.log('This browser is not compatible with this web application.')
}






