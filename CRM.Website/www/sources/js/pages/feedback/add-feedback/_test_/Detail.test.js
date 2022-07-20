import React from 'react';
import { Col, Form, Row} from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import LangHelper from '@jsroot/common/langHelper';
import Detail from '../Detail';
import { shallow } from 'enzyme';

describe('CustomerInfo', () => {
    beforeAll(() => {
        window.currentClientTime = '7/28/2021 2:26:28 PM';
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.getResource = jest.fn(value => value);

    const props = {
        settings: {
            titles: [{id: 1, value: 'titles'}],
            licenseeTypes: [{id: 1, name: 'licenseeTypes'}],
            statuses: [{statusId: 1, name: 'statuses'}],
            responses: [{id: 1, value: 'responses'}],
            languages: [{languageId: 1, name: 'languages'}],
            communicationTools: [{id: 1, name: 'communicationTools'}],
            mainCategories: [{mainCategoryID: 1, name: 'category'}],
            products: [{id: 1, value: 'products'}],
            countries: [{id: 1, value: 'countries'}],
            extensions: [{id: 1, value: 'extensions'}],
            roles: [{id: 1, value: 'roles'}]
        },
        subCategoriesOptions: [{subCategoryId: 1, name: 'subCategoryId'}],
        subProductOptions:[{id: 1, value: 'id'}],
        betTypeOptions:[{id: 1, value: 'id'}],
        handleChange: jest.fn(),
        productHandleChange: jest.fn(),
        subProductHandleChange: jest.fn(),
        values:{}, errors:{}, touched:{}, setFieldValue: jest.fn(),
        handleChangeFeedbackTime: jest.fn(),
        handleChangeResolutionTime: jest.fn(),
        handleCommunicationChange: jest.fn(),
        mainCategoriesHandleChange: jest.fn(),
        renderOptions: jest.fn(()=> '<div></div>')
    };

    describe('render', () => {
            it('invalid feedback date correctly', () => {
            // Arrange
            const errors = {
                feedbackDate: 'errors'
            };

            const touched = {
                feedbackDate: 'touched'
            };

            props.errors = errors;
            props.touched = touched;

            // Action
            const detail = shallow(<Detail {...props} />);

            // Assert
            expect(detail.find(DatePicker).at(0).props().isInvalid).toEqual(errors.feedbackDate);
        });

        it('handleChange feedback date call exact function', () => {
            // Arrange
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.handleChangeFeedbackTime).toHaveBeenCalled();
        });

            it('handleChange resolution time call exact function', () => {
            // Arrange
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(DatePicker).at(1).simulate('change', 'value');

            // Assert
            expect(props.handleChangeResolutionTime).toHaveBeenCalled();
        });

        it('extension multipleSelect change correctly', () => {
            // Arrange
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');


            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('extension', 'selectedItemsKey');
        });

        it('invalid extension correctly', () => {
            // Arrange

            const errors = {
                extension: 'errors'
            };

            const touched = {
                extension: 'touched'
            };

            props.errors = errors;
            props.touched = touched;

            // Action
            const detail = shallow(<Detail {...props} />);

            // Assert
            expect(detail.find(MultipleSelect).at(0).props().isInvalid).toEqual(errors.extension);
        });

        it('communication multipleSelect change correctly', () => {
            // Arrange
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(props.handleCommunicationChange).toHaveBeenCalledWith('currentItem', 'selectedItemsKey', props.setFieldValue);
        });

        it('invalid communication correctly', () => {
            // Arrange
            const errors = {
                communication: 'errors'
            };

            const touched = {
                communication: 'touched'
            };
            props.errors = errors;
            props.touched = touched;

            const {values, setFieldValue} = props;
            const detail = shallow(<Detail {...props} />);

            // Action
            const dropdown = shallow(detail.instance().renderDetailDropdown(values, errors, touched, setFieldValue));

            // Assert
            expect(dropdown.find(MultipleSelect).at(0).props().isInvalid).toEqual(errors.communication);
        });

        it('category multipleSelect change correctly', () => {
            // Arrange
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(MultipleSelect).at(2).simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(props.mainCategoriesHandleChange).toHaveBeenCalled();    
        });

        it('invalid category correctly', () => {
            // Arrange
            const errors = {
                category: 'errors'
            };
            const touched = {
                category: 'touched'
            };
            props.errors = errors;
            props.touched = touched;

            // Action
            const detail = shallow(<Detail {...props} />);

            // Assert
            expect(detail.find(MultipleSelect).at(2).props().isInvalid).toEqual(errors.category);
        });

        it('category multipleSelect change correctly', () => {
            // Arrange
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(MultipleSelect).at(3).simulate('change', currentItem, selectedItemsKey);


            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('subCategory', selectedItemsKey);    
        });

        it('invalid subCategory  correctly', () => {
            // Arrange
            const errors = {
                subCategory : 'errors'
            };

            const touched = {
                subCategory : 'touched'
            };
            props.errors = errors;
            props.touched = touched;

            // Action
            const detail = shallow(<Detail {...props} />);

            // Assert
            expect(detail.find(MultipleSelect).at(3).props().isInvalid).toEqual(errors.subCategory);
        });

        it('product multipleSelect change correctly', () => {
            // Arrange
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            props.values = {
                subProduct: 'subProduct'
            };
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(MultipleSelect).at(4).simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(props.productHandleChange).toHaveBeenCalled();    
        });

        it('invalid product  correctly', () => {
            // Arrange
            const errors = {
                product : 'errors'
            };

            const touched = {
                product : 'touched'
            };
            props.errors = errors;
            props.touched = touched;

            // Action
            const detail = shallow(<Detail {...props} />);

            // Assert
            expect(detail.find(MultipleSelect).at(4).props().isInvalid).toEqual(errors.product);
        });

        it('subProduct multipleSelect change correctly', () => {
            // Arrange
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            props.values = {
                betType: 'betType'
            };
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(MultipleSelect).at(5).simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(props.subProductHandleChange).toHaveBeenCalled();    
        });

        it('invalid subProduct  correctly', () => {
            // Arrange
            const errors = {
                subProduct : 'errors'
            };

            const touched = {
                subProduct : 'touched'
            };
            props.errors = errors;
            props.touched = touched;

            // Action
            const detail = shallow(<Detail {...props} />);

            // Assert
            expect(detail.find(MultipleSelect).at(5).props().isInvalid).toEqual(errors.subProduct);
        });

        it('betType multipleSelect change correctly', () => {
            // Arrange
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            const detail = shallow(<Detail {...props} />);

            // Action
            detail.find(MultipleSelect).at(6).simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('betType', selectedItemsKey);    
        });

        it('invalid betType  correctly', () => {
            // Arrange
            const errors = {
                betType : 'errors'
            };

            const touched = {
                betType : 'touched'
            };
            props.errors = errors;
            props.touched = touched;

            // Action
            const detail = shallow(<Detail {...props} />);

            // Assert
            expect(detail.find(MultipleSelect).at(6).props().isInvalid).toEqual(errors.betType);
        });

        it('invalid language  correctly', () => {
            // Arrange
            const errors = {
                languageId  : 'errors'
            };

            const touched = {
                languageId  : 'touched'
            };
            props.errors = errors;
            props.touched = touched;

            // Action
            const detail = shallow(<Detail {...props} />);

            // Assert
            expect(detail.find(Form.Control).at(1).props().isInvalid).toEqual(errors.languageId);
        });
    });
});