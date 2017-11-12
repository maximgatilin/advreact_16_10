import React, {Component} from 'react'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import DragPreview from './PersonDragPreview'
import {Motion, spring, presets} from 'react-motion'


class PersonRow extends Component {
    static propTypes = {};

    componentDidMount() {
        this.props.connectPreview(getEmptyImage())
    }

    render() {
        const {style, person, connectDragSource, isDragging} = this.props
        return (
            <Motion
                defaultStyle={{opacity: 0}}
                style={{opacity: spring(1, presets.gentle/*{ stiffness: 150, damping: 1}*/)}}
            >
                {
                    interpolated => (
                        <div style={{...style, opacity: isDragging ? 0.1 : 1,...interpolated}}>
                            {connectDragSource(<h2>{person.firstName} {person.lastName}</h2>)}
                            <h3>{person.email}</h3>
                        </div>
                    )
                }
            </Motion>
        )
    }
}

const spec = {
    beginDrag(props) {
        return {
            id: props.person.uid,
            DragPreview
        }
    },

    endDrag() {
        console.log('---', 'endDrag')
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonRow)