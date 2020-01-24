import React, { Component } from 'react'
import { connect } from 'react-redux'
import { backToFrontPageACT } from '../../redux/crypto-data/crypto.data.actions';
import { Link } from 'react-router-dom'
import './message.styles.scss'


const mapStateToProps = (state) => {
    return {
        mainMessage: state.cryptoDataRED.mainMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        backToFrontPage: () => dispatch(backToFrontPageACT()),
    }
}

class Message extends Component {

    backToFrontPageFunc = () => {
        this.props.backToFrontPage();
    }

    render() {
        return (
            <div>
                <div className='message'>
                    {this.props.mainMessage}
                </div>
                <div>
                    <div className='child-message'>Unfamiliar with cryptos? </div>
                    <Link className='child-message-link' to='/' onClick={() => this.backToFrontPageFunc()}> Find the top traded cryptos here </Link>
                    <div className='child-message'>All data are updated on minutely basis.</div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);

