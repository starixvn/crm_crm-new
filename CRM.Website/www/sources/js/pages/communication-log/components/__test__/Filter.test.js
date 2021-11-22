import React from 'react';
import { Filter } from '../Filter';
import { Form } from 'react-bootstrap';
import DatePicker from '@jsroot/components/date-picker/index';
import { shallow } from 'enzyme';

describe('Filter', () => {
    beforeAll(() => {
        window.currentClientTime = '24/9/2021 10:05:20 AM';
    });

    const initProps = {
        statusFilter: [{ sites: {id: 1}}],
        getLogsByCustomerId: jest.fn(),
        setGridParams: jest.fn(),
        getStatusForFilter: jest.fn(),
    }

    describe('componentDidMount', () => {
        it('should call exactly function when did mount',() => {
            // Arrange
            const props = {
                ...initProps
            };

            //Act
            const container = shallow(<Filter {...props} />);
            container.instance().setState({
                fromDate: 'Sep 05, 2021',
                toDate: 'Sep 10, 2021'
            });

            // Assert
            expect(props.getLogsByCustomerId).toHaveBeenCalled();
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getStatusForFilter).toHaveBeenCalled();
        });
    });

    describe('handleChange', () => {
        it('should call setState exactly when handle change with no type', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'stateName', value: 720}}
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().stateName).toBe(720);
        });

        it('should call setState exactly when handle change with have type', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'stateName', value: 20, type: 'select-one'}}
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().stateName).toBe(20);
        });
    });

    describe('handleChangeToDate', () => {
        it('should call setState exactly when handle change to date', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeToDate('Sep 01, 2021');
           
            // Assert
            expect(container.state().toDate).toBe('Sep 01, 2021');
            expect(container.state().maxFromDate).toBe('Sep 01, 2021');
        });
    });

    describe('handleChangeFromDate', () => {
        it('should call setState exactly when handle change from date', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeFromDate('Sep 01, 2021');
           
            // Assert
            expect(container.state().fromDate).toBe('Sep 01, 2021');
            expect(container.state().minToDate).toBe('Sep 01, 2021');
        });
    });

    describe('handleSubmit', () => {
        it('should call setState exactly when handle submit', () => {
            // Arrange
            const props = {
                ...initProps
            };
            const mockEvent = {
                preventDefault: jest.fn()
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().setState({ statusId: 10002, handler: 'sa' });
            container.instance().handleSubmit(mockEvent);

            // Assert
            expect(props.getLogsByCustomerId).toHaveBeenCalled();
        });
    });

    describe('renderOptions', () => {
        it('should call return exactly expected', () => {
            // Arrange
            const props = {
                ...initProps
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            const actual = container.instance().renderOptions('test',1,1);

            // Assert
            expect(actual).toEqual(<option key={1} value={1}>{'test'}</option>);
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                statusFilter: null
            };
            const container = shallow(<Filter {...props} />);

            //Assert
            expect(container.find(Form).length).toBe(0);
            expect(container.type()).toEqual(null);
        });

        it('onChange call exact function', () => {
            // Arrange
            const props = { ...initProps };
            const container = shallow(<Filter {...props} />).instance();
            container.handleChange = jest.fn();
            const formRender = shallow(container.render());

            // Action
            formRender.find(Form.Control).at(0).simulate('change');
            formRender.find(Form.Control).at(1).simulate('change');

            // Assert
            expect(container.handleChange).toHaveBeenCalled();
        });

        it('handleChange fromDate call exact function', () => {
            // Arrange
            const props = { ...initProps };
            const value = 'value';
            const container = shallow(<Filter {...props} />).instance();
            container.handleChangeFromDate = jest.fn();
            const formRender = shallow(container.render());

            // Action
            formRender.find(DatePicker).at(0).simulate('change', value);

            // Assert
            expect(container.handleChangeFromDate).toHaveBeenCalled();
        });

        it('handleChange toDate call exact function', () => {
            // Arrange
            const props = { ...initProps };
            const value = 'value';
            const container = shallow(<Filter {...props} />).instance();
            container.handleChangeToDate = jest.fn();
            const formRender = shallow(container.render());

            // Action
            formRender.find(DatePicker).at(1).simulate('change', value);

            // Assert
            expect(container.handleChangeToDate).toHaveBeenCalled();
        });
    });
});