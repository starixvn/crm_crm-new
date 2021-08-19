import React, { PureComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGridEdit extends PureComponent {

    buildHeader = () => {
        return(
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('DirectAccount')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('UpdatedTime')}</HeaderCell>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Remark')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Extension')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('ProductStatus')}</HeaderCell>
            </HeaderRow>
        )
    };

    buildBody = () => {
        const { InformSettings, onChange } = this.props;
        const productStatuses = [...InformSettings.productStatuses];
        productStatuses.unshift({statusId: 0, name: 'N/A'});

        if (this.props.Informs.length > 0) {
            return this.props.Informs.map((item, index) => this.renderRow(item, index, productStatuses, InformSettings, onChange));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={7}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderOptions = (name, id, key) => <option key={key} value={id}>{name}</option>;

    renderRow = (item, index, productStatuses, informSettings, onChange) => {
        return (
            <Row key={index} className={item.groupId > 0 ? "free-grid-headline" : "free-grid-direct"}>
                <Cell>{item.username}</Cell>
                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none select-body"
                        name="informHeadlineStatusId"
                        defaultValue={item.informHeadlineStatusId}
                        key={item.informHeadlineStatusId}  
                        onChange={(event) => onChange(event,item.headlineId)}
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
                        style={{'height':'38px'}}
                        onChange={(event) => onChange(event,item.headlineId)}
                    />
                </Cell>
                <Cell>{item.handler}</Cell>

                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none select-body"
                        name="extension"
                        defaultValue={item.extension}
                        key={item.extension}
                        onChange={(event) => onChange(event,item.headlineId)}
                    >
                        {
                            informSettings.stations.map((value, key) => this.renderOptions(value.name, value.stationId, key))
                        }
                    </Form.Control>
                </Cell>

                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none select-body"
                        name="productStatus"
                        defaultValue={item.productStatus}
                        key={item.productStatus}
                        onChange={(event) => onChange(event,item.headlineId)}
                    >
                        {
                            productStatuses.map((value, key) => this.renderOptions(value.name, value.statusId, key))
                        }
                    </Form.Control>
                </Cell>
            </Row>
        );
    };


    render() {
        const { gridParams, onPaging, handleSubmit, values, setFieldValue, totalItem } = this.props;
        const { pageIndex, pageSize } = gridParams;

        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItem,
            PageList: PAGING_SIZES
        };

        return (
            <>
                <Table
                    width={1170}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={onPaging}
                    containerPadding={0}
                    adjustedHeight={10}
                />
                {
                    values ?
                    (
                        <Button variant="primary" size="sm" style={{width: '65px','marginTop': '10px'}} 
                            type="submit"
                            onClick={() => {
                                setFieldValue('submit',true);
                                handleSubmit;
                            }}
                        >
                            {LangHelper.getResource('Save')}
                        </Button>
                    ) :
                    (
                        <Button variant="primary" size="sm" style={{width: '65px','marginTop': '10px'}} 
                            onClick={handleSubmit}
                        >
                            {LangHelper.getResource('Save')}
                        </Button>
                    )
                }  
            </>
        )
    };
};

export default DataGridEdit;