const initState = {
    info: {
        color: ["#ff0", "#000"],
        size: 4,
        grid: {
            row: {
                0: [0,0,0,0,0,0],
                1: [0,1,0,0,1,0],
                2: [0,1,0,0,1,0],
                3: [0,0,0,0,0,0],
                4: [0,1,0,0,1,0],
                5: [0,0,1,1,0,0],
                6: [0,0,0,0,0,0],
            }
        }
    }
}

const rootReducer = (state = initState, action) => {
    if (action.type === "CHANGE_COLOR") {
        let newColor = action.color;
        return {
            info: {
                grid: state.info.grid,
                size: state.info.size,
                color: newColor
            }
        }
    }
    else if(action.type === "CHANGE_SIZE") {
        let newSize;
        if(action.size === '+'){
            newSize = (state.info.size < 20) ? ++state.info.size : state.info.size;
        }
        else if(action.size === '-'){
            newSize = (state.info.size > 1) ? --state.info.size : state.info.size;
        }
        else{
            newSize = state.info.size
        }
        return{
            info: {
                grid: state.info.grid,
                size: newSize,
                color: state.info.color
            }
        }
    }
    else if(action.type === "CHANGE_COLOR_SQUARE"){
        let newGrid = state.info.grid.row;
        let gridPlace = action.gridSpot.match(/[0-9]*/g);
        newGrid[gridPlace[5]][gridPlace[15]] = (newGrid[gridPlace[5]][gridPlace[15]] === 0) ? 1 : 0;
        return{
            info: {
                grid: {
                    row: newGrid
                },
                size: state.info.size,
                color: state.info.color
            }
        }
    }
    else if(action.type === "CHANGE_GRID"){
        let newGrid = state.info.grid.row;
        if(action.gridInfo.search("row") !== -1){
            if(action.gridInfo.search(/[0-9]/g) !== -1){
                let previousAmountColumn = newGrid[0].length
                let numberAmountChange = action.gridInfo.substring(action.gridInfo.search(/[0-9]/g), action.gridInfo.length);
                newGrid = {

                }
                for(let i = 0; i < numberAmountChange; i++){
                    let emptyColumn = [];
                    for(let i = 0; i < previousAmountColumn; i++){
                        emptyColumn.push(0);
                    }
                    newGrid[i] = emptyColumn;
                }
            }
            else if(action.gridInfo.search(/[+]/g) !== -1){
                var newArrayRow = [];
                for(let i = 0; i < Object.values(newGrid)[0].length; i++){
                    newArrayRow.push(0);
                }
                newGrid[Object.values(newGrid).length] = newArrayRow;
            }
            else if(action.gridInfo.search(/[-]/g) !== -1){
                delete newGrid[Object.values(newGrid).length - 1];
            }
        }
        else if(action.gridInfo.search("column") !== -1){
            if(action.gridInfo.search(/[0-9]/g) !== -1){
                console.log("numer column")
                let previousAmountRow = Object.values(newGrid).length;
                let numberAmountChange = action.gridInfo.substring(action.gridInfo.search(/[0-9]/g), action.gridInfo.length);
                newGrid = {
                    
                }
                for(let i = 0; i < previousAmountRow; i++){
                    newGrid[i] = [];
                    for(let j = 0; j < numberAmountChange; j++){
                        newGrid[i].push(0);
                    }
                }
            }
            else if(action.gridInfo.search(/[+]/g) !== -1){
                console.log(newGrid);
                console.log("add column")
                for(let i = 0; i < Object.values(newGrid).length; i++){
                    newGrid[i].push(0);
                }
                console.log(newGrid[Object.values(newGrid)[0]]);
            }
            else if(action.gridInfo.search(/[-]/g) !== -1){
                for(let i = 0; i < Object.values(newGrid).length; i++){
                    newGrid[i].pop();
                }
            }
        }
        console.log(newGrid);
        return{
            info: {
                grid: {
                    row: newGrid
                },
                size: state.info.size,
                color: state.info.color
            }
        }
    }
    return state;
}

export default rootReducer;