import React from 'react';
import { Filter } from '../Filter';
import DateTimeService from '@jsroot/common/dateTimeService';
import { shallow } from 'enzyme';
import DatePicker from '@jsroot/components/date-picker/index';
import { toast } from 'react-toastify';

describe('Filter', () => {
    beforeAll(() => {
        window.currentClientTime = '4/8/2021 10:05:20 AM';
        const hasReadSitePermission = document.createElement('div');
        hasReadSitePermission.setAttribute('id', 'hasReadSitePermission');
        document.body.appendChild(hasReadSitePermission);
    });

    afterAll(() => {
        const hasReadSitePermission = document.getElementById('hasReadSitePermission');
        if (hasReadSitePermission) {
            document.body.removeChild(hasReadSitePermission);
        }
        jest.clearAllMocks();
    });

    describe('functions', () => {
       
        describe('handleChangeFromDate', () => {
            it('should update toDate when fromDate is change', () => {
                // Arrange
                const fromDate = new Date('2/5/2020 5:20:25 PM');

                DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
                const container = shallow(<Filter />);

                // Act
                container.instance().handleChangeFromDate(fromDate);

                // Assert
                expect(container.state().fromDate).toEqual(new Date('2/5/2020 5:20:25 PM'));
            });

            it('should not update toDate when fromDate is change', () => {
                // Arrange
                const fromDate = new Date('1/8/2021 5:20:25 PM');
                DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
                const container = shallow(<Filter />);

                // Act
                container.instance().handleChangeFromDate(fromDate);

                // Assert
                expect(container.state().fromDate).toEqual(new Date('1/8/2021 5:20:25 PM'));
                expect(container.state().toDate).toEqual(new Date('4/8/2021 10:05:20 AM'));
            });
        });

        describe('handleChangeToDate', () => {
            it('should update toDate', () => {
                // Arrange
                const toDate = new Date('4/8/2021 9:05:20 AM');       
                const container = shallow(<Filter />);
                // Act
                container.instance().handleChangeToDate(toDate);

                // Assert
                expect(container.state().toDate).toEqual(new Date('4/8/2021 9:05:20 AM'));
            });
        });

        // describe('handleSubmit', () => {
        //     it('should call exactly functions when submit', () => {
        //         // Arrange
        //         const props = {
        //             setGridParams: jest.fn(),
        //             getGridData: jest.fn(),
        //             gridParams:{pageSize: 100}
        //         };
        //         const state = {
        //             selectionType: '1',
        //             fromDate: new Date('4/8/2021 9:05:20 AM'),
        //             toDate: new Date('4/8/2021 9:05:20 AM'),
        //             fromDuration: '1:1:1:1',
        //             toDuration: '1:1:1:1'
        //         };
        //         const expectedParams = {
        //             type: '1',
        //             fromDate: 'Apr 08, 2021',
        //             toDate: 'Apr 08, 2021',
        //             fromDuration: '1:1:1:1',
        //             toDuration: '1:1:1:1',
        //             pageIndex: 1,
        //             pageSize: 100
        //         };
                
        //         //Act
        //         const container = shallow(<Filter {...props} />);
        //         container.instance().setState(state);
        //         container.instance().getDurationTimeString = jest.fn(() =>'1:1:1:1');
        //         container.find("Form").simulate("submit");

        //         // Assert
        //         // expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
        //         expect(props.getGridData).toHaveBeenCalledWith(expectedParams);
        //     });

        //     it('should not call functions when submit', () => {
        //         // Arrange
        //         const props = {
        //             setGridParams: jest.fn(),
        //             getGridData: jest.fn(),
        //             gridParams:{pageSize: 100}
        //         };
        //         const state = {
        //             selectionType: '1',
        //             fromDate: new Date('4/8/2021 9:05:20 AM'),
        //             toDate: new Date('4/8/2021 9:05:20 AM'),
        //             fromDuration: '1:1:1:1',
        //             toDuration: '1:1:1:1'
        //         };
        //         const expectedParams = {
        //             type: '1',
        //             fromDate: 'Apr 08, 2021',
        //             toDate: 'Apr 08, 2021',
        //             fromDuration: '0:1:1:1',
        //             toDuration: '1:1:1:1',
        //             pageIndex: 1,
        //             pageSize: 100
        //         };
                
        //         //Act
        //         const container = shallow(<Filter {...props} />);
        //         container.instance().setState(state);
        //         container.instance().getDurationTimeString = jest.fn(() =>'1:1:1:1');
        //         container.instance().validateDuration = jest.fn(() => false);
        //         container.find("Form").simulate("submit");

        //         // Assert
        //         expect(props.setGridParams).not.toHaveBeenCalledWith(expectedParams);
        //         expect(props.getGridData).not.toHaveBeenCalledWith(expectedParams);
        //     });
        // });

        describe('handleChange', () => {
            it('call setState', () => {
                // Arrange
                const container = shallow(<Filter />);

                //Act
                container.instance().handleChange({ target: { name: 'selectionType' , value: '123' } });

                // Assert
                expect(container.state().selectionType).toBe(123);
            });
        });

        describe('handleChangeFromDuration ', () => {
            it('call setState', () => {
                // Arrange
                const container = shallow(<Filter />);

                //Act
                container.instance().handleChangeFromDuration ({ target: { name: 'day' , value: '1' } });

                // Assert
                expect(container.state().fromDuration.day).toBe('1');
            });
        });

        describe('handleChangeToDuration  ', () => {
            it('call setState', () => {
                // Arrange
                const container = shallow(<Filter />);

                //Act
                container.instance().handleChangeToDuration  ({ target: { name: 'day' , value: '1' } });

                // Assert
                expect(container.state().toDuration.day).toBe('1');
            });
        });

        describe('getDurationTimeString ', () => {
            it('should return default value', () => {
                // Arrange
                const params = {
                    day: '',
                    hour: '',
                    minute: '',
                    second: ''
                };
                const container = shallow(<Filter />);
                // Act
                const actual = container.instance().getDurationTimeString(params);

                // Assert
                expect(actual).toEqual('0:0:0:0');
            });

            it('should return exact value', () => {
                // Arrange
                const params = {
                    day: '1',
                    hour: '1',
                    minute: '1',
                    second: '1'
                };
                const container = shallow(<Filter />);
                // Act
                const actual = container.instance().getDurationTimeString(params);

                // Assert
                expect(actual).toEqual('1:1:1:1');
            });
        });

        describe('validateDuration  ', () => {
            it('should calls toast.error when duration is invalid', async () => {
                // Arrange
                const fromDuration = {
                    day: '1',
                    hour: '1',
                    minute: '1',
                    second: '1'
                };
                const toDuration = {
                    day: '',
                    hour: '',
                    minute: '',
                    second: ''
                };
                toast.error = jest.fn();
                const container = shallow(<Filter />);
                // Act

                const actual = container.instance().validateDuration (fromDuration, toDuration);
                // Assert
                expect(actual).toBeFalsy();
                expect(toast.error).toHaveBeenCalledWith('NotificationSubmitDurationIsWrong');
            });
        });
    });

    describe('render', () => {
        it('handleChangeToDate correctly', () => {
            // Arrange
            const container = shallow(<Filter  />);
            container.instance().handleChangeFromDate = jest.fn();
            // Act
            // Action
            container.find(DatePicker).at(0).simulate('change', 'Apr 08, 2021');

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('handleChangeToDate correctly', () => {
            // Arrange
            const container = shallow(<Filter  />);
            container.instance().handleChangeToDate = jest.fn();
            // Act
            // Action
            container.find(DatePicker).at(1).simulate('change', 'Apr 08, 2021');

            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });
    });
});