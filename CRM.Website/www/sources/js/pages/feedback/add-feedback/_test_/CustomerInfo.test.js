import React from 'react';
import { CustomerInfo } from '../CustomerInfo';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import { shallow } from 'enzyme';

describe('CustomerInfo', () => {
    beforeAll(() => {
        window.currentClientTime = '7/28/2021 2:26:28 PM';
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
        //JSON.parse = jest.fn();
        // JSON.stringify = jest.fn()
        const divHostLicenseePermission = document.createElement('div');
        const divHostCreditPermission = document.createElement('div');
        divHostLicenseePermission.setAttribute('id', 'hasHostLicenseePermission');
        divHostCreditPermission.setAttribute('id', 'hasHostCreditPermission');
        divHostLicenseePermission.checked = true;
        divHostCreditPermission.checked = true;
        document.body.appendChild(divHostLicenseePermission);
        document.body.appendChild(divHostCreditPermission);
    });

    afterAll(() => {
        const divHostLicenseePermission = document.getElementById('hasHostOnCurrentCustomer');
        const divHostCreditPermission = document.getElementById('hasHostOnCurrentCustomer');
        if (divHostLicenseePermission || divHostCreditPermission) {
            document.body.removeChild(divHostLicenseePermission);
            document.body.removeChild(divHostCreditPermission);
        }
        jest.clearAllMocks();
    });

    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);

    const props = {
        settings: {
            titles: [{ id: 1, value: 'titles' }],
            licenseeTypes: [{ id: 1, name: 'licenseeTypes' }],
            statuses: [{ statusId: 1, name: 'statuses' }],
            responses: [{ id: 1, value: 'responses' }],
            sites: [{}]
        },
        customerInfo: { otherAccountCommunicationInfos: [] },
        customerDetail: { customerType: 0 },
        isHostOnCurrentCustomer: true,
        handleChange: jest.fn(),
        handleChangeValueInfo: jest.fn(),
        settingCommunicationTool:[
            {
                settingId: 1,
                settingValue: ''
            }
        ],
        setFieldValue: jest.fn(),
        renderOptions: jest.fn(() => '<div></div>')
    };

    describe('render', () => {
        it('render correctly form', () => {
            // Arrange

            // Action
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Assert
            expect(customerInfo.find(Form.Control)).toHaveLength(7);
        });

        it('handleChangeValueInfo birthday correctly', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Action
            customerInfo.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.handleChangeValueInfo).toHaveBeenCalled();
        });
    });

    describe('handleChangeHeadlineStaffInfoCommunications', () => {
        let wrapper;
        let instance;

        const initialState = {
            headlineStaffInfoCommunications: [
                { picCommunicationId: 101, picCommunicationValue: 'oldValue1' },
                { picCommunicationId: 102, picCommunicationValue: 'oldValue2' }
            ]
        };

        beforeEach(() => {
            wrapper = shallow(<CustomerInfo {...props} />);
            instance = wrapper.instance();
            instance.setState(initialState);
        });

        it('should update state and return updated communications info', () => {
            const newValue = 'newValue';
            const index = 1;

            const expectedState = [
                { picCommunicationId: 101, picCommunicationValue: 'oldValue1' },
                { picCommunicationId: 102, picCommunicationValue: newValue }
            ];

            const result = instance.handleChangeHeadlineStaffInfoCommunications('picCommunicationValue', newValue, index);

            expect(instance.state.headlineStaffInfoCommunications).toEqual(expectedState);
        });
    });

    describe('handleChangeOtherAccountCommunicationInfos', () => {
        let wrapper;
        let instance;

        const initialState = {
            otherAccountCommunicationInfos: [
                { communicationID: 201, communicationValue: 'oldValue1' },
                { communicationID: 202, communicationValue: 'oldValue2' }
            ]
        };

        beforeEach(() => {
            wrapper = shallow(<CustomerInfo {...props} />);
            instance = wrapper.instance();
            instance.setState(initialState);
        });

        it('should update state and return updated communication infos', () => {
            const newValue = 'newValue';
            const index = 1;

            const expectedState = [
                { communicationID: 201, communicationValue: 'oldValue1' },
                { communicationID: 202, communicationValue: newValue }
            ];

            instance.handleChangeOtherAccountCommunicationInfos('communicationValue', newValue, index);

            expect(instance.state.otherAccountCommunicationInfos).toEqual(expectedState);
        });
    });

    describe('renderHeadlineAccountCommunication', () => {
        let wrapper;
        let instance;
        const mockHandleChangeValueInfo = jest.fn();

        const initialState = {
            headlineStaffInfoCommunications: [
                { picCommunicationId: 101, picCommunicationValue: 'oldValue1' },
                { picCommunicationId: 102, picCommunicationValue: 'oldValue2' }
            ]
        };

        const customerInfo = {
            headlineStaffInfoPics: [
                { picID: 1, picName: 'John Doe', picRoleName: 'Manager', communications: [{picID: 1}] }
            ],
            headlineStaffInfoCommunications: [
                { picID: 1, picCommunicationId: 101, picCommunicationName: 'Email', picCommunicationValue: 'john@example.com' },
                { picID: 1, picCommunicationId: 102, picCommunicationName: 'Phone', picCommunicationValue: '123-456-7890' }
            ]
        };

        const mockProps = {
            ...props,
            isGuest: false,
            customerInfo: customerInfo,
            handleChangeValueInfo: mockHandleChangeValueInfo,
            customerDetail: { customerType: 0, isGroupHeadLine: true }
        };

        beforeEach(() => {
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState({
                headlineInfoPolicy: 2
            })
            instance = wrapper.instance();
            instance.setState(initialState);
        });

        it('should render headline account communication correctly', () => {
            const result = instance.renderHeadlineAccountCommunication(initialState.headlineStaffInfoCommunications);
            expect(result).toMatchSnapshot();
        });
    });

    describe('renderOptions', () => {
        let instance;

        beforeEach(() => {
            const wrapper = shallow(<CustomerInfo {...props} />);
            instance = wrapper.instance();
        });

        it('should render an option element with the correct props', () => {
            const name = 'Option Name';
            const item = 'option_value';
            const optionElement = instance.renderOptions(name, item);

            const wrapper = shallow(optionElement);
            expect(wrapper.type()).toBe('option');
            expect(wrapper.prop('value')).toBe(item);
            expect(wrapper.key()).toBe(item);
            expect(wrapper.text()).toBe(name);
        });

        it('should match the snapshot', () => {
            const name = 'Option Name';
            const item = 'option_value';
            const optionElement = instance.renderOptions(name, item);
            const wrapper = shallow(optionElement);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('handleChangeGuestCommunicationInfo', () => {
        let instance;
        let mockProps;

        beforeEach(() => {
            mockProps = {
                ...props,
                setFieldValue: jest.fn(),
                handleChangeValueInfo: jest.fn()
            };
            const wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState({
                guestCommunicationInfos: [
                    { name: 'John', value: '123', index: 0 },
                    { name: 'Jane', value: '456', index: 1 }
                ]
            });
            instance = wrapper.instance();
        });

        it('should update state with new value', () => {
            instance.handleChangeGuestCommunicationInfo('name', 'Alice', 0);
            expect(instance.state.guestCommunicationInfos[0].name).toBe('Alice');
        });

        it('should call setFieldValue and handleChangeValueInfo with updated guestCommunicationInfos', () => {
            instance.handleChangeGuestCommunicationInfo('value', '789', 1);
            expect(mockProps.setFieldValue).toHaveBeenCalledWith('guestCommunicationInfos', [
                { name: 'John', value: '123', index: 0 },
                { name: 'Jane', value: '789', index: 1 }
            ]);
            expect(mockProps.handleChangeValueInfo).toHaveBeenCalledWith('guestCommunicationInfos', [
                { name: 'John', value: '123', index: 0 },
                { name: 'Jane', value: '789', index: 1 }
            ]);
        });
    });

    describe('addNewGuestCommunicationTool', () => {
        let instance;
        let mockProps;

        beforeEach(() => {
            mockProps = {
                ...props,
                handleChangeValueInfo: jest.fn(),
                setFieldValue: jest.fn()
            };
            const wrapper = shallow(<CustomerInfo {...mockProps} />);
            instance = wrapper.instance();
            instance.state = {
                guestCommunicationInfos: [
                    { communicationID: '1', communicationValue: '123', isError: false },
                    { communicationID: '2', communicationValue: '456', isError: false }
                ]
            };
        });

        it('should add a new guest communication tool', () => {
            instance.addNewGuestCommunicationTool();
            expect(instance.state.guestCommunicationInfos).toHaveLength(3);
            expect(instance.state.guestCommunicationInfos[2]).toEqual({ communicationID: '', communicationValue: '', isError: false });
        });

        it('should call handleChangeValueInfo with updated guestCommunicationInfos', () => {
            instance.addNewGuestCommunicationTool();
            expect(mockProps.handleChangeValueInfo).toHaveBeenCalledWith('guestCommunicationInfos', [
                { communicationID: '1', communicationValue: '123', isError: false },
                { communicationID: '2', communicationValue: '456', isError: false },
                { communicationID: '', communicationValue: '', isError: false }
            ]);
        });
    });

    describe('deleteGuestCommunicationTool', () => {
        let instance;
        let mockProps;

        beforeEach(() => {
            mockProps = {
                ...props,
                isGuest: true,
                handleChangeValueInfo: jest.fn(),
                setFieldValue: jest.fn()
            };
            const wrapper = shallow(<CustomerInfo {...mockProps} />);
            instance = wrapper.instance();
            instance.state = {
                guestCommunicationInfos: [
                    { communicationID: '1', value: '123', isError: false },
                    { communicationID: '2', value: '456', isError: false },
                    { communicationID: '3', value: '789', isError: false }
                ],
                confirmDeleteCommunicationTool:{
                    show: false
                }
            };
        });

        it('should delete the specified guest communication tool', () => {
            instance.deleteGuestCommunicationTool('456', '2');
            expect(instance.state.guestCommunicationInfos).toHaveLength(2);
            expect(instance.state.guestCommunicationInfos).toEqual([
                { communicationID: '1', value: '123', isError: false },
                { communicationID: '2', value: '456', isError: false }
            ]);
        });

        it('should call handleChangeValueInfo and setFieldValue with updated guestCommunicationInfos', () => {
            instance.deleteGuestCommunicationTool('456', '2');
            expect(mockProps.handleChangeValueInfo).toHaveBeenCalledWith('guestCommunicationInfos', [
                { communicationID: '1', value: '123', isError: false },
                { communicationID: '2', value: '456', isError: false }
            ]);
            expect(mockProps.setFieldValue).toHaveBeenCalledWith('guestCommunicationInfos', [
                { communicationID: '1', value: '123', isError: false },
                { communicationID: '2', value: '456', isError: false }
            ]);
        });
    });

    describe('renderGuestCommunication', () => {
        let wrapper;
        let mockProps;

        beforeEach(() => {
            mockProps = {
                ...props,
                settingCommunicationTool: [
                    { settingId: '1', settingValue: 'Option 1' },
                    { settingId: '2', settingValue: 'Option 2' }
                ],
                touched: {},
                errors: {},
                isGuest : true,
                setFieldValue: jest.fn()
            };
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState({
                guestCommunicationInfos: [
                    { communicationID: '1', communicationValue: '123', isError: false },
                    { communicationID: '2', communicationValue: '456', isError: false }
                ],
            });
        });

        it('should render the Add Communication Tool button', () => {
            const addButton = wrapper.find('.btn-add');
            expect(addButton).toHaveLength(1);
        });

        it('should render communication tools correctly', () => {
            const communicationToolElements = wrapper.find('.custom-label-communicationTool');
            expect(communicationToolElements).toHaveLength(2);
        });

        it('should simulate click on delete icon', () => {
            const deleteIcon = wrapper.find('.icon-delete').first();
            deleteIcon.simulate('click');
            expect(wrapper.state('guestCommunicationInfos')).toHaveLength(1); 
        });
    });

    describe('addNewHeadlineCommunicationTool', () => {
        let wrapper;
        let instance;
    
        const mockSetFieldValue = jest.fn();
        const mockHandleChangeValueInfo = jest.fn();
    
        beforeEach(() => {
            mockSetFieldValue.mockClear();
            mockHandleChangeValueInfo.mockClear();
    
            const mockProps = {
                ...props,
                setFieldValue: mockSetFieldValue,
                handleChangeValueInfo: mockHandleChangeValueInfo
            };
    
            const initialState = {
                headlineStaffInfoCommunications: [
                    {
                        headlineID: 1,
                        picCommunicationId: 1,
                        picCommunicationName: 'Name1',
                        picCommunicationValue: 'Value1',
                        picID: 1,
                        isNew: false
                    },
                    {
                        headlineID: 2,
                        picCommunicationId: 2,
                        picCommunicationName: 'Name2',
                        picCommunicationValue: 'Value2',
                        picID: 2,
                        isNew: false
                    }
                ]
            };
    
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState(initialState);
            instance = wrapper.instance();
        });
    
        it('should add a new headline communication tool', () => {
            const indexToAdd = 1;
    
            instance.addNewHeadlineCommunicationTool(indexToAdd);
    
            expect(wrapper.state('headlineStaffInfoCommunications')).toHaveLength(3);
            expect(wrapper.state('headlineStaffInfoCommunications')[2]).toEqual({
                headlineID: 2,
                picCommunicationId: 0,
                picCommunicationName: '',
                picCommunicationValue: '',
                picID: 2,
                isNew: true
            });
    
            expect(mockSetFieldValue).toHaveBeenCalledWith('headlineStaffInfoCommunications', wrapper.state('headlineStaffInfoCommunications'));
            expect(mockHandleChangeValueInfo).toHaveBeenCalledWith('headlineStaffInfoCommunications', wrapper.state('headlineStaffInfoCommunications'));
        });
    });

    describe('deleteHeadlineCommunicationTool ', () => {
        let wrapper;
        let instance;
    
        const mockHandleChangeValueInfo = jest.fn();
    
        beforeEach(() => {
            mockHandleChangeValueInfo.mockClear();
    
            const mockProps = {
                ...props,
                handleChangeValueInfo: mockHandleChangeValueInfo
            };
    
            const initialState = {
                headlineStaffInfoCommunications: [
                    {
                        headlineID: 1,
                        picCommunicationId: 1,
                        picCommunicationName: 'Name1',
                        picCommunicationValue: 'Value1',
                        picID: 1,
                        isNew: false
                    },
                    {
                        headlineID: 2,
                        picCommunicationId: 2,
                        picCommunicationName: 'Name2',
                        picCommunicationValue: 'Value2',
                        picID: 2,
                        isNew: false
                    }
                ]
            };
    
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState(initialState);
            instance = wrapper.instance();
        });
    
        it('should delete a headline communication tool', () => {
            const indexToDelete = 1;
    
            instance.deleteHeadlineCommunicationTool(indexToDelete);
    
            expect(wrapper.state('headlineStaffInfoCommunications')).toHaveLength(1);
            expect(wrapper.state('headlineStaffInfoCommunications')[0]).toEqual({
                headlineID: 1,
                picCommunicationId: 1,
                picCommunicationName: 'Name1',
                picCommunicationValue: 'Value1',
                picID: 1,
                isNew: false
            });
    
            expect(wrapper.state('confirmDeleteCommunicationTool')).toEqual({
                show: false,
                picCommunicationTool: null,
                indexCom: -1 
            });
    
            expect(mockHandleChangeValueInfo).toHaveBeenCalledWith('headlineStaffInfoCommunications', wrapper.state('headlineStaffInfoCommunications'));
        });
    });

    describe('confirmDeleteHeadlineCommunicationTool', () => {
        let wrapper;
        let instance;
    
        const mockDeleteHeadlineCommunicationTool = jest.fn();
    
        beforeEach(() => {
            mockDeleteHeadlineCommunicationTool.mockClear();
    
            const mockProps = {
                ...props,
                customerInfo: {
                    headlineStaffInfoCommunications: [
                        { picCommunicationId: 1 },
                        { picCommunicationId: 2 }
                    ]
                },
                handleChangeValueInfo: jest.fn()
            };
    
            const initialState = {
                headlineStaffInfoCommunications: [
                    { isNew: true, picCommunicationId: 1 },
                    { isNew: false, picCommunicationId: 2 }
                ],
                confirmDeleteCommunicationTool: {
                    show: false,
                    picCommunicationTool: null,
                    indexCom: -1
                }
            };
    
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState(initialState);
            instance = wrapper.instance();
    
            instance.deleteHeadlineCommunicationTool = mockDeleteHeadlineCommunicationTool;
        });
    
        it('should delete the communication tool immediately if it is new', () => {
            const indexToDelete = 0;
    
            instance.confirmDeleteHeadlineCommunicationTool(indexToDelete);
    
            expect(mockDeleteHeadlineCommunicationTool).toHaveBeenCalledWith(indexToDelete);
        });
    });

    describe('addNewOtherCommunicationTool', () => {
        let wrapper;
        let instance;
    
        const mockHandleChangeValueInfo = jest.fn();
    
        beforeEach(() => {
            mockHandleChangeValueInfo.mockClear();
    
            const mockProps = {
                ...props,
                customerDetail: {
                    custId: 123
                },
                handleChangeValueInfo: mockHandleChangeValueInfo
            };
    
            const initialState = {
                otherAccountCommunicationInfos: [
                    { communicationName: 'Email', communicationID: 1, communicationValue: 'test@example.com', custId: 123, isNew: false }
                ]
            };
    
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState(initialState);
            instance = wrapper.instance();
        });
    
        it('should add a new communication tool to the state and call handleChangeValueInfo', () => {
            // Call the method
            instance.addNewOtherCommunicationTool();
    
            // Verify the state update
            expect(wrapper.state('otherAccountCommunicationInfos')).toEqual([
                { communicationName: 'Email', communicationID: 1, communicationValue: 'test@example.com', custId: 123, isNew: false },
                { communicationName: '', communicationID: 0, communicationValue: '', custId: 123, isNew: true }
            ]);
    
            // Verify handleChangeValueInfo was called with the updated state
            expect(mockHandleChangeValueInfo).toHaveBeenCalledWith('otherAccountCommunicationInfos', [
                { communicationName: 'Email', communicationID: 1, communicationValue: 'test@example.com', custId: 123, isNew: false },
                { communicationName: '', communicationID: 0, communicationValue: '', custId: 123, isNew: true }
            ]);
        });
    });

    describe('deleteOtherCommunicationTool', () => {
        let wrapper;
        let instance;
    
        const mockHandleChangeValueInfo = jest.fn();
    
        beforeEach(() => {
            mockHandleChangeValueInfo.mockClear();
    
            const mockProps = {
                ...props,
                customerDetail: {
                    custId: 123
                },
                handleChangeValueInfo: mockHandleChangeValueInfo
            };
    
            const initialState = {
                otherAccountCommunicationInfos: [
                    { communicationName: 'Email', communicationID: 1, communicationValue: 'test1@example.com', custId: 123, isNew: false },
                    { communicationName: 'Phone', communicationID: 2, communicationValue: '1234567890', custId: 123, isNew: false }
                ],
                confirmDeleteCommunicationTool: {
                    show: false,
                    picCommunicationTool: null,
                    indexCom: -1
                }
            };
    
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState(initialState);
            instance = wrapper.instance();
        });
    
        it('should delete a communication tool from the state and call handleChangeValueInfo', () => {
            // Call the method with the index of the item to delete
            instance.deleteOtherCommunicationTool(0);
    
            // Verify the state update
            expect(wrapper.state('otherAccountCommunicationInfos')).toEqual([
                { communicationName: 'Phone', communicationID: 2, communicationValue: '1234567890', custId: 123, isNew: false }
            ]);
    
            // Verify handleChangeValueInfo was called with the updated state
            expect(mockHandleChangeValueInfo).toHaveBeenCalledWith('otherAccountCommunicationInfos', [
                { communicationName: 'Phone', communicationID: 2, communicationValue: '1234567890', custId: 123, isNew: false }
            ]);
    
            // Verify the confirmDeleteCommunicationTool state reset
            expect(wrapper.state('confirmDeleteCommunicationTool')).toEqual({
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            });
        });
    });

    describe('confirmOtherHeadlineCommunicationTool', () => {
        let wrapper;
        let instance;
    
        beforeEach(() => {
            const mockProps = {
                ...props,
                customerDetail: {
                    custId: 123
                },
                customerInfo: {
                    otherAccountCommunicationInfos: [
                        { communicationName: 'Email', communicationID: 1, communicationValue: 'test1@example.com', custId: 123, isNew: true },
                        { communicationName: 'Phone', communicationID: 2, communicationValue: '1234567890', custId: 123, isNew: false }
                    ]
                },
                handleChangeValueInfo: jest.fn()
            };
    
            const initialState = {
                otherAccountCommunicationInfos: mockProps.customerInfo.otherAccountCommunicationInfos,
                confirmDeleteCommunicationTool: {
                    show: false,
                    picCommunicationTool: null,
                    indexCom: -1
                }
            };
    
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            wrapper.setState(initialState);
            instance = wrapper.instance();
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it('should update the state if the communication tool is not new', () => {
            // Call the method with the index of the non-new item
            instance.confirmOtherHeadlineCommunicationTool(1);
    
            // Verify the state update
            expect(wrapper.state('confirmDeleteCommunicationTool')).toEqual({
                show: true,
                picCommunicationTool: 2, // communicationID of the second item
                indexCom: 1
            });
        });
    });
});