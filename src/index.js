// src/index.js
import "./styles/index.scss";
import axios from 'axios';
import gramma from './images/gramma3.png'
import bubble from './images/bubbles.png';

const instructionBtn = document.querySelector('#instruction-btn');
const instruction = document.querySelector('.instruction-popup');
const portfolio = document.querySelector('#portfolio-btn')
const github = document.querySelector('#github-btn')
const linkedin = document.querySelector('#linked-btn')
const angellist = document.querySelector('#angel-btn')

const mic = document.querySelector('.mic');
const onClick = document.querySelector('.on-click');;
const inputText = document.querySelector('.input-text');
const outputText = document.querySelector('.output-text');
const checkBtn = document.querySelector('.check-btn');




const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance
const recognition = new SpeechRecognition();

// checking if user's browser is chrome.
// let userAgentString = window.navigator.userAgent;
// let chromeAgent = userAgentString.indexOf("Chrome") > -1;


// fetching grammar bot responce from backend.
const fetchOutput = (sentenceCase) => {
    return axios.post(`/grammarcheck/?text=${sentenceCase}`)
}

// building a path to the image source.
function buildAssetPath(imgSrc) {
    return `./${imgSrc}`
}

// links
// portfolio.addEventListener('click', () => {
    
// })
// github.addEventListener('click', () => {

// })
// linkedin.addEventListener('click', () => {

// })
// angellist.addEventListener('click', () => {

// })

// if(chromeAgent) {
// instruction form pop-up
instructionBtn.addEventListener('click', () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    voices.forEach(voice => {
        // console.log(voice)
        if(voice.name === 'Moira') {
            grammaSays(voice);
        }
    })
    instruction.style.display = "block"

    setInterval(() => {
        instruction.style.display = "none"
    }, 10000)
})


const bubbleImage = document.createElement('img');
bubbleImage.classList.add('speech-bubble')
bubbleImage.src = buildAssetPath(bubble);


function grammaSays(voice) {
    const text = "Welcome to gramma's"
    const utter = new SpeechSynthesisUtterance(text);
    utter.volume = 0.5;
    utter.rate = 0.7;
    utter.pitch = 0.7;
    utter.voice = voice;
    utter.lang = voice.lang;

    // console.log(synth);
    // console.log(utter);
    const synth = window.speechSynthesis;
    synth.speak(utter);

    utter.onerror = function(event) {
        console.log(event.error);
    }
}


// for chrome browser to get all the voices.
function getVoices() {}
getVoices()
if( speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = getVoices;
}

// adding gramma logo to the nav bar.
const grammaImage = document.createElement('img');
grammaImage.classList.add('gramma-logo')
grammaImage.src = buildAssetPath(gramma);
const currentNav = document.querySelector('nav');
currentNav.prepend(grammaImage)


mic.addEventListener('click', () => {
    // depending on instruction popout add this line.
    // instruction.style.display = "none";
    recognition.start();
    onClick.innerText = 'Gramma is listening...';
})
    
recognition.onsoundend = function() {
    onClick.innerText = "";
}


recognition.onresult = function(event) {
    // console.log(event)
    const text = event.results[0][0].transcript;
    const sentenceCase = text[0].toUpperCase() + text.slice(1)

    inputText.innerText = 'Gramma heard: ' + sentenceCase + ".";

    fetchOutput(sentenceCase)
    .then( output => {
        // console.log(output)
        if(output.data.matches.length > 0) {
            const solution = output.data.matches[0].replacements[0].value;
            outputText.innerText = 'Gramma suggests using ' + '"' + solution + '"' + '.';
            checkBtn.innerHTML = '<i class="fas fa-check-circle"></i>'
        } else {
            outputText.innerText = 'Gramma thinks you are correct';
            checkBtn.innerHTML = '<i class="fas fa-check-circle"></i>'
        }
    });
}


checkBtn.addEventListener('click', () => {
    outputText.innerText = 'Thank you for talking to Gramma.';
    checkBtn.style.color = '#ff4600';
    setInterval(() => {
        inputText.innerText = '';
        outputText.innerText = '';
        checkBtn.innerHTML = '';
    }, 2000) 
})

recognition.onerror = function(event) {
    console.log(event);
    inputtext.innerText = 'Try Again'
}

// } else {
//     console.log('This browser is not compatible with this web application.')
// }








