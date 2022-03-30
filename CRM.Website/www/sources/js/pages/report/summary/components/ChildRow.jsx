import React, { PureComponent } from 'react';
import { Cell } from '@jsroot/components/react-grid/index';
export class ChildRow extends PureComponent {
    renderChildRows = () =>{
        const {isParent, currentRow, monthColumns} = this.props;
        const cells = [];
        const listOfMonthSum = [];
        let grandTotal = 0;
        const monthColumnCount = monthColumns.length;
        const listOfMonthCount = currentRow.categorySummaries;

        for (let i = 0; i < monthColumnCount; i++) {
            listOfMonthSum[i] = 0;
            for (let j = i; j < listOfMonthCount.length; j = j + monthColumnCount) {
                listOfMonthSum[i] += listOfMonthCount[j];
            }
            grandTotal += listOfMonthSum[i];
            cells.push(<Cell className={`text-center ${isParent ? 'parent-level-0' : 'child'}`}>{listOfMonthSum[i]}</Cell>);
        }
        cells.push(<Cell className="text-center total-background">{grandTotal}</Cell>);
        return cells;
    };

    render() {
        return this.renderChildRows();
    }
}

export default ChildRow;
