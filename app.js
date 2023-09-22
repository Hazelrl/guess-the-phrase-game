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
    return randomPhraseSplit; 
} 

// Pass phrases array, and assign returned value to phraseArray
const phraseArray = getRandomPhraseAsArray(phrases);

// Add phrase to display
function addPhraseToDisplay(arr){
    console.log(arr);
    for (letter in arr) {
        // Select ul
        const ul = document.querySelector('ul');
        // Create li
        const li = document.createElement('li');

        // Set li text content to letter in array
        li.textContent = arr[letter];
        
        // Add class of space or letter
        if(li.textContent===' '){
            li.className = "space";
        }
        else {
            li.className = "letter";
        }
        
        // Add item to list
        ul.appendChild(li);
    }
    
}

// Call addPhraseToDisplay function, passing phraseArray
addPhraseToDisplay(phraseArray);
