export default function knitChartPreview(knitInfo){
    
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext("2d");
    canvas.id = "knitPreviewClipArt";
    const SQUARE_SIZE = 21;
    canvas.width = Object.values(knitInfo.grid)[0].length * (SQUARE_SIZE + 1) + SQUARE_SIZE;
    canvas.height = Object.values(knitInfo.grid).length * (SQUARE_SIZE + 1) + SQUARE_SIZE;

    function KnitShape(x, y, w, h, fill){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.fill = fill;

        this.createShape = function(ctx){
            console.log("test object");
            ctx.fillStyle = this.fill;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + (this.h * 0.6666));
            ctx.lineTo(this.x + ((this.w - 1) / 2), this.y + this.h);
            ctx.lineTo(this.x + ((this.w - 1) / 2), this.y + (this.h * 0.3333));
            ctx.lineTo(this.x, this.y);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(this.x + ((this.w - 1)/2 + 1), this.y + (this.h * 0.3333));
            ctx.lineTo(this.x + this.w, this.y);
            ctx.lineTo(this.x + this.w, this.y + (this.h * 0.6666));
            ctx.lineTo(this.x + ((this.w - 1)/2 + 1), this.y + this.h);
            ctx.lineTo(this.x + ((this.w - 1)/2 + 1), this.y + (this.h * 0.3333));
            ctx.fill();
            ctx.closePath();
            return null;
        }
    }

    let shapes = [];

    for(let yPos = 0; yPos < Object.values(knitInfo.grid).length; yPos++){
        for(let xPos = 0; xPos < Object.values(knitInfo.grid)[yPos].length; xPos++){
            shapes.push( new KnitShape(xPos * (SQUARE_SIZE + 1), yPos * (SQUARE_SIZE * 0.6666 + 1), SQUARE_SIZE, SQUARE_SIZE, knitInfo.color[Object.values(knitInfo.grid)[yPos][xPos]]));
        }
    }

    for(let i in shapes){
        let suareGrid = shapes[i];
        suareGrid.createShape(ctx);
    }

    let imgURL = canvas.toDataURL("image/png");
    return imgURL;
}