// create a data object with a bunch of keys and values
let dataset = {
// "key": "value",
"Poules": "Poules",
"Canard": "Canard",
"Cochon": "Cochon",
"Lapins": "Lapins",
"Dindes": "Dindes",
"Oies": "Oies",
"Moutons": "Moutons",
"Chèvres": "Chèvres",
"Bovins": "Bovins",
"Bison": "Bison",

"Poules": 1966,
"Canard": 91,
"Cochon": 47,
"Lapins": 34,
"Dindes": 21,
"Oies": 21,
"Moutons": 17,
"Chèvres": 14,
"Bovins": 10,
"Bison": 1,
}

// setup() runs once at the beginning
function setup() {
	// create a canvas the size of the window
	createCanvas(windowWidth, windowHeight);

    // better color mode because we cool
    colorMode(HSB, 360, 100, 100);

	// set the background color to white-ish
	background(220);
	// loop through the data object
	for(let key in dataset) {
		// set the text alignment to center
		textAlign(CENTER);
		// set the text size to the value of the key * 10
		// this will make the text size proportional to the value
		textSize(dataset[key]*10);
        fill(random(360), 100, 100);
		// draw the key name at a random location on the canvas
		let x = random(0,width);
		let y = random(0,height);
		text(key, x, y);
	}
}