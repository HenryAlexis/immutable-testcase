import React from "react";
import {CanvasJSChart} from 'canvasjs-react-charts'

function ComparisonChart({title, x1visible, x2visible, axisXTitle, axisYTitle, x1Data, x2Data, HandleGraph})
{
    // Options for the comparion graph
    const options = {
        animationEnabled: true,
        title:{
            text: title
        },
        axisX: {
            title: axisXTitle,
            valueFormatString: "hh:mm",
        },
        axisY: {
            title: axisYTitle,
            prefix: "$USD ",
        },
        data: [
            {
                type: "line",
                connectNullData: true,
                xValueType: "dateTime",
                xValueFormatString: "YYYY-MM-DD HH:mm",
                yValueFormatString: "$ #.##",
                dataPoints: x1Data,
                visible:x1visible
            },
            {
                type: "line",
                connectNullData: true,
                xValueType: "dateTime",
                xValueFormatString: "YYYY-MM-DD HH:mm",
                yValueFormatString: "$ #.##",
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
        <label>Crypto Slam (BLUE)&nbsp;</label><input id="x1Checkbox" type="checkbox" onChange={(e)=>SelectOption(e)}/>
        <br/>
        <label>Immutascan (RED)&nbsp;</label><input id="x2Checkbox" type="checkbox" onChange={(e)=>SelectOption(e)}/>
    </div>;
}

export default ComparisonChart;