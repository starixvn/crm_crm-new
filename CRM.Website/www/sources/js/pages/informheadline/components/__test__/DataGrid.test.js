import React from 'react';
import { DataGrid } from '../DataGrid';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    var initProps = {};

    beforeEach(() => {
        const searchPolicy = document.createElement('input');
        searchPolicy.setAttribute('id', 'SearchPolicy');
        searchPolicy.setAttribute('host', '');
        document.body.appendChild(searchPolicy);

        initProps = {
            searchPolicy: document.getElementById('SearchPolicy')
        };
    });

    afterEach(() => {
        const searchPolicy = document.getElementById('SearchPolicy');
        if (searchPolicy) {
            document.body.removeChild(searchPolicy);
        }
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // Act
            const container = shallow(<DataGrid />).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(13);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                gridData: { totalItems: 1, data: [] }             
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={13}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const contactPolicy = document.createElement('input');
            contactPolicy.setAttribute('id', 'ContactPolicy');
            document.body.appendChild(contactPolicy);

            const props = {
                ...initProps,
                contactPolicy: document.getElementById('ContactPolicy'),
                gridData: [
                    { titleId: 720, title:'test'}
                ]
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('handleEditContact', () => {
        it('should call exactly functions when handle edit', () => {
            // Arrange
            const props = {
                showEditContactInform: { show: false },
                setShowEditContactInform: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleEditContact(147258);
           
            // Assert
            expect(props.setShowEditContactInform).toHaveBeenCalledWith({ show: true, titleId: 147258 });
        });
    });

    describe('getPositionEdit', () => {
        it('should call exactly functions when get position', () => {
            // Arrange
            const props = {
                initProps,
                setShowOptions: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            const mockEvent = { target: { getClientRects: jest.fn(() => [{left: 10, top: 20}])} };
            container.instance().getPositionEdit(mockEvent, 147258, 'Open');
           
            // Assert
            expect(props.setShowOptions).toHaveBeenCalledWith({ 
                left: 10, top: 20,
                show: true, showOption: 'block',
                status: 'Open', titleIdSearch: 147258,
            });
        });
    });

    describe('handleNewInforms', () => {
        it('should call exactly functions when handle new informs', () => {
            // Arrange
            const props = {
                getAllSettings: jest.fn(),
                setShowNewInforms: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleNewInforms();
           
            // Assert
            expect(props.setShowNewInforms).toHaveBeenCalledWith({ show: true });
            expect(props.getAllSettings).toHaveBeenCalledTimes(1);
        });
    });

    describe('renderRow', () => {
        it('should call getPositionEdit when click edit', () => {
            // Arrange
            const contactPolicy = document.createElement('input');
            contactPolicy.setAttribute('id', 'ContactPolicy');
            document.body.appendChild(contactPolicy);

            const props = {
                ...initProps,
                contactPolicy: document.getElementById('ContactPolicy'),
                gridData: [
                    { titleId: 720, title:'test'}
                ]
            };
            const item = {
                clientCreatedDate: "Aug 17, 2021", createdDate: "Aug 17, 2021 05:58:54 AM",
                done: 4, internalAccount: 0, keptForReference: 0, neverTouch: 23,
                noNeedToCall: 0, noReply: 0,requestToCallBack: 0, status: "Open",
                title: "test", titleId: 720, total: 27, uncontactable: 0,
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.getPositionEdit = jest.fn();

            const row = shallow(container.renderRow(item, 1, document.getElementById('ContactPolicy')));

            // Act
            row.find(Cell).at(0).find('span').at(0).props().onClick();

            // Assert
            expect(container.getPositionEdit).toHaveBeenCalledWith(undefined, 720, 'Open');
        });

        it('should call handleEditContact when click titleId', () => {
            // Arrange
            const contactPolicy = document.createElement('input');
            contactPolicy.setAttribute('id', 'ContactPolicy');
            document.body.appendChild(contactPolicy);

            const props = {
                ...initProps,
                contactPolicy: document.getElementById('ContactPolicy'),
                gridData: [
                    { titleId: 720, title:'test'}
                ]
            };
            const item = {
                clientCreatedDate: "Aug 17, 2021", createdDate: "Aug 17, 2021 05:58:54 AM",
                done: 4, internalAccount: 0, keptForReference: 0, neverTouch: 23,
                noNeedToCall: 0, noReply: 0,requestToCallBack: 0, status: "Open",
                title: "test", titleId: 720, total: 27, uncontactable: 0,
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleEditContact = jest.fn();

            const row = shallow(container.renderRow(item, 1, document.getElementById('ContactPolicy')));

            // Act
            row.find(Cell).at(1).find('span').at(0).props().onClick();

            // Assert
            expect(container.handleEditContact).toHaveBeenCalledWith(720);
        });
    });

    describe('handleExportExcel', () => {
        it('should call exactly functions when handle export excel', () => {
            // Arrange
            const props = {
                exportInforms: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleExportExcel();
           
            // Assert
            expect(props.exportInforms).toHaveBeenCalledTimes(1);
        });
    });
});