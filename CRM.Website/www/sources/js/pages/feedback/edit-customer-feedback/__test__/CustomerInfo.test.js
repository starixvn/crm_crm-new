import React from 'react';
import CustomerInfo from '../CustomerInfo';
import { Col, Form, Row, Collapse } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import { shallow } from 'enzyme';

describe('CustomerInfo', () => {
    beforeAll(() => {
        window.currentClientTime = '7/28/2021 2:26:28 PM';
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
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
        collapse: {
            customerInfo: true
        },
        values: {},
        fieldInput: {
            username: '',
            titleId: '',
            firstName: '',
            lastName: '',
            passport: '',
            refCode1: '',
            refCode2: '',
            licenseeTypeId: '',
            countryCode1: '',
            areaCode1: '',
            phoneNumber1: '',
            countryCode2: '',
            areaCode2: '',
            phoneNumber2: '',
            countryCode3: '',
            areaCode3: '',
            phoneNumber3: '',
            faxCountryCode: '',
            faxAreaCode: '',
            faxNumber: '',
            mobileCountryCode: '',
            mobileAreaCode: '',
            mobilePhoneNumber: '',
            name1: '',
            phone1: '',
            name2: '',
            phone2: '',
            name3: '',
            phone3: '',
            name4: '',
            phone4: '',
            skype: '',
            email: '',
            telegram: '',
            weChat: '',
            whatsApp: '',
            line: '',
            letstalk: '',
            qq: '',
            zalo: ''
        },
        settings: {
            titles: [{ id: 1, value: 'titles' }],
            licenseeTypes: [{ id: 1, name: 'licenseeTypes' }],
            statuses: [{ statusId: 1, name: 'statuses' }],
            responses: [{ id: 1, value: 'responses' }],
            sites: [{}]
        },
        settingCommunicationTool: [
            { settingId: '1', settingValue: 'Option 1' },
            { settingId: '2', settingValue: 'Option 2' }
        ],
        handleChangeInput: jest.fn(),
        setFieldValue: jest.fn(),
        onCollapseExpand: jest.fn()
    };


    describe('Render', () => {
        it('render exactly form', () => {
            // Arrange

            // Action
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Assert
            expect(customerInfo.find(Form.Control)).toHaveLength(39);
        });

        it('onClick call exactly function', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);
            // Action
            customerInfo.find(Form.Group).at(0).simulate('click');
            // Assert
            expect(props.onCollapseExpand).toHaveBeenCalledWith('customerInfo');
        });

        it('handleChange title correctly', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);
            // Action
            customerInfo.find(Form.Control).at(0).simulate('change');
            // Assert
            expect(props.handleChangeInput).toHaveBeenCalled();
        });

        it('setFieldValue birthday correctly', () => {
            // Arrange
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Action
            customerInfo.find(DatePicker).at(0).simulate('change', 'value');

            // Assert
            expect(props.setFieldValue).toHaveBeenCalledWith('birthday', 'value');
        });

        it('render SelectWithSearch correctly', () => {
            // Arrange

            // Action
            const customerInfo = shallow(<CustomerInfo {...props} />);

            // Assert
            expect(customerInfo.find(SelectWithSearch).length).toBe(1);
        });
    });

    describe('getLatestFeedbackCommunicationTools', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<CustomerInfo {...props} />);
        });

        it('should return the correct latestFeedbackCommunicationTools', () => {
            const instance = wrapper.instance();

            const newCommunicationTools = [
                {
                    communicationID: 1,
                    communicationName: 'Email',
                    communicationValue: 'test@example.com',
                    picInfo: 'John Doe (Manager)',
                    isNew: true,
                    isError: false,
                    isHeadline: true,
                    custID: 123,
                    feedbackID: 456
                },
                {
                    communicationID: 2,
                    communicationName: 'Phone',
                    communicationValue: '123-456-7890',
                    picInfo: 'John Doe (Manager)',
                    isNew: false,
                    isError: false,
                    isHeadline: true,
                    custID: 123,
                    feedbackID: 456
                },
                {
                    communicationID: 3,
                    communicationName: 'Email',
                    communicationValue: 'another@example.com',
                    picInfo: 'Jane Smith (Director)',
                    isNew: true,
                    isError: false,
                    isHeadline: true,
                    custID: 124,
                    feedbackID: 457
                }
            ];

            const expectedOutput = [
                {
                    picCommunicationTools: [
                        {
                            communicationID: 1,
                            communicationName: 'Email',
                            communicationValue: 'test@example.com',
                            indexCom: 0,
                            isNew: true,
                            isError: false
                        },
                        {
                            communicationID: 2,
                            communicationName: 'Phone',
                            communicationValue: '123-456-7890',
                            indexCom: 1,
                            isNew: false,
                            isError: false
                        }
                    ],
                    picInfo: 'John Doe (Manager)',
                    isHeadline: true,
                    custID: 123,
                    feedbackID: 456
                },
                {
                    picCommunicationTools: [
                        {
                            communicationID: 3,
                            communicationName: 'Email',
                            communicationValue: 'another@example.com',
                            indexCom: 2,
                            isNew: true,
                            isError: false
                        }
                    ],
                    picInfo: 'Jane Smith (Director)',
                    isHeadline: true,
                    custID: 124,
                    feedbackID: 457
                }
            ];

            const result = instance.getLatestFeedbackCommunicationTools(newCommunicationTools);
            expect(result).toEqual(expectedOutput);
        });
    });

    describe('handleChangeCommunicationTools', () => {
        let wrapper;
        let instance;

        const mockProps = {
            ...props,
            setFieldValue: jest.fn(),
            handleChangeInput: jest.fn()
        }

        beforeEach(() => {
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            instance = wrapper.instance();
            instance.setState({
                latestFeedbackCommunicationTools: [
                    {
                        communicationID: 1,
                        communicationName: 'Email',
                        communicationValue: 'test@example.com',
                        picInfo: 'John Doe (Manager)',
                        isNew: true,
                        isError: false,
                        isHeadline: true,
                        custID: 123,
                        feedbackID: 456
                    }
                ]
            });
        });

        it('should update state and call props methods correctly', () => {
            const name = 'communicationValue';
            const value = 'new@example.com';
            const index = 0;

            const expectedState = [
                {
                    communicationID: 1, communicationValue: 'new@example.com', communicationName: "Email",
                    custID: 123,
                    feedbackID: 456,
                    isError: false,
                    isHeadline: true,
                    isNew: true,
                    picInfo: "John Doe (Manager)",
                }
            ];

            instance.handleChangeCommunicationTools(name, value, index);

            expect(wrapper.state('latestFeedbackCommunicationTools')).toEqual(expectedState);
        });
    });

    describe('addNewHeadlineCommunicationTools', () => {
        let wrapper;
        let instance;

        const mockProps = {
            ...props,
            setFieldValue: jest.fn(),
            handleChangeInput: jest.fn()
        }


        beforeEach(() => {
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            instance = wrapper.instance();
            instance.setState({
                latestFeedbackCommunicationTools: [
                    {
                        communicationID: 1,
                        communicationName: 'Email',
                        communicationValue: 'test@example.com',
                        picInfo: 'John Doe (Manager)',
                        isNew: true,
                        isError: false,
                        isHeadline: true,
                        custID: 123,
                        feedbackID: 456
                    }
                ]
            });
        });

        it('should add a new headline communication tool and update state and props correctly', () => {
            const pic = {
                custID: 123,
                feedbackID: 456,
                isHeadline: true,
                picInfo: 'John Doe'
            };

            const expectedState = [
                {
                    communicationID: 1, communicationValue: 'test@example.com', communicationName: "Email",
                    custID: 123,
                    feedbackID: 456,
                    isError: false,
                    isHeadline: true,
                    isNew: true,
                    picInfo: "John Doe (Manager)",
                },
                {
                    communicationID: 0,
                    communicationValue: '',
                    communicationName: "",
                    custID: 123,
                    feedbackID: 456,
                    isHeadline: true,
                    isNew: true,
                    picInfo: "John Doe",
                }
            ];

            instance.addNewHeadlineCommunicationTools(pic);

            expect(wrapper.state('latestFeedbackCommunicationTools')).toEqual(expectedState);
        });
    });

    describe('deleteHeadlineCommunicationTool', () => {
        let wrapper;
        let instance;

        const mockProps = {
            ...props,
            setFieldValue: jest.fn(),
            handleChangeInput: jest.fn()
        }

        beforeEach(() => {
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            instance = wrapper.instance();
        });

        it('should delete a headline communication tool and update state and props correctly', async () => {
            const indexCom = 0;
            const initialState = [
                { communicationID: 1, communicationValue: 'test@example.com' },
                { communicationID: 2, communicationValue: '123-456-7890' }
            ];
            const expectedState = [
                { communicationID: 2, communicationValue: '123-456-7890' }
            ];

            wrapper.setState({ latestFeedbackCommunicationTools: initialState });

            await instance.deleteHeadlineCommunicationTool(indexCom);

            expect(wrapper.state('latestFeedbackCommunicationTools')).toEqual(expectedState);
            expect(wrapper.state('confirmDeleteCommunicationTool')).toEqual({
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            });
        });

        it('should set isOverwrite to false when the last communication tool is deleted', async () => {
            const indexCom = 0;
            const initialState = [{ communicationID: 1, communicationValue: 'test@example.com' }];
            const expectedState = [];

            wrapper.setState({ latestFeedbackCommunicationTools: initialState });

            await instance.deleteHeadlineCommunicationTool(indexCom);

            expect(wrapper.state('latestFeedbackCommunicationTools')).toEqual(expectedState);
            expect(wrapper.state('confirmDeleteCommunicationTool')).toEqual({
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            });
        });
    });

    describe('confirmDeleteHeadlineCommunicationTool', () => {
        let wrapper;
        let instance;

        const mockProps = {
            ...props,
            setFieldValue: jest.fn(),
            handleChangeInput: jest.fn()
        }

        beforeEach(() => {
            wrapper = shallow(<CustomerInfo {...mockProps} />);
            instance = wrapper.instance();
        });

        it('should delete a new headline communication tool', async () => {
            const index = 1;
            const initialState = [
                { communicationID: 1, communicationValue: 'test@example.com', isNew: false },
                { communicationID: 2, communicationValue: '123-456-7890', isNew: true }
            ];
            const expectedState = [
                { communicationID: 1, communicationValue: 'test@example.com', isNew: false }
            ];

            wrapper.setState({ latestFeedbackCommunicationTools: initialState });

            await instance.confirmDeleteHeadlineCommunicationTool(index);

            expect(wrapper.state('latestFeedbackCommunicationTools')).toEqual(expectedState);
            expect(wrapper.state('confirmDeleteCommunicationTool')).toEqual({
                show: false,
                picCommunicationTool: null,
                indexCom: -1
            });

        });

        it('should set confirm delete state for an existing headline communication tool', () => {
            const index = 0;
            const initialState = [
                { communicationID: 1, communicationValue: 'test@example.com', isNew: false },
                { communicationID: 2, communicationValue: '123-456-7890', isNew: true }
            ];

            wrapper.setState({ latestFeedbackCommunicationTools: initialState });

            instance.confirmDeleteHeadlineCommunicationTool(index);

            expect(wrapper.state('confirmDeleteCommunicationTool')).toEqual({
                show: true,
                picCommunicationTool: 1,
                indexCom: index
            });
        });
    });
});