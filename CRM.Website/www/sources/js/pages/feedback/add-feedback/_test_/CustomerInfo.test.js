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

    describe('getOtherAccountCommunicationInfos', () => {
        it('should set otherAccountCommunicationInfos state correctly', () => {
            const mockProps = {
                ...props,
                customerInfo: {
                    otherAccountCommunicationInfos: [
                        {
                            communicationName: 'Email',
                            communicationID: 101,
                            communicationValue: 'test@example.com',
                            custId: 201,
                        },
                        {
                            communicationName: 'Phone',
                            communicationID: 102,
                            communicationValue: '123-456-7890',
                            custId: 202,
                        },
                    ],
                    headlineStaffInfoCommunications: [
                        {
                            headlineID: 1,
                            picCommunicationId: 101,
                            picCommunicationName: 'Email',
                            picCommunicationValue: 'test@example.com',
                            picID: 201,
                        },
                        {
                            headlineID: 2,
                            picCommunicationId: 102,
                            picCommunicationName: 'Phone',
                            picCommunicationValue: '123-456-7890',
                            picID: 202,
                        },
                    ]
                },
            };

            const wrapper = shallow(<CustomerInfo {...mockProps} />);
            const instance = wrapper.instance();
            instance.getOtherAccountCommunicationInfos();

            const expectedState = [
                {
                    communicationName: 'Email',
                    communicationID: 101,
                    communicationValue: 'test@example.com',
                    custId: 201
                },
                {
                    communicationName: 'Phone',
                    communicationID: 102,
                    communicationValue: '123-456-7890',
                    custId: 202
                },
            ];

            expect(wrapper.state('otherAccountCommunicationInfos')).toEqual(expectedState);
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
            expect(result).toEqual(expectedState);
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

        const customerInfo = {
            headlineStaffInfoPics: [
                { picID: 1, picName: 'John Doe', picRoleName: 'Manager' }
            ],
            headlineStaffInfoCommunications: [
                { picID: 1, picCommunicationId: 101, picCommunicationName: 'Email', picCommunicationValue: 'john@example.com' },
                { picID: 1, picCommunicationId: 102, picCommunicationName: 'Phone', picCommunicationValue: '123-456-7890' }
            ]
        };

        const expectedHeadlineCommunicationInfo = [
            {
                picId: 1,
                picName: 'John Doe',
                picRoleName: 'Manager',
                picCommunicationTools: [
                    { type: 101, name: 'Email', value: 'john@example.com', index: 0 },
                    { type: 102, name: 'Phone', value: '123-456-7890', index: 1 }
                ]
            }
        ];

        const mockProps = {
            ...props,
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
        });

        it('should render headline account communication correctly', () => {
            const result = instance.renderHeadlineAccountCommunication(customerInfo);
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
                ]
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
});