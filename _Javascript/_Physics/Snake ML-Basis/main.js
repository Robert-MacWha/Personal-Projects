let gridSize = 10;
let pixelSize = 20;

let snake = [];
let snakeDir;
let snakeLength = 3;

let foodPos;

function setup() {

    createCanvas(gridSize * pixelSize, gridSize * pixelSize);
    frameRate(5);

    // Initialize the snake and the food object at random (unique) positions
    snake[0] = createVector(round(random(gridSize - 1)), round(random(gridSize - 1)));
    snakeDir = createVector(0, 0);

    foodPos = createVector(round(random(gridSize - 1)), round(random(gridSize - 1)));

    while(foodPos.equals(snake[0])) {

        foodPos = createVector(round(random(gridSize - 1)), round(random(gridSize - 1)));

    }

}
  
function draw() {

    background(25);

    // Draw the snake
    push();

        noStroke();
        fill(220)

        // Draw the snake's body
        for(let i = 0; i < snake.length; i ++) {

            // Get the box's x and y positions
            let boxX = snake[i].x * pixelSize + 1;
            let boxY = snake[i].y * pixelSize + 1;

            rect(boxX, boxY, pixelSize - 2, pixelSize - 2);

        }

    pop();

    // Draw the food object
    push();

        fill(120, 220, 120);
        noStroke();
        rect(foodPos.x * pixelSize + 1, foodPos.y * pixelSize + 1, pixelSize - 2, pixelSize - 2);

    pop();

    // Move the snake in the specified dir
    if (snakeDir.x != 0 || snakeDir.y != 0) {

        // Calculate the new position of the snake's head and add that to the front of the snake list
        let newPos = p5.Vector.add(snake[0], snakeDir);
        snake.unshift(newPos);

        // Cut off any exess points from the snake
        snake = snake.slice(0, snakeLength);

        // See if the new position of the snake's head is colliding with any obstacles
        if (newPos.x < 0 || newPos.x >= gridSize || newPos.y < 0 || newPos.y >= gridSize) {

            reset();

        }

        for(let i = 1; i < snake.length; i ++) {

            if(snake[i].equals(newPos)) {

                reset();

            }

        }

        // See if the new position of the snake's head is colliding with the food
        if (newPos.equals(foodPos)) {

            eat();

        }

    }

}

function keyPressed() {

    // Detect user inputs and change the dir to the coresponding vector
    if (keyCode == LEFT_ARROW) {

        snakeDir = createVector(-1, 0);

    } else if (keyCode == RIGHT_ARROW) {

        snakeDir = createVector(1, 0);

    } else if (keyCode == UP_ARROW) {
        
        snakeDir = createVector(0, -1);

    } else if (keyCode == DOWN_ARROW) {
        
        snakeDir = createVector(0, 1);

    }
}

function eat () {

    snakeLength += 2;

    foodPos = createVector(round(random(gridSize - 1)), round(random(gridSize - 1)));

    while(foodPos.equals(snake[0])) {

        foodPos = createVector(round(random(gridSize - 1)), round(random(gridSize - 1)));

    }

}

function reset () {

    console.log("Snake died");  
    noLoop();

}