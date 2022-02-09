import React, { PureComponent } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';

import {Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';

export default class Chart extends PureComponent {
    shadeColor = (color, percent) =>{
        const colorHexValue = parseInt(color.slice(1), 16);
        const t = percent < 0 ? 0 : 255;
        const p = percent < 0 ? percent * -1 : percent;
        const redColor = colorHexValue >> 16;
        const greenColor = colorHexValue >> 8 & 0x00FF;
        const blueColor = colorHexValue & 0x0000FF;
        const backGroundColor = {
            Red: 0x1000000 + (Math.round((t - redColor) * p) + redColor) * 0x10000,
            Green: (Math.round((t - greenColor) * p) + greenColor) * 0x100,
            Blue: (Math.round((t - blueColor) * p) + blueColor)
        };

        return '#' + (backGroundColor.Red +
               backGroundColor.Green +
               backGroundColor.Blue).toString(16).slice(1);
    };

    getBackGroundColor = index => {
        const backGroundColors= [
            '#3F5D7D', '#279B61', '#008AB8',
            '#993333', '#A3E496', '#95CAE4',
            '#CC3333', '#FFCC33', '#FFFF7A',
            '#CC6699', '#9370db'
        ];
        const backGroundColorLength = backGroundColors.length;
        const backGroundColorIndex = index % backGroundColorLength;
        let darkenPercent = Math.floor(index / backGroundColorLength) / 5;
        if (darkenPercent >= 1) {
            darkenPercent = 0;
        }

        const backGroundColor = darkenPercent === 0 ?
            backGroundColors[backGroundColorIndex] :
            this.shadeColor(backGroundColors[backGroundColorIndex], - darkenPercent);
        return backGroundColor;
    };

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
                    <BarChart
                        width={1100}
                        height={500}
                        data={data}
                        margin={{top: 5, bottom: 20}}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Legend
                        payload={mainCategories.map((item, index) => ({
                            id: item.id,
                            type: 'square',
                            value: item.name,
                            color: this.getBackGroundColor(index)
                        }))}
                    />
                    </BarChart>
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
