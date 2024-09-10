import React from 'react';
import { Filter } from '../Filter';
import DateTimeService from '@jsroot/common/dateTimeService';
import { shallow } from 'enzyme';
import DatePicker from '@jsroot/components/date-picker/index';

describe('Filter', () => {
    beforeAll(() => {
        window.currentClientTime = '4/8/2021 10:05:20 AM';
    });

    const initProps = {
        settings: {
            customerTypes: [{ id: 1, name: 'Text' }],
            mainCategories: [{ mainCategoryID : 0 }],
            subCategories: [{ mainCategoryID : 0 }],
            communications: [{ id: 1, name: "test"}],
            customerResponses: [{ id: 1, name: "test"}]
        },
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
    };

    describe('componentDidUpdate', () => {
        it('should set state exactly', () => {
            // Arrange
            const props = { ...initProps };
            const prevProps = {
                customerTypes: 0,
                mainCategories: 0,
                subCategories: 0,
                communications: 0,
                customerResponses: 0
            };


            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().componentDidUpdate(prevProps);

            // Assert
            expect(container.state().communicationId).toEqual("");
            expect(container.state().responseId).toEqual("");
        });
    });

    describe('handleChangeFromDate', () => {
        it('should update toDate when fromDate is change', () => {
            // Arrange
            const props = { ...initProps };
            const fromDate = new Date('2/5/2020 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeFromDate(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('2/5/2020 5:20:25 PM'));
            expect(container.state().toDate).toEqual(new Date('2/4/2021 5:20:25 PM'));
            expect(container.instance().minToDate).toEqual(new Date('2/5/2020 5:20:25 PM'));
            expect(container.instance().maxToDate).toEqual(new Date('2/4/2021 5:20:25 PM'));
        });

        it('should not update toDate when fromDate is change', () => {
            // Arrange
            const props = { ...initProps };
            const fromDate = new Date('1/8/2021 5:20:25 PM');

            DateTimeService.toShortDateTimeFormat = jest.fn(() => '4/8/2021 10:05:20 AM');
            const container = shallow(<Filter {...props}/>);

            // Act
            container.instance().handleChangeFromDate(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('1/8/2021 5:20:25 PM'));
            expect(container.state().toDate).toEqual(new Date('4/8/2021 10:05:20 AM'));
            expect(container.instance().minToDate).toEqual(new Date('1/8/2021 5:20:25 PM'));
            expect(container.instance().maxToDate).toEqual(new Date('4/8/2021 10:05:20 AM'));
        });
    });

    describe('handleChangeToDate', () => {
        it('should update toDate', () => {
            // Arrange
            const props = { ...initProps };
            const toDate = new Date('4/8/2021 9:05:20 AM');       
            const container = shallow(<Filter {...props}/>);
            // Act
            container.instance().handleChangeToDate(toDate);

            // Assert
            expect(container.state().toDate).toEqual(new Date('4/8/2021 9:05:20 AM'));
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions when submit', () => {
            // Arrange
            const props = {
                ...initProps,
                setGridParams: jest.fn(),
                getDeletedFeedback: jest.fn()
            };
            const expectedParams = {
                username: '',
                isGuest: '',
                fromDate: "Apr 07, 2021",
                toDate: "Apr 08, 2021",
                pageIndex: 1,
                pageSize: 100,
                mainCategoryId: '',
                subCategoryId: '',
                communicationId: 0,
                responseId: 0,
                isReviewed: ''
            }
            const formEventMocked = { preventDefault: jest.fn() };
            
            //Act
            const container = shallow(<Filter {...props} />);
            container.find("Form").simulate("submit", formEventMocked);

            // Assert
            expect(container.find("Form")).toHaveLength(1);
            expect(formEventMocked.preventDefault).toBeCalledTimes(0);
            expect(props.setGridParams).toHaveBeenCalledWith(expectedParams);
            expect(props.getDeletedFeedback).toHaveBeenCalledWith(expectedParams);
        });
    });

    describe('handleChange', () => {
        it("setState", () => {
            // Arrange
            const props = {
                ...initProps,
                getDeletedFeedback: jest.fn()
            };
            
            const name = "username"
            const value = "123";
            
            //Act
            const container = shallow(<Filter {...props}/>);
            container.find('FormControl[name="username"]').at(0).simulate("change", { target: { name, value } });

            // Assert
            expect(container.find('FormControl[name="username"]')).toHaveLength(1);
            expect(container.state().username).toBe('123');
        });
    });

    // describe('filterSubCategories', () => {
    //     it('should return exactly expect when mainCateId equal 0', () => {
    //         // Arrange
    //         const props = { ...initProps };
    //         const subCategories = [{ mainCategoryID : 3000 }];
    //         const manCateId = 0;

    //         // Act
    //         const container = shallow(<Filter {...props}/>).instance();
    //         const actual = container.filterSubCategories(subCategories, manCateId);

    //         // Assert
    //         expect(actual).toEqual([{ name: 'All', subCategoryId: 0 }]);
    //     });

    //     it('should return exactly expect when mainCateId not equal 0', () => {
    //         // Arrange
    //         const props = { ...initProps };
    //         const subCategories = [{ mainCategoryID : 3000 }, { mainCategoryID : 4000 }];
    //         const manCateId = 3000;

    //         // Act
    //         const container = shallow(<Filter {...props}/>).instance();
    //         const actual = container.filterSubCategories(subCategories, manCateId);

    //         // Assert
    //         expect(actual).toEqual([{ name: 'All', subCategoryId: 0 }, {  mainCategoryID : 3000 }]);
    //     });
    // });

    describe('render', () => {
        it('should return null when settings are null', () => {
            // Arrange
            const props = {
                settings: null
            };
            const container = shallow(<Filter {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(actual).toBeNull();
        });

        it('should call exactly function when change datepicker', () => {
            // Arrange
            const props = { ...initProps };
            const container = shallow(<Filter {...props} />);
            container.instance().handleChangeFromDate = jest.fn();

            // Act
            container.find(DatePicker).at(0).simulate('change');
            container.find(DatePicker).at(1).simulate('change');

            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });
    });
});