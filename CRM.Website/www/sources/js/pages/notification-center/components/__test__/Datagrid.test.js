import React from 'react';
import { DataGrid } from '../DataGrid';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button, Modal } from 'react-bootstrap';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import  * as functions from '../../common.functions';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

describe('DataGrid', () => {
    beforeAll(() =>{
        Site.resolveClientUrl = jest.fn();
        Site.displayCopiedToClipboard = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
        DateTimeService.toLongDateTimeFormat = jest.fn(val => val);
        DateTimeService.toShortDateFormat = jest.fn(val => val);
        DateTimeService.toTimeFormat = jest.fn(val => val);
        functions.filterAndSortSites = jest.fn(() => [{ siteType: 'Credit', siteGroupOrd: 1, siteNames:'siteNames' }]);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'right-row-container');
        document.body.appendChild(appContainer);
        jest.useFakeTimers();
    });
    afterAll(() => {
        const appContainer = document.getElementById('right-row-container');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    const promise = Promise.resolve({isSuccessful: true, message: 'message'});
    const initProps = {
        isHost: true,
        gridData: {
            data: [{notificationID: 1, messageID: 1, sessionID: 1, status: 'New', sender: 'sa', sendDate: ''}],
            allSite: [{notificationID: 1, siteType: 'Credit', siteGroupOrd: 1, siteNames:'siteNames'}]
        },
        gridParams: {
            pageIndex: 1,
            pageSize: 100,
            isOstUser: true,

        },
        setGridParams: jest.fn(),
        getGridData: jest.fn(),
        navigate: jest.fn(),
        setIsRefresh: jest.fn(),
        editAdmStatus: jest.fn(() => promise),
        
    }

    describe('buildHeader', () => {
        it('should render expected header when isHost = false', () => {
            // Arrange
            const container = shallow(<DataGrid {...initProps}/>).instance();

            // Act
            const header = shallow(container.buildHeader(false));

            // Assert
            expect(header.find(HeaderCell).length).toBe(5);
        });

        it('should render expected header when isHost = true', () => {
            // Arrange
            const container = shallow(<DataGrid  {...initProps}/>).instance();

            // Act
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(6);
        });
    });

    describe('buildBody', () => {
        it('should render no data when data is empty', () => {
            // Arrange
            const props = {
                ...initProps,
                gridData: {
                    data: []
                }
            };
            const expectedBody = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={7}>ThereIsNoData</Cell></Row>];
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            const actual = container.buildBody(true);

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when has data', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('onPaging', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.onPaging(1, 100);

            // Assert
            expect(props.setGridParams).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
        });
    });

    describe('handleAction', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleAction(1);

            // Assert
            expect(props.navigate).toHaveBeenCalled();
        });
    });

    describe('handleClosePopup', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleClosePopup(1);

            // Assert
            expect(container.state.cancelPopup).toEqual({ show: false, notificationId: null });
            expect(container.state.resendFailPopup).toEqual({ show: false, notificationId: null });
            expect(container.state.deactivatePopup).toEqual({ show: false, notificationId: null });
            expect(container.state.detailNotificationPopup).toEqual({ show: false, notificationId: null });
            expect(props.setIsRefresh).toHaveBeenCalled();
        });
    });

    describe('getParamStatus', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            var actual = container.getParamStatus(1, 'New');

            // Assert
            expect(actual).toEqual({newStatus: 'New', notificationId: 1});
        });
    });

    describe('handleUpdateStatus', () => {
        it('should call exactly props functions when isSuccessful', async () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleClosePopup = jest.fn();
            toast.success = jest.fn();

            // Act
            await container.handleUpdateStatus(1, 'New');

            // Assert
            expect(container.handleClosePopup).toHaveBeenCalled();
            expect(toast.success).toHaveBeenCalled();
            expect(props.getGridData).toHaveBeenCalled();
        });

        it('should call exactly props functions when failed', async () => {
            // Arrange
            const props = {
                ...initProps,
                editAdmStatus: jest.fn(() => Promise.resolve({isSuccessful: false}))
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleClosePopup = jest.fn();
            toast.error = jest.fn();

            // Act
            await container.handleUpdateStatus(1, 'New');

            // Assert
            expect(container.handleClosePopup).toHaveBeenCalled();
            expect(toast.error).toHaveBeenCalled();
        });
    });

    describe('handleCancel', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleCancel(1);

            // Assert
            expect(container.state.cancelPopup).toEqual({ show: true, notificationId: 1 });
            expect(props.setIsRefresh).toHaveBeenCalled();
        });
    });

    describe('handleCancelConfirm', () => {
        it('should call exactly props functions', async () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleUpdateStatus = jest.fn();
            container.getParamStatus = jest.fn();

            // Act
            await container.handleCancelConfirm(1);

            // Assert
            expect(container.getParamStatus).toHaveBeenCalled();
            expect(container.handleUpdateStatus).toHaveBeenCalled();
        });
    });

    describe('handleResendFail', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleResendFail(1);

            // Assert
            expect(container.state.resendFailPopup).toEqual({ show: true, notificationId: 1 });
            expect(props.setIsRefresh).toHaveBeenCalled();
        });
    });

    describe('handleResendConfirm', () => {
        it('should call exactly props functions', async () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleUpdateStatus = jest.fn();
            container.getParamStatus = jest.fn();

            // Act
            await container.handleResendConfirm(1);

            // Assert
            expect(container.getParamStatus).toHaveBeenCalled();
            expect(container.handleUpdateStatus).toHaveBeenCalled();
        });
    });

    describe('handleDeactivate', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleDeactivate(1);

            // Assert
            expect(container.state.deactivatePopup).toEqual({ show: true, notificationId: 1 });
            expect(props.setIsRefresh).toHaveBeenCalled();
        });
    });

    describe('handleDeactivateConfirm', () => {
        it('should call exactly props functions', async () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleUpdateStatus = jest.fn();
            container.getParamStatus = jest.fn();

            // Act
            await container.handleDeactivateConfirm(1);

            // Assert
            expect(container.getParamStatus).toHaveBeenCalled();
            expect(container.handleUpdateStatus).toHaveBeenCalled();
        });
    });

    describe('handleDetailNotification', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleDetailNotification(1);

            // Assert
            expect(container.state.detailNotificationPopup).toEqual({ show: true, notificationId: 1 });
            expect(props.setIsRefresh).toHaveBeenCalled();
        });
    });

    describe('copySessionIdToClipboard', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            document.execCommand = jest.fn();

            // Act
            container.copySessionIdToClipboard(1);

            // Assert
            expect(Site.displayCopiedToClipboard).toHaveBeenCalled();
        });
    });

    describe('copySitesToClipboard', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const sites = [{ siteType: 'Credit', siteGroup: 1, siteNames:'siteNames' }];
            const container = shallow(<DataGrid {...props} />).instance();
            document.execCommand = jest.fn();

            // Act
            container.copySitesToClipboard(sites);

            // Assert
            expect(Site.displayCopiedToClipboard).toHaveBeenCalled();
        });
    });

    describe('renderTooltipComponent', () => {
        it('should render exactly', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            var actual = container.renderTooltipComponent('title', <div/>, 'className');
            var form = shallow(<div>{actual}</div>);

            // Assert
            expect(form.find(OverlayTrigger).length).toBe(1);
        });
    });

    describe('renderActionButtonOST', () => {
        it('should render exactly with status is New', () => {
            // Arrange
            const props = {...initProps};
            const status = 'New';
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleAction = jest.fn();
            container.handleCancel = jest.fn();

            // Act
            var actual = container.renderActionButtonOST(status, 1);
            var form = shallow(<div>{actual}</div>);
            form.find('.review-button').at(0).simulate('click');
            form.find('.cancel-button').at(0).simulate('click');

            // Assert
            expect(container.handleAction).toHaveBeenCalledWith(1);
            expect(container.handleCancel).toHaveBeenCalledWith(1);
        });

        it('should render exactly with status is Failed', () => {
            // Arrange
            const props = {...initProps};
            const status = 'Failed';
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleResendFail = jest.fn();

            // Act
            var actual = container.renderActionButtonOST(status, 1);
            var form = shallow(<div>{actual}</div>);
            form.find('.review-button').at(0).simulate('click');

            // Assert
            expect(container.handleResendFail).toHaveBeenCalledWith(1);
        });

        it('should render exactly with status is Draft', () => {
            // Arrange
            const props = {...initProps};
            const status = 'Draft';
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleAction = jest.fn();
            container.handleCancel = jest.fn();

            // Act
            var actual = container.renderActionButtonOST(status, 1);
            var form = shallow(<div>{actual}</div>);
            form.find('.review-button').at(0).simulate('click');
            form.find('.cancel-button').at(0).simulate('click');

            // Assert
            expect(container.handleAction).toHaveBeenCalledWith(1);
            expect(container.handleCancel).toHaveBeenCalledWith(1);
        });

        it('should render exactly with status is Cancelled', () => {
            // Arrange
            const props = {...initProps};
            const status = 'Cancelled';
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleAction = jest.fn();

            // Act
            var actual = container.renderActionButtonOST(status, 1);
            var form = shallow(<div>{actual}</div>);
            form.find('.review-button').at(0).simulate('click');

            // Assert
            expect(container.handleAction).toHaveBeenCalledWith(1);
        });

        it('should render null with status is null', () => {
            // Arrange
            const props = {...initProps};
            const status = '';
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleAction = jest.fn();

            // Act
            var actual = container.renderActionButtonOST(status, 1);

            // Assert
            expect(actual).toEqual(null);
        });
    });

    describe('renderActionButtonCSD', () => {
        it('should render exactly with status is New', () => {
            // Arrange
            const props = {...initProps};
            const status = 'New';
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleAction = jest.fn();

            // Act
            var actual = container.renderActionButtonCSD(status, 1);
            var form = shallow(<div>{actual}</div>);
            form.find('.review-button').at(0).simulate('click');

            // Assert
            expect(container.handleAction).toHaveBeenCalledWith(1);
        });

        it('should render exactly with status is Active', () => {
            // Arrange
            const props = {...initProps};
            const status = 'Active';
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleDeactivate = jest.fn();

            // Act
            var actual = container.renderActionButtonCSD(status, 1);
            var form = shallow(<div>{actual}</div>);
            form.find('.review-button').at(0).simulate('click');

            // Assert
            expect(container.handleDeactivate).toHaveBeenCalledWith(1);
        });

        it('should render exactly with status is Inactive', () => {
            // Arrange
            const props = {...initProps};
            const status = 'Inactive';
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleAction = jest.fn();

            // Act
            var actual = container.renderActionButtonCSD(status, 1);
            var form = shallow(<div>{actual}</div>);
            form.find('.review-button').at(0).simulate('click');

            // Assert
            expect(container.handleAction).toHaveBeenCalledWith(1);
        });
    });

    describe('renderConfirmPopup', () => {
        it('should return cancelPopup', () => {
            //Arrange
            const props = {...initProps};
            const state =  { cancelPopup: {show: true}, resendFailPopup: {show: false}, deactivatePopup: {show: false} };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);
            container.handleCancelConfirm = jest.fn()

            //Act
            var actual = container.renderConfirmPopup();
            shallow(<div>{actual}</div>).find(ConfirmPopup).at(0).simulate('submit');

            //Assert
            expect(container.handleCancelConfirm).toHaveBeenCalled();
        });

        it('should return resendFailPopup', () => {
            //Arrange
            const props = {...initProps};
            const state =  { cancelPopup: {show: false}, resendFailPopup: {show: true}, deactivatePopup: {show: false} };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);
            container.handleResendConfirm = jest.fn()

            //Act
            var actual = container.renderConfirmPopup();
            shallow(<div>{actual}</div>).find(ConfirmPopup).at(0).simulate('submit');

            //Assert
            expect(container.handleResendConfirm).toHaveBeenCalled();
        });

        it('should return deactivatePopup', () => {
            //Arrange
            const props = {...initProps};
            const state =  { cancelPopup: {show: false}, resendFailPopup: {show: false}, deactivatePopup: {show: true} };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);
            container.handleDeactivateConfirm = jest.fn()

            //Act
            var actual = container.renderConfirmPopup();
            shallow(<div>{actual}</div>).find(ConfirmPopup).at(0).simulate('submit');

            //Assert
            expect(container.handleDeactivateConfirm).toHaveBeenCalled();
        });
    });

    describe('renderTotalSites', () => {
        it('should call exactly function Modal', () => {
            //Arrange
            const props = {...initProps};
            const state =  { totalSitesPopup: {sites: [{ siteType: 'Credit', siteGroup: 1, siteNames:'siteNames' }]} };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);
            container.handleCloseTotalSites = jest.fn()

            //Act
            var actual = container.renderTotalSites();
            shallow(<div>{actual}</div>).find(Modal).at(0).props().onHide();

            //Assert
            expect(container.handleCloseTotalSites).toHaveBeenCalled();
        });

        
        it('should call exactly function Modal', () => {
            //Arrange
            const props = {...initProps};
            const state =  { totalSitesPopup: {sites: [{ siteType: 'Credit', siteGroup: 1, siteNames:'siteNames' }]} };
            const container = shallow(<DataGrid {...props}/>).instance();
            container.setState(state);
            container.handleCloseTotalSites = jest.fn()

            //Act
            var actual = container.renderTotalSites();
            shallow(<div>{actual}</div>).find(Button).at(0).simulate('click');

            //Assert
            expect(container.handleCloseTotalSites).toHaveBeenCalled();
        });
    });

    describe('handleCloseTotalSites', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            container.handleCloseTotalSites();

            // Assert
            expect(container.state.totalSitesPopup.show).toEqual(false);
            expect(props.setIsRefresh).toHaveBeenCalled();
        });
    });

    describe('renderSiteSection', () => {
        const sites = [{ siteType: 'Credit', siteGroup: 1, siteNames:'siteNames' }];

        it('should call exactly function when click total-site', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleOpenTotalSites = jest.fn();
            container.copySitesToClipboard = jest.fn();

            // Act
            var actual = container.renderSiteSection(sites, 'title');
            shallow(actual).find('.total-site').at(0).simulate('click');

            // Assert
            expect(container.handleOpenTotalSites).toHaveBeenCalled();
        });

        it('should call exactly function when click copySitesToClipboard', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.handleOpenTotalSites = jest.fn();
            container.copySitesToClipboard = jest.fn();

            // Act
            var actual = container.renderSiteSection(sites, 'title');
            shallow(actual).find('span').at(1).simulate('click');

            // Assert
            expect(container.copySitesToClipboard).toHaveBeenCalled();
        });
    });

    describe('renderMapSite', () => {
        it('should call exactly props functions', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderSiteSection = jest.fn();

            // Act
            container.renderMapSite(1);

            // Assert
            expect(container.renderSiteSection).toHaveBeenCalled();
        });
    });

    describe('renderCollapseContent', () => {
        it('should render exactly', () => {
            // Arrange
            const props = {...initProps};
            const item = {
                createdTime: '',
                subject: 'subject'
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            var actual = container.renderCollapseContent(item);

            // Assert
            expect(shallow(actual).find('.text-it').length).toBe(1);
        });
    });

    describe('contentBlock', () => {
        it('should render exactly', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            var actual = container.contentBlock(1, 'title', 'content');

            // Assert
            expect(shallow(actual).find('.linear-gradient').length).toBe(1);
        });
    });

    describe('renderMapOstContent', () => {
        it('should render exactly', () => {
            // Arrange
            const props = {...initProps};
            const item = {
                createdTime: '',
                subject: 'subject',
                content_en: 'content_en',
                content_cs: 'content_cs',
                content_ch: 'content_ch',
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.contentBlock = jest.fn();

            // Act
            var actual = container.renderMapOstContent(item);

            // Assert
            expect(container.contentBlock).toHaveBeenCalled();
        });
    });

    describe('renderRow', () => {
        const item = {
            createdTime: '',
            subject: 'subject',
            notificationID: 1,
            status: 'New',
            sender: 'sa',
            sendDate: '08/14/2024',
            messageID: 1,
            sessionID: 1,
            content_en: 'content_en',
            content_cs: 'content_cs',
            content_ch: 'content_ch',
        };

        it('should render exactly when click text-session', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderActionButtonOST = jest.fn();
            container.renderActionButtonCSD = jest.fn();
            container.renderCollapseContent = jest.fn();
            container.renderMapOstContent = jest.fn();
            container.copySessionIdToClipboard = jest.fn();
            container.handleDetailNotification = jest.fn();
            container.renderMapSite = jest.fn();

            // Act
            var actual = container.renderRow(item, 1, true);
            shallow(actual).find('span').at(0).simulate('click');

            // Assert
            expect(container.handleDetailNotification).toHaveBeenCalled();
        });

        it('should render exactly when click show-icon', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderActionButtonOST = jest.fn();
            container.renderActionButtonCSD = jest.fn();
            container.renderCollapseContent = jest.fn();
            container.renderMapOstContent = jest.fn();
            container.copySessionIdToClipboard = jest.fn();
            container.handleDetailNotification = jest.fn();
            container.renderMapSite = jest.fn();

            // Act
            var actual = container.renderRow(item, 1, true);
            shallow(actual).find('.show-icon').simulate('click');

            // Assert
            expect(container.copySessionIdToClipboard).toHaveBeenCalled();
        });

        it('should render exactly when isOstUser true', () => {
            // Arrange
            const props = {...initProps};
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderActionButtonOST = jest.fn();
            container.renderActionButtonCSD = jest.fn();
            container.renderCollapseContent = jest.fn();
            container.renderMapOstContent = jest.fn();
            container.copySessionIdToClipboard = jest.fn();
            container.handleDetailNotification = jest.fn();
            container.renderMapSite = jest.fn();

            // Act
            var actual = container.renderRow(item, 1, true);

            // Assert
            expect(container.renderActionButtonOST).toHaveBeenCalled();
        });

        it('should render exactly when isOstUser true', () => {
            // Arrange
            const props = {
                ...initProps,
                gridParams: {
                    ...initProps.gridParams
                }
            };
            const container = shallow(<DataGrid {...props} />).instance();
            container.renderActionButtonOST = jest.fn();
            container.renderActionButtonCSD = jest.fn();
            container.renderCollapseContent = jest.fn();
            container.renderMapOstContent = jest.fn();
            container.copySessionIdToClipboard = jest.fn();
            container.handleDetailNotification = jest.fn();
            container.renderMapSite = jest.fn();

            // Act
            var actual = container.renderRow(item, 1, true);

            // Assert
            expect(container.renderActionButtonOST).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should return null when have not data', () => {
            // Arrange
            const props = {
                ...initProps,
                gridData: null
            };
            const container = shallow(<DataGrid {...props} />).instance();

            // Act
            var actual = container.render();

            // Assert
            expect(actual).toBe(null);
        });
    });
});