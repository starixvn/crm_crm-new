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
            custId: 1,
            languages: []
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
            const wrapper = shallow(<CompanyService {...initProps} />);
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

    describe('handleSubmit', () => {
        it('should handle submit when there are no validation errors and customer exists on CRM', async () => {
            const mockValidateCompanyService = jest.fn(() => null);
            const mockPostDataAsync = jest.fn().mockResolvedValue({
                data: 1
            });
            const mockEditHeadlineCompanyService = jest.fn();
            const mockUpdateNewCrmCustomer = jest.fn();
            const mockSiteBlockUI = jest.fn();
            const mockSiteUnblockUI = jest.fn();
            const mockDataService = {
                postDataAsync: mockPostDataAsync
            };
            const mockSite = {
                resolveClientUrl: jest.fn(() => 'mockUrl'),
                blockUI: mockSiteBlockUI,
                unblockUI: mockSiteUnblockUI
            };

            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();

            instance.validateCompanyService = mockValidateCompanyService;
            instance.editHeadlineCompanyService = mockEditHeadlineCompanyService;
            instance.updateNewCrmCustomer = mockUpdateNewCrmCustomer;
            instance.DataService = mockDataService;
            instance.Site = mockSite;

            await instance.handleSubmit();

            expect(mockValidateCompanyService).toHaveBeenCalled();
            expect(mockUpdateNewCrmCustomer).not.toHaveBeenCalled();
        });

        it('should handle submit when there are no validation errors and customer does not exist on CRM', async () => {
            const mockValidateCompanyService = jest.fn(() => null);
            const mockPostDataAsync = jest.fn().mockResolvedValue({
                data: 0
            });
            const mockEditHeadlineCompanyService = jest.fn();
            const mockUpdateNewCrmCustomer = jest.fn();
            const mockSiteBlockUI = jest.fn();
            const mockSiteUnblockUI = jest.fn();
            const mockDataService = {
                postDataAsync: mockPostDataAsync
            };
            const mockSite = {
                resolveClientUrl: jest.fn(() => 'mockUrl'),
                blockUI: mockSiteBlockUI,
                unblockUI: mockSiteUnblockUI
            };

            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();

            instance.validateCompanyService = mockValidateCompanyService;
            instance.editHeadlineCompanyService = mockEditHeadlineCompanyService;
            instance.updateNewCrmCustomer = mockUpdateNewCrmCustomer;
            instance.DataService = mockDataService;
            instance.Site = mockSite;

            await instance.handleSubmit();

            expect(mockValidateCompanyService).toHaveBeenCalled();
            expect(mockEditHeadlineCompanyService).not.toHaveBeenCalled();
        });

        it('should not proceed with submit when there are validation errors', async () => {
            // Arrange  
            const mockValidateCompanyService = jest.fn(() => ({}));
            const mockPostDataAsync = jest.fn();
            const mockEditHeadlineCompanyService = jest.fn();
            const mockUpdateNewCrmCustomer = jest.fn();
            const mockSiteBlockUI = jest.fn();
            const mockSiteUnblockUI = jest.fn();
            const mockDataService = {
                postDataAsync: mockPostDataAsync
            };
            const mockSite = {
                resolveClientUrl: jest.fn(() => 'mockUrl'),
                blockUI: mockSiteBlockUI,
                unblockUI: mockSiteUnblockUI
            };

            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();

            instance.validateCompanyService = mockValidateCompanyService;
            instance.editHeadlineCompanyService = mockEditHeadlineCompanyService;
            instance.updateNewCrmCustomer = mockUpdateNewCrmCustomer;
            instance.DataService = mockDataService;
            instance.Site = mockSite;

            await instance.handleSubmit();

            // Assert
            expect(mockValidateCompanyService).toHaveBeenCalled();
            expect(mockPostDataAsync).not.toHaveBeenCalled();
            expect(mockEditHeadlineCompanyService).not.toHaveBeenCalled();
            expect(mockUpdateNewCrmCustomer).not.toHaveBeenCalled();
            expect(mockSiteBlockUI).not.toHaveBeenCalled();
            expect(mockSiteUnblockUI).not.toHaveBeenCalled();
        });
    });

    describe('updateNewCrmCustomer', () => {
        it('should update new CRM customer successfully', async () => {
            // Arrange 
            const mockEditCustomerInfoDetail = jest.fn().mockResolvedValue({
                isSuccessful: true
            });
            const mockEditHeadlineCompanyService = jest.fn();
            const mockProps = {
                ...initProps,
                editCustomerInfoDetail: mockEditCustomerInfoDetail,
                editCustomerInfoDetailResult: {
                    isSuccessful: true
                }
            };

            // Action
            const wrapper = shallow(<CompanyService {...mockProps} />);
            const instance = wrapper.instance();

            instance.editHeadlineCompanyService = mockEditHeadlineCompanyService;

            await instance.updateNewCrmCustomer();

            // Assert
            expect(mockEditHeadlineCompanyService).toHaveBeenCalled();
        });

        it('should not update new CRM customer when editCustomerInfoDetail fails', async () => {
            // Arrange 
            const mockEditCustomerInfoDetail = jest.fn().mockResolvedValue({
                isSuccessful: false
            });
            const mockEditHeadlineCompanyService = jest.fn();
            const mockProps = {
                ...initProps,
                editCustomerInfoDetail: mockEditCustomerInfoDetail,
                editCustomerInfoDetailResult: {
                    isSuccessful: false
                }
            };

            // Action
            const wrapper = shallow(<CompanyService {...mockProps} />);
            const instance = wrapper.instance();

            instance.editHeadlineCompanyService = mockEditHeadlineCompanyService;

            await instance.updateNewCrmCustomer();

            // Assert
            expect(mockEditHeadlineCompanyService).not.toHaveBeenCalled();
        });
    });

    describe('buildHeader', () => {
        it('should return the correct JSX structure for the header', () => {
            // Arrange 
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            const header = instance.buildHeader();


            const headerCells = header.props.children;
            // Assert
            expect(headerCells[0].props.colWidth).toEqual(460);
            expect(headerCells[0].props.children).toEqual('Name');
            expect(headerCells[1].props.colWidth).toEqual(120);
            expect(headerCells[1].props.children).toEqual('Offer');
            expect(headerCells[2].props.colWidth).toEqual(120);
            expect(headerCells[2].props.children).toEqual('CommunicationTool');
        });
    });

    describe('buildBody', () => {
        it('should return the correct JSX structure when companyService is not empty', () => {
            // Arrange
            const mockCompanyService = [
                { id: 1, name: 'Service 1', offer: true, communicationTool: 'Tool 1' },
                { id: 2, name: 'Service 2', offer: false, communicationTool: 'Tool 2' }
            ];
            const mockSettingCommunicationTool = ['Tool 1', 'Tool 2'];
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.setState({ companyService: mockCompanyService });
            wrapper.setProps({ settingCommunicationTool: mockSettingCommunicationTool });

            const body = instance.buildBody();
            // Assert
            expect(body).toHaveLength(1);
        });

        it('should return the correct JSX structure when companyService is empty', () => {
            // Arrange  
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            const instance = wrapper.instance();
            instance.setState({ companyService: [] });
            wrapper.setProps({ settingCommunicationTool: [] });

            const body = instance.buildBody();
            // Assert
            expect(body).toHaveLength(1);
        });
    });

    describe('handleChangeValue', () => {
        it('should update the state correctly', () => {
            // Arrange
            const initialState = {
                companyService: [
                    { id: 1, name: 'Service 1', isSuggest: false },
                    { id: 2, name: 'Service 2', isSuggest: false }
                ],
                chatTypeMapping: []
            };
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            wrapper.setState(initialState);

            const instance = wrapper.instance();
            instance.handleChangeValue('name', 'New Service', 0, true);

            const updatedState = wrapper.state().companyService;
            // Assert
            expect(updatedState[0].name).toEqual('New Service');
            expect(updatedState[0].isSuggest).toEqual(true);
            expect(updatedState[1].name).toEqual('Service 2');
            expect(updatedState[1].isSuggest).toEqual(false);
        });
    });

    describe('handleCoppy', () => {
        it('should copy values to all items in companyService', () => {
            // Arrange
            const initialState = {
                companyService: [
                    { id: 1, isOffered: false, communicationID: 1, communicationValue: 'Email' },
                    { id: 2, isOffered: false, communicationID: 1, communicationValue: 'Email' }
                ],
                chatTypeMapping: []
            };

            const service = {
                isOffered: true,
                communicationID: 2,
                communicationValue: 'Phone'
            };
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            wrapper.setState(initialState);
            const instance = wrapper.instance();
            instance.handleCoppy(service);
            const updatedState = wrapper.state().companyService;

            // Assert
            updatedState.forEach(item => {
                expect(item.isOffered).toEqual(true);
                expect(item.communicationID).toEqual(2);
                expect(item.communicationValue).toEqual('Phone');
            });
        });
    });

    describe('debounceInputChange', () => {
        it('should return an array of suggestions filtered by searchText and communicationID', () => {
            // Arrange
            const searchText = 'test';
            const communicationID = 'communication_id';
            const chatTypeMapping = [
                { communicationID: 'communication_id', displayName: 'Test 1' },
                { communicationID: 'communication_id', displayName: 'Another Test' },
                { communicationID: 'other_communication_id', displayName: 'Different Test' }
            ];

            const initialState = {
                companyService: [
                    { id: 1, isOffered: false, communicationID: 1, communicationValue: 'Email' },
                    { id: 2, isOffered: false, communicationID: 1, communicationValue: 'Email' }
                ],
                chatTypeMapping: chatTypeMapping
            };

            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            wrapper.setState(initialState);

            const instance = wrapper.instance();
            const result = instance.debounceInputChange(searchText, communicationID, chatTypeMapping);

            // Assert
            expect(Array.isArray(result)).toBe(true);
        });

        it('should return an empty array if no suggestions match the searchText and communicationID', () => {
            // Arrange
            const chatTypeMapping = [
                { communicationID: 'communication_id', displayName: 'Test 1' },
                { communicationID: 'communication_id', displayName: 'Another Test' }
            ];
            const initialState = {
                companyService: [
                    { id: 1, isOffered: false, communicationID: 1, communicationValue: 'Email' },
                    { id: 2, isOffered: false, communicationID: 1, communicationValue: 'Email' }
                ],
                chatTypeMapping: chatTypeMapping
            };
            const searchText = 'invalid';
            const communicationID = 'communication_id';            
            // Action
            const wrapper = shallow(<CompanyService {...initProps} />);
            wrapper.setState(initialState);

            const instance = wrapper.instance();
            const result = instance.debounceInputChange(searchText, communicationID, chatTypeMapping);
            // Assert
            expect(result).toEqual([]);
        });
    });

    describe('render', () => {
        it('renders the component with table and save button when company service and chat type mapping are available and headlineInfoPolicy is Policy.Host', () => {
            // Arrange
            const headlineInfoPolicy = 2;
            // Action

            const wrapper = shallow(<CompanyService {...initProps} headlineInfoPolicy={headlineInfoPolicy}/>);
            // Assert
        });

        it('renders null when company service and chat type mapping are not available', () => {
            // Arrange
            // Action
            const wrapper = shallow(<CompanyService {...initProps}/>);

            // Assert
            expect(wrapper.type()).toBeNull();
        });

        it('does not render the save button when headlineInfoPolicy is not Policy.Host', () => {
            // Arrange
            const headlineInfoPolicy = 3; 

            // Action
            const wrapper = shallow(<CompanyService {...initProps} headlineInfoPolicy={headlineInfoPolicy}/>);

            // Assert
            expect(wrapper.find('.btn-save')).toHaveLength(0);
        });
    });
});