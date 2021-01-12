import React from 'react'
import { connect } from 'react-redux';
import ScrollArea from 'react-scrollbar';
import './canvas.sass';

class Canvas extends React.Component{
    render(){
        const GRID = this.props.grid.row;
        let gridLength;
        if(Object.values(GRID) !== 0){
            gridLength = Object.values(GRID)[0].length;
        }
        else{
            gridLength = 0;
        }
        var STYLE = {
            box: {
                margin: '1px',
                width: this.props.size * 12 + "px",
                height: this.props.size * 9 + "px",
                transition: 'width 0.2s, height 0.2s',
            },
            row: {
                display: 'flex',
            },
            container: {
                padding: '32px',
                display: 'block',
                width: (this.props.size * (12) * gridLength) + "px",
                transition: 'width 0.2s, height 0.2s',
            },
            view: {
                width: (this.props.size * (12) * gridLength) + 64 + "px",
                transition: 'width 0.02s, height 0.2s',
            }
        }

        var gridDisplay = [];
        for(let i = 0; i < Object.values(GRID).length; i++){
            var gridRow = [];
            for(let j = 0; j < Object.values(GRID)[i].length; j++){
                gridRow.push(
                    <div key={"Column: " + j} id={"Row: " + i + " Column: " + j} style={{...STYLE.box, backgroundColor: this.props.color[Object.values(GRID)[i][j]]}} onClick={(key) => this.props.changeColorSquare(key.target.id)}>
                    </div>
                )
            }
            gridDisplay.push(
                <div key={"Row: " + i} style={STYLE.row}>
                    {gridRow}
                </div>
            )
        }
        return(
            <div>
                <ScrollArea
                    className="canvas-container" 
                    style={{backgroundColor: this.props.canvasBackground}}
                    smoothScrolling={true}
                    contentStyle={STYLE.view}
                >
                    <div style={STYLE.container}>
                        {gridDisplay}
                    </div>
                </ScrollArea>
                <div className="canvas-background" style={{backgroundColor: this.props.canvasBackground}}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        color: state.info.color,
        size: state.info.size,
        grid: state.info.grid,
        canvasBackground: state.customize.canvasColor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeColorSquare: (gridSpot) => { dispatch({type: "CHANGE_COLOR_SQUARE", gridSpot: gridSpot})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)