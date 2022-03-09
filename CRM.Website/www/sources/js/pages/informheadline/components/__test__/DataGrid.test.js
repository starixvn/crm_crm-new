import React from 'react';
import { DataGrid } from '../DataGrid';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { shallow } from 'enzyme';
import { Policy } from '@jsroot/common/constants';

describe('DataGrid', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {};

    describe('ComponentDidMount', () => {
        it('should call exactly props function', async () => {
            // Arrange
            const props = {
                getInforms: jest.fn(),
                getAllSettings: jest.fn(),
                getContactInformSettings: jest.fn()
            }

            // Act
            const container = shallow(<DataGrid {...props}/>).instance();
            await container.componentDidMount();

            // Assert
            expect(props.getInforms).toHaveBeenCalledWith();
            expect(props.getAllSettings).toHaveBeenCalledWith();
            expect(props.getContactInformSettings).toHaveBeenCalledWith();
        })
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
        it('should render no data when informs is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                informs: { totalItems: 1, data: [] }             
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={13}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when informs has data', () => {
            // Arrange

            const props = {
                ...initProps,
                informs: [
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
        it('should call exactly functions when handle edit contact', () => {
            // Arrange
            const props = {
                editContactInformDialog: { show: false },
                setEditContactInformDialog: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleEditContact(147258, 'Closed');
           
            // Assert
            expect(props.setEditContactInformDialog).toHaveBeenCalledWith({ show: true, titleId: 147258, status: 'Closed' });
        });
    });

    describe('handleEdit', () => {
        it('should call exactly functions when handle edit', () => {
            // Arrange
            const props = {
                setEditInformDialog: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleEdit(147258);
           
            // Assert
            expect(props.setEditInformDialog).toHaveBeenCalledWith({ show: true, titleId: 147258 });
        });
    });

    describe('handleRemovedAccountLogs', () => {
        it('should call exactly functions when handle removedAccountLogs', () => {
            // Arrange
            const props = {
                setGridParamRemovedLogs: jest.fn(),
                getRemovedAccountLogs: jest.fn(),
                setRemovedLogDialog: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleRemovedAccountLogs(147258);
           
            // Assert
            expect(props.setGridParamRemovedLogs).toHaveBeenCalledWith({titleId: 147258, pageIndex: 1, pageSize: 100});
            expect(props.getRemovedAccountLogs).toHaveBeenCalledWith({titleId: 147258, pageIndex: 1, pageSize: 100});
            expect(props.setRemovedLogDialog).toHaveBeenCalledWith({show: true});
        });
    });

    describe('handleCloseCase', () => {
        it('should call exactly functions when handle close case', () => {
            // Arrange
            const props = {
                editInformStatus: jest.fn(),
                getInforms: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleCloseCase(147258);
           
            // Assert
            expect(props.editInformStatus).toHaveBeenCalledWith({titleId: 147258, statusType: true});
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleOpenCase', () => {
        it('should call exactly functions when handle open case', () => {
            // Arrange
            const props = {
                editInformStatus: jest.fn(),
                getInforms: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleOpenCase(147258);
           
            // Assert
            expect(props.editInformStatus).toHaveBeenCalledWith({titleId: 147258, statusType: false});
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleNewInforms', () => {
        it('should call exactly functions when handle new informs', () => {
            // Arrange
            const props = {
                setNewInformDialog: jest.fn()
            };

            // Act
            const container = shallow(<DataGrid {...props}/>);
            container.instance().handleNewInforms();
           
            // Assert
            expect(props.setNewInformDialog).toHaveBeenCalledWith({ show: true });
        });
    });

    describe('renderRow', () => {
        const item = {
            clientCreatedDate: "Aug 17, 2021", createdDate: "Aug 17, 2021 05:58:54 AM",
            done: 4, internalAccount: 0, keptForReference: 0, neverTouch: 23,
            noNeedToCall: 0, noReply: 0,requestToCallBack: 0, status: "Open",
            title: "test", titleId: 720, total: 27, uncontactable: 0,
        };
        
        it('should call getPositionEdit when click edit', () => {
            // Arrange

            const props = {
                ...initProps,
                informs: [
                    { titleId: 720, title:'test'}
                ]
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleOption = jest.fn();

            const row = shallow(container.renderRow(item, 1));

            // Assert

            expect(container.handleOption).toHaveBeenCalledWith(720, 'Open');
        });

        it('should call handleEditContact when click titleId', () => {
            // Arrange

            const props = {
                ...initProps,
                informs: [
                    { titleId: 720, title:'test', status: 'Closed'}
                ]
            };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.handleEditContact = jest.fn();

            const row = shallow(container.renderRow(item, 1, document.getElementById('ContactPolicy')));

            // Act
            row.find(Cell).at(1).find('span').at(0).props().onClick();

            // Assert

            expect(container.handleEditContact).toHaveBeenCalledWith(720, 'Open');
        });
    });

    describe('render', () => {
        it('should render null when informs is null', () => {
            // Arrange
            const props = {
                ...initProps,
                informs: null
            };

            const container = shallow(<DataGrid {...props}/>);

            // Assert
            expect(container.type()).toEqual(null);
        });
        
        it('should render danger when informs is null', () => {
            // Arrange
            const props = {
                ...initProps,
                informs: [
                    { titleId: 720, title:'test', status: 'Closed'}
                ]
            };
            const expected = <div className="text-center text-danger">NoPermission</div>;
            window.searchPolicy =  Policy.None;
            window.contactPolicy = Policy.None;

            const container = shallow(<DataGrid {...props}/>).instance();
            const actual = container.render();
            // Assert
            expect(actual).toEqual(expected);
        });
    });
});