document.addEventListener("DOMContentLoaded",function(){

    function GameOfLife(boardWidth,boardHeight){
        this.width = boardWidth;
        this.height = boardHeight;
        this.cells = [];

        this.crateBoard = function(){
            this.board = document.getElementById("board");
            this.board.style.width = `${this.width*10}px`;
            this.board.style.height = `${this.height*10}px`;
            this.divsIndex = this.width * this.height;

            for(var i = 0; i< this.divsIndex; i++){
                var div = document.createElement("div");
                this.board.appendChild(div);
            }
            this.cells = document.querySelectorAll("#board div");
            this.cells.forEach(function(a){
                return a.addEventListener("mouseenter",function(){
                    this.classList.toggle("live");
                });
            })
        }

        this.cellIndex = function(x,y){
           return this.cells[x + (y * this.width)];
        }

        this.setCellState = function(x,y,state){
            if(this.cellIndex(x,y).className != state) {
                this.cellIndex(x, y).classList.add("live")
            }
        }

        this.computeCellNextState = function(x,y){
            var liveIndex = 0;
            if( x > 0 && y > 0 && this.cellIndex(x-1,y-1).className == "live"){
                liveIndex++;
            } if(y > 0 && this.cellIndex(x,y-1).className == "live"){
                liveIndex++;
            } if(y > 0 && x < this.width-1 && this.cellIndex(x+1,y-1).className == "live"){
                liveIndex++;
            } if(x > 0 && this.cellIndex(x-1,y).className == "live"){
                liveIndex++;
            } if(x < this.width-1 && this.cellIndex(x+1,y).className == "live"){
                liveIndex++;
            } if(x> 0 && y < this.height-1 && this.cellIndex(x-1,y+1).className == "live"){
                liveIndex++;
            } if(y < this.height-1 && this.cellIndex(x,y+1).className == "live"){
                liveIndex++;
            } if(x < this.width-1 && y < this.height-1 && this.cellIndex(x+1,y+1).className == "live"){
                liveIndex++;
            } if (liveIndex == 2 && this.cellIndex(x,y).className == 'live'){
                return 1;
            } if (liveIndex == 3 && this.cellIndex(x,y).className == 'live'){
            return 1;
            } if (liveIndex == 3 && this.cellIndex(x,y).className != 'live'){
            return 1;
            } else {
                return 0;
            }
        }

        this.computeNextGeneration = function(){
            this.nextBoard = [];
            for(var i = 0; i<this.height; i++){
                for(var j = 0; j<this.width; j++){
                    this.nextBoard.push(this.computeCellNextState(j,i));
                }
            }
        }

        this.printNextGeneration = function(){
            for(var i = 0; i<this.cells.length; i++){
                if(this.nextBoard[i] == 1 && this.cells[i].className != 'live'){
                    this.cells[i].classList.add("live");
                } else if (this.nextBoard[i] == 0 && this.cells[i].className == "live"){
                    this.cells[i].classList.remove("live");
                }
            }
        }

        this.playGame = function(){
            var self = this;
            game.pauseId = setInterval(function(){
                self.computeNextGeneration();
                self.printNextGeneration();
            }, 500);
        }

        this.startGame = function(){

            game.crateBoard();

            var play = document.getElementById("play");
            var pause = document.getElementById("pause");
            var random = document.getElementById("random");
            var back = document.getElementById("back");

            play.addEventListener("click",function(){
                var oldBoard = document.getElementById("board");
                var newBoard = oldBoard.cloneNode(true);
                oldBoard.parentElement.removeChild(oldBoard);
                var flexContainer = document.querySelector(".flex-container");
                var gameSet = document.getElementById("game-set");
                flexContainer.insertBefore(newBoard,gameSet);
                game.board = document.getElementById("board");
                game.cells = document.querySelectorAll("#board div");
                random.style.display = "none";
                game.playGame();
            })

            pause.addEventListener("click",function () {
                clearInterval(game.pauseId);
                random.style.display = "inline-block";
                this.cells = document.querySelectorAll("#board div");
                this.cells.forEach(function(a){
                    return a.addEventListener("mouseenter",function(){
                        this.classList.toggle("live");
                    });
                })
            })

            random.addEventListener("click",function(){
                for(var i = 0; i<game.height; i++){
                    for(var j = 0; j<game.width; j++){
                        var rand = Math.round(Math.random());
                        var state = '';
                        if(rand == 1){
                            state = "live";
                        }
                        game.setCellState(j,i,state);
                    }
                }
            })

            back.addEventListener("click",function(){
                clearInterval(game.pauseId);
                game.board.style.display = "none";
                game.cells.forEach(function(a){
                    return a.parentElement.removeChild(a);
                })
                document.getElementById("game-set").style.display = "none";
                document.getElementById("start").style.display = "block";

            })
        }

    }

    var startGame = document.getElementById("startGame");
    var boardWidth = 0;
    var boardHeight = 0;

    startGame.addEventListener("click",function(){
        boardWidth = document.getElementById("width").value;
        boardHeight = document.getElementById("height").value;
        if(boardHeight >= 10 && boardHeight <= 80 && boardWidth >= 10 && boardWidth <= 80) {
            document.getElementById("start").style.display = "none";
            document.getElementById("board").style.display = "block";
            document.getElementById("game-set").style.display = "block";
            document.getElementById("random").style.display = "inline-block";

            game = new GameOfLife(boardWidth, boardHeight);
            game.startGame();
        }
    })




})