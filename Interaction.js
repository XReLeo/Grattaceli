//INTERACTION

const Elements = [];

class Element {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.value = null;
    }

    show() {

        fill(150);
        rectMode(CENTER);
        rect(this.x, this.y, side_length);

        let x = this.x - NUM_SIZE / 3;
        let y = this.y + NUM_SIZE / 3;

        textSize(NUM_SIZE);
        fill(0);
        text(this.value, x, y);
    }
}

function CreateElements() {

    const space = side_length / N;

    let new_el = new Element(grid[0][0].x, (5 + N) * side_length);
    new_el.value = 1;
    Elements.push(new_el);

    for (let i = 1; i < N; i++) {

        let x = Elements[i - 1].x + space + side_length;
        let y = (5 + N) * side_length;
        new_el = new Element(x, y);
        new_el.value = i + 1;
        Elements.push(new_el);
    }

    for (let el of Elements) {
        el.show();
    }

}