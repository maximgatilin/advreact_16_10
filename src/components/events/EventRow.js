import React, { Component } from 'react'
import {DragSource} from 'react-dnd'

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
        const {style, event, connectDragSource} = this.props;
        return connectDragSource(<div style={style} onClick={this.handleClick(event)}>
            <span style={cellStyle}>{event.title}</span>
            <span style={cellStyle}>{event.where}</span>
            <span style={cellStyle}>{event.when}</span>
        </div>)
    }
}

const spec = {
    beginDrag(props) {
        return {
            id: props.event.uid
        }
    },

    endDrag() {
        console.log('---', 'endDrag')
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
});

export default DragSource('event', spec, collect)(EventRow)