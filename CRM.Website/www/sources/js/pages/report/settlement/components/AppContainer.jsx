import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chart from './Chart';
import DataGrid from './DataGrid';
import Filter from './Filter';

export class AppContainer extends PureComponent {
    static propTypes = {
        contentChartPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        contentChartPopup: { show: false }
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Filter />
                <DataGrid />
                {
                    this.props.contentChartPopup.show && <Chart />
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const {
        contentChartPopup
    } = state;
    return {
        contentChartPopup
    };
};

export default connect(mapStateToProps)(AppContainer);
