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
            checkedItems: new Map()
        };
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(this.props.configSettings) !== JSON.stringify(prevProps.configSettings)) {
            this.setState({
                checkedItems: new Map()
            });
        }
    }

    buildHeader = () => {
        const isCheckAll = this.isCheckAll();
        const isAnyCheckItem = Array.from(this.state.checkedItems.values()).filter(x => x === true).length > 0;
        const isDisableButtonEditMultiple = !isCheckAll && !isAnyCheckItem;
        const {isHost} = this.props;
        return (
            <HeaderRow>
                {
                    isHost &&
                    <HeaderCell colWidth={7}>
                        <div className='d-flex justify-content-center pb-2'>
                            <input className='d-block mx-auto' type='button' disabled={isDisableButtonEditMultiple || !this.props.gridParams.settingName}
                                value={LangHelper.getResource('MultipleEdit')}
                                onClick={() => this.handleMultipleEdit()}
                            />
                        </div>
                        {
                            <input className='d-block cursor-pointer mx-auto checkbox-edit' type='checkbox'
                                checked={isCheckAll}
                                onChange={this.handleChangeCheckBoxAll}
                            />
                        }
                </HeaderCell>
                }
                <HeaderCell colWidth={10}>{LangHelper.getResource('ServiceName')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('SettingName')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Value')}</HeaderCell>
                {
                     isHost && <HeaderCell colWidth={3}>{LangHelper.getResource('Edit')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { configSettings, isHost } = this.props;

        if ( configSettings.length > 0) {
            return configSettings.map(item => this.renderRow(item, isHost));
        }
        return [
            <Row key='body' className="no-data" >
                <Cell className='text-center' colSpan={isHost ? 5 : 3}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    handleChangeCheckbox = event => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        this.setState(prevState => ({
            checkedItems: prevState.checkedItems.set(parseInt(item, 10), isChecked)
        }));
    };

    handleChangeCheckBoxAll = event => {
        const isChecked = event.target.checked;
        const items = this.state.checkedItems;
        if (isChecked) {
            this.props.configSettings.forEach(element => {
                if (!items.get(element.id)) {
                    items.set(element.id, true);
                }
            });

            this.setState({ checkedItems: items });
        } else {
            const clearCheckedItems = new Map();
            this.setState({ checkedItems: clearCheckedItems });
        }
    };

    isCheckAll = () => {
        if (this.props.configSettings.length === 0) {
            return false;
        }
        return Array.from(this.state.checkedItems.values()).filter(x => x === true).length === this.props.configSettings.length;
    };

    handleMultipleEdit = () =>{
        const activeIds = new Map([...this.state.checkedItems].filter(([k, v])=>v===true));
        const ids = Array.from(activeIds.keys());
        const filterCheckSettings = this.props.configSettings.filter(x=> ids.indexOf(x.id) >= 0);
        const joinServiceNames = filterCheckSettings.map(x=> x.serviceName).join(', ');
        const joinIds = filterCheckSettings.map(x=> x.id).join(', ');
        const firstData = filterCheckSettings[0];
        const data = {...firstData,id: joinIds, serviceName: joinServiceNames};
        this.props.setEditPopup({show: true, data: data, isEditMultiple: true});
    }

    handleEdit = item =>{
        this.props.setEditPopup({show: true, data: item});
    }

    renderRow = (item, isHost) => {
        return (
            <Fragment>
                <Row key={item.id}>
                    {
                        isHost &&
                        <Cell className='text-center'>
                            <input type='checkbox' className='checkbox-edit'
                                name={item.id} key={item.id}
                                checked={this.state.checkedItems.get(item.id) || false}
                                onChange={this.handleChangeCheckbox}
                            />
                        </Cell>
                    }
                    <Cell className='text-left'>{item.serviceName}</Cell>
                    <Cell className='text-left'>{item.settingName}</Cell>
                    <Cell className='text-left'>{item.value}</Cell>
                    {
                        isHost &&
                        <Cell className="text-center">
                            <span className="rounded-circle fa fa-pencil icon-edit"
                                onClick={() => this.handleEdit(item)}
                            />
                        </Cell>
                    }
                </Row>
            </Fragment>
        );
    };

    render() {
        const { configSettings } = this.props;
        if(!configSettings){
            return null;
        }

        return (
            <Fragment>
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('JobSettingManagement')}</span>
                </div>
                <Table
                    width={1000}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging={false}
                    containerPadding={0}
                    adjustedHeight={-20}
                    shouldResetScrollPosition={false}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { configSettings, gridParams } = state;
    return { configSettings, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
