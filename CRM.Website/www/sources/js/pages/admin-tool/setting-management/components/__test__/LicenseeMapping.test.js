import React from 'react';
import { LicenseeMapping } from '../LicenseeMapping';
import { shallow } from 'enzyme';
import { Form } from 'react-bootstrap';
import {  HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';

describe('LicenseeMapping', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        licensees : [{ 
            0: "108bet",
            1: "108betTest",
            2: "109betTest",
            3: "11bet",
            4: "12B",
            5: "12Bet",
            6: "12BetHelen",
            7: "12BetWinA"
        }],
        licenseesMapping:[{
            licenseeManager: null,
            setting: "0sServices",
            settingId: 6727,
            settingSource: ""
        }],
        licenseesManager: [{
            custId: -5969,
            username: "111test"
        }],
        confirmCancelPopup: {
            show: true
        },
        getLicensees: jest.fn(),
        setConfirmCancelPopup: jest.fn(),
        oncloseConfirm: jest.fn(),
        getLicenseeManager: jest.fn(),
        setLicenseeManager: jest.fn(),
        getLicenseesMapping: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {...initProps, licensees: null};
            const container = shallow(<LicenseeMapping {...props} />).instance();
            //Act
            container.componentDidMount();
            // Assert
            expect(props.getLicensees).toHaveBeenCalled();
        });
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange

            // Act
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();
            const header = shallow(container.buildHeader(true));

            // Assert
            expect(header.find(HeaderCell).length).toBe(4);
        });
    });

    describe('buildBody', () => {
        it('should render no data when gridData is empty', () => {
            // Arrange
            const props = {
                licenseesMapping: []
            };
            const expectedBody = [
            <Row className="no-data" >
                <Cell className='text-center' colSpan={5}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>];
            const container = shallow(<LicenseeMapping {...props} />).instance();
            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when gridData has data', () => {
            // Arrange
            const container = shallow(<LicenseeMapping {...initProps} />).instance();
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody(true);

            // Assert
            expect(actual).toEqual([<div />]);
        });
    });

    describe('handleEdit', () => {
        it('should call setState', () => {
            // arrange
            const prevState = {
                isEdit: false
            };
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();
            container.setState(prevState);
            // Act
            container.handleEdit(1);

            // Assert
            expect(container.state.isEdit).tobeTrue;
        });
    });

    describe('handleSave', () => {
        it('should call exact function', async () => {
            // arrange
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();
            container.handelValidateUpdate = jest.fn();
            // Act
            container.handleSave(1, '', '');

            // Assert
            expect(container.handelValidateUpdate).toHaveBeenCalled();
        });

        it('should call exact function if edit is successful', async () => {
            // arrange
            const response = {isSuccessful: true};
            const promise = Promise.resolve(response);
            
            const props = {
                ...initProps, editLicenseeMapping: jest.fn(() => promise)
            };
            const container = shallow(<LicenseeMapping  {...props}/>).instance();
            container.handleSuccess = jest.fn();
            // Act
            container.handleSave(1, 'settingSource', 'licenseeManager');
            jest.runAllTimers();
            await promise;

            // Assert
            expect(container.state.editLicenseeMappingResult).toEqual(response);
            expect(container.handleSuccess).toHaveBeenCalled();
        });
    });
    
    describe('validateFormik', () => {
        it('should return exact errors', () => {
            // Arrange
            const expectErrors = {
                sourceMapping: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingSource')),
                licenseeManager: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('LicenseeManager'))
            };
            const params = {
                sourceMapping : '',
                licenseeManager: ''
            };
            const container = shallow(<LicenseeMapping {...initProps} />).instance();

            //Act
            container.handelValidateUpdate(params);
            // Assert
            expect(container.state.errors).toEqual(expectErrors);
        });
    });

    describe('handleDelete', () => {
        it('should call exact function', () => {
            // Arrange
            const container = shallow(<LicenseeMapping {...initProps} />).instance();

            //Act
            container.handleDelete([], 1);
            // Assert
            expect(initProps.setConfirmCancelPopup).toHaveBeenCalled();
        });
    });

    describe('handleCancel', () => {
        it('should call exact function', () => {
            // Arrange
            const prevState = {
                isEdit: false
            };
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();
            container.setState(prevState);
            //Act
            container.handleCancel();
            // Assert
            expect(container.state.settingId).toEqual('');
            expect(container.state.isEdit).tobeTrue;
            expect(container.state.errors).toEqual({});
            expect(container.state.touched).toEqual({});
        });
    });

    describe('handleCancelSetting', () => {
        it('should call exact function if edit is successful', async () => {
            // arrange
            const response = {isSuccessful: true};
            const promise = Promise.resolve(response);
            
            const props = {
                ...initProps, editLicenseeMapping: jest.fn(() => promise)
            };
            const container = shallow(<LicenseeMapping  {...props}/>).instance();
            container.handleSuccess = jest.fn();
            // Act
            container.handleCancelSetting(1, 'settingSource', 'licenseeManager');
            jest.runAllTimers();
            await promise;

            // Assert
            expect(container.state.cancelLicenseeMappingResult).toEqual(response);
            expect(props.oncloseConfirm).toHaveBeenCalled();
            expect(container.handleSuccess).toHaveBeenCalled();
        });
    });

    describe('handleSuccess', () => {
        it('should call exact function', () => {
            // Arrange
            
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();
            container.handleSearch = jest.fn();
            //Act
            container.handleSuccess();
            // Assert
            expect(container.state.settingId).toEqual('');
            expect(container.state.isEdit).toBeFalse;
            expect(container.handleSearch).toHaveBeenCalled();
        });
    });

    describe('debounceHandleLicenseeManagerChange', () => {

        it('searchText is valid', () => {
            // Arrange
            const searchText = 'text with length > 2';
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();

            // Action
            container.debounceHandleLicenseeManagerChange(searchText);
            jest.runAllTimers();

            // Assert
            expect(initProps.getLicenseeManager).toHaveBeenCalledWith({username: searchText});
        });

        it('searchText is invalid', () => {
            // Arrange
            const searchText = 't';
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();

            // Action
            container.debounceHandleLicenseeManagerChange(searchText);
            jest.runAllTimers();

            // Assert
            expect(initProps.setLicenseeManager).toHaveBeenCalledWith([]);
        });
    });

    describe('handleSearch', () => {
        it('should call exact function', () => {
            // Arrange
            
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();
            //Act
            container.handleSearch();
            // Assert
            expect(initProps.getLicenseesMapping).toHaveBeenCalled();
        });
    });

    describe('renderForm ', () => {
        it('should call setState when change', () => {
            // Arrange
            
            const container = shallow(<LicenseeMapping  {...initProps}/>).instance();
            //Act
            const row = shallow(container.renderForm());
            row.find(Form.Control).at(0).simulate('change', {target:{value: 'test'}});
            // Assert
            expect(container.state.setting).toEqual('test');
        });
    });
});