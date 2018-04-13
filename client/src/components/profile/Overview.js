import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import SelectClass from '../SelectClass';
import TeacherForm from './TeacherForm';
import { fetchClass } from '../../redux/actions/class';
import { getCountryName } from '../../utils/helpers';

class Overview extends Component {

    render() {
        const { firstName, lastName, email, phone } = this.props.teacher;
        const { classes } = this.props;
        let currentClass;

        if (classes && classes.list && classes.currentClass) {
            currentClass = classes.list[classes.currentClass];
        }

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}!</h3>
                    <p>You can edit your teacher profile and manage all your enrolled classes through this portal.</p>
                    <p>Select an existing class in the top right corner or register a new class. Use the left side menu to navigate.</p>
                    <p>Once a class has been matched with another class you will be able to communicate with the other class' teacher through Messages.</p>
                </div>
                <div>
                    [PROGRESS BAR FOR EXCHANGE]
                </div>
                <div>
                    [NEXT STEPS]
                </div>
                <div>

                    {currentClass !== undefined
                        ? <div>
                            <hr style={{margin: '30px 0'}}/>
                            <h3 style={{marginBottom: '18px'}}>Overview Class {currentClass.name}</h3>
                        </div>
                        : null
                    }
                    <div className='div-display-inline-block'>
                        <div className='class-overview'>
                            <div className=''>
                                <label>Teacher</label>
                                <label>Email</label>
                                <label>Phone</label>
                            </div>
                            <div className=''>
                                <span>{firstName} {lastName}</span>
                                <span>{email}</span>
                                <span>{phone}</span>
                            </div>
                        </div>
                    </div>

                    {currentClass !== undefined
                        ? <div className='div-display-inline-block'>
                            <div className='class-overview'>
                                <div className=''>
                                    <label>Class size</label>
                                    <label>Age group</label>
                                    <label>Registered for term</label>
                                </div>
                                <div className=''>
                                    <span>{currentClass.size}</span>
                                    { currentClass.age_group
                                        ? <span>{currentClass.age_group.label}</span>
                                        : <span>Not defined yet.</span>
                                    }
                                    { currentClass.term
                                        ? <span>{currentClass.term.label}</span>
                                        : <span>Not defined yet.</span>
                                    }
                                </div>
                            </div>
                        </div>
                        : null
                    }
                    {currentClass && currentClass.school && currentClass.school.name
                        ? <div className='div-display-inline-block'>
                            <div className='class-overview'>
                                <div className=''>
                                    <label>School Address</label>
                                </div>
                                <div className=''>
                                    <span>{currentClass.school.name}</span>
                                    <span>{currentClass.school.address1} {currentClass.school.address2}</span>
                                    <span>{currentClass.school.zip} {currentClass.school.city}</span>
                                    <span>{getCountryName(currentClass.school.country)}</span>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>
                <hr style={{margin: '30px 0'}}/>
                <div className='container-center-content'>
                    <Button
                        onClick={()=> console.log('click')}
                        size='massive'
                        className='add-class'>Register New Class</Button>
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { fetchClass })(Overview);



