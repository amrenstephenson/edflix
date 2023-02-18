import { Component } from 'react';

const defaultColor = '#f00';
const hoverColor = '#d00';
const clickColor = '#b00';

export class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {color: defaultColor}
    }

    render() {
        return (
            <button
                style={{ backgroundColor: this.state.color, border: 0, borderRadius: 7, padding: 7, color: 'white', fontWeight: 500, ...this.props.style }}
                onMouseDown={() => this.setState({color: clickColor})}
                onMouseUp={() => this.setState({color: hoverColor})}
                onMouseEnter={() => this.setState({color: hoverColor})}
                onMouseLeave={() => this.setState({color: defaultColor})}
            >
                {this.props.children}
            </button>
        );
    }
}
