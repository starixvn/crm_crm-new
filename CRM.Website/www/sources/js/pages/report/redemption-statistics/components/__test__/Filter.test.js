import React from 'react';
import { Filter } from '../Filter';
import DateTimeService from '@jsroot/common/dateTimeService';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { shallow } from 'enzyme';

describe('Filter', () => {
    beforeAll(() => {
        window.currentClientTime = '4/8/2021 10:05:20 AM';
    });

    const initProps = {
        settings: { currencies: [{id: 2,name: "RM"}] , statuses:[{statusId: 11008, name: "KIV", displayOrder: 1, isActive: true}]},
        setOpenDetails: jest.fn(),
        setGridParams: jest.fn(),
        getRedemptionSummary: jest.fn()
    };

    describe('handleChangeFromDate', () => {
        it('should update toDate when fromDate is change', () => {
            // Arrange
           
            const fromDate = new Date('01/01/2022 5:20:25 PM');
            const state = {
                toDate: new Date('01/12/2021 5:20:25 PM')
            };
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
            const container = shallow(<Filter {...initProps}/>);
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
            const container = shallow(<Filter {...initProps}/>);
            // Act
            container.instance().handleChangeToDate(toDate);

            // Assert
            expect(container.state().toDate).toEqual(new Date('01/01/2022 9:05:20 AM'));
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when submit', () => {
            // Arrange
            const state = {
                reportBy: 2,
                statusIds: '1,2',
                currencyIds: '4,5',
                fromDate: '01/01/2022',
                toDate: '01/01/2022',
                subject: ''
            };
            const expectedParams = {
                subject: '',
                currencyId: '4,5',
                statusId: '1,2',
                reportBy: 2,
                fromDate: DateTimeService.toShortDateFormat(state.fromDate),
                toDate: DateTimeService.toShortDateFormat(state.toDate)
            };
            
            //Act
            const container = shallow(<Filter {...initProps} />);
            container.instance().setState(state);
            container.find("Form").simulate("submit");

            // Assert
            expect(container.find("Form")).toHaveLength(1);
            expect(initProps.setGridParams).toHaveBeenCalledWith(expectedParams);
            expect(initProps.setOpenDetails).toHaveBeenCalledWith({ show: false});
            expect(initProps.getRedemptionSummary).toHaveBeenCalledWith(expectedParams);
        });
    });

    describe('handleChange', () => {
        it("should call setState", () => {
            // Arrange
            
            const name = 'reportBy';
            const value = "1";
            
            //Act
            const container = shallow(<Filter {...initProps}/>);
            container.find('FormControl[name="reportBy"]').at(0).simulate("change", { target: { name, value } });

            // Assert
            expect(container.find('FormControl[name="reportBy"]')).toHaveLength(1);
            expect(container.state().reportBy).toBe('1');
        });
    });

    describe('handleChangeDropdown', () => {
        it("should call setState", () => {
            // Arrange
            //Act
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeDropdown('statusIds', '1,2,3');

            // Assert
            expect(container.state().statusIds).toEqual('1,2,3');
        });
    });

    describe('handleToggleFilter', () => {
        let EventBak;
        let windowBak;

        beforeAll(() => {
            EventBak = global.Event;
            windowBak = global.window.dispatchEvent;
            global.Event = jest.fn();
            global.window.dispatchEvent = jest.fn();
        });

        afterAll(() => {
            global.Event = EventBak;
            global.window.dispatchEvent = windowBak;
        });

        it('run exactly', () => {
            // Arrange
            const container = shallow(<Filter {...initProps}/>).instance();

            // Act
            container.handleToggleFilter(true);

            // Assert
            expect(container.state.showFilter).toBeTrue;
            expect(global.window.dispatchEvent).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('handleChange fromDate call exact function', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeFromDate = jest.fn();

            // Action
            container.find(DatePicker).at(0).simulate('change', value);

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('handleChange toDate call exact function', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeToDate = jest.fn();

            // Action
            container.find(DatePicker).at(1).simulate('change', value);

            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });

        it('onChange status call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeDropdown = jest.fn();

            // Action
            container.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(container.instance().handleChangeDropdown).toHaveBeenCalledWith('statusIds', 'selectedItemsKey');
        });

        it('onChange currency call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeDropdown = jest.fn();

            // Action
            container.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');

            // Assert
            expect(container.instance().handleChangeDropdown).toHaveBeenCalledWith('currencyIds', 'selectedItemsKey');
        });
    });
});