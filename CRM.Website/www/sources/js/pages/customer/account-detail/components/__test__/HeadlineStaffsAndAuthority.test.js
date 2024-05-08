import React from 'react';
import { shallow, mount } from 'enzyme';
import { HeadlineStaffsAndAuthority } from '../HeadlineStaffsAndAuthority';
import { toast } from 'react-toastify';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    FunctionKey,
    Policy,
    MaxHeightBodyTableHeadlineAccountShowFull,
    MaxHeightBodyTableHeadlineAccountHideInfo,
    MaxHeightBodyTableHeadlineAccountHidePic,
    MaxHeightBodyTableHeadlineAccountHideFull
} from '@jsroot/common/constants';
import LangHelper from '@jsroot/common/langHelper';


describe('HeadlineStaffsAndAuthority', () => {
    beforeEach(() => {
        const tabAuthority = document.createElement('div');
        tabAuthority.setAttribute('id', 'headline-staff-authority');
        document.body.appendChild(tabAuthority);
        const loadingProcess = document.createElement('div');
        loadingProcess.setAttribute('id', 'loadingProcess');
        document.body.appendChild(loadingProcess);
    });

    afterEach(() => {
        const tabAuthority = document.getElementById('headline-staff-authority');
        if (tabAuthority) {
            document.body.removeChild(tabAuthority);
        }
        jest.clearAllMocks();
    });


    const initProps = {
        customerId: 1,
        customerInfo: {
            titleId: 0,
            custId: 123,
            languages: []
        },
        settingCommunicationTool: [{
            settingValue: 'test',
            settingId: 1
        }],
        headlineStaffsAndAuthority: [],
        setErrors: jest.fn(),
        editCustomerInfoDetail: jest.fn(),
        getCustomerById: jest.fn(),
        getHeadlineStaffsAndAuthority: jest.fn(),
        getSettingStaffAndAuthority: jest.fn(),
        getSettingPicRole: jest.fn(),
        getPermission: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call necessary actions in componentDidMount', async () => {
            const wrapper = mount(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().getHeadlineStaffsAndAuthorityInfo = jest.fn();
            await wrapper.instance().componentDidMount();
            expect(initProps.getHeadlineStaffsAndAuthority).toHaveBeenCalledWith({ headlineID: initProps.customerInfo.custId });
            expect(initProps.getSettingStaffAndAuthority).toHaveBeenCalled();
            expect(initProps.getSettingPicRole).toHaveBeenCalled();
        });
    });

    describe('componentDidUpdate', () => {
        it('should call handleCustomDropdownTable when document.querySelector(".body-content") is not null', () => {
            const querySelectorMock = jest.fn().mockReturnValue(true);
            document.querySelector = querySelectorMock;

            const wrapper = mount(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().getHeadlineStaffsAndAuthorityInfo = jest.fn();
            wrapper.instance().handleComfirmChangeTab = jest.fn();
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            const instance = wrapper.instance();
            const spyHandleCustomDropdownTable = jest.spyOn(instance, 'handleCustomDropdownTable');

            instance.componentDidUpdate();

            expect(spyHandleCustomDropdownTable).toHaveBeenCalled();
        });
    });

    describe('getHeadlineStaffsAndAuthorityInfo', () => {
        it('should return empty array if input is empty', () => {
            const input = [];
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            const output = wrapper.instance().getHeadlineStaffsAndAuthorityInfo(input);
            expect(output).toEqual([]);
        });

        it('should return formatted data correctly', () => {
            const input = [
                {
                    rowID: 1,
                    picID: 1,
                    picName: 'John',
                    picRoleID: 1,
                    picRoleName: 'Manager',
                    picCommunicationID: 1,
                    picCommunicationName: 'Email',
                    picCommunicationValue: 'john@example.com',
                    authorityID: 1,
                    authority: 'Full Access',
                    remark: 'No remark',
                    isSyncFromPicTable: true,
                },
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            const output = wrapper.instance().getHeadlineStaffsAndAuthorityInfo(input);

            expect(output).toEqual([
                {
                    picID: 1,
                    picName: 'John',
                    picRoleID: 1,
                    picRoleName: 'Manager',
                    communicationTools: [
                        {
                            rowID: 1,
                            picCommunicationID: 1,
                            picCommunicationName: 'Email',
                            picCommunicationValue: 'john@example.com',
                            authorityID: 1,
                            authority: 'Full Access',
                            remark: 'No remark',
                            isErrorPicCommunication: false,
                            isErrorPicAuthorityID: false,
                        },
                    ],
                    isSyncFromPicTable: true,
                    isErrorPicName: false,
                    isErrorPicRoleID: false,
                    isEdit: false,
                },
            ]);
        });
    });

    describe('handleSubmit', () => {
        it('should call checkCustomerExistsOnCRM if validation passes', async () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn(() => null);
            const mockCheckCustomerExistsOnCRM = jest.fn();

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;
            wrapper.instance().checkCustomerExistsOnCRM = mockCheckCustomerExistsOnCRM;

            await wrapper.instance().handleSubmit(0);

            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalled();
            expect(mockCheckCustomerExistsOnCRM).toHaveBeenCalled();
        });

        it('should not call checkCustomerExistsOnCRM if validation fails', async () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn(() => ({ someError: 'Some error message' }));
            const mockCheckCustomerExistsOnCRM = jest.fn();

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;
            wrapper.instance().checkCustomerExistsOnCRM = mockCheckCustomerExistsOnCRM;

            await wrapper.instance().handleSubmit(0);

            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalled();
            expect(mockCheckCustomerExistsOnCRM).not.toHaveBeenCalled();
        });
    });

    describe('checkCustomerExistsOnCRM', () => {
        it('should call editHeadlineStaffAndAuthority if response data is 1', async () => {
            const mockEditHeadlineStaffAndAuthority = jest.fn();
            const mockResponseData = 1;

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.instance().editHeadlineStaffAndAuthority = mockEditHeadlineStaffAndAuthority;
            DataService.postDataAsync = jest.fn(() => Promise.resolve({ data: mockResponseData }));

            await wrapper.instance().checkCustomerExistsOnCRM();

            expect(DataService.postDataAsync).toHaveBeenCalledWith(
                expect.any(String),
                { customerId: initProps.customerInfo?.custId }
            );
            expect(mockEditHeadlineStaffAndAuthority).toHaveBeenCalled();
        });

        it('should call updateNewCrmCustomer if response data is not 1', async () => {
            const mockUpdateNewCrmCustomer = jest.fn();
            const mockResponseData = 0;

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.instance().updateNewCrmCustomer = mockUpdateNewCrmCustomer;
            DataService.postDataAsync = jest.fn(() => Promise.resolve({ data: mockResponseData }));

            await wrapper.instance().checkCustomerExistsOnCRM();

            expect(DataService.postDataAsync).toHaveBeenCalledWith(
                expect.any(String),
                { customerId: initProps.customerInfo?.custId }
            );
            expect(mockUpdateNewCrmCustomer).toHaveBeenCalled();
        });

        it('should handle errors gracefully', async () => {
            const mockHandleAxiosError = jest.fn();

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            Site.handleAxiosError = mockHandleAxiosError;
            DataService.postDataAsync = jest.fn(() => Promise.reject('Mock error'));

            await wrapper.instance().checkCustomerExistsOnCRM();

            expect(DataService.postDataAsync).toHaveBeenCalledWith(
                expect.any(String),
                { customerId: initProps.customerInfo?.custId }
            );
            expect(mockHandleAxiosError).toHaveBeenCalled();
        });
    });

    describe('getParamEdit', () => {
        it('should construct parameters correctly', () => {
            const headlineStaffsAndAuthority = [
                {
                    picID: 1,
                    picName: 'John Doe',
                    picRoleID: 2,
                    communicationTools: [
                        {
                            rowID: 1,
                            picCommunicationID: 3,
                            picCommunicationValue: 'Email',
                            authorityID: 4,
                            remark: 'Test remark',
                            isSyncFromPicTable: true
                        }
                    ]
                }
            ];

            const expectedResult = {
                headlineID: 123,
                headlineStaffsAndAuthority: [
                    {
                        rowID: 1,
                        headlineID: 123,
                        picID: 1,
                        picName: 'John Doe',
                        picRoleID: 2,
                        picCommunicationID: 3,
                        picCommunicationValue: 'Email',
                        authorityID: 4,
                        remark: 'Test remark',
                        isSyncFromPicTable: 0
                    }
                ]
            };
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({
                headlineStaffsAndAuthority: headlineStaffsAndAuthority
            });
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            const result = wrapper.instance().getParamEdit();

            expect(result).toEqual(expectedResult);
        });

        it('should handle empty state', () => {
            const expectedResult = {
                headlineID: 123,
                headlineStaffsAndAuthority: []
            };

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({
                headlineStaffsAndAuthority: []
            });
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            const result = wrapper.instance().getParamEdit();

            expect(result).toEqual(expectedResult);
        });
    });

    describe('editHeadlineStaffAndAuthority', () => {
        it('calls DataService.postDataAsync with correct parameters and updates state on successful response', async () => {
            const mockedParams = {};
            const mockedResponse = { data: { isSuccessful: true } };
            const mockedGetHeadlineStaffsAndAuthority = jest.fn().mockResolvedValueOnce(mockedResponse);

            const mockProps = {
                ...initProps,
                getHeadlineStaffsAndAuthority: mockedGetHeadlineStaffsAndAuthority
            };
            const mockGetParamEdit = jest.spyOn(HeadlineStaffsAndAuthority.prototype, 'getParamEdit').mockReturnValue(mockedParams);

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...mockProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            await wrapper.instance().editHeadlineStaffAndAuthority();

            expect(mockGetParamEdit).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalled();
            expect(mockedGetHeadlineStaffsAndAuthority).toHaveBeenCalledWith({ headlineID: 123 });
            expect(wrapper.state('headlineStaffsAndAuthority')).toEqual([]);
            expect(wrapper.state('isValidate')).toBe(false);
        });
    });

    describe('validateHeadlineStaffAndAuthority', () => {
        it('validates headline staff and authority data and updates state and errors', () => {
            const mockedState = {
                headlineStaffsAndAuthority: [
                    {
                        picName: 'John Doe',
                        picRoleID: 2,
                        communicationTools: [
                            {
                                picCommunicationID: 3,
                                picCommunicationValue: 'Email',
                                authorityID: 4,
                                remark: 'Some remark'
                            },
                        ]
                    },
                ],
            };

            const mockedSetErrors = jest.fn();

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState(mockedState);
            wrapper.setProps({ setErrors: mockedSetErrors });

            wrapper.instance().validateHeadlineStaffAndAuthority(0);

            const expectedState = {
                headlineStaffsAndAuthority: [
                    {
                        picName: 'John Doe',
                        picRoleID: 2,
                        communicationTools: [
                            {
                                picCommunicationID: 3,
                                picCommunicationValue: 'Email',
                                authorityID: 4,
                                remark: 'Some remark',
                                isErrorPicCommunication: false,
                                isErrorPicAuthorityID: false
                            },
                        ],
                        isErrorPicName: false,
                        isErrorPicRoleID: false
                    },
                ],
            };

            expect(wrapper.state('headlineStaffsAndAuthority')).toEqual(expectedState.headlineStaffsAndAuthority);
            expect(mockedSetErrors).toHaveBeenCalledWith(null);
        });
    });

    describe('handleShowConfirmDelete', () => {
        it('sets the state to show the confirmation modal with the specified name and index', () => {
            const mockedName = 'John Doe';
            const mockedIndexStaff = 0;

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.instance().handleShowConfirmDelete(mockedName, mockedIndexStaff);

            const expectedState = {
                showConfirmDelete: {
                    show: true,
                    name: mockedName,
                    indexStaff: mockedIndexStaff,
                },
            };

            expect(wrapper.state('showConfirmDelete')).toEqual(expectedState.showConfirmDelete);
        });
    });

    describe('handleShowConfirmClear', () => {
        it('sets the state to show the confirmation modal with the specified name and index', () => {
            const mockedName = 'John Doe';
            const mockedIndexStaff = 0;

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.instance().handleShowConfirmClear(mockedName, mockedIndexStaff);

            const expectedState = {
                showConfirmClear: {
                    show: true,
                    name: mockedName,
                    indexStaff: mockedIndexStaff,
                },
            };

            expect(wrapper.state('showConfirmClear')).toEqual(expectedState.showConfirmClear);
        });
    });

    describe('handleAddTool method', () => {
        it('adds a new tool correctly to the specified staff member\'s communication tools', () => {
            const mockedInitialState = {
                headlineStaffsAndAuthority: [
                    {
                        communicationTools: [
                        ]
                    },
                    {
                        communicationTools: [
                        ]
                    }
                ]
            };

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState(mockedInitialState);

            const indexStaff = 0;
            wrapper.instance().handleAddTool(indexStaff);

            const updatedState = wrapper.state();
            const updatedCommunicationTools = updatedState.headlineStaffsAndAuthority[indexStaff].communicationTools;
            expect(updatedCommunicationTools).toHaveLength(1);

            const newTool = updatedCommunicationTools[updatedCommunicationTools.length - 1];
            expect(newTool.rowID).toEqual(-1);
            expect(newTool.picCommunicationID).toEqual(0);
            expect(newTool.picCommunicationName).toBeNull();
            expect(newTool.picCommunicationValue).toBeNull();
            expect(newTool.authorityID).toEqual('');
            expect(newTool.authority).toEqual('');
            expect(newTool.remark).toEqual('');
        });
    });

    describe('handleDeleteTool method', () => {
        it('removes the specified tool from the communication tools of the specified staff member', () => {
            const mockedInitialState = {
                headlineStaffsAndAuthority: [
                    {
                        communicationTools: [
                            { rowID: 1, },
                            { rowID: 2, },
                            { rowID: 3, }
                        ]
                    },
                    {
                        communicationTools: [
                            { rowID: 4, },
                            { rowID: 5, }
                        ]
                    }
                ]
            };

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState(mockedInitialState);

            const indexCom = 1;
            const indexStaff = 0;
            wrapper.instance().handleDeleteTool(indexCom, indexStaff);

            const updatedState = wrapper.state();
            const updatedCommunicationTools = updatedState.headlineStaffsAndAuthority[indexStaff].communicationTools;
            expect(updatedCommunicationTools).toHaveLength(2);
            expect(updatedCommunicationTools.findIndex(tool => tool.rowID === indexCom)).toEqual(0);
        });
    });

    describe('buildHeader method', () => {
        it('generates the correct structure for the header row of the table', () => {
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineInfoPolicy: Policy.Host });

            const header = wrapper.instance().buildHeader();

            expect(header.props.children).toHaveLength(7);
            expect(header.props.children[0].props.children).toEqual(LangHelper.getResource('Name'));
            expect(header.props.children[1].props.children).toEqual(LangHelper.getResource('Role'));
            expect(header.props.children[2].props.children).toEqual(LangHelper.getResource('CommunicationTool'));
            expect(header.props.children[4].props.children).toEqual(LangHelper.getResource('Remark'));
            expect(header.props.children[5].props.children).toEqual(LangHelper.getResource('Action'));
        });
    });
});