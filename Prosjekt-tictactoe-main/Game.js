let winningAmount = 3;
let dimensions = 3;
let cells = new Array();
let currentMove = "X";
let moves = 0;


class Cell {

    constructor(column, row) {
        this.symbol = " ";
        this.row = row;
        this.column = column;
    }
}

createGrid();
createListeners();

function createGrid() {

    //oppretter arrays
    for (let y = 0; y < dimensions; y++) {
        cells[y] = new Array();

    }

    //henter delen hvor koden skal legges inn
    let container = document.getElementById("gameContainer");
    //egentlig kolonner/html legger inn annerledes
    let column = 0;
    for (let i = 0; i < (dimensions * dimensions); i++) {
        if (i % dimensions == 0 && i > 0) column++;
        container.innerHTML += "<button class = 'button-solid'  id=  '" + i + "'> <div " + i + " class = 'grid-cell'> </div></button>";
        cells[i % dimensions][column] = new Cell(column, i % dimensions);

    }


}

function updateCells(x, y) {
    //setter symbol
    if (cells[x][y].symbol == " ") cells[x][y].symbol = currentMove;
    else return;
    //skal sjekke om det er nok på row
    checkForWinner();
    moves++;
    //oppdaterer Cell til nytt symbol
    document.getElementById((dimensions * x + y)).innerHTML = "<div " + (x * y + y) + " class = 'grid-cell'> " + cells[x][y].symbol + " </div>";
    console.log(moves);
    if (moves == dimensions * dimensions) endGame("");
    //endrer tur 
    if (currentMove == "X") currentMove = ("O");
    else currentMove = "X";

}

//brukes for å returnere oppdater Cell til pilfunksjonen
function updateCellsFetch(x, y) {
    return function () { updateCells(x, y) }
}

function createListeners() {
    let column = 0;
    for (let i = 0; i < (dimensions * dimensions); i++) {
        if (i % dimensions == 0 && i > 0) column++;

        document.getElementById(i).addEventListener("click", updateCellsFetch(column, i % 3), false);


    }
}


function checkForWinner() {

    for (var j = 0; j < dimensions; j++) {

        var vertInRow = 1;
        var horInRow = 1;
        var diagRInRow = 1;
        var diagLInRow = 1;
        for (var i = 1; i < dimensions; i++) {
            //cells[row][column]
            //vertikalt
            if (cells[0][j].symbol == cells[i][j].symbol && cells[0][j].symbol != " ") vertInRow++;
            //horisontalt
            if (cells[j][0].symbol == cells[j][i].symbol && cells[j][0].symbol != " ") horInRow++;
            //diagonal hoyre 
            if (cells[0][0].symbol == cells[i][i].symbol && cells[0][0].symbol != " ") diagRInRow++;
            //diagonal venstre
            if (cells[0][2].symbol == cells[i][i % 2].symbol && cells[0][2].symbol != " ") diagLInRow++;

        }
        if (vertInRow == winningAmount || horInRow == winningAmount || diagRInRow == winningAmount || diagLInRow == winningAmount) endGame(currentMove);
    }
}


//displayer vinner og sletter brett. Opretter også en knapp for å restarte
function endGame(vinner) {

    let vindu = document.getElementById("board");

    if (vinner == "") vindu.innerHTML = "<div class = 'endText'> Tie </div>";
    else vindu.innerHTML = "<div class = 'endText'> Winner = " + currentMove + "</div>";

    vindu.innerHTML +=
        "<div class = 'centered'> \
            <button class = 'button-center'  id=  'restart'> \
            Restart Game </button>\
         </div>";

    document.getElementById("restart").addEventListener("click", restartGame, false);
}

//restarter spill ved å bytte ut all kode i brett med en grid
function restartGame() {
    let vindu = document.getElementById("board");
    vindu.innerHTML = "<div class = 'grid' id = 'gameContainer' > </div>";
    currentMove = "X";
    moves = 0;
    createGrid();
    createListeners();
}




