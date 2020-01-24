import React, { Component } from 'react';
import Graph from './graph.component'
import Ticker from './ticker.component'
import CustomButton from '../forms-and-buttons/button.component'

import { connect } from 'react-redux'
import { setMainMessageACT, toggleFavoritesStateACT, processSearchOrFavoritesResultACT, getCryptoDetailsToPresentACT } from '../../redux/crypto-data/crypto.data.actions';
import { updateFavoritesListACT } from '../../redux/page-data/page.data.actions';

import './card.styles.scss';



const mapStateToProps = (state) => {
    return {
        userId: state.pageDataRED.user.id,
        isLoggedIn: state.pageDataRED.isLoggedIn,
        favorites: state.pageDataRED.user.favorites,
        cryptoToPresent: state.cryptoDataRED.cryptoToPresent,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMainMessage: (text) => dispatch(setMainMessageACT(text)),
        processSearchOrFavoritesResult: (searchedData) => dispatch(processSearchOrFavoritesResultACT(searchedData)),
        getCryptoDetailsToPresent: (cryptoToPresent) => dispatch(getCryptoDetailsToPresentACT(cryptoToPresent)),
        updateFavoritesList: (userId, newFavoritesList) => dispatch(updateFavoritesListACT(userId, newFavoritesList)),
        toggleFavoritesState: (cryptoName) => dispatch(toggleFavoritesStateACT(cryptoName))
    }
}

class Card extends Component {

    toggleCryptoFavorites = (id, cryptoName) => {
        console.log('Fire!!')

        const { userId, isLoggedIn, favorites, cryptoToPresent, setMainMessage, toggleFavoritesState, updateFavoritesList } = this.props;

        if (isLoggedIn) {
            let newFavoritesList = []

            const filteredFavorites = favorites.filter(crypto => {
                return crypto.name.toLowerCase().includes(cryptoName.toLowerCase());
            })
    
            if (favorites === cryptoToPresent) {
                //check if user is on favorites page, i.e. cryptos being presented now is the same with favorites list
    
                if (filteredFavorites.length === 0) {
                    //if cryptos being presented now is not the favorites list, add the crypto to favorites list
                    newFavoritesList = [...favorites, { id:id.toString(), name:cryptoName }]
                    this.presentNewFavoritesDirectly(userId, { id:id, name:cryptoName }, newFavoritesList)
                }
    
                else {
                    //if cryptos being presented now is already on the favorites list, remove the crypto from favorites list
                    favorites.splice(favorites.findIndex(crypto => crypto.name === cryptoName), 1)
                    newFavoritesList = favorites;
                    this.presentNewFavoritesDirectly(userId, { id:id, name:cryptoName }, newFavoritesList)
                }
            }
            
    
            else {
                //this part executes if user is not on favorites page
    
                if (filteredFavorites.length === 0) {
                    //if cryptos being presented now is not the favorites list, add the crypto to favorites list
                    newFavoritesList = [...favorites, { id: id, name: cryptoName }]
                    toggleFavoritesState(cryptoName)
                    updateFavoritesList(userId, newFavoritesList)
                }
    
                else {
                    //if cryptos being presented now is already on the favorites list, remove the crypto from favorites list
                    favorites.splice(favorites.findIndex(crypto => crypto.name === cryptoName), 1)
                    newFavoritesList = favorites;
                    toggleFavoritesState(cryptoName)
                    updateFavoritesList(userId, newFavoritesList)
                }
            }
        } 

        else {
            setMainMessage('Please login to see and use favorites feature');
        }
        
        
    }


    presentNewFavoritesDirectly = (userId, newCrypto, newFavoritesList) => {
        //This function is for presenting directly all favorites list's graphs, since user is on favorites page
        const { toggleFavoritesState, updateFavoritesList, processSearchOrFavoritesResult, getCryptoDetailsToPresent } = this.props;

        toggleFavoritesState(newCrypto)
        updateFavoritesList(userId, newFavoritesList)
        processSearchOrFavoritesResult(['Your favorites list is updated', newFavoritesList]);
        getCryptoDetailsToPresent(newFavoritesList);

    }


    render() {

        const { id, cryptoName, isFavorite, lastPrice, prctChange, tickerColor, graphData } = this.props.details;

        return (
            <div className='card'>
                {graphData === [] ?
                    <div> <h3>Loading data...</h3> </div>
                    :
                    <div>
                        <Ticker cryptoName={cryptoName} lastPrice={lastPrice} tickerColor={tickerColor} prctChange={prctChange} />
                        <Graph graphData={graphData} />
                        <CustomButton className='custom-button' type="submit" onClick={() => this.toggleCryptoFavorites(id, cryptoName)} >
                            {isFavorite ? 'REMOVE FAVORITES' : 'ADD TO FAVORITES'}
                        </CustomButton>
                    </div>
                }
            </div>

        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Card);
