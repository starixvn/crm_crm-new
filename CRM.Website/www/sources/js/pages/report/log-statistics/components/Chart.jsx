import React, { PureComponent } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getBackGroundColor } from '@jsroot/common/shareScripts';

import {Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';

export default class Chart extends PureComponent {
    renderChart = report => {
        const mainCategories = report.mainCategories.map((item, index) => ({
            index: index,
            id: item.id,
            name: item.name
        }));
        const data = report.communicationColumns.map(item => ({
            name: item.name
        }));

        return (
            <Form>
                <Modal.Body>
                <ResponsiveContainer width="100%" height={700}>
                    <BarChart
                        width={1100}
                        data={data}
                        margin={{top: 5, bottom: 20}}
                        barCategoryGap={0}
                        barGap={0}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend
                        payload={mainCategories.map((item, index) => ({
                            id: item.id,
                            type: 'square',
                            value: item.name,
                            color: getBackGroundColor(index)
                        }))}
                    />
                    </BarChart>
                </ResponsiveContainer>
                </Modal.Body>
            </Form>
        );
    };
    render() {
        const {title, data} = this.props.chart;
        return (
            <Modal show className="chart-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={() => this.props.onClose(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{title}</Modal.Title>
                </Modal.Header>
                    {this.renderChart(data)}
            </Modal>
        );
    }
}
