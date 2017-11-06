import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {deleteEvent} from '../../ducks/events'
import {connect} from 'react-redux'

class Basket extends Component {
    render() {
        const {connectDropTarget} = this.props;
        const style = {
            width: '300px',
            height: '100px',
            border: '1px solid red',
            textAlign: 'center',
            lineHeight: '100px',
            color: 'red'
        };
        return connectDropTarget(<div style={style}>Basket</div>);
    }
}

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem();
        const {deleteEvent} = props;
        deleteEvent(item.id);
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
});

export default connect(
    null,
    {
        deleteEvent
    })
(DropTarget(['event'], spec, collect)(Basket))
