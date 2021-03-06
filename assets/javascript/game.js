window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];

    var TOP_10_MOVIES = ['The Shawshank Redemption',
        'The Godfather',
        'The Dark Knight',
        'The Godfather: Part Two',
        'The Lord of the Rings: The Return of the King',
        'Pulp Fiction',
        "Shindler's List",
        '12 Angry Men',
        'Fight Club',
        'The Lord of the Rings: The Fellowship of the Ring'
    ];

    var TOP_10_LINKS = ['https://www.youtube.com/embed/b66gLKLU8yU?start=150',
        'https://www.youtube.com/embed/67dK5g5pOtY?start=108',
        'https://www.youtube.com/embed/xGcfBRkJSWQ?start=1456',
        'https://www.youtube.com/embed/QyaDlIirJnw?start=77',
        'https://www.youtube.com/embed/pPls2qEMs_k?start=795',
        'https://www.youtube.com/embed/J3UyjlaBMcY?start=39',
        'https://www.youtube.com/embed/va8zjTPsJrI?start=75',
        'https://www.youtube.com/embed/nVequqtEV3k?start=57',
        'https://www.youtube.com/embed/BpE_DxkPSnE?start=62',
        'https://www.youtube.com/embed/sqjfq5gsfYk?start=60'
    ]

    var TOP_10_SCORE = ["assets/mp3/shawshank.mp3",
        "assets/mp3/godfateher_1.mp3",
        "assets/mp3/dark_knight.mp3",
        "assets/mp3/godfateher_2.mp3",
        "assets/mp3/lord_1.mp3",
        "assets/mp3/pulp.mp3",
        "assets/mp3/shindler.mp3",
        "assets/mp3/angry.mp3",
        "assets/mp3/fight.mp3",
        "assets/mp3/lord_2.mp3",
    ]

    var WORD;
    var VIDEO_LINK;
    var GUESSES = [];
    var TOTAL_LIVES;
    var TOTAL_CORRECT_GUESSES;
    var TOTAL_WINS = 0;
    var SELECTED_INDEX = -1
    var AUDIO_PLAYER;
    var FIRST_KEY_STROKE = false;

    newGame = function () {

        var keyToBeginContainer = document.getElementById('KEY_TO_BEGIN');
        keyToBeginContainer.innerHTML = 'Press a key to get started!';

        GUESSES = [];
        TOTAL_LIVES = 10;
        TOTAL_CORRECT_GUESSES = 0;
        TOTAL_REMAINING_UNKNOWN_CHARS = 0;
        FIRST_KEY_STROKE = true;
        startKeyUpListener();
        setRandomWord();
        stopAudio();
        renderGuesses();
        renderComments();
        renderCanvas();
    }

    renderGuesses = function () {

        var container = document.getElementById('WORD_CONTAINER');
        container.innerHTML = '';
        TOTAL_REMAINING_UNKNOWN_CHARS = 0;
        for (var index = 0; index < WORD.length; index++) {
            var wordCharacter = WORD.charAt(index).toString().toLowerCase();
            if (GUESSES.indexOf(wordCharacter) > -1) {
                container.innerHTML += WORD.charAt(index) + ' ';
            } else if (alphabet.indexOf(wordCharacter) > -1) {
                container.innerHTML += '_ ';
                TOTAL_REMAINING_UNKNOWN_CHARS++;
            } else if (WORD.charAt(index) == ' ') {
                container.innerHTML += '&nbsp;&nbsp;';
            } else {
                container.innerHTML += WORD.charAt(index) + '  ';
            }
        }

        var guessesContainer = document.getElementById('GUESSED_SO_FAR');
        guessesContainer.innerHTML = '';
        for (var index = 0; index < GUESSES.length; index++) {
            if (WORD.indexOf(GUESSES[index]) > -1) {
                guessesContainer.innerHTML += '<span class="badge">' + GUESSES[index].toString().toUpperCase() + '</span>&nbsp;';
            } else {
                guessesContainer.innerHTML += '<span class="badge" style="color: red;">' + GUESSES[index].toString().toUpperCase() + '</span>&nbsp;';
            }

        }
    }

    keyUpEventFunction = function (event) {
        if (event.code.indexOf('Key') > -1) {

            if (FIRST_KEY_STROKE) {
                FIRST_KEY_STROKE = false;
                playAudio();
            }

            var keyToBeginContainer = document.getElementById('KEY_TO_BEGIN');
            keyToBeginContainer.innerHTML = '';

            var inputChar = event.code[event.code.length - 1].toString().toLocaleLowerCase();
            if (GUESSES.indexOf(inputChar) == -1) {
                GUESSES.push(inputChar);
                if (WORD.toLowerCase().indexOf(inputChar) > -1) {
                    TOTAL_CORRECT_GUESSES++;
                } else {
                    TOTAL_LIVES--;
                    if (drawArray[TOTAL_LIVES])
                        drawArray[TOTAL_LIVES]();
                }
            }
        }

        renderGuesses();
        renderComments();
    }

    startKeyUpListener = function () {
        document.addEventListener('keyup', keyUpEventFunction);
    }

    stopKeyUpListener = function () {
        document.removeEventListener('keyup', keyUpEventFunction);
    }

    setRandomWord = function () {
        SELECTED_INDEX = Math.floor(Math.random() * TOP_10_MOVIES.length);
        WORD = TOP_10_MOVIES[SELECTED_INDEX];
        VIDEO_LINK = TOP_10_LINKS[SELECTED_INDEX];
    }

    playAudio = function () {

        AUDIO_PLAYER = document.getElementById('AUDIO_PLAYER');
        AUDIO_PLAYER.removeChild(document.getElementById('AUDIO_PLAYER_SOURCE'));
        var sourceElement = document.createElement('SOURCE');
        sourceElement.id = 'AUDIO_PLAYER_SOURCE';
        sourceElement.src = TOP_10_SCORE[SELECTED_INDEX];
        sourceElement.type= "audio/mp3"
        AUDIO_PLAYER.appendChild(sourceElement);
        AUDIO_PLAYER.load();
        AUDIO_PLAYER.play();

        /*AUDIO_ELEMENT = new Audio(TOP_10_SCORE[SELECTED_INDEX]);
        AUDIO_PREMISE = AUDIO_ELEMENT.play();

        if (AUDIO_PREMISE !== undefined) {
            AUDIO_PREMISE.then(_ => {

            }).catch(error => {
                alert('No audio playback possible.')
            });
        }*/

    }

    stopAudio = function () {

        if (AUDIO_PLAYER != null) {
            AUDIO_PLAYER.pause();
            /*var sourceElement = document.getElementById('AUDIO_PLAYER_SOURCE');
            if (sourceElement != null)
                sourceElement.src = '';*/
        }

        /*AUDIO_PREMISE = AUDIO_ELEMENT.pause();

        if (AUDIO_PREMISE !== undefined) {
            AUDIO_PREMISE.then(_ => {}).catch(error => {
                alert('No audio playback possible.')
            });
        }*/

    }

    renderComments = function () {
        var livesStatusElement = document.getElementById('LIVES_STATUS');
        livesStatusElement.innerHTML = "Number of Guesses Remaining: " + TOTAL_LIVES;

        var totalWinsStatusElement = document.getElementById('TOTAL_WINS_STATUS');
        totalWinsStatusElement.innerHTML = "Total Wins: " + TOTAL_WINS;

        if (TOTAL_LIVES < 1) {
            livesStatusElement.innerHTML = "Game Over";
            stopAudio();
            stopKeyUpListener();
            newGame();

        }
        if (TOTAL_REMAINING_UNKNOWN_CHARS == 0) {
            livesStatusElement.innerHTML = "You Won!";
            stopAudio();
            showVideo();
            stopKeyUpListener();

        }
    }

    draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
        var stickmanCanvas = document.getElementById("STICKMAN_CANVAS");
        var context = stickmanCanvas.getContext('2d');
        context.moveTo($pathFromx, $pathFromy);
        context.lineTo($pathTox, $pathToy);
        context.stroke();
    }

    renderCanvas = function () {
        var stickmanCanvas = document.getElementById("STICKMAN_CANVAS");
        var context = stickmanCanvas.getContext('2d');
        context.clearRect(0, 0, stickmanCanvas.width, stickmanCanvas.height);
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;

    };

    head = function () {
        var stickmanCanvas = document.getElementById("STICKMAN_CANVAS");
        var context = stickmanCanvas.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    frame1 = function () {
        draw(0, 150, 150, 150);
    };

    frame2 = function () {
        draw(10, 0, 10, 600);
    };

    frame3 = function () {
        draw(0, 5, 70, 5);
    };

    frame4 = function () {
        draw(60, 5, 60, 15);
    };

    torso = function () {
        draw(60, 36, 60, 70);
    };

    rightArm = function () {
        draw(60, 46, 100, 50);
    };

    leftArm = function () {
        draw(60, 46, 20, 50);
    };

    rightLeg = function () {
        draw(60, 70, 100, 100);
    };

    leftLeg = function () {
        draw(60, 70, 20, 100);
    };

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];

    var newGameButton = document.getElementById('newGameButton');
    newGameButton.addEventListener('click', function (event) {
        TOTAL_WINS = 0;
        newGame();
    });

    showVideo = function () {
        $('#myModal').modal('show');
        $('#myModal iframe').attr('src', VIDEO_LINK + '&autoplay=1&controls=0&disablekb=1');

        $('#myModal').off('hidden.bs.modal');
        $('#myModal').on('hidden.bs.modal', function () {
            $('#myModal iframe').removeAttr('src');
            TOTAL_WINS++;
            newGame();
        });

    }

    newGame();



}