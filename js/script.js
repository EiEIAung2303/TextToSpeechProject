let voiceListEl = document.getElementById('voiceList');
let speechTextEl = document.getElementById('speechText');
let readTextEl = document.getElementById('readText');
let cardsContainerEl = document.getElementById('cards_container');

//create cards array
let cards = [{
        image: "./image/image1.jpg",
        text: "Happy Always"
    },
    {
        image: "./image/image2.jpg",
        text: "Try Best"
    },
    {
        image: "./image/image3.jpg",
        text: "Healthy Eating"
    },
    {
        image: "./image/image4.jpg",
        text: "Trust Journey"
    },
    {
        image: "./image/image5.jpg",
        text: "Success"
    },
    {
        image: "./image/image6.jpg",
        text: "Relaxing"
    }
]

cards.forEach(card => {
    let element = document.createElement('div');
    element.classList.add('col-4', 'pointer', 'mt-3');
    element.innerHTML = `
        <div class="card shadow">
            <div style="height:150px; " class="embed-responsive">
                <img src=${card.image} class="img-fluid">
            </div>
            <div class="bg-success text-center text-white p-2">
                ${card.text}
            </div>
        </div>
    `;
    //add EventListener for click card text
    element.addEventListener('click', () => {
        //to set reading text
        setTextMessage(card.text);
        //to read
        speakText();
    })
    cardsContainerEl.appendChild(element);
})

//create object
let message = new SpeechSynthesisUtterance();

//To set reading text
function setTextMessage(text) {
    message.text = text;
}

//To read text
function speakText() {
    speechSynthesis.speak(message);
}

let voices = speechSynthesis.getVoices();

//To Test whether speechSynthesis work in browser 
function populateVoiceList() {
    //if browser cannot suppor speechSynthesis
    if (typeof speechSynthesis === 'undefined') {
        return 'Sorry! It is not support.';
    }
    //console.log(voices);
    voices.forEach(voice => {
        let option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voiceListEl.appendChild(option);
    })
}

populateVoiceList();

//add EventListener for Select box data change
voiceListEl.addEventListener('change', (e) => {
    //to set speech syntheis if select box name is equal to name of voice array
    message.voice = voices.find(voice => voice.name === e.target.value)
})

//add EventListener for ReadText Button Clicl
readTextEl.addEventListener('click', () => {
    console.log(speechTextEl.value)
    setTextMessage(speechTextEl.value);
    speakText();

})