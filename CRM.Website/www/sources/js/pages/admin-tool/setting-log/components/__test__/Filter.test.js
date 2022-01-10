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
});