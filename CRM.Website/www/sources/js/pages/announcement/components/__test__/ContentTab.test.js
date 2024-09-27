import React from 'react';
import { shallow } from 'enzyme';
import {ContentTab} from '../ContentTab';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import { Col, Form, Row, Tabs, Tab } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';

describe('ContentTab', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        Site.resolveClientUrl = jest.fn();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn((key) => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'file-btn');
        document.body.appendChild(appContainer);
    });
    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('file-btn');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    const initProps = {
        languages: [{ mapLabel: 'en', settingValue: 'settingValue' }],
        handleChangeTab: jest.fn(),
        tab: 'tab1',
        isValidContent: false,
        content: [{en: 'test'}],
        setFieldValue: jest.fn(),
        isChangeTemplate: true,
        parameters: ['en'],
        values: [{ en: 'test' }],
        handleChangeParameter: jest.fn(),
        setStateUploadFile: jest.fn(),
        uploadedFiles: [],
        invalidContentMaxLength: [],
        textInvalidContentMaxLength: [],
        actionParam: { announcementId:1 },
        setLanguageType: jest.fn(),
        isAllLanguages: false
    };

    describe('handleCheckTypeLanguage', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};
            
            //Act
            const container = shallow(<ContentTab {...props}/>).instance();
            container.handleCheckTypeLanguage();

            // Assert 
            expect(props.setLanguageType).toHaveBeenCalledWith(true);
        });
    });

    describe('handleCheckAllLanguages', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};
            
            //Act
            const container = shallow(<ContentTab {...props}/>).instance();
            container.handleCheckAllLanguages();

            // Assert 
            expect(props.setLanguageType).toHaveBeenCalledWith(true);
        });
    });

    describe('handleCheckSingleLanguage', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};
            
            //Act
            const container = shallow(<ContentTab {...props}/>).instance();
            container.handleCheckSingleLanguage();

            // Assert 
            expect(props.setLanguageType).toHaveBeenCalledWith(false);
        });
    });

    describe('render', () => {
        it('should call props function when onSelect', () => {
            // Arrange
            const props = {...initProps};

            //Act
            const container = shallow(<ContentTab {...props}/>);
            const render = container.instance().render();

            shallow(render).find(Tabs).at(0).simulate('select', 'test');

            // Assert 
            expect(props.handleChangeTab).toHaveBeenCalled();
        });

        it('should call props function when CkEditor change', () => {
            // Arrange
            const props = {...initProps};

            //Act
            const container = shallow(<ContentTab {...props}/>);
            const render = container.instance().render();

            shallow(render).find(CkEditor).at(0).simulate('change', 'value');

            // Assert 
            expect(props.setFieldValue).toHaveBeenCalled();
        });

        it('should call props function when textarea change', () => {
            // Arrange
            const props = {...initProps};

            //Act
            const container = shallow(<ContentTab {...props}/>);
            const render = container.instance().render();

            shallow(render).find(Form.Control).at(0).simulate('change', 'value');

            // Assert 
            expect(props.handleChangeParameter).toHaveBeenCalled();
        });
    });
});