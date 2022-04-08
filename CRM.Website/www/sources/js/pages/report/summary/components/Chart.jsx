import colors from '@jsroot/common/colorColumnChart';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from 'recharts';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

export class Chart extends Component {
    constructor(props) {
        super(props);
    }

    addCategorySummary = (categorySummary, obj, month) =>{
        categorySummary.summaries.map(report => {
            if (report.month === month && report.amount !== 0) {
                if (obj[categorySummary.name]) {
                    obj[categorySummary.name] += report.amount;
                } else {
                    obj[categorySummary.name] = report.amount;
                }
            }
        });
        return obj;
    };

    convertDataChart = (months, categorySummaries) => {
        const data = months.map(month => {
            const obj = { name: month };
            categorySummaries.map(categorySummariy => {
                this.addCategorySummary(categorySummariy, obj, month);
            });
            return obj;
        });
        return data;
    };

    getLabels = reports => {
        const labels = [];
        reports.forEach(report => {
            const index = labels.findIndex(label => label === report.name);
            if (index === -1) {
                labels.push(report.name);
            }
        });
        return labels;
    };

    onCloseChart = () => {
        this.props.setChartPopup({ show: false });
    };

    render() {
        const { categorySummaries, months, reportTitle } = this.props.gridData;
        const data = this.convertDataChart(months, categorySummaries);
        const labels = this.getLabels(categorySummaries);
        return (
            <Modal show className="chart-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl"
                onHide={this.onCloseChart}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{reportTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BarChart
                        width={1100}
                        height={750}
                        data={data}
                        margin={{
                            top: 30, right: 30, left: 30, bottom: 30 + labels.length / 6 * 35
                        }}
                        padding={{
                            bottom: 100
                        }}
                        barCategoryGap={2}
                        barGap={2}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Feedback(s)', position: 'top', dy: -10 }} domain={[0, 'dataMax']} allowDecimals={false} />
                        <Legend wrapperStyle={{ bottom: 5, left: 90, width: 993 }} />
                        {labels.map((label, index) => (
                            <Bar dataKey={label} key={index} label={{ position: 'top' }}
                                fill={colors[index % 20]}
                            />
                        )
                        )}
                    </BarChart>
                </Modal.Body>
            </Modal>
        );
    }
}
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProp = state => {
    const {
        gridData
    } = state;
    return {
        gridData
    };
};

export default connect(mapStateToProp, mapDispatchToProps)(Chart);