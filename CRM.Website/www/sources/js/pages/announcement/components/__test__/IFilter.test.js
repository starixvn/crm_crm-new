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
        navigate: jest.fn()
    };

    describe('handleSubmit', () => {
        it('should call exactly function',() => {
            // Arrange
            const event = {
                preventDefault: jest.fn()
            };
            //Act
            const container = shallow(<Filter {...initProps} />).instance();
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
            const container = shallow(<Filter {...initProps} />).instance();
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
            const container = shallow(<Filter {...initProps} />).instance();
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
            const container = shallow(<Filter {...initProps} />).instance();
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
            const container = shallow(<Filter {...initProps} />).instance();
            container.handleChange(event);

            // Assert
            expect(container.state.announcementId).toEqual(1);
        });
    });

    describe('handleChangeStatus ', () => {
        it('should set exact state',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />).instance();

            //Act
            container.handleChangeStatus('currentItem', 'selectedItemsKey');

            // Assert
            expect(container.state.status).toEqual('selectedItemsKey');
        });
    });

    describe('handleOpenNewAnnouncement', () => {
        it('should call exact function',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />).instance();
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

            const container = shallow(<Filter {...initProps} />).instance();
            //Act
            container.handlePasteAnnouncementId(event );

            // Assert
            expect(event.preventDefault).toHaveBeenCalledWith();
        });
    });

    describe('render', () => {
        it('should call exact function when click submit',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleSubmit = jest.fn();
            //Act
            const render = container.find('.form-filter');
            render.simulate('submit');
            // Assert
            expect(container.instance().handleSubmit).toHaveBeenCalled();
        });

        it('should call exact function when change from date',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleChangeFromDate = jest.fn();
            //Act
            const render = container.find(DatePicker).at(0);
            render.simulate('change');
            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('should call exact function when change to date',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleChangeToDate = jest.fn();
            //Act
            const render = container.find(DatePicker).at(1);
            render.simulate('change');
            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });

        it('should call exact function when change status',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleChangeStatus = jest.fn();
            //Act
            const render = container.find(MultipleSelect);
            render.simulate('change');
            // Assert
            expect(container.instance().handleChangeStatus).toHaveBeenCalled();
        });

        it('should call exact function when click open announcement',() => {
            // Arrange
            const container = shallow(<Filter {...initProps} />);
            container.instance().handleOpenNewAnnouncement = jest.fn();
            //Act
            const render = container.find(Button).at(1);
            render.simulate('click');
            // Assert
            expect(container.instance().handleOpenNewAnnouncement).toHaveBeenCalled();
        });
    });
});