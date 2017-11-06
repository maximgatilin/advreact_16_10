import React, { Component } from 'react'
import PeopleList from '../people/PeopleList'
import EventList from '../events/EventTableVirtualized'
import SelectedEvents from '../events/SelectedEvents'
import Basket from '../basket/Basket'

class Admin extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <Basket/>
                <SelectedEvents/>
                <PeopleList/>
                <EventList/>
            </div>
        )
    }
}

export default Admin