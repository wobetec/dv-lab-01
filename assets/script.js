
/*
Directions:
    0 - Up
    1 - Right
    2 - Down
    3 - Left
*/

class KeyPressListener {
    instance = null;
    subscribers = Array();

    constructor() {
        if (!KeyPressListener.instance) {
            KeyPressListener.instance = this;
            this.init();
        }
        return KeyPressListener.instance;
    }
    
    init() {
        document.addEventListener('keydown', (event) => {
            this.notify(event);
        });
    }

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }

    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    }

    notify(event) {
        this.subscribers.forEach((subscriber) => subscriber.keyPressed(event));
    }
}


class GameCanva {
    instance = null;
    colors = {
        snake: '#28a745',
        food: '#dc3545',
        background: '#fff',
        border: '#ccc'
    }
    
    constructor(scale = 20) {
        if (!GameCanva.instance) {
            GameCanva.instance = this;
            this.init(scale);
            this.drawBoard();
        }
        return GameCanva.instance;
    }
    
    init(scale) {
        this.canvas = document.getElementById('game-canvas');
        this.context = this.canvas.getContext('2d');
    
        this.scale = scale;
        this.rows = this.canvas.height / this.scale;
        this.columns = this.canvas.width / this.scale;
        this.game_matrix = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.game_matrix[i] = new Array(this.columns);
        }
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.game_matrix[i][j] = 0;
            }
        }
    }

    getSize() {
        return { rows: this.rows, columns: this.columns };
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
        
    drawBoard() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (this.game_matrix[i][j] === 0) {
                    this.context.fillStyle = this.colors.background;
                }
                this.context.fillRect(j * this.scale, i * this.scale, this.scale, this.scale);
                this.context.strokeStyle = this.colors.border;
                this.context.strokeRect(j * this.scale, i * this.scale, this.scale, this.scale);
            }
        }
    }

    drawSnake(cell) {
        this.context.fillStyle = this.colors.snake;
        this.context.fillRect(cell.x * this.scale, cell.y * this.scale, this.scale, this.scale);
    }

    drawFood(cell) {
        this.context.fillStyle = this.colors.food;
        this.context.fillRect(cell.x * this.scale, cell.y * this.scale, this.scale, this.scale);
    }
}


class Button {
    instance = null;
    subscriber = null;
    text = 'Start';
    sameKeys = [' ', 'Enter'];

    constructor() {
        if (!Button.instance) {
            Button.instance = this;
            this.init();
        }
        return Button.instance;
    }

    init() {
        this.button = document.getElementById('start-button');
        this.button.addEventListener('click', (event) => {
            this.notify(event);
        });
        this.keyPressListener = new KeyPressListener();
        this.keyPressListener.subscribe(this);
    }

    keyPressed(event) {
        if (this.sameKeys.includes(event.key)) {
            this.notify(event);
        }
    }

    notify(event) {
        this.subscriber.buttonClicked(event);
    }

    subscribe(subscriber) {
        this.subscriber = subscriber;
    }

    unsubscribe(subscriber) {
        this.subscriber = null;
    }

    start() {
        this.button.innerHTML = 'Stop';
    }

    pause() {
        this.button.innerHTML = 'Continue'
    }

    stop() {
        this.button.innerHTML = 'Restart'
    }
}


class Food {
    instance = null;

    constructor() {
        if (!Food.instance) {
            Food.instance = this;
            this.init();
        }
        return Food.instance;
    }

    init() {
        this.gameCanva = new GameCanva();
        this.cell = null;
    }

    createFood(availableCells) {
        let index = Math.floor(Math.random() * availableCells.length);
        this.cell = availableCells[index];
    }

    draw() {
        if (this.cell !== null){
            this.gameCanva.drawFood(this.cell);
        }
    }

    getCell() {
        return this.cell;
    }

    eat() {
        this.cell = null;
    }

    isEaten() {
        return this.cell === null;
    }
}


class Snake {
    instance = null;

    constructor() {
        if (!Snake.instance) {
            Snake.instance = this;
            this.init();
        }
        return Snake.instance;
    }

    init() {
        this.keyPressListener = new KeyPressListener();
        this.keyPressListener.subscribe(this);

        this.gameCanva = new GameCanva();
        let { rows, columns } = this.gameCanva.getSize();

        this.body = Array();
        this.body.push({ x: columns / 2, y: rows / 2 });
        this.body.push({ x: columns / 2 - 1, y: rows / 2 });
        this.body.push({ x: columns / 2 - 2, y: rows / 2 });
        this.direction = 1;

        this.draw();
    }

