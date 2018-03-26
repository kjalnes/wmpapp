import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Redirect, Route } from 'react-router-dom';
import axios from 'axios';

import NoAccess from '../components/NoAccess';

class PrivateRoute extends Component {
    state = {
        isAuth: false
    }

    componentDidMount() {
        if (this.props.auth === true) {
            this.setState({isAuth: true});
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.auth === true) {
            this.setState({isAuth: true});
        }
    }

    render() {
        const Component = this.props.component;
        const { loading } = this.props;
        const props = this.props;
        let newProps = {};

        for(let prop in props) {
            if(prop !== 'component') {
                newProps[prop] = props[prop];
            }
        }

        if (!loading) {
            return (
                <Route {...newProps} render={ (newProps) => (
                    this.state.isAuth === true
                    ? <Component {...newProps} />
                    : <NoAccess />
                )}/>
            )
        }
        return null
    }
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
