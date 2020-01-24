import React, { Component } from 'react';
import './ticker.styles.scss';



class Ticker extends Component {

    render() {
        const { cryptoName, lastPrice, tickerColor, prctChange } = this.props;

        return (
            <div className='ticker'>
                <div className='title'>{cryptoName} - USD</div>
                <div className='price'>
                    <div className='last-price'>$ {lastPrice}</div>
                    <div className={` ${(tickerColor === "#80FF9C") ? 'green' : 'red'} percent `}>
                        ( {prctChange === Infinity ?
                            0 : prctChange} % )
                    </div>
                </div>
            </div>
        )
    }

}

export default Ticker