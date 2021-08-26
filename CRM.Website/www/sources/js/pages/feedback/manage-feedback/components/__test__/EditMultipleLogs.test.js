import React from 'react';
import { shallow } from 'enzyme';
import EditMultipleLogs from '../EditMultipleLogs';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import * as shareScripts from '@jsroot/common/shareScripts';
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
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            relatedCustomers: [],
            resolutionDate: 'Aug 16, 2021 03:12:00 PM',
            responseId: 1,
            siteId: 1,
            statusId: 1,
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
                }
            ]
        },
        settings:{
            bettypeNA: {id: 0, name: 'N/A'},
            bettypes: [{id: 3, value: 'N/A', parentId: 2}],
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
            sites: [{id: 0, name: 'N/A', childSites:[{id: 1, value: 'child'}]}],
            statusId: [{id: 0, name: 'N/A'}],
            subCategories: [{subCategoryId: 2, mainCategoryID: 1, name: 'N/A'}],
            subProductNA: {id: 0, value: 'N/A'},
            subProducts: [{id: 2, value: 'N/A', parentId: 1}]
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
                mainCategoryIds: [1],
                subCategoryIds: [2],
                productIds: [1],
                subProductIds: [2],
                betTypeIds: [3],
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
            expect(container.state.subProductOptions).toEqual([{id: 2, value: 'N/A', checked: false}]);
            expect(container.state.subCategoryOptions).toEqual([{subCategoryId: 2, name: 'N/A', checked: true}]);
            expect(container.state.mainCategoryOptions).toEqual([{mainCategoryID: 0, name: 'N/A', checked: false}]);
            expect(container.state.betTypeOptions).toEqual([{id: 3, value: 'N/A', checked: true}]);
        });
    }); 

    describe('getCommunicationSettings', () => {
        it('should return expect data', async () => {
             // Arrange
             const container = shallow(<EditMultipleLogs />).instance();
             const expected = {
                extensionIds: [2022],
                communicationToolIds: [1001],
                mainCategoryIds: [3020],
                subCategoryIds: [4029],
                productIds: [46000],
                subProductIds: [8063],
                betTypeIds: [9144],
                siteInfos: [{
                    id: 1,value: 'child'
                }]
             };
            // Act
            const actual = container.getCommunicationSettings(initData.communicationLog, initData.settings);

            //Arrange
            expect(actual).toEqual(expected);
           
        });
    }); 

    describe('onChangeMainCategory', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    mainCategories: [1]
                }
            };
            const values = {subject: 'subject', subCategory: '1,2'};
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');
            shareScripts.getSubCategories = jest.fn(()=> [1]);

            // Act
            container.onChangeMainCategory(setFieldValue, '1,2', 'currentItem', values);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('mainCategoryIds', '1,2');
            expect(setFieldValue).toHaveBeenCalledWith('subject', 'tempSubject');
            expect(container.state.subCategoryOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    mainCategories: [1]
                }
            };
            const setFieldValue = jest.fn();
            const values = {subject: 'subject', subCategory: '1,2'};
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');

            // Act
            container.onChangeMainCategory(setFieldValue, '', 'currentItem', values);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subCategoryIds', '');
            expect(container.state.subCategoryOptions).toEqual([]);
        });
    });

    describe('productHandleChang', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    subProducts: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getSubProducts = jest.fn(()=> [1]);

            // Act
            container.onChangeProduct(setFieldValue, '1,2', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '1,2');
            expect(container.state.subProductOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    subProducts: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getSubProducts = jest.fn(()=> [1]);

            // Act
            container.onChangeProduct(setFieldValue, '', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');

            expect(container.state.subProductOptions).toEqual([]);
            expect(container.state.betTypeOptions).toEqual([]);
        });
    });

    describe('onChangeSubProduct', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    bettypes: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getBetTypes = jest.fn(()=> [1]);

            // Act
            container.onChangeSubProduct (setFieldValue, '1,2', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '1,2');
            expect(container.state.betTypeOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    bettypes: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />).instance();
            container.setState(state);
            shareScripts.getBetTypes = jest.fn(()=> [1]);

            // Act
            container.onChangeSubProduct(setFieldValue, '', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');
            expect(container.state.betTypeOptions).toEqual([]);
        });
    });

    describe('onGetFeedbackSubjectTemplates', () => {
        it('should setState when search text length >= 2', async () => {
            // Arrange
            const searchText = 'search text';
            const response = {data: 'test'};
            const promise = Promise.resolve(response);
            const url = 'Common/GetFeedbackSubjectTemplate';
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            container.onGetFeedbackSubjectTemplates(searchText);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(Site.resolveClientUrl).toHaveBeenCalledWith('Common/GetFeedbackSubjectTemplate');
            expect(container.state.feedbackSubjectTemplates).toEqual([]);

        });

        it('should setState when search text length < 2', async () => {
            // Arrange
            const searchText = 't';
            const response = {data: 'test'};
            const promise = Promise.resolve(response);
            const url = 'Common/GetFeedbackSubjectTemplate';
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            container.onGetFeedbackSubjectTemplates(searchText);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.feedbackSubjectTemplates).toEqual([]);

        });
    });

    describe('handleCheckAll', () => {
        it('should call exact functions', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const event = { 
                target: {checked: true}
            };
             
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            container.handleCheckAll({test: false}, setFieldValue, event);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('isCheck.test', true);
        });
    });

    describe('getExtensionParams', () => {
        it('should return expected data when selected has data', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            const actual = container.getExtensionParams('1,2');

            // Assert
            expect(actual).toEqual('1,2');
        });

        it('should return expected data when selected no data', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />).instance();

            // Act
            const actual = container.getExtensionParams('', {id:1});

            // Assert
            expect(actual).toEqual('1');
        });
    });

    // describe('handleSubmit', () => {
    //     it('should call exact function', () => {
    //         // Arrange
    //         const setSubmitting = jest.fn();
    //         const values = {
    //         };
    //         const container = shallow(<EditMultipleLogs />).instance();
    //         container.confirmEditMultipleLogs = jest.fn();

    //         // Act
    //         container.handleSubmit ({countryId: 1}, {setSubmitting});

    //         // Assert
    //         expect(setSubmitting).toHaveBeenCalledWith(true);
    //         expect(container.confirmEditMultipleLogs).toHaveBeenCalled();
    //     });
    // });
}); 