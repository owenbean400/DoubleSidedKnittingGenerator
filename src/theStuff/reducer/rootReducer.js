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
    },
    customize: {
        shortcutKeys: {
            zoom: {
                key: "Alt",
                keyIn: "ArrowUp",
                keyOut: "ArrowDown",
            },
            size: {
                key: "Control",
                rowPlus: "ArrowDown",
                rowMinus: "ArrowUp",
                columnPlus: "ArrowRight",
                columnMinus: "ArrowLeft",
            },
            random: {
                key: "r",
            },
            switchDarkmode: {
                key: "d",
            }
        },
        canvasColor: "#eee",
        darkMode: false,
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
            },
            customize: state.customize
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
            },
            customize: state.customize
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
            },
            customize: state.customize
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
                for(let i = 0; i < Object.values(newGrid).length; i++){
                    newGrid[i].push(0);
                }
            }
            else if(action.gridInfo.search(/[-]/g) !== -1){
                for(let i = 0; i < Object.values(newGrid).length; i++){
                    newGrid[i].pop();
                }
            }
        }
        return{
            info: {
                grid: {
                    row: newGrid
                },
                size: state.info.size,
                color: state.info.color
            },
            customize: state.customize
        }
    }
    else if(action.type === "RANDOM_GRID"){
        let newGrid = {};
        for(let row = 0; row < Object.values(state.info.grid.row).length; row++){
            newGrid[row] = [];
            for(let column = 0; column < Object.values(state.info.grid.row)[0].length; column++){
                newGrid[row].push(Math.floor(Math.random() * 2));
            }
        }
        return {
            info: {
                grid: {
                    row: newGrid,
                },
                size: state.info.size,
                color: state.info.color
            },
            customize: state.customize
        }
    }
    else if(action.type === "SWITCH_DARKMODE"){
        return{
            info: state.info,
            customize: {
                shortcutKeys: state.customize.shortcutKeys,
                canvasColor: (state.customize.darkMode) ? "#eee" : "#999",
                darkMode: !state.customize.darkMode,
            }
        }
    }
    return state;
}

export default rootReducer;