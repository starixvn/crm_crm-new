import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../Filter';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import DatePicker from '@jsroot/components/date-picker/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';

describe('Filter', () => {
    beforeAll(() =>{
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        isHost: true,
        gridParams: {
            pageSize: 100
        },
        setIsRefresh: jest.fn(),
        getGridData: jest.fn(),
        setGridParams: jest.fn(),
        setOpenNewAnnouncementPopup: jest.fn(),
        setRedirectActionParams: jest.fn(),
        navigate: jest.fn(),
        setRedirectActionParams: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should set state based on props when isLoadGrid and filterParams are true', () => {
            // Arrange
            const props = {
                isLoadGrid: true,
                filterParams: {
                    announcementId: 123,
                    fromDate: '2023-01-01',
                    toDate: '2023-01-31',
                    title: 'Test Title',
                    status: '1,2,3',
                },
            };
            //Act
            const container = shallow(<Filter {...props}/>);

            // Assert
            expect(container.state('announcementId')).toBe(props.filterParams.announcementId);
            expect(container.state('fromDate')).toEqual(new Date(props.filterParams.fromDate));
            expect(container.state('toDate')).toEqual(new Date(props.filterParams.toDate));
            expect(container.state('title')).toBe(props.filterParams.title);
            expect(container.state('status')).toBe(props.filterParams.status);
        });

        it('should not set state when isLoadGrid is false', () => {
            // Arrange
            const props = {
                isLoadGrid: false,
                filterParams: {
                    announcementId: 123,
                    fromDate: '2023-01-01',
                    toDate: '2023-01-31',
                    title: 'Test Title',
                    status: '1,2,3'
                }
            };
        
            //Act
            const container = shallow(<Filter {...props} />);   
        
            //Assert
            expect(container.state('announcementId')).toBe(null);
        });
    });

    describe('getParams', () => {
        it('should return the expected params when called', () => {
           // Assert
            const initialState = {
                announcementId: 123,
                fromDate: new Date('2023-01-01'),
                toDate: new Date('2023-01-31'),
                title: 'Test Title',
                status: '1,2,3',
            };
            const props = {
                gridParams: {
                    pageSize: 10,
                },
            };
            const expectedParams = {
                announcementId: initialState.announcementId,
                fromDate: initialState.fromDate.toString(),
                toDate: initialState.toDate.toString(),
                title: initialState.title,
                status: initialState.status,
                pageIndex: 1,
                pageSize: props.gridParams.pageSize,
            };
      
            // Act
            const container = shallow(<Filter {...props} />, { disableLifecycleMethods: true });
            container.setState(initialState);

            const result = container.instance().getParams();
      
            //Assert
            expect(result).toEqual(expectedParams);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly function',() => {
            // Arrange
            const event = {
                preventDefault: jest.fn()
            };
            //Act
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();
            container.handleSubmit(event);

            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
            expect(initProps.setGridParams).toHaveBeenCalled();
            expect(initProps.getGridData).toHaveBeenCalled();
            expect(initProps.setRedirectActionParams).toHaveBeenCalled();
        });

        it('should call exactly function when from date greater than to date',() => {
            // Arrange
            const event = {
                preventDefault: jest.fn()
            };
            const state = {
                fromDate: new Date('2023-01-02'),
                toDate: new Date('2023-01-01')
            };
            toast.error = jest.fn();
            //Act
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();
            container.setState(state);
            container.handleSubmit(event);

            // Assert
            expect(toast.error).toHaveBeenCalledWith(LangHelper.getResource('FromDateMustSmallerThanToDate'));
        });
    });

    describe('handleChangeFromDate', () => {
        it('should setState exactly',() => {
            // Arrange
            const state = {
                fromDate: new Date('2023-01-02')
            };
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();
            container.setState(state);
            //Act
            container.handleChangeFromDate(new Date('2023-01-03'));

            // Assert
            expect(container.state.fromDate).toEqual(new Date('2023-01-03'));
        });
    });

    describe('handleChangeToDate', () => {
        it('should setState exactly',() => {
            // Arrange
            const state = {
                toDate: new Date('2023-01-02')
            };
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();
            container.setState(state);
            //Act
            container.handleChangeToDate(new Date('2023-01-03'));

            // Assert
            expect(container.state.toDate).toEqual(new Date('2023-01-03'));
        });
    });

    describe('handleChange', () => {
        it('should set exact state',() => {
            // Arrange
            const event = {
                preventDefault: jest.fn(),
                target: { value: 1, name: 'announcementId' }
            };

            //Act
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();
            container.handleChange(event);

            // Assert
            expect(container.state.announcementId).toEqual(1);
        });
    });

    describe('handleChangeStatus ', () => {
        it('should set exact state',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();

            //Act
            container.handleChangeStatus('currentItem', 'selectedItemsKey');

            // Assert
            expect(container.state.status).toEqual('selectedItemsKey');
        });
    });

    describe('handleOpenNewAnnouncement', () => {
        it('should call exact function',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn();
            //Act
            container.handleOpenNewAnnouncement();

            // Assert
            expect(initProps.setIsRefresh).toHaveBeenCalledWith(false);
            expect(initProps.navigate).toHaveBeenCalled();
        });
    });

    describe('handlePasteAnnouncementId', () => {
        it('prevent set value when copy is text',() => {
            // Arrange
            const event = {
                clipboardData: { getData: jest.fn().mockReturnValueOnce('test') },
                preventDefault: jest.fn()
            };

            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true }).instance();
            //Act
            container.handlePasteAnnouncementId(event );

            // Assert
            expect(event.preventDefault).toHaveBeenCalledWith();
        });
    });

    describe('render', () => {
        it('should call exact function when click submit',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true });
            container.instance().handleSubmit = jest.fn();
            //Act
            const render = container.find('.form-filter-v2');
            render.simulate('submit');
            // Assert
            expect(container.instance().handleSubmit).toHaveBeenCalled();
        });

        it('should call exact function when change from date',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true });
            container.instance().handleChangeFromDate = jest.fn();
            //Act
            const render = container.find(DatePicker).at(0);
            render.simulate('change');
            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('should call exact function when change to date',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true });
            container.instance().handleChangeToDate = jest.fn();
            //Act
            const render = container.find(DatePicker).at(1);
            render.simulate('change');
            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });

        it('should call exact function when change status',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true });
            container.instance().handleChangeStatus = jest.fn();
            //Act
            const render = container.find(MultipleSelect);
            render.simulate('change');
            // Assert
            expect(container.instance().handleChangeStatus).toHaveBeenCalled();
        });

        it('should call exact function when click open announcement',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />, { disableLifecycleMethods: true });
            container.instance().handleOpenNewAnnouncement = jest.fn();
            //Act
            const render = container.find(Button).at(1);
            render.simulate('click');
            // Assert
            expect(container.instance().handleOpenNewAnnouncement).toHaveBeenCalled();
        });
    });
});