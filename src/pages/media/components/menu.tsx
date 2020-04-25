import React, {FunctionComponent} from "react";
import {Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export type mediaMenuProps = {

}
export const MediaMenu: FunctionComponent<mediaMenuProps> = () =>
    <Menu secondary={true}>
        <Menu.Item as={NavLink} exact to="/media">Index</Menu.Item>
        <Menu.Item as={NavLink} to="/media/search">Search</Menu.Item>
        <Menu.Item as={NavLink} to="/media/series">Series</Menu.Item>
        <Menu.Item as={NavLink} to="/media/movies">Movies</Menu.Item>
    </Menu>
