import React, { Component } from 'react'

import Forms from '../forms-and-buttons/forms.component'
import CustomButton from '../forms-and-buttons/button.component'

import { connect } from 'react-redux'
import { processSearchOrFavoritesResultACT, getCryptoDetailsToPresentACT } from '../../redux/crypto-data/crypto.data.actions';

import './searchbar.styles.scss'



const mapStateToProps = (state) => {
    return {
        allCrypto: state.cryptoDataRED.allCrypto,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        processSearchOrFavoritesResult: (searchedData) => dispatch(processSearchOrFavoritesResultACT(searchedData)),
        getCryptoDetailsToPresent: (cryptoToPresent) => dispatch(getCryptoDetailsToPresentACT(cryptoToPresent)),
    }
}


class SearchBar extends Component {
    constructor() {
        super()

        this.state = {
            searched: '',
        }
    }

    handleChange = e => {
        this.setState({ searched: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const result = this.searchedCryptos(this.state.searched)
        if (result.length === 0) {
            const dataToSend = ['Your search result brings nothing. Please also use 2 characters or more as keyword', []]
            this.props.processSearchOrFavoritesResult(dataToSend)
        }
        else {
            const dataToSend = ['Your search of \'' + this.state.searched + '\' brings ' + result.length + ' result(s)', result];
            this.props.processSearchOrFavoritesResult(dataToSend);
            this.props.getCryptoDetailsToPresent(result);
        }
    }

    searchedCryptos = (keyword) => {
        if (keyword.length < 2) {
            return []
        }
        else {
            const filteredCrypto = this.props.allCrypto.filter(crypto => {
                return crypto.name.toLowerCase().includes(keyword.toLowerCase());
            })
            return filteredCrypto;
        }
    }

    render() {
        return (
            <div >
                <form className='search-bar' onSubmit={this.handleSubmit}>
                    <Forms className='forms'
                        type="search"
                        placeholder="Search cryptocurrency"
                        value={this.state.searched}
                        handleChange={this.handleChange}
                    />
                    <CustomButton className='custom-button' type="submit"> <span role="img" aria-label="magnifying-glass">🔍</span> </CustomButton>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);