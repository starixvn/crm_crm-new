import React, { Component, Fragment } from 'react';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import functions from '../common.functions';

export class RemovePicAssignment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picIds: [],
            picNames: [],
            checkedAllList: [],
            matrix: [],
            isShowConfirmRemovePopup: false,
            dataList: []
        };
    }

    componentDidMount = () => {
        const dataList = this.props.removeOptions.dataList.filter(item => item.isRemoved);
        const picNames = [];
        const picIds = [];
        for (let index = 0; index < dataList.length; index++) {
            const rowItem = dataList[index];
            if (rowItem.picList && rowItem.picList.length > 0) {
                this.pushPics(rowItem, picNames, picIds);
            }
        }

        const checkedAllList = picNames.map(() => true);
        const matrix = dataList.map((row, rowNumber) => {
            const picIdsRow = dataList[rowNumber].picList.map(item => item.picId);
            return checkedAllList.map((item, colNumber) => {
                if (picIdsRow.includes(picIds[colNumber])) {
                    return true;
                }

                return null;
            });
        });

        this.setState({
            picIds,
            picNames,
            checkedAllList: [...checkedAllList],
            matrix,
            dataList
        });
    }

    pushPics = (item, picNames, picIds) => {
        for (let picIndex = 0; picIndex < item.picList.length; picIndex++) {
            const name = item.picList[picIndex].picName;
            if (!picNames.includes(name)) {
                picNames.push(name);
                picIds.push(item.picList[picIndex].picId);
            }
        }
    }

    buildHeader = () => {
        let cells = [
            {
                key: 'TextNo',
                rowSpan: 2,
                colWidth: 50,
                value: LangHelper.getResource('TextNo')
            },
            {
                key: 'GroupHeadline',
                rowSpan: 2,
                colWidth: 120,
                value: LangHelper.getResource('GroupHeadline')
            },
            {
                key: 'DirectAccount',
                rowSpan: 2,
                colWidth: 120,
                value: LangHelper.getResource('DirectAccount')
            }
        ];

        const picCells = this.state.picNames.map(item => {
            return {
                key: item,
                rowSpan: 1,
                colWidth: 80,
                value: item
            };
        });

        if (this.state.picNames.length > 0) {
            cells = [...cells, ...picCells];
        }

        return [
            <HeaderRow key={0}>
                {
                    cells.map(item =>
                        <HeaderCell key={item.key} rowSpan={item.rowSpan} colWidth={item.colWidth}>{item.value}</HeaderCell>)
                }
            </HeaderRow>,
            <HeaderRow key={1}>
                {
                    picCells.map((item, index) =>
                        <HeaderCell key={item.key} rowSpan={item.rowSpan} colWidth={item.colWidth}>
                            <input
                                type='checkbox'
                                checked={this.state.checkedAllList[index]}
                                onChange={() => this.handleChangeCheckAll(index)}
                            />
                        </HeaderCell>)
                }
            </HeaderRow>
        ];
    }

    buildBody = () => {
        const picColNumer = this.state.picNames.length;
        const defaultColNumber = 3;
        const dataList = this.props.removeOptions.dataList.filter(item => item.isRemoved);
        if (dataList.length > 0) {
            const body = [];
            let mergeHeadline = 0;
            for (let index = 0; index < dataList.length; index++) {
                const rowData = dataList[index];
                let row;
                if (mergeHeadline === 0) {
                    mergeHeadline = dataList.filter(item => item.headlineID === rowData.headlineID).length;
                    row = this.renderRow(index, rowData, mergeHeadline);
                }
                else {
                    row = this.renderRow(index, rowData);
                }

                body.push(row);
                mergeHeadline--;
            }
            return body;
        }

        return [<Row key={`body${1}`} className='no-data'><Cell colSpan={defaultColNumber + picColNumer}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    }

    renderRow = (index, row, mergeHeadline) => {
        let cells = [
            { value: index + 1 },
            { value: row.custName }
        ];

        if (mergeHeadline) {
            cells.splice(1, 0, { value: row.headlineName });
        }

        const picNames = row.picList.map(item => item.picName);
        const picCells = this.state.picNames.map((item, picIndex) => {
            if (picNames.includes(item)) {
                return {
                    value: {
                        rowNumber: index,
                        colNumber: picIndex
                    }
                };
            }

            return { value: '' };
        });

        cells = [...cells, ...picCells];
        return <Row key={index}>
            {
                cells.map((cell, cellIndex) => this.renderCell(cell, cellIndex, mergeHeadline))
            }
        </Row>;
    }

    renderCell = (cell, index, mergeHeadline) => {
        if (mergeHeadline && index === 1) {
            return <OverlayTrigger key={index} placement='top' overlay={
                <Tooltip>{`${LangHelper.getResource('GroupHeadline')}: ${cell.value}`}</Tooltip>
            }>
                <Cell rowSpan={mergeHeadline}>{cell.value}</Cell>
            </OverlayTrigger>;
        }

        if (typeof cell.value === 'object') {
            const { rowNumber, colNumber } = cell.value;
            return <Cell key={index} className='text-center'>
                <input type='checkbox' className='cursor-pointer'
                    checked={this.state.matrix[rowNumber][colNumber]}
                    onChange={() => this.handleChange(rowNumber, colNumber)}
                />
            </Cell>;
        }

        let className = '';
        if (index === 0) {
            className += 'text-center';
        }

        if (cell.value === '') {
            className += 'null-cell-color';
        }

        return <Cell key={index} className={className}>{cell.value}</Cell>;
    }

    handleChange = (rowNumber, colNumber) => {
        const matrix = [...this.state.matrix];
        matrix[rowNumber][colNumber] = !matrix[rowNumber][colNumber];
        const checkedAllList = [...this.state.checkedAllList];
        checkedAllList[colNumber] = this.isCheckedAll(colNumber);
        this.setState({
            matrix,
            checkedAllList
        });
    }

    handleChangeCheckAll = colNumber => {
        const isChecked = !this.state.checkedAllList[colNumber];
        const checkedAllList = [...this.state.checkedAllList];
        checkedAllList[colNumber] = isChecked;
        const matrix = [...this.state.matrix];
        for (let rowNumber = 0; rowNumber < this.state.matrix.length; rowNumber++) {
            if (matrix[rowNumber][colNumber] !== null) {
                matrix[rowNumber][colNumber] = isChecked;
            }
        }

        this.setState({
            checkedAllList,
            matrix
        });
    }

    isCheckedAll = colNumber => {
        for (let index = 0; index < this.state.matrix.length; index++) {
            if (!this.state.matrix[index][colNumber]) {
                return false;
            }
        }

        return true;
    }

    toggleConfirmRemovePopup = () => this.setState({ isShowConfirmRemovePopup: !this.state.isShowConfirmRemovePopup })

    handleSubmitRemoveAssignment = () => {
        this.toggleConfirmRemovePopup();
        this.props.onClose();
        const isCheckedPics = this.state.picNames.filter((item, index) => this.isChecked(index));
        const removeAssignments = [];
        for (let rowNumber = 0; rowNumber < this.state.matrix.length; rowNumber++) {
            const rowData = this.state.dataList[rowNumber];
            for (let colNumber = 0; colNumber < this.state.picIds.length; colNumber++) {
                if (this.state.matrix[rowNumber][colNumber]) {
                    removeAssignments.push({
                        headlineId: rowData.headlineID,
                        custId: rowData.custId,
                        picId: this.state.picIds[colNumber]
                    });
                }
            }
        }

        functions.removePicAssignment(removeAssignments, isCheckedPics.toString(), this.refreshGrid);
    }

    refreshGrid = () =>
        this.props.getGridData(this.props.gridParams, data => functions.handleNewRemoveOptions(data, this.props.setRemoveOptions))

    isChecked = colNumber => {
        for (let index = 0; index < this.state.matrix.length; index++) {
            if (this.state.matrix[index][colNumber]) {
                return true;
            }
        }

        return false;
    }

    isNotHadChecked = () => {
        for (let rowNumber = 0; rowNumber < this.state.matrix.length; rowNumber++) {
            for (let colNumber = 0; colNumber < this.state.picIds.length; colNumber++) {
                if (this.state.matrix[rowNumber][colNumber]) {
                    return false;
                }
            }
        }

        return true;
    }

    render() {
        const maxWidth = this.state.picNames.length * 80 + 500;
        const { onClose } = this.props;

        return (
            <Fragment>
                <Modal show backdrop='static' keyboard={false} size='lg' centered
                    onHide={() => onClose()} dialogAs={DraggableModalDialog}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as='div'>
                            {LangHelper.getResource('RemovePICAssignment')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='remove-pic-body'>
                        <Table
                            maxWidth={maxWidth}
                            bodyHeight={500}
                            autoWidth
                            autoHeight={false}
                            header={this.buildHeader()}
                            body={this.buildBody()}
                            containerPadding={0}
                            shouldResetScrollPosition={false}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.toggleConfirmRemovePopup()} variant='primary' size='sm'
                            disabled={this.isNotHadChecked()}
                        >{LangHelper.getResource('Remove')}</Button>
                        <Button onClick={() => onClose()} variant='primary' size='sm'>{LangHelper.getResource('Close')}</Button>
                    </Modal.Footer>
                </Modal>
                {
                    this.state.isShowConfirmRemovePopup &&
                    <ConfirmPopup
                        onSubmit={() => this.handleSubmitRemoveAssignment()}
                        onClose={() => this.toggleConfirmRemovePopup()}
                        title={LangHelper.getResource('Confirmation')}
                        content={LangHelper.getResource('ConfirmRemoveDirectAccounts')} />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        removeOptions,
        gridParams
    } = state;

    return {
        removeOptions,
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemovePicAssignment);