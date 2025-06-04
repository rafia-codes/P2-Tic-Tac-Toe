let turn="X";
let cells=document.querySelectorAll('.cell');
let result=document.querySelector('h2');
let gameOver=false;

function changeTurn(){
    turn= turn==="X" ? "O":"X";
}
function displayTurnMsg(){
    let msg=document.querySelector('p');
    msg.innerText=`${turn}'s turn`;
}
function checkWin(){
    let wins=[[0,1,2],[3,4,5],[6,7,8],
              [0,3,6],[1,4,7],[2,5,8],
              [0,4,8],[2,4,6]];
    for(let i=0; i<wins.length;i++){
        let [a,b,c]=wins[i];
        let first=cells[a].textContent;
        let second=cells[b].textContent;
        let third=cells[c].textContent;
        if(!gameOver && first && first==second && second==third){
            result.innerText=`${first} Wins 🎉`;
            drawline(i);
            gameOver=true;
            return;
        }
    }
    if(!gameOver && cells.forEach(cell=>cell.innerText!="")){
            result.innerText=`It's a draw! 🤝`;
            gameOver=true;
    }
}
function drawline(i){
    const line=document.querySelector('.line');
    const lineStyles = [
        "translateY(-100px) rotate(0deg)",   // row 1
        "translateY(0px) rotate(0deg)",      // row 2
        "translateY(100px) rotate(0deg)",    // row 3
        "translateX(-100px) rotate(90deg)",  // col 1
        "translateX(0px) rotate(90deg)",     // col 2
        "translateX(100px) rotate(90deg)",   // col 3
        "rotate(45deg)",                     // diag \
        "rotate(-45deg)"                     // diag /
    ];
    line.style.transform = `scaleX(1) ${lineStyles[i]}`;
}
function handleClick(e){
    let cell=e.target;
    if(cell.textContent!="" || gameOver)return;
    cell.textContent=turn;
    checkWin();
    if(!gameOver){
        changeTurn();
        displayTurnMsg();
    }
}
function handleReset(){
    cells.forEach(cell=>cell.textContent="");
    turn="X";
    displayTurnMsg();
    result.innerText="";
    gameOver=false;
    document.querySelector('.line').style.transform="scaleX(0)";
}
cells.forEach(cell=>cell.addEventListener('click',handleClick));
let btn=document.querySelector('button');
btn.addEventListener('click',handleReset);