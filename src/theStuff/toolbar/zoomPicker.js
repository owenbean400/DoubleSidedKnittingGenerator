import React from 'react';
import { connect } from 'react-redux';

class ZoomPicker extends React.Component{

    render(){
        return(
            <div className="zoom-picker" style={{backgroundColor: this.props.colorCss[0], borderColor: this.props.colorCss[1]}}>
                <p className="zoom-amount" style={{color: this.props.colorCss[2]}}>{this.props.size * 25 + '%'}</p>
                <div className="zoom-change-container">
                    <p className="zoom-change" onClick={() => this.props.changeSize('+')} style={{backgroundColor: this.props.colorCss[1], color: this.props.colorCss[2]}}>+</p>
                    <p className="zoom-change" onClick={() => this.props.changeSize('-')} style={{backgroundColor: this.props.colorCss[1], color: this.props.colorCss[2]}}>-</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        size: state.info.size,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSize: (size) => { dispatch({type: 'CHANGE_SIZE', size: size})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoomPicker)