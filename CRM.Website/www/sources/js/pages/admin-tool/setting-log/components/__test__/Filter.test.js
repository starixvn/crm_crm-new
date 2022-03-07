import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import { Filter } from '../Filter';
import DatePicker from '@jsroot/components/date-picker/index';

describe('Filter', () => {
    beforeAll(() => {
        window.currentClientTime = '21/11/2021 10:05:20 AM';
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        actionLogs : [{name: 'test', value: '1'}],
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        getActionLogs: jest.fn(),
        setGridParams: jest.fn(),
        getGridSettingLogs: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly function when did mount',() => {
            // Arrange
            const props = { ...initProps };

            //Act
            const container = shallow(<Filter {...props} />);

            // Assert
            expect(props.getActionLogs).toHaveBeenCalled();
        });
    });

    describe('handleChange', () => {
        it('should call setState',() => {
            // Arrange
            const event = {
                target: {
                    name: 'handler',
                    value: 'test'
                }
            };
            //Act
            const container = shallow(<Filter />);
            container.instance().handleChange(event);

            // Assert
            expect(container.instance().state.handler).toEqual('test');
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
            expect(container.instance().maxFromDate).toBe('Sep 01, 2021');
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
            expect(container.instance().minToDate).toBe('Sep 01, 2021');
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly function when handle submit', () => {
            // Arrange
            const state = {
                handler: '',
                fromDate: 'Sep 01, 2021',
                toDate: 'Sep 01, 2021',
                actionId: 1
            };
            const expectParams = {
                username: null,
                actionId: 1,
                fromDate: 'Sep 01, 2021',
                toDate: 'Sep 01, 2021',
                pageIndex: 1,
                pageSize: 100
            };

            // Act
            const container = shallow(<Filter {...initProps}/>);
            container.instance().setState(state);
            container.instance().handleSubmit();

            // Assert
            expect(initProps.setGridParams).toHaveBeenCalledWith(expectParams);
            expect(initProps.getGridSettingLogs).toHaveBeenCalledWith(expectParams);
        });
    });

    describe('renderOptions', () => {
        it('should call return exactly expected', () => {
            // Arrange
            const props = { ...initProps };
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
                actionLogs: null
            };
            const container = shallow(<Filter {...props} />);

            //Assert
            expect(container.find(Form).length).toBe(0);
            expect(container.type()).toEqual(null);
        });

        it('change from date call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleChangeFromDate = jest.fn();
            
            // Action
            container.find(DatePicker).at(0).simulate('change');

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('change to date call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleChangeToDate = jest.fn();
            
            // Action
            container.find(DatePicker).at(1).simulate('change');

            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });
    });
});