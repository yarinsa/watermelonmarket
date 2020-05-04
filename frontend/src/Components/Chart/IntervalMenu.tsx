import React from 'react';
import { Interval } from '../../@generated/types';
import { Popover, Button, Menu, MenuItem } from '@blueprintjs/core';

interface IntervalMenuProps {
    setInterval: CallableFunction;
    selectedInterval: Interval;
}

export const IntervalMenu: React.FC<IntervalMenuProps> = ({
    setInterval,
    selectedInterval,
}) => {
    const IntervalMenuItems = (
        <Menu>
            <MenuItem
                onClick={() => setInterval(Interval.FiveMinutes)}
                text="Five Minutes"
            />
            <MenuItem
                onClick={() => setInterval(Interval.FifteenMinutes)}
                text="Fifteen Minutes"
            />
            <MenuItem
                onClick={() => setInterval(Interval.ThirtyMinutes)}
                text="Thirty Minutes"
            />
            <MenuItem
                onClick={() => setInterval(Interval.Hour)}
                text="One Hour"
            />
            <MenuItem
                onClick={() => setInterval(Interval.Day)}
                text="One Day"
            />
            <MenuItem
                onClick={() => setInterval(Interval.Week)}
                text="One Week"
            />
            <MenuItem
                onClick={() => setInterval(Interval.Month)}
                text="One Month"
            />
            <MenuItem
                onClick={() => setInterval(Interval.ThreeMonth)}
                text="Three Month"
            />
        </Menu>
    );
    return (
        <Popover content={IntervalMenuItems} position="bottom">
            <Button
                icon="series-configuration"
                text={'Time Interval: ' + selectedInterval}
                minimal
            />
        </Popover>
    );
};
