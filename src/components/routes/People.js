import React, {Component} from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addPeopleEntry} from '../../ducks/people'
import AddPeople from '../people/Add';

class PeoplePage extends Component {
    render() {
        const peopleList = this.props.people.toArray();
        return (
            <div>
                <h2>People</h2>
                <ul>
                    {peopleList.map((person, index) => {
                        return <li key={index}>
                            {person.firstName} {person.lastName}
                        </li>
                    })}
                </ul>
                <NavLink to='/people/add' activeStyle={{color: 'red'}}>add</NavLink>
                <Route path='/people/add' render={() => <AddPeople onSubmit={this.handleAdd}/>}/>
            </div>
        )
    }

    handleAdd = (entry) => this.props.addPeopleEntry(entry)
}

export default connect(state => ({
    people: state.people.list
}), {addPeopleEntry})(PeoplePage)