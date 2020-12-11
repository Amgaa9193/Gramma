// src/index.js
import "./styles/index.scss";
import axios from 'axios';
import gramma from './images/gramma3.png'
import bubble from './images/bubbles.png';

const instructionBtn = document.querySelector('#instruction-btn');
const instruction = document.querySelector('.instruction-popup');


const mic = document.querySelector('.mic');
const onclick = document.querySelector('.on-click');;
const inputText = document.querySelector('.input-text');
const outputText = document.querySelector('.output-text');


const checkbtn = document.querySelector('.check-btn');
const outputtext = document.querySelector('.output-text')

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance
const recognition = new SpeechRecognition();

// let userAgentString = window.navigator.userAgent;
// let chromeAgent = userAgentString.indexOf("Chrome") > -1;


// fetching grammar bot responce
const fetchOutput = (sentenceCase) => {
    return axios.post(`/grammarcheck/?text=${sentenceCase}`)
}

function buildAssetPath(imgSrc) {
    return `./${imgSrc}`
}

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
        }, 9000)
        // grammaImage.style.display = 'block'
    })

    // body.addEventListener('click', () =>{
    //     instruction.style.display = "block"
    // })

    const bubbleImage = document.createElement('img');
    bubbleImage.classList.add('speech-bubble')
    bubbleImage.src = buildAssetPath(bubble);


      

    function grammaSays(voice) {
            const synth = window.speechSynthesis;
            // alternative: "Let Gramma dot your i's and cross your t's!"
            const text = "Welcome to gramma's"
            const utter = new SpeechSynthesisUtterance(text);

            utter.volume = 0.5;
            utter.rate = 0.7;
            utter.pitch = 0.7;
            utter.voice = voice;
            utter.lang = voice.lang;

            // console.log(synth);
            // console.log(utter);

            synth.speak(utter);

            utter.onerror = function(event) {
                console.log(event.error);
            }
    }


    // for chrome 
    function getVoices() {}
    getVoices()
    if( speechSynthesis !== undefined) {
        speechSynthesis.onvoiceschanged = getVoices;
    }

    const grammaImage = document.createElement('img');
    grammaImage.classList.add('gramma-logo')
    grammaImage.src = buildAssetPath(gramma);
    const currentNav = document.querySelector('nav');
    currentNav.prepend(grammaImage)

    // microphone
    // web speech API

    mic.addEventListener('click', () => {
        instruction.style.display = "none";
        // grammaImage.style.display = 'none'
        recognition.start();
        onclick.innerText = 'Gramma is listening...';
    })
     
    recognition.onsoundend = function() {
        onclick.innerText = "";
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
                checkbtn.innerHTML = '<i class="fas fa-check-circle"></i>'
            } else {
                outputText.innerText = 'Gramma thinks you are correct';
                checkbtn.innerHTML = '<i class="fas fa-check-circle"></i>'
                
            }
        });
    }


    checkbtn.addEventListener('click', () => {
        outputtext.innerText = 'Thank you for talking to Gramma.';
        setInterval(() => {
            inputText.innerText = '';
            outputtext.innerText = '';
            checkbtn.innerHTML = '';
        }, 2000) 
    })
    
    recognition.onerror = function(event) {
        console.log(event);
        inputtext.innerText = 'Try Again'
    }

// } else {
//     console.log('This browser is not compatible with this web application.')
// }








