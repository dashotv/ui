import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

type ToggleProps = {
    name: string,
    icon: string,
    value: boolean,
    onChange?: (e: any) => void,
}

type ToggleState = {
    active: boolean,
}

class Toggle extends Component<ToggleProps, ToggleState> {
    static defaultProps = { icon: "", value: false, onChange: null };
    state = { active: this.props.value};
    handleClick = (e: any) => {
        this.setState((prevState) => {
            if (this.props.onChange != null) {
                this.props.onChange({ target: {name: this.props.name, value: !prevState.active}})
            }
            return ({active: !prevState.active})
        });
    }

    render() {
        const { active } = this.state;
        const { icon } = this.props;

        return (
            <Button className="ui button" toggle active={active} icon={true} onClick={this.handleClick}>
                <i className={"icon " + icon }/>
            </Button>
        )
    }
}

export default Toggle
