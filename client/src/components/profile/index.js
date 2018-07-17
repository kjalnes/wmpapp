import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../MainHeader/Container';
import TabContent from './TabContent';
import Overview from './Overview'
import { ProfileMenu } from './ProfileMenu';
import { removeCurrentClass } from '../../redux/actions/class';


const Main = ({ ...props, classes: { currentClass } }) => {

        return (
            <div className='page-container profile'>
                <div className='page-content'>
                    <Header {...props} />
                    <div className='profile-column-container'>
                        <div className='profile-form-column'>
                            <ProfileMenu
                                currentClass={currentClass}
                                {...props}
                            />
                            <Route
                                path={`${props.match.path}/:tab`}
                                component={TabContent}
                                {...props} />
                        </div>
                    </div>
                </div>
            </div>
        );
}

const mapStateToProps = ({ classes }) => {
    return {
        classes
    };
};

export default connect(mapStateToProps, { removeCurrentClass })(Main);

