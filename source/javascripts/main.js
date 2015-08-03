// will be linked to the canvas in html index
var canvas; 
// similar to threeks scene; add children to the stage
var stage;

// background graphic
var bg;

// main background
var main;

// start button
var startB;
// credits button
var creditsB;

// credits screen
var credits;

// player paddle graphic
var player;
// ball graphic
var ball;
// cpu paddle
var cpu;
// winning popup
var win;
// loosing popup
var loose;


// main player score
var playerScore;
// cpu score
var cpuScore;
// speed of cpu paddle - faster the harder
var cpuSpeed = 6;


// variables for speed of the ball
var xSpeed = 5;
var ySpeed = 5;


// 'tkr' - the ticker which will run code every fraction of a sec
var tkr = new Object;


// preloader using PreloadJS
// contain preloadjs object
var preloader;
// hold list of files needed to load
var manifest;
// hold number of files already loaded
var totalLoaded = 0;


// hold several graphics in order to display them
var TitleView = new Container();


function Main() {

	// link canvas
	canvas = document.getElementById('PongStage');
	// lets us place objects on canvas
	stage = new Stage(canvas);

	// allows us to use mouseevents
	stage.mouseEventsEnabled = true;

	// flash plugin here for browsers which don't support SoundJS

	// array list of files needed to use, give unique ID for each
	mainfest = [
						 {src:"bg.png", id: "bg"},
						 {src:"main.png", id: "main"},
						 {src:"startB.png", id: "startB"},
						 {src: "creditsB.png", id: "creditsB"},
						 {src: "credits.png", id: "credits"}
						 {src: "paddle.png", id: "cpu"},
						 {src: "paddle.png", id: "player"},
						 {src: "win.png", id: "win"},
						 {src: "lose.png", id: "lose"}
						 // sound effects etc can go here
	];


	// configure prelaoder object 
	preloader = new PreloadJS();
	preloader.installPlugin(SoundJS);
	// assign method to each event
	preloader.onProgress = handleProgress;
	preloader.onComplete = handleComplete;
	preloader.onFileLoad = handleFileLoad;
	// load files
	preloader.loadManifest(manifest);


	// *ticker* - add ticker to stage and set frame rate to 30 fps
	Ticker.setFPS(30);
	Ticker.addListener(stage);


}

	
// create preloader functions

function handleProgress(event) {
	// use event.loaded to get % of the loading
	// can follow percentage of loading progress using paramete event.loaded
	// could use this to create a progress bar
}

function handleComplete(event) {
	// triggered when all loading is complete

		// increment variable which holds no. of assets
		totalLoaded++;

		if(manifest.length==totalLoaded) {
			// number of itemes in our manifest is equal to number of loaded assets,
			// go to main menu screen
			addTitleView();
		}
}


function handleFileLoad(event) {

	switch(event.type) {

		case PreloadJS.IMAGE:
		// image loaded
			var img = new Image();
				img.src = event.src;
				img.onload = handleLoadComplete;
				window[event.id] = new Bitmap(img);
		break;

		case PreloadJS.SOUND:
		// sound loaded
		handleLoadComplete();
		break;
	}
}


function addTitleView() {
	// position start elements of interface
	startB.x = 240 - 31.5;
	startB.y = 160;
	startB.name = 'startB';

	creditsB.x = 241 - 42;
	creditsB.y = 200;

	// add these elements to main container
	TitleView.addChild(main, startB, creditsB);
	// now add titleview (with its new childs) to the stage
	stage.addChild(bg, TitleView);
	// update it 
	stage.update();

	// button listeners - when clicking on these, go to these
	startB.onPress = tweenTitleView;
	creditsB.onPress = showCredits;
}


// these credits display and remove the credits screen and the tweenTitleViewwhich
// starts the game
function showCredits() {
	credits.x = 480;

	stage.addChild(credits);
	stage.update();
	Tween.get(credits).to({x:0}, 300);
	credits.onPress = hideCredits;
}


function hideCredits(e) {
	Tween.get(credits).to({x:480}, 300).call(rmvCredits);
}


function rmvCredits() {
	stage.removeChild(credits);
}


function tweenTitleView() {
	Tween.get(TitleView).to({y-320}, 300).call(addGameView);
}


function addGameView() {

	// destroy menu &  credits screen
	stage.removeChild(TitleView);
	TitleView = null;
	credits = null;

	// add game view
	player.x = 2;
	player.y = 160 - 37.5;
	cpu.x = 480 - 25;
	cpu.y = 160 -37.5;
	ball.x = 240 - 15;
	ball.y = 160 -15;

	// score
	// put text in var?
	playerScore = new Text('0', 'bold 20px Arial', '#A3FF24');
	playerScore.x = 211;
	playerScore.y = 20;

	// positioning and styling scores
	cpuScore = new Text('0', 'bold 20px Arial', '#A3FF24');
	cpuScore.x = 262;
	cpuScore.y = 20;

	// add elements to stage
	stage.addChild(playerScore, cpuScore, player, cpu, ball);
	stage.update();

	// start listener
	bg.onPress = startGame;

}


function startGame(e) {
	bg.onPress = null;
	// on mousemove, run the function created below this one
	stage.onMouseMove = movePaddle;

	Ticker.addListener(tkr, false);
	// update each function in the frame
	tkr.tick = update;
}


function movePaddle(e) {
	// player can use mousemove to move up and down Y axis of the stage
	player.y = e.stageY;
}


function reset() {
	// reset position of ball and players
	ball.x = 240 - 15;
	ball.y = 160 - 15;
	player.y = 160 - 37.5;
	cpu.y = 160 - 37.5;

	// pause everything until player clicks again
	stage.onMouseMove = null;
	Ticker.removeListener(tkr);
	bg.onPress = startGame;
}


// alert function to disply winning and loosing function
function alert(e) {
	Ticker.removeListener(tkr);
	stage.onMouseMove = null;
	// may need ; below?
	bg.onPress = null

		if(e == 'win') {
				win.x = 140;
				win.y = -90;

				stage.addChild(win);
				Tween.get(win).to({y: 115}, 300);
		}
		else {
			lose.x = 140;
			lose.y = -90;

			stage.addChild(lose);
			Tween.get(lose).to({y: 115}, 300);
		}
}


// game loop

function update() {

	// ball movement

	// ball moves according to speed x and y
	ball.x = ball.x + xSpeed;
	ball.y = ball.y + ySpeed;

	// cpu movement

	// if the cpu is higher than or lower than the ball, move it
	if (cpu.y < ball.y) {
		cpu.y = cpu.y + 4;
	}
	else if (cpu.y > ball.y) {
		cpu.y = cpu.y -4;
	}

	// wall collision - sound snippet can go here

	// cpu score
	if ((ball.x) < 0) {
		xSpeed = -xSpeed;
		cpuScore.text = parseInt(cpuScore.text + 1);
		reset();
		// sound snippet can go here
	}

	if ((ball.x + 30)) > 480) {
		xSpeed = -xSpeed;
		cpuScore.text = parseInt(cpuScore.text + 1);
		reset();
		// sound snippet can go here
	}

	// cpu collision
	if(ball.x + 30 > cpu.x && ball.x 30 < cpu.x + 22 && ball.y >= cpu.y && ball.y < cpu.y + 75) {
		xSpeed *= -1;
		// sound snippet can go here
	}

	// player collission
	if (ball.x <= player.x + 22 && ball.x > player.x && ball.y >= player.y && ball.y < player.y + 75) {
		xSpeed *= 1;
		// sound snippet can go here
	}

	// stop padle from going out of canvas
	if (player.y >= 249) {
		// keep player at 249
		player.y = 249;
	}

	// check for win
	if(playerScore.text == '10') {
		alert('win');
	}

	// check for game over
	if(cpuScore.text == '10') {
		alert('lose');
	}



}


// in tutorial uses html body onload
main();
