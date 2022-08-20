import React, {useEffect, useState} from "react";
import BarChart from "./Charts/BarChart";
import ComparisonChart from "./Charts/ComparisonChart";

function Projects()
{
    // Store cryptoSlam data
    const [cryptoSlam, setcryptoSlam] = useState();
    const [periodCS, setPeriodCS] = useState("day");
    const [buyers, setBuyers]= useState();

    // Helper Variable to verify data is fetching correctly
    const [loading, setLoading] = useState(false);

    // First state of the checboxes for each graph 
    const [x1Visible, setX1Visible] = useState(false);
    const [x2Visible, setX2Visible] = useState(false);

    // Process data coming from cryptoSlam
    useEffect(()=>{
        fetch("https://api.cryptoslam.io/v1/collections/top-100?timeRange="+periodCS)
        .then((r)=>r.json())
        .then((data)=>{
            let tempBuyers = 0;
            let temptransactions = 0;
            let cryptoslamData = data.map(item=>{
                // Sum totals for buyers and transactions
                tempBuyers += +item.buyers;
                temptransactions += +item.transactions;

                return {
                    label: item.contractName,
                    y: +item.valueUSD.toFixed(2)
                }
            })

            // Store values
            setcryptoSlam([cryptoslamData]);
            setBuyers([
                {
                    name: "Buyers",
                    sales: tempBuyers
                },
                {
                    name: "Transactions",
                    sales: temptransactions
                }
            ])
            setLoading(true);
        })
    },[periodCS]);

    // Select what graph should be visible based on their id
    const SelectGraph = (id) => { 
        switch(id)
        {
            case 'x1Checkbox' : x1Visible ? setX1Visible(false) : setX1Visible(true); break; 
            case 'x2Checkbox' : x2Visible ? setX2Visible(false) : setX2Visible(true); break; 
            default: break; 
        }
    }; 

    // Change the period day/week/month of the chart
    const SelectPeriod = (period) => { 
        setPeriodCS(period);
    }; 

    return <div className="container">
        <label>24hrs&nbsp;</label><input type="radio" name="RadioPeriod" onChange={()=>SelectPeriod("day")}/>
        <br/>
        <label>7days&nbsp;</label><input type="radio" name="RadioPeriod" onChange={()=>SelectPeriod("week")}/>
        <br/>
        <label>30days&nbsp;</label><input type="radio" name="RadioPeriod" onChange={()=>SelectPeriod("month")}/>
        <br/>
        {
            (cryptoSlam) ? (
                cryptoSlam.map((item, index)=>(
                    <ComparisonChart 
                        key={"mixed"+index} 
                        chartType="column"
                        title="Comparison Table by Project"
                        x1visible={x1Visible} 
                        x2visible={x2Visible}
                        axisXTitle="Collections" 
                        axisYTitle="Total Sales" 
                        axisXFormat={""}
                        axisYFormat={"$USD "}
                        xValueType={""}
                        xValueFormatString={""}
                        x1Data={item} 
                        x2Data={""} 
                        HandleGraph = {SelectGraph}
                    /> 
            ))
            ) : (
                <p>Loading Difference in total Sales between Crypto Slam and Immutascan</p>
            )
        }
        <br/><br/><br/><br/>
        {
            (buyers) ? (
                <BarChart 
                    data1={buyers}
                    title={"Difference between number of buyers and number of transactions (only Cryptoslam)"}
                    axisXTitle={""}
                    axisYTitle={"Totals"}
                />
            ) : (
                <p>Difference between number of buyers and number of transactions</p>
            )
        }
        
    </div>;
}

export default Projects;