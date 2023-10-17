const button = document.getElementById("button");
let speech = new SpeechSynthesisUtterance();

function textToSpeech(joke) {
  speech.text = joke;
  // Generate speech and capture it into an audio source
  speechSynthesis.speak(speech);
  console.log(joke)
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
function toggleButton () {
  button.disabled = !button.disabled
}
speech.onstart = toggleButton; // Disable the button when speech playback starts
speech.onend = toggleButton; // Enable the button when speech playback ends

// add event listener
button.addEventListener("click", getJoke);