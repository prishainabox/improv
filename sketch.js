let counter = 0;
p5.disableFriendlyErrors = true;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
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
        image(get(), width, height);
    }
}
