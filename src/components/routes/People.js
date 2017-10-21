import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addPeopleEntry} from '../../ducks/people'
import AddPeople from '../people/Add';

class PeoplePage extends Component {
    render() {
        return (
            <div>
              <h2>People</h2>
              <NavLink to = '/people/add' activeStyle = {{color: 'red'}}>add</NavLink>
              <Route path = '/people/add' render = {() => <AddPeople onSubmit = {this.handleAdd}/>}/>
            </div>
        )
    }

    handleAdd = (entry) => this.props.addPeopleEntry(entry)
}

export default connect(null, { addPeopleEntry })(PeoplePage)