import React from "react";
import {CanvasJSChart} from 'canvasjs-react-charts'

function BarChart({title, axisXTitle, axisYTitle, data1, data2})
{
    // Options for the graph
    const dataSource1 = data1.map(item=>{
        return { 
            label: item.name, 
            y: item.sales 
        };
    })
    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: title
        },
        axisX: {
            title: axisXTitle,
            reversed: true,
        },
        axisY: {
            title: axisYTitle,
            includeZero: true,
        },
        data: [{
            type: "column",
            dataPoints: dataSource1
        }]
    }

    return <div>
        <CanvasJSChart 
            options = {options}
        />
    </div>;
}

export default BarChart;