//import { processSearchOrFavoritesResultACT } from '../crypto-data/crypto.data.actions';


export const favoritesArrayToString = (anyFavoritesArray) => {
    let readyString = '';
    anyFavoritesArray.map(aCrypto => {
        const cryptoInString = aCrypto.id + '.' + aCrypto.name + '|'
        return readyString = readyString + cryptoInString;
    })
    return readyString;
}

export const favoritesStringToArray = (anyFavoritesString) => {
    if (anyFavoritesString === '' || anyFavoritesString === null) {
        return []
    }
    else {
        const splitSpace = anyFavoritesString.toString().split('|');
        const readyArray = [];
        splitSpace.map(aCrypto => {
            const splitDot = aCrypto.split('.');
            const aCryptoObj = {id:splitDot[0], name:splitDot[1]};
            return readyArray.push(aCryptoObj);
        })
        readyArray.splice(readyArray.findIndex(aCrypto => aCrypto.id === ""), 1)
        return readyArray;
    }
}

