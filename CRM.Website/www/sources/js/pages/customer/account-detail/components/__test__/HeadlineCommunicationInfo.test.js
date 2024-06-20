import React from 'react';
import { shallow, mount } from 'enzyme';
import { HeadlineCommunicationInfo } from '../HeadlineCommunicationInfo';
import { toast } from 'react-toastify';
import DataService from '@jsroot/common/dataService';
import LangHelper from '@jsroot/common/langHelper';

describe('HeadlineCommunicationInfo', () => {
    beforeEach(() => {
        const tabHealine = document.createElement('div');
        tabHealine.setAttribute('id', 'tab-headline-communication-info');
        document.body.appendChild(tabHealine);
        const loadingProcess = document.createElement('div');
        loadingProcess.setAttribute('id', 'loadingProcess');
        document.body.appendChild(loadingProcess);
    });

    afterEach(() => {
        const tabHealine = document.getElementById('tab-headline-communication-info');
        if (tabHealine) {
            document.body.removeChild(tabHealine);
        }
        jest.clearAllMocks();
    });

    const initProps = {
        id: 1,
        customerInfo: {
            titleId: 0,
            custId: 123,
            languages: [],
            headlineStaffInfoPics: [{
                headlineID: 1,
                picCountryID: 1,
                picCountryName: "",
                picID: 1,
                picName: "test",
                picRoleID: 1,
                picRoleName: "Boss",
                picTypeID: 1,
                picTypeName: "Headline PIC"
            }],
            headlineStaffInfoLanguages: [{
                headlineID: 1,
                picID: 1,
                picLanguageID: 1,
                picLanguageName: ""
            }],
            headlineStaffInfoCommunications: [{
                headlineID: 1,
                picCommunicationId: 1,
                picCommunicationName: "Letstalk",
                picCommunicationValue: "OliverLetstalk, lets0123",
                picID: 1,
            }]
        },
        settingCommunicationTool: [{
            settingValue: 'test',
            settingId: 1
        }],
        editCustomerInfoDetailResult: {
            isSuccessful: true,
            message: 'test'
        },
        allSettings: {
            languages: [{
                displayOrder: 0,
                isActive: true,
                languageId: 1,
                name: "test"
            }],
            countries: [{
                countryCode: 0,
                displayOrder: 0,
                id: 0,
                isActive: true,
                name: "test"
            }]
        },
        setActiveTab: jest.fn(),
        setErrors: jest.fn(),
        getAllSettings: jest.fn(),
        getSettingPicCommunicationTools: jest.fn(),
        getHeadlinePicRoles: jest.fn(),
        getAccountingPicRoles: jest.fn(),
        setShowConfirmUnSaved: jest.fn(),
        getCustomerById: jest.fn(),
        getHeadlineCommunicationInfo: jest.fn()
    };

    describe('componentDidUpdate', () => {
        it('fetches customer info and updates headlineCommunicationInfo when customerInfo changes', async () => {
            const getCustomerByIdMock = jest.fn().mockResolvedValueOnce();
            const getHeadlineCommunicationInfoMock = jest.fn().mockReturnValueOnce({});

            const nextProps = {
                customerInfo: {
                    titleId: 0,
                    custId: 1223,
                    headlineStaffInfoPics: []
                }
            };
            const prevState = {};

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            wrapper.setState(prevState);

            await wrapper.instance().componentDidUpdate(nextProps, prevState);

            expect(initProps.getCustomerById).toHaveBeenCalledWith({ customerId: initProps.customerInfo.custId });
        });
    });

    describe('handleCustomDropdownTable', () => {
        it('adds custom-dropdown class when conditions are met', () => {
            const props = {
                ...initProps,
                isShowAccountInfo: true,
                isShowAccountantPIC: false,
            };

            const querySelectorSpy = jest.spyOn(document, 'querySelector').mockReturnValueOnce({
                classList: {
                    remove: jest.fn(),
                    add: jest.fn(),
                },
                offsetHeight: 100,
            });

            const wrapper = shallow(<HeadlineCommunicationInfo {...props} />);
            const instance = wrapper.instance();

            instance.handleCustomDropdownTable();

            expect(querySelectorSpy).toHaveBeenCalledTimes(3);
            expect(querySelectorSpy).toHaveBeenCalledWith('#tab-headline-communication-info');
        });
    });

    describe('handleComfirmChangeTab', () => {
        it('sets setShowConfirmUnSaved to false and setActiveTab when conditions are met', () => {
            const props = {
                setShowConfirmUnSaved: jest.fn(),
                setActiveTab: jest.fn(),
            };

            const instance = new HeadlineCommunicationInfo();
            instance.props = props;
            instance.state = {
                headlineCommunicationInfo: {},
                headlineInfoPolicy: 2,
            };

            const activeTab = {
                nextTab: 'SomeTab',
            };
            const initialValues = {};

            instance.handleComfirmChangeTab(activeTab, initialValues);

            expect(props.setShowConfirmUnSaved).toHaveBeenCalledWith(false);
            expect(props.setActiveTab).toHaveBeenCalledWith({
                currentTab: activeTab.nextTab,
                nextTab: null,
            });
        });
    });

    describe('componentDidMount', () => {
        it('fetches data and sets state correctly', async () => {
            const props = {
                ...initProps,
                getHeadlinePicRoles: jest.fn().mockResolvedValueOnce({}),
                getAccountingPicRoles: jest.fn().mockResolvedValueOnce({}),
                setShowConfirmUnSaved: jest.fn()
            };

            const instance = new HeadlineCommunicationInfo();
            instance.props = props;

            const mockAddEventListener = jest.spyOn(window, 'addEventListener');
            mockAddEventListener.mockImplementation((event, handler) => {
                if (event === 'autoScroll') {
                    instance.handleAutoScroll = handler;
                }
            });

            await instance.componentDidMount();

            expect(props.getHeadlinePicRoles).toHaveBeenCalledWith(51000);
            expect(props.getAccountingPicRoles).toHaveBeenCalledWith(51001);
            expect(instance.state.headlineCommunicationInfo).toEqual(expect.any(Object));
            expect(props.setShowConfirmUnSaved).toHaveBeenCalledWith(false);
            expect(mockAddEventListener).toHaveBeenCalledWith('autoScroll', expect.any(Function));
        });
    });

    describe('componentWillUnmount', () => {
        it('removes event listener', () => {
            const removeEventListenerMock = jest.spyOn(window, 'removeEventListener'); // Mock removeEventListener

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />); // Shallow render your component
            const instance = wrapper.instance(); // Get the component instance

            // Simulate componentWillUnmount
            instance.componentWillUnmount();

            // Assertions
            expect(removeEventListenerMock).toHaveBeenCalledWith('autoScroll', instance.handleAutoScroll); // Ensure removeEventListener is called with the correct arguments
            expect(removeEventListenerMock).toHaveBeenCalledTimes(1); // Ensure removeEventListener is called only once
        });
    });

    describe('handleAutoScroll', () => {
        it('scrolls to the top of the specified element', () => {
            document.body.innerHTML = `
                <div id="tab-headline-communication-info" style="height: 200px; overflow-y: scroll;">
                <div id="row-1" style="height: 100px;"></div>
                <div id="row-2" style="height: 100px;"></div>
                </div>
            `;

            window.picID = 1;

            const scrollToMock = jest.fn();
            window.HTMLElement.prototype.scrollTo = scrollToMock;

            const wrapper = mount(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            instance.handleAutoScroll();

            expect(scrollToMock).toHaveBeenCalledWith(0, 0);
            expect(scrollToMock).toHaveBeenCalledTimes(1);
        });
    });
   
    describe('handleChangeCommunicationValue', () => {
        it('updates state correctly', () => {
            const initialState = {
                headlineCommunicationInfo: [
                    {
                        picCommunicationTools: [
                            { type: 'Type1', value: 'Value1' },
                            { type: 'Type2', value: 'Value2' },
                        ],
                    },
                    {
                        picCommunicationTools: [
                            { type: 'Type3', value: 'Value3' },
                            { type: 'Type4', value: 'Value4' },
                        ],
                    },
                ],
                isValidate: true,
            };

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);

            wrapper.setState(initialState);

            wrapper.instance().handleChangeCommunicationValue('picCommunicationTools', 'value', 'UpdatedValue', 0, 0);

            expect(wrapper.state().headlineCommunicationInfo[0].picCommunicationTools[0].value).toEqual('UpdatedValue');
            expect(wrapper.state().isValidate).toEqual(true);

        });
    });

    describe('deleteCommunicationTool', () => {
        it('deletes communication tool correctly', () => {
            // Mock initial state
            const initialState = {
                headlineCommunicationInfo: [
                    {
                        picCommunicationTools: [
                            { type: 'Type1', value: 'Value1' },
                            { type: 'Type2', value: 'Value2' },
                        ],
                    },
                    {
                        picCommunicationTools: [
                            { type: 'Type3', value: 'Value3' },
                            { type: 'Type4', value: 'Value4' },
                        ],
                    },
                ],
                confirmDelete: {
                    show: true,
                    picCommunicationTool: { type: 'Type1', value: 'Value1' },
                    indexPic: 0,
                },
            };

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            wrapper.setState(initialState);
            wrapper.instance().deleteCommunicationTool({ type: 'Type1', value: 'Value1' }, 0);

            expect(wrapper.state().headlineCommunicationInfo[0].picCommunicationTools.length).toEqual(1);
            expect(wrapper.state().headlineCommunicationInfo[0].picCommunicationTools[0].type).toEqual('Type2');
            expect(wrapper.state().confirmDelete.show).toEqual(false);
        });
    });

    // describe('checkCustomerExistsOnCRM', () => {
    //     it('calls editHeadlineCommunicationPic if customer exists on CRM', async () => {
    //         const initialState = {
    //             confirmSave: {
    //             show: false,
    //             data: [],
    //             },
    //         };

    //         const mockPostDataAsync = jest.fn().mockResolvedValue({ data: 1 }); 
    //         const mockDataService = {
    //             postDataAsync: mockPostDataAsync,
    //         };

    //         const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />); 
    //         wrapper.setState(initialState);
    //         wrapper.instance().DataService = mockDataService;
    //         await wrapper.instance().checkCustomerExistsOnCRM();
    //         expect(wrapper.instance().editHeadlineCommunicationPic).toHaveBeenCalled();
    //     });

    //     it('calls updateNewCrmCustomer if customer does not exist on CRM', async () => {
    //         const initialState = {
    //             confirmSave: {
    //             show: false,
    //             data: [],
    //             },
    //         };

    //         const mockPostDataAsync = jest.fn().mockResolvedValue({ data: 0 });
    //         const mockDataService = {
    //                 postDataAsync: mockPostDataAsync,
    //         };

    //         const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
    //         wrapper.setState(initialState);
    //         wrapper.instance().DataService = mockDataService;

    //         await wrapper.instance().checkCustomerExistsOnCRM();
    //         expect(wrapper.instance().updateNewCrmCustomer).toHaveBeenCalled();
    //     });
    // });

    describe('handleSubmit', () => {
        it('calls checkCustomerExistsOnCRM if there are no errors and validation passes', async () => {
            const initialState = {
                isValidate: false,
            };

            const mockValidateCommunicationInfo = jest.fn().mockReturnValue(null);
            const mockValidateEditPic = jest.fn().mockResolvedValue([]);
            const mockCheckCustomerExistsOnCRM = jest.fn();

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            wrapper.setState(initialState);
            wrapper.instance().validateCommunicationInfo = mockValidateCommunicationInfo;
            wrapper.instance().validateEditPic = mockValidateEditPic;
            wrapper.instance().checkCustomerExistsOnCRM = mockCheckCustomerExistsOnCRM;

            await wrapper.instance().handleSubmit();

            expect(mockCheckCustomerExistsOnCRM).toHaveBeenCalled();
        });

        it('sets confirmSave state if there are validation errors or invalid pic data', async () => {
            const initialState = {
                isValidate: false,
            };

            const mockValidateCommunicationInfo = jest.fn().mockReturnValue({});
            const mockValidateEditPic = jest.fn().mockResolvedValue([{}]);
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);

            wrapper.setState(initialState);
            wrapper.instance().validateCommunicationInfo = mockValidateCommunicationInfo;
            wrapper.instance().validateEditPic = mockValidateEditPic;

            await wrapper.instance().handleSubmit();
            expect(wrapper.state().confirmSave.show).toBe(false);
        });
    });

    describe('updateNewCrmCustomer', () => {
        it('calls editHeadlineCommunicationPic if editCustomerInfoDetail is successful', async () => {
            const mockEditCustomerInfoDetailResult = { isSuccessful: true };
            const mockEditCustomerInfoDetail = jest.fn().mockResolvedValue(mockEditCustomerInfoDetailResult);
            const mockEditHeadlineCommunicationPic = jest.fn();

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} editCustomerInfoDetail={mockEditCustomerInfoDetail} editHeadlineCommunicationPic={mockEditHeadlineCommunicationPic} />);
            wrapper.instance().ParamsSubmit = jest.fn();
            wrapper.instance().editHeadlineCommunicationPic = jest.fn();
            await wrapper.instance().updateNewCrmCustomer();

        });

        it('does not call editHeadlineCommunicationPic if editCustomerInfoDetail is not successful', async () => {
            const mockEditCustomerInfoDetailResult = { isSuccessful: false };
            const mockEditCustomerInfoDetail = jest.fn().mockResolvedValue(mockEditCustomerInfoDetailResult);
            const mockEditHeadlineCommunicationPic = jest.fn();

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} editCustomerInfoDetail={mockEditCustomerInfoDetail} editHeadlineCommunicationPic={mockEditHeadlineCommunicationPic} />);
            wrapper.instance().ParamsSubmit = jest.fn();
            wrapper.instance().editHeadlineCommunicationPic = jest.fn();
            await wrapper.instance().updateNewCrmCustomer();

            expect(mockEditHeadlineCommunicationPic).not.toHaveBeenCalled();
        });
    });

    describe('getPicChangeInformation', () => {
        it('returns changed information', () => {
            const mockCustomerInfo = {
                headlineStaffInfoPics: [
                    {
                        picID: 1,
                        picCountryID: 1,
                        picLanguageID: 1,
                        picCommunicationTools: [{ type: 1, value: 'Email' }],
                    },
                ],
            };

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            instance.setState({ headlineCommunicationInfo: mockCustomerInfo.headlineStaffInfoPics });
            const result = instance.getPicChangeInformation();

            expect(result.length).toEqual(1);
            expect(result).toEqual(mockCustomerInfo.headlineStaffInfoPics);
        });
    });

    describe('getParamEdit', () => {
        it('returns an empty array if no changes are made', () => {
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            const getPicChangeInformationSpy = jest.spyOn(instance, 'getPicChangeInformation');
            getPicChangeInformationSpy.mockReturnValue([]);

            const result = instance.getParamEdit();

            expect(result).toEqual([]);
        });

        it('returns transformed parameters for changed communication information', () => {
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            const getPicChangeInformationSpy = jest.spyOn(instance, 'getPicChangeInformation');
            const changedCommunicationInfo = [{
                country: 'USA',
                language: 'French',
                picId: 1,
                picName: 'John Doe',
                picType: 'Type',
                role: 'Role',
                picCommunicationTools: [{ type: 1, value: 'Email' }],
                isNameError: false,
                isRoleError: false,
            }];
            getPicChangeInformationSpy.mockReturnValue(changedCommunicationInfo);

            const result = instance.getParamEdit();

            expect(result.length).toEqual(1);
            expect(result[0]).toEqual({
                country: 'USA',
                language: 'French',
                picId: 1,
                picName: 'John Doe',
                picType: 'Type',
                role: 'Role',
                picCommunicationTools: [{ type: 1, value: 'Email' }],
                remark: ''
            });
        });
    });

    describe('editHeadlineCommunicationPic', () => {
        it('handles successful API response', async () => {
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            const getParamEditSpy = jest.spyOn(instance, 'getParamEdit');
            getParamEditSpy.mockReturnValue([
                {
                    country: 'USA',
                    language: 'English',
                    picId: 1,
                    picName: 'John Doe',
                    picType: 'Type',
                    role: 'Role',
                    picCommunicationTools: [{ type: 1, value: 'Email' }],
                    remark: ''
                }
            ]);
            const toastSuccessSpy = jest.spyOn(toast, 'success');
            const postDataAsyncMock = jest.fn().mockResolvedValue({ data: [{ isSuccessful: true }] });
            DataService.postDataAsync = postDataAsyncMock;
            await instance.editHeadlineCommunicationPic();

            expect(postDataAsyncMock).toHaveBeenCalledWith(expect.any(String), [
                {
                    country: 'USA',
                    language: 'English',
                    picId: 1,
                    picName: 'John Doe',
                    picType: 'Type',
                    role: 'Role',
                    picCommunicationTools: [{ type: 1, value: 'Email' }],
                    remark: ''
                }
            ]);
            expect(toastSuccessSpy).toHaveBeenCalledWith(LangHelper.getResource('UpdateHeadlineCommunicationInfoSuccessful'));
        });

        it('handles API response with errors', async () => {
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            const getParamEditSpy = jest.spyOn(instance, 'getParamEdit');
            getParamEditSpy.mockReturnValue([
                {
                    country: 'USA',
                    language: 'English',
                    picId: 1,
                    picName: 'John Doe',
                    picType: 'Type',
                    role: 'Role',
                    picCommunicationTools: [{ type: 1, value: 'Email' }],
                    remark: ''
                }
            ]);

            const postDataAsyncMock = jest.fn().mockResolvedValue({
                data: [{ isSuccessful: false, message: 'Error message' }]
            });
            DataService.postDataAsync = postDataAsyncMock;
            await instance.editHeadlineCommunicationPic();

            expect(postDataAsyncMock).toHaveBeenCalledWith(expect.any(String), [
                {
                    country: 'USA',
                    language: 'English',
                    picId: 1,
                    picName: 'John Doe',
                    picType: 'Type',
                    role: 'Role',
                    picCommunicationTools: [{ type: 1, value: 'Email' }],
                    remark: ''
                }
            ]);
        });
    });

    describe('validateEditPic', () => {
        it('handles successful API response', async () => {
            const mockHeadlineCommunicationInfo = [
                {
                    picId: 1,
                    picCommunicationTools: [{ type: 1, value: 'Email' }],
                },
            ];
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            instance.setState({ headlineCommunicationInfo: mockHeadlineCommunicationInfo });

            const postDataAsyncMock = jest.fn().mockResolvedValue({ data: [{ picId: 1, isValid: true }] });
            DataService.postDataAsync = postDataAsyncMock;

            const result = await instance.validateEditPic();

            expect(postDataAsyncMock).toHaveBeenCalledWith(expect.any(String), [
                {
                    picId: 1,
                    picCommunicationTools: [{ type: 1, value: 'Email' }],
                }
            ]);
            expect(result).toEqual([{ picId: 1, isValid: true }]);
        });

        it('handles API response with errors', async () => {
            const mockHeadlineCommunicationInfo = [
                {
                    picId: 1,
                    picCommunicationTools: [{ type: 1, value: 'Email' }],
                },
            ];
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            instance.setState({ headlineCommunicationInfo: mockHeadlineCommunicationInfo });

            const postDataAsyncMock = jest.fn().mockRejectedValue(new Error('Error message'));
            DataService.postDataAsync = postDataAsyncMock;

            try {
                await instance.validateEditPic();
            } catch (error) {
                expect(postDataAsyncMock).toHaveBeenCalledWith(expect.any(String), [
                    {
                        picId: 1,
                        picCommunicationTools: [{ type: 1, value: 'Email' }],
                    }
                ]);

                expect(error.message).toBe('Error message');
            }
        });
    });

    describe('validateCommunicationInfo', () => {
        it('handles valid communication info', () => {
            const initialState = {
                headlineCommunicationInfo: [
                    {
                        picId: 1,
                        picCommunicationTools: [{ type: 1, value: 'Email' }],
                    },
                ],
            };
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            instance.setState(initialState);

            const result = instance.validateCommunicationInfo();

            expect(wrapper.state('headlineCommunicationInfo')).toEqual(initialState.headlineCommunicationInfo);
            expect(result).toEqual({ "picName": "NameRequired", "role": "RoleRequired" });
        });

        it('handles invalid communication info', () => {
            const initialState = {
                headlineCommunicationInfo: [
                    {
                        picId: 1,
                        picCommunicationTools: [{ type: 1, value: '' }],
                    },
                ],
            };
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            instance.setState(initialState);

            const result = instance.validateCommunicationInfo();


            expect(wrapper.state('headlineCommunicationInfo')).toEqual(initialState.headlineCommunicationInfo);
            expect(result).toEqual({
                communication: "CommunicationRequired",
                picName: "NameRequired",
                role: "RoleRequired"
            });
        });
    });

    describe('addNewCommunicationTool', () => {
        it('adds a new communication tool', () => {
            const initialState = {
                headlineCommunicationInfo: [
                    {
                        picId: 1,
                        picCommunicationTools: [{ type: 1, value: 'Email' }],
                    },
                ],
            };
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            instance.setState(initialState);
            instance.addNewCommunicationTool(0);

            const updatedState = {
                headlineCommunicationInfo: [
                    {
                        picId: 1,
                        picCommunicationTools: [
                            { type: 1, value: 'Email' },
                            { type: '', value: '', isError: false, isNew: true },
                        ],
                    },
                ],
            };
            expect(wrapper.state('headlineCommunicationInfo')).toEqual(updatedState.headlineCommunicationInfo);
        });
    });

    describe('handleChangeCountryValue', () => {
        it('updates the country value', () => {
            const initialState = {
                headlineCommunicationInfo: [
                    {
                        country: 1,
                        picCommunicationTools: [],
                    },
                    {
                        country: 2,
                        picCommunicationTools: [],
                    },
                ],
            };
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            instance.setState(initialState);

            instance.handleChangeCountryValue({ id: 3 }, 0);

            const updatedState = {
                headlineCommunicationInfo: [
                    {
                        country: 3,
                        picCommunicationTools: [],
                    },
                    {
                        country: 2,
                        picCommunicationTools: [],
                    },
                ],
            };
            expect(wrapper.state('headlineCommunicationInfo')).toEqual(updatedState.headlineCommunicationInfo);
        });
    });

    describe('getWidth', () => {
        it('calculates the width correctly', () => {
            const picCommunicationTool = {
                type: 1,
            };

            const settingCommunicationTool = [
                { settingId: 1, settingValue: 'AAA' },
                { settingId: 2, settingValue: 'BBB' },
            ];

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            const width = instance.getWidth(picCommunicationTool, settingCommunicationTool);

            const expectedWidth = (8 * 'AAA'.length) + 24;

            expect(width).toEqual(expectedWidth);
        });
    });

    describe('handleConfirmDeleteCommunicationTool', () => {
        it('deletes a new communication tool if isNew is true', () => {
            const picCommunicationTool = {
                isNew: true,
            };

            const initialState = {
                headlineCommunicationInfo: [
                    {
                        country: 1,
                        picCommunicationTools: [],
                    },
                    {
                        country: 2,
                        picCommunicationTools: [],
                    },
                ],
            };

            const indexPicCommunicationTool = 0;
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            wrapper.instance().deleteCommunicationTool = jest.fn();
            const instance = wrapper.instance();
            instance.setState(initialState);

            instance.handleConfirmDeleteCommunicationTool(picCommunicationTool, indexPicCommunicationTool);
            expect(wrapper.instance().deleteCommunicationTool).toHaveBeenCalledWith(picCommunicationTool, indexPicCommunicationTool);
        });

        it('sets confirmDelete state if isNew is false', () => {
            const picCommunicationTool = {
                isNew: false,
            };

            const indexPicCommunicationTool = 0;
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            const setStateMock = jest.fn();

            instance.handleConfirmDeleteCommunicationTool(picCommunicationTool, indexPicCommunicationTool, setStateMock);

            expect(instance.state.confirmDelete).toEqual({ indexPic: 0, picCommunicationTool: { "isNew": false }, show: true });
        });
    });

    describe('renderInfo', () => {
        it('renders the form fields correctly', () => {
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            const pic = {
                picCommunicationTools: [{
                    type: 1,
                    value: 'test'
                }]
            };

            const indexPic = 0;
            const renderedInfo = instance.renderInfo(pic, indexPic);

            expect(renderedInfo.type).toEqual('div');
        });
    });

    describe('handleSubmitEditConfirm', () => {
        it('calls editHeadlineCommunicationPic and sets confirmSave to false', async () => {

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            wrapper.instance().editHeadlineCommunicationPic = jest.fn();
            const setStateSpy = jest.spyOn(instance, 'setState');

            await instance.handleSubmitEditConfirm();

            expect(setStateSpy).toHaveBeenCalledWith({
                confirmSave: {
                    show: false,
                    data: [],
                },
            });
        });
    });

    describe('handleCloseEditConfirm', () => {
        it('sets confirmSave to false when called', () => {

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            instance.handleCloseEditConfirm();

            expect(wrapper.state('confirmSave')).toEqual({ show: false, data: [] });
        });
    });

    describe('renderComfirmChatTypeMapping', () => {
        it('renders confirmation content correctly', () => {
            const mockData = [
            ];

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            wrapper.setState({ confirmSave: { show: true, data: mockData } });
            instance;

            const confirmationItems = wrapper.find('.confirmation-item');
            expect(confirmationItems).toHaveLength(mockData.length);
        });
    });

    describe('renderComfirmDeleteCommunicationTool', () => {
        it('renders confirmation content correctly', () => {
            const mockSettingCommunicationTool = [
            ];
            const mockConfirmDelete = {
                show: true,
                picCommunicationTool: {
                    type: 1
                }
            };

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            wrapper.setState({ confirmDelete: mockConfirmDelete });
            wrapper.setProps({ settingCommunicationTool: mockSettingCommunicationTool });

        });
    });

    describe('renderValueChatTypeMapping', () => {
        it('renders chat type mapping correctly', () => {
            const mockData = [
            ];

            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            const result = wrapper.instance().renderValueChatTypeMapping(mockData);

            expect(result).toHaveLength(mockData.length);
        });
    });

    describe('render HeadlineCommunicationInfo', () => {
        it('renders without crashing', () => {
            const wrapper = shallow(<HeadlineCommunicationInfo {...initProps} />);
            expect(wrapper.exists()).toBeTruthy();
        });
    });
});