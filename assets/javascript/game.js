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
        'https://www.youtube.com/embed/va8zjTPsJrI?start=35',
        'https://www.youtube.com/embed/nVequqtEV3k?start=57',
        'https://www.youtube.com/embed/BpE_DxkPSnE?start=62',
        'https://www.youtube.com/embed/sqjfq5gsfYk?start=60'
    ]

    var WORD;
    var VIDEO_LINK;
    var GUESSES = [];
    var TOTAL_LIVES;
    var TOTAL_CORRECT_GUESSES;

    newGame = function () {

        GUESSES = [];
        TOTAL_LIVES = 10;
        TOTAL_CORRECT_GUESSES = 0;
        TOTAL_REMAINING_UNKNOWN_CHARS = 0;
        startKeyUpListener();
        setRandomWord();
        renderGuesses();
        comments();
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
    }

    startKeyUpListener = function () {

        document.addEventListener('keyup', function (event) {

            if (event.code.indexOf('Key') > -1) {
                var inputChar = event.code[event.code.length - 1].toString().toLocaleLowerCase();
                if (GUESSES.indexOf(inputChar) == -1) {
                    GUESSES.push(inputChar);
                    if (WORD.toLowerCase().indexOf(inputChar) > -1) {
                        TOTAL_CORRECT_GUESSES++;
                    } else {
                        TOTAL_LIVES--;
                        drawArray[TOTAL_LIVES]();
                    }
                }
            }

            renderGuesses();
            comments();
        });
    }

    stopKeyUpListener = function() {
        document.removeEventListener('keyup', function (event) {

        });
    }

    setRandomWord = function () {
        var randomIndex = Math.floor(Math.random() * TOP_10_MOVIES.length);
        WORD = TOP_10_MOVIES[randomIndex];
        VIDEO_LINK = TOP_10_LINKS[randomIndex];
    }

    comments = function () {
        var livesStatusElement = document.getElementById('LIVES_STATUS');
        livesStatusElement.innerHTML = "You have " + TOTAL_LIVES + " lives left.";
        if (TOTAL_LIVES < 1) {
            livesStatusElement.innerHTML = "Game Over";
            stopKeyUpListener();
        }
        if (TOTAL_REMAINING_UNKNOWN_CHARS == 0) {
            livesStatusElement.innerHTML = "You Won!";
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
        newGame();
    });

    showVideo = function () {
        $('#myModal').modal('show');
        $('#myModal iframe').attr('src', VIDEO_LINK + '&autoplay=1&controls=0&disablekb=1');

        $('#myModal').on('hidden.bs.modal', function () {
            $('#myModal iframe').removeAttr('src');
            newGame();
        });

    }

    newGame();

}