import React, { PureComponent } from 'react';
import { Cell, Row } from '@jsroot/components/react-grid/index';
import Select from '@jsroot/components/CustomReactSelect';
import LangHelper from '@jsroot/common/langHelper';

export default class LicenseeRow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            settingSource:  this.props.item.settingSource,
            licenseeManager: this.props.item.licenseeManager
        };
    }

    componentDidUpdate(prevProps){
        const {settingSource, licenseeManager} = this.props.item;
        if (settingSource !== prevProps.item.settingSource || licenseeManager !== prevProps.item.licenseeManager) {
            this.setState({
                settingSource:  settingSource,
                licenseeManager: licenseeManager
            });
        }
    }

    handleChangeSelect = (value, name) =>{
        if(value !== null){
          this.setState({[name]: value.value});
        }else{
            this.setState({[name]: ''});
        }
    };

    onCancel = () => {
        this.setState({licenseeManager: this.props.item.licenseeManager});
        this.props.handleCancel();
    };

    onSave = settingId => {
        const {settingSource, licenseeManager}= this.state;
        this.props.handleSave(settingId, settingSource, licenseeManager);
    };

    render() {
        const {item, index, sourceMappingDefault, licenseesOption, handleDelete,
            licenseesManagerOption, handleEdit, debounceHandleLicenseeManagerChange, isChangeableValue, isEdit} = this.props;
        const licenseeManagerDefault = [{value: item.licenseeManager, label: item.licenseeManager}];
        const {settingSource, licenseeManager}= this.state;
        const isDisableClass = isEdit ? 'disabled-btn' : 'rounded-circle';
        const isEditClass = isEdit ? 'action-icon' : '';
        return (
            <Row key={`setting-relation-update-${index}`}>
                <Cell>{item.setting}</Cell>
                {
                    isChangeableValue ?
                    <Cell>
                        <Select
                            placeholder={LangHelper.getResource('PleaseSelect')}
                            isClearable
                            isSearchable
                            isFocused
                            isSelected
                            defaultValue={sourceMappingDefault}
                            noOptionsMessage={() => 'No results found'}
                            onChange={value => this.handleChangeSelect(value, 'settingSource')}
                            options={licenseesOption}
                        />
                    </Cell> :
                    <Cell>{settingSource}</Cell>
                }
                {
                    isChangeableValue ?
                    <Cell>
                        <Select
                            placeholder={LangHelper.getResource('PleaseSelect')}
                            isClearable
                            isSearchable
                            isFocused
                            isSelected
                            defaultValue={licenseeManagerDefault}
                            noOptionsMessage={() => 'No results found'}
                            onChange={value => this.handleChangeSelect(value, 'licenseeManager')}
                            onInputChange={searchText => debounceHandleLicenseeManagerChange(searchText)}
                            options={licenseesManagerOption}
                        />
                    </Cell>
                    :
                    <Cell>{licenseeManager}</Cell>
                }
                <Cell>{item.settingId}</Cell>
                {
                    isChangeableValue ?
                    <Cell className="text-center">
                        <span className='rounded-circle fa fa-floppy-o icon-edit'
                            onClick={() => this.onSave(item.settingId)}
                        />
                        <span  className='rounded-circle fa fa-times icon-delete'
                            onClick={() => this.onCancel()}
                        />
                    </Cell>
                    :
                    <Cell className={`text-center ${isEditClass}`}>
                        <span className={`fa fa-pencil icon-edit ${isDisableClass}`}
                            onClick={() => handleEdit(item.settingId)}
                        />
                        <span  className={`fa fa-trash icon-delete ${isDisableClass}`}
                            onClick={() => handleDelete(item.setting, item.settingId)}
                        />
                    </Cell>
                }
            </Row>
        );
    }
}