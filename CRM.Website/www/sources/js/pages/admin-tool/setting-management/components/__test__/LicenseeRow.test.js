import React from 'react';
import LicenseeRow  from '../LicenseeRow';
import { Cell, Row } from '@jsroot/components/react-grid/index';
import Select from '@jsroot/components/CustomReactSelect';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('DataGrid', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        handleCancel: jest.fn(),
        handleSave: jest.fn(),
        isEdit: true,
        isChangeableValue: true,
        debounceHandleLicenseeManagerChange: jest.fn(),
        handleEdit: jest.fn(),
        licenseesManagerOption:[{
            value: 'test',
            label: 'test'
        }],
        handleDelete: jest.fn(),
        licenseesOption:[{
            value: 'test',
            label: 'test'
        }],
        sourceMappingDefault:[{
            value: 'test',
            label: 'test'
        }],
        index: 1,
        item:{
            licenseeManager: null,
            setting: "0sServices",
            settingId: 6727,
            settingSource: ""
        }
    };

    describe('componentDidUpdate', () => {
        it('should call setState when prevProps settingSource is changed', () => {
            // Arrange
            const prevProps = { item:{settingSource: 'test'} };
            //Act
            const row = shallow(<LicenseeRow {...initProps} />).instance();
            row.componentDidUpdate(prevProps);
            // Assert
            expect(row.state.settingSource).toEqual('');
            expect(row.state.licenseeManager).toEqual(null);
        });

        it('should call setState when prevProps licenseeManager is changed', () => {
            // Arrange
            const prevProps = { item:{licenseeManager: 'test', settingSource:''} };
            //Act
            const row = shallow(<LicenseeRow {...initProps} />).instance();
            row.componentDidUpdate(prevProps);
            // Assert
            expect(row.state.settingSource).toEqual('');
            expect(row.state.licenseeManager).toEqual(null);
        });
    });
});