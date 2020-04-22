import React, {FunctionComponent} from "react";
import {Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export type releasesMenuProps = {

}

export const ReleasesMenu: FunctionComponent<releasesMenuProps> = () =>
    <Menu secondary={true}>
        <Menu.Item as={NavLink} exact to="/releases">
            Index
        </Menu.Item>
        <Menu.Item as={NavLink} to="/releases/search">Search</Menu.Item>
        <Menu.Item as={NavLink} to="/releases/torrents">Torrents</Menu.Item>
        <Menu.Item as={NavLink} to="/releases/nzbs">NZBs</Menu.Item>
    </Menu>
