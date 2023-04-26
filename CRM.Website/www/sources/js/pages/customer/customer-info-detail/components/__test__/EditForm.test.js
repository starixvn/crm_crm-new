import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '../../../../../components/multiple-select/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import { EditForm } from '../EditForm';
import toJson from 'enzyme-to-json';

describe('EditForm', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        allSettings: { 
            countries: [{ id: 1, name: 'country' }],
            languages: [{ languageId: 1, name: 'English'}],
            titles: [{ id: 1, value: 'Mr'}],
            licenseeTypes: [{ id: 1, name: 'Betting'}],
            sites: [{ id: 1, name: '22225'}]
        },
        customerInfo: { firstName: 'test', siteSetting: { id: 1, name: '22223'}, titleId: 2 },
        getAllSettings: jest.fn(),
        getCustomerById: jest.fn(),
        id: 1754
    };
    const state = {
            languages: [1],
            titleId: 1
    };

    describe('componentDidMount', () => {
        it('should call functions api', async () => {
            // Arrange
            //Act
            const container = shallow(<EditForm {...initProps} />);
            container.instance().setState(state);
            // Assert
            expect(await initProps.getAllSettings).toHaveBeenCalled();
            expect(await initProps.getCustomerById).toHaveBeenCalledWith({ customerId: 1754 });
        });
    });

    describe('handleCollapseExpand', () => {
        it('should update state correct', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            // Act
            container.handleCollapseExpand('personalInfo');

            // Assert
            expect(container.state.collapse).toEqual({
                personalInfo: true,
                communicationInfo: false,
                headlineInfo: false,
                homeAddress: false,
                bankInfo: false
            });
        });
        it('should not update state correct', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            // Act
            container.handleCollapseExpand();

            // Assert
            expect(container.state.collapse).toEqual({
                "": true,
                personalInfo: false,
                communicationInfo: false,
                headlineInfo: false,
                homeAddress: false,
                bankInfo: false
            });
        });
    });

    describe('handleChange', () => {
        it('should call setState when change firstName field', () => {
            // Arrange
            const props = {...initProps};
            const mockEvent = { target: { value: 'test', name: 'firstName' } };
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            // Act
            container.handleChange(mockEvent);

            // Assert
            expect(container.state.firstName).toEqual('test');
        });
    });

    describe('handleChangeCheck', () => {
        it('should call setState when change check', () => {
            // Arrange
            const props = {...initProps};
            const mockEvent = { target: { type: 'checkbox', checked: true, name: 'isVip' } };

            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            // Act
            container.handleChangeCheck(mockEvent);

            // Assert
            expect(container.state.isVip).toEqual(true);
        });
    });

    describe('handleChangeValue', () => {
        it('should call setState when change check', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            // Act
            container.handleChangeValue('languages','1200');

            // Assert
            expect(container.state.languages).toEqual('1200');
        });
    });
    
    describe('handleSubmit', () => {
        it('should call exactly function when success', async () => {
            // Arrange
            const promise = Promise.resolve({});
            const props = {
                ...initProps,
                editCustomerInfoDetailResult: { isSuccessful: true },
                editCustomerInfoDetail: jest.fn(() => promise)
            };
            const mockEvent = { preventDefault: jest.fn() };
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            // Act
            container.handleSubmit(mockEvent);
            await promise;

            // Assert
            expect(props.editCustomerInfoDetail).toHaveBeenCalled();
            expect(container.state.isSubmitting).toEqual(false);
        });

        it('should call exactly function when unsuccess', async () => {
            // Arrange
            const promise = Promise.resolve({});
            const props = {
                ...initProps,
                editCustomerInfoDetailResult: { isSuccessful: false },
                editCustomerInfoDetail: jest.fn(() => promise)
            };
            const mockEvent = { preventDefault: jest.fn() };
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            // Act
            container.handleSubmit(mockEvent);
            await promise;

            // Assert
            expect(props.editCustomerInfoDetail).toHaveBeenCalled();
            expect(container.state.isSubmitting).toEqual(false);
        });
    });

    describe('renderOptions', () => {
        it('should render option correctly', () => {
            //Arrange
            const props = {...initProps};
            //Act
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            const option = container.renderOptions('test',1);

            //Assert
            expect(option).toEqual(<option key={1} value={1}>test</option>);
        });
    });

    describe('renderPersonalInfo', () => {
        const props = {...initProps};

        it('onClick call exact function', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleCollapseExpand = jest.fn();
            const formRender = shallow(container.renderPersonalInfo(container.state));

            // Action
            formRender.find(Form.Group).at(0).simulate('click');

            // Assert
            expect(container.handleCollapseExpand).toHaveBeenCalled();
        });

        it('handleChange birthDay call exact function', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleChangeValue = jest.fn();
            const formRender = shallow(container.renderPersonalInfo(container.state));

            // Action
            formRender.find(DatePicker).at(0).simulate('change', value);

            // Assert
            expect(container.handleChangeValue).toHaveBeenCalled();
        });

        it('languages multipleSelect change correctly', () => {
            // Arrange
            const currentItem = 'currentItem';
            const selectedItemsKey = 'selectedItemsKey';
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleChangeValue = jest.fn();
            const formRender = shallow(container.renderPersonalInfo(container.state));

            // Action
            formRender.find(MultipleSelect).at(0).simulate('change', currentItem, selectedItemsKey);

            // Assert
            expect(container.handleChangeValue).toHaveBeenCalledWith('languages', selectedItemsKey);
        });

        it('handleChange check box correctly', () => {
            // Arrange
            const propsData = {
                ...initProps,
                customerInfo: { firstName: 'test', isHeadline: false, isDirectAccount: true, siteSetting: { id: 1, name: '22223'}, titleId: 2 }
            }
            const mockEvent = { target: { type: 'checkbox', checked: true, name: 'isVip' } };
            const container = shallow(<EditForm {...propsData} />).instance();
            container.setState(state);
            container.handleChangeCheck = jest.fn();
            const formRender = shallow(container.renderPersonalInfo(container.state));

            // Action
            formRender.find(Form.Check).at(0).simulate('change', mockEvent);
            formRender.find(Form.Check).at(1).simulate('change', mockEvent);

            // Assert
            expect(container.handleChangeCheck).toHaveBeenCalledWith(mockEvent);
        });

        it('site SelectWithSearch change correctly', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            const formRender = shallow(container.renderPersonalInfo(container.state));
           
            // Assert
            expect(formRender.find(SelectWithSearch).length).toBe(1);
        });

        it('handleChange should call correctly', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleChange = jest.fn();
            const formRender = shallow(container.renderPersonalInfo(container.state));

            // Action
            formRender.find(Form.Control).at(0).simulate('change');
            formRender.find(Form.Control).at(1).simulate('change');
            formRender.find(Form.Control).at(2).simulate('change');
            formRender.find(Form.Control).at(3).simulate('change');
            formRender.find(Form.Control).at(4).simulate('change');
            formRender.find(Form.Control).at(5).simulate('change');
            formRender.find(Form.Control).at(6).simulate('change');

            // Assert
            expect(container.handleChange).toHaveBeenCalled();
        });
    });

    describe('renderHeadlineInfo', () => {
        const props = {
            ...initProps,
            customerInfo: { firstName: 'test', isHeadline: true, siteSetting: { id: 1, name: '22223'}, titleId: 2 }
        };

        it('onClick call exact function', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleCollapseExpand = jest.fn();
            const formRender = shallow(container.renderHeadlineInfo(container.state, true));

            // Action
            formRender.find(Form.Group).at(0).simulate('click');

            // Assert
            expect(container.handleCollapseExpand).toHaveBeenCalled();
        });

        it('handleChange check box correctly', () => {
            // Arrange
            const mockEvent = { target: { type: 'checkbox', checked: true, name: 'isVip' } };
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleChangeCheck = jest.fn();
            const formRender = shallow(container.renderHeadlineInfo(container.state, true));

            // Action
            formRender.find(Form.Check).at(0).simulate('change', mockEvent);
            formRender.find(Form.Check).at(1).simulate('change', mockEvent);

            // Assert
            expect(container.handleChangeCheck).toHaveBeenCalledWith(mockEvent);
        });

        it('handleChange should call correctly', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleChange = jest.fn();
            const formRender = shallow(container.renderHeadlineInfo(container.state, true));

            // Action
            formRender.find(Form.Control).at(0).simulate('change');
            formRender.find(Form.Control).at(1).simulate('change');

            // Assert
            expect(container.handleChange).toHaveBeenCalled();
        });
    });

    describe('renderCommunicationInfo', () => {
        const props = {...initProps};

        it('onClick call exact function', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleCollapseExpand = jest.fn();
            const formRender = shallow(container.renderCommunicationInfo(container.state));

            // Action
            formRender.find(Form.Group).at(0).simulate('click');

            // Assert
            expect(container.handleCollapseExpand).toHaveBeenCalled();
        });

        it('handleChange should call correctly', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleChange = jest.fn();
            const formRender = shallow(container.renderCommunicationInfo(container.state));

            // Action
            formRender.find(Form.Control).at(0).simulate('change');
            formRender.find(Form.Control).at(1).simulate('change');

            // Assert
            expect(container.handleChange).toHaveBeenCalled();
        });
    });

    describe('renderHomeAddress', () => {
        const props = {...initProps};

        it('onClick call exact function', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleCollapseExpand = jest.fn();
            const formRender = shallow(container.renderHomeAddress(container.state));

            // Action
            formRender.find(Form.Group).at(0).simulate('click');

            // Assert
            expect(container.handleCollapseExpand).toHaveBeenCalled();
        });

        it('handleChange should call correctly', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleChange = jest.fn();
            const formRender = shallow(container.renderHomeAddress(container.state));

            // Action
            formRender.find(Form.Control).at(0).simulate('change');
            formRender.find(Form.Control).at(1).simulate('change');

            // Assert
            expect(container.handleChange).toHaveBeenCalled();
        });
    });

    describe('renderBankInfo', () => {
        const props = {...initProps};

        it('onClick call exact function', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleCollapseExpand = jest.fn();
            const formRender = shallow(container.renderBankInfo(container.state));

            // Action
            formRender.find(Form.Group).at(0).simulate('click');

            // Assert
            expect(container.handleCollapseExpand).toHaveBeenCalled();
        });

        it('handleChange should call correctly', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
            container.setState(state);
            container.handleChange = jest.fn();
            const formRender = shallow(container.renderBankInfo(container.state));

            // Action
            formRender.find(Form.Control).at(0).simulate('change');
            formRender.find(Form.Control).at(1).simulate('change');

            // Assert
            expect(container.handleChange).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render EditForm correctly', () => {
            //Act
            const props = {...initProps};
            const container = shallow(<EditForm {...props} />);
            container.instance().setState(state);

            //Assert
            expect(toJson(container)).toMatchSnapshot();
        });
        it('should render EditForm not correctly', () => {
            //Act
            const props = {
                ...initProps,
                allSettings: null,
                customerInfo: null
            };
            const container = shallow(<EditForm {...props} />);
            container.instance().setState(state);
            //Assert
            expect(container.find(Form).length).toBe(0);
            expect(container.type()).toEqual(null);
        });
    });
});