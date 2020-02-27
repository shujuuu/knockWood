// //1. analyze speech to text
// window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

// if ('SpeechRecognition' in window) {
//     // speech recognition API supported
//     console.log("supported");
// } else {
//     // speech recognition API not supported
//     console.log("nooooo");
// }

// //create a new speech recognition object.
// const recognition = new window.SpeechRecognition();
// const finalSpeech = "";
// recognition.interimResults = true;
// recognition.maxAlternatives = 15;
// recognition.continuous = true;
// recognition.lang = "en-US"

// //ask user to allow the page to have access to the microphone
// recognition.onresult = (event) => {
//     //detect single
//     // const speechToText = event.results[0][0].transcript;
//     // console.log(event);

//     //detect multiple
//     let interimTranscript = '';
//     for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
//         let transcript = event.results[i][0].transcript;
//         if (event.results[i].isFinal) {
//             finalSpeech += transcript;
//             console.log(finalSpeech);
//         } else {
//             interimTranscript += transcript;
//             console.log(interimTranscript);
//         }
//     }

//     //put transcript in html
//     let visualizeTxt = document.getElementById('visualizeTxt');
//     visualizeTxt.innerHTML = finalSpeech + '<i style="color:#ddd;">' + interimTranscript +
//         '</>';
// }
// recognition.start();