    //initial wins
    var wins = 0;
    //alphabet
    var abcCheck = /^[a-z]+$/;
    //wav audio file for a win
    var winAudio = new Audio('assets/wav/wintime.wav');
    //wav audio file for loss
    var fallTimeWAV = new Audio('assets/wav/falltime.wav');

    //tree image 
    var treeFallDisplay = [                     
            "assets/img/1-gone.png",
            "assets/img/2-gone.png",
            "assets/img/3-gone.png",
            "assets/img/4-gone.png",
            "assets/img/5-gone.png",
            "assets/img/6-gone.png",
            "assets/img/7-gone.png",
            "assets/img/8-gone.png",
            "assets/img/9-gone.png",
            "assets/img/all-gone.png"
        ];

    //word bank
    var allWords = [ {
            w: "perfectionism",
            h: "the impossible"
        }, {
            w: "possibilities",
            h: "never say never"
        }, {
            w: "opportunists",
            h: "politicians"
        }, {
            w: "pacmania",
            h: "another well-known game - but a play on words"
        }, {
            w: "productivity",
            h: "accomplished"
        }, {
            w: "lightning",
            h: "electricity"
        }, {
            w: "microscopic",
            h: "small details"
        }, {
            w: "herbivores",
            h: "someone who love greens"
        }, {
            w: "rutgers",
            h: "what is this for?"
        }, {
            w: "scrotum",
            h: "male's usually have a..."
        }, {
            w: "meeteetse",
            h: "a city where trees grow wild"
        }, {
            w: "macaroni",
            h: "... and cheese"
        }, {
            w: "jaywalking",
            h: "walk, but don't you dare..."
        }
    ]
    //function to clear word bank/div - used at end of each round
    function clearBox(uhmDisplay) {
        document.getElementById("uhmDisplay").innerHTML = "";
    }

    //initializing message to player on how to start game
    function gameReady() {
        var playMessage = 'Press any key to start playing!'
        document.querySelector('#playMessageDisplay').innerHTML = playMessage;
    }
    //calling the above message function
    gameReady();
    //initial display of tree image
    document.querySelector('#treeDisplay').innerHTML = "<img src='assets/img/fulltree.png' alt='leaves are falling off of the tree for every letter you guess wrong'>";
    //Initalizing the word choices and randomizing them
    document.onkeyup = function gameSet(event) {
        document.querySelector('#playMessageDisplay').innerHTML = '';
        //building and displaying the display of blanks for the for the randomized word and the correct length
        var wordBlanks = [],
            i, k;
        var wordChoice = Math.floor(Math.random() * allWords.length);
        wordBlanks.push(allWords[wordChoice].w);

        for (k = 0; k < allWords[wordChoice].w.length; k++) {
            wordBlanks[k] = '_';
        }

        //setting variables to be filled and querying divs to fill with content... setting up initial content
        var wordBuildHtml = wordBlanks.join('  ');
        document.querySelector('#wordBuildDisplay').innerHTML = wordBuildHtml;
        var defHtml = allWords[wordChoice].h;
        document.querySelector('#defDisplay').innerHTML = defHtml;
        var wrongGuessesRemain = 11;
        var treeLosing = [],
            j;
        var showFallingTree = "";
        var treeHtml = "";
        document.querySelector('#treeDisplay').innerHTML = treeHtml;
        var treeUhmHtml = treeLosing.join('  ');
        //initialize 'wrong letters used' container and child
        var wrongGuessesHtml = "You have " + wrongGuessesRemain + " guesses left";
        var usedLetterBank = document.createElement("p");
        usedLetterBank.innerHTML = treeUhmHtml;
        var bankDisplay = ("#uhmDisplayContainer");
        bankDisplay.append = usedLetterBank;

        document.querySelector('#wrongGuessesDisplay').innerHTML = wrongGuessesHtml;
        //full tree because no guess have been made
        document.querySelector('#treeDisplay').innerHTML = "<img src='assets/img/fulltree.png' alt='leaves are falling off of the tree for every letter you guess wrong'>";
        //logging the word(s) and hint(s)
        console.log("word is: " + allWords[wordChoice].w);
        console.log("hint is: " + allWords[wordChoice].h);


        //game on!
        document.onkeyup = function gameGo(event) {
            document.querySelector('#playMessageDisplay').innerHTML = '';
            //initializes 'wrong letters used' label so the player knows why letters at the top of the screen are appearing
            var lettersUsedLabel = document.getElementById("lettersUsedLabel");
            lettersUsedLabel.className = "visible";
            //press a key = letter guessed for the right word
            var playerEntry = String.fromCharCode(event.keyCode).toLowerCase();
            console.log("letter guessed:  " + playerEntry);
            for (i = 0; i < allWords[wordChoice].w.length; i++) {

                if (allWords[wordChoice].w[i] === playerEntry) {
                    wordBlanks[i] = allWords[wordChoice].w[i];
                    //displays letters in right places 
                    var wordBuildHtml = wordBlanks.join('  ');
                    document.querySelector('#wordBuildDisplay').innerHTML = wordBuildHtml;
                    var blankCompare = wordBlanks.join('');
                    //win result
                    if (blankCompare == allWords[wordChoice].w) {
                        wins++;
                        winAudio.play();
                        confirmWin = 'Nice! You saved the tree!';
                        document.querySelector('#playMessageDisplay').innerHTML = confirmWin;
                        var winsHtml = "Wins: " + wins;
                        document.querySelector('#winsDisplay').innerHTML = winsHtml;
                        document.querySelector('#treeDisplay').innerHTML = "<img src='" + treeFallDisplay[0] + "' alt='leaves are falling off of the tree for every letter you guess wrong'>";
                        setTimeout(gameSet, 3000);
                        //resets 'letters used' div
                        clearBox();
                    }
                }
            }

            //rule for if player presses an invalid key on keyboard
            if ((treeLosing.includes(playerEntry)) || (!playerEntry.match(abcCheck))) {
                console.log("invalid key");
                var noValidKey = "You can't use that key, silly goose!"
                document.querySelector('#playMessageDisplay').innerHTML = noValidKey;
            //subtracts from how many guesses you have left
            } else if (!allWords[wordChoice].w.includes(playerEntry)) {
                treeLosing.push(playerEntry);
                wrongGuessesRemain--;
                //trigger for wrong guesses
                for (j = 0; j < treeLosing.length; j++) {
                    j = treeLosing.indexOf(playerEntry);
                    if (treeLosing.length <= 11) {
                        var showFallingTree = treeFallDisplay[j];
                        var treeHtml = "<img src='" + showFallingTree + "' alt='leaves are falling off of the tree for every letter you guess wrong'>";
                        document.querySelector('#treeDisplay').innerHTML = treeHtml;
                        var treeUhmHtml = treeLosing.join('  ');
                        var wrongGuessesHtml = "Uh-OH! You only have " + wrongGuessesRemain + " wrong guesses left";
                        document.querySelector('#uhmDisplay').innerHTML = treeUhmHtml;
                        document.querySelector('#wrongGuessesDisplay').innerHTML = wrongGuessesHtml;
                    }
                }
            }

            //setting if "wrong letter guesses equals 11", player loses and triggers the result of a loss
            if (treeLosing.length >= 11) {
                fallTimeWAV.play();
                var confirmLoss = ('You did not feed the tree enough words :( The solution is "' + allWords[wordChoice].w + '".');
                document.querySelector('#playMessageDisplay').innerHTML = confirmLoss;
                document.querySelector('#treeDisplay').innerHTML = "<img src='assets/img/all-gone.png' alt='leaves are falling off of the tree for every letter you guess wrong'>";
                setTimeout(gameSet, 4500);
                //resets 'letters used' bank
                clearBox();
            }
        }
    }