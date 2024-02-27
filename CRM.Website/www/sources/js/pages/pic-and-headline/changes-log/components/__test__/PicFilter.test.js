import React from 'react';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import { PicFilter } from '../PicFilter';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';

describe('PicFilter', () => {
    beforeAll(() => {
        window.currentClientTime = '01/01/2022 10:05:20 AM';
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const response = {
        data: [{id: 1, name: '1'}]
    };
    const promise = Promise.resolve(response);

    const props = {
        gridParams: {
            userName: null,
            editBy: null,
            actionTypeIds: '',
            fromDate: null,
            toDate: null,
            pageIndex: 1,
            pageSize: 100
        },
        gridParamsPic: {
            picName: null,
            editBy: null,
            fromDate: null,
            toDate: null,
            pageIndex: 1,
            pageSize: 100
        },
        setGridParamsPic: jest.fn(),
        getPicReport: jest.fn()
    };

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
            const container = shallow(<PicFilter {...props}/>);
            container.instance().handleChange(event);

            // Assert
            expect(container.instance().state.handler).toEqual('test');
        });
    });
    
    describe('handleChangeToDate', () => {
        it('should call setState exactly when handle change to date', () => {
            // Arrange

            // Act
            const container = shallow(<PicFilter {...props}/>);
            container.instance().handleChangeToDate('Sep 01, 2021');
           
            // Assert
            expect(container.state().toDate).toBe('Sep 01, 2021');
        });
    });

    describe('handleChangeFromDate', () => {
        it('should call setState exactly when handle change from date', () => {
            const fromDate = new Date('2/5/2021 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
            const container = shallow(<PicFilter {...props}/>);

            // Act
            container.instance().handleChangeFromDate(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('2/5/2021 5:20:25 PM'));
            expect(container.state().toDate).toEqual(new Date('3/5/2021 5:20:25 PM'));
            expect(container.instance().minToDate).toEqual(new Date('2/5/2021 5:20:25 PM'));
            expect(container.instance().maxToDate).toEqual(new Date('03/5/2021 5:20:25 PM'));
        });
    });

    // describe('handleSubmit', () => {
    //     it('should call exactly function when handle submit', () => {
    //         // Arrange
    //         const state = {
    //             letstalkName: null,
    //             picName: '',
    //             editBy: '',
    //             fromDate: 'Sep 01, 2021',
    //             toDate: 'Sep 01, 2021'
    //         };
    //         const expectParams = {
    //             letstalkName: null,
    //             picName: null,
    //             editBy: null,
    //             fromDate: 'Sep 01, 2021',
    //             toDate: 'Sep 01, 2021',
    //             pageIndex: 1,
    //             pageSize: 100
    //         };

    //         // Act
    //         const container = shallow(<PicFilter {...props}/>);
    //         container.instance().setState(state);
    //         container.instance().handleSubmit();

    //         // Assert
    //         expect(props.setGridParamsPic).toHaveBeenCalledWith(expectParams);
    //         expect(props.getPicReport).toHaveBeenCalledWith(expectParams);
    //     });
    // });

    describe('render', () => {
        it('change from date call exact function', () => {
            // Arrange
            const container = shallow(<PicFilter {...props} />);
            container.instance().handleChangeFromDate = jest.fn();
            
            // Action
            container.find(DatePicker).at(0).simulate('change');

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('change to date call exact function', () => {
            // Arrange
            const container = shallow(<PicFilter {...props} />);
            container.instance().handleChangeToDate = jest.fn();
            
            // Action
            container.find(DatePicker).at(1).simulate('change');

            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });
    });
});