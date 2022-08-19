import React from "react";
import {CanvasJSChart} from 'canvasjs-react-charts'
/**
 * 
 * Component not used 
 */
function BarChart({title, axisXTitle, axisYTitle, data})
{
    // Options for the graph
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
            dataPoints: [
                { label: data.dateYesterday, y: data.sumYesterday },
                { label: data.dateToday, y: data.sumToday }
            ]
        }]
    }

    return <div>
        <CanvasJSChart 
            options = {options}
        />
    </div>;
}

export default BarChart;