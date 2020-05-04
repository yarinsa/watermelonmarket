import { ChartComponentProps } from 'react-chartjs-2';
import format from 'date-format';
import { PricePoint } from '../../@generated/types';

export const legend: ChartComponentProps['legend'] = {
    display: false,
};

export const options = (
    showTooltip: boolean | undefined
): ChartComponentProps['options'] => {
    return {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: showTooltip,
            mode: 'index',
            intersect: false,
            callbacks: {
                title: (item, data) => {
                    if (item[0].label) {
                        return format(
                            'dd-MM-yy hh:mm',
                            new Date(item[0].label)
                        );
                    }
                    return 'hey';
                },
            },
        },
        hover: {
            intersect: false,
            mode: 'index',
        },
        scales: {
            xAxes: [
                {
                    display: false,
                    gridLines: {
                        display: false,
                    },
                },
            ],
            yAxes: [
                {
                    display: false,
                    gridLines: {
                        display: false,
                        drawOnChartArea: true,
                    },
                },
            ],
        },
    };
};
