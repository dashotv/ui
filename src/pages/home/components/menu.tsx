import React, {FunctionComponent} from "react";
import {Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export type homeMenuProps = {

}
export const HomeMenu: FunctionComponent<homeMenuProps> = () =>
    <Menu secondary={true}>
        <Menu.Item as={NavLink} exact to="/">Upcoming</Menu.Item>
        <Menu.Item as={NavLink} to="/home/schedule">Schedule</Menu.Item>
        <Menu.Item as={NavLink} to="/home/recent">Recent</Menu.Item>
    </Menu>
