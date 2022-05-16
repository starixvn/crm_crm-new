import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';
import DataService from '@jsroot/common/dataService';
import { Link } from 'react-router-dom';

describe('Header', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call exactly function', async () => {
            // Arrange
            const response = { data: [{ name: 'Home' }] };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const initDataMenu = jest.fn();

            // Act
            const container = shallow(<Header />).instance();
            container.initDataMenu = initDataMenu;
            await container.componentDidMount();
            await promise;
            jest.runAllTimers();

            expect(initDataMenu).toHaveBeenCalled();
        });
    });

    describe('initDateMenu', () => {
        it('should setState exactly', () => {
            // Arrange
            const menus = [
                {
                    name: 'Home', parent: null, displayOrder: 1, url: '/Home'
                },
                {
                    name: 'FeedBack', parent: null, displayOrder: 2, url: '/FeedBack'
                }
            ];
            const expected = [
                { displayOrder: 1, name: 'Home', parent: null, subMenus: [], url: '/Home' },
                { displayOrder: 2, name: 'FeedBack', parent: null, subMenus: [], url: '/FeedBack' }
            ];

            // Act
            const container = shallow(<Header />); 
            container.instance().initDataMenu(menus);

            // Assert
            expect(container.state().menus).toEqual(expected);
        });
    });

    describe('getSubMenus', () => {
        it('should return expected result', () => {
            // Arrange
            const itemMenu = { name: 'Cs Report', parent: null, displayOrder: 5, url: '/CsReport', id: 122 };
            const menus = [
                {
                    name: 'Report', displayOrder: 1, url: '/Report', parent: { id: 122 }
                    // subItem : [
                    //     { name: 'Cs Report', parent: null, displayOrder: 5, url: '/CsReport', id: 122 },
                    //     { name: 'Ko Report', parent: null, displayOrder: 2, url: '/KoReport', id: 122 }
                    // ]
                }
            ];
            const expected = [{ name: 'Report', displayOrder: 1, url: '/Report', parent: { id: 122 } }];

            // Act
            const container = shallow(<Header />);
            const actual = container.instance().getSubMenus(itemMenu, menus);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('isIgnoreMenu', () => {
        it('should return false', () => {
            // Arrange
            const itemMenu = { 
                name: 'Cs Report', parent: null, displayOrder: 5, url: 'n/a', id: 122,
                subMenus: []
            };

            // Act
            const container = shallow(<Header />);
            const actual = container.instance().isIgnoreMenu(itemMenu);

            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true', () => {
            // Arrange
            const itemMenu = {
                name: 'Cs Report', parent: null, displayOrder: 5, url: '/CsReport', id: 122,
                subMenus : [
                    { name: 'Cs Report', parent: null, displayOrder: 5, url: '/CsReport', id: 122 },
                    { name: 'Ko Report', parent: null, displayOrder: 2, url: '/KoReport', id: 122 }
                ]
            }

            // Act
            const container = shallow(<Header />);
            const actual = container.instance().isIgnoreMenu(itemMenu);

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('renderListMenu', () => {
        it('should return expected result', () => {
            // Arrange
            const menus = {
                name: 'Report', displayOrder: 1, url: '/Report', parent: { id: 122 }, id: 123,
                subMenus : [
                    { 
                        name: 'Cs Report', parent: null, displayOrder: 5, url: '/CsReport', id: 122,
                        subMenus: [{name: 'Cxs Report', parent: null, displayOrder: 5, url: '/CxsReport', id: 133}] 
                    }
                ]
            };

            // Act
            const container = shallow(<Header />);
            container.instance().renderListMenu = jest.fn(() => <div />);
            const actual = container.instance().renderListMenu(menus, 1);

            // Assert
            expect(actual).toEqual(<div />);
        });

        it('should find expected template', () => {
            // Arrange
            const menus = {
                name: 'Report', displayOrder: 1, url: '/Report', parent: { id: 122 }, id: 123,
                subMenus : [
                    { 
                        name: 'Cs Report', parent: null, displayOrder: 5, url: '/CsReport', id: 122,
                        subMenus: [{name: 'Cxs Report', parent: null, displayOrder: 5, url: '/CxsReport', id: 133}] 
                    }
                ]
            };

            // Act
            const container = shallow(<Header />);

            const actual = shallow(container.instance().renderListMenu(menus, 1));

            // Assert
            expect(actual.find(Link).at(0).props().to).toEqual('/Report');
            expect(actual.find(Link).at(1).props().to).toEqual('/CsReport');
            expect(actual.find(Link).at(2).props().to).toEqual('/CxsReport');
        });
    });

    describe('render', () => {
        it('should render not correctly', () => {
            //Act
            const container = shallow(<Header />);
            container.setState({ menu: [] });

            //Assert
            expect(container.type()).toEqual(null);
        });
    });
});