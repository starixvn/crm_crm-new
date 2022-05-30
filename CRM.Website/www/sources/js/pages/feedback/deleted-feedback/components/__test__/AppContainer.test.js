import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import EditFeedback from '../../../edit-customer-feedback/AppContainer';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Button } from 'react-bootstrap';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
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
                editFeedbackDialog: { show: true, feedbackId: 1234 }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should pass props correctly in EditFeedback', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: true, feedbackId: 1234 }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container.find(EditFeedback).props().feedbackId).toBe(1234);
        });

        it('SweetModalDialog render correctly', () => {
            // Arrange
            const props = {
                viewRelatedCustomerDialog: { show: true, relatedCustomers: 'Are you sure you want to'}
            }

            const container = shallow(<AppContainer {...props}/>).instance();
            container.handleCloseViewRelatedCustomerDialog = jest.fn();

            const expectedContents = <div>Are you sure you want to</div>;
            const expectedButton = [
                <Button variant="primary" size="sm" onClick={container.handleCloseViewRelatedCustomerDialog}>
                    {LangHelper.getResource('Close')}
                </Button>
            ];

            // Act
            const render = shallow(container.render());

            // Assert
            expect(render.find(SweetModalDialog)).toHaveLength(1);
            expect(render.find(SweetModalDialog).props().contents).toEqual(expectedContents);
            expect(render.find(SweetModalDialog).props().buttons).toEqual(expectedButton);
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