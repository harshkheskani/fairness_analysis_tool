import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";


const BarChart = ({ continentCount, locations, searchResults }) => {
  // Full data set: country count

  const initialData = [
    { name: "unknown", value: 2557234, percentage: 42.15 },
    { name: "Europe", value: 1289747, percentage: 21.26 },
    { name: "Northern America", value: 1134091, percentage: 18.69 },
    { name: "Asia", value: 600711, percentage: 9.9 },
    {
      name: "Latin America and the Caribbean",
      value: 185393,
      percentage: 3.06,
    },
    { name: "Oceania", value: 157943, percentage: 2.6 },
    { name: "Africa", value: 131603, percentage: 2.17 },
    { name: "Antarctica", value: 9626, percentage: 0.16 },
  ];

  // Getting Ranks Per Continent
  const [ranksPerContinent, setRanksPercontinent] = useState({});
  const [avgContinentRank, setAvgContinentRank] = useState({});
  const [rankRangesPerContinent, setRankRangesPerContinent] = useState({});

  useEffect(() => {
    const continentRanks = {};
    const continentAverages = {};
    const rankRanges = {};
    if (locations && Object.keys(locations).length > 0) {
      Object.entries(locations).forEach(([continent, data]) => {
        continentRanks[continent] = data.map((obj) => obj.rank);
        const ranks = data.map((obj) => obj.rank);
        if (ranks.length > 0) {
          const sum = ranks.reduce((total, rank) => total + rank);
          const average = sum / ranks.length;
          continentAverages[continent] = average;
          const low = Math.min(...ranks);
          const high = Math.max(...ranks);
          rankRanges[continent] = { low, high };
        }
      });
      setRanksPercontinent(continentRanks);
      setAvgContinentRank(continentAverages);
      setRankRangesPerContinent(rankRanges);
    }
  }, [locations]);


  // Calculate the Skew
  function skewness(data) {
    const n = data.length;
    const mean = data.reduce((acc, val) => acc + val, 0) / n;
    const variance =
      data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    const skewness =
      data.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) /
      (n * Math.pow(stdDev, 3));
    setExpectedExposureSkew(skewness);
  }

  const [expectedExposureSkew, setExpectedExposureSkew] = useState()

  const [barChartData, setBarChartData] = useState(initialData);

  function getPercentageByName(name) {
    const region = initialData.find((region) => region.name === name);
    return region ? region.percentage : null;
  }

  function updatingContinentCount() {
    const formattedMapData = [];
    const listExpectedExposure = [];
    const valueSum = Object.values(continentCount).reduce((a, b) => a + b, 0);
    for (let key in continentCount) {
      if (continentCount.hasOwnProperty(key)) {
        const searchRatio = continentCount[key] / valueSum;
        const fullDataSetRatio = getPercentageByName(key) / 100;
        const expectedExposure = Math.abs(searchRatio - fullDataSetRatio) * 100;
        listExpectedExposure.push(expectedExposure)
        // create a new object with the desired key names
        let newObj = {
          name: key,
          percentage: continentCount[key],
          value: expectedExposure.toFixed(2),
        };
        // append the new object to the array
        formattedMapData.push(newObj);
      }
    }
    setBarChartData(formattedMapData);
    skewness(listExpectedExposure)  
  }

  // updating map data

  useEffect(() => {
    if (Object.keys(continentCount || {}).length > 0) {
      updatingContinentCount();
    }
  }, [continentCount]);

  return (
    <ResponsiveBar
      data={barChartData}
      // zkeys={["Africa","Asia","unknown","Europe", "Latin America and the Caribbean", "Antarctica", "Northern America","Oceania"]}
      indexBy="name"
      margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      padding={0.3}
      colors={{ scheme: "nivo" }}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};

export default BarChart;
