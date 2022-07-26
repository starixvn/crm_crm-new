import React from 'react';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import Filter from '../Filter';
import { ToastContainer, Slide } from 'react-toastify';
import Header from '../Header';
import DataGrid from '../DataGrid';
import {Layout} from '../Layout';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';

describe('LayoutNavigation', () => {
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
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount',() => {
        it('should call set state when lef panel is not null',async () => {
            //Arrange
            window.localStorage.setItem('isKeepLeftPanel', true);
            const promise = Promise.resolve({});
            const container = shallow(<Layout />).instance();
            container.getSetting = jest.fn();
            container.initDataMenu = jest.fn();
            //Act
            container.componentDidMount();
            await promise;
            jest.runAllTimers();
            //Assert
            expect(container.state.isShowingLeftPanel).toEqual(true);
        });
    });

    describe('getSetting',() => {
      it('should set state exact data',async () => {
          //Arrange
          const settings = {
            countries: [{countryCode: 93, isActive: true, displayOrder: 0, id: 1, name: "Afghanistan"}],
            languages: [{languageId: 12000, name: "English", displayOrder: 10, isActive: true}],
            sites: [{isLicensee: false, isActive: false}, {isLicensee: false, isActive: false}],
            sitesLicenseeInactive: [{isLicensee: true, isActive: false, childSites: null, id: 6200, name: "12Bet"}]
          };
          Site.resolveClientUrl = jest.fn();
          const promise = Promise.resolve({data: settings});
          DataService.getDataAsync = jest.fn(() => promise);
          const container = shallow(<Layout />).instance();

          //Act
          container.getSetting();
          await promise;

          //Assert
          expect(container.state.settings).toEqual(settings);
      });
  });

  describe('debounceUserNameInputChange', () => {
    it('searchText valid', async() => {
        // Arrange
        const searchText = 'text with length > 2';

        const container = shallow(<Layout />).instance();
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

      const container = shallow(<Layout />).instance();
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
        const container = shallow(<Layout />).instance();
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
        const container = shallow(<Layout />).instance();
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
      const container = shallow(<Layout />).instance();
      // Action
      container.handleChange(event);

      // Assert
      expect(container.state.username).toEqual('test');
    });
  });

  describe('handleGetCustomerIsGuest', () => {
    it('should call exact function', () => {
        // Arrange
        const container = shallow(<Layout />).instance();
        container.handleCloseEmptyConfirm = jest.fn();
        container.getParams = jest.fn();
        container.getDataGrid = jest.fn();

        // Action
        container.handleGetCustomerIsGuest();
        // Assert
        expect(container.state.isGuest).toEqual(true);
        expect(container.handleCloseEmptyConfirm).toHaveBeenCalled();
        expect(container.getParams).toHaveBeenCalled();
        expect(container.getDataGrid).toHaveBeenCalled();
    });
  });

  describe('setGridParams', () => {
    it('should call set state', () => {
        // Arrange
        const container = shallow(<Layout />).instance();

        // Action
        container.setGridParams({usename: 'test', isGuest: true});
        // Assert
        expect(container.state.gridParams).toEqual({usename: 'test', isGuest: true});
    });
  });

  describe('setUserName ', () => {
    it('should call set state', () => {
        // Arrange
        const container = shallow(<Layout />).instance();

        // Action
        container.setUserName({username: 'test'});
        // Assert
        expect(container.state.username).toEqual({"username": "test"});
    });
  });

  describe('handleCloseEmptyConfirm', () => {
    it('should call set state', () => {
        // Arrange
        const container = shallow(<Layout />).instance();

        // Action
        container.handleCloseEmptyConfirm();
        // Assert
        expect(container.state.showEmptyConfirmPopup).toEqual(false);
    });
  });

  describe('handleCloseEmptyCustomerInfoPopup ', () => {
    it('should call set state', () => {
        // Arrange
        const container = shallow(<Layout />).instance();

        // Action
        container.handleCloseEmptyCustomerInfoPopup();
        // Assert
        expect(container.state.showEmptyCustomerInfoPopup).toEqual(false);
    });
  });

  describe('handleChangeSuggestion', () => {
    it('should call set state', () => {
        // Arrange
        const container = shallow(<Layout />).instance();

        // Action
        container.handleChangeSuggestion('test');
        // Assert
        expect(container.state.username).toEqual('test');
    });
  });

  describe('handleCloseEditCustomerInfoPopup', () => {
    it('should call set state', () => {
        // Arrange
        const container = shallow(<Layout />).instance();

        // Action
        container.handleCloseEditCustomerInfoPopup();
        // Assert
        expect(container.state.editCustomerInfoPopup).toEqual({show: false});
    });
  });

  describe('getDataGrid ', () => {
    it('should call set state', async () => {
        // Arrange
        const container = shallow(<Layout />).instance();
        container.getCustomerInfo = jest.fn();
        container.getSetting = jest.fn();
        container.handleSetStorage = jest.fn();
        // Action
        container.getDataGrid();
        jest.runAllTimers();
        // Assert
        expect(container.state.isShowingLeftPanel).toEqual(true);
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
        const container = shallow(<Layout />).instance();
        container.setState = jest.fn();
        // Action
        container.handleCollapseExpandLayout(event);
        // Assert
        expect(container.setState).not.toHaveBeenCalled();
    });

    it('should call exact function', () => {
      // Arrange
      const event = {
        preventDefault: jest.fn()
      };
      const state = {
        customerInfo: {id: 1, name: 'test'}
      };
      const prevState = {
        isShowingLeftPanel: false
      };
      const container = shallow(<Layout />).instance();
      container.handleSetStorage = jest.fn();
      container.setState(state);
      container.setState(prevState);
      // Action
      container.handleCollapseExpandLayout(event);
      jest.runAllTimers();
      // Assert
      expect(container.state.isShowingLeftPanel).toEqual(true);
      expect(container.handleSetStorage).toHaveBeenCalled();
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
        const props = {location:{pathname: '/'}};
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
        expect(container.handleNavigate).toHaveBeenCalled();
    });

    it('should show confirm empty pop up', async () => {
      // Arrange
      const props = {location:{pathname: '/'}};
      const data = null;
      Site.resolveClientUrl = jest.fn();
      const promise = Promise.resolve({data: data});
      DataService.postDataAsync = jest.fn(() => promise);
      const container = shallow(<Layout {...props}/>).instance();

      // Action
      container.getCustomerInfo();
      jest.runAllTimers();
      await promise;
      // Assert
      expect(container.state.showEmptyConfirmPopup).toEqual(true);
  });

  it('should show confirm empty customer info pop up', async () => {
    // Arrange
    const state = {
      isGuest: true
    };
    const props = {location:{pathname: '/'}};
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
    expect(container.state.showEmptyCustomerInfoPopup).toEqual(true);
  });
  });
});