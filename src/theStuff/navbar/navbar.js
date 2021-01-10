import React from 'react';
import './navbar.sass';
import DownloadNav from './sublinks/downloadUI';
import { connect } from 'react-redux';

class Navbar extends React.Component {

    render(){
        let colorCss;
        if(this.props.darkMode){
            colorCss = ["#232323", "#323232", "black", "white"];
        }
        else{
            colorCss = ["#fff", "#eee", "#ddd", "black"];
        }
        return(
            <div className="no-print">
                <nav className="nav-container" style={{backgroundColor: colorCss[0], borderColor: colorCss[1]}}>
                    <ul className="link-container">
                        <DownloadNav
                            colorCss={colorCss}
                        />
                    </ul>
                    <h1 style={{color: colorCss[3]}}>Owen Bean Double Sided Knitting Pattern Generator</h1>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        info: {
            grid: state.info.grid.row,
            color: state.info.color,
        },
        darkMode: state.customize.darkMode,
    }
}

export default connect(mapStateToProps)(Navbar)