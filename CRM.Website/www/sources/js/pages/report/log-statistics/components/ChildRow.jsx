import React, { PureComponent } from 'react';
import { Cell } from '@jsroot/components/react-grid/index';
export class ChildRow extends PureComponent {
    renderChildRows = () =>{
        const {isParent, currentRow, communicationColumns} = this.props;
        const cells = [];
        const listOfCommunicationSum = [];
        let grandTotal = 0;
        const communicationColumnCount = communicationColumns.length;
        const listOfCommunicationCount = currentRow.listOfCommunicationCount;

        for (let i = 0; i < communicationColumnCount; i++) {
            listOfCommunicationSum[i] = 0;
            for (var j = i; j < listOfCommunicationCount.length; j = j + communicationColumnCount) {
                listOfCommunicationSum[i] += listOfCommunicationCount[j];
            }
            grandTotal += listOfCommunicationSum[i];
            cells.push(<Cell className={`text-center ${isParent ? 'parent-level-0' : 'child'}`}>{listOfCommunicationSum[i]}</Cell>);
        }
        cells.push(<Cell className="text-center total-background">{grandTotal}</Cell>);
        return cells;
    }

    render() {
        return this.renderChildRows();
    }
}

export default ChildRow;
