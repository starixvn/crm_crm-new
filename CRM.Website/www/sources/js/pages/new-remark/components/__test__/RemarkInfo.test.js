import React from 'react';
import RemarkInfo from '../RemarkInfo';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import CkEditor from '@jsroot/components/ckeditor/index';
import Select from '@jsroot/components/CustomReactSelect';

describe('RemarkInfo', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        values: {},
        errors: {
            remarkTitle: 'error remarkTitle',
            requestedBy: 'error requestedBy',
            approvedBy: 'error approvedBy',
            acknowledgedBy: 'error acknowledgedBy',
            handledBy: 'error handledBy',
            extStation: 'error extStation',
            remarkContent: 'error remarkContent'
        },
        touched: {},
        handleChange: jest.fn(),
        handleSubmit: jest.fn(),
        setFieldValue: jest.fn(),
        remarkTitles: [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}],
        relatedPicsOption: [],
        allSettings: { 
            extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
            relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
            userId: 62585686,
            users: [{userId: 12, username: 'test'}]
        },
        isValidUsername : false
    };

    describe('handleChangeSelect ', () => {
        it('should call exactly functions when name is not empty', () => {
            // Arrange
            const container = shallow(<RemarkInfo  {...initProps}/>).instance();
            // Act
            container.handleChangeSelect({value: 'value'}, initProps.setFieldValue, 'test');
            // Assert
            expect(initProps.setFieldValue).toHaveBeenCalledWith('test', 'value');
        });
    });

    describe('handleChangeSelect ', () => {
        it('should call exactly functions when name is empty', () => {
            // Arrange
            const container = shallow(<RemarkInfo  {...initProps}/>).instance();
            // Act
            container.handleChangeSelect(null, initProps.setFieldValue, 'test');
            // Assert
            expect(initProps.setFieldValue).toHaveBeenCalledWith('test', '');
        });
    });

    describe('render', () => {
        it('should call exactly functions when change remark title', () => {
            // Arrange
            const container = shallow(<RemarkInfo  {...initProps}/>);
            // Act
            container.find(Form.Control).at(0).simulate('change');
            // Assert
            expect(initProps.handleChange).toHaveBeenCalled();
        });

        it('should call exactly functions when change requested by', () => {
            // Arrange
            const container = shallow(<RemarkInfo  {...initProps}/>);
            // Act
            container.find(Form.Control).at(1).simulate('change');
            // Assert
            expect(initProps.handleChange).toHaveBeenCalled();
        });

        it.each([
            0,
            1,
            2,
            3
          ])("should call exactly functions when change select at '%s'", (number) => {
            // Arrange
            const container = shallow(<RemarkInfo  {...initProps}/>);
            container.instance().handleChangeSelect = jest.fn();
            // Act
            container.find(Select).at(number).simulate('change');
            // Assert
            expect(container.instance().handleChangeSelect).toHaveBeenCalled();
        });

        it('should call exactly functions when change MultipleSelect', () => {
            // Arrange
            const container = shallow(<RemarkInfo  {...initProps}/>);
            // Act
            container.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');
            // Assert
            expect(initProps.handleChange).toHaveBeenCalled();
        });

        it('should call exactly functions when change ckEditor', () => {
            // Arrange
            const container = shallow(<RemarkInfo  {...initProps}/>);
            // Act
            container.find(CkEditor).at(0).simulate('change', 'value');
            // Assert
            expect(initProps.handleChange).toHaveBeenCalled();
        });
    });
});