import React from 'react';
import FeedbackDetails from '../FeedbackDetails';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';
import { Col, Form, Row, Modal } from 'react-bootstrap';
import { shallow } from 'enzyme';
import DataService from '@jsroot/common/dataService';
import MultipleSelect from '@jsroot/components/multiple-select/index';

describe('FeedbackDetails', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initData = {
        feedback:{
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            resolutionDate: 'Aug 16, 2021 03:12:00 PM',
            responseId: 1,
            userName:'test',
            siteId: 1,
            statusId: 1,
            siteSetting: {name: 'test'},
            siteInfo: { id: 0, name: 'test' },
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
            ],
            relatedCustomers: [{
                custId: 1,
                username: 'test',
                isSiteActive: true,
                isLicensee: true
            }]
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
            const props = {
                feedbackId: 73300
            };
            const feedbackSettings  = {
                extensionIds: [0],
                communicationToolIds: [],
                mainCategoryIds: [1],
                subCategoryIds: [2],
                productIds: [1],
                subProductIds: [2],
                betTypeIds: [3] 
            };
            const response = {
                data: initData
            };

            Site.resolveClientUrl = jest.fn(url => url);
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const container = shallow(<FeedbackDetails {...props} />).instance();
            container.getSettings = jest.fn(() => feedbackSettings);
            container.getSelectedData = jest.fn(() => {});
            await container.componentDidMount();
            await promise;

            //Assert
            expect(container.state.settings).toEqual(initData.settings);
            expect(container.state.hasReviewFeedbackPermission).toEqual(true);
            expect(container.state.extensionOptions).toEqual([{id: 0, value: 'N/A', checked: true}]);
            expect(container.state.communicationToolOptions).toEqual([{id: 0, name: 'N/A', checked: false}]);
            expect(container.state.productOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.subProductOptions).toEqual([{id: 2, value: 'N/A', checked: false}]);
            expect(container.state.subCategoryOptions).toEqual([{subCategoryId: 2, name: 'N/A', checked: true}]);
            expect(container.state.mainCategoryOptions).toEqual([{mainCategoryID: 0, name: 'N/A', checked: false}]);
            expect(container.state.betTypeOptions).toEqual([{id: 3, value: 'N/A', checked: true}]);
        });
    });

    describe('getFeedbackSettings', () => {
        it('should return exactly when get log settings', () => {
            // Arrange
            const container = shallow(<FeedbackDetails />).instance();

            // Act
            const actual = container.getSettings(initData.feedback, initData.settings);

            //Assert
            expect(actual.extensionIds[0]).toBe(2022);
            expect(actual.communicationToolIds[0]).toBe(1001);
            expect(actual.mainCategoryIds[0]).toBe(3020);
            expect(actual.subCategoryIds[0]).toBe(4029);
            expect(actual.productIds[0]).toBe(46000);
            expect(actual.subProductIds[0]).toBe(8063);
            expect(actual.betTypeIds[0]).toBe(9144);
        });
    });

    describe('renderClassNameCustomer', () => {
        it('should return exact class name when customer is inactive', () => {
            // Arrange
            const item = {
                isSiteActive: false,
                isLicensee: true,
                custId : 1
            };
            const container = shallow(<FeedbackDetails />).instance();

            // Act
            const actual = container.renderClassNameCustomer(item);

             //Assert
             expect(actual).toEqual('inactive');
        });

        it('should return exact class name when customer is invalid', () => {
            // Arrange
            const item = {
                isSiteActive: true,
                isLicensee: true,
                custId : 0
            };
            const container = shallow(<FeedbackDetails />).instance();

            // Act
            const actual = container.renderClassNameCustomer(item);

             //Assert
             expect(actual).toEqual('invalid');
        });

        it('should return exact class name when customer is customer', () => {
            // Arrange
            const item = {
                isSiteActive: true,
                isLicensee: true,
                custId : 1
            };
            const container = shallow(<FeedbackDetails />).instance();

            // Act
            const actual = container.renderClassNameCustomer(item);

             //Assert
             expect(actual).toEqual('customer');
        });
    });  
    
    describe('renderFeedbackDetails ', () => {
        it('should render exact form', () => {
            // Arrange
            const state = {
                communication: initData.feedback,
                settings: {
                    countries: [],
                    statuses: [],
                    roles: [],
                    languages: [],
                    licenseeTypes: [],
                    responses: []
                },
                extensionOptions: [],
                mainCategoryOptions: [],
                subCategoryOptions: [],
                productOptions: [],
                subProductOptions: [],
                betTypeOptions: [],
                sitesOptions : []
            };
            const container = shallow(<FeedbackDetails />).instance();
            container.setState(state);
            container.renderDropdownDetail = jest.fn(() => "<div />");
            container.renderSelectOptions = jest.fn(() => "<div />");
            container.renderRemark = jest.fn(() => "<div />");
            container.renderSolution = jest.fn(() => "<div />");
            container.renderReview = jest.fn(() => "<div />");

            // Act
            const actual = shallow(container.renderFeedbackDetails());

             //Assert
            expect(actual.find(MultipleSelect).length).toBe(2);
            expect(actual.find(Form.Group).length).toBe(7);
             
        });
    });

    describe('renderDropdownDetail ', () => {
        it('should render exact form', () => {
            // Arrange
            const state = {
                settings: {
                    statuses: [],
                    roles: []
                },
                mainCategoryOptions: [],
                subCategoryOptions: [],
                productOptions: [],
                subProductOptions: [],
                betTypeOptions: [],
                sitesOptions : []
            };
            const container = shallow(<FeedbackDetails />).instance();
            container.setState(state);

            // Act
            const actual = shallow(container.renderDropdownDetail(initData.feedback));

             //Assert
            expect(actual.find(MultipleSelect).length).toBe(5);
            expect(actual.find(Form.Control).length).toBe(2);
             
        });
    });
});