let counter = 0;
p5.disableFriendlyErrors = true;

function setup() {
    createCanvas(600, 600);
    background(156, 0, 199);
    rectMode(CENTER);
    randomSeed(31);
    bird = bird();
}

function draw() {
    if (pieces[counter]) {
        pieces[counter]();
        counter++;
    } else {
        noLoop();
    }
}
