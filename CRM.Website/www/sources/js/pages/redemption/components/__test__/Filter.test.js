import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import { Filter } from '../Filter'
import DatePicker from '@jsroot/components/date-picker/index';

describe('Filter', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        allStatus: { statuses: ['KIV', 'Open', 'Delete'] },
        setGridParams: jest.fn(),
        getLogsByCustomerId: jest.fn(),
        getAllStatus: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = { ...initProps };

            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().componentDidMount();

            // Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getLogsByCustomerId).toHaveBeenCalled();
            expect(props.getAllStatus).toHaveBeenCalled();
        });
    });

    describe('handleChangeToDate', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = { ...initProps };

            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeToDate('Nov 14, 2021');

            // Assert
            expect(container.state().toDate).toBe('Nov 14, 2021');
            expect(container.state().maxFromDate).toBe('Nov 14, 2021');
        });
    });

    describe('handleChangeFromDate', () => {
        it('should call exactly function', () => {
            // Arrange
            const props = { ...initProps };

            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().handleChangeFromDate('Nov 14, 2021');

            // Assert
            expect(container.state().fromDate).toBe('Nov 14, 2021');
            expect(container.state().minToDate).toBe('Nov 14, 2021');
        });
    });

    describe('handleChange', () => {
        it('should call setState exactly when handle change with no type', () => {
            // Arrange
            const props = { ...initProps };
            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'stateName', value: 720}}
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().stateName).toBe(720);
        });

        it('should call setState exactly when handle change with have type', () => {
            // Arrange
            const props = { ...initProps };
            // Act
            const container = shallow(<Filter {...props}/>);
            const mockEvent = { target: { name: 'stateName', value: 20, type: 'select-one'}}
            container.instance().handleChange(mockEvent);
           
            // Assert
            expect(container.state().stateName).toBe(20);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly prop function', () => {
            // Arrange
            const props = { ...initProps };
            const mockEvent = {
                preventDefault: jest.fn()
            };
            // Act
            const container = shallow(<Filter {...props}/>);
            container.instance().handleSubmit(mockEvent);

            // Assert
            expect(props.getLogsByCustomerId).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const props = {
                ...initProps,
                allStatus: null
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

            // Act
            formRender.find(Form.Control).at(0).simulate('change');

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

            // Act
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

            // Act
            formRender.find(DatePicker).at(1).simulate('change', value);

            // Assert
            expect(container.handleChangeToDate).toHaveBeenCalled();
        });
    });
});