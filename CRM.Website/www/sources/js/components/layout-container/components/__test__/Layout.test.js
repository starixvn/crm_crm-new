import React from 'react';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import {Layout} from '../Layout';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import * as commonFunc from '../../common.functions';

describe('Layout', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.resolveClientUrl = jest.fn(url => url);
        global.window = Object.create(window);
        Object.defineProperty(window, 'menus', {
        value: [{
            displayOrder: 1,
            environment: "LIVE",
            functionName: "Customer & Feedback",
            id: 1,
            isActive: true,
            name: "Feedback",
            parentId: 1,
            parentName: "",
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
        }]
        });

        const localStorageMock = (function() {
            let store = {};
            
            return {
              getItem(key) {
                return store[key];
              },
           
              setItem(key, value) {
                store[key] = value;
              },
            
              clear() {
                store = {};
              },
          
              removeItem(key) {
                delete store[key];
              }
            };
          })();

        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasCreateFeedbackPermission');
        appContainer.checked = true;
        const appContainer1 = document.createElement('div');
        appContainer1.setAttribute('id', 'hasReadCustomerInfo');
        appContainer1.checked = false;
        const appContainer2 = document.createElement('div');
        appContainer2.setAttribute('id', 'hasReadSitePermission');
        appContainer2.checked = false;
        document.body.appendChild(appContainer);
        document.body.appendChild(appContainer1);
        document.body.appendChild(appContainer2);

        const fixHeaderMenu = document.createElement('div');
        fixHeaderMenu.setAttribute('id', 'fix-header-menu');
        document.body.appendChild(fixHeaderMenu);

        const crmContainer = document.createElement('div');
        crmContainer.setAttribute('id', 'crm-container');
        document.body.appendChild(crmContainer);

        const promise = Promise.resolve({});
        commonFunc.CheckForIndexHTMLChange = jest.fn(() => promise);
        window.localStorage.setItem('isKeepLeftPanel', true);
        window.localStorage.setItem('isShowingLeftPanel', true);
        window.localStorage.setItem('updateLeftPanel', {});
    });

    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        const appContainer1 = document.getElementById('hasReadCustomerInfo');
        const appContainer2 = document.getElementById('hasReadSitePermission');
        const fixHeaderMenu = document.getElementById('fix-header-menu');
        const crmContainer = document.getElementById('crm-container');
        if (appContainer || appContainer1 || appContainer2 || fixHeaderMenu || crmContainer) {
            document.body.removeChild(appContainer);
            document.body.removeChild(appContainer1);
            document.body.removeChild(appContainer2);
            document.body.removeChild(fixHeaderMenu);
            document.body.removeChild(crmContainer);
        }

        window.localStorage.removeItem('isKeepLeftPanel');
        window.localStorage.removeItem('isShowingLeftPanel');
        window.localStorage.removeItem('updateLeftPanel');
    });


    describe('componentDidMount',() => {
        it('should call set state when lef panel is not null',async () => {
            //Arrange
            const crmContainer = document.createElement('div');
            crmContainer.setAttribute('id', 'crm-container');
            document.body.appendChild(crmContainer);
            window.localStorage.setItem('isKeepLeftPanel', true);
            window.localStorage.setItem('isShowingLeftPanel', true);
            window.localStorage.setItem('updateLeftPanel', {});
            const promise = Promise.resolve({});
            const props = {
              navigate: jest.fn()
            };
            const container = shallow(<Layout {...props}/>).instance();
            container.getSetting = jest.fn();
            container.initDataMenu = jest.fn();
            //Act
            container.componentDidMount();
            await promise;
            jest.runAllTimers();
            //Assert
            expect(container.state.isShowingLeftPanel).toEqual(false);
        });
    });

  describe('debounceUserNameInputChange', () => {
    it('searchText valid', async() => {
        // Arrange
        const searchText = 'text with length > 2';

        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();
        container.getParams = jest.fn(() => 'params');
        const promise = Promise.resolve({data: [{id: 1, name: 'test'}]});
        DataService.postDataAsync = jest.fn(() => promise);
        // Action
        container.debounceUserNameInputChange(searchText);
        await promise;
        jest.runAllTimers();

        // Assert
        expect(container.state.username).toEqual(searchText);
    });

    it('searchText invalid', () => {
      // Arrange
      const searchText = '1';

      const props = {
        navigate: jest.fn()
      };
      const container = shallow(<Layout {...props}/>).instance();
      // Action
      container.debounceUserNameInputChange(searchText);

      // Assert
      expect(container.state.customerSuggestions).toEqual([]);
    });
  });

  describe('initDataMenu ', () => {
    it('should set state exact data', () => {
        // Arrange
        const expected = [{
            displayOrder: 1,
            environment: "LIVE",
            functionName: "Customer & Feedback",
            id: 1,
            isActive: true,
            name: "Feedback",
            parentId: 1,
            parentName: "",
            policy: 2,
            url: '',
            subMenus: [{
              displayOrder: 1,
              environment: "LIVE",
              functionName: "Customer & Feedback",
              subMenus: [{displayOrder: 1, environment: "LIVE", functionName: "Customer & Feedback"}]
            }]
        }];
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();
        container.getSubMenus = jest.fn(() => [{displayOrder: 1, environment: "LIVE", functionName: "Customer & Feedback"}]);
        // Action
        container.initDataMenu(window.menus);

        // Assert
        expect(container.state.menus).toEqual(expected);
    });
  });

  describe('handleChange', () => {
    it('should set state exact data when type is checkbox', () => {
        // Arrange
        const event = {
          target: {type: 'checkbox', checked: true, name: 'isGuest'}
        };
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();
        // Action
        container.handleChange(event);

        // Assert
        expect(container.state.isGuest).toEqual(true);
    });

    it('should set state exact data when type is not checkbox', () => {
      // Arrange
      const event = {
        target: {type: 'text', value: 'test', name: 'username'}
      };
      const props = {
        navigate: jest.fn()
      };
      const container = shallow(<Layout {...props}/>).instance();
      // Action
      container.handleChange(event);

      // Assert
      expect(container.state.username).toEqual('test');
    });
  });

  describe('handleGetCustomerIsGuest', () => {
    it('should call exact function', () => {
        // Arrange
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();
        container.getParams = jest.fn();
        const promise = Promise.resolve({data: [{id: 1, name: 'test'}]});
        container.getDataGrid = jest.fn(() => promise);

        // Action
        container.handleGetCustomerIsGuest();
        // Assert
        expect(container.state.isGuest).toEqual(true);
        expect(container.getParams).toHaveBeenCalled();
        expect(container.getDataGrid).toHaveBeenCalled();
    });
  });

  describe('handleSearchUplineInfo', () => {
    it('should call exact function', () => {
        // Arrange
        const promise = Promise.resolve({data: [{id: 1, name: 'test'}]});
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();
        container.getCustomerInfo = jest.fn(() => promise);

        // Action
        container.handleSearchUplineInfo("test");
        // Assert
        expect(container.state.username).toEqual("test");
        expect(container.getCustomerInfo).toHaveBeenCalled();
    });
  });

  describe('setGridParams', () => {
    it('should call set state', () => {
        // Arrange
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();

        // Action
        container.setGridParams({usename: 'test', isGuest: true});
        // Assert
        expect(container.state.gridParams).toEqual({usename: 'test', isGuest: true});
    });
  });

  describe('setUserName ', () => {
    it('should call set state', () => {
        // Arrange
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();

        // Action
        container.setUserName({username: 'test'});
        // Assert
        expect(container.state.username).toEqual({"username": "test"});
    });
  });

  describe('handleChangeSuggestion', () => {
    it('should call set state', () => {
        // Arrange
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();

        // Action
        container.handleChangeSuggestion('test');
        // Assert
        expect(container.state.username).toEqual('test');
    });
  });

  describe('handleCloseEditCustomerInfoPopup', () => {
    it('should call set state', () => {
        // Arrange
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();

        // Action
        container.handleCloseEditCustomerInfoPopup();
        // Assert
        expect(container.state.editCustomerInfoPopup).toEqual({show: false});
    });
  });

  describe('getDataGrid ', () => {
    it('should call set state', async () => {
        // Arrange
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();
        container.getCustomerInfo = jest.fn();
        container.getSetting = jest.fn();
        container.handleSetStorage = jest.fn();
        // Action
        container.getDataGrid();
        jest.runAllTimers();
        // Assert
        expect(container.state.isShowingLeftPanel).toEqual(false);
    });
  });

  describe('handleNavigate', () => {
    it('should call exact function', () => {
        // Arrange
        const props = {
          navigate: jest.fn()
        };
        const container = shallow(<Layout {...props}/>).instance();
        
        // Action
        container.handleNavigate('/Dashboard');
        // Assert
        expect(props.navigate).toHaveBeenCalled();
    });
  });

  describe('handleCollapseExpandLayout ', () => {
    it('should not call set state', () => {
        // Arrange
        const event = {
          preventDefault: jest.fn()
        };
        const props = {
          navigate: jest.fn()
        };
        const state = {
          customerInfo: null
        };
        const container = shallow(<Layout {...props}/>).instance();
        container.setState(state);
        container.setState = jest.fn();
        // Action
        container.handleCollapseExpandLayout(event);
        // Assert
        expect(container.setState).toHaveBeenCalled();
    });

    it('should call exact function', () => {
      // Arrange
      global.window.dispatchEvent = jest.fn();
      const event = {
        preventDefault: jest.fn()
      };
      const state = {
        customerInfo: {id: 1, name: 'test'},
        isShowingLeftPanel: false
      };
      const props = {
        navigate: jest.fn()
      };
      const container = shallow(<Layout {...props}/>).instance();
      container.handleSetStorage = jest.fn();
      container.setState(state);
      // Action
      container.handleCollapseExpandLayout(event);
      jest.runAllTimers();
      // Assert
      expect(container.state.isShowingLeftPanel).toEqual(true);
      expect(container.handleSetStorage).toHaveBeenCalled();
      expect(global.window.dispatchEvent).toHaveBeenCalled();
    });
  });

  describe('getCustomerInfo  ', () => {
    it('should call set state', async () => {
        // Arrange
        const state = {
          settings : {
            countries: [{countryCode: 93, isActive: true, displayOrder: 0, id: 1, name: "Afghanistan"}],
            languages: [{languageId: 12000, name: "English", displayOrder: 10, isActive: true}],
            sites: [{isLicensee: false, isActive: false}, {isLicensee: false, isActive: false}, {name: 'Credit', childSites: [{id: 1}]}],
            sitesLicenseeInactive: [{isLicensee: true, isActive: false, childSites: null, id: 6200, name: "12Bet"}]
          }
        };
        const props = {location:{pathname: '/'}, navigate: jest.fn()};
        const data = {
          custId: 1, name: 'test', siteId : 1
        };
        Site.resolveClientUrl = jest.fn();
        const promise = Promise.resolve({data: data});
        DataService.postDataAsync = jest.fn(() => promise);
        const container = shallow(<Layout {...props}/>).instance();
        container.handleNavigate = jest.fn();
        container.setState(state);

        // Action
        container.getCustomerInfo();
        jest.runAllTimers();
        await promise;
        // Assert
        expect(container.state.customerInfo).toEqual(data);
    });

    //   it('should show confirm empty pop up', async () => {
    //     // Arrange
    //     const props = {location:{pathname: '/'}, navigate: jest.fn()};
    //     const data = null;
    //     Site.resolveClientUrl = jest.fn();
    //     const promise = Promise.resolve({data: data});
    //     DataService.postDataAsync = jest.fn(() => promise);
    //     const container = shallow(<Layout {...props}/>).instance();

    //     // Action
    //     container.getCustomerInfo();
    //     jest.runAllTimers();
    //     await promise;
    //     // Assert
    //     expect(container.state.showEmptyConfirmPopup).toEqual(true);
    // });

    it('should show confirm empty customer info pop up', async () => {
      // Arrange
      const state = {
        showErrorConfirmPopup: true
      };
      const props = {location:{pathname: '/'}, navigate: jest.fn()};
      const data = null;
      Site.resolveClientUrl = jest.fn();
      const promise = Promise.resolve({data: data});
      DataService.postDataAsync = jest.fn(() => promise);
      const container = shallow(<Layout {...props}/>).instance();
      container.setState(state);
      // Action
      container.getCustomerInfo();
      jest.runAllTimers();
      await promise;
      // Assert
      expect(container.state.showErrorConfirmPopup).toEqual(true);
    });
  });
});