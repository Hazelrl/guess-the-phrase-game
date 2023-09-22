//DOM content loaded wrapper
document.addEventListener('DOMContentLoaded', ()=> {

// Global variables
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let missed = 0;
const startBtn = document.querySelector(".btn__reset");
const keyboard = document.getElementById('qwerty');
const hearts = document.querySelector('ol');
const phrases = [
    'Richard Of York Gave Battle In Vain',
    'Never Eat Shredded Wheat',
    'My Very Easy Method Just Speeds Up Naming Planets',
    'Father Charles Goes Down and Ends Battle',
    'Please Excuse My Dear Aunt Sally'
];

// Event listener to hide overlay when start button is clicked
startBtn.addEventListener('click', ()=> {
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


// Function for checking if the clicked button matches any of letters in the array. If so, the show class is applied to that letter, and match is updated to either null (if not a match), or the letter if it is a match.
function checkLetter(buttonClicked) {
    const lis = document.querySelectorAll('li');
    let match = null;

    for(let i=0; i<lis.length; i++){
        const listItemText = lis[i].textContent.toLowerCase();

        if(buttonClicked.textContent === listItemText){
            lis[i].className = 'letter show';
            match = buttonClicked.textContent;
        }
    }
    console.log(buttonClicked.textContent);
    console.log(match);
    return match;
};


// Event listener for keyboard clicks
keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON'){
    const letterChosen = e.target; 
    console.log(`You clicked on ${letterChosen.textContent}`);
    letterChosen.className = "chosen";
    const result = checkLetter(letterChosen);
    if(result === null && missed<5){
        const heartImgs = hearts.querySelectorAll('li img');
        for (let i = 0; i < heartImgs.length; i++){
            if (i === missed) {
                heartImgs[i].src = 'images/lostHeart.png';
            }
        }
        missed++;
        console.log(missed);
    }
    checkWin();
    }
});

function checkWin() {
    const letterLis = document.getElementsByClassName('letter');
    const showLis = document.getElementsByClassName('show');
    console.log(letterLis.length);
    console.log(showLis.length);
    if(missed >= 5){
        const overlay = document.getElementById('overlay');
        const h2 = overlay.querySelector('h2');
        const link = overlay.querySelector('a');
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        h2.textContent = 'You lost';
        link.textContent = 'Go back';

        link.addEventListener('click', ()=> {
            overlay.style.display = 'none';
        });
    };
    if(letterLis.length === showLis.length){
        const overlay = document.getElementById('overlay');
        overlay.className = 'win';
        overlay.style.display = 'flex';
        const h2 = overlay.querySelector('h2');
        const link = overlay.querySelector('a');
        h2.textContent = 'You won';
        link.textContent = 'Go back';
    };
    console.log("checkWin has run");
};

});

// Need to remove repetition, do extra credit, remove console.logs