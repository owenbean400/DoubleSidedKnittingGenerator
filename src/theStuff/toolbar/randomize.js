import React from 'react';
import { connect } from 'react-redux';

class RandomizePicker extends React.Component{

    randomize(){
        var grid = {};
        for(let row = 0; row < Object.values(this.props.grid).length; row++){
            grid[row] = [];
            for(let column = 0; column < Object.values(this.props.grid)[0].length; column++){
                grid[row].push(Math.floor(Math.random() * 2));
            }
        }
        this.props.randomizeGrid(grid);
    }

    render(){
        return(
            <div className="random-picker">
                <button onClick={() => this.randomize()}>Randomize</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        grid: state.info.grid.row
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        randomizeGrid: (grid) => { dispatch({type: "RANDOM_GRID", grid: grid})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomizePicker)