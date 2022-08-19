import React, {useEffect, useState} from "react";
import BarChart from "./Charts/BarChart";
import ComparisonChart from "./Charts/ComparisonChart";

function Blockchains()
{
    // Variables to store data from cryptoSlam and immutascan APIs
    const [cryptoSlam, setcryptoSlam] = useState();
    const [immutascan, setImmutascan] = useState();

    // Helper Variable 
    const [loading, setLoading] = useState(false);

    // First state of the checboxes for each graph 
    const [x1Visible, setX1Visible] = useState(false);
    const [x2Visible, setX2Visible] = useState(false);

    // Process data coming from cryptoSlam
    useEffect(()=>{
        fetch("https://api.cryptoslam.io/v1/sales/top-100?timeRange=day")
        .then((r)=>r.json())
        .then((data)=>{

            let cryptoslamData = data.map(item=>{
                let time = item.timeStamp.replaceAll("/","-");
                time = time.replaceAll(",","");
                return {
                    x: new Date(time),
                    y: +(+item.priceUSD).toFixed(2)
                }
            })

            // Sort by date
            cryptoslamData.sort((a, b) => a.x - b.x);

            // Store values
            setcryptoSlam([cryptoslamData]);
            setLoading(true);
        })
    },[])

    // Process data coming from immutascan
    useEffect(()=>{
        // Get ETH => USD exchange
        fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
        .then((r)=>r.json())
        .then((usdExchange)=>{
            // Get Data from Immutable API
            fetch(
                "https://api.ropsten.x.immutable.com/v1/orders?page_size=100&status=filled&min_timestamp=2022-08-18T00%3A00%3A00%2B10%3A00&max_timestamp=2022-08-19T00%3A00%3A00%2B10%3A00",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "access-control-allow-origin" : "*"
                    }
                }
            )
            .then((r)=>r.json())
            .then((data)=>{
                let immutableData = data.result.map((item)=>{
                   
                    let sold = +item.sell.data.quantity;

                    // Get correct float sold number with decimals
                    if (item.sell.data.decimals!=undefined)
                    {
                        let decimal = 1;
                        for(let i=1; i<=item.sell.data.decimals; i++)
                        {
                            decimal *= 10;
                        }
                        sold = +sold / decimal;  
                    }
                    let time = item.timestamp.replaceAll("/","-");
                    time = time.replaceAll(",","");
                    return {
                        x: new Date(time),
                        y: +(+sold * usdExchange.USD).toFixed(2)
                    }
                    
                });
                // Sort by date
                immutableData.sort((a, b) => a.x - b.x);

                setImmutascan([immutableData]);
            })
        })
    },[loading])


    // Select what graph should be visible
    const SelectGraph = (id) => { 
        switch(id)
        {
            case 'x1Checkbox' : x1Visible ? setX1Visible(false) : setX1Visible(true); break; 
            case 'x2Checkbox' : x2Visible ? setX2Visible(false) : setX2Visible(true); break; 
            default: break; 
        }
        setX1Visible
    }; 

    return <div>
        {(immutascan && cryptoSlam) ? (
            immutascan.map((item, index)=>(
                <ComparisonChart 
                    key={"mixed"+index} 
                    title="Difference in total Sales between Crypto Slam and Immutascan"
                    x1visible={x1Visible} 
                    x2visible={x2Visible}
                    axisXTitle="Times" 
                    axisYTitle="Total Sales" 
                    x1Data={item} 
                    x2Data={cryptoSlam[index]} 
                    HandleGraph = {SelectGraph}
                />  
            ))
            ) : (
                <p>Loading difference in total sales data</p>
            )
        }
    </div>;
}

export default Blockchains;