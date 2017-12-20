var numOfImgs = 12;
var gameBoard = document.getElementById("gameBoard");
function Game(){
	
};

for (var i=0 ; i < numOfImgs ; i++){
	var imgHolder = document.createElement('div');
	gameBoard.appendChild(imgHolder);
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
	var newClass = "";
	console.log(this);
    var self = this.className.split(' ');
	for(var j = 0; j < self.length ; j++){
		if(self[j] != "cardFaceDown"){
	        newClass += self[j] + " ";
	    }
    }
    this.setAttribute("class", newClass);
};






