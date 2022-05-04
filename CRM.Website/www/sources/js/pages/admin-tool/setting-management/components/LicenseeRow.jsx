import React, { PureComponent } from 'react';
import { Cell, Row } from '@jsroot/components/react-grid/index';
import Select from '@jsroot/components/CustomReactSelect';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export default class LicenseeRow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sourceMapping: '',
            licenseeManager: this.props.item.licenseeManager
        };
    }

    handleChangeSelect = (value, name) =>{
        if(value !== null){
          this.setState({name: value.value});
        }else{
            this.setState({name: ''});
        }
    }

    handleSave = settingId =>{
        this.setState(prevState => ({settingId: '', isEdit: !prevState.isEdit}));
    }

    handleCancel = settingId =>{
        this.setState(prevState => ({settingId: '', isEdit: !prevState.isEdit}));
    }

    render() {
      const {item, index, sourceMappingDefault, licenseesOption, handleEdit, isChangeableValue, isEdit} = this.props;
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
                            onChange={value => this.handleChangeSelect(value, 'sourceMapping')}
                            options={licenseesOption}
                        />
                    </Cell> :
                    <Cell>{item.settingSource}</Cell>
                }
                {
                    isChangeableValue ?
                    <Cell>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            value={this.state.licenseeManager}
                            onChange={e => this.setState({licenseeManager: e.target.value})}
                        />
                    </Cell>
                    :
                    <Cell>{item.licenseeManager}</Cell>
                }
                <Cell>{item.settingId}</Cell>
                {
                    isChangeableValue ?
                    <Cell className="text-center">
                        <span className='rounded-circle fa fa-floppy-o icon-edit'
                            onClick={() => this.handleSave(item.settingId)}
                        />
                        <span  className='rounded-circle fa fa-times icon-delete'
                            onClick={() => this.handleCancel(item.settingId)}
                        />
                    </Cell>
                    :
                    <Cell className="text-center action-icon">
                        <span className={`fa fa-pencil icon-edit ${isEdit ? 'disabled-btn' : 'rounded-circle'}`}
                            onClick={() => handleEdit(item.settingId)}
                        />
                        <span  className={`fa fa-trash icon-delete ${isEdit ? 'disabled-btn' : 'rounded-circle'}`}
                            onClick={() => this.handleDelete(item.settingId)}
                        />
                    </Cell>
                }
            </Row>
        );
    }
}