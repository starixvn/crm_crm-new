import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={45}>{LangHelper.getResource('Setting')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('SettingId')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('Order')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('Edit')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('Active')}</HeaderCell>
            </HeaderRow>
        );
    };

    renderRow = (item, index) => {
        return (
            <Row key={`setting-management-${index}`}>
                <Cell>{item.settingValue}</Cell>
                <Cell className='text-right'>{item.settingId}</Cell>
                <Cell className='text-right'>{item.displayOrder}</Cell>
                <Cell className='text-center'>
                    <i className="rounded-circle fa fa-pencil icon-edit" aria-hidden="true"
                        onClick={event => this.handleOpenEdit(event, item)}
                    />
                </Cell>
                <Cell className='text-center'>
                    <input type="checkbox" checked={item.isActive} disabled={!this.props.isHost}
                        onChange={() => this.handleEditStatus(item.settingId, item.settingValue, !item.isActive)}
                    />
                </Cell>
            </Row>
        );
    };

    buildBody = () => {
        const { settingType } = this.props;
        if ( settingType.length > 0) {
            return settingType.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row className="no-data">
                <Cell className='text-center' colSpan={4}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleEditStatus = (settingId, settingValue, isActive)=>{
        this.props.setEditStatusPopup({show: true, settingId, settingValue, isActive});
    };

    handleOpenEdit = (event, item) => {
        event.preventDefault();
        this.props.setOpenEdiPopup({ show: true, data: item});
    };

    render() {
        const { settingType, gridParams } = this.props;
        if(!settingType || settingType === null){
            return null;
        }

        return (
            <Fragment>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{`${LangHelper.getResource('SettingManagementTitle')} ${gridParams.settingName}`}</span>
                </div>
                <Table
                    width={700}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    onSort={this.onSort}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settingType, gridParams, mainSettings } = state;
    return { settingType, gridParams, mainSettings };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
