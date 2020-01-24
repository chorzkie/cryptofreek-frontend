import React, { Component } from 'react';
import Card from '../../../components/crypto-info/card.component';
import { connect } from 'react-redux'
import { fetchTopCryptoACT, fetchAllCryptoACT, getCryptoDetailsToPresentACT } from '../../../redux/crypto-data/crypto.data.actions';

import './crypto-list.styles.scss'



const mapStateToProps = (state) => {
    return {
        initFetchDone: state.cryptoDataRED.initFetchDone,
        allCryptoFetchDone: state.cryptoDataRED.allCryptoFetchDone,
        cryptoToPresent: state.cryptoDataRED.cryptoToPresent,
        detailsOfCryptosToPresent: state.cryptoDataRED.detailsOfCryptosToPresent,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTopCrypto: () => dispatch(fetchTopCryptoACT()),
        fetchAllCrypto: () => dispatch(fetchAllCryptoACT()),
        getCryptoDetailsToPresent: (cryptoToPresent) => dispatch(getCryptoDetailsToPresentACT(cryptoToPresent)),
    }
}

export class CryptoListPage extends Component {
    constructor() {
        super();
        this.state = {
            intervalId: null,        }
    }


    render() {
        const { detailsOfCryptosToPresent } = this.props;

        return (
            <div>
                {detailsOfCryptosToPresent === [] ?
                    (<div> <h3>Loading data...</h3> </div>)
                    :
                    (<div className='each-card'>
                        {detailsOfCryptosToPresent
                            .map(eachCrypto => (
                                <Card key={eachCrypto.id} details={eachCrypto} />
                            ))}
                    </div>)
                }
            </div>
        )
    }

    componentDidMount() {

        const { initFetchDone,
            allCryptoFetchDone,
            fetchTopCrypto,
            fetchAllCrypto,
            getCryptoDetailsToPresent } = this.props;

        if (initFetchDone === false) {
            fetchTopCrypto();
        }
        
        if (allCryptoFetchDone === false) {
            fetchAllCrypto();
        }

        setTimeout(() => getCryptoDetailsToPresent(), 2000);

        let intervalId = setInterval(() => getCryptoDetailsToPresent(), 60000)
        this.setState({ intervalId });

    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
     }

}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoListPage)
