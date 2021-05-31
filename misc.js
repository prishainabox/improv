// get index of pixel in pixels array with x and y coordiantes 
function ind(x, y, w = width) {
    return (x + y*w) * 4;
}

// get color at a specific index in the pixel array
// returns [r, g, b]
function getClr(index, instance = this) {
    return Array(4).fill(index).map((el, ind) => instance.pixels[el + ind]);
}

// sets or adds to the color of a pixel
// pass in [r, g, b, a] and index
function setClr(clr, index, instance = this) {
    clr.forEach((el, ind) => {
        instance.pixels[index + ind] = el;
    });
}

// draws a masked texture
// according to msk image with dimensions width by height
// and function changeClr([r,g,b,a] to change pixel color
function maskedTexture(msk, changeClr, sourceImg = this) { 
    msk.loadPixels();
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const i = ind(x, y);
            const clr = getClr(i, sourceImg);
            if (msk) {
                const grayVal = 1/3 * getClr(i, msk).reduce((a,x,ind,ar) => ind<ar.length-1?x+a:a);
                if (grayVal > 100) {
                    setClr(changeClr(clr, grayVal, x, y), i, sourceImg);
                }
            } else {
                setClr(changeClr(clr, 255, x, y), i, sourceImg);
            }
        }
    }
    updatePixels();
}
