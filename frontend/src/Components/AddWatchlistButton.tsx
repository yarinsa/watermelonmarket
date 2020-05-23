import React from 'react';
import { Popover, Button, MenuItem, Menu } from '@blueprintjs/core';
import { Interval } from '../@generated/types';

interface AddWatchlstButtonProps {}

export const AddWatchListButton: React.FC<AddWatchlstButtonProps> = ({}) => {
    const Watchlists = (
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
        </Menu>
    );

    return (
        <Popover content={Watchlists} position="bottom">
            <Button
                icon="add"
                text={'Add To watchlist'}
                intent="primary"
                outlined
            />
        </Popover>
    );
};
