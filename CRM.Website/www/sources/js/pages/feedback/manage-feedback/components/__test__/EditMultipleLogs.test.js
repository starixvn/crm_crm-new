import React from 'react';
import { shallow } from 'enzyme';
import EditMultipleLogs from '../EditMultipleLogs';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import CkEditor from '@jsroot/components/ckeditor/index';

describe('EditMultipleLogs', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);
    const initData = {
        communicationLog:{
            languageId: 12001,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            relatedCustomers: [],
            resolutionDate: 'Aug 16, 2021 03:12:00 PM',
            responseId: 10002,
            siteId: 6004,
            statusId: 11006,
            settings:[{
                    feedbackId: 239466,
                    settingId: 1001,
                    settingType: 'Communication',
                    subSettingId: 0,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 2022,
                    settingType: 'Station',
                    subSettingId: 0,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 3020,
                    settingType: 'Category',
                    subSettingId: 4029,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 46000,
                    settingType: 'Product',
                    subSettingId: 8063,
                    subSettingIdLevel3: 9144
                },
                {
                    feedbackId: 239466,
                    settingId: 46001,
                    settingType: 'Product',
                    subSettingId: 8063,
                    subSettingIdLevel3: 9144
                }
            ]
        },
        settings:{
            bettypeNA: {id: 0, name: 'N/A'},
            bettypes: [{id: 0, value: 'N/A'}],
            communicationToolNA: 'null',
            communicationTools:[{id: 0, name: 'N/A'}],
            countries:[{id: 0, name: 'N/A'}],
            extensionNA: {id: 0, value: 'N/A'},
            extensions:[{id: 0, value: 'N/A'}],
            languages: [{languageId: 0, name: 'N/A'}],
            licenseeTypes:[{id: 0, name: 'N/A'}],
            mainCategories: [{mainCategoryID: 0, name: 'N/A'}],
            productNA:{id: 0, value: 'N/A'},
            products: [{id: 0, value: 'N/A'}],
            responses: [{id: 0, value: 'N/A'}],
            roles: [{id: 0, value: 'N/A'}],
            sites: [{id: 0, name: 'N/A'}],
            statusId: [{id: 0, name: 'N/A'}],
            subCategories: [{subProductId: 0, name: 'N/A'}],
            subProductNA: {id: 0, value: 'N/A'},
            subProducts: [{id: 0, value: 'N/A'}]
        },
        hasReviewFeedbackPermission: true
    };
    describe('componentDidMount', () => {
        it('should calls setState', async () => {
             // Arrange
             const response = {data: initData};
            const promise = Promise.resolve(response);
            const props = {
                feedbackArr: [{feedbackId: 1}]
            };
            const commSetting = {
                extensionIds: [],
                communicationToolIds: [],
                mainCategoryIds: [],
                subCategoryIds: [],
                productIds: [],
                subProductIds: [],
                betTypeIds: [],
                siteInfos: []
            };
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            // Act
            const container = shallow(<EditMultipleLogs {...props} />).instance();
            container.getCommunicationSettings = jest.fn(() => commSetting);
            await promise;
            jest.runAllTimers();

            //Arrange
            expect(Site.resolveClientUrl).toHaveBeenCalledWith('MultipleLogs/GetLogSettingByFeedbackId/1');
            expect(container.state.extensionOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.communicationToolOptions).toEqual([{id: 0, name: 'N/A', checked: false}]);
            expect(container.state.productOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.subProductOptions).toEqual([]);
            expect(container.state.subCategoryOptions).toEqual([]);
            expect(container.state.mainCategoryOptions).toEqual([{mainCategoryID: 0, name: 'N/A', checked: false}]);
            expect(container.state.betTypeOptions).toEqual([]);
        });
    }); 
}); 