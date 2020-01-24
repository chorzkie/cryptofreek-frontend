import React, { Component } from 'react'
import { connect } from 'react-redux'
import { backToFrontPageACT } from '../../redux/crypto-data/crypto.data.actions';
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
                {
                    this.props.mainMessage === 'Here are 10 hottest cryptos of the last 24 hours..' ?
                        <div>
                            <br /> 
                            <br />
                            <div className='child-message'>All data are updated on minutely basis.</div>
                        </div>
                        :
                        <div>
                            <div className='child-message'>Unfamiliar with cryptos? </div>
                            <div className='child-message-link' onClick={ () => this.backToFrontPageFunc() }> Find the top traded cryptos here </div>
                            <div className='child-message'>All data are updated on minutely basis.</div>
                        </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);

