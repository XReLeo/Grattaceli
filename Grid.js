//GRIGLIA----------------------------->

const grid = [];//array della griglia : matrice di Celle

function Cella(x, y) {

    this.x = x;
    this.y = y;
    this.centerX = x + side_length / 2;
    this.centerY = y + side_length / 2;
    this.value = null;
    this.show = false;
}

//crea una griglia con rows righe e cols colonne
function CreateGrid() {

    //create the principle grid
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < cols; j++) {
            var x = j * side_length + (window_width - N * side_length) / 2;
            var y = i * side_length + 2 * side_length;
            var cella = new Cella(x, y);//crea una nuova cella
            grid[i][j] = cella;//aggiungi una cella alla griglia
        }
    }

}

//NB: grid[riga][colonna] dove Y indica la riga e X la colonne

function ShowGrid() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            var x = grid[i][j].x;
            var y = grid[i][j].y;

            fill(255);
            stroke(0);

            rect(x, y, side_length, side_length);

            x = grid[i][j].centerX - NUM_SIZE / 3;
            y = grid[i][j].centerY + NUM_SIZE / 3;

            if (grid[i][j].show) {
                textSize(NUM_SIZE);
                fill(0);
                text(grid[i][j].value, x, y);
            }

        }
    }

}