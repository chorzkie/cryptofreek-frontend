//import stateStore from '../../redux/store'


export const getCryptoList = (anyResponse) => {
    const getCrypto = anyResponse.Data.map(eachCrypto => {
        const aCrypto = { id: eachCrypto.CoinInfo.Id, name: eachCrypto.CoinInfo.Name }
        return aCrypto
    })
    return getCrypto;
}

export const getAllCryptoList = (anyResponse) => {
    const allCryptoList = Object.keys(anyResponse.Data).map(key => ({
        name: key,
        id: anyResponse.Data[key].id,
    }))
    return allCryptoList
}



export const prepareCryptoDetailData = (dataArray) => {
    const newPrctChange = prctCount(dataArray[0], dataArray[1]);
    const newData = dataValue(dataArray[1]);
    const newBackgroundColor = bckgrndColor(dataArray[0], dataArray[1]);
    const newLabel = dataLabel();

    const newDatasets = [{
        label: '',
        backgroundColor: newBackgroundColor,
        data: newData,
    }];

    const newGraphData = {
        labels: newLabel,
        datasets: newDatasets
    };

    const newIsFavorite = checkIfFavorited([ dataArray[3],dataArray[4] ]);

    const stateReadyForGraph = ({
        id: dataArray[2],
        cryptoName: dataArray[3],
        isFavorite: newIsFavorite,
        lastPrice: dataArray[0].Data.Data[1].close,
        prctChange: newPrctChange,
        tickerColor: newBackgroundColor,
        graphData: newGraphData
    })

    return stateReadyForGraph;
}


const checkIfFavorited = (cryptoToCheck) => {
    let checkResult = cryptoToCheck[1].filter(crypto => {
        return crypto.name.toLowerCase().includes(cryptoToCheck[0].toLowerCase());
    })
    if (checkResult.length === 0) {
        return false
    }
    else { return true }
}

const dataLabel = () => {
    let newLabel = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 24; i !== 0; i--) {
        const d = new Date()
        let labeltoPush = months[d.getMonth()] + ' ' + d.getDate() + ', ' + (d.getHours() < i ? d.getHours() + 24 - i : d.getHours() - i) + ' hrs'
        newLabel.push(labeltoPush)
    }

    return newLabel;
}

const dataValue = (data24hr) => {
    const valueOnly = data24hr.Data.Data.map(hourlyData => {
        return hourlyData.close
    })

    return valueOnly;
}

const bckgrndColor = (data1min, data24hr) => {
    if (data1min.Data.Data[1].close < data24hr.Data.Data[0].close) {
        return "#FF7B70"
    }
    else { return "#80FF9C" }
}

const prctCount = (data1min, data24hr) => {
    const prctChange = (data1min.Data.Data[1].close - data24hr.Data.Data[0].close) / data24hr.Data.Data[0].close * 100;
    if (Object.is(prctChange,NaN)) { return 0 }
    else if (Object.is(prctChange,Infinity)) { return (data1min.Data.Data[1].close - data24hr.Data.Data[0].close) / 1 * 100 }    
    else { return prctChange.toFixed(2) }
}