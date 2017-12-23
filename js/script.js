var aud = document.getElementById("myAudio");
var aud2 = document.getElementById("myAudio");
var numOfCards = 12;
var clickCounter = 0, wrongGuessesCount = 0, pairsCounter = [];
var firstCardId = 0, secondCardId = 0, firstCard="", secondCard = "";
var gameBoard = document.getElementById("gameBoard");
var ableToFlip = true;
var pairsArr = ["firstPair","firstPair","secondPair","secondPair","thirdPair","thirdPair","forthPair","forthPair","fifthPair","fifthPair","sixthPair","sixthPair"];
//window.addEventListener("load",level);
document.getElementById("newGame").addEventListener("click",createBoard);
document.getElementById("newGameModal").addEventListener("click",createBoard);

function Game(){
	
};


// function pickBackSide(){

// }

// function picktheme(){

// }

//Game.prototype.createBoard = function(){
function createBoard(){
	aud.pause();
    aud.innerHTML = "<source src='I Just Cant Wait To Be King.mp3' type='audio/mp3'>";
    aud.load();
    aud.play();
	document.getElementById("theModal").style.display = "none";
	gameBoard.innerHTML = "";
	wrongGuessesCount = 0;
	document.getElementById("wrongGuesses").innerHTML = "wrong guesses: " + wrongGuessesCount;
	for (var i = 0 ; i < 3 ; i++){
		for (var j = 0 ; j < 4 ; j++){
			var imgHolder = document.createElement('div');
			gameBoard.appendChild(imgHolder);
			imgHolder.setAttribute("id", [i+3*j]);
			imgHolder.setAttribute("class", "card cardFaceDown");
			imgHolder.addEventListener("click",flipCards);
		}
	}
	shuffle(pairsArr);
	pairsCounter = [];
};

function shuffle(a) {
	var j, x, i;
	var cardsArr = document.getElementsByClassName("cardFaceDown");
	for (var i = pairsArr.length-1 ; i >= 0 ; i--){
	    j = Math.floor(Math.random() * (i + 1));
	    x = a[i];
	    a[i] = a[j];
	    a[j] = x;
    	cardsArr[i].setAttribute("class","card cardFaceDown" + " " + pairsArr[i]);
    }
};

function flipCards(e){
  if (ableToFlip){
	var newClass = "";
    var removeClass = this.className.split(' ');
	for(var j = 0; j < removeClass.length ; j++){
		if(removeClass[j] != "cardFaceDown"){
	        newClass += removeClass[j] + " ";
	    }
    }
    this.setAttribute("class", newClass);
    clickCounter ++;
    if (clickCounter === 1){
        firstCard = this.className;
        firstCardId = this.id;
    }
    if (clickCounter === 2){
    	ableToFlip = false;
    	secondCard = this.className;
    	secondCardId = this.id;

      if(firstCard == secondCard){
      	pairsCounter.push("pair");
      	clickCounter = 0;
      	ableToFlip = true;
      	removeClick();
      }
      else {
      	setTimeout(function(){
           document.getElementById(firstCardId).classList.add("cardFaceDown");
           document.getElementById(secondCardId).classList.add("cardFaceDown");
           clickCounter = 0;
      	}, 1000);
      	wrongGuessesCount++;
      	document.getElementById("wrongGuesses").innerHTML = "wrong guesses: " + wrongGuessesCount;
      	localStorage.setItem('numOfWrongGuesses',wrongGuessesCount);
      }
      if(pairsCounter.length == (numOfCards/2)){
      	aud.pause();
      	aud.innerHTML = "<source src='cheers.wav' type='audio/wav'>";
      	aud.load();
      	aud.play();
      	document.getElementById("theModal").style.display = "block";
      	var wrongGuesses = localStorage.getItem('numOfWrongGuesses');
      	document.getElementById("modalBodyText").innerHTML = "You had " + wrongGuesses + " wrong gusses";
      }
      setTimeout(function(){
        	ableToFlip = true;
      	}, 1000);
      return this;
    }
  }
};

function removeClick(){
	document.getElementById(firstCardId).removeEventListener("click",flipCards);
    document.getElementById(secondCardId).removeEventListener("click",flipCards);
};