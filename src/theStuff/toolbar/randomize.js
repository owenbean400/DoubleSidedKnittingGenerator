import React from 'react';
import { connect } from 'react-redux';

class RandomizePicker extends React.Component{

    randomize(){
        this.props.randomizeGrid();
    }

    render(){
        return(
            <div className="random-picker" style={{backgroundColor: this.props.colorCss[0], borderColor: this.props.colorCss[1]}}>
                <button onClick={() => this.randomize()} style={{backgroundColor: this.props.colorCss[1], color: this.props.colorCss[2]}}>Randomize</button>
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