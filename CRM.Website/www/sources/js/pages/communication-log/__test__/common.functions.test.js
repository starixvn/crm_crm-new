import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import * as commonFunction from '../common.functions';
import * as shareScripts from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Button, Form, Modal, Row, Col, Collapse } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import { ActionCreators } from '../actions';
import { shallow } from 'enzyme';

describe('commonFunctions', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const settings = {
        bettypeNA: {id: 0, name: 'N/A'},
        bettypes: [{id: 3, value: 'N/A', parentId: 2}],
        communicationToolNA: 'null',
        communicationTools:[{id: 0, name: 'N/A'}],
        countries:[{id: 0, name: 'N/A'}],
        extensionNA: {id: 0, value: 'N/A'},
        extensions:[{id: 0, value: 'N/A'}],
        languages: [{languageId: 0, name: 'N/A'}],
        licenseeTypes:[{id: 0, name: 'N/A'}],
        mainCategories: [{mainCategoryID: 1, name: 'settingName'}, {mainCategoryID: 2, name: 'settingName'}],
        productNA:{id: 0, value: 'N/A'},
        products: [{id: 0, value: 'N/A'}],
        responses: [{id: 0, value: 'N/A'}],
        roles: [{id: 0, value: 'N/A'}],
        sites: [{id: 0, name: 'N/A', childSites:[{id: 1, value: 'child'}]}],
        statusId: [{id: 0, name: 'N/A'}],
        subCategories: [{subCategoryId: 1, mainCategoryID: 1}],
        subProductNA: {id: 0, value: 'N/A'},
        subProducts: [{id: 2, value: 'N/A', parentId: 1}]
    };

    describe('validateFormik', () => {
        it('return expected errors when values are invalid', () => {
            // Arrange
            const values = {
                customerNameInput: 'test',
                communicationToolIds: [],
                mainCategoryIds: '',
                subCategoryIds: '',
                languageId: 0,
                solution: '',
                remark: '',
                subject: '',
                review: null,
                isReviewed: true
            };
            const expected = {
                customerNameInput: 'You must verify the username before saving this feedback.',
                communicationToolIds: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Communication')),
                mainCategoryIds: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('MainCategory')),
                subCategoryIds: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory')),
                languageId: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Language')),
                subject: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Subject')),
                remark: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Remark')),
                solution: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Solution')),
                review: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Review'))
            };

            // Act
            const errors = commonFunction.validateFormik(values, settings);

            // Assert
            expect(errors).toEqual(expected);
        });

        it('return expected errors when invalid category, start time and end time params', () => {
            // Arrange
            const values = {
                communicationToolIds: [{id: 1}],
                customerNameInput: '',
                mainCategoryIds: '1, 2',
                subCategoryIds: '1',
                startTime: '2001-12-20T00:00:00-06:00',
                endTime: '2001-12-20T00:00:00-05:00'
            };
            const expected = {
                mainCategoryIds: LangHelper.formatString(LangHelper.getResource('InvalidCategoryField'), 'settingName'),
                startTime: LangHelper.formatString(
                    LangHelper.getResource('FieldLessThanOrEqualTo'),
                    LangHelper.getResource('StartTime'),
                    LangHelper.getResource('EndTime'))
            };

            // Act
            const errors = commonFunction.validateFormik(values, settings);

            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('handleChangeMainCategory', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const values = {subject: 'subject', subCategory: '1,2'};
            const setFieldValue = jest.fn();
            const setStateSubcategory = jest.fn();
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');
            shareScripts.getSubCategories = jest.fn(()=> [1]);

            // Act
            commonFunction.handleChangeMainCategory(setFieldValue, '1,2', 'currentItem', values, settings, setStateSubcategory);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('mainCategoryIds', '1,2');
            expect(setFieldValue).toHaveBeenCalledWith('subject', 'tempSubject');
            expect(setStateSubcategory).toHaveBeenCalledWith([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const values = {subject: 'subject', subCategory: '1,2'};
            const setFieldValue = jest.fn();
            const setStateSubcategory = jest.fn();
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');

            // Act
            commonFunction.handleChangeMainCategory(setFieldValue, '', 'currentItem', values, settings, setStateSubcategory);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('mainCategoryIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('subject', 'tempSubject');
            expect(setFieldValue).toHaveBeenCalledWith('subCategoryIds', '');
            expect(setStateSubcategory).toHaveBeenCalledWith([]);
        });
    });

    describe('handleChangeProduct', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const setStateSubProduct = jest.fn();
            const setStateBetType = jest.fn();
            shareScripts.getSubProducts = jest.fn(()=> [1]);

            // Act
            commonFunction.handleChangeProduct(setFieldValue, '1,2', '1', settings, setStateSubProduct, setStateBetType);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '1,2');
            expect(setStateSubProduct).toHaveBeenCalledWith([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const setStateSubProduct = jest.fn();
            const setStateBetType = jest.fn();

            // Act
            commonFunction.handleChangeProduct(setFieldValue, '', '1', settings, setStateSubProduct, setStateBetType);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');
            expect(setStateSubProduct).toHaveBeenCalledWith([]);
            expect(setStateBetType).toHaveBeenCalledWith([]);
        });
    });

    describe('handleChangeSubProduct', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const setStateBetType = jest.fn();
            shareScripts.getBetTypes = jest.fn(()=> [1]);

            // Act
            commonFunction.handleChangeSubProduct(setFieldValue, '1,2', '1', settings, setStateBetType);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '1,2');
            expect(setStateBetType).toHaveBeenCalledWith([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const setStateBetType = jest.fn();

            // Act
            commonFunction.handleChangeSubProduct(setFieldValue, '', '1', settings, setStateBetType);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');
            expect(setStateBetType).toHaveBeenCalledWith([]);
        });
    });

    describe('handlePasteCustomer', () => {
        it('should do as expected', () => {
            // Arrange
            const customerNameInput = 'sa';
            const setFieldValue = jest.fn();
            const event = { clipboardData: { getData: jest.fn(() => 'test1, test2') } };

            // Act
            commonFunction.handlePasteCustomer(setFieldValue, event, customerNameInput);
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('customerNameInput', 'sa,test1,test2');
        });
    });

    describe('isValidCustomer', () => {
        it('should valid customer', () => {
            // Arrange
            const customer = 'sa';

            // Act
            const validCustomer = commonFunction.isValidCustomer(customer);

            // Assert
            expect(validCustomer).toBe(true);
        });

        it('should invalid customer', () => {
            // Arrange
            const customer = 'sa123465798123456789123456789123468789132465789132465789132';

            // Act
            const validCustomer = commonFunction.isValidCustomer(customer);

            // Assert
            expect(validCustomer).toBe(false);
        });
    });

    describe('handleGetFeedbackSubjectTemplates', () => {
        it('should call correct function when search text length >= 2', () => {
            // Arrange
            const searchText = 'search text';
            ActionCreators.getFeedbackSubjectTemplates = jest.fn();

            // Act
            commonFunction.handleGetFeedbackSubjectTemplates(searchText);
            jest.runAllTimers();

            // Assert
            expect(ActionCreators.getFeedbackSubjectTemplates).toHaveBeenCalledWith(searchText);
        });

        it('should call correct function when search text length < 2', () => {
            // Arrange
            const searchText = 's';
            ActionCreators.setFeedbackSubjectTemplates = jest.fn();

            // Act
            commonFunction.handleGetFeedbackSubjectTemplates(searchText);
            jest.runAllTimers();

            // Assert
            expect(ActionCreators.setFeedbackSubjectTemplates).toHaveBeenCalledWith([]);
        });
    });

    describe('renderCollapse', () => {
        const params = {
            values: {},
            errors: {},
            touched: {},
            collapse: {},
            handleChange: jest.fn(),
            setFieldValue: jest.fn(),
            handleCollapseExpand: jest.fn()
        };

        it('handleChange should call exact function when handleCollapse', () => {
            // Arrange

            // Act
            const container = commonFunction.renderCollapse(params.values, params.errors, params.touched, params.collapse, params.setFieldValue, params.setFieldValue, params.handleChange, params.handleCollapseExpand);
            const renderEdit = shallow(container);
            renderEdit.find(Form.Group).at(0).simulate('click');
            renderEdit.find(Form.Group).at(1).simulate('click');
            renderEdit.find(Form.Group).at(2).simulate('click');
        });

        it('handleChange should call exact function when remark render', () => {
            // Arrange

            // Act
            const container = commonFunction.renderCollapse(params.values, params.errors, params.touched, params.collapse, params.setFieldValue, params.setFieldValue, params.handleChange, params.handleCollapseExpand);
            const renderEdit = shallow(container);
            renderEdit.find(CkEditor).at(0).simulate('change', 'value');
            
            // Assert
            expect(params.setFieldValue).toHaveBeenCalledWith('remark','value');
        });

        it('handleChange should call exact function when solution render', () => {
            // Arrange

            // Act
            const container = commonFunction.renderCollapse(params.values, params.errors, params.touched, params.collapse, params.setFieldValue, params.setFieldValue, params.handleChange, params.handleCollapseExpand);
            const renderEdit = shallow(container);
            renderEdit.find(CkEditor).at(1).simulate('change', 'value');
            
            // Assert
            expect(params.setFieldValue).toHaveBeenCalledWith('solution','value');
        });

        it('handleChange should call exact function when isReviewed render check', () => {
            // Arrange
            const event = { 
                target: {checked: true}
            }; 
            // Act
            const container = commonFunction.renderCollapse(params.values, params.errors, params.touched, params.collapse, params.setFieldValue, params.setFieldValue, params.handleChange, params.handleCollapseExpand);
            const renderEdit = shallow(container);
            renderEdit.find('input').at(0).simulate('change', event);
            
            // Assert
            expect(params.setFieldValue).toHaveBeenCalledWith('isReviewed', true);
        });

        it('handleChange should call exact function when review render', () => {
            // Arrange
            const event = { 
                target: {checked: true}
            }; 
            // Act
            const container = commonFunction.renderCollapse(params.values, params.errors, params.touched, params.collapse, params.setFieldValue, params.setFieldValue, params.handleChange, params.handleCollapseExpand);
            const renderEdit = shallow(container);
            renderEdit.find(CkEditor).at(2).simulate('change', 'value');
            
            // Assert
            expect(params.setFieldValue).toHaveBeenCalledWith('review', 'value');
        });
    });
});