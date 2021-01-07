import React from 'react';
import './navbar.sass';
import DownloadNav from './sublinks/downloadUI';
import { connect } from 'react-redux';

class Navbar extends React.Component {

    render(){
        return(
            <div className="no-print">
                <nav className="nav-container">
                    <ul className="link-container">
                        <DownloadNav/>
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