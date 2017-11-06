import React, { Component } from 'react'

class EventRow extends Component {
    static propTypes = {

    };

    componentDidMount() {
        // this.props.connectPreview(getEmptyImage())
    }

    handleClick = (data) => () => {
        this.props.onRowClick(data.uid);
    };

    render() {
        const cellStyle = {
            display: 'inline-block',
            marginRight: '15px',
            width: '200px'
        };
        const {style, person} = this.props;
        return <div style={style} onClick={this.handleClick(person)}>
            <span style={cellStyle}>{person.title}</span>
            <span style={cellStyle}>{person.where}</span>
            <span style={cellStyle}>{person.when}</span>
        </div>
    }
}

export default EventRow