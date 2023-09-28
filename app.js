//DOM content loaded wrapper
document.addEventListener('DOMContentLoaded', ()=> {
   
    /***********************************
     ========GLOBAL VARIABLES===========
    ***********************************/ 
    const overlay = document.getElementById('overlay');
    const startBtn = document.querySelector(".btn__reset");
    const keyboard = document.getElementById('qwerty');
    const hearts = document.querySelector('ol');
    const heartImgs = hearts.querySelectorAll('li img');
    const keyBoardButtons = keyboard.querySelectorAll('button');
    const phrases = [
        'Richard Of York Gave Battle In Vain',
        'Never Eat Shredded Wheat',
        'My Very Easy Method Just Speeds Up Naming Planets',
        'Father Charles Goes Down and Ends Battle',
        'Please Excuse My Dear Aunt Sally'
    ];

    // Create Reset game button to be added to won and lost overlays
    const resetGameButton = document.createElement('a');
    resetGameButton.className = 'btn__reset';
    resetGameButton.textContent = 'Reset game';

    /***********************************
     =============FUNCTIONS=============
    ***********************************/

    // Choose random phrase, and split into characters
    function getRandomPhraseAsArray(arr){
        const randomNumber = Math.floor(Math.random() * arr.length);
        const randomPhrase = arr[randomNumber];
        const randomPhraseSplit = randomPhrase.split('');  
        return randomPhraseSplit; 
    } 

    // Add phrase to display
    function addPhraseToDisplay(arr){
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

    // Check if the clicked button matches any of letters in the array. If so, the show class is applied to that letter, and match is updated to either null (if not a match), or the letter if it is a match.
    function checkLetter(buttonClicked) {
        const lis = document.querySelectorAll('li');
        let match = null;

        for(let i=0; i<lis.length; i++){
            const listItemText = lis[i].textContent.toLowerCase();

            if(buttonClicked.textContent === listItemText){
                lis[i].className = 'letter show';
                match = buttonClicked.textContent;

                // Transitions for each letter in the phrase display as they are revealed
                lis[i].style.color = 'var(--color-keys)';
                lis[i].style.border = '2px solid';
                lis[i].style.transitionProperty = 'background, border-radius, color';
                lis[i].style.transitionDuration = '.5s';
            }
        }
        return match;
    };

    // Check win
    function checkWin() {
        const letterLis = document.getElementsByClassName('letter');
        const showLis = document.getElementsByClassName('show');
        if(missed >= 5){
            const overlay = document.getElementById('overlay');
            const h2 = overlay.querySelector('h2');
            const link = overlay.querySelector('a');
            overlay.className = 'lose';
            overlay.style.display = 'flex';
            h2.textContent = 'You lost';
            link.textContent = 'Go back';
            overlay.appendChild(resetGameButton);

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
            overlay.appendChild(resetGameButton);

        };
    };

    // Remove existing phrase (for reset)
    function removeExistingPhrase() {
        const phraseUl = document.querySelector('#phrase ul');
        phraseUl.innerHTML = '';
    };


    /***********************************
     ===========GAME PLAY==============
    ***********************************/

    // Set value of missed to 0
    let missed = 0;

    // Event listener to hide overlay when start button is clicked
    startBtn.addEventListener('click', ()=> {
        overlay.style.display = 'none';
    });


    // Pass phrases array, and assign returned value to phraseArray
    let phraseArray = getRandomPhraseAsArray(phrases);

    // Call addPhraseToDisplay function, passing phraseArray
    addPhraseToDisplay(phraseArray);

    // Event listener for keyboard clicks on keyboard letters
    keyboard.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON'){
        const letterChosen = e.target; 

        if(letterChosen.className === 'chosen'){
            e.preventDefault(); // So that a letter cannot be clicked twice
        } else {
            letterChosen.className = "chosen";
            const result = checkLetter(letterChosen);
            if(result === null && missed<5){

                for (let i = 0; i < heartImgs.length; i++){
                    if (i === missed) {
                        heartImgs[i].src = 'images/lostHeart.png';
                    }
                }
                missed++;
            }
            checkWin();
        }
        }
    });


    // Event Listener for Reset game button
    resetGameButton.addEventListener('click', ()=> {

        // Reset missed to 0
        missed = 0; 

        // Reset keyboard buttons to not chosen
        keyBoardButtons.forEach((keyBoardButton) => {
            if (keyBoardButton.classList.contains('chosen')) {
                keyBoardButton.classList.remove('chosen');
            }
        });

        // Reset heart image to live heart
        for (let i = 0; i < heartImgs.length; i++){
                heartImgs[i].src = 'images/liveHeart.png';
        }
        // Remove existing phrase
        removeExistingPhrase(); 

        // Add new random phrase to display
        getRandomPhraseAsArray(phrases); 
        let phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray); 

        // Remove overlay
        overlay.style.display = 'none';

    });
});

