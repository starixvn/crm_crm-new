import React from 'react';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import { DataGridCommunication } from '../DataGridCommunication';

describe('DataGridCommunication', () => {
    beforeAll(() => {
        window.createUpdateFeedbackPermission = 2;
        LangHelper.getResource = jest.fn(key => key);
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        getCommunicationLogs: jest.fn()
    };

    const initData = {
        log:{
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            relatedCustomers: [{ custId: 1, username: 'sa' }],
            resolutionDate: 'Aug 16, 2021 03:12:00 PM',
            responseId: 1,
            siteId: 1,
            statusId: 1,
            siteSetting: {name: 'test'},
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
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};
            
            const container = shallow(<DataGridCommunication {...props} />).instance();

            // Act
            container.componentDidMount();

            // Assert
            expect(props.getCommunicationLogs).toHaveBeenCalled();
        });
    });

    describe('componentDidUpdate', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {...initProps};
            const prevProps ={id:2};
            const container = shallow(<DataGridCommunication {...props} />).instance();

            // Act
            container.componentDidUpdate(prevProps);

            // Assert
            expect(props.getCommunicationLogs).toHaveBeenCalled();
        });
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const props = {...initProps};
            const container = shallow(<DataGridCommunication {...props} />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(10);
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                communicationLogs: { data: [] }
             };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={9}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGridCommunication {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            // Arrange
            const props = {
                ...initProps,
                communicationLogs: {
                    data: [{ id: 1, settings: [{settingId: 3000, subSettingId: 4000}], duration: '1 : 0'}],
                    mainCategories:[{ settingId: 3000, settingValue: 'test' ,childSettings:[{subCategoryId: 4000}] }]
                }
             };
            const container = shallow(<DataGridCommunication {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('handleShowEditCommunication', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                ...initProps,
                setEditCommunicationDialog: jest.fn()
            };
            const container = shallow(<DataGridCommunication {...props} />).instance();

            // Act
            container.handleShowEditCommunication(123);

            // Assert
            expect(props.setEditCommunicationDialog).toHaveBeenCalledWith({ show: true, id: 123 });
        });
    });

    describe('handleShowNoOfInquiry', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                ...initProps,
                setNoOfInquiryDialog: jest.fn()
            };
            const container = shallow(<DataGridCommunication {...props} />).instance();

            // Act
            container.handleShowNoOfInquiry(123);

            // Assert
            expect(props.setNoOfInquiryDialog).toHaveBeenCalledWith({ show: true, feedbackId: 123 });
        });
    });

    describe('handleShowCreateCommunication', () => {
        it('should call exactly props function', async () => {
            // Arrange
            const props = {
                ...initProps,
                setCreateCommunicationDialog: jest.fn()
            };
            const response = { data: {} };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const container = shallow(<DataGridCommunication {...props} />).instance();
            container.getOptions = jest.fn(() => response.data);

            // Act
            container.handleShowCreateCommunication(123);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.setCreateCommunicationDialog).toHaveBeenCalledWith({ show: true, options: {} });
        });
    });

    describe('getOptions', () => {
        it('should return exactly result', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGridCommunication {...props} />).instance();

            // Act
            const actual = container.getOptions(initData);

            // Assert
            expect(actual.betTypeIds).toEqual('9144');
        });
    });

    describe('getCreateLogSettings', () => {
        it('should return exactly result', () => {
            // Arrange
            const props = {...initProps};
            const expected = {
                betTypeIds: [9144], communicationToolIds: [1001], extensionIds: [2022],
                mainCategoryIds: [3020], productIds: [46000], subCategoryIds: [4029], subProductIds: [8063]
            };
            const container = shallow(<DataGridCommunication {...props} />).instance();

            // Act
            const actual = container.getCreateLogSettings(initData.log);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('handleGroupCategory', () => {
        it('should return exactly result', () => {
            // Arrange
            const props = {...initProps};
            const params = [
                { settingId: 3024, subSettingId: 4069 },
                { settingId: 3024, subSettingId: 4070 },
            ];
            const expected = [
                {settingId: 3024, subSettingId: [4069, 4070]}
            ];
            const container = shallow(<DataGridCommunication {...props} />).instance();

            // Act
            const actual = container.handleGroupCategory(params);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('renderRow', () => {
        it('should call handleShowEditCommunication when click feedbackId', () => {
            // Arrange
            const props = {
                ...initProps,
                communicationLogs: {
                    data: [{ id: 1, settings: [{ settingId: 3000, subSettingId: 4000 }], duration: '1 : 0'}],
                    mainCategories:[{ settingId: 3000, settingValue: 'test' ,childSettings:[{subCategoryId: 4000, name: 'test'}] }]
                }
            };
            const item = {
                feedbackId: 1234, subject: 'test', relatedCustomer: "test1,test2",
                duration: '1 : 0', status: 'closed', handler: 'sa', reviewer: 'test', settings: [{ settingId: 3000, subSettingId: 4000 }]
            };

            const container = shallow(<DataGridCommunication {...props} />).instance();
            container.handleShowEditCommunication = jest.fn();

            const row = shallow(container.renderRow(item,0));

            // Act
            row.find(Cell).at(0).find('span').at(0).simulate('click');

            // Assert
            expect(container.handleShowEditCommunication).toHaveBeenCalled();
        });

        it('should call handleShowCreateCommunication when click FeedbackId', () => {
            // Arrange
            const props = {
                ...initProps,
                communicationLogs: {
                    data: [{ id: 1, settings: [{ settingId: 3000, subSettingId: 4000 }], duration: '1 : 0'}],
                    mainCategories:[{ settingId: 3000, settingValue: 'test' ,childSettings:[{subCategoryId: 4000, name: 'test'}] }]
                }
            };
            const item = {
                feedbackId: 1234, subject: 'test', relatedCustomer: "test1,test2",
                duration: '1 : 0', status: 'closed', handler: 'sa', reviewer: 'test', settings: [{ settingId: 3000, subSettingId: 4000 }]
            };

            const container = shallow(<DataGridCommunication {...props} />).instance();
            container.handleShowCreateCommunication = jest.fn();

            const row = shallow(container.renderRow(item,0));

            // Act
            row.find(Button).at(0).simulate('click');

            // Assert
            expect(container.handleShowCreateCommunication).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                communicationLogs: null
            };
            const container = shallow(<DataGridCommunication {...props} />);

            //Assert
            expect(container.type()).toEqual(null);
        });
    });
});