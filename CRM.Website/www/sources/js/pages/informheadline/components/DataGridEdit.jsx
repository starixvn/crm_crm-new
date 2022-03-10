import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Form } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGridEdit extends PureComponent {

    buildHeader = () => {
        return(
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('DirectAccount')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('UpdatedTime')}</HeaderCell>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Remark')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Extension')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('ProductStatus')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { informSettings, informData, gridParams, editedInforms } = this.props;
        const { pageIndex, pageSize } = gridParams;
        const skip = pageSize * (pageIndex - 1);
        const result = informData && informData.map(element => editedInforms.find(item => item.headlineId === element.headlineId) || element);
        const data = result.slice(skip, pageSize * pageIndex);

        const productStatuses = [...informSettings.productStatuses];
        productStatuses.unshift({statusId: 0, name: 'N/A'});

        if (data.length > 0) {
            return data.map((item, index) => this.renderRow(item, index, productStatuses, informSettings));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={7}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderOptions = (name, id, key) => <option key={key} value={id}>{name}</option>;

    renderRow = (item, index, productStatuses, informSettings) => {
        const isClosed = this.props.status === 'Closed' ? true : false;
        return (
            <Row key={index} className={item.groupId > 0 ? 'free-grid-headline' : 'free-grid-direct'}>
                <Cell>{item.username}</Cell>
                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none"
                        name="informHeadlineStatusId"
                        defaultValue={item.informHeadlineStatusId}
                        key={item.informHeadlineStatusId}
                        disabled={isClosed || !window.hasHostPermission}
                        onChange={event => this.handleChangeDataGrid(event,item.headlineId)}
                    >
                        {
                            informSettings.statuses.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key))
                        }
                    </Form.Control>
                </Cell>
                <Cell>{item.clientUpdatedTime}</Cell>
                <Cell className='text-center'>
                    <Form.Control as="textarea" size="sm" className="shadow-none"
                        name="remark"
                        defaultValue={item.remark}
                        key={item.remark}
                        rows={2}
                        disabled={!isClosed && window.hasHostPermission === true ? false : true}
                        onBlur={event => this.handleChangeDataGrid(event,item.headlineId)}
                    />
                </Cell>
                <Cell>{item.handler}</Cell>

                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none"
                        name="extension"
                        defaultValue={item.extension}
                        key={item.extension}
                        disabled={isClosed || !window.hasHostPermission}
                        onChange={event => this.handleChangeDataGrid(event,item.headlineId)}
                    >
                        {
                            informSettings.stations.map((value, key) => this.renderOptions(value.name, value.stationId, key))
                        }
                    </Form.Control>
                </Cell>

                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none"
                        name="productStatus"
                        disabled={isClosed || !window.hasHostPermission}
                        defaultValue={item.productStatus}
                        key={item.productStatus}
                        onChange={event => this.handleChangeDataGrid(event,item.headlineId)}
                    >
                        {
                            productStatuses.map((value, key) => this.renderOptions(value.name, value.statusId, key))
                        }
                    </Form.Control>
                </Cell>
            </Row>
        );
    };

    handleChangeDataGrid = (event, headlineId) => {
        const name = event.target.name;
        const value = event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value;

        const item = {...this.props.informData.find(element => element.headlineId === headlineId), [name]: value};

        const newEdited = this.props.editedInforms;
        const element  = newEdited.find(value => value.headlineId === item.headlineId);

        if (element) {
            const replaceElement = {...element, [name]: value};
            const replaceGridData = newEdited.map(item => {
                if (item.headlineId === replaceElement.headlineId){
                    return replaceElement;
                }
                return item;
            });
            this.props.setEditedInforms(replaceGridData);
        } else {
            this.props.setEditedInforms([...newEdited, item]);
        }
    };

    onPaging = (pageIndex, pageSize) => {
        this.props.setGridParams({pageIndex: pageIndex, pageSize: pageSize});
    };

    render() {
        const { gridParams, totalItem } = this.props;
        const { pageIndex, pageSize } = gridParams;

        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItem,
            PageList: PAGING_SIZES
        };

        return (
            <Table
                width={1170}
                autoWidth={false}
                autoHeight={false}
                bodyHeight={450}
                header={this.buildHeader()}
                body={this.buildBody()}
                isPaging
                pageOption={pagingOption}
                onPaging={this.onPaging}
                containerPadding={0}
                adjustedHeight={10}
                shouldResetScrollPosition={false}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editedInforms } = state;
    return { gridParams, editedInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGridEdit);