import React from 'react';
import { connect } from 'react-redux';

const MAX_ROW = 54;
const MAX_COLUMN = 44;

class SizePicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            row: Object.values(this.props.grid).length,
            column: Object.values(this.props.grid)[0].length
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateGrid(info){
        if(info.search("row") !== -1){
            if(info.search(/[+]/g) !== -1 && this.state.row < MAX_ROW){
                this.props.changeGrid(info);
                this.setState({
                    row: parseInt(this.state.row) + 1,
                })
            }
            else if(info.search(/[-]/g) !== -1 && this.state.row > 0){
                this.props.changeGrid(info);
                this.setState({
                    row: parseInt(this.state.row) - 1,
                })
            }
        }
        else if(info.search("column") !== -1){
            if(info.search(/[+]/g) !== -1 && this.state.column < MAX_COLUMN){
                this.props.changeGrid(info);
                this.setState({
                    column: parseInt(this.state.column) + 1,
                })
            }
            else if(info.search(/[-]/g) !== -1 && this.state.column > 0){
                this.props.changeGrid(info);
                this.setState({
                    column: parseInt(this.state.column) - 1,
                })
            }
        }
    }

    onChange(e){
        let infoNum = e.target.value;
        if(e.target.name === "row"){
            if(infoNum > MAX_ROW){
                infoNum = MAX_ROW;
            }
            else if (infoNum < 0){
                infoNum = 0;
            }
            this.setState({
                row: infoNum,
            })
            this.props.changeGrid("row" + infoNum)
        }
        else if(e.target.name === "column"){
            if(infoNum > MAX_COLUMN){
                infoNum = MAX_COLUMN;
            }
            else if (infoNum < 0){
                infoNum = 0;
            }
            this.setState({
                column: infoNum,
            })
            this.props.changeGrid("column" + infoNum)
        }
    }

    onSubmit(e){
        e.preventDefault();
    }

    render(){
        return(
            <div className="size-picker">
                <div className="size-selector">
                    <p className="size-selector-text">Row</p>
                    <form className="size-changer" onSubmit={this.onSubmit}>
                        <button onClick={() => this.updateGrid("+row")} className="size-changer-button">+</button>
                        <input type="number" value={this.state.row} name="row" onChange={this.onChange} className="size-changer-input"></input>
                        <button onClick={() => this.updateGrid("-row")} className="size-changer-button">-</button>
                    </form>
                </div>
                <div className="size-selector">
                    <p className="size-selector-text">Column</p>
                    <form className="size-changer" onSubmit={this.onSubmit}>
                        <button onClick={() => this.updateGrid("+column")} className="size-changer-button">+</button>
                        <input type="number" value={this.state.column} name="column" onChange={this.onChange} className="size-changer-input"></input>
                        <button onClick={() => this.updateGrid("-column")} className="size-changer-button">-</button>
                    </form>
                </div>
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
        changeGrid: (gridInfo) => { dispatch({type: 'CHANGE_GRID', gridInfo: gridInfo})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SizePicker)