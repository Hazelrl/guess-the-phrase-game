// Global variables
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let missed = 0;
const startBtn = document.querySelector(".btn__reset");
const phrases = [
    'Richard Of York Gave Battle In Vain',
    'Never Eat Shredded Wheat',
    'My Very Easy Method Just Speeds Up Naming Planets',
    'Father Charles Goes Down and Ends Battle',
    'Please Excuse My Dear Aunt Sally'
];

// Event listener to hide overlay when start button is clicked
startBtn.addEventListener('click', ()=> {
    console.log("You clicked the start button");
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// Choose random phrase, and split into characters
function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    const randomPhraseSplit = randomPhrase.split('');   
    // console.log(randomNumber);
    // console.log(randomPhrase);
    // console.log(randomPhraseSplit);
    return randomPhraseSplit; 
} 

getRandomPhraseAsArray(phrases);

// Phrase to display function
function addPhraseToDisplay(arr){
    const li = 
    const ul = 
}

addPhraseToDisplay(phrases);