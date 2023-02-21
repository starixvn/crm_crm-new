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
        const appContainer1 = document.createElement('div');
        appContainer1.setAttribute('id', 'hasReadFeedbackPermission');
        appContainer1.checked = true;
        document.body.appendChild(appContainer);
        document.body.appendChild(appContainer1);
    });
    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        const appContainer1 = document.getElementById('hasReadFeedbackPermission');
        if (appContainer || appContainer1) {
            document.body.removeChild(appContainer);
            document.body.removeChild(appContainer1);
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
        describe('componentWillUnmount', () => {
            it('should remove event listener on unmount', () => {
                //Arrange
                document.removeEventListener = jest.fn();
                const wrapper = shallow(<Filter {...initProps} />);
                wrapper.instance().handleKeyDownFunc = jest.fn();
                //Act
                wrapper.instance().componentWillUnmount();
                //Assert
                expect(document.removeEventListener).toHaveBeenCalledWith('keydown', wrapper.instance().handleKeyDownFunc, false);
            });
        });

        describe('handleKeyDownFunc', () => {
            const cases = [['m', 'li-main', 'Dashboard'], ['d', 'li-detail', 'Detail'],
                ['l', 'li-communication-log', 'Communication'], ['k', 'li-special-remark', 'SpecialRemark'],
                ['r', 'li-special-new-remark', 'Remark'], ['t', 'li-activity-log', 'ActionLog']
            ];
            it.each(cases)(
                "should call handleNavigate when %s is pressed",
                (key, id , pathname) => {
                    //Arrange
                    const div_main = document.createElement('div');
                    div_main.setAttribute('id', id);
                    document.body.appendChild(div_main);
                    window.location.pathname = pathname;
                    const props = {...initProps, handleNavigate: jest.fn()};
                    const wrapper = shallow(<Filter {...props} />);
                    const event = { key: key, ctrlKey: true, preventDefault: jest.fn() };
                    wrapper.instance().isCheckActive = jest.fn();
                    //Act
                    wrapper.instance().handleKeyDownFunc(event);
                    //Assert
                    expect(wrapper.instance().isCheckActive).toHaveBeenCalled();
                    expect(props.handleNavigate).toHaveBeenCalledWith(pathname);
                
                    expect(event.preventDefault).toHaveBeenCalled();
            });
          });

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