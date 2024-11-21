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

    buildHeader = isHost => {
        const checkShowSourceMapping = this.IsShowSourceMapping();
        return (
            <HeaderRow>
                <HeaderCell colWidth={45}>{LangHelper.getResource('Setting')}</HeaderCell>
                {
                    checkShowSourceMapping && <HeaderCell colWidth={45}>{LangHelper.getResource('SourceMapping')}</HeaderCell>
                }
                <HeaderCell colWidth={15}>{LangHelper.getResource('ExtraInfo')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('SettingId')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={13}>{LangHelper.getResource('Edit')}</HeaderCell>
                }
                {
                    isHost && <HeaderCell colWidth={13}>{LangHelper.getResource('Active')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    renderRow = (item, index, isHost) => {
        const checkShowSourceMapping = this.IsShowSourceMapping();
        const isDisableActive = item.isActive && (item.settingValue.toLowerCase() === 'telegram' || item.settingValue.toLowerCase() === 'letstalk');
        return (
            <Row key={`setting-management-${index}`}>
                <Cell>{item.settingValue}</Cell>
                {
                    checkShowSourceMapping && <Cell>{item.settingSource}</Cell>
                }
                <Cell className='text-left'>{item.extraInfo}</Cell>
                <Cell className='text-right'>{item.settingId}</Cell>
                {
                    isHost &&
                    <Cell className='text-center'>
                        <i className="rounded-circle fa fa-pencil icon-edit" aria-hidden="true"
                            onClick={event => this.handleOpenEdit(event, item)}
                        />
                    </Cell>
                }
                {
                    isHost &&
                    <Cell className='text-center'>
                        <input type="checkbox" checked={item.isActive} disabled={!this.props.isHost || isDisableActive}
                            onChange={() => this.handleEditStatus(item.settingId, item.settingValue, !item.isActive)}
                        />
                    </Cell>
                }
            </Row>
        );
    };

    buildBody = isHost => {
        const { settingType } = this.props;
        if ( settingType.length > 0) {
            return settingType.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [
            <Row className="no-data">
                <Cell className='text-center' colSpan={isHost ? 5 : 3}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleEditStatus = (settingId, settingValue, isActive)=>{
        this.props.setEditStatusPopup({show: true, settingId, settingValue, isActive});
    };

    handleOpenEdit = async (event, item) => {
        event.preventDefault();
        await this.props.getSourceMapping(this.props.gridParams);
        this.props.setOpenEdiPopup({ show: true, data: item});
    };

    IsShowSourceMapping(){
        const { settingType} = this.props;
        let count = false;
        settingType.map(item => {
            if(item.settingSource != null){
                count = true;
            }
        });
        return count;
    }

    render() {
        const { settingType, gridParams, isHost } = this.props;
        if(!settingType){
            return null;
        }

        return (
            <Fragment>
                <div className='justify-content-between align-items-center table-title-v2 d-flex' style={{width: 1000}}>
                    <span>{`${LangHelper.getResource('SettingManagementTitle')} ${gridParams.settingName}`}</span>
                </div>
                <Table
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
                    width={950}
                    autoWidth={false}
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
