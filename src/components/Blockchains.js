import React, {useEffect, useState} from "react";
import BarChart from "./Charts/BarChart";
import ComparisonChart from "./Charts/ComparisonChart";
import { db } from "../firebase/Connection";
import { onValue, ref } from "firebase/database";

function Blockchains()
{
    // Store data from cryptoSlam and immutascan APIs
    const [cryptoSlam, setcryptoSlam] = useState();
    const [immutascan, setImmutascan] = useState();

    // Store data from Firebase database
    const [csTop10, setCsTop10] = useState();

    // Helper Variable to verify data is fetching correctly
    const [loading, setLoading] = useState(false);

    // First state of the checboxes for each graph 
    const [x1Visible, setX1Visible] = useState(false);
    const [x2Visible, setX2Visible] = useState(false);

    // Get cryptoslam top10 from Firebase database
    useEffect(() => {
        const query = ref(db, "cryptoslam-top");
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
          if (snapshot.exists()) {
            const temporal = [];
            Object.values(data).map((cs) => {
                temporal.push(cs);
            });
            setCsTop10(temporal);
          }
        });
    }, []);

    // Process data coming from cryptoSlam
    useEffect(()=>{
        fetch("https://api.cryptoslam.io/v1/sales/top-100?timeRange=day")
        .then((r)=>r.json())
        .then((data)=>{
            let cryptoslamData = data.map(item=>{
                // Change date field format
                let time = item.timeStamp.replaceAll("/","-");
                time = time.replaceAll(",","");

                return {
                    x: new Date(time),
                    y: +item.priceUSD.toFixed(2)
                }
            })

            // Sort by date
            cryptoslamData.sort((a, b) => a.x - b.x);

            // Store values
            setcryptoSlam([cryptoslamData]);
            setLoading(true);
        })
    },[])

    function getDateItems(hours) {
        var toDate = new Date();
        var fromDate = new Date();
        fromDate.setTime(fromDate.getTime() - (hours * 60 * 60 * 1000));
        var result = [];
        
        while (toDate >= fromDate) {
          result.push(toDate.getFullYear() + "-" + ("00" + (toDate.getMonth() + 1)).slice(-2) + "-" + ("00" + toDate.getDate()).slice(-2) + " " + ("00" + toDate.getHours()).slice(-2) + ":" + ("00" + toDate.getMinutes()).slice(-2) + ":" + ("00" + toDate.getSeconds()).slice(-2));          
          toDate.setTime(toDate.getTime() - (1 * 60 * 60 * 1000));
        }
      
        return result;
    }

    // Process data coming from immutascan
    useEffect(()=>{
        // Get ETH => USD exchange
        fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
        .then((r)=>r.json())
        .then((usdExchange)=>{
            // Get dates from the last 24 hours
            var datesFrom24Hours = getDateItems(24);

            // Get Data from Immutable API
            fetch(
                "https://api.ropsten.x.immutable.com/v1/orders?page_size=100&status=filled&min_timestamp="+datesFrom24Hours[24].substring(0, 10)+"T00%3A00%3A00%2B10%3A00&max_timestamp="+datesFrom24Hours[0].substring(0, 10)+"T00%3A00%3A00%2B10%3A00",
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

                    // Get correct sold number based on the decimals place field found on the API data
                    if (item.sell.data.decimals!=undefined)
                    {
                        let decimal = 1;
                        for(let i=1; i<=item.sell.data.decimals; i++)
                        {
                            decimal *= 10;
                        }
                        sold = +sold / decimal;  
                    }

                    // Change date field format
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


    // Select what graph should be visible based on their id
    const SelectGraph = (id) => { 
        switch(id)
        {
            case 'x1Checkbox' : x1Visible ? setX1Visible(false) : setX1Visible(true); break; 
            case 'x2Checkbox' : x2Visible ? setX2Visible(false) : setX2Visible(true); break; 
            default: break; 
        }
    }; 

    return <div className="container">
        {(immutascan && cryptoSlam) ? (
            immutascan.map((item, index)=>(
                <ComparisonChart 
                    key={"mixed"+index} 
                    chartType="line"
                    title="Difference in total Sales between Crypto Slam and Immutascan"
                    x1visible={x1Visible} 
                    x2visible={x2Visible}
                    axisXTitle="Times" 
                    axisYTitle="Total Sales" 
                    axisXFormat={"hh:mm"}
                    axisYFormat={"$USD "}
                    xValueType={"dateTime"}
                    xValueFormatString={"YYYY-MM-DD HH:mm"}
                    x1Data={item} 
                    x2Data={cryptoSlam[index]} 
                    HandleGraph = {SelectGraph}
                />  
            ))
            ) : (
                <p>Loading Difference in total Sales between Crypto Slam and Immutascan</p>
            )
        }
        <br/><br/>
        {csTop10 ? (
            <BarChart 
                data1={csTop10}
                data2={csTop10}
                title={"Top 10 leaderboard comparing Immutable vs Cryptoslam"}
                axisXTitle={""}
                axisYTitle={"$USD"}
            />
        ):(
            <p>Loading Top 10 leaderboard comparing Immutable vs Cryptoslam</p>
        )}
    </div>;
}

export default Blockchains;