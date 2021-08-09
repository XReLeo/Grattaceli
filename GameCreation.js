//GAME

const defaultList = [];

function FillCells() {

    let nums = [];//conatins numbers bitween 1 and N

    for (let i = 1; i <= N; i++) {
        nums.push(i);
    }

    //create the base row randomly which is defaultList
    while (nums.length > 0) {
        let index = floor(random(nums.length))
        let num = nums[index];
        nums.splice(index, 1);
        defaultList.push(num);
    }

    let matrix = [];
    let offsets = [];//contains an offset for each row from which start to insert the values of the base row

    for (let i = 1; i <= N; i++) {
        offsets.push(i);
    }

    for (let i = 0; i < N; i++) {
        matrix[i] = [];
        for (let j = 0; j < N; j++) {
            matrix[i][j] = null;
        }
    }

    //assign a randomly offsetted list of defaultList to each row
    for (let i = 0; i < N; i++) {
        let index = floor(random(offsets.length));
        let offset = offsets[index];
        offsets.splice(index, 1);
        for (let j = 0; j < N; j++) {

            let el = defaultList[(j + offset) % N];
            matrix[i][j] = el;
        }
    }

    console.log(matrix);

    let count = 0;
    const possible_rows = [];

    //DO TWO RANDOM SWAP FOR EAH COUPLE OF ROWS

    //initialize the set of possible rows to do the swaps
    for (let i = 0; i < N; i++) {
        possible_rows.push(i);
    }

    while (possible_rows.length > 0 && count < N) {

        count++;

        console.log(possible_rows);

        let iter = floor(random(possible_rows.length));
        let i1 = possible_rows[iter];
        let first_el = matrix[i1][0] // first element of the row

        //find the row such that the j = N/2 element in that row is equal to first_el 
        let i2 = null;
        for (let i = 0; i < N; i++) {
            if (matrix[i][N / 2] == first_el && i != i1) {
                i2 = i;
            }
        }

        let toRemove = null;
        for (let k = 0; k < possible_rows.length; k++) {
            if (possible_rows[k] == i2) {
                toRemove = k;
            }
        }

        Remove(possible_rows, iter);
        Remove(possible_rows, toRemove);

        //now i have to swap a random element of the i1 row with the corresponding in the i2 row
        //and the corresponding couple

        let j1 = floor(random(N));
        let aux = matrix[i1][j1];
        matrix[i1][j1] = matrix[i2][j1];
        matrix[i2][j1] = aux;

        aux = matrix[i1][(j1 + N / 2) % N];
        matrix[i1][(j1 + N / 2) % N] = matrix[i2][(j1 + N / 2) % N];
        matrix[i2][(j1 + N / 2) % N] = aux;

        //select another j to swap
        let j2 = null;
        let z = 0;
        while (j2 == null && z < 1000) {
            let val = floor(random(N));
            z++;
            if (val != j1) {
                j2 = val;
            }
        }

        aux = matrix[i1][j2];
        matrix[i1][j2] = matrix[i2][j2];
        matrix[i2][j2] = aux;

        aux = matrix[i1][(j2 + N / 2) % N];
        matrix[i1][(j2 + N / 2) % N] = matrix[i2][(j2 + N / 2) % N];
        matrix[i2][(j2 + N / 2) % N] = aux;

    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            grid[i][j].value = matrix[i][j];
        }
    }

}

function CreateClues() {

    //top
    for (let j = 0; j < N; j++) {
        for (let i = 0; i < N; i++) {

            let increase = true;
            for (let k = 0; k < i; k++) {
                if (grid[k][j].value > grid[i][j].value) {
                    increase = false;
                }
            }

            if (increase) {
                CluesGrid[0][j].clue++;
            }
        }
    }

    //right
    for (let i = 0; i < N; i++) {
        for (let j = N - 1; j >= 0; j--) {

            let increase = true;
            for (let k = N - 1; k >= j; k--) {
                if (grid[i][k].value > grid[i][j].value) {
                    increase = false;
                }
            }

            if (increase) {
                CluesGrid[1][i].clue++;
            }
        }
    }

    //bottom
    for (let j = 0; j < N; j++) {
        for (let i = N - 1; i >= 0; i--) {

            let increase = true;
            for (let k = N - 1; k >= i; k--) {
                if (grid[k][j].value > grid[i][j].value) {
                    increase = false;
                }
            }

            if (increase) {
                CluesGrid[2][j].clue++;
            }
        }
    }

    //left
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {

            let increase = true;
            for (let k = 0; k < j; k++) {
                if (grid[i][k].value > grid[i][j].value) {
                    increase = false;
                }
            }

            if (increase) {
                CluesGrid[3][i].clue++;
            }
        }
    }
}