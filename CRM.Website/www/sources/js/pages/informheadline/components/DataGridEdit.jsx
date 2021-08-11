import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGridEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            informs: []
        };
    };

    handleChange = (event, item) => {
        const name = event.target.name;

        var result = {
            headlineId: item,
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value) : event.target.value
        };
        this.setState(prevState => {
            let newInforms = prevState.informs;
            let element  = newInforms.find(value => value.headlineId === result.headlineId);

            if(element){
                Object.assign(element, result);
                return({informs: newInforms});
            }
            else{
                return({informs: [...newInforms, result]});
            }
        });
    };

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
        const { contactInformSettings } = this.props;
        const productStatuses = [...contactInformSettings.productStatuses];
        productStatuses.unshift({statusId: 0, name: 'N/A'});

        if (this.props.contactInforms.length > 0) {
            return this.props.contactInforms.map((item, index) => this.renderRow(item, index, productStatuses));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={7}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderOptions = (name, id, key) => <option key={key} value={id}>{name}</option>;

    renderRow = (item, index, productStatuses) => {
        const { contactInformSettings } = this.props;

        return (
            <Row key={index} className="free-grid">
                <Cell>{item.username}</Cell>
                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none select-body"
                        name="informHeadlineStatusId"
                        defaultValue={item.informHeadlineStatusId}
                        key={item.informHeadlineStatusId}
                        onChange={(event) => this.handleChange(event,item.headlineId)}
                    >
                        {
                            contactInformSettings.statuses.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key))
                        }
                    </Form.Control>
                </Cell>
                <Cell>{item.clientUpdatedTime}</Cell>
                <Cell className='text-center'>
                    <Form.Control  as="textarea" size="sm" className="shadow-none"
                        name="remark"
                        defaultValue={item.remark}
                        onChange={(event) => this.handleChange(event,item.headlineId)}
                    />
                </Cell>
                <Cell>{item.handler}</Cell>

                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none select-body"
                        name="extension"
                        defaultValue={item.extension}
                        key={item.extension}
                        onChange={(event) => this.handleChange(event,item.headlineId)}
                    >
                        {
                            contactInformSettings.stations.map((value, key) => this.renderOptions(value.name, value.stationId, key))
                        }
                    </Form.Control>
                </Cell>

                <Cell className='text-center'>
                    <Form.Control as="select" size="sm" className="shadow-none select-body"
                        name="productStatus"
                        defaultValue={item.productStatus}
                        key={item.productStatus}
                        onChange={(event) => this.handleChange(event,item.headlineId)}
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
        const { gridParams, onPaging, onSubmit } = this.props;
        const { pageIndex, pageSize } = gridParams;

        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: 300,
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
                <Button variant="primary" size="sm" style={{width: '65px'}} onClick={() => onSubmit(this.state.informs)}>
                    {LangHelper.getResource('Save')}
                </Button>
            </>
        )
    };
}

export default DataGridEdit;