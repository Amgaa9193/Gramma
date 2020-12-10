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
// const SpeechSynthesisUtterance = window.SpeechSynthesisUtterance
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

    function grammaSays(voiceName) {
        if ('speechSynthesis' in window) {
            const synth = window.speechSynthesis;
            const text = 'Hello, my dear!'
            const utter = new window.SpeechSynthesisUtterance('Hello, my dear!');

            utter.volume = 1;
            utter.rate = 0.5;
            utter.pitch = 1;
            utter.voice = voiceName;
            utter.lang = voiceName.lang;

            console.log(synth);
            console.log(utter);

            synth.speak(utter);

            utter.onerror = function(event) {
                console.log(event.error);
                console.log(utter);
            }
        }
    }

    function getVoices() {}
    getVoices()
    if( speechSynthesis !== undefined) {
        speechSynthesis.onvoiceschanged = getVoices;
    }

    const image = document.createElement('img');
    image.classList.add('gramma-logo')
    image.src = buildAssetPath(gramma);
    const currentNav = document.querySelector('nav');
    currentNav.prepend(image)

    image.addEventListener('click', () => {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        voices.forEach(voice => {
            // console.log(voice)
            if(voice.name === 'Nora Siri') {
                grammaSays(voice);
            }
        })
    })


    // event listener
    mic.addEventListener('click', () => {
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
            console.log(output)
            if(output.data.matches.length > 0) {
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

// } else {
//     console.log('This browser is not compatible with this web application.')
// }






