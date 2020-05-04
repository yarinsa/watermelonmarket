import getSymbolFromCurrency from 'currency-symbol-map';

//Formatting

export const numberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const fixedPrice = (price: string) => {
    return parseFloat(price).toFixed(3);
};

export const fixedPercentage = (percentage: string) => {
    const percentageNumber = percentage.substring(0, percentage.length - 1);
    return parseFloat(percentageNumber).toFixed(3);
};

export const addCurrencySymbol = (number: number, currencyCode: string) => {
    if (number > 0) {
        return getSymbolFromCurrency(currencyCode) + number;
    } else {
        return '-' + getSymbolFromCurrency(currencyCode) + Math.abs(number);
    }
};

export const numberWithLetter = (number: number) => {
    if (isNaN(number)) return number;

    if (number < 9999) {
        return number;
    }

    if (number < 1000000) {
        return Math.round(number / 1000) + 'K';
    }
    if (number < 10000000) {
        return (number / 1000000).toFixed(2) + 'M';
    }

    if (number < 1000000000) {
        return Math.round(number / 1000000) + 'M';
    }

    if (number < 1000000000000) {
        return Math.round(number / 1000000000) + 'B';
    }

    return '1T+';
};

export const formatDataToChart = (chartData: any) => {
    let close: number[] = [];
    let high: number[] = [];
    let open: number[] = [];
    let low: number[] = [];
    let labels: string[] = [];
    let lowest: number = chartData[0].close;
    let highest: number = 0;
    const newData = chartData.map((point: any) => {
        if (point.close === 0) {
            return null;
        } else {
            if (point.close < lowest) {
                lowest = point.close;
            }
            if (point.close > highest) {
                highest = point.close;
            }
            labels.push(point.time);
            close.push(point.close.toFixed(2));
            open.push(point.open.toFixed(2));
            high.push(point.high.toFixed(2));
            low.push(point.low.toFixed(2));
        }
    });
    const avg = new Array(chartData.length).fill(
        ((lowest + highest) / 2).toFixed(2)
    );

    // let myRed: Array<number | null> = [];
    // let myGreen: Array<number | null> = [];
    // let color: Array<string> = [];
    // close.map((value, index) => {
    //     if (value > avg[0]) {
    //         myRed.push(null);
    //         myGreen.push(value);
    //         color.push('green');
    //     } else {
    //         myRed.push(value);
    //         myGreen.push(null);
    //         color.push('red');
    //     }
    // });

    const datasets = [
        {
            label: 'close',
            data: close,
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#3dcc91',

            borderColor: ['#3dcc91'],
            borderWidth: 3,
        },
        {
            label: 'high',
            data: high,
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#238C2C',
            borderColor: ['transparent'],
            borderWidth: 0,
        },
        {
            label: 'open',
            data: open,
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#2965CC',
            borderColor: ['transparent'],
            borderWidth: 0,
        },
        {
            label: 'low',
            data: low,
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#DB3737',
            borderColor: ['transparent'],
            borderWidth: 0,
        },
        {
            label: 'Chart Avg.',
            data: avg,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#cfcfcf',
            borderColor: ['#CED9E0'],
            borderWidth: 1,
            hideInLegendAndTooltip: true,
            borderDash: [10],
        },
    ];
    return {
        labels: labels,
        datasets: datasets,
    };
};
export const formatDataToOldChart = (chartData: any) => {
    return chartData.map((point: any) => {
        if (point.close === 0) {
            return null;
        } else {
            return {
                time: point.time,
                close: point.close,
                minimizer: point.close / 10,
                maximizer: point.close * 2,
            };
        }
    });
};
