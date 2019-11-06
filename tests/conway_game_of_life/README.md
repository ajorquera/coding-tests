# Conway's Game Of Life

![game of life pattern](https://giphygifs.s3.amazonaws.com/media/tXlpbXfu7e2Pu/giphy.gif)


The universe of the Game of Life is an infinite two dimensional orthogonal grid of square cells, each of which is in one of two possible states, alive or dead. Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur: 

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population. 

2. Any live cell with two or three live neighbours lives on to the next generation. 

3. Any live cell with more than three live neighbours dies, as if by overcrowding. 

4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. 

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed—births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick (in other words, each generation is a pure function of the preceding one). The rules continue to be applied repeatedly to create further generations. 

More information at http://en.wikipedia.org/wiki/Conway's_Game_of_Life

## Task 

Your task, as a potential candidate , is to implement Conway’s Game of Life using JavaScript language, HTML and CSS. The main goal of this task is to test JavaScript knowledge. Knowledge needed to solve this task successfully is considered to be basic. 

 There are no specific requirements about organizing the code of the solution, or which external libraries to use; jQuery, Bootstrap and similar are allowed. 
 
Considering functionality, here are the requirements: 

1. The initial population is generated randomly. 

2. The game runs continuously, until paused or until the page is refreshed. 

3. 2D grid must be visually represented in the HTML, and changes in each iteration of the game must be visible on that grid. 

4. Size of the grid is dynamic. 

5. Use CSS animations to transition between different states for each cell (alive, dead). 

6. Current iteration and number of alive cells must be visible in the interface. 

7. Interface buttons: 

    * Pause button pauses execution of the game. 

    * Step button enabled when the game is paused, runs one iteration of the game on click. 

    * Reset button restarts the game. 

    * Any extra features a candidate decides to implement are considered to be a bonus. 
