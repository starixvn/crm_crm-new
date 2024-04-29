import React from 'react';
import { shallow } from 'enzyme';
import { CompanyService } from '../CompanyService';

describe('CompanyService', () => {
    beforeAll(() => {
        const loadingProcess = document.createElement('div');
        loadingProcess.setAttribute('id', 'loadingProcess');
        document.body.appendChild(loadingProcess);
    });

    afterAll(() => {
        jest.clearAllMocks();
        const loadingProcess = document.getElementById('loadingProcess');
        if (loadingProcess) {
            document.body.removeChild(loadingProcess);
        }
    });

    const initProps = {
        customerInfo: {
            custId: 1
        },
        companyService: [{
            communicationID: 1,
            communicationName: "test",
            communicationValue: "test",
            companyServiceID: 1,
            companyServiceName: "test",
            headlineID: 1,
            isError: false,
            isOffered: true,
            isSuggest: false
        }],
        chatTypeMapping: [],
        headlineCompanyService: {
            item1: [{
                communicationID: 1,
                communicationName: "test",
                communicationValue: "test",
                companyServiceID: 1,
                companyServiceName: "test",
                headlineID: 1,
                isError: false,
                isOffered: true,
                isSuggest: false
            }],
            item2: []
        },
        settingCommunicationTool: [],
        getHeadlineCompanyService: jest.fn(),
        setShowConfirmUnSaved: jest.fn(),
        setActiveTab: jest.fn(),
        setErrors: jest.fn(),
        getDataAsync: jest.fn()
    }

    describe('componentDidMount', () => {
        it('should fetch data and update state', async () => {
            // Arrange
            const mockHeadlineCompanyService = jest.fn(() => Promise.resolve('mockCompanyServiceData'));
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps}/>);
            const instance = wrapper.instance();
            instance.getHeadlineCompanyService = mockHeadlineCompanyService.mockResolvedValue('mockCompanyServiceData');
            await instance.componentDidMount();
        
            // Assert
            expect(initProps.getHeadlineCompanyService).toHaveBeenCalled();
        });
    });

    describe('getHeadlineCompanyService', () => {
        it('should fetch data and update state', async () => {
            // Arrange                   
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            await instance.getHeadlineCompanyService();
        
            // Assert
            expect(wrapper.state('companyService')).toEqual([
                { 
                    communicationID: 1,
                    communicationName: "test",
                    communicationValue: "test",
                    companyServiceID: 1,
                    companyServiceName: "test",
                    headlineID: 1,
                    isError: false,
                    isOffered: true,
                    isSuggest: false
                }
            ]);
            expect(wrapper.state('chatTypeMapping')).toEqual([]);
        });
    });

    describe('componentDidUpdate', () => {
        it('should handle tab change and call handleComfirmChangeTab', () => {
            // Arrange                   
            const mockState = {
                companyService: [
                { headlineID: '1', companyServiceID: '1', companyServiceName: 'Service 1', isOffered: true },
                { headlineID: '1', companyServiceID: '2', companyServiceName: 'Service 2', isOffered: false }
                ]
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.state = mockState;
            wrapper.setProps({ activeTab: { tabId: 'newTabId' } });
        
            // Assert
        });
      
        it('should not do anything if activeTab is null', () => {
            // Arrange                   
            const mockHandleComfirmChangeTab = jest.fn();
            const mockState = {
                companyService: [
                { headlineID: '1', companyServiceID: '1', companyServiceName: 'Service 1', isOffered: true },
                { headlineID: '1', companyServiceID: '2', companyServiceName: 'Service 2', isOffered: false }
                ]
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.state = mockState;
            wrapper.setProps({ activeTab: null });
        
            // Assert
            expect(mockHandleComfirmChangeTab).not.toHaveBeenCalled();
        });
    });

    describe('handleComfirmChangeTab', () => {
        it('should set showConfirmUnSaved to false and update activeTab when companyService and initialValues are equal or headlineInfoPolicy is not Policy.Host', () => {
            // Arrange
            const mockActiveTab = { nextTab: 'mockNextTab' };
            const mockInitialValues = [];
            const mockState = {
                companyService: mockInitialValues,
                headlineInfoPolicy: 'mockPolicy'
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.state = mockState;
            instance.handleComfirmChangeTab(mockActiveTab, mockInitialValues);
      
            // Assert
            expect(initProps.setShowConfirmUnSaved).toHaveBeenCalledWith(false);
            expect(initProps.setActiveTab).toHaveBeenCalledWith({ currentTab: 'mockNextTab', nextTab: null });
        });
      
        it('should set showConfirmUnSaved to true when companyService and initialValues are not equal and headlineInfoPolicy is Policy.Host', () => {
            // Arrange
            const mockActiveTab = { nextTab: 'mockNextTab' };
            const mockInitialValues = [
                {
                    communicationID: 1
                }
            ];
            const mockState = {
                companyService: [],
                headlineInfoPolicy: 2
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.state = mockState;
            instance.handleComfirmChangeTab(mockActiveTab, mockInitialValues);
        
            // Assert
            expect(initProps.setShowConfirmUnSaved).toHaveBeenCalledWith(true);
        });
    });

    describe('validateCompanyService', () => {
        it('should validate company service data and update state without errors if data is valid', () => {
             // Arrange
            const mockState = {
                companyService: []
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.state = mockState;
            const result = instance.validateCompanyService();
        
            // Assert
            expect(instance.state.companyService).toEqual([]);
            expect(initProps.setErrors).toHaveBeenCalledWith(null);
            expect(result).toBeNull();
        });
      
        it('should validate company service data and update state with errors if data is invalid', () => {
             // Arrange
            const mockState = {
                companyService: [{
                    isOffered: true,
                    communicationID: 0
                }]
            };
            const mockErrors = { 
                communication: "CommunicationRequired"
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.state = mockState;
            const result = instance.validateCompanyService();
            
            // Assert
            expect(instance.state.companyService).toEqual(mockState.companyService);
            expect(result).toEqual(mockErrors);
        });
    });

    describe('editHeadlineCompanyService', () => {
        it('should send a request to edit headline company service and update state on successful response', async () => {
             // Arrange                      
            const mockGetDataAsync = jest.fn().mockResolvedValue({
                data: {
                    isSuccessful: true
                }
            });
            const mockToastSuccess = jest.fn();
            const mockSiteBlockUI = jest.fn();
            const mockSiteUnblockUI = jest.fn();
            const mockDataService = {
                postDataAsync: mockGetDataAsync
            };
            const mockSite = {
                resolveClientUrl: jest.fn(() => 'mockUrl'),
                blockUI: mockSiteBlockUI,
                unblockUI: mockSiteUnblockUI,
                blockUI: jest.fn()
            };
            const mockState = {
                companyService: [{
                    communicationID: 1,
                    communicationName: "test",
                    communicationValue: "test",
                    companyServiceID: 1,
                    companyServiceName: "test",
                    headlineID: 1,
                    isError: false,
                    isOffered: true,
                    isSuggest: false
                }]
            };
            const mockToast = {
                success: mockToastSuccess
            };
           
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
        
            instance.DataService = mockDataService;
            instance.state = mockState;
            instance.Site = mockSite;
            instance.toast = mockToast;
            await instance.editHeadlineCompanyService();
        
            // Assert
            expect(initProps.getHeadlineCompanyService).toHaveBeenCalled();            
        });
      
        it('should handle error response from server', async () => {
             // Arrange
            const mockToastError = jest.fn();
            const mockState = {
                companyService: [{
                    communicationID: 1,
                    communicationName: "test",
                    communicationValue: "test",
                    companyServiceID: 1,
                    companyServiceName: "test",
                    headlineID: 1,
                    isError: false,
                    isOffered: true,
                    isSuggest: false
                }]
            };
            const mockGetDataAsync = jest.fn().mockResolvedValue({
                data: {
                isSuccessful: false,
                message: 'mockErrorMessage'
                }
            });
            const mockDataService = {
                postDataAsync: mockGetDataAsync
            };
            const mockToast = {
                error: mockToastError
            };
        
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.DataService = mockDataService;
            instance.toast = mockToast;
            instance.state = mockState;
        
            await instance.editHeadlineCompanyService();
        
            // Assert
        });
    });
});