import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/eos-eos-logo.svg'
import SearchBar from './searchbar.component'
import { connect } from 'react-redux'
import { setMainMessageACT, processSearchOrFavoritesResultACT, getCryptoDetailsToPresentACT, backToFrontPageACT } from '../../redux/crypto-data/crypto.data.actions';
import { signOutACT } from '../../redux/page-data/page.data.actions';
import { withRouter } from 'react-router-dom';

import './header.styles.scss'



const mapStateToProps = (state) => {
    return {
        mainMessage: state.cryptoDataRED.mainMessage,
        isLoggedIn: state.pageDataRED.isLoggedIn,
        displayName: state.pageDataRED.user.displayName,
        favorites: state.pageDataRED.user.favorites,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMainMessage: (text) => dispatch(setMainMessageACT(text)),
        signOut: () => dispatch(signOutACT()),
        backToFrontPage: () => dispatch(backToFrontPageACT()),
        processSearchOrFavoritesResult: (searchedData) => dispatch(processSearchOrFavoritesResultACT(searchedData)),
        getCryptoDetailsToPresent: (cryptoToPresent) => dispatch(getCryptoDetailsToPresentACT(cryptoToPresent)),
    }
}


class Header extends Component {

    signOutAndBackToFrontPageFunc = () => {
        this.props.signOut();
        this.props.backToFrontPage();
    }

    toFavorites = () => {
        if( this.props.isLoggedIn === false ) {
            this.props.setMainMessage('Please login to see and use favorites feature')
        }
        else {
            const dataToSend = ['Below is your favorites ', this.props.favorites];
            this.props.processSearchOrFavoritesResult(dataToSend);
            this.props.getCryptoDetailsToPresent(this.props.favorites);
        }
    }

    render() {
        
        return (
            <div className='header'>
                <div className='website'  >
                        <img
                            src={Logo}
                            className='logo'
                            alt="website logo"
                        />
                        <div className='the-name'>Cryptofreek</div>
                </div>


                <SearchBar />

                <div className='options'>

                    <div className='option1'>
                        {/* <Link className='option1-child' to='/about'> Contact </Link> */}
                        {
                            this.props.isLoggedIn ?
                                <div className='option1-child' onClick={ () => this.signOutAndBackToFrontPageFunc() }> Sign Out </div>
                                :
                                <Link className='option1-child' to='/signin'> Sign In </Link>
                        }
                    </div>
                    <div className='option2'>
                        <div className='option2-child'>
                            {
                                this.props.isLoggedIn ?
                                    <div> Hello, {this.props.displayName}! </div>
                                    :
                                    <div> Hi, please login! </div>
                            }
                        </div>
                        <div className='option2-child1' onClick={this.toFavorites}> See Your Favorites </div>

                    </div>
                </div>

            </div>
        )
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));