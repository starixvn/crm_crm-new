import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';
import Site from '@jsroot/common/site';

describe('Header', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
    const props = {
        menus: [{
            name: 'Report', displayOrder: 1, url: '/Report', parent: { id: 122 }, id: 123,
            subMenus : [
                { 
                    name: 'Cs Report', parent: null, displayOrder: 5, url: '/CsReport', id: 122,
                    subMenus: [{name: 'Cxs Report', parent: null, displayOrder: 5, url: '/CxsReport', id: 133}] 
                }
            ]
        }],
        handleCollapseExpandLayout : jest.fn()
    }
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

    describe('render', () => {
        it('should work exactly', () => {
            // Arrange   
            // Act
            const container = shallow(<Header {...props} />);
            container.instance().isIgnoreMenu = jest.fn();
            container.instance().render();

            // Assert
            expect(container.instance().isIgnoreMenu).toHaveBeenCalledTimes(1);
        });

        it('should work exactly when click icon logo', () => {
            // Arrange   
            // Act
            const container = shallow(<Header {...props} />);
            const body = shallow(container.instance().render());
            body.find('div div img').at(0).simulate('click');

            // Assert
            expect(window.location.search).toEqual("");
        });

        it('should work exactly when click handleLogout', () => {
            // Arrange   
            // Act
            const container = shallow(<Header {...props} />);
            container.instance().handleLogout = jest.fn();
            const body = shallow(container.instance().render());
            body.find('a').last().simulate('click');

            // Assert
            expect(container.instance().handleLogout).toHaveBeenCalledTimes(1);
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

    describe('handleLogout ', () => {
        it('should work correctly', () => {
            //Act
            const container = shallow(<Header />);

            container.instance().handleLogout();
            //Assert
            expect(window.localStorage.length).toEqual(0);
        });
    });
});