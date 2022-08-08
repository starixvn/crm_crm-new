import React from 'react';
import Filter from '../Filter';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import { toast } from 'react-toastify';
import Site from '@jsroot/common/site';

describe('filter', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
        Site.resolveClientUrl = jest.fn((url) => url);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasCreateFeedbackPermission');
        appContainer.checked = true;
        document.body.appendChild(appContainer);
    });
    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    const promise = Promise.resolve({});

    const initProps = {
        menus: [{
            displayOrder: 1,
            environment: "LIVE",
            functionName: "Customer & Feedback",
            id: 1,
            isActive: true,
            name: "Feedback",
            parentId: 1,
            parentName: "Feedback1",
            policy: 2,
            url: '',
            subMenus: [{
                displayOrder: 0,
                environment: "LIVE",
                functionName: "Create Update Feedback & Customer Info",
                id: 477,
                isActive: true,
                name: "Add Guest Feedback",
                parentId: 473,
                parentName: "Feedback",
                policy: 2,
                subMenus: [],
                url: "/AddGuestFeedback/Index",
                validUrl: "~/AddGuestFeedback/Index"
            }]
        }],
        username: 'username',
        customerSuggestions: [{
            id:1, name: 'test'
        }],
        isGuest: false,
        handleChange: jest.fn(),
        showEmptyCustomerInfoPopup: false,
        debounceUserNameInputChange: jest.fn(),
        handleChangeSuggestion: jest.fn(),
        handleCloseEmptyCustomerInfoPopup: jest.fn(),
        showEmptyConfirmPopup: false,
        handleGetCustomerIsGuest: jest.fn(),
        handleCloseEmptyConfirm: jest.fn(),
        handleNavigate: jest.fn(),
        getDataGrid: jest.fn(() => promise),
        isCreditSite: true
    };

    describe('methods', () => {
        describe('handleSubmit', () => {
            it('should return error when username is null', () => {
                //Arrange
                const event = {
                    preventDefault: jest.fn()
                };
                toast.error = jest.fn();
                const props = {...initProps, username: null};
                //Act
                const container = shallow(<Filter {...props} />).instance();
                container.handleSubmit(event);
                //Assert
                expect(toast.error).toHaveBeenCalledWith(LangHelper.getResource('PleaseInputUsername'));
            });

            it('should call exact funtion', async () => {
                //Arrange
                const event = {
                    preventDefault: jest.fn()
                };
                //Act
                const container = shallow(<Filter {...initProps} />).instance();
                container.handleSubmit(event);
                await promise;
                jest.runAllTimers();
                //Assert
                expect(initProps.handleNavigate).toHaveBeenCalled();
            });
        });

        describe('renderSubmenu', () => {
            it('should render left detail menu', () => {
                //Arrange
                global.window = Object.create(window);
                Object.defineProperty(window, 'location', {
                value: {
                    pathname: "/LatestFeedback"
                }
                });
                const props = {...initProps, username: null};
                //Act
                const container = shallow(<Filter {...props} />).instance();
                container.renderDetailBreadcrumbsMenu = jest.fn();
                container.getUrlPath = jest.fn(() => '/LatestFeedback');

                container.renderSubmenu();
                //Assert
                expect(container.renderDetailBreadcrumbsMenu).toHaveBeenCalled();
            });
        });

        describe('renderDetailBreadcrumbsMenu ', () => {
            it('should call exact function', () => {
                //Arrange
                const container = shallow(<Filter {...initProps} />).instance();

                //Act
                const breadbrumb = shallow(container.renderDetailBreadcrumbsMenu('/LatestFeedback'));
                breadbrumb.find('.fa-home').simulate('click');

                //Assert
                expect(initProps.handleNavigate).toHaveBeenCalled();
            });
        });

        describe('getBreadcrumbsMenu', () => {
            it('should return exact value when parentId > 0', () => {
                //Arrange
                const currentMenu = {
                    parentId: 1,
                    name: 'name'
                };
                const container = shallow(<Filter {...initProps} />).instance();
                container.recursiveFindParentName = jest.fn(() => 'test');
                //Act
                const actual = container.getBreadcrumbsMenu(currentMenu, []);

                //Assert
                expect(actual).toEqual(['t','e','s','t','name']);
            });

            it('should return exact value when parentId < 0', () => {
                //Arrange
                const currentMenu = {
                    parentId: 0,
                    name: 'name'
                };
                const container = shallow(<Filter {...initProps} />).instance();
                container.recursiveFindParentName = jest.fn(() => 'test');
                //Act
                const actual = container.getBreadcrumbsMenu(currentMenu, []);

                //Assert
                expect(actual).toEqual(['name']);
            });
        });

        describe('isActiveTab', () => {
            it('should return exact value', () => {
                //Arrange
                const container = shallow(<Filter {...initProps} />).instance();
                //Act
                const actual = container.isActiveTab('test', 1);

                //Assert
                expect(actual).toEqual(false);
            });
        });

        describe('recursiveFindParentName ', () => {
            it('should return exact parent name', () => {
                //Arrange
                const container = shallow(<Filter {...initProps} />).instance();
                container.recursiveFindParentName = jest.fn(() => 'test');
                //Act
                const actual = container.recursiveFindParentName(initProps.menus, 1);

                //Assert
                expect(actual).toEqual("test");
            });
        });

        describe('isCheckActive', () => {
            it('should return exact class name', () => {
                //Arrange
                const container = shallow(<Filter {...initProps} />).instance();
                container.isActiveTab = jest.fn(() => true);
                //Act
                const actual = container.isCheckActive('test', 1);

                //Assert
                expect(actual).toEqual('active');
            });

            it('should return empty', () => {
                //Arrange
                const container = shallow(<Filter {...initProps} />).instance();
                container.isActiveTab = jest.fn(() => false);
                //Act
                const actual = container.isCheckActive('test', 1);

                //Assert
                expect(actual).toEqual('');
            });
        });

        describe('renderHomeSubMenu', () => {
            const cases = [['Dashboard', 1], ['Detail', 2], ['Communication', 3], ['SpecialRemark', 4], ['Remark', 5], ['Redemption', 6], ['ActionLog', 7]];
            test.each(cases)(
                "should navigate to %s",
                (firstArg, secondArg) => {
                  //Arrange
                const container = shallow(<Filter {...initProps} />).instance();
                const submenu = shallow(container.renderHomeSubMenu('/'));
                //Act
                submenu.find('li').at(secondArg).find('a').simulate('click');

                //Assert
                expect(initProps.handleNavigate).toHaveBeenCalledWith(firstArg);
                }
            );
        });

        describe('Render', () => {
            it('should return null', () => {
                //Arrange
                const props = {
                    menus: null
                };
                const actual = shallow(<Filter {...props} />);
                //Act

                //Assert
                expect(actual).toEqual({});
            });
        });

        describe('recursiveFindParentName', () => {
            it('should return exact parent name', () => {
                //Arrange
                const container = shallow(<Filter {...initProps} />).instance();
                container.recursiveFindParentName = jest.fn(() => []);
                //Act
                const actual = container.recursiveFindParentName(initProps.menus, 1);
                //Assert
                expect(actual).toEqual([]);
            });
        });
    });
});