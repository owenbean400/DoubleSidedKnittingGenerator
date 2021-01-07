export default function createKnitImg(knitInfo) {
    console.log("logged");
    const CANVAS_WIDTH = 612;
    const CANVAS_HEIGHT = 792;
    const SQUARE_SIZE = 12;
    const WHITESPACE_MARGIN_TOP = 30;
    const GRID_PADDING_TOP = 20;
    const GRID_PADDING_LEFT = 32;
    const SPACE_BETWEEN_GRID = 1;
    const HEADER_TEXT = "24px Arial";
    const TEXT_SIZE = "11px Arial";
    const COLOR_SQUARES = ["black", "white"];

    let canvas = document.createElement('canvas');
    canvas.id = "knitImage";
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    let ctx = canvas.getContext("2d");

    console.log(knitInfo.color[0]);
    function Shape(x, y, w, h, fill){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = (fill === 1) ? COLOR_SQUARES[0] : COLOR_SQUARES[1];
    }
    
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, WHITESPACE_MARGIN_TOP);

    ctx.font = HEADER_TEXT;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Owen Bean Knit Pattern Generator", CANVAS_WIDTH/2, WHITESPACE_MARGIN_TOP/1.25);

    ctx.font = TEXT_SIZE;

    var square = [];

    console.log(Object.values(knitInfo.grid));
    for(let yPos = 0; yPos < Object.values(knitInfo.grid).length; yPos++){
        for(let xPos = 0; xPos < Object.values(knitInfo.grid)[yPos].length; xPos++){
            if(yPos === 0){
                ctx.fillText(xPos + 1, xPos * (SQUARE_SIZE + SPACE_BETWEEN_GRID) + GRID_PADDING_LEFT + SQUARE_SIZE/2, GRID_PADDING_TOP/1.5 + WHITESPACE_MARGIN_TOP);
            }
            square.push(new Shape((xPos * (SQUARE_SIZE + SPACE_BETWEEN_GRID)) + GRID_PADDING_LEFT, (yPos * (SQUARE_SIZE + SPACE_BETWEEN_GRID)) + WHITESPACE_MARGIN_TOP + GRID_PADDING_TOP, SQUARE_SIZE, SQUARE_SIZE, Object.values(knitInfo.grid)[yPos][xPos]));
        }
        ctx.fillText(yPos + 1, GRID_PADDING_LEFT/2, (yPos * (SQUARE_SIZE + SPACE_BETWEEN_GRID)) + WHITESPACE_MARGIN_TOP + SQUARE_SIZE + GRID_PADDING_TOP);
    }

    for (var i in square){
        let gridSquare = square[i];
        ctx.fillStyle = gridSquare.fill;
        ctx.fillRect(gridSquare.x, gridSquare.y, gridSquare.w, gridSquare.h);
        ctx.stroke();
    }

    let imgURL = canvas.toDataURL("image/png");
    return imgURL;
}

