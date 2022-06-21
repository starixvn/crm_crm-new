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

    describe('render', () => {
        it('has regular components', () => {
            // Arrange
            const props = {
                removePicAssignmentPopup: {},
                assignPicPopup: {},
                defaultPicPopup: {},
                isHost: true,
                isReadPicManagement: true
            };

            // Action
            const appContainer = shallow(<AppContainer {...props} />);

            // Assert
            expect(appContainer.find(Filter).length).toBe(1);
            expect(appContainer.find(DataGrid).props().isHost).toBe(props.isHost);
            expect(appContainer.find(DataGrid).props().isReadPicManagement).toBe(props.isReadPicManagement);

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

            const appContainer = shallow(<AppContainer {...props} />);

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
            const appContainer = shallow(<AppContainer {...props} />);

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
            const appContainer = shallow(<AppContainer {...props} />);

            // Assert
            expect(appContainer.find(DefaultPic).length).toBe(1);
        });
    });
});