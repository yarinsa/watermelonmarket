import { PricePoint } from '../../@generated/types';
import { ChartComponentProps } from 'react-chartjs-2';

export const dataFormatter = (
    chartData: PricePoint[],
    renderAverageLine: boolean | undefined
): ChartComponentProps['data'] => {
    const dataToReturn: ChartComponentProps['data'] = {};
    let close: number[] = [];
    let high: number[] = [];
    let open: number[] = [];
    let low: number[] = [];
    let labels: string[] = [];
    let lowest: number = chartData[0].close;
    let highest: number = 0;

    chartData.map((point: any) => {
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

    dataToReturn.labels = labels;
    dataToReturn.datasets = [
        {
            label: 'close',
            data: close,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#3dcc91',

            borderColor: ['#3dcc91'],
            borderWidth: 3,
        },
        {
            label: 'high',
            data: high,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#238C2C',
            borderColor: ['transparent'],
            borderWidth: 0,
        },
        {
            label: 'open',
            data: open,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#2965CC',
            borderColor: ['transparent'],
            borderWidth: 0,
        },
        {
            label: 'low',
            data: low,
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            fill: false,
            pointBorderColor: '#DB3737',
            borderColor: ['transparent'],
            borderWidth: 0,
        },
    ];
    if (renderAverageLine) {
        dataToReturn.datasets.push({
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
        });
    }
    return dataToReturn;
};
