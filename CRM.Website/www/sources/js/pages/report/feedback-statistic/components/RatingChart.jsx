import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import React, { PureComponent } from 'react';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import {
    Bar,
    BarChart,
    Pie,
    PieChart,
    Cell,
    Legend,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000', '#888888'];

export default class RatingChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            barData: [],
            pieData: [],
            activeTab: 'bar',
        };
    }

    componentDidMount() {
        const { chartInfo } = this.props;
        const barData = this.getBarChartData(chartInfo);
        const pieData = this.getPieChartData(chartInfo);
        this.setState({ barData, pieData });
    }

    getBarChartData = (chartInfo) => {
        const data = [];
        if (chartInfo.records && chartInfo.records.length > 0) {
            chartInfo.records.forEach((record) => {
                const item = {
                    name: record.columnData.name,
                    '5 (Excellent)': record.excellent,
                    '4 (Good)': record.good,
                    '3 (Neutral)': record.neutral,
                    '2 (Poor)': record.poor,
                    '1 (Very Poor)': record.veryPoor
                };
                data.push(item);
            });
        }
        return data;
    };

    getPieChartData = (chartInfo) => {
        const data = [];
        if (chartInfo.records && chartInfo.records.length > 0) {
            const totals = {
                '5 (Excellent)': 0,
                '4 (Good)': 0,
                '3 (Neutral)': 0,
                '2 (Poor)': 0,
                '1 (Very Poor)': 0
            };

            chartInfo.records.forEach((record) => {
                totals['5 (Excellent)'] += record.excellent;
                totals['4 (Good)'] += record.good;
                totals['3 (Neutral)'] += record.neutral;
                totals['2 (Poor)'] += record.poor;
                totals['1 (Very Poor)'] += record.veryPoor;
            });

            Object.entries(totals).forEach(([name, value]) => {
                if (value > 0) {
                    data.push({ name, value });
                }
            });
        }
        return data;
    };

    renderBarChart = () => {
        const { barData } = this.state;
        if (!barData || barData.length === 0) {
            return null;
        }

        return (
            <ResponsiveContainer width="100%" height={600}>
                <BarChart
                    data={barData}
                    margin={{
                        top: 30,
                        right: 30,
                        left: 30,
                        bottom: barData.length > 5 ? 200 : 30,
                    }}
                    barCategoryGap={barData.length > 30 ? -10 : 0}
                    barGap={barData.length > 30 ? -10 : 0}
                >
                    <XAxis
                        dataKey="name"
                        scaleToFit
                        verticalAnchor="start"
                        textAnchor="end"
                        height={barData.length > 50 ? 60 : 20}
                        interval={0}
                        angle={barData.length > 5 ? -90 : 0}
                        dy={10}
                    />
                    <YAxis
                        label={{ position: 'top', dy: -10, value: 'Feedback(s)' }}
                        allowDataOverflow
                    />
                    <Legend wrapperStyle={{ bottom: 5, left: 75 }} />
                    <Tooltip />
                    <Bar dataKey="5 (Excellent)" fill={COLORS[0]} />
                    <Bar dataKey="4 (Good)" fill={COLORS[1]} />
                    <Bar dataKey="3 (Neutral)" fill={COLORS[2]} />
                    <Bar dataKey="2 (Poor)" fill={COLORS[3]} />
                    <Bar dataKey="1 (Very Poor)" fill={COLORS[4]} />
                </BarChart>
            </ResponsiveContainer>
        );
    };

    renderPieChartLabel = (text) => {
        const match = text.match(/\((.*?)\)/);
        return match ? match[1] : text;
    };

    renderPieChart = () => {
        const { pieData } = this.state;
        if (!pieData || pieData.length === 0) {
            return null;
        }

        return (
            <ResponsiveContainer width="100%" height={600}>
                <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${this.renderPieChartLabel(name)} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        );
    };

    render() {
        const { chartInfo } = this.props;
        const { activeTab } = this.state;

        return (
            <Modal
                className="chart-modal-feedback-statistics"
                show
                dialogAs={DraggableModalDialog}
                backdrop="static"
                keyboard={false}
                size="xl"
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{chartInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(key) => this.setState({ activeTab: key })}
                        className="mb-3"
                    >
                        <Tab eventKey="bar" title="Bar Chart">
                            {this.renderBarChart()}
                        </Tab>
                        <Tab eventKey="pie" title="Pie Chart">
                            {this.renderPieChart()}
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        );
    }
}