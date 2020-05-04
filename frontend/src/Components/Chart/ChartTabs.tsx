import React from 'react';
import { Tabs, Tab } from '@blueprintjs/core';
import { TimeRange } from '../../@generated/types';

interface ChartTabsProps {
    setRange: CallableFunction;
    selectedRange: TimeRange;
}

export const ChartTabs: React.FC<ChartTabsProps> = ({
    setRange,
    selectedRange,
}) => {
    const handleTimeRangeSelect = (timeRange: TimeRange) => {
        setRange(timeRange);
    };
    return (
        <Tabs id="navbar" selectedTabId={selectedRange}>
            <Tab
                onMouseDown={() => handleTimeRangeSelect(TimeRange.Day)}
                id={TimeRange.Day}
                title="1 day"
            />
            <Tab
                onMouseDown={() => handleTimeRangeSelect(TimeRange.FiveDays)}
                id={TimeRange.FiveDays}
                title="5 days"
            />
            <Tab
                onMouseDown={() => handleTimeRangeSelect(TimeRange.Month)}
                id={TimeRange.Month}
                title="1 month"
            />
            <Tab
                onMouseDown={() => handleTimeRangeSelect(TimeRange.ThreeMonth)}
                id={TimeRange.ThreeMonth}
                title="3 month"
            />
            <Tab
                onMouseDown={() => handleTimeRangeSelect(TimeRange.Year)}
                id={TimeRange.Year}
                title="1 year"
            />
            <Tab
                onMouseDown={() => handleTimeRangeSelect(TimeRange.FiveYears)}
                id={TimeRange.FiveYears}
                title="5 years"
            />
            <Tab
                onMouseDown={() => handleTimeRangeSelect(TimeRange.Ytd)}
                id={TimeRange.Ytd}
                title="YTD"
            />
            <Tab
                onMouseDown={() => handleTimeRangeSelect(TimeRange.Max)}
                id={TimeRange.Max}
                title="MAX"
            />
        </Tabs>
    );
};
