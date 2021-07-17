let WIDTH, HEIGHT, BOMBS_COUNT;
let result1 = confirm("Would you like to play easy game?"); // we ask user easy game or not easy
  if (result1 == true)  // if user press 'ok' it would be parameters
  {
    startGame(15, 8, 20);
  }
  else {  //if user press 'cancel' it would be parameters
    startGame(20, 15, 35);

  }

//startGame(15, 8, 30);
const bomb = '💣';
function startGame(WIDTH, HEIGHT, BOMBS_COUNT) { // function to start a game
  const field = document.querySelector('.field');
  const cellsCount = WIDTH * HEIGHT; //count of cells in our field
  field.innerHTML = '<button></button>'.repeat(cellsCount); //  make cells as buttons and repeat them as much times as many cells we need
  const cells = [...field.children]; // cells array is copy of all children of array field

  let closedCount = cellsCount;

  const bombs = [...Array(cellsCount).keys()] // array of bombs
    .sort(() => Math.random() - 0.5)  //index of bombs
    .slice(0, BOMBS_COUNT); //index of bombs

  field.addEventListener('click', (event) => {    // processor on click on a cell of field do actions
    if (event.target.tagName !== 'BUTTON') {  // if we click not at cell of our field we do nothing
      return;
    }

    const index = cells.indexOf(event.target); // here we searching for index of our cell in array cells
    const column = index % WIDTH; // her we find column of our cell
    const row = Math.floor(index / WIDTH); // or row = (index - column) / width; // how many full rows fit before it
    open(row, column);
  });

  function isValid(row, column) {
    return row >= 0
        && row < HEIGHT
        && column >= 0
        && column < WIDTH;
  }

  function getCount(row, column) { // function getCount show us how many bombs is near to our cell
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          count++;
        }
      }
    }
    return count;
  }

  function open(row, column) { // function open cell
    if (!isValid(row, column)) return;

    const index = row * WIDTH + column;
    const cell = cells[index];

    if (cell.disabled === true) return;

    cell.disabled = true; // we wrote this to do not allow to click cell 2 times

    if (isBomb(row, column)) {
      alert('YOU LOOSE!');
      cell.innerHTML = bomb;
      reload();
      //alert('you loose');
      return;
      
    }

    closedCount--;
    if (closedCount <= BOMBS_COUNT) {
      alert('YOU WON!');
      reload();
      return;
    }

    const count = getCount(row, column);

    if (count !== 0) {
      cell.innerHTML = count;
      return;
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        open(row + y, column + x);
      }
    }
  }
function reload(WIDTH, HEIGHT, BOMBS_COUNT ){  // function which reload field
  let result = confirm("Would you like to restart game?");
  if (result == true)
  {
    startGame(15, 8, 30);
  }
  else {

  }

}



  function isBomb(row, column) {   // function if there is bomb on cell that we selected
    if (!isValid(row, column)) return false; 

    const index = row * WIDTH + column; // index of selected cell

    return bombs.includes(index); // if our index is in array of bombs so it's bomb there in this cell
  }
}

function flag(){ // function put flag where user think there is bomb
const getFlag = document.createElement('img');
getFlag.src = 'flag1.png'
}
