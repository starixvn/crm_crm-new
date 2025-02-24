import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleRow: [],
            shouldResetScrollPosition: false
        };
    }

    componentDidUpdate(prevProps) {
        if(prevProps.gridParams.settingName !== this.props.gridParams.settingName){
            this.setState({shouldResetScrollPosition: true, toggleRow:[]});
        }
    }

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={45}>{LangHelper.getResource('Setting')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={10}>{LangHelper.getResource('Relation')}</HeaderCell>
                }
                <HeaderCell colWidth={12}>{LangHelper.getResource('SettingId')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = isHost => {
        const { settingType } = this.props;
        if (settingType.length > 0) {
            return settingType.map(item => this.renderRow(item, isHost));
        }
        return [
            <Row className="no-data" >
                <Cell className='text-center' colSpan={4}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, isHost) => {
        const rows = [];
        rows.push(
            <Row key={`parent-${item.settingId}`} className='parent-level-0'>
                <Cell className='complaints-text' onClick={event => this.handleToggleRow(event, item.settingId)}>
                    {
                        item.childSettings.length > 0 &&
                        <span className={`expand-icon fa pr-2 ${!this.state.toggleRow.includes(item.settingId) ? 'fa-caret-down' : 'fa-caret-right'}`} />
                    }
                    <span >{item.settingValue}</span>
                </Cell>
                {
                    isHost &&
                    <Cell className='text-center'>
                        <i className="fa fa-plus-circle icon-excel" aria-hidden="true"
                            onClick={event => this.handleOpenUpdate(event, item.settingId, item.settingValue)}
                        />
                    </Cell>
                }
                <Cell className='text-right'>{item.settingId}</Cell>
            </Row>
        );
        if (item.childSettings.length > 0) {
            rows.push(
                item.childSettings.map(sub => this.renderSubSetting(item.settingId, sub))
            );
        }
        return rows;
    };

    renderSubSetting = (parentId, sub) => {
        const { toggleRow } = this.state;

        const rows = [];

        if (!toggleRow.includes(parentId)) {
            rows.push(
                <Row key={`child-${sub.settingId}`} className='child-setting'>
                    <Cell className='pl-4'>{sub.settingValue}</Cell>
                    <Cell />
                    <Cell className='text-right'>{sub.settingId}</Cell>
                </Row>
            );
            return rows;
        } else {
            return null;
        }
    };

    handleToggleRow = (event, settingId) => {
        event.stopPropagation();
        const { toggleRow } = this.state;
        const index = toggleRow.indexOf(settingId);
        if (index >= 0) {
            toggleRow.splice(index, 1);
        } else {
            toggleRow.push(settingId);
        }

        this.setState({ toggleRow, shouldResetScrollPosition: false });
    };

    handleOpenUpdate = (event, value, name) => {
        event.preventDefault();
        const title = `${LangHelper.getResource('AddSubSettingTitle')}`;
        const params = {
            settingName: this.props.mainSettings.slice(1)[0].settingName,
            parentId: parseInt(value, 10),
            parentName: name
        };
        this.props.setOpenUpdatePopup({ show: true, title: title, parentId: params.parentId, parentName: params.parentName });
        this.props.getMainSettingRelation(params);
    };

    render() {
        const { settingType, gridParams, isHost } = this.props;

        if (!settingType || settingType === null) {
            return null;
        }

        return (
            <Fragment>
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{`${LangHelper.getResource('SettingRelationTitle')} ${gridParams.settingName}`}</span>
                </div>
                <Table
                    width={700}
                    autoWidth={false}
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
                    onSort={this.onSort}
                    containerPadding={0}
                    adjustedHeight={10}
                    shouldResetScrollPosition={this.state.shouldResetScrollPosition}
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
