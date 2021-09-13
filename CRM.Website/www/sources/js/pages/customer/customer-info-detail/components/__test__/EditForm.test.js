import React from 'react';
import { shallow, mount } from 'enzyme';
import { Button, Col, Form, Row, Collapse } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '../../../../../components/multiple-select/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import { Policy } from '@jsroot/common/constants';
import { EditForm } from '../EditForm';

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
        gridData: { data: { firstName: 'test', siteSetting: { id: 1, name: '22223'}, titleId: 2 } }
    };

    describe('componentDidMount', () => {
        it('should call functions api', async () => {
            // Arrange
            const props = {
                ...initProps,
                getAllSettings: jest.fn(),
                getCustomerInfoDetail: jest.fn(),
            };

            //Act
            const container = shallow(<EditForm {...props} />);

            // Assert
            expect(await props.getAllSettings).toHaveBeenCalled();
            expect(await props.getCustomerInfoDetail).toHaveBeenCalledWith({ customerId: 1754 });
        });
    });

    describe('handleCollapseExpand', () => {
        it('should update state correct', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<EditForm {...props} />).instance();

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
                onSuccess: jest.fn(),
                setEditCustomerInfoDetailDialog: jest.fn(),
                editCustomerInfoDetail: jest.fn(() => promise)
            };
            const mockEvent = { preventDefault: jest.fn() };
            const container = shallow(<EditForm {...props} />).instance();

            // Act
            container.handleSubmit(mockEvent);
            await promise;

            // Assert
            expect(props.editCustomerInfoDetail).toHaveBeenCalled();
            expect(props.onSuccess).toHaveBeenCalledWith({ customerId: 1754 });
            expect(props.setEditCustomerInfoDetailDialog).toHaveBeenCalledWith({ show: true });
            expect(container.state.isSubmitting).toEqual(false);
        });

        it('should call exactly function when unsuccess', async () => {
            // Arrange
            const promise = Promise.resolve({});
            const props = {
                ...initProps,
                editCustomerInfoDetailResult: { isSuccessful: false },
                onSuccess: jest.fn(),
                setEditCustomerInfoDetailDialog: jest.fn(),
                editCustomerInfoDetail: jest.fn(() => promise)
            };
            const mockEvent = { preventDefault: jest.fn() };
            const container = shallow(<EditForm {...props} />).instance();

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
                gridData: { data: { firstName: 'test', isHeadline: false, isDirectAccount: true, siteSetting: { id: 1, name: '22223'}, titleId: 2 } }
            }
            const mockEvent = { target: { type: 'checkbox', checked: true, name: 'isVip' } };
            const container = shallow(<EditForm {...propsData} />).instance();
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
            const formRender = shallow(container.renderPersonalInfo(container.state));
           
            // Assert
            expect(formRender.find(SelectWithSearch).length).toBe(1);
        });

        it('handleChange should call correctly', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
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
            gridData: { data: { firstName: 'test', isHeadline: true, siteSetting: { id: 1, name: '22223'}, titleId: 2 } }
        };

        it('onClick call exact function', () => {
            // Arrange
            const container = shallow(<EditForm {...props} />).instance();
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

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Form).length).toBe(1);
        });
        it('should render EditForm not correctly', () => {
            //Act
            const props = {
                ...initProps,
                allSettings: null,
                gridData: null
            };
            const container = shallow(<EditForm {...props} />);

            //Assert
            expect(container.find(Form).length).toBe(0);
            expect(container.type()).toEqual(null);
        });
    });
});