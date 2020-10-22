import React, { Component } from 'react';
import Select from 'react-select';

export default class CustomReactSelect extends Component {
    render() {
        const { components, styles, ...rest } = this.props;

        return (
            <Select className='react-select-container' classNamePrefix='react-select'
                {...rest}
                components={{
                    IndicatorSeparator: () => null,
                    ...components
                }}
                styles={{
                    control: base => ({
                        ...base,
                        borderRadius: 0,
                        minHeight: 'unset',
                        boxShadow: 'none'
                    }),
                    input: base => ({
                        ...base,
                        lineHeight: 1
                    }),
                    multiValue: base => ({
                        ...base,
                        margin: '0 4px 0 0'
                    }),
                    ...styles
                }}
            />
        );
    }
}
