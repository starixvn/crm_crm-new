import React from 'react';
import { Filter } from '../Filter';
import DateTimeService from '@jsroot/common/dateTimeService';
import { shallow } from 'enzyme';
import DatePicker from '@jsroot/components/date-picker/index';
import { toast } from 'react-toastify';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';

describe('Filter', () => {
    beforeAll(() => {
        window.currentClientTime = '01/04/2022 10:05:20 AM';
        LangHelper.getResource = jest.fn(key => key);
        const appContainer2 = document.createElement('div');
        appContainer2.setAttribute('id', 'hasReadSitePermission');
        appContainer2.checked = false;
        document.body.appendChild(appContainer2);
    });

    afterAll(() => {
        const hasReadSitePermission = document.getElementById('hasReadSitePermission');
        if (hasReadSitePermission) {
            document.body.removeChild(hasReadSitePermission);
        }
        jest.clearAllMocks();
    });

    const initProps = {
        remarkTitles: [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}],
        customerName  : 'test',
        gridParams: {pageIndex: 1, pageSize: 100, username: '', isGuest: false},
        setGridParams: jest.fn(),
        setShowHistory: jest.fn(),
        getNewRemarks: jest.fn(),
        setOpenCreatePopup: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call setState when username is empty', () => {
            // Arrange
            const props = {
                remarkTitles: [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}],
                customerName  : ''
            };
            const expectedOptions = [{
                id: 70000,
                value: 'Internal Request',
                checked: true
            }];

            //Act
            var container = shallow(<Filter {...props} />);

            // Assert
            expect(container.instance().state.remarkTitleOptions).toEqual(expectedOptions);
            expect(container.instance().state.remarkTitleIds).toEqual('70000');
        });
    });

    describe('handleChangeFromDate', () => {
        it('should update fromDate when fromDate is change', () => {
            // Arrange
            const fromDate = new Date('01/04/2022 10:05:20 AM');

            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeSpecificDate = jest.fn();
            // Act
            container.instance().handleChangeFromDate(fromDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('01/04/2022 10:05:20 AM'));
            expect(container.instance().handleChangeSpecificDate).toHaveBeenCalled();
        });
    });

    describe('handleChangeToDate ', () => {
        it('should update fromDate when toDate smaller than fromDate', () => {
            // Arrange
            const state = {
                fromDate: new Date('01/04/2022 10:05:20 AM')
            };
            const toDate = new Date('01/03/2022 10:05:20 AM');

            const container = shallow(<Filter {...initProps}/>);
            container.instance().setState(state);
            container.instance().handleChangeSpecificDate = jest.fn();

            // Act
            container.instance().handleChangeToDate(toDate);

            // Assert
            expect(container.state().fromDate).toEqual(new Date('01/03/2022 10:05:20 AM'));
            expect(container.state().toDate).toEqual(new Date('01/03/2022 10:05:20 AM'));
            expect(container.instance().handleChangeSpecificDate).toHaveBeenCalled();
        });
    });

    describe('handleChange', () => {
        it('call setState', () => {
            // Arrange
            
            //Act
            const container = shallow(<Filter {...initProps}/>);
            container.find('FormControl[name="remarkContent"]').at(0).simulate("change", { target: { name: 'remarkContent' , value: '123' } });

            // Assert
            expect(container.find('FormControl[name="remarkContent"]')).toHaveLength(1);
            expect(container.state().remarkContent).toBe('123');
        });
    });

    describe('handleChangeDateType', () => {
        it.each([
          ['0', {target: {value: 0}}, 0],
          ['1', {target: {value: 1}}, 1],
          ['2', {target: {value: 2}}, 2],
          ['3', {target: {value: 3}}, 3],
          ['4', {target: {value: 4}}, 4],
          ['5', {target: {value: 5}}, 5],
          ['6', {target: {value: 6}}, 6],
          ['7', {target: {value: 7}}, 7]
        ])("when the target value is '%s'", (name, event, expected) => {
          // Arrange
            
            //Act
            const container = shallow(<Filter {...initProps}/>).instance();
            container.handleChangeDateType(event);
            // Assert
            expect(container.state.dateTypeSelect).toBe(expected);
        });
      });

    describe('handleChangeDropdown', () => {
        it('call setState', () => {
            // Arrange
            
            //Act
            const container = shallow(<Filter {...initProps}/>).instance();
            container.handleChangeDropdown('remarkTitleIds', '1,2');
            // Assert
            expect(container.state.remarkTitleIds).toBe('1,2');
        });
    });

    describe('handleChangeSpecificDate', () => {
        it('call setState', () => {
            // Arrange
            
            //Act
            const container = shallow(<Filter {...initProps}/>).instance();
            container.handleChangeSpecificDate();
            // Assert
            expect(container.state.dateTypeSelect).toBe(7);
        });
    });

    describe('handleChangeCheckbox', () => {
        it('call setState', () => {
            // Arrange
            const state ={
                isGuestFiler: false
            };
            //Act
            const container = shallow(<Filter {...initProps}/>).instance();
            container.setState(state);
            container.handleChangeCheckbox({target: {name: 'isGuestFiler'}});
            // Assert
            expect(container.state.isGuestFiler).toBe(true);
        });
    });

    describe('handleSubmit', () => {
        it('should call exactly functions', () => {
            // Arrange
            DateTimeService.toShortDateFormat = jest.fn(() => '01/04/2022 10:05:20 AM');

            const state = {
                remarkContent: 'remarkContent',
                userName: '',
                isGuestFiler: false, 
                isShowHeadline: 'false',
                relatedToPICs: '',
                fromDate: '01/04/2022 10:05:20 AM',
                toDate: '01/04/2022 10:05:20 AM',
                remarkTitleIds: '1,2',
                dateTypeSelect: 7
            };
            const expectedParams = {
                username: '',
                fromDate: '01/04/2022 10:05:20 AM',
                toDate: '01/04/2022 10:05:20 AM',
                remark: 'remarkContent',
                remarkTitle: '1,2',
                isGuest: false, 
                relatedPICs: '',
                showHeadline: 'false',
                pageIndex: 1,
                pageSize: 100
            };
            //Act
            const container = shallow(<Filter {...initProps}/>).instance();
            container.setState(state);
            container.handleSubmit();
            // Assert
            expect(initProps.setGridParams).toHaveBeenCalledWith(expectedParams);
            expect(initProps.setShowHistory).toHaveBeenCalledWith({show: false});
            expect(initProps.getNewRemarks).toHaveBeenCalledWith(expectedParams);
        });

        it('should call toast error when title is empty', () => {
            // Arrange
            DateTimeService.toShortDateFormat = jest.fn(() => '01/04/2022 10:05:20 AM');

            const state = {
                remarkTitleIds: ''
            };
            
            toast.error = jest.fn();

            //Act
            const container = shallow(<Filter {...initProps}/>).instance();
            container.setState(state);
            container.handleSubmit();
            // Assert
            expect(toast.error).toHaveBeenCalledWith(LangHelper.getResource('PleaseChooseRemarkTitle'));
        });

        it('should call toast error when fromDate is greater than toDate', () => {
            // Arrange
            DateTimeService.toShortDateFormat = jest.fn(() => '01/04/2022 10:05:20 AM');

            const state = {
                fromDate: '02/04/2022 10:05:20 AM',
                toDate: '01/04/2022 10:05:20 AM'
            };
            
            toast.error = jest.fn();

            //Act
            const container = shallow(<Filter {...initProps}/>).instance();
            container.setState(state);
            container.handleSubmit();
            // Assert
            expect(toast.error).toHaveBeenCalledWith(LangHelper.getResource('InvalidDateRange'));
        });
    });

    describe('handleOpenAdd ', () => {
        it('call exact function', () => {
            // Arrange
            
            //Act
            const container = shallow(<Filter {...initProps}/>).instance();
            container.handleOpenAdd();
            // Assert
            expect(initProps.setOpenCreatePopup).toHaveBeenCalledWith({ show: true});
        });
    });

    describe('render ', () => {
        it('onChange remarkTitleIds call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeDropdown = jest.fn();
            //Act
            container.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');
            // Assert
            expect(container.instance().handleChangeDropdown).toHaveBeenCalledWith('remarkTitleIds', 'selectedItemsKey');
        });

        it('onChange fromDate call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeFromDate = jest.fn();
            //Act
            container.find(DatePicker).at(0).simulate('change');
            // Assert
            expect(container.instance().handleChangeFromDate).toHaveBeenCalled();
        });

        it('onChange toDate call exact function', () => {
            // Arrange
            const container = shallow(<Filter {...initProps}/>);
            container.instance().handleChangeToDate = jest.fn();
            //Act
            container.find(DatePicker).at(1).simulate('change');
            // Assert
            expect(container.instance().handleChangeToDate).toHaveBeenCalled();
        });
    });
});