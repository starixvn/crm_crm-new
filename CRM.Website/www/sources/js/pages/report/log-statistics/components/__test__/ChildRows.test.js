import React from 'react';
import { ChildRow } from '../ChildRow';
import { shallow } from 'enzyme';
import { Cell } from '@jsroot/components/react-grid/index';

describe('ChildRow', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const props = {
        isParent: true,
        currentRow: {
            listOfCommunicationCount: [0, 0, 0, 0],
            listOfCommunicationSumByProduct: [0, 0, 0, 0]
        },
        communicationColumns: [{ id: 1000, name: "Phone" }, { id: 1000, name: "Phone" }, { id: 1000, name: "Phone" }, { id: 1000, name: "Phone" }]
    }

    it('should call renderChildRows', () => {
        // arrange            
        const container = shallow(<ChildRow  {...props} />).instance();
        // Act
        const data = container.render();
        // Assert
        expect(data.length).toBe(5);
    });
});