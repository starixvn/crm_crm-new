import React from 'react';
import { shallow } from 'enzyme';
import { Update } from '../Update';
import { HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

describe('Update', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const promise = Promise.resolve({});

    const initProps = {
        setGridParams: jest.fn(),
        getSettingTypes: jest.fn(),
        mainSettings: [{
            settingName: "111111111"
        }],
        mainSettingRelation: [{
            displayOrder: 0,
            parentID: 0,
            settingId: 68001,
            settingName: "111111111",
            settingSource: null,
            settingValue: "te",
            childSettings: [{id: 0, name: null, settingId: 1002, settingName: "Communication", settingValue: "Zalo"}]
        }],
        subSettingOptions: [{
            displayOrder: 0,
            parentID: 0,
            settingId: 68001,
            settingName: "111111111",
            settingSource: null,
            settingValue: "te",
            childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]
        }],
        onClose: jest.fn(),
        updatePopup: {parentId: 1},
        setUpdateResult: jest.fn(),
        updateRelation: jest.fn(() => promise),
        getMainSettingRelation: jest.fn(),
        updateResult: {isSuccessful: true}
    };

    describe('componentDidUpdate', () => {
        it('should call exactly function when did update',() => {
            // Arrange
            const prevProps =[{
                displayOrder: 0,
                parentID: 0,
                settingId: 68001,
                settingName: "111111111",
                settingSource: null,
                settingValue: "te"
            }];
            //Act
            const container = shallow(<Update {...initProps} />).instance();
            container.handleSetState = jest.fn();

            container.componentDidUpdate(prevProps);
            // Assert
            expect(container.handleSetState).toHaveBeenCalled();
        });
    });

    describe('handleSetState', () => {
        it('should call setState',() => {
            // Arrange
            const container = shallow(<Update {...initProps} />).instance();
            
            //Act
            container.handleSetState(initProps.mainSettingRelation);
            
            // Assert
            expect(container.state.settingRelation).toEqual(initProps.mainSettingRelation);
        });
    });

    describe('buildHeader', () => {
        it('should render expected header', () => {
            // arrange

            // Act
            const container = shallow(<Update  {...initProps}/>).instance();
            const header = shallow(container.buildHeader());

            // Assert
            expect(header.find(HeaderCell).length).toBe(3);
        });
    });

    describe('buildBody', () => {
        it('should render no data when state is empty', () => {
            // Arrange
            const state = {
                settingRelation: []
            };
            const expectedBody = [
            <Row className="no-data" >
                <Cell className='text-center' colSpan={3}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>];
            const container = shallow(<Update {...initProps} />).instance();
            container.setState(state);
            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual(expectedBody);
        });

        it('should render expected rows when state has data', () => {
            // Arrange
            const state = {
                settingRelation: initProps.mainSettingRelation
            };
            const container = shallow(<Update {...initProps} />).instance();
            container.setState(state);
            container.renderRow = jest.fn(() => <div />);

            // Act
            const actual = container.buildBody();

            // Assert
            expect(actual).toEqual([<div />]);
        });

        it('form control change call onChangeCheckBox', () => {
            // Arrange
            const item = initProps.mainSettingRelation[0];
            
            const container = shallow(<Update {...initProps} />);
            container.instance().onChangeCheckBox = jest.fn();

            const row = shallow(container.instance().renderRow(item, 1));
            // Act
            row.find(Form.Control).at(0).simulate('change', {target:{checked: true}});
            // Assert
            expect(container.instance().onChangeCheckBox).toHaveBeenCalled();
        });

        it('form control change call onChangeCheckBox', () => {
            // Arrange
            const item = initProps.mainSettingRelation[0];
            
            const container = shallow(<Update {...initProps} />);
            container.instance().onChangeDisplay = jest.fn();

            const row = shallow(container.instance().renderRow(item, 1));
            // Act
            row.find(Form.Control).at(1).simulate('change', {target:{value: '10'}});
            // Assert
            expect(container.instance().onChangeDisplay).toHaveBeenCalled();
        });
    });

    describe('onChangeSubSetting ', () => {
        it('should call setState',() => {
            // Arrange
            const container = shallow(<Update {...initProps} />).instance();
            container.handleSearch = jest.fn();
            //Act
            container.onChangeSubSetting({target:{value: 'test'}});
            
            // Assert
            expect(container.state.subSettingName).toEqual('test');
            expect(container.handleSearch).toHaveBeenCalled();
        });
    });

    describe('handleSubmit', () => {
        it('should call exact function',async () => {
            // Arrange
            const event = {preventDefault: jest.fn()};
            const state = {
                subSettingName: 'test',
                settingRelation: initProps.mainSettingRelation
            };
            const container = shallow(<Update {...initProps} />).instance();
            container.setState(state);
            //Act
            container.handleSubmit(event);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
            expect(initProps.updateRelation).toHaveBeenCalled();
            expect(initProps.onClose).toHaveBeenCalled();
            expect(initProps.getSettingTypes).toHaveBeenCalled();
            expect(initProps.setUpdateResult).toHaveBeenCalled();
        });
    });

    describe('handleSearch', () => {
        it('should call exact function',() => {
            // Arrange
            const state = {
                subSettingName: 'test'
            };
            const expectedParams ={
                settingName: 'test',
                parentId: 1
            };
            const container = shallow(<Update {...initProps} />).instance();
            container.setState(state);
            //Act
            container.handleSearch();

            // Assert
            expect(initProps.getMainSettingRelation).toHaveBeenCalledWith(expectedParams);
            expect(container.state.shouldResetScrollPosition).toEqual(true);
        });
    });

    describe('onChangeDisplay ', () => {
        it('should call setState',() => {
            // Arrange
            const state = {
                settingRelation: [{
                    id: 1,
                    value: 'test',
                    isChild: true,
                    displayOrder: 0
                }]
            };
            const expectedState = [{
                id: 1,
                value: 'test',
                isChild: true,
                displayOrder: 10
            }];

            const container = shallow(<Update {...initProps} />).instance();
            container.setState(state);
            //Act
            container.onChangeDisplay('test', 10);

            // Assert
            expect(container.state.shouldResetScrollPosition).toEqual(false);
            expect(container.state.expectedState).toEqual(expectedState);
        });
    });
});