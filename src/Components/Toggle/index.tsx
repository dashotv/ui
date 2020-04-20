import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

type ToggleProps = {
    icon: string,
    value: boolean,
}

type ToggleState = {
    active: boolean,
}

class Toggle extends Component<ToggleProps, ToggleState> {
    static defaultProps = { icon: "", value: false };
    state = { active: this.props.value};
    handleClick = () =>
        this.setState((prevState) => ({ active: !prevState.active }));

    render() {
        const { active } = this.state;
        const { icon } = this.props;

        return (
            <Button toggle active={active} icon={true} onClick={this.handleClick}>
                <i className={"icon " + icon }/>
            </Button>
        )
    }
}

export default Toggle