    keyPressed(event) {
        switch (event.key) {
            case 'w':
                if(this.direction !== 2){
                    this.changeDirection(0);
                }
                break;
            case 'd':
                if(this.direction !== 3){
                    this.changeDirection(1);
                }
                break;
            case 's':
                if(this.direction !== 0){
                    this.changeDirection(2);
                }
                break;
            case 'a':
                if(this.direction !== 1){
                    this.changeDirection(3);
                }
                break
        }
    }

    draw() {
        this.body.forEach((cell) => {
            this.gameCanva.drawSnake(cell);
        });
    }

    wantToMove() {
        let head = { x: this.body[0].x, y: this.body[0].y };
        switch (this.direction) {
            case 0:
                head.y -= 1;
                break;
            case 1:
                head.x += 1;
                break;
            case 2:
                head.y += 1;
                break;
            case 3:
                head.x -= 1;
                break;
        }
        return head;
    }

    move(cell) {
        this.body.unshift(cell);
        let tail = this.body.pop();
    }

    eat(cell) {
        this.body.unshift(cell);
    }

    changeDirection(direction) {
        this.direction = direction;
    }
}


class ScoreBoard {
    instance = null;

    constructor() {
        if (!ScoreBoard.instance) {
            ScoreBoard.instance = this;
            this.init();
        }
        return ScoreBoard.instance;
    }
    
    init() {
        this.maxScoreElement = document.getElementById('max-score');
        this.currentScoreElement = document.getElementById('current-score');
        this.currentScore = 0;
        this.updateMaxScore();
    }
    
    updateMaxScore() {
        let maxScore = localStorage.getItem('max-score');
        if (maxScore === null || this.currentScore > maxScore) {
            maxScore = this.currentScore;
            localStorage.setItem('max-score', maxScore);
        }
        this.maxScoreElement.innerHTML = maxScore;
    }

    updateCurrentScore() {
        this.currentScoreElement.innerHTML = this.currentScore;
    }

    increaseScore() {
        this.currentScore += 1;
        this.updateCurrentScore();
        this.updateMaxScore();
    }

    resetScore() {
        this.currentScore = 0;
        this.updateCurrentScore();
    }
}


class SnakeGame {
    constructor() {
        this.button = new Button();
        this.button.subscribe(this);

        this.gameCanva = new GameCanva();
        this.snake = new Snake();
        this.scoreBoard = new ScoreBoard();
        this.food = new Food();

        this.running = false;
        this.gameIsOver = false;
    }

    buttonClicked(event) {
        if (!this.running && !this.gameIsOver) {
            this.running = true;
            this.start();
        } else if (this.gameIsOver) {
            console.log('Game over');
            this.gameIsOver = false;
            this.running = true;
            this.scoreBoard.resetScore();
            this.snake.init();
            this.start();
        } else {
            this.running = !this.running;
            if (this.running) {
                this.start();
            } else {
                this.button.pause();
                this.stop();
            }
        }
    }

    gameOver() {
        this.gameIsOver = true;
        this.running = false;
        this.food.eat();
        this.stop();
        this.button.stop();
    }

    update() {
        // add food if needed
        if (this.food.isEaten()) {
            let availableCells = Array();
            let { rows, columns } = this.gameCanva.getSize();
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
                    if (this.snake.body.filter((cell) => cell.x === j && cell.y === i).length === 0) {
                        availableCells.push({ x: j, y: i });
                    }
                }
            }
            this.food.createFood(availableCells);
        }

        let cell = this.snake.wantToMove();

        // Check colitions with borders
        let { rows, columns } = this.gameCanva.getSize();
        if (cell.x < 0 || cell.x >= columns || cell.y < 0 || cell.y >= rows) {
            this.gameOver();
        }
        
        // Check colitions with itself
        let body = this.snake.body;
        for (let i = 1; i < body.length; i++) {
            if (cell.x === body[i].x && cell.y === body[i].y) {
                this.gameOver();
            }
        }

        // Check colitions with food
        let foodCell = this.food.getCell();
        if (cell.x === foodCell.x && cell.y === foodCell.y) {
            this.snake.eat(cell);
            this.food.eat();
            this.scoreBoard.increaseScore();
        } else {
            this.snake.move(cell);
        }
    }

    draw() {
        this.gameCanva.clear();
        this.gameCanva.drawBoard();
        this.snake.draw();
        this.food.draw();
    }

    start() {
        this.button.start();
        this.interval = setInterval(() => {
            if (this.running) {
                this.update();
            }
            if (this.running) {
                this.draw();
            }
        }, 100);
    }

    stop() {
        clearInterval(this.interval);
    }
}


var snakeGame = new SnakeGame();
