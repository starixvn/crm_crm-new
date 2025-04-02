import React from 'react';
import FeedbackInfo from '../FeedbackInfo';
import {Form } from 'react-bootstrap';
import VerifyCustomer from '@jsroot/components/VerifyCustomer';
import AutoComplete from '@jsroot/components/AutoComplete';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';

describe('FeedbackInfo', () => {
    beforeAll(() => {
        window.currentClientTime = '7/28/2021 2:26:28 PM';
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);

    const props = {
        collapse:{
            description: true,
            solution: true
        },
        values: {hasRelated: true},
        fieldInput: {customerNameInput: ''},
        touched: {},
        errors: {},
        settings: {
            titles: [{id: 1, value: 'titles'}],
            licenseeTypes: [{id: 1, name: 'licenseeTypes'}],
            statuses: [{statusId: 1, name: 'statuses'}],
            responses: [{id: 1, value: 'responses'}],
            languages: [{languageId: 1, value: 'language'}],
            roles: [{id: 1, value: 'roles'}],
            countries: [{id: 1, value: 'countries'}]
        },
        handleChange: jest.fn(),
        setFieldValue: jest.fn(),
        onCollapseExpand: jest.fn(),
        extensionOptions: jest.fn(),
        communicationToolOptions: jest.fn(),
        mainCategoryOptions: jest.fn(),
        subCategoryOptions: jest.fn(),
        productOptions: jest.fn(),
        subProductOptions: jest.fn(),
        betTypeOptions: jest.fn(),
        relatedCustomers: [{ username: 'test'}],
        feedbackSubjectTemplates: jest.fn(),
        onChangeMainCategory: jest.fn(),
        onChangeProduct: jest.fn(),
        onChangeSubProduct: jest.fn(),
        onChangeCheckboxHasRelatedCustomer: jest.fn(),
        onPasteCustomer: jest.fn(),
        onVerifyRelatedCustomer: jest.fn(),
        onDeleteCustomer: jest.fn(),
        onGetFeedbackSubjectTemplates: jest.fn()
    };

    describe('Render', () => {
        it('render exactly form', () => {
            // Arrange

            // Action
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

            // Assert
            expect(feedbackInfo.find(Form.Control)).toHaveLength(5);
        });

        it('onClick call exactly function', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);


            // Action
            feedbackInfo.find(Form.Group).at(0).simulate('click');
            // Assert
            expect(props.onCollapseExpand).toHaveBeenCalledWith('details');
        });
        

        it('render component VerifyCustomer correctly', () => {
            // Arrange

            // Action
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

            // Assert
            expect(feedbackInfo.find(VerifyCustomer).length).toBe(1);
        });
        
        it('handle change subject correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

             // Action
            feedbackInfo.find(AutoComplete).simulate('change', {subject: 'subject'});

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('subject','subject');
        });

        it('handle onPasteCustomerHandler correctly', () => {
            // Arrange
            const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('event') } };
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

            const roleInfo = shallow(feedbackInfo.instance().renderRoleSection());

            // Action
            roleInfo.find(Form.Control).at(4).simulate('paste', event);

            // Assert
            expect(props.onPasteCustomer).toHaveBeenCalled();
        });
    });
});