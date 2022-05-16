import React from 'react';
import { History } from '../History';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

describe('History', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'app-container');
        document.body.appendChild(appContainer);
    });

    afterEach(() => {
        const appContainer = document.getElementById('app-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });


    const initProps = {
        remarksHistory: { 
            data: [{remarkID: 1504, createdDate: "Apr 18, 2022 10:35:19 PM", lastUpdate: "Apr 18, 2022 11:23:30 PM"}],
            totalItems: 9 
        },
        historyGridParams: { pageIndex: 1, pageSize: 100 },
        isHost: true,
        setShowHistory: jest.fn(),
        setHistoryGridParams: jest.fn(),
        setOpenEditPopup: jest.fn(),
        getNewRemarkHistory: jest.fn(),
        popupDeleteConfirm: { show: true },
        setRemarksHistory: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exactly functions', () => {
            // Arrange
            // Act
            const container = shallow(<History {...initProps} />);
            // Assert
            expect(initProps.getNewRemarkHistory).toHaveBeenCalled();
        });
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange
            const container = shallow(<History  {...initProps}/>).instance();

            // Act
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(11);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                remarksHistory: { data: [] },
                historyGridParams: { pageIndex: 1, pageSize: 100 },
                getNewRemarkHistory: jest.fn()
            };

            const expectedBody = [<Row key='new-remark-history-body' className='no-data' ><Cell colSpan={11}>ThereIsNoData</Cell></Row>];
            const container = shallow(<History {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            
            const container = shallow(<History {...initProps} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('renderRow', () => {
        it.each([
            0,
            4
        ])('onClick call exact function', (number) => {
            // Arrange
            const container = shallow(<History {...initProps} />).instance();
            container.handleOpenView = jest.fn();
            // Act
            const row = shallow(container.renderRow(initProps.remarksHistory.data[0], 1));
            row.find(Cell).at(number).simulate('click');
            // Assert
            expect(container.handleOpenView).toHaveBeenCalled();
        });
    });

    describe('onPaging', () => {
        it('should call exactly function', () => {
            // Arrange
            const expectedGridParams = { pageIndex: 1, pageSize: 100 };
            const container = shallow(<History {...initProps} />).instance();

            // Act
            container.onPaging(expectedGridParams.pageIndex, expectedGridParams.pageSize);

            // Assert
            expect(initProps.setHistoryGridParams).toHaveBeenCalledWith(expectedGridParams);
            expect(initProps.getNewRemarkHistory).toHaveBeenCalledWith(expectedGridParams);
        });
    });

    describe('handleGoBack', () => {
        it('should call exactly function', () => {
            // Arrange
            const container = shallow(<History {...initProps} />).instance();

            // Act
            container.handleGoBack();

            // Assert
            expect(initProps.setShowHistory).toHaveBeenCalledWith({show: false});
            expect(initProps.setRemarksHistory).toHaveBeenCalledWith(null);
            expect(initProps.setRemarksHistory).toHaveBeenCalledWith(null);
        });
    });

    describe('renderRow', () => {
        it("click show history call exact function", () => {
            // Arrange
            const container = shallow(<History  {...initProps}/>).instance();
            container.handleOpenView = jest.fn();
            // Act
            const rows = shallow(container.renderRow(initProps.remarksHistory.data[0], 1, true));
            rows.find('span').at(0).simulate('click');
            // Assert
            expect(container.handleOpenView).toHaveBeenCalled();
        });
    });

    describe('handleOpenView', () => {
        it('should call exact function', () => {
            // arrange
            const container = shallow(<History  {...initProps}/>).instance();
            
            // Act
            container.handleOpenView(initProps.remarksHistory.data[0]);

            // Assert
            expect(initProps.setOpenEditPopup).toHaveBeenCalled();
        });
    });


    describe('onSort', () => {
        it.each([
            'asc',
            'desc'
          ])("should call exact function when sortOrder is %s'", (sortOrder) => {
            // arrange
            const container = shallow(<History  {...initProps}/>).instance();
            
            // Act
            container.onSort('username', sortOrder);

            // Assert
            expect(initProps.setRemarksHistory).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('return empty', () => {
            // arrange
            const props = {...initProps, remarksHistory: null};
            // Act
            const container = shallow(<History  {...props}/>);
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });

        it('should call exact function when click go back', () => {
            // Arrange
            const container = shallow(<History {...initProps}/>);
            container.instance().handleGoBack = jest.fn();

            // Act
            container.find('div').at(2).simulate('click');

            // Assert
            expect(container.instance().handleGoBack).toHaveBeenCalled();
        });
    });
});