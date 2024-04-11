import React from 'react';
import { shallow } from 'enzyme';
import ContentTab from '../ContentTab';
import LangHelper from '@jsroot/common/langHelper';
import { Tabs, Form } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';

describe('ContentTab', () => {
    beforeAll(() =>{
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        const props = {
            languages: [{
                settingValue: 'settingValue',
                mapLabel: 'EN'
            }],
            handleChangeTab: jest.fn(),
            tab: 'EN',
            isValidContent: false,
            content: {EN:'en'},
            setFieldValue: jest.fn(),
            isChangeTemplate: true,
            parameters: ['EN'],
            handleChangeParameter: jest.fn(),
            values: {
                EN: 'test'
            }
        };
        it('should call exact function when select tab', () => {
            // Arrange
            const contentTab = shallow(<ContentTab {...props}/>);
            
            //Act
            contentTab.find(Tabs).simulate('select');

            // Assert 
            expect(props.handleChangeTab).toHaveBeenCalled();
        });

        it('should call exact function when onchange content', () => {
            // Arrange
            const contentTab = shallow(<ContentTab {...props}/>);
            
            //Act
            contentTab.find(CkEditor).simulate('change');

            // Assert 
            expect(props.setFieldValue).toHaveBeenCalledTimes(2);
        });

        it('should call exact function when onchange form-input-param', () => {
            // Arrange
            const contentTab = shallow(<ContentTab {...props}/>);
            
            //Act
            contentTab.find(Form.Control).at(0).simulate('change');

            // Assert 
            expect(props.handleChangeParameter).toHaveBeenCalled();
        });
    });
}); 