// src/index.js
import "./styles/index.scss";
import axios from 'axios';
import gramma from './images/gramma3.png'

const mic = document.querySelector('.mic');
const onclick = document.querySelector('.on-click');
const inputText = document.querySelector('.input-text');
const outputText = document.querySelector('.output-text');


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

function buildAssetPath(imgSrc) {
    return `./${imgSrc}`
}

const correctTextAnswer = ['Gramma thinks you are correct', 'Gramma congratulate you on your proper use of English']

if(chromeAgent) {
    // event listener
    mic.addEventListener('click', () => {
        recognition.start();
        onclick.innerText = 'Gramma is listening...';
    })
    recognition.onsoundend = function() {
        onclick.innerText = "";
    }

    const image = document.createElement('img');
    image.classList.add('gramma-logo')
    image.src = buildAssetPath(gramma);
    const currentNav = document.querySelector('nav');
    const currentdiv = document.getElementsByClassName('.logo');
    // currentNav.insertBefore(image, currentdiv);
    currentNav.prepend(image)

    
    function grammaSays() {
        // const lang = speechSynthesisUtteranceInstance.lang = 'en-US';
        
        const speechText = correctTextAnswer[Math.floor(Math.random() * correctTextAnswer.length)]
        console.log(speechText)
        
        const speech = new SpeechSynthesisUtterance();

        speech.text = speechText;
        speech.volume = 1;
        speech.rate = 0.3;
        speech.pitch = 1;

         const synth = window.speechSynthesis;
         synth.speak(speech);
    }

    recognition.onresult = function(event) {
        // console.log(event)
        const text = event.results[0][0].transcript;
        const sentenceCase = text[0].toUpperCase() + text.slice(1)

        inputText.innerText = 'Gramma heard: ' + sentenceCase + ".";

        fetchOutput(sentenceCase)
        .then( output => {
            console.log(output)
            if(output.data.matches.length < 0) {
                const solution = output.data.matches[0].replacements[0].value;
                outputText.innerText = 'Gramma suggests using ' + '"' + solution + '"' + '.';
            } else {
                outputText.innerText = 'Gramma thinks you are correct';
                
            }
        });
    }

    checkbtn.addEventListener('click', () => {
        outputtext.innerText = 'Thank you for talking to Gramma.';
        setInterval(() => {
            inputText.innerText = '';
            outputtext.innerText = '';
        }, 2000) 
    })
    
    recognition.onerror = function(event) {
        console.log(event);
        inputtext.innerText = 'Try Again'
    }

} else {
    console.log('This browser is not compatible with this web application.')
}






