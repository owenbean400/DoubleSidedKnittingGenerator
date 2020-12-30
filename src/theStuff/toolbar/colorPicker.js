import React from 'react';
import { CompactPicker } from 'react-color';
import { connect } from 'react-redux'

class ColorPicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            choice: 0,
        };
    }

    handleChangeComplete = (color) => {
        var colorArray = (this.state.choice === 1) ? [color.hex , this.props.info.color[1]]: (this.state.choice === 2) ? [this.props.info.color[0] , color.hex] : this.props.info.color;
        this.props.changeColor(colorArray);
        this.forceUpdate();
    }

    changeChoice(choice) {
        this.setState({ choice: choice});
    }

    render(){
        return(
            <div onMouseLeave={() => this.changeChoice(0)}>
                <div className="color-chooser">
                    <div className="color-choices" onClick={() => this.changeChoice(1)} style={{backgroundColor: (this.state.choice === 1) ? '#333': '#444'}}>
                        <p>Color 1</p>
                        <div className="color-circle" style={{backgroundColor: this.props.info.color[0]}}></div>
                    </div>
                    <div className="color-choices" onClick={() => this.changeChoice(2)} style={{backgroundColor: (this.state.choice === 2) ? '#333': '#444'}}>
                        <p>Color 2</p>
                        <div className="color-circle" style={{backgroundColor: this.props.info.color[1]}}></div>
                    </div>
                </div>
                {(this.state.choice > 0) ? 
                <div className="color-picker">
                    <CompactPicker 
                        onChangeComplete={this.handleChangeComplete}
                    />
                </div>    
                : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        info: state.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeColor: (color) => { dispatch({type: 'CHANGE_COLOR', color: color}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker)