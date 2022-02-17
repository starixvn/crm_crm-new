import React from 'react';
import Details from '../Details';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { shallow } from 'enzyme';

describe('Details', () => {
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
            const detail = shallow(<Details {...props} />);

            // Assert
            expect(detail.find(Form.Control)).toHaveLength(3);
        });

        it('handle change feedbackDate correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

            // Action
            detail.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('feedbackDate', 'value');
        });

        it('handle change resolutionDate correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

            // Action
            detail.find(DatePicker).at(1).simulate('change', 'value');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('resolutionDate', 'value');
        });

        it('handle change extensionIds correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

             // Action
            detail.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('extensionIds', 'selectedItemsKey');
        });

        it('handle change communicationToolIds correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

             // Action
            detail.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('communicationToolIds', 'selectedItemsKey');
        });

        it('handle errors communicationToolIds correctly', () => {
            // Arrange
            const errors = {
                communicationToolIds: 'errors'
            };

            const touched = {
                communicationToolIds: 'touched'
            };
            const propsClone = {...props, ...errors, ...touched};

             // Action
             const detail = shallow(<Details {...propsClone} />);

             // Assert
             expect(detail.find(MultipleSelect).at(1).props().isInvalid).toEqual(propsClone.errors.communicationToolIds);
        });

        it('handle change mainCategoryIds correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

             // Action
            detail.find(MultipleSelect).at(2).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.onChangeMainCategory).toHaveBeenCalled();
        });

        it('handle errors mainCategoryIds correctly', () => {
            // Arrange
            const errors = {
                mainCategoryIds: 'errors'
            };

            const touched = {
                mainCategoryIds: 'touched'
            };
            const propsClone = {...props, ...errors, ...touched};

             // Action
             const detail = shallow(<Details {...propsClone} />);

             // Assert
             expect(detail.find(MultipleSelect).at(2).props().isInvalid).toEqual(propsClone.errors.mainCategoryIds);
        });

        it('handle change subCategoryIds correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

             // Action
            detail.find(MultipleSelect).at(3).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('subCategoryIds', 'selectedItemsKey');
        });

        it('handle errors subCategoryIds correctly', () => {
            // Arrange
            const errors = {
                subCategoryIds: 'errors'
            };

            const touched = {
                subCategoryIds: 'touched'
            };
            const propsClone = {...props, ...errors, ...touched};

             // Action
             const detail = shallow(<Details {...propsClone} />);

             // Assert
             expect(detail.find(MultipleSelect).at(3).props().isInvalid).toEqual(propsClone.errors.subCategoryIds);
        });

        it('handle change product correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

             // Action
            detail.find(MultipleSelect).at(4).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.onChangeProduct).toHaveBeenCalled();
        });

        it('handle change subProduct correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

             // Action
            detail.find(MultipleSelect).at(5).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.onChangeSubProduct).toHaveBeenCalled();
        });

        it('handle change betType correctly', () => {
            // Arrange
            const detail = shallow(<Details {...props} />);

             // Action
            detail.find(MultipleSelect).at(6).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('betTypeIds','selectedItemsKey');
        });
    });
});