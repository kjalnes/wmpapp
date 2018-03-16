import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Signup from './Signup';
import Login from './Login';
import WMPHeader from './WMPHeader';
// import logo from '../../../assets/logos/WMPlogo_transparent.png';

class Main extends Component {
    state = {
        showForm: 'signup'
    }

    toggleForm = (form) => {
        this.setState({showForm: form})
    }

    render() {

        const { showForm } = this.state;

        return (
            <div className='page-container login-signup'>
                <div className='page-content'>
                    <WMPHeader />
                    <div>
                        <div className='login-signup-container'>
                            <div className='second'>
                                <div
                                    className='second-a'
                                    onClick={()=> this.toggleForm('signup')}>
                                    <h3 className={showForm === 'signup' ? 'dotted' : null }>SIGNUP</h3>
                                </div>
                                <div
                                    className='second-b'
                                    onClick={()=> this.toggleForm('login')}>
                                    <h3 className={showForm === 'login' ? 'dotted' : null }>LOGIN</h3>
                                </div>
                            </div>
                            <div className='first'>
                            { showForm === 'signup' ? <Signup /> : <Login /> }
                            </div>
                        </div>
                    </div>
                    {/*<div className='promo-container'>
                        <div className='promo-box'>
                            When I started to learn it, I couldn’t find blogs that show “Which part of React Redux to build first?” or how to generally approach building any React-Redux apps. So I went through several example and blogs and came out with general steps as to how to approach building most React Redux Apps.

                            Please Note: I am using “Mocks” to keep it at a high level and not get into the weeds. I am using the classic Todo list app as the basis for building ANY app. If your app has multiple screens, simply repeat the process for each screen.
                        </div>
                        <div className='promo-box'>
                            When I started to learn it, I couldn’t find blogs that show “Which part of React Redux to build first?” or how to generally approach building any React-Redux apps. So I went through several example and blogs and came out with general steps as to how to approach building most React Redux Apps.

                            Please Note: I am using “Mocks” to keep it at a high level and not get into the weeds. I am using the classic Todo list app as the basis for building ANY app. If your app has multiple screens, simply repeat the process for each screen.
                        </div>
                        <div className='promo-box'>
                            When I started to learn it, I couldn’t find blogs that show “Which part of React Redux to build first?” or how to generally approach building any React-Redux apps. So I went through several example and blogs and came out with general steps as to how to approach building most React Redux Apps.

                            Please Note: I am using “Mocks” to keep it at a high level and not get into the weeds. I am using the classic Todo list app as the basis for building ANY app. If your app has multiple screens, simply repeat the process for each screen.
                        </div>
                    </div>*/}
                </div>
            </div>
        )
    }
}

export default Main;
