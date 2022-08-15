import React from 'react';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Row, Col } from 'react-bootstrap';
import DropdownDetail  from '../DropdownDetail';
import { shallow } from 'enzyme';

describe('DropdownDetail', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const allSettings = {
        bettypeNA: {id: 0, name: 'N/A'},
        betTypes: [{id: 3, value: 'N/A', parentId: 2}],
        communicationToolNA: 'null',
        communicationTools:[{id: 0, name: 'N/A'}],
        countries:[{id: 0, name: 'N/A'}],
        extensionNA: {id: 0, value: 'N/A'},
        extensions:[{id: 0, value: 'N/A'}],
        languages: [{languageId: 0, name: 'N/A'},{languageId: 1, name: 'English'}],
        licenseeTypes:[{id: 0, name: 'N/A'}],
        mainCategories: [{mainCategoryID: 0, name: 'N/A'}],
        productNA:{id: 0, value: 'N/A'},
        products: [{id: 0, value: 'N/A'}],
        responses: [{id: 0, value: 'N/A'}],
        roles: [{id: 0, value: 'N/A'},{id: 0, value: 'N/A'},{id: 0, value: 'N/A'},{id: 0, value: 'N/A'},{id: 0, value: 'N/A'},{id: 0, value: 'N/A'}],
        sites: [{id: 0, name: 'N/A', childSites:[{id: 1, value: 'child'}]}],
        statuses: [{statusId: 0, name: 'N/A'}],
        statusId: [{id: 0, name: 'N/A'}],
        subCategories: [{subCategoryId: 2, mainCategoryID: 1, name: 'N/A'}],
        subProductNA: {id: 0, value: 'N/A'},
        subProducts: [{id: 2, value: 'N/A', parentId: 1}]
    };
    const props = {
        onClose: jest.fn(),
        feedbackSubjectTemplates: ['sa'],
        onChangeStartTime: jest.fn(),
        onChangeEndTime: jest.fn(),
        setStateBetType: jest.fn(),
        setStateSubProduct: jest.fn(),
        handleChangeCommunicationTool: jest.fn(),
        handleChangeSubProduct: jest.fn(),
        handleChangeMainCategory: jest.fn(),
        handleChangeProduct: jest.fn(),
        allSettings: allSettings,
        communicationTools: allSettings.communicationTools,
        mainCategories: allSettings.mainCategories,
        products: allSettings.products,
        subCategories: allSettings.subCategories,
        subProducts: allSettings.subProducts,
        betTypes: allSettings.betTypes,
        extensions: allSettings.extensions,
        values: {
            startTime: '2021-10-20T00:00',
            endTime: '2021-11-20T00:00',
            subProductIds: '1,2',
            betTypeIds: '3,4',
            customerNameInput: 'test'
        },
        errors: {communicationToolIds: 'errors'},
        touched: {communicationToolIds: 'touched'},
        handleChange: jest.fn(),
        handleSubmit: jest.fn(),
        setFieldValue: jest.fn()
    };

    describe('renderCreateCommunication', () => {
        it('should handle onChange startTime call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderCommunication = shallow(container.renderCreateCommunication());
            renderCommunication.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.onChangeStartTime).toHaveBeenCalledWith(props.setFieldValue, 'value', '2021-11-20T00:00');
        });

        it('should handle onChange endTime call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderCommunication = shallow(container.renderCreateCommunication());
            renderCommunication.find(DatePicker).at(1).simulate('change', 'value');

            // Assert
            expect(props.onChangeEndTime).toHaveBeenCalledWith(props.setFieldValue, 'value', '2021-10-20T00:00');
        });

        it('should handle onChange extension call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderCommunication = shallow(container.renderCreateCommunication());
            renderCommunication.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('extensionIds', 'selectedItemsKey');
        });

        it('should handle onChange communication call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderCommunication = shallow(container.renderCreateCommunication());
            renderCommunication.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(props.handleChangeCommunicationTool).toHaveBeenCalledWith(props.setFieldValue, 'currentItem', 'selectedItemsKey');
        });

        it.each([
            0,
            1,
            2,
            3,
            4,
            5
          ])("should handle onChange when form control change at %s'", number => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>);
           
            // Act
            container.find(Form.Control).at(number).simulate('change', 'value');

            // Assert
            expect(props.handleChange).toHaveBeenCalled();
        });
    });

    describe('renderCreateDropDown ', () => {
        it('should handle onChange category call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderDropdown = shallow(container.renderCreateDropDown());
            renderDropdown.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(props.handleChangeMainCategory).toHaveBeenCalledWith(
                props.setFieldValue, 'selectedItemsKey', props.values.subCategoryIds, props.allSettings
            );
        });

        it('should handle onChange subCategory call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderDropdown = shallow(container.renderCreateDropDown());
            renderDropdown.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('subCategoryIds', 'selectedItemsKey');
        });

        it('should handle onChange product call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderDropdown = shallow(container.renderCreateDropDown());
            renderDropdown.find(MultipleSelect).at(2).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(props.handleChangeProduct).toHaveBeenCalled();
        });

        it('should handle onChange subProduct call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderDropdown = shallow(container.renderCreateDropDown());
            renderDropdown.find(MultipleSelect).at(3).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(props.handleChangeSubProduct).toHaveBeenCalled();
        });

        it('should handle onChange betType call exact function', () => {
            // Arrange
            const container = shallow(<DropdownDetail {...props}/>).instance();

            // Act
            const renderDropdown = shallow(container.renderCreateDropDown());
            renderDropdown.find(MultipleSelect).at(4).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('betTypeIds', 'selectedItemsKey');
        });
    });

    // it('should handle onChange mainCategory call exact function', () => {
    //     // Arrange
    //     const container = shallow(<DropdownDetail {...props}/>).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });
    //     commonFunc.handleChangeMainCategory = jest.fn();

    //     // Act
    //     const renderCommunication = shallow(container.renderForm(formikProps));
    //     renderCommunication.find(MultipleSelect).at(2).simulate('change', 'currentItem', '');

    //     // Assert
    //     expect(commonFunc.handleChangeMainCategory).toHaveBeenCalled();
    // });

    // it('should handle onChange subCategory call exact function', () => {
    //     // Arrange
    //     const container = shallow(<DropdownDetail {...props}/>).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });

    //     // Act
    //     const renderCommunication = shallow(container.renderForm(formikProps));
    //     renderCommunication.find(MultipleSelect).at(3).simulate('change', 'currentItem', 'selectedItemsKey');

    //     // Assert
    //     expect(formikProps.setFieldValue).toHaveBeenCalledWith('subCategoryIds', 'selectedItemsKey');
    // });

    // it('should handle onChange product call exact function', () => {
    //     // Arrange

    //     const container = shallow(<DropdownDetail {...props}/>).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });
    //     commonFunc.handleChangeProduct = jest.fn();

    //     // Act
    //     const renderCommunication = shallow(container.renderForm(formikProps));
    //     renderCommunication.find(MultipleSelect).at(4).simulate('change', 'currentItem', 'selectedItemsKey');

    //     // Assert
    //     expect(commonFunc.handleChangeProduct).toHaveBeenCalled();
    // });

    // it('should handle onChange subProduct call exact function', () => {
    //     // Arrange
    //     const container = shallow(<DropdownDetail {...props}/>).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });
    //     commonFunc.handleChangeSubProduct = jest.fn();

    //     // Act
    //     const renderCommunication = shallow(container.renderForm(formikProps));
    //     renderCommunication.find(MultipleSelect).at(5).simulate('change', 'currentItem', 'selectedItemsKey');

    //     // Assert
    //     expect(commonFunc.handleChangeSubProduct).toHaveBeenCalled();
    // });

    // it('should handle onChange betType call exact function', () => {
    //     // Arrange
    //     const container = shallow(<DropdownDetail {...props}/>).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });

    //     // Act
    //     const renderCommunication = shallow(container.renderForm(formikProps));
    //     renderCommunication.find(MultipleSelect).at(6).simulate('change', 'currentItem', 'selectedItemsKey');

    //     // Assert
    //     expect(formikProps.setFieldValue).toHaveBeenCalledWith('betTypeIds', 'selectedItemsKey');
    // });

    // it('should handle onChange site call exact function', () => {
    //     // Arrange
    //     const values = { id: 1 }
    //     const container = shallow(<DropdownDetail {...props}/>).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });

    //     // Act
    //     const renderCommunication = shallow(container.renderForm(formikProps));
    //     renderCommunication.find(SelectWithSearch).simulate('change', values);
        
    //     // Assert
    //     expect(formikProps.setFieldValue).toHaveBeenCalled();
    // });

    // it('onPaste verify customer call exact function', () => {
    //     // Arrange
    //     const container = shallow(<DropdownDetail {...props} />).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });
    //     commonFunc.handlePasteCustomer = jest.fn();
    //     const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('event') } };
    //     const renderCommunication = shallow(container.renderForm(formikProps));

    //     // Action
    //     renderCommunication.find(Form.Control).at(7).simulate('paste', event);

    //     // Assert
    //     expect(commonFunc.handlePasteCustomer).toHaveBeenCalled();
    // });

    // it('onClick verify customer call exact function', () => {
    //     // Arrange
    //     const container = shallow(<DropdownDetail {...props} />).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });
    //     container.handleVerifyCreateRelatedCustomer = jest.fn();
    //     const renderCommunication = shallow(container.renderForm(formikProps));

    //     // Action
    //     renderCommunication.find(Button).at(0).simulate('click', formikProps.values, formikProps.errors, formikProps.setFieldValue);

    //     // Assert
    //     expect(container.handleVerifyCreateRelatedCustomer).toHaveBeenCalledWith(formikProps.values, formikProps.errors, formikProps.setFieldValue);
    // });

    // it('should handle verify customer call exact function', () => {
    //     // Arrange
    //     const state = {
    //         relatedCustomers: ['sa']
    //     };
    //     const container = shallow(<DropdownDetail {...props}/>).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });
    //     container.deleteVerifyCreateCustomer = jest.fn();
    //     container.setState(state);

    //     // Act
    //     const renderCommunication = shallow(container.renderForm(formikProps));
    //     renderCommunication.find(VerifyCustomer).props().onClick();
        
    //     // Assert
    //     expect(container.deleteVerifyCreateCustomer).toHaveBeenCalled();
    //     expect(renderCommunication.find(VerifyCustomer).props().listOfCustomers).toEqual(['sa']);
    // });

    // it('subject autoComplete change correctly', () => {
    //     // Arrange
    //     const value = 'value';
    //     const container = shallow(<DropdownDetail {...props} />).instance();
    //     container.setState({
    //         allStatus: [{ statusId: 1, name: 'Closed'}],
    //         allSettings: initData.settings,
    //     });
    //     const renderCommunication = shallow(container.renderForm(formikProps));

    //     // Action
    //     renderCommunication.find(AutoComplete).simulate('change',value);

    //     // Assert
    //     expect(formikProps.setFieldValue).toHaveBeenCalledWith('subject', value);
    //     expect(renderCommunication.find(AutoComplete).props().options).toEqual(['sa']);
    // });
});