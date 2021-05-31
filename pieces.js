const pieces = [
    // background and setup
    function() {
        // squares
        colorMode(HSB, 255);
        for (let i = 0; i < 150; i++) {
            let hu = random(70);
            strokeWeight(20);
            stroke(225-hu, 175, 255, 100);
            fill(hu, 255, 255, 100);
            rect(random(width), random(height),
                 random(50, width/3), random(50, height/3)); 
        }
        colorMode(RGB);
    },
    // pixel data manipulation
    function() {
        let i, clr;
        loadPixels();
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                i = ind(x, y);
                clr = getClr(i);
                setClr(clr.map(el => {
                    let v = el;
                    const _x = x - width/2, _y = y-height/2;
                    v += tan(el) * tan(el);
                    v += tan(dist(_x, _y, 0, 0)) * 20 * 
                        abs(15*atan2(_x, _y) % 3);
                    v = Math.max(v*1.2, el);
                    return v;
                }), i);
            }
        } 
        updatePixels();
    },
    // rays and lines
    function() {
        let img = createGraphics(width, height);
        img.background(0, 0);
        img.translate(260, 230);
        img.fill(255, 50);
        img.noStroke();
        img.angleMode(DEGREES);
        for (let i = 0; i <= 360; i+=5) {
            img.push();
            img.rotate(i+random(-5, 5));
            img.ellipse(0, 0, random(width*1.5, width*2), 15);
            img.pop();
        }
        image(img, 0, 0);
        img = createGraphics(width, height);
        img.background(0, 0);
        img.strokeWeight(1);
        for (let i = 0; i < 1000; i++) {
            img.stroke(random(255), random(255), random(255), 50);
            img.line(random(width), random(height),
                     random(width), random(height));
        }
        img.loadPixels();
        bird.loadPixels();
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const index = ind(x, y);
                const g = getClr(index, bird).reduce((a,b)=>a+b)/4;
                img.pixels[index + 3] = random(g);
            }
        }
        bird.updatePixels();
        img.updatePixels();
        image(img, 0, 0);
    },
    // bird
    function() {
        noiseSeed(21); //21, 25
        let c = [145, 81, 80, 50], d = [315, 151, 110];
        maskedTexture(bird, (clr, g, x, y)=>clr.map((el, index)=>{
            if (g < 200) return el+c[index];
                else if (index === clr.length-1) return g;
                else return abs(255-y/400*(el+d[index])*noise(x/100, y/100)*2);
        }));
    },
    // circle texture
    function() {
        let img = createGraphics(width, height);
        const w = img.width, h = img.height;
        img.background(0);
        img.noStroke();
        img.rectMode(CENTER);
        randomSeed(111);
        for (let i = 0; i < 100; i++) {
            const s = random(100);
            img.fill(255, random(100, 200));
            img.ellipse(random(w), random(h), s);
            if (random(1) < 0.1) {
                img.fill(0, random(100, 255));
                img.ellipse(random(w), random(h), s/2);
            }
        }
        maskedTexture(img, (clr, g, x, y)=>clr.map((el, index)=>{
            return el*1.5 - Math.random()*el*0.68;
        }));
        // around eye
        img.background(0);
        img.fill(255, 100)
        img.translate(258, 231);
        for (let i = 0; i < 1700; i++) {
            const x = randomGaussian(0, 300);
            const y = randomGaussian(0, 300);
            img.ellipse(x, y, map(dist(x, y, 0, 0)+random(-10, 10), 0, 300, 60, 1));
        }
        maskedTexture(img, (clr, g, x, y)=>clr.map((el, index)=>
            el + el*noise(x/1000, y/1000)*random(2)
        ));
    },
    // square texture
    function() {
        const img = createGraphics(width, height);
        img.background(0);
        img.strokeWeight(3);
        img.rectMode(CENTER);
        img.fill(255, 100);
        img.stroke(0, 100);
        for (let n = 0; n < 1000; n++) img.rect(random(img.width), random(img.height), random(5, 50), random(5, 50))
        maskedTexture(img, (clr, g, x, y)=>clr.map((el,i)=>{
            return el + random(50, 80)*sin(0.5*i*g*noise(x/100, y/100));
        }));
    }
];
