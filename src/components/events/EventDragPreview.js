import React, { Component } from 'react'
import {connect} from 'react-redux'
import {eventSelector} from '../../ducks/events'

class EventDragPreview extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h3 style={{
                    width: '600px',
                    border: '1px solid black',
                    textAlign: 'center',
                    background: '#aaa'
                }}>
                    {this.props.event.title}
                </h3>
            </div>
        )
    }
}

export default connect((state, props) => ({
    event: eventSelector(state, props)
}))(EventDragPreview)