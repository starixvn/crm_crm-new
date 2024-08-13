import React from 'react';
import { shallow } from 'enzyme';
import AffectedTicket from '../AffectedTicket';
import { HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

describe('AffectedTicket', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        isCredit: true,
        siteTickets: [{siteType: 'Credit', siteName: 'MNC-1'}, {siteType: 'Licensee', siteName: 'MNC-2'}],
        notificationId: 1,
        eventTime: '08/08/2024',
        eventName: 'event mnc'
    };

    describe('getSiteOptions', () => {
        const props = {
            ...initProps
        };
        it('should return exactly site options', () => {
            // Arrange
            var expected = [{"checked": true, "id": "MNC-1", "name": "MNC-1"}];
            const container = shallow(<AffectedTicket {...props}/>).instance();

            //Act
            const actual = container.getSiteOptions(props.isCredit, props.siteTickets);

            // Assert 
            expect(actual).toEqual(expected);
        });
    });

    describe('handleChangeTab', () => {
        const props = {
            ...initProps
        };
        it('should setState exactly', () => {
            // Arrange
            var expected = {
                isCredit: false,
                siteOptions: [{checked: true, id: "MNC-2", name: "MNC-2"}],
                siteTickets: [{siteName: "MNC-1", "siteType": "Credit"}, {siteName: "MNC-2", siteType: "Licensee"}
            ]};
            const container = shallow(<AffectedTicket {...props}/>).instance();

            //Act
            container.handleChangeTab();

            // Assert 
            expect(container.state).toEqual(expected);
        });
    });

    describe('handleChangeSite', () => {
        const props = {
            ...initProps
        };
        it('should setState exactly', () => {
            // Arrange
            var expected = [{siteName: "MNC-1", siteType: "Credit"}];
            var selectedItemsKey = 'MNC-1';
            var state = { isCredit: true };
            const container = shallow(<AffectedTicket {...props}/>).instance();
            container.setState(state);

            //Act
            container.handleChangeSite(null, selectedItemsKey);

            // Assert
            expect(container.state.siteTickets).toEqual(expected);
        });
    });

    describe('handleExport', () => {
        const props = {
            ...initProps,
            exportExcel: jest.fn()
        };
        it('should call props function exactly', () => {
            // Arrange
            var params = {eventName: "event mnc", eventTime: "08/08/2024", notificationId: 1};
            const container = shallow(<AffectedTicket {...props}/>).instance();

            //Act
            container.handleExport();

            // Assert
            expect(props.exportExcel).toHaveBeenCalledWith(params);
        });
    });

    describe('getData', () => {
        const props = {
            ...initProps
        };
        it('should return exactly expected', () => {
            // Arrange
            var expected = [{siteName: "MNC-1", siteType: "Credit"}];
            var state = { siteTickets: props.siteTickets };
            const container = shallow(<AffectedTicket {...props}/>).instance();
            container.setState(state);

            //Act
            var actual = container.getData(true);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('renderInfoBySystem', () => {
        const props = {
            ...initProps
        };
        it('should return exactly expected', () => {
            // Arrange
            var expected = {usernameColumn: "Username", headlineColumn: "Headline"};
            const container = shallow(<AffectedTicket {...props}/>).instance();

            //Act
            var actual = container.renderInfoBySystem(true);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('buildHeader', () => {
        const props = {
            ...initProps
        };
        it('should return exactly expected', () => {
            // Arrange
            var expected = (
                <HeaderRow>
                    <HeaderCell colWidth={5}>{LangHelper.getResource('#')}</HeaderCell>
                    <HeaderCell colWidth={20}>{LangHelper.getResource('Site')}</HeaderCell>
                    <HeaderCell colWidth={30}>{LangHelper.getResource('BetID')}</HeaderCell>
                    <HeaderCell colWidth={30}>{LangHelper.getResource('Username')}</HeaderCell>
                    <HeaderCell colWidth={30}>{LangHelper.getResource('Headline')}</HeaderCell>
                </HeaderRow>
            );
            const container = shallow(<AffectedTicket {...props}/>).instance();

            //Act
            var actual = container.buildHeader(true);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('buildBody', () => {
        const props = {
            ...initProps
        };
        it('should return exactly expected when have data', () => {
            // Arrange
            var expected = [<div />];
            var state = { siteTickets: props.siteTickets, isCredit: true };
            const container = shallow(<AffectedTicket {...props}/>).instance();
            container.setState(state);
            container.renderRow = jest.fn(() => <div />);

            //Act
            var actual = container.buildBody(true);

            // Assert
            expect(actual).toEqual(expected);
        });

        it('should return exactly expected when have not data', () => {
            // Arrange
            var expected = [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={5}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
            var state = { siteTickets: [{siteName: "test", siteType: "test"}], isCredit: true };
            const container = shallow(<AffectedTicket {...props}/>).instance();
            container.setState(state);

            //Act
            var actual = container.buildBody(true);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('renderRow', () => {
        const props = {
            ...initProps
        };
        it('should return exactly expected', () => {
            // Arrange
            var expected = (
                <Row key={0}>
                    <Cell className='text-center'><div>{1}</div></Cell>
                    <Cell className='text-center'><div>{'MNC'}</div></Cell>
                    <Cell className='text-center'><div>{1}</div></Cell>
                    <Cell className='text-left'><div>{'username'}</div></Cell>
                    <Cell className='text-left'><div>{'extInfo'}</div></Cell>
                </Row>
            );
            var item = { username: 'username', extInfo: 'extInfo', siteName: 'MNC', transID: 1 };
            const container = shallow(<AffectedTicket {...props}/>).instance();

            //Act
            var actual = container.renderRow(item, 0);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('renderTab', () => {
        const props = {
            ...initProps
        };
        it('should return render exactly', () => {
            // Arrange
            var state = { siteTickets: [{siteName: "test", siteType: "test"}], isCredit: true };
            const container = shallow(<AffectedTicket {...props}/>);
            container.instance().handleChangeTab = jest.fn();
            container.instance().setState(state);

            //Act
            container.instance().renderTab();
            container.find('.credit-user').at(0).simulate('click');
            container.find('.licensee-user').at(0).simulate('click');

            // Assert
            expect(container.instance().handleChangeTab).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        const props = {
            ...initProps
        };
        it('should return null', () => {
            // Arrange
            var state = { siteTickets: null };
            const container = shallow(<AffectedTicket {...props}/>);
            container.instance().setState(state);

            //Act
            var actual = container.instance().render();

            // Assert
            expect(actual).toEqual(null);
        });
    });
});