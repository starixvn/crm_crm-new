import React from 'react';
import { Filter } from '../Filter';
import DateTimeService from '@jsroot/common/dateTimeService';
import DatePicker from '@jsroot/components/date-picker/index';
import { shallow } from 'enzyme';

describe('Filter', () => {
    beforeAll(() => {
        window.currentClientTime = '4/8/2021 10:05:20 AM';
    });

    describe('handleChangeFromDate', () => {
        it('should update toDate when fromDate is change', () => {
            // Arrange
           
            const fromDate = new Date('01/01/2022 5:20:25 PM');
            const state = {
                toDate: new Date('01/12/2021 5:20:25 PM')
            };
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
            const container = shallow(<Filter />);
            container.instance().setState(state);
            // Act
            container.instance().handleChangeFromDate(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('01/01/2022 5:20:25 PM'));
            expect(container.state().toDate).toEqual(new Date('01/01/2022 5:20:25 PM'));
        });
        
    });

    describe('handleChangeToDate', () => {
        it('should update toDate', () => {
            // Arrange
            const toDate = new Date('01/01/2022 9:05:20 AM');       
            const container = shallow(<Filter />);
            // Act
            container.instance().handleChangeToDate(toDate);

            // Assert
            expect(container.state().toDate).toEqual(new Date('01/01/2022 9:05:20 AM'));
        });
    });

    // describe('handleSubmit', () => {
    //     it('should call exactly functions when submit', () => {
    //         // Arrange
    //         const state = {
    //             handler: '',
    //             fromDate: '01/01/2022',
    //             toDate: '01/01/2022',
    //             deletedBy: ''
    //         };
    //         const props = {
    //             setGridParams: jest.fn(),
    //             getDeletedFeedbackStatistic: jest.fn()
    //         };
    //         const expectedParams = {
    //             handler: null,
    //             deletedBy: null,
    //             fromDate: DateTimeService.toShortDateFormat(state.fromDate),
    //             toDate: DateTimeService.toShortDateFormat(state.toDate)
    //         };
            
    //         //Act
    //         const container = shallow(<Filter {...props} />);
    //         container.instance().setState(state);
    //         container.find("Form").simulate("submit");

    //         // Assert
    //         expect(container.find("Form")).toHaveLength(1);
    //         expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
    //         expect(props.getDeletedFeedbackStatistic).toHaveBeenCalledWith(expectedParams);
    //     });
    // });

    describe('handleChange', () => {
        it("should call setState", () => {
            // Arrange
            
            const name = 'handler';
            const value = "123";
            
            //Act
            const container = shallow(<Filter />);
            container.find('FormControl[name="handler"]').at(0).simulate("change", { target: { name, value } });

            // Assert
            expect(container.find('FormControl[name="handler"]')).toHaveLength(1);
            expect(container.state().handler).toBe('123');
        });
    });

    describe('render', () => {
        it('handleChange fromDate call exact function', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<Filter />);
            container.instance().handleChangeFromDate = jest.fn();

            // Action
            container.find(DatePicker).at(0).simulate('change', value);

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('handleChange toDate call exact function', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<Filter />);
            container.instance().handleChangeToDate = jest.fn();

            // Action
            container.find(DatePicker).at(1).simulate('change', value);

            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });
    });
});