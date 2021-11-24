import React from 'react';
import FeedbackInfo from '../FeedbackInfo';
import { Col, Form, Row, Collapse } from 'react-bootstrap';
import VerifyCustomer from '@jsroot/components/verifyCustomer';
import AutoComplete from '@jsroot/components/AutoComplete';
import CkEditor from '@jsroot/components/ckeditor/index';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';
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
            expect(feedbackInfo.find(Form.Control)).toHaveLength(8);
        });

        it('onClick call exactly function', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);


            // Action
            feedbackInfo.find(Form.Group).at(0).simulate('click');
            // Assert
            expect(props.onCollapseExpand).toHaveBeenCalledWith('details');
        });

        it('handle change feedbackDate correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

            // Action
            feedbackInfo.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('feedbackDate', 'value');
        });

        it('handle change resolutionDate correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

            // Action
            feedbackInfo.find(DatePicker).at(1).simulate('change', 'value');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('resolutionDate', 'value');
        });

        it('handle change extensionIds correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

             // Action
            feedbackInfo.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('extensionIds', 'selectedItemsKey');
        });

        it('handle change communicationToolIds correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

             // Action
            feedbackInfo.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');

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
             const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);

             // Assert
             expect(feedbackInfo.find(MultipleSelect).at(1).props().isInvalid).toEqual(propsClone.errors.communicationToolIds);
        });

        it('handle change mainCategoryIds correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

             // Action
            feedbackInfo.find(MultipleSelect).at(2).simulate('change', 'currentItem', 'selectedItemsKey');

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
             const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);

             // Assert
             expect(feedbackInfo.find(MultipleSelect).at(2).props().isInvalid).toEqual(propsClone.errors.mainCategoryIds);
        });

        it('handle change subCategoryIds correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

             // Action
            feedbackInfo.find(MultipleSelect).at(3).simulate('change', 'currentItem', 'selectedItemsKey');

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
             const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);

             // Assert
             expect(feedbackInfo.find(MultipleSelect).at(3).props().isInvalid).toEqual(propsClone.errors.subCategoryIds);
        });

        it('handle change product correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

             // Action
            feedbackInfo.find(MultipleSelect).at(4).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.onChangeProduct).toHaveBeenCalled();
        });

        it('handle change subProduct correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

             // Action
            feedbackInfo.find(MultipleSelect).at(5).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.onChangeSubProduct).toHaveBeenCalled();
        });

        it('handle change betType correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

             // Action
            feedbackInfo.find(MultipleSelect).at(6).simulate('change', 'currentItem', 'selectedItemsKey');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('betTypeIds','selectedItemsKey');
        });

        it('handle errors customerNameInput correctly', () => {
            // Arrange
            const errors = {
                customerNameInput: 'errors'
            };

            const touched = {
                customerNameInput: 'touched'
            };
            const propsClone = {...props, ...errors, ...touched};

             // Action
             const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);

             // Assert
             expect(feedbackInfo.find(Form.Control).at(6).props().isInvalid).toEqual(propsClone.errors.customerNameInput);
        });

        it('handle onPasteCustomerHandler correctly', () => {
            // Arrange
            const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('event') } };
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);

            // Action
            feedbackInfo.find(Form.Control).at(6).simulate('paste', event);

            // Assert
            expect(props.onPasteCustomer).toHaveBeenCalled();
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
            feedbackInfo.find(AutoComplete).simulate('change', 'value');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('subject','value');
        });
    });

    describe('renderReviewSection ', () => {
        it('handle change isReviewed correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);
            var render = shallow(feedbackInfo.instance().renderReviewSection());
            
            // Action
            render.find('input').simulate('change', {target: {checked: true}});
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('isReviewed', true);
        });

        it('handle change review correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);
            var render = shallow(feedbackInfo.instance().renderReviewSection());

             // Action
             render.find(CkEditor).simulate('change', 'value');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('review','value');
        });

        it('handle errors review correctly', () => {
            // Arrange
            const errors = {
                review: 'errors'
            };

            const touched = {
                review: 'touched'
            };
            const propsClone = {...props, ...errors, ...touched};

             // Action
             const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);
             var render = shallow(feedbackInfo.instance().renderReviewSection());

             // Assert
             expect(render.find(CkEditor).props().isInvalid).toEqual(false);
        });
    });

    describe('renderSolutionSection', () => {
        it('handle collapse correctly', () => {
            // Arrange
            const propsClone = {...props, ...{values: {isPreviewSolution: false}}};
            const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);
            var render = shallow(feedbackInfo.instance().renderSolutionSection());
            
            // Action
            render.find(Form.Group).simulate('click');
            // Assert
            expect(props.onCollapseExpand).toHaveBeenCalledWith('solution');
        });

        it('handle onClick correctly', () => {
            // Arrange
            const propsClone = {...props, ...{values: {isPreviewSolution: false}}};
            const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);
            var render = shallow(feedbackInfo.instance().renderSolutionSection());
            
            // Action
            render.find('span').simulate('click', {stopPropagation: jest.fn()});
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('isPreviewSolution', true);
        });

        it('handle change solution correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);
            var render = shallow(feedbackInfo.instance().renderSolutionSection());

             // Action
             render.find(CkEditor).simulate('change', 'value');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('solution','value');
        });
    });

    describe('renderDescriptionSection ', () => {
        it('handle collapse correctly', () => {
            // Arrange
            const propsClone = {...props, ...{values: {isPreviewDescription: false}}};
            const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);
            var render = shallow(feedbackInfo.instance().renderDescriptionSection());
            
            // Action
            render.find(Form.Group).simulate('click');
            // Assert
            expect(props.onCollapseExpand).toHaveBeenCalledWith('description');
        });

        it('handle onClick correctly', () => {
            // Arrange
            const propsClone = {...props, ...{values: {isPreviewSolution: false}}};
            const feedbackInfo = shallow(<FeedbackInfo {...propsClone} />);
            var render = shallow(feedbackInfo.instance().renderDescriptionSection());
            
            // Action
            render.find('span').simulate('click', {stopPropagation: jest.fn()});
            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('isPreviewSolution', true);
        });

        it('handle change solution correctly', () => {
            // Arrange
            const feedbackInfo = shallow(<FeedbackInfo {...props} />);
            var render = shallow(feedbackInfo.instance().renderDescriptionSection());

             // Action
             render.find(CkEditor).simulate('change', 'value');

             // Assert
             expect(props.setFieldValue).toHaveBeenCalledWith('description','value');
        });
    });
});