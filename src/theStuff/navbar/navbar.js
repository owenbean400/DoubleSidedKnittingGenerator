import React from 'react';
import './navbar.sass';
//import { jsPDF } from 'jspdf';
import { connect } from 'react-redux';
import createKnitImg from './printFunctions/knitChartBlackAndWhite';
import download from 'downloadjs';

class Navbar extends React.Component {

    render(){
        return(
            <div className="no-print">
                <nav className="nav-container">
                    <ul className="link-container">
                        <li className="links" onClick={() => download(createKnitImg(this.props.info))}>Print</li>
                    </ul>
                    <h1>Owen Bean Double Sided Knitting Pattern Generator</h1>
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
        }
    }
}

export default connect(mapStateToProps)(Navbar)