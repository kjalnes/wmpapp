import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';

import { createClassUser } from '../redux/actions/class';

class Signup extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    onChange = (ev, key) => this.setState({[key]: ev.target.value})

    onSubmit = () => {
        const data = this.state;
        this.props.createClassUser(data);
    }

    render() {
        return (
            <div className='signup-form'>
                <div className='form-row'>
                    <input
                        placeholder='FIRST NAME'
                        name='firstname'
                        onChange={(ev)=>this.onChange(ev, 'lastname')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='LAST NAME'
                        name='lastname'
                        onChange={(ev) => this.onChange(ev, 'lastname')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='EMAIL'
                        name='email'
                        onChange={(ev) => this.onChange(ev, 'email')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='PASSWORD'
                        name='password'
                        type='password'
                        onChange={(ev) => this.onChange(ev, 'password')}/>
                </div>
                <div className='form-row'>
                    <input
                        placeholder='CONFIRM PASSWORD'
                        name='confirmpassword'
                        type='password'
                        onChange={(ev) => this.onChange(ev, 'confirmpassword')}/>
                </div>
                <Button
                    className='signup-login-btn'
                    size='large'
                    onClick={()=>this.onSubmit()}>SIGN UP</Button>
            </div>
        )
    }
}


export default connect(null, { createClassUser })(Signup);
