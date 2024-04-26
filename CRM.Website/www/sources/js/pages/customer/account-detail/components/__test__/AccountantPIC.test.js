import React from 'react';
import { shallow } from 'enzyme';
import { AccountantPIC } from '../AccountantPIC';

describe('AccountantPIC', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        customerId: 1,
        customerInfo: {
            custId: 1,
            siteSetting: {
                name: 'test'
            },
            languages: ['1']
        },
        allSettings: {
            languages: [{
                languageId: 1,
                name: 'test'
            }],
            sites: [{
                childSites: [{
                    id: 0,
                    isActive: false,
                    isLicensee: false,
                    name: "test1"
                }],
                id: 1,
                isActive: false,
                isLicensee: false,
                name: "test2",
                siteLabel: null
            }],
            titles: [{
                displayOrder: 0,
                id: 13,
                isActive: true,
                isChild: false,
                value: "Mr"
            }],
            countries: [{
                countryCode: 0,
                displayOrder: 0,
                id: 0,
                isActive: true,
                name: "N/A"
            }],
            licenseeTypes: [{
                id: 0,
                name: "N/A"
            }]
        },
        isShowAccountantPIC: true,
        editCustomerInfoDetailResult: {
            isSuccessful: true,
            message: 'Success'
        }
    };

    describe('handleSubmitAccountPIC', () => {
        it('should handle successful submission', async () => {
            // Arrange
            const mockEditCustomerInfoDetailResult = {
                isSuccessful: true, 
                message: 'Success message' 
              };
            const props = {
                ...initProps,
                editCustomerInfoDetail: jest.fn(() => Promise.resolve(mockEditCustomerInfoDetailResult)),
                getCustomerById: jest.fn(() => Promise.resolve()),
                toast: { success: jest.fn(), error: jest.fn() }
            };
        
            // Action
            const wrapper = shallow(<AccountantPIC {...props} />);
            await wrapper.instance().handleSubmitAccountPIC();
        
            // Assert
            expect(wrapper.instance().props.editCustomerInfoDetail).toHaveBeenCalledTimes(1);
            expect(wrapper.instance().props.getCustomerById).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleChangeCheck', () => {
        it('should update state with the checked status of the input element', () => {
            // Arrange
            const mockEvent = {
                target: {
                    name: 'checkboxName',
                    checked: true 
                }
            };
        
            // Action
            const wrapper = shallow(<AccountantPIC {...initProps} />);
            wrapper.instance().handleChangeCheck(mockEvent);
        
            // Assert
            expect(wrapper.state('checkboxName')).toBe(true); 
        });
    });

    describe('handleChange', () => {
        it('should update state based on input element type', () => {
            // Arrange
            const mockTextInputEvent = {
                target: {
                    name: 'textInputName',
                    type: 'text',
                    value: 'textValue'
                }
            };
        
            const mockSelectEvent = {
                target: {
                    name: 'selectInputName',
                    type: 'select-one',
                    value: '1'
                }
            };
        
            // Action
            const wrapper = shallow(<AccountantPIC {...initProps} />);
            wrapper.instance().handleChange(mockTextInputEvent);
        
            // Assert
            expect(wrapper.state('textInputName')).toBe('textValue');
            // Action
            wrapper.instance().handleChange(mockSelectEvent);
            // Assert
            expect(wrapper.state('selectInputName')).toBe(1);
        });
    });

    describe('render', () => {
        it('should render the component correctly', () => {
            // Arrange
            const mockState = {
                updateHeadlineInfoPolicy: 1, 
                checker: true, 
                introducedBy: 1, 
                isVip: true, 
                isIgnored: false 
            };
        
            // Action
            const wrapper = shallow(<AccountantPIC {...initProps} />, { disableLifecycleMethods: true });
            wrapper.setState(mockState);
            
            // Assert
            expect(wrapper.find('Form').exists()).toBe(true);
            expect(wrapper.find('.group-title-tab').exists()).toBe(true);
            expect(wrapper.find('.group-content').exists()).toBe(true);
        });
    });
});