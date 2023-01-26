// game constants & variables
let inputDir = {x:0 , y:0};
const foodSound = new Audio('food.mp3');
const GameoverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [   // snakeArr snake hai 
    {x:13 , y:15}
]
food = {x:6 , y:7}

// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 0.5/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();        
}
function isCollide(snake){
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }        
    }
    if(snake[0].x >18 || snake[0].x<0 || snake[0].y >18 || snake[0].y<0 )
    {
        return true;
    }
}
function gameEngine() {
    // Part1 - updating the snake array and food
    if(isCollide(snakeArr)){
        GameoverSound.play();
        inputDir = {x:0 , y:0};
        alert("Game Over . Press any key to Play again!");
        snakeArr = [{x:13 , y:10}];
        score = 0;        
    }
    // if the food has been eaten and increment the score regenerate the food at random place
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        foodSound.mozPreservesPitch = false;
        foodSound.playbackRate= .965;
        score +=1;
        if(score > highscoreval)
        {
            highscoreval = score;            
            localStorage.setItem("HiScore" , JSON.stringify(highscoreval));
            hiscoreBox.innerHTML = "HighScore: " + highscoreval;
        }        
        scoreBox.innerHTML = "Score:"  + score;

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2 ;
        let b = 16;
        food = {x:Math.round(a + (b-a)*Math.random()) , y:Math.round( a + (b-a)*Math.random())};
    }
    // Moving the snake
    for(let i = snakeArr.length -2 ; i>=0 ; i--)
    {
        snakeArr[i+1] = {...snakeArr[i]};
    }    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part2 - render snake and food
    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e , index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeElement.classList.add('head');              
        }        
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // display the food
    FoodElement = document.createElement('div');
    FoodElement.style.gridRowStart = food.y
    FoodElement.style.gridColumnStart = food.x;
    FoodElement.classList.add('food')
    board.appendChild(FoodElement);
}





// main Game Logic
let HighScore = localStorage.getItem("HiScore");
if(HighScore === null)
{
    highscoreval =  0;
    localStorage.setItem("HiScore" , JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(HighScore);
    hiscoreBox.innerHTML = "HighScore: " + highscoreval;
    
}

window.requestAnimationFrame(main);
window.addEventListener('keydown' , e=>{
    inputDir = {x:0 , y:1} // it will start the game 
    moveSound.play();
    switch (e.key) {
        
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0 ;
            inputDir.y = -1; 
            e.preventDefault();
                      
            break;

        case "ArrowDown":
            console.log("ArrowDown")  
            inputDir.x = 0 ;
            inputDir.y = 1; 
            e.preventDefault();          
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")  
            inputDir.x = -1;
            inputDir.y = 0; 
            e.preventDefault();           
            break;

        case "ArrowRight":
            console.log("ArrowRight") 
            inputDir.x = 1 ;
            inputDir.y = 0;        
            e.preventDefault();     
            break; 
        default:
            break;
    }
    
});