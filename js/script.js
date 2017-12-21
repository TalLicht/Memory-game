var numOfCards = 12;
var clickCounter = 0, pairsCounter = [];
var firstCardId = 0, secondCardId = 0, firstCard="", secondCard = "";
var gameBoard = document.getElementById("gameBoard");
var ableToFlip = true;
function Game(){
	
};

for (var i = 1 ; i <= numOfCards ; i++){
	var imgHolder = document.createElement('div');
	gameBoard.appendChild(imgHolder);
	imgHolder.setAttribute("id", [i]);
	imgHolder.setAttribute("class", "card cardFaceDown");

};

var pairsArr = ["firstPair","firstPair","secondPair","secondPair","thirdPair","thirdPair","forthPair","forthPair","fifthPair","fifthPair","sixthPair","sixthPair"]
shuffle(pairsArr);

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

var cardsArray = document.getElementsByClassName("cardFaceDown");
for (var i = 0; i < cardsArray.length; i++){
	cardsArray[i].addEventListener("click",flipCards);
}


function flipCards(e){
  if (ableToFlip){
	var newClass = "";
    var self = this.className.split(' ');
	for(var j = 0; j < self.length ; j++){
		if(self[j] != "cardFaceDown"){
	        newClass += self[j] + " ";
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
      }
      else {
      	setTimeout(function(){
           document.getElementById(firstCardId).classList.add("cardFaceDown");
           document.getElementById(secondCardId).classList.add("cardFaceDown");
           clickCounter = 0;
      	}, 1000);
      }
      if(pairsCounter.length == (numOfCards/2)){
      	console.log(pairsCounter.length);
      	document.getElementById("theModal").style.display = "block";
      }
      setTimeout(function(){
        	ableToFlip = true;
      	}, 1000);
      return this;
    }
  }
};

