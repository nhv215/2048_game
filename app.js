document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.getElementsByClassName('grid')[0];
    const screenDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    let squares = [];
    let score = 0;

    //Creating a playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    createBoard();

    // Generate a number randomly
    function generate() {
        randomNumber = Math.floor(Math.random() * squares.length)
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        } else generate()
    }

    //swipe right
    function moveRight() {
        for (let i = 0; i < width * width; i++) {
            if (i % width === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num)
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    //move left

    function moveLeft() {
        for (let i = 0; i < width * width; i++) {
            if (i % width === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num)
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    // move down

    function moveDown() {
        for (let i = 0; i < width; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (2 * width)].innerHTML;
            let totalFour = squares[i + (3 * width)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = width - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (2 * width)].innerHTML = newColumn[2];
            squares[i + (3 * width)].innerHTML = newColumn[3];
        }
    }

    // move up

    function moveUp() {
        for (let i = 0; i < width; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + (2 * width)].innerHTML;
            let totalFour = squares[i + (3 * width)].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = width - filteredColumn.length;
            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (2 * width)].innerHTML = newColumn[2];
            squares[i + (3 * width)].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        for (let i = 0; i < (width * width) - 1; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                screenDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < width * (width - 1); i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                screenDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function addColorClass() {
        for (let i = 0; i < width * width; i++) {
            // square[i].classList.remove(...square[i].classList);
            if (square[i].innerHTML == 0) {
                squares[i].classList.add("zero");
            } else if (square[i].innerHTML == 2) {
                squares[i].classList.add("two");
            } else if (square[i].innerHTML == 4) {
                squares[i].classList.add("four");
            } else if (square[i].innerHTML == 8) {
                squares[i].classList.add("eight");
            } else if (square[i].innerHTML == 16) {
                squares[i].classList.add("sixteen");
            } else if (square[i].innerHTML == 32) {
                squares[i].classList.add("thirty_two");
            } else if (square[i].innerHTML == 64) {
                squares[i].classList.add("sixty_four");
            } else if (square[i].innerHTML == 128) {
                squares[i].classList.add("one_two_eight");
            } else if (square[i].innerHTML == 256) {
                squares[i].classList.add("two_fifty_six");
            } else if (square[i].innerHTML == 512) {
                squares[i].classList.add("five_one_two");
            } else if (square[i].innerHTML == 1024) {
                squares[i].classList.add("one_zero_two_four");
            } else if (square[i].innerHTML == 2048) {
                squares[i].classList.add("two_zero_four_eight");
            }
        }
    }

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
        // addColorClass()
    }

    document.addEventListener('keyup', control);

    // check for 2048

    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "WON!!";
                document.addEventListener('keyup', control);
            }
        }
    }

    // check for no zeros 

    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = "GAME OVER!!";
            document.addEventListener('keyup', control);
        }
    }

});