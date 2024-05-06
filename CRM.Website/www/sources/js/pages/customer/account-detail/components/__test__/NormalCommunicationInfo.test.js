import React from 'react';
import { shallow } from 'enzyme';
import { NormalCommunicationInfo } from '../NormalCommunicationInfo';
import { toast } from 'react-toastify';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

describe('NormalCommunicationInfo', () => {
    beforeEach(() => {

    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        customerId: 1,
        customerInfo: {
            titleId: 0,
            custId: 123,
            languages: [],
            otherAccountCommunication: [
                { communicationID: 1, communicationValue: '', isError: true, isNew: false },
                { communicationID: 2, communicationValue: 'Phone', isError: false, isNew: false },
            ]
        },
        settingCommunicationTool: [{
            settingValue: 'test',
            settingId: 1
        }],
        editCustomerInfoDetailResult: {
            isSuccessful: true,
            message: 'test'
        },
        setErrors: jest.fn(),
        editCustomerInfoDetail: jest.fn(),
        getCustomerById: jest.fn()
    };


    describe('componentDidMount', () => {
        it('should set state correctly and update document title', async () => {

            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            await wrapper.instance().componentDidMount();

            expect(initProps.getCustomerById).toHaveBeenCalledWith({ customerId: 1 });
            expect(document.title).toEqual('CRMSystem');
        });
    });

    describe('renderOptions', () => {
        it('should render option with correct key and value', () => {
            const name = 'Option Name';
            const item = 'option_value';

            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            wrapper.instance().getWidth = jest.fn();
            const instance = wrapper.instance().renderOptions(name, item);

            expect(instance.type).toEqual('option');
            expect(instance.props.children).toEqual(name);
            expect(instance.props.value).toEqual(item);
            expect(instance.key).toEqual(item);
        });
    });

    describe('validateCommunicationInfo', () => {
        it('should return null when there are no errors', () => {
            const otherAccountCommunication = [
                { communicationID: 1, communicationValue: 'Email', isError: false, isNew: false },
                { communicationID: 2, communicationValue: 'Phone', isError: false, isNew: false },
            ];

            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            wrapper.instance().getWidth = jest.fn();
            wrapper.setState({
                otherAccountCommunication: otherAccountCommunication
            });
            const errors = wrapper.instance().validateCommunicationInfo();

            // Assertions
            expect(errors).toBeNull();
        });

        it('should return errors when there are validation errors', () => {
            const otherAccountCommunication = [
                { communicationID: 1, communicationValue: '', isError: false, isNew: false },
                { communicationID: 2, communicationValue: 'Phone', isError: false, isNew: false },
            ];

            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            wrapper.instance().getWidth = jest.fn();
            wrapper.setState({
                otherAccountCommunication: otherAccountCommunication
            });
            const errors = wrapper.instance().validateCommunicationInfo();

            expect(errors).toEqual({ communication: "CommunicationRequired" });
        });
    });

    describe('handleChangeCommunication', () => {
        it('should update state correctly when called with valid input', () => {
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            instance.state = {
                otherAccountCommunication: [
                    { communicationID: 1, communicationValue: 'Email', isError: false, isNew: false }
                ],
                isValidate: true,
                confirmDelete: {
                    show: false,
                    communicationValue: null,
                    communicationID: null
                },
            };

            instance.handleChangeCommunication('communicationValue', 'New Email', 0);

            expect(instance.state.otherAccountCommunication[0].communicationValue).toEqual('New Email');
        });

        it('should call validateCommunicationInfo when isValidate is true', () => {
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            const mockValidateCommunicationInfo = jest.spyOn(instance, 'validateCommunicationInfo');

            instance.state = {
                otherAccountCommunication: [
                    { communicationID: 1, communicationValue: 'Email', isError: false, isNew: false }
                ],
                isValidate: true,
                confirmDelete: {
                    show: false,
                    communicationValue: null,
                    communicationID: null
                },
            };

            instance.handleChangeCommunication('communicationValue', 'New Email', 0);

            expect(mockValidateCommunicationInfo).toHaveBeenCalled();
        });

        it('should not call validateCommunicationInfo when isValidate is false', () => {
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            const mockValidateCommunicationInfo = jest.spyOn(instance, 'validateCommunicationInfo');

            instance.state = {
                otherAccountCommunication: [
                    { communicationID: 1, communicationValue: 'Email', isError: false, isNew: false }
                ],
                isValidate: false,
                confirmDelete: {
                    show: false,
                    communicationValue: null,
                    communicationID: null
                },
            };

            instance.handleChangeCommunication('communicationValue', 'New Email', 0);

            expect(mockValidateCommunicationInfo).not.toHaveBeenCalled();
        });
    });

    describe('getWidth', () => {
        it('should calculate width correctly for valid input', () => {
            const component = new NormalCommunicationInfo();
            const picCommunicationTool = { communicationID: 1 };
            const settingCommunicationTool = [
                { settingId: 1, settingValue: 'ExampleValue1' }
            ];

            const width = component.getWidth(picCommunicationTool, settingCommunicationTool);
            expect(width).toBe(8 * 'ExampleValue1'.length + 24);
        });
    });

    describe('deleteCommunicationTool', () => {
        it('should not modify the state array if the specified communication tool is not found', () => {
            const component = new NormalCommunicationInfo();
            const value = 'NonExistentValue';
            const type = 1;

            component.state = {
                otherAccountCommunication: [
                    { communicationID: 1, communicationValue: 'Value1' },
                    { communicationID: 2, communicationValue: 'Value2' },
                    { communicationID: 3, communicationValue: 'Value3' },
                ],
            };

            component.deleteCommunicationTool(value, type);

            expect(component.state.otherAccountCommunication).toEqual([
                { communicationID: 1, communicationValue: 'Value1' },
                { communicationID: 2, communicationValue: 'Value2' },
                { communicationID: 3, communicationValue: 'Value3' },
            ]);
        });
    });

    describe('handleConfirmDeleteCommunicationTool', () => {
        it('should delete a communication tool if isNew is true', () => {
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();
            instance.deleteCommunicationTool = jest.fn();
            const picCommunicationTool = {
                isNew: true,
                communicationValue: 'ValueToDelete',
                communicationID: 1,
            };

            const deleteSpy = jest.spyOn(instance, 'deleteCommunicationTool');

            instance.handleConfirmDeleteCommunicationTool(picCommunicationTool, 0);

            expect(deleteSpy).toHaveBeenCalledWith('ValueToDelete', 1);
        });
    });

    describe('addNewCommunicationTool', () => {
        it('should add a new communication tool to the state', () => {
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            wrapper.setState({
                otherAccountCommunication: []
            });
            const instance = wrapper.instance();

            instance.addNewCommunicationTool();

            expect(instance.state.otherAccountCommunication).toEqual([{
                communicationID: '',
                communicationValue: '',
                isError: false,
                isNew: true
            }]);
        });
    });

    describe('YourComponent', () => {
        it('should call checkCustomerExistsOnCRM when there are no errors', async () => {
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            jest.spyOn(instance, 'validateCommunicationInfo').mockReturnValue(null);

            const mockCheckCustomerExistsOnCRM = jest.fn();
            instance.checkCustomerExistsOnCRM = mockCheckCustomerExistsOnCRM;
            await instance.handleSubmitOtherCommunicationInfo();

            expect(instance.validateCommunicationInfo).toHaveBeenCalled();
            expect(mockCheckCustomerExistsOnCRM).toHaveBeenCalled();
        });

        it('should not call checkCustomerExistsOnCRM when there are errors', async () => {
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            const instance = wrapper.instance();

            jest.spyOn(instance, 'validateCommunicationInfo').mockReturnValue({ /* Some errors */ });

            const mockCheckCustomerExistsOnCRM = jest.fn();
            instance.checkCustomerExistsOnCRM = mockCheckCustomerExistsOnCRM;
            await instance.handleSubmitOtherCommunicationInfo();

            expect(instance.validateCommunicationInfo).toHaveBeenCalled();
            expect(mockCheckCustomerExistsOnCRM).not.toHaveBeenCalled();
        });
    });

    describe('getPicCommunicationTools', () => {
        it('should combine communication values for each communication ID', () => {
            const component = new NormalCommunicationInfo();
            component.state.otherAccountCommunication = [
                { communicationID: '1', communicationValue: 'Email' },
                { communicationID: '2', communicationValue: 'Phone' },
                { communicationID: '1', communicationValue: 'Text' },
            ];

            const result = component.getPicCommunicationTools();

            expect(result).toEqual([
                { communicationID: '1', communicationValue: 'Email, Text' },
                { communicationID: '2', communicationValue: 'Phone' },
            ]);
        });

        it('should return an empty array if otherAccountCommunication is empty', () => {
            const component = new NormalCommunicationInfo();
            component.state.otherAccountCommunication = [];

            const result = component.getPicCommunicationTools();

            expect(result).toEqual([]);
        });
    });

    describe('editOtherAccountCommunicationInfo', () => {
        it('should edit other account communication info successfully', async () => {
            const component = new NormalCommunicationInfo();

            component.props = {
                customerInfo: {
                    custId: '123',
                    otherAccountCommunicationInfos: [
                        { communicationID: '1', communicationValue: 'Email' },
                        { communicationID: '2', communicationValue: 'Phone' },
                    ],
                },
            };
            component.state = {
                otherAccountCommunication: [
                    { communicationID: '1', communicationValue: 'New Email' },
                    { communicationID: '2', communicationValue: 'New Phone' },
                ],
            };

            const mockResponse = { data: { isSuccessful: true } };
            const postDataAsyncMock = jest.fn().mockResolvedValue(mockResponse);
            component.props.getCustomerById = jest.fn().mockResolvedValue();
            component.setState = jest.fn();
            toast.success = jest.fn();
            toast.error = jest.fn();
            Site.blockUI = jest.fn();
            Site.resolveClientUrl = jest.fn().mockReturnValue('mockUrl');
            DataService.postDataAsync = postDataAsyncMock;

            await component.editOtherAccountCommunicationInfo();

            expect(postDataAsyncMock).toHaveBeenCalledWith('mockUrl', {
                custID: '123',
                otherCommunicationTools: [
                    { communicationID: '1', communicationValue: 'New Email' },
                    { communicationID: '2', communicationValue: 'New Phone' },
                ],
            });
            expect(component.props.getCustomerById).toHaveBeenCalledWith({ customerId: '123' });
        });

        it('should handle error response', async () => {
            const component = new NormalCommunicationInfo();

            component.props = {
                customerInfo: { custId: '123', otherAccountCommunicationInfos: [] },
            };
            component.state = {
                otherAccountCommunication: [],
            };

            const mockErrorResponse = { data: { isSuccessful: false, message: 'Error message' } };
            const postDataAsyncMock = jest.fn().mockRejectedValue(mockErrorResponse);
            toast.error = jest.fn();
            Site.blockUI = jest.fn();
            Site.resolveClientUrl = jest.fn().mockReturnValue('mockUrl');
            DataService.postDataAsync = postDataAsyncMock;

            await component.editOtherAccountCommunicationInfo();

            expect(postDataAsyncMock).toHaveBeenCalledWith('mockUrl', {
                custID: '123',
                otherCommunicationTools: [],
            });
        });
    });

    describe('checkCustomerExistsOnCRM', () => {
        it('should call editOtherAccountCommunicationInfo if customer exists on CRM', async () => {
            const component = new NormalCommunicationInfo();

            component.props = {
                customerInfo: { custId: '123' },
            };
            Site.blockUI = jest.fn();
            Site.resolveClientUrl = jest.fn().mockReturnValue('mockUrl');
            DataService.postDataAsync = jest.fn().mockResolvedValue({ data: 1 });
            component.editOtherAccountCommunicationInfo = jest.fn().mockResolvedValue();
            Site.unblockUI = jest.fn();

            await component.checkCustomerExistsOnCRM();

            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('mockUrl', { customerId: '123' });
            expect(component.editOtherAccountCommunicationInfo).toHaveBeenCalled();
            expect(Site.unblockUI).toHaveBeenCalled();
        });

        it('should call updateNewCrmCustomer if customer does not exist on CRM', async () => {
            const component = new NormalCommunicationInfo();

            component.props = {
                customerInfo: { custId: '456' },
            };
            Site.blockUI = jest.fn();
            Site.resolveClientUrl = jest.fn().mockReturnValue('mockUrl');
            DataService.postDataAsync = jest.fn().mockResolvedValue({ data: 0 });
            component.updateNewCrmCustomer = jest.fn().mockResolvedValue();
            Site.unblockUI = jest.fn();

            await component.checkCustomerExistsOnCRM();

            expect(component.updateNewCrmCustomer).toHaveBeenCalled();
        });

        it('should handle error response', async () => {
            const component = new NormalCommunicationInfo();

            component.props = {
                customerInfo: { custId: '789' },
            };
            Site.blockUI = jest.fn();
            Site.resolveClientUrl = jest.fn().mockReturnValue('mockUrl');
            DataService.postDataAsync = jest.fn().mockRejectedValue(new Error('Mock error'));
            Site.handleAxiosError = jest.fn();
            Site.unblockUI = jest.fn();

            await component.checkCustomerExistsOnCRM();

            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('mockUrl', { customerId: '789' });
            expect(Site.handleAxiosError).toHaveBeenCalled();
        });
    });

    describe('updateNewCrmCustomer', () => {
        it('should call editOtherAccountCommunicationInfo if editCustomerInfoDetail is successful', async () => {
            const component = new NormalCommunicationInfo();

            component.props = {
                ...initProps,
                editCustomerInfoDetail: jest.fn().mockResolvedValue({ isSuccessful: true }),
            };
            component.editOtherAccountCommunicationInfo = jest.fn().mockResolvedValue();

            await component.updateNewCrmCustomer();

            expect(component.props.editCustomerInfoDetail).toHaveBeenCalled();
            expect(component.editOtherAccountCommunicationInfo).toHaveBeenCalled();
        });
    });

    describe('renderComfirmDeleteCommunicationTool', () => {
        it('should render the confirmation message with the correct communication tool value', () => {
            const component = new NormalCommunicationInfo();

            component.props = {
                settingCommunicationTool: [
                    { settingId: 1, settingValue: 'Email' },
                    { settingId: 2, settingValue: 'Phone' },
                ],
            };
            component.state = {
                confirmDelete: {
                    communicationID: 1,
                },
            };

            const renderedMessage = component.renderComfirmDeleteCommunicationTool();

            expect(renderedMessage).toEqual(<>
                <div className="confirm-headline">Are you going to delete the <strong>Email</strong> communication tool?</div>
            </>);
        });
    });

    describe('render component', () => {
        it('should render correctly when customerInfo is available', () => {
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            expect(wrapper.exists()).toBeTruthy();
        });

        it('should render communication tools correctly', () => {
            const otherAccountCommunication = [
                { communicationID: 1, communicationValue: 'Value 1', isError: false, isNew: false }
            ];
            const wrapper = shallow(<NormalCommunicationInfo {...initProps} />);
            wrapper.setState({ otherAccountCommunication });
            expect(wrapper.find('.other-communication-tool')).toHaveLength(1);
        });
    });
});