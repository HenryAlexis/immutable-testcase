import React from "react";
import {CanvasJSChart} from 'canvasjs-react-charts'

function ComparisonChart({
    title, 
    x1visible, 
    x2visible, 
    axisXTitle, 
    axisYTitle, 
    axisXFormat,
    axisYFormat,
    xValueType,
    xValueFormatString,
    x1Data, 
    x2Data, 
    HandleGraph,
    chartType
})
{
    // Options for the comparion graph
    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: title
        },
        axisX: {
            title: axisXTitle,
            valueFormatString: axisXFormat,
        },
        axisY: {
            title: axisYTitle,
            prefix: axisYFormat
        },
        data: [
            {
                type: chartType,
                showInLegend: true,
                legendText:"Crypto Slam",
                connectNullData: true,
                xValueType: xValueType,
                xValueFormatString: xValueFormatString,
                dataPoints: x1Data,
                visible:x1visible
            },
            {
                type: chartType,
                showInLegend: true,
                legendText:"Immutascan",
                connectNullData: true,
                xValueType: xValueType,
                xValueFormatString: xValueFormatString,
                yValueFormatString: "",
                dataPoints: x2Data,
                visible:x2visible
            }
        ]
    }

    function SelectOption(e)
    {
        HandleGraph(e.target.id)
        
    }

    return <div>
        <CanvasJSChart 
            options = {options}
        />
        <label>Crypto Slam&nbsp;</label><input id="x1Checkbox" type="checkbox" onChange={(e)=>SelectOption(e)}/>
        <br/>
        <label>Immutascan&nbsp;</label><input id="x2Checkbox" type="checkbox" onChange={(e)=>SelectOption(e)}/>
    </div>;
}

export default ComparisonChart;