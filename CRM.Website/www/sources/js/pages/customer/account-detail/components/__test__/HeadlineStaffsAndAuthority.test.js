import React from 'react';
import { shallow, mount } from 'enzyme';
import { HeadlineStaffsAndAuthority } from '../HeadlineStaffsAndAuthority';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import {
    Policy,
} from '@jsroot/common/constants';
import { Cell } from '@jsroot/components/react-grid/index';

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
        settingStaffAndAuthority: [
            {
                settingId: 1
            }
        ],
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
        });
    });

    describe('buildBody method', () => {
        it('generates the correct structure for the body of the table when data is present', () => {
            const mockHeadlineStaffsAndAuthority = [
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority });

            const body = wrapper.instance().buildBody();

            expect(body.length).toBeGreaterThan(0);

        });

        it('generates the correct structure for the body of the table when no data is present', () => {
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: [] });
            const body = wrapper.instance().buildBody();

            expect(body.length).toBe(1);
            expect(body[0].key).toBe('body-NoData');
            expect(body[0].props.children.type).toEqual(Cell);
            expect(body[0].props.children.props.className).toEqual('text-center');
        });
    });

    describe('handleChangeValue method', () => {
        it('updates the state with the provided name, value, and staffIndex', () => {
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });

            const name = 'picName';
            const value = 'John Doe';
            const staffIndex = 0;

            wrapper.instance().handleChangeValue(name, value, staffIndex);

            const updatedState = wrapper.state();

            expect(updatedState.headlineStaffsAndAuthority[staffIndex][name]).toEqual(value);
        });

        it('calls validateHeadlineStaffAndAuthority if isValidate is true', () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn();
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });

            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;

            const name = 'picName';
            const value = 'John Doe';
            const staffIndex = 0;

            wrapper.instance().handleChangeValue(name, value, staffIndex);

            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalledWith(staffIndex);
        });
    });

    describe('handleChangeRole method', () => {
        it('updates the state with the provided value and staffIndex', () => {
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const mockSettingPicRole = [
                {
                    settingId: 1
                }
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });
            wrapper.setProps({ settingPicRole: mockSettingPicRole });

            const value = 1;
            const staffIndex = 0;

            wrapper.instance().handleChangeRole(value, staffIndex);

            const updatedState = wrapper.state();

            expect(updatedState.headlineStaffsAndAuthority[staffIndex].picRoleID).toEqual(value);
            expect(updatedState.headlineStaffsAndAuthority[staffIndex].picRoleName).toEqual(mockSettingPicRole.find(x => x.settingId === value).settingValue);
        });

        it('calls validateHeadlineStaffAndAuthority if isValidate is true', () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn();
            const mockHeadlineStaffsAndAuthority = [
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
            ];
            const mockSettingPicRole = [
                {
                    settingId: 1
                }
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });
            wrapper.setProps({ settingPicRole: mockSettingPicRole });

            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;

            const value = 1;
            const staffIndex = 0;

            wrapper.instance().handleChangeRole(value, staffIndex);
            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalledWith(staffIndex);
        });
    });

    describe('handleChangeCommunicationID method', () => {
        it('updates the state with the provided value, indexPicCommunicationTool, and staffIndex', () => {
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const mockSettingCommunicationTool = [
                {
                    settingId: 1
                }
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });
            wrapper.setProps({ settingCommunicationTool: mockSettingCommunicationTool });

            const value = 1;
            const indexPicCommunicationTool = 0;
            const staffIndex = 0;

            wrapper.instance().handleChangeCommunicationID(value, indexPicCommunicationTool, staffIndex);

            const updatedState = wrapper.state();

            expect(updatedState.headlineStaffsAndAuthority[staffIndex].communicationTools[indexPicCommunicationTool].picCommunicationID).toEqual(value);
            expect(updatedState.headlineStaffsAndAuthority[staffIndex].communicationTools[indexPicCommunicationTool].picCommunicationName).toEqual(mockSettingCommunicationTool.find(x => x.settingId === value).settingValue);
        });

        it('calls validateHeadlineStaffAndAuthority if isValidate is true', () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn();
            const mockHeadlineStaffsAndAuthority = [
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
            ];
            const mockSettingCommunicationTool = [
                {
                    settingId: 1
                }
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });
            wrapper.setProps({ settingCommunicationTool: mockSettingCommunicationTool });

            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;

            const value = 1;
            const indexPicCommunicationTool = 0;
            const staffIndex = 0;

            wrapper.instance().handleChangeCommunicationID(value, indexPicCommunicationTool, staffIndex);

            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalledWith(staffIndex);
        });
    });

    describe('handleChangeAuthorityID method', () => {
        it('updates the state with the provided value, indexPicCommunicationTool, and indexStaff', () => {
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const mockSettingStaffAndAuthority = [
                {
                    settingId: 1
                }
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });
            wrapper.setProps({ settingStaffAndAuthority: mockSettingStaffAndAuthority });

            const value = [1];
            const indexPicCommunicationTool = 0;
            const indexStaff = 0;

            wrapper.instance().handleChangeAuthorityID(value, indexPicCommunicationTool, indexStaff);

            const updatedState = wrapper.state();

            expect(updatedState.headlineStaffsAndAuthority[indexStaff].communicationTools[indexPicCommunicationTool].authorityID).toEqual(value);

            const authorityTool = mockSettingStaffAndAuthority.find(x => value.includes(x.settingId.toString()));
            expect(updatedState.headlineStaffsAndAuthority[indexStaff].communicationTools[indexPicCommunicationTool].authority).toEqual(authorityTool ? authorityTool.settingValue : '');
        });

        it('calls validateHeadlineStaffAndAuthority if isValidate is true', () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn();
            const mockHeadlineStaffsAndAuthority = [
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
            ];
            const mockSettingStaffAndAuthority = [
                {
                    settingId: 1
                }
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });
            wrapper.setProps({ settingStaffAndAuthority: mockSettingStaffAndAuthority });

            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;

            const value = [1];
            const indexPicCommunicationTool = 0;
            const indexStaff = 0;

            wrapper.instance().handleChangeAuthorityID(value, indexPicCommunicationTool, indexStaff);

            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalledWith(indexStaff);
        });
    });

    describe('handleChangeCommunicationValue method', () => {
        it('updates the state with the provided value, name, indexPicCommunicationTool, and staffIndex', () => {
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });

            const name = 'picCommunicationValue';
            const value = 'New communication value';
            const indexPicCommunicationTool = 0;
            const staffIndex = 0;

            wrapper.instance().handleChangeCommunicationValue(name, value, indexPicCommunicationTool, staffIndex);

            const updatedState = wrapper.state();

            expect(updatedState.headlineStaffsAndAuthority[staffIndex].communicationTools[indexPicCommunicationTool][name]).toEqual(value);
        });

        it('calls validateHeadlineStaffAndAuthority if isValidate is true', () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn();
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });
            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;

            const name = 'picCommunicationValue';
            const value = 'New communication value';
            const indexPicCommunicationTool = 0;
            const staffIndex = 0;

            wrapper.instance().handleChangeCommunicationValue(name, value, indexPicCommunicationTool, staffIndex);
            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalledWith(staffIndex);
        });
    });

    describe('handleChangeAuthorityID method', () => {
        it('updates the state with the provided value, indexPicCommunicationTool, and indexStaff', () => {
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });

            const value = [1, 2, 3];
            const indexPicCommunicationTool = 0;
            const indexStaff = 0;

            wrapper.instance().handleChangeAuthorityID(value, indexPicCommunicationTool, indexStaff);

            const updatedState = wrapper.state();

            expect(updatedState.headlineStaffsAndAuthority[indexStaff].communicationTools[indexPicCommunicationTool].authorityID).toEqual(value);
        });

        it('calls validateHeadlineStaffAndAuthority if isValidate is true', () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn();
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });

            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;

            const value = [1, 2, 3];
            const indexPicCommunicationTool = 0;
            const indexStaff = 0;

            wrapper.instance().handleChangeAuthorityID(value, indexPicCommunicationTool, indexStaff);

            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalledWith(indexStaff);
        });
    });

    describe('handleChangeCommunicationValue method', () => {
        it('updates the state with the provided value, name, indexPicCommunicationTool, and staffIndex', () => {
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });

            const name = 'communicationValue';
            const value = 'New Value';
            const indexPicCommunicationTool = 0;
            const staffIndex = 0;

            wrapper.instance().handleChangeCommunicationValue(name, value, indexPicCommunicationTool, staffIndex);

            const updatedState = wrapper.state();

            expect(updatedState.headlineStaffsAndAuthority[staffIndex].communicationTools[indexPicCommunicationTool][name]).toEqual(value);
        });

        it('calls validateHeadlineStaffAndAuthority if isValidate is true', () => {
            const mockValidateHeadlineStaffAndAuthority = jest.fn();
            const mockHeadlineStaffsAndAuthority = [
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
            ];

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState({ headlineStaffsAndAuthority: mockHeadlineStaffsAndAuthority, isValidate: true });

            wrapper.instance().validateHeadlineStaffAndAuthority = mockValidateHeadlineStaffAndAuthority;

            const name = 'communicationValue';
            const value = 'New Value';
            const indexPicCommunicationTool = 0;
            const staffIndex = 0;

            wrapper.instance().handleChangeCommunicationValue(name, value, indexPicCommunicationTool, staffIndex);

            expect(mockValidateHeadlineStaffAndAuthority).toHaveBeenCalledWith(staffIndex);
        });
    });

    describe('renderEditRow method', () => {
        it('renders the edit row correctly', () => {
            const settingStaffAndAuthority = [
                { settingId: 1, settingValue: 'Authority 1' },
                { settingId: 2, settingValue: 'Authority 2' },
            ];
            const settingPicRole = [
                { settingId: 1, settingValue: 'Role 1' },
                { settingId: 2, settingValue: 'Role 2' },
            ];
            const settingCommunicationTool = [
                { settingId: 1, settingValue: 'Communication Tool 1' },
                { settingId: 2, settingValue: 'Communication Tool 2' },
            ];
            const staff = {
                picName: 'John Doe',
                picRoleID: 1,
                picRoleName: 'Role 1',
                communicationTools: [
                    {
                        rowID: 1,
                        picCommunicationID: 1,
                        picCommunicationName: 'Communication Tool 1',
                        picCommunicationValue: 'Value 1',
                        authorityID: '1',
                        authority: 'Authority 1',
                        remark: 'Remark 1',
                        isErrorPicCommunication: false,
                        isErrorPicAuthorityID: false,
                    },
                ],
                isSyncFromPicTable: false,
                isErrorPicName: false,
                isErrorPicRoleID: false,
                isEdit: true,
            };
            const indexStaff = 0;

            const props = {
                ...initProps,
                settingStaffAndAuthority: settingStaffAndAuthority,
                settingPicRole: settingPicRole,
                settingCommunicationTool: settingCommunicationTool
            }

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...props} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();

            wrapper.setState({ headlineInfoPolicy: 'some_policy' });

            const editRow = wrapper.instance().renderEditRow(staff, indexStaff);

            expect(editRow.props.children).toHaveLength(2);
        });
    });

    describe('getOriginalStaffAndAuthority function', () => {
        it('returns the original staff and authority correctly', () => {
            const value = {
                picID: 1,
                picName: 'John Doe',
                picRoleID: 1,
                picRoleName: 'Role 1',
                communicationTools: [
                    {
                        rowID: 1,
                        picCommunicationID: 1,
                        picCommunicationName: 'Communication Tool 1',
                        picCommunicationValue: 'Value 1',
                        authorityID: '1',
                        authority: 'Authority 1',
                        remark: 'Remark 1',
                        isErrorPicCommunication: false,
                        isErrorPicAuthorityID: false,
                    },
                ],
                isSyncFromPicTable: false,
                isErrorPicName: false,
                isErrorPicRoleID: false,
                isEdit: false,
            };

            const expectedOriginalStaffAndAuthority = {
                picID: 1,
                picName: 'John Doe',
                picRoleID: 1,
                picRoleName: 'Role 1',
                communicationTools: [
                    {
                        rowID: 1,
                        picCommunicationID: 1,
                        picCommunicationName: 'Communication Tool 1',
                        picCommunicationValue: 'Value 1',
                        authorityID: '1',
                        authority: 'Authority 1',
                        remark: 'Remark 1',
                        isErrorPicCommunication: false,
                        isErrorPicAuthorityID: false,
                    },
                ],
                isSyncFromPicTable: false,
                isErrorPicName: false,
                isErrorPicRoleID: false,
                isEdit: false,
            };

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            const result = wrapper.instance().getOriginalStaffAndAuthority(value);

            expect(result).toEqual(expectedOriginalStaffAndAuthority);
        });
    });

    describe('handleEdit', () => {
        it('edits a staff and updates state correctly', () => {
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();

            const initialState = {
                headlineStaffsAndAuthority: [
                    {
                        picID: 1,
                        picName: 'Staff Name',
                        picRoleID: 1,
                        picRoleName: 'Role Name',
                        communicationTools: [
                            {
                                rowID: 1,
                                picCommunicationID: 1,
                                picCommunicationName: 'Communication Tool 1',
                                picCommunicationValue: 'Value 1',
                                authorityID: '1',
                                authority: 'Authority 1',
                                remark: 'Remark 1',
                                isErrorPicCommunication: false,
                                isErrorPicAuthorityID: false,
                            },
                        ],
                        isSyncFromPicTable: false,
                        isErrorPicName: false,
                        isErrorPicRoleID: false,
                        isEdit: false,
                    },
                ],
            };

            wrapper.setState(initialState);

            wrapper.instance().handleEdit(0);

            expect(wrapper.state('headlineStaffsAndAuthority')[0].isEdit).toBe(true);
            expect(wrapper.state('originalStaffAndAuthority')).toEqual({
                picID: 1,
                picName: 'Staff Name',
                picRoleID: 1,
                picRoleName: 'Role Name',
                communicationTools: [
                    {
                        rowID: 1,
                        picCommunicationID: 1,
                        picCommunicationName: 'Communication Tool 1',
                        picCommunicationValue: 'Value 1',
                        authorityID: '1',
                        authority: 'Authority 1',
                        remark: 'Remark 1',
                        isErrorPicCommunication: false,
                        isErrorPicAuthorityID: false,
                    },
                ],
                isSyncFromPicTable: false,
                isErrorPicName: false,
                isErrorPicRoleID: false,
                isEdit: false,
            });
        });
    });

    describe('handleCancel', () => {
        it('cancels editing a staff and updates state correctly', () => {
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();

            const initialState = {
                headlineStaffsAndAuthority: [
                    {
                        picID: 1,
                        picName: 'Staff Name',
                        picRoleID: 1,
                        picRoleName: 'Role Name',
                        communicationTools: [
                            {
                                rowID: 1,
                                picCommunicationID: 1,
                                picCommunicationName: 'Communication Tool 1',
                                picCommunicationValue: 'Value 1',
                                authorityID: '1',
                                authority: 'Authority 1',
                                remark: 'Remark 1',
                                isErrorPicCommunication: false,
                                isErrorPicAuthorityID: false,
                            },
                        ],
                        isSyncFromPicTable: false,
                        isErrorPicName: false,
                        isErrorPicRoleID: false,
                        isEdit: true,
                    },
                ],
                originalStaffAndAuthority: {
                    picID: 1,
                    picName: 'Staff Name',
                    picRoleID: 1,
                    picRoleName: 'Role Name',
                    communicationTools: [
                        {
                            rowID: 1,
                            picCommunicationID: 1,
                            picCommunicationName: 'Communication Tool 1',
                            picCommunicationValue: 'Value 1',
                            authorityID: '1',
                            authority: 'Authority 1',
                            remark: 'Remark 1',
                            isErrorPicCommunication: false,
                            isErrorPicAuthorityID: false,
                        },
                    ],
                    isSyncFromPicTable: false,
                    isErrorPicName: false,
                    isErrorPicRoleID: false,
                    isEdit: false,
                },
            };

            wrapper.setState(initialState);

            wrapper.instance().handleCancel(0);

            expect(wrapper.state('headlineStaffsAndAuthority')[0].isEdit).toBe(false);
            expect(wrapper.state('originalStaffAndAuthority')).toBe(null);
        });

        it('cancels editing a staff and updates state correctly with originalStaffAndAuthority null', () => {
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();

            const initialState = {
                headlineStaffsAndAuthority: [
                    {
                        picID: 1,
                        picName: 'Staff Name',
                        picRoleID: 1,
                        picRoleName: 'Role Name',
                        communicationTools: [
                            {
                                rowID: 1,
                                picCommunicationID: 1,
                                picCommunicationName: 'Communication Tool 1',
                                picCommunicationValue: 'Value 1',
                                authorityID: '1',
                                authority: 'Authority 1',
                                remark: 'Remark 1',
                                isErrorPicCommunication: false,
                                isErrorPicAuthorityID: false,
                            },
                        ],
                        isSyncFromPicTable: false,
                        isErrorPicName: false,
                        isErrorPicRoleID: false,
                        isEdit: true,
                    },
                ]
            };

            wrapper.setState(initialState);

            wrapper.instance().handleCancel(0);

            expect(wrapper.state.headlineStaffsAndAuthority).toEqual(undefined);
        });
    });

    describe('handleDelete', () => {
        it('deletes a staff and updates state correctly', async () => {
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();

            const initialState = {
                headlineStaffsAndAuthority: [
                    {},
                    {},
                    {},
                ],
                showConfirmDelete: {
                    show: true,
                    name: 'Staff Name to delete',
                    indexStaff: 1,
                },
            };

            wrapper.setState(initialState);

            const setStateMock = jest.spyOn(wrapper.instance(), 'setState');
            const checkCustomerExistsOnCRMMock = jest.spyOn(wrapper.instance(), 'checkCustomerExistsOnCRM').mockResolvedValue();

            await wrapper.instance().handleDelete(1);

            expect(setStateMock).toHaveBeenCalledWith({
                headlineStaffsAndAuthority: [
                    {},
                    {},
                ],
                showConfirmDelete: {
                    show: false,
                    name: '',
                    indexStaff: -1,
                },
            });

            expect(checkCustomerExistsOnCRMMock).toHaveBeenCalled();
        });
    });

    describe('renderRow', () => {
        it('renders a row with staff authority correctly', () => {
            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();

            const settingStaffAndAuthority = [
                { settingValue: 'Authority 1' },
                { settingValue: 'Authority 2' },
            ];

            const item = {
                rowID: 1,
                picName: 'John Doe',
                picRoleName: 'Role Name',
                communicationTools: [
                    {
                        picCommunicationName: 'Communication Tool 1',
                        picCommunicationValue: 'Value 1',
                        authority: 'Authority 1,Authority 2',
                        remark: 'Remark 1',
                    },
                    {
                        picCommunicationName: 'Communication Tool 2',
                        picCommunicationValue: 'Value 2',
                        authority: 'Authority 1',
                        remark: 'Remark 2',
                    },
                ],
            };

            wrapper.setProps({ settingStaffAndAuthority });

            const row = wrapper.instance().renderRow(item, 0);

            expect(row.props.children).toHaveLength(2);
        });
    });

    describe('handleClear', () => {
        it('clears communication tools and remarks when called', async () => {
            const initialState = {
                headlineStaffsAndAuthority: [
                    {
                        communicationTools: [
                            { remark: 'Remark 1', authority: 'Authority 1' },
                            { remark: 'Remark 2', authority: 'Authority 2' },
                        ],
                    },
                ],
                showConfirmClear: {
                    show: true,
                    name: 'John Doe',
                    indexStaff: 0,
                },
            };

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().checkCustomerExistsOnCRM = jest.fn();
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState(initialState);

            await wrapper.instance().handleClear(0);

            expect(wrapper.instance().handleCustomDropdownTable).toHaveBeenCalled();
        });
    });

    describe('handleAddNewRow', () => {
        it('adds a new row when called', () => {
            const initialState = {
                headlineStaffsAndAuthority: [
                    {
                        picID: 1,
                        picName: 'John Doe',
                        picRoleID: 2,
                        picRoleName: 'Manager',
                        communicationTools: [
                            {
                                rowID: 1,
                                picCommunicationID: 3,
                                picCommunicationName: 'Email',
                                picCommunicationValue: 'john@example.com',
                                authorityID: '1',
                                authority: 'Full Access',
                                remark: 'Test remark',
                                isErrorPicCommunication: false,
                                isErrorPicAuthorityID: false,
                            },
                        ],
                        isSyncFromPicTable: false,
                        isErrorPicName: false,
                        isErrorPicRoleID: false,
                        isEdit: false,
                    },
                ],
                originalStaffAndAuthority: null,
            };

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState(initialState);

            wrapper.instance().handleAddNewRow();

            expect(wrapper.state('headlineStaffsAndAuthority')).toHaveLength(2);
            expect(wrapper.state('headlineStaffsAndAuthority')[1].picID).toEqual(0);
            expect(wrapper.state('headlineStaffsAndAuthority')[1].picName).toBeNull();
        });

        it('adds a new row when called with authority editing have originalStaffAndAuthority', () => {
            const initialState = {
                headlineStaffsAndAuthority: [
                    {
                        picID: 1,
                        picName: 'John Doe',
                        picRoleID: 2,
                        picRoleName: 'Manager',
                        communicationTools: [
                            {
                                rowID: 1,
                                picCommunicationID: 3,
                                picCommunicationName: 'Email',
                                picCommunicationValue: 'john@example.com',
                                authorityID: '1',
                                authority: 'Full Access',
                                remark: 'Test remark',
                                isErrorPicCommunication: false,
                                isErrorPicAuthorityID: false,
                            },
                        ],
                        isSyncFromPicTable: false,
                        isErrorPicName: false,
                        isErrorPicRoleID: false,
                        isEdit: true,
                    },
                ],
                originalStaffAndAuthority: {
                        picID: 1,
                        picName: 'John Doe',
                        picRoleID: 2,
                        picRoleName: 'Manager',
                        communicationTools: [
                            {
                                rowID: 1,
                                picCommunicationID: 3,
                                picCommunicationName: 'Email',
                                picCommunicationValue: 'john@example.com',
                                authorityID: '1',
                                authority: 'Full Access',
                                remark: 'Test remark',
                                isErrorPicCommunication: false,
                                isErrorPicAuthorityID: false,
                            },
                        ],
                        isSyncFromPicTable: false,
                        isErrorPicName: false,
                        isErrorPicRoleID: false,
                        isEdit: true,
                    },
            };

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState(initialState);

            wrapper.instance().handleAddNewRow();

            expect(wrapper.state('headlineStaffsAndAuthority')).toHaveLength(2);
            expect(wrapper.state('headlineStaffsAndAuthority')[1].picID).toEqual(0);
            expect(wrapper.state('headlineStaffsAndAuthority')[1].picName).toBeNull();
        });

        it('adds a new row when called with authority editing have not originalStaffAndAuthority', () => {
            const initialState = {
                headlineStaffsAndAuthority: [
                    {
                        picID: 1,
                        picName: 'John Doe',
                        picRoleID: 2,
                        picRoleName: 'Manager',
                        communicationTools: [
                            {
                                rowID: 1,
                                picCommunicationID: 3,
                                picCommunicationName: 'Email',
                                picCommunicationValue: 'john@example.com',
                                authorityID: '1',
                                authority: 'Full Access',
                                remark: 'Test remark',
                                isErrorPicCommunication: false,
                                isErrorPicAuthorityID: false,
                            },
                        ],
                        isSyncFromPicTable: false,
                        isErrorPicName: false,
                        isErrorPicRoleID: false,
                        isEdit: true,
                    },
                ],
                originalStaffAndAuthority: null
            };

            const wrapper = shallow(<HeadlineStaffsAndAuthority {...initProps} />);
            wrapper.instance().handleCustomDropdownTable = jest.fn();
            wrapper.setState(initialState);

            wrapper.instance().handleAddNewRow();

            expect(wrapper.state('headlineStaffsAndAuthority')).toHaveLength(1);
        });
    });
});