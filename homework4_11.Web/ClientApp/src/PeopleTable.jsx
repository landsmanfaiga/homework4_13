import React from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        isEdit: false,
        checkedPeople: []
    }
    onTextChange = e => {
        if (e.target.name == "firstName") {
            this.setState({ person: { ...this.state.person, firstName: e.target.value } });
        }
        else if (e.target.name == "lastName") {
            this.setState({ person: { ...this.state.person, lastName: e.target.value } });
        }
        else if (e.target.name == "age") {
            this.setState({ person: { ...this.state.person, age: e.target.value } });
        }
    }

    onAddClick = () => {
        const { firstName, lastName, age } = this.state.person;
        axios.post('/api/people/addperson', { firstName: firstName, lastName: lastName, age: age }).then(response => {
            this.loadPeople();
            this.setState({
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            })
        });
    }

    loadPeople = () => {
        axios.get('/api/people/getall').then(reponse => {
            this.setState({ people: reponse.data });
        });
    }

    onDeleteClick = (id) => {
        axios.post('/api/people/deleteperson', { Id: id }).then(response => {
            this.loadPeople();
        })
    }

    onUpdateClick = () => {
        axios.post('/api/people/editperson', this.state.person).then(response => {
            this.setState({
                isEdit: false,
                person: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    age: ''
                }            });
            this.loadPeople();
        });
    }
    onEditClick = (p) => {
        this.setState({ person: { ...this.state.person, id: p.id, firstName: p.firstName, lastName: p.lastName, age: p.age } });
        this.setState({ isEdit: true });
    }

    onCancelClick = () => {
        this.setState({ isEdit: false });
        this.setState({
            person: {
                id: '',
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }

    componentDidMount = () => {
        this.loadPeople();
    }
    onCheckAllClick = () => {
        const copy = [...this.state.people];
        const copy2 = copy.map(p => p.id);
        this.setState({ checkedPeople: copy2 });
    }
    onUncheckAllClick = () => {
        this.setState({ checkedPeople: [] });
    }

    onCheckClick = (id) => {
        if (this.state.checkedPeople.includes(id)) {
            const copy = [...this.state.checkedPeople];
            copy.filter(p => p == id);
            this.setState({ checkedPeople: copy });
        }
        else {
            const copy = [...this.state.checkedPeople];
            copy.push(id);
            this.setState({ checkedPeople: copy });
         
        }
    
    }

    onDeleteAllClick = () => {
        axios.post('/api/people/deletepeople', { people: this.state.checkedPeople }).then(response => {
            this.loadPeople();
        })
    }


    generateTable = () => {
        return this.state.people.map(p => <PersonRow key={p.id} person={p}
            onDeleteClick={() => this.onDeleteClick(p.id)}
            onEditClick={() => this.onEditClick(p)}
            checked={this.state.checkedPeople.includes(p.id)}
            onCheckClick={() => this.onCheckClick(p.id)}        />)
    }

    render() {
        const { firstName, lastName, age, id } = this.state.person;
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <PersonForm onTextChange={this.onTextChange}
                            onAddClick={this.onAddClick}
                            firstName={firstName}
                            lastName={lastName}
                            age={age}
                            isEdit={this.state.isEdit}
                            onUpdateClick={() => this.onUpdateClick()}
                            onCancelClick={() => this.onCancelClick()}                        >
                        </PersonForm>
                    </div>
            <div className = 'row'>
                <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <td>
                                        <button className="btn btn-danger w-75" onClick={this.onDeleteAllClick}>Delete All</button>
                                        <button className="btn btn-outline-danger w-75 mt-2" onClick={this.onCheckAllClick}>Check All</button>
                                        <button className="btn btn-outline-danger w-75 mt-2" onClick={this.onUncheckAllClick}>Uncheck All</button>
                            </td>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Age</td>
                        </tr>
                    </thead>

                    <tbody>
                        {this.generateTable()}
                    </tbody>

                    </table>
                    </div>
                </div>
            </>)
    }
}


export default PeopleTable
