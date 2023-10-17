const button = document.getElementById("button");
const repeat = document.getElementById("repeat")
let speech = new SpeechSynthesisUtterance();
// Variable to store the last played joke
let lastJoke = "";
// function to replay the joke
function replay () {
  if (lastJoke) {
    textToSpeech(lastJoke);
  }
}
// Variable to store the last played joke
function textToSpeech(joke) {
  speech.text = joke;
  // Generate speech and capture it into an audio source
  speechSynthesis.speak(speech);
  lastJoke = joke;
  console.log(joke);
}
// get the joke from the API
async function getJoke() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ....... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    textToSpeech(joke);
  } catch (error) {
    console.log("woops:", error);
  }
}
// Function to disable the button during voice playback
function disableButtons () {
  button.disabled = true;
    repeat.disabled = true;
}
function enableButtons () {
  button.disabled = false;
  if (repeat.disabled && !lastJoke == "") {
    repeat.disabled = false;
  }
}
speech.onstart = disableButtons; // Disable the button when speech playback starts
speech.onend = enableButtons; // Enable the button when speech playback ends
// add event listener
button.addEventListener("click", getJoke);
repeat.addEventListener("click", replay);