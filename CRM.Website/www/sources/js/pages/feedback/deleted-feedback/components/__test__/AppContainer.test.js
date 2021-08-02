import React from 'react';
import { shallow } from 'enzyme';
import AppContainerWrapper, { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import EditFeedback from '../../../edit-customer-feedback/AppContainer';
import configureMockStore from 'redux-mock-store';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('component with redux', () => {
        // Arrange
        const mockStore = configureMockStore();
        const initialState = {
            settings: {
                customerTypes: [{ id: 1, name: 'Text' }]
            },
            gridParams: {
                username: ""
            },
            editFeedbackDialog: {
                show: false
            },
            viewRelatedCustomerDialog: {
                show: false
            }
        };

        const store = mockStore(initialState);

        // Act
        const wrapper = shallow(<AppContainerWrapper store={store} />);

        // Assert
        it('component render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('component has correct props', () => {
            expect(wrapper.props().children.props.settings).toEqual(initialState.settings);
            expect(wrapper.props().children.props.gridParams).toEqual(initialState.gridParams);
            expect(wrapper.props().children.props.editFeedbackDialog).toEqual(initialState.editFeedbackDialog);
            expect(wrapper.props().children.props.viewRelatedCustomerDialog).toEqual(initialState.viewRelatedCustomerDialog);
        });
    });

    describe('componentDidMount', () => {
        it('should call getAllSettings', () => {
            // Arrange
            const props = {
                getAllSettings: jest.fn()
            };

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getAllSettings).toHaveBeenCalled();
        });
    });

    describe('handleCloseEditFeedbackDialog', () => {
        it('should call exactly functions when close edit', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: true },
                setEditFeedbackDialog: jest.fn(),
                gridParams: {},
                getDeletedFeedback: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditFeedbackDialog(true);
           
            // Assert
            expect(props.setEditFeedbackDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getDeletedFeedback).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(EditFeedback).length).toBe(1);
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(1);
        });
    });

    describe('handleCloseViewRelatedCustomerDialog', () => {
        it('should call exactly param', () => {
            // Arrange
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            }
            const expectedParams = { show: false };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseViewRelatedCustomerDialog();

            // Assert
            expect(props.setViewRelatedCustomerDialog).toHaveBeenCalledWith(expectedParams);
        });
    });
});