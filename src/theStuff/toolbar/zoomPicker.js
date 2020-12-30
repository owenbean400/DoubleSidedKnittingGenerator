import React from 'react';
import { connect } from 'react-redux';

class ZoomPicker extends React.Component{

    render(){
        return(
            <div className="zoom-picker">
                <p className="zoom-amount">{this.props.size * 25 + '%'}</p>
                <div className="zoom-change-container">
                    <p className="zoom-change" onClick={() => this.props.changeSize('+')}>+</p>
                    <p className="zoom-change" onClick={() => this.props.changeSize('-')}>-</p>
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