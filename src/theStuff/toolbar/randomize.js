import React from 'react';
import { connect } from 'react-redux';

class RandomizePicker extends React.Component{

    randomize(){
        this.props.randomizeGrid();
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        randomizeGrid: () => { dispatch({type: "RANDOM_GRID"})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomizePicker)