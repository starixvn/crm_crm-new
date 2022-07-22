import React from 'react';
import AppContainerWrapper, { AppContainer } from '../AppContainer';
import DataGrid from '../DataGrid';
import Filter from '../Filter';
import RemovePicAssignment from '../RemovePicAssignment';
import AssignPic from '../AssignPic';
import DefaultPic from '../DefaultPic';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            removePicAssignmentPopup: {},
            assignPicPopup: {},
            defaultPicPopup: {}
        };

        const store = mockStore(initialState);
        
        // Action
        const wrapper = shallow(<AppContainerWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.removePicAssignmentPopup).toEqual(
                initialState.removePicAssignmentPopup
            );
            expect(wrapper.props().children.props.assignPicPopup).toEqual(
                initialState.assignPicPopup
            );
            expect(wrapper.props().children.props.defaultPicPopup).toEqual(
                initialState.defaultPicPopup
            );
        });
    });

    describe('componentWillUnmount', () => {
        const props = {
            resetState: jest.fn()
        };

        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('has regular components', () => {
            // Arrange
            const props = {
                removePicAssignmentPopup: {},
                assignPicPopup: {},
                defaultPicPopup: {}
            };
            const state = {
                policy : 2,
                policyPicManagement: 1
            };

            // Action
            const appContainer = shallow(<AppContainer {...props} />);
            appContainer.instance().setState(state);
            // Assert
            expect(appContainer.find(Filter).length).toBe(1);
        });

        it('has RemovePicAssignment closing correctly', () => {
            // Arrange
            const props = {
                removePicAssignmentPopup: {
                    show: true
                },
                assignPicPopup: {},
                defaultPicPopup: {},
                isHost: true,
                isReadPicManagement: true,
                setRemovePicAssignmentPopup: jest.fn()
            };

            const state = {
                policy : 2,
                policyPicManagement: 1
            };

            // Action
            const appContainer = shallow(<AppContainer {...props} />);
            appContainer.instance().setState(state);

            // Action
            appContainer.find(RemovePicAssignment).simulate('close');

            // Assert
            expect(props.setRemovePicAssignmentPopup).toHaveBeenCalledWith({ show: false });
        });

        it('has AssignPic with correct props', () => {
            // Arrange
            const props = {
                removePicAssignmentPopup: {},
                assignPicPopup: {
                    show: true,
                    data: 'value'
                },
                defaultPicPopup: {},
                isHost: true,
                isReadPicManagement: true,
                setRemovePicAssignmentPopup: jest.fn()
            };

            // Action
            const state = {
                policy : 2,
                policyPicManagement: 1
            };

            // Action
            const appContainer = shallow(<AppContainer {...props} />);
            appContainer.instance().setState(state);

            // Assert
            expect(appContainer.find(AssignPic).props().data).toBe(props.assignPicPopup.data);
        });

        it('has DefaultPic', () => {
            // Arrange
            const props = {
                removePicAssignmentPopup: {},
                assignPicPopup: {},
                defaultPicPopup: {
                    show: true
                },
                isHost: true,
                isReadPicManagement: true,
                setRemovePicAssignmentPopup: jest.fn()
            };

            // Action
            const state = {
                policy : 2,
                policyPicManagement: 2
            };

            // Action
            const appContainer = shallow(<AppContainer {...props} />);
            appContainer.instance().setState(state);

            // Assert
            expect(appContainer.find(DefaultPic).length).toBe(1);
        });
    });
});