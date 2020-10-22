import { KEY_NAME, VALUE_NAME, STATUS_NAME } from '../constants';
import { convertDataSourceToState } from '../functions';

describe('functions', () => {
    it('convertDataSourceToState should run correctly', () => {
        // Arrange
        const keyField = 'key';
        const valueField = 'value';
        const statusField = 'status';
        const subData = ['value'];
        const item1 = {
            key: 'key1',
            value: 'value1',
            status: 'status1',
            subData
        };
        
        const item2 = {
            key: 'key2',
            value: 'value2',
            status: 'status2'
        };

        const dataSource = [item1, item2];
        const expected = [
            {
                [KEY_NAME]: item1[keyField],
                [VALUE_NAME]: item1[valueField],
                [STATUS_NAME]: item1[statusField],
                subData: subData,
                visible: true
            },
            {
                [KEY_NAME]: item2[keyField],
                [VALUE_NAME]: item2[valueField],
                [STATUS_NAME]: item2[statusField],
                subData: [],
                visible: true
            }
        ];

        // Action
        const result = convertDataSourceToState({ keyField, valueField, statusField, dataSource });

        // Assert
        expect(result).toEqual(expected);
    });
});