// Possible states:
// 
// 0 = Normal (-> 0, -> 1 [>=1 neighbor as 1])
// 1 (-> 2)
// 2 (-> 3)

class Cell {
    constructor (p) {
        this.pos = p;
        this.state = 0;
        this.next = 0;
    }

    update (others) {
        // Check to see if the state can change
        if (this.state != 0) { return; }

        // See if therequirements are met
        let i = 0;
        let x = this.pos.x / cellSize;
        let y = this.pos.y / cellSize;
        if (y < cellCount-1 && others[x][y + 1].state > 0) { i++; }
        if (y > 0 && others[x][y - 1].state > 0) { i++; }
        if (x < cellCount-1 && others[x + 1][y].state > 0) { i++; }
        if (x > 0 && others[x - 1][y].state > 0) { i++; }
        if (y < cellCount-1 && x < cellCount-1 && others[x + 1][y + 1].state > 0) { i++; }
        if (y > 0 && x > 0 && others[x - 1][y - 1].state > 0) { i++; }
        if (x < cellCount-1 && y > 0 && others[x + 1][y - 1].state > 0) { i++; }
        if (x > 0 && y < cellCount-1 && others[x - 1][y + 1].state > 0) { i++; }

        if (i == 2) {
            this.next = 1;
        }
        if (i > 2) {
            this.next = 0;
        }
    }

    draw () {
        // Update the state
        this.state = this.next;
        // Update the next variable
        if (this.next == 1) { this.next = 2; }
        else if (this.next == 2) { this.next = 0; }

        fill(200);
        if (this.state == 1) { fill(100, 255, 100) }
        else if (this.state == 2) { fill(255, 100, 100) }
        rect(this.pos.x, this.pos.y, cellSize, cellSize);
    }
}