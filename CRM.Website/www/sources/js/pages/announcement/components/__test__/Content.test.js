import React from 'react';
import { shallow } from 'enzyme';
import {Content} from '../Content';
import LangHelper from '@jsroot/common/langHelper';
import * as commonFunc from '../../common.functions';
import Site from '@jsroot/common/site';

describe('Content', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        Site.resolveClientUrl = jest.fn();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('render', () => {
        it('should return null', () => {
            // Arrange
            const state = {
                announcement: null,
                languages: null,
                content: null
            };
            const props = {settings: null};
            
            //Act
            const content = shallow(<Content {...props}/>, { disableLifecycleMethods: true });
            content.instance().setState(state);
            // Assert 
            expect(content).toBeNull;
        });

        it('should call exact function when click preview image', () => {
            // Arrange
            const state = {
                announcement: {
                    fileName: 'file1, file2',
                    notificationTemplateName: 'notificationTemplateName',
                    title: 'title',
                    headlineNameList: '',
                    directAccounts: '',
                    sendDateString: '2023-01-01',
                    siteNameList: ''
                },
                languages: [{settingId:50000, settingName: 'NotificationTemplateLanguage', settingValue: 'EN', mapleLanguage: 'EN'}],
                content: [{EN: 'test en'}],
                contentFiles: ['EN']
            };
            const props = {
                settings: {
                    currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                    headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                    siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
                },
                id: 1
            };
            const content = shallow(<Content {...props}/>, { disableLifecycleMethods: true });
            content.instance().setState(state);
            content.instance().handlePreviewImage = jest.fn();
            //Act
            content.find('.text-color').at(0).simulate('click');
            // Assert 
            expect(content.instance().handlePreviewImage).toHaveBeenCalled();
        });
    });

    describe('componentDidMount', () => {
        it('should call exact function', async () => {
            //Arrange
            const promiseAnnouncement = Promise.resolve({data: {data: [{siteNameList: '123'}], contents: [{EN: 'test en'}]}});
            const promise = Promise.resolve([{settingValue: 'EN'}]);
            const props = {
                id: 1,
                getLanguages: jest.fn(() => promise),
                getAnnouncementById: jest.fn(() => promiseAnnouncement),
                getSettings: jest.fn(() => promise)
            };
            commonFunc.mapLabelLanguage = jest.fn(() => [{settingValue: 'EN'}]);

            //Act
            const content = shallow(<Content {...props}/>).instance();
            content.initData = jest.fn();

            content.componentDidMount();
            await promise;

            //Assert
            expect(content.initData).toHaveBeenCalled();
        });
    });

    describe('initData', () => {
        it('should call exact function when fetching has been done', async () => {
            // Arrange
            const promiseAnnouncement = Promise.resolve({data: {data: [{siteNameList: '123'}], contents: [{EN: 'test en'}]}});
            const promise = Promise.resolve([{settingValue: 'EN'}]);
            const props = {
                getLanguages: jest.fn(() => promise),
                getAnnouncementById: jest.fn(() => promiseAnnouncement),
                getSettings: jest.fn(() => promise)
            };
            commonFunc.mapLabelLanguage = jest.fn(() => [{settingValue: 'EN'}]);
            
            //Act
            const content = shallow(<Content {...props}/>, { disableLifecycleMethods: true }).instance();
            content.getContentByLanguage = jest.fn();
            content.getSettingOption = jest.fn();

            content.initData();
            await promise;
            await promiseAnnouncement;

            // Assert 
            expect(props.getLanguages).toHaveBeenCalled();
            expect(props.getAnnouncementById).toHaveBeenCalled();
        });
    });

    describe('getSettingOption', () => {
        it('should call exact function when fetching has been done', async () => {
            // Arrange
            const announcement = {
                currencyIdList: '1,2,3,4',
                headlineType: 1
            };
            const settings = {
                currencyList: [{id: 1, name: "ABC"}, {id: 2, name: "ADA1"}, {id: 3, name: "AUD"}, {id: 4, name: "BDT"}],
                headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
            };
            const promise = Promise.resolve(settings);
            const props = {
                getSettings: jest.fn(() => promise),
                settings: settings
            };
            
            //Act
            const content = shallow(<Content {...props}/>, { disableLifecycleMethods: true }).instance();
            content.getSettingOption(announcement);
            await promise;

            // Assert 
            expect(content.state.currencies).toEqual('ABC, ADA1, AUD, BDT');
        });
    });

    describe('getContentByLanguage', () => {
        it('should set exact state', () => {
            // Arrange
            const contents = [{
                languageCode: 'EN',
                content: 'content'
            }];
            const content = shallow(<Content />, { disableLifecycleMethods: true }).instance();
            // Act
            content.getContentByLanguage(contents);
            // Assert
            expect(content.state.content).toEqual({EN: 'content'});
        });
    });

    describe('handleChangeTab', () => {
        it('should set exact state', () => {
            // Arrange
            const content = shallow(<Content />, { disableLifecycleMethods: true }).instance();
            // Act
            content.handleChangeTab('EN');
            // Assert
            expect(content.state.tab).toEqual('EN');
        });
    });

    describe('handlePreviewImage', () => {
        it('should open new window', () => {
            // Arrange
            const event = {
                preventDefault: jest.fn()
            };
            const props = {id: 1};
            window.open = jest.fn();
            const content = shallow(<Content {...props}/>, { disableLifecycleMethods: true }).instance();
            // Act
            content.handlePreviewImage(event, 'fileName');
            // Assert
            expect(window.open).toHaveBeenCalled();
        });
    });
});