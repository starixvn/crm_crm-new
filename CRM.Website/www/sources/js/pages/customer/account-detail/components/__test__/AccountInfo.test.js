import React from 'react';
import { shallow } from 'enzyme';
import { AccountInfo } from '../AccountInfo';

describe('AccountInfo', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        customerId: 1,
        customerInfo: {
            siteSetting: {
                name: 'test'
            }
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
        isShowAccountInfo: true
    };

    describe('handleSubmitAccountInfo', () => {
        it('should handle form submission and display success message', async () => {
            // Arrange
            const state = {
                languages: []
            };
            const props = {
                ...initProps,
                editCustomerInfoDetail: jest.fn().mockResolvedValue({ isSuccessful: true }),
                editCustomerInfoDetailResult: { isSuccessful: true },
                getCustomerById: jest.fn().mockResolvedValue()
            };
        
            // Action
            const wrapper = shallow(<AccountInfo {...props} />);
            wrapper.setState(state);
            await wrapper.instance().handleSubmitAccountInfo();
        
            // Assert
            expect(props.editCustomerInfoDetail).toHaveBeenCalled();
            expect(props.getCustomerById).toHaveBeenCalled();
        });
    });

    describe('handleChangeCountry', () => {
        it('should update state with selected country ID', () => {
            // Arrange
            const initialState = {
                homeAddressCountryId: 1,
            };
            const selectedCountryItem = { id: 1 };
        
            // Action
            const wrapper = shallow(<AccountInfo {...initProps}/>);
            wrapper.setState(initialState);
            wrapper.instance().handleChangeCountry(selectedCountryItem);
        
            // Assert
            expect(wrapper.state('homeAddressCountryId')).toEqual(selectedCountryItem.id);
        });
    });

    describe('handleChangeValue', () => {
        it('should update state with provided name-value pair', () => {
            // Arrange
            const initialState = {
                name1: 'initialValue1',
                name2: 'initialValue2',
            };
            const name = 'name1';
            const value = 'updatedValue1';
        
            // Action
            const wrapper = shallow(<AccountInfo {...initProps}/>);
            wrapper.setState(initialState);
            wrapper.instance().handleChangeValue(name, value);
        
            // Assert
            expect(wrapper.state(name)).toEqual(value);
        });
    });

    describe('renderOptions', () => {
        it('should render option element with correct key, value, and name', () => {
            // Arrange
            const name = 'Option Name';
            const item = 'optionValue';
        
            // Action
            const wrapper = shallow(<AccountInfo {...initProps}/>);
            const optionElement = wrapper.instance().renderOptions(name, item);
        
            // Assert
            expect(optionElement.type).toBe('option');
            expect(optionElement.key).toBe(item);
            expect(optionElement.props.value).toBe(item);
            expect(optionElement.props.children).toBe(name);
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
            const wrapper = shallow(<AccountInfo {...initProps}/>);
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
            const wrapper = shallow(<AccountInfo {...initProps}/>);
            wrapper.instance().handleChange(mockTextInputEvent);
            // Assert
        
            expect(wrapper.state('textInputName')).toBe('textValue');
        
            // Action
            wrapper.instance().handleChange(mockSelectEvent);
            // Assert
            expect(wrapper.state('selectInputName')).toBe(1); 
        });
    });

    describe('AccountInfo', () => {
        let wrapper;
      
        beforeEach(() => {
          wrapper = shallow(<AccountInfo {...initProps} />);
        });
      
        it('should render correctly when account info is shown', () => {
          expect(wrapper.find('Form')).toHaveLength(1);
          expect(wrapper.find('.group-account')).toHaveLength(1);
          expect(wrapper.find('.group-content')).toHaveLength(1);
        });
    });
});