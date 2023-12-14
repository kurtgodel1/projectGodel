import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import Submit from './SubmitButton'; // Update the path as needed
import ExampleComponent from './ExampleComponent'; // Update the path as needed
import ThreeDSurfaceGraph from './ThreeDSurfaceGraph'; // Update the path as needed
import ForceMassAnimation from './graph_components/ForceMassAnimation'; // Update the path as needed
import MtBrunoElevation from './graph_components/MtBrunoElevation'; // Update the path as needed
import config from '../config'; // Update the path as needed

const PowerGraph: React.FC = () => {
    const [n, setN] = useState<number>(2); // Default power
    const [xData, setXData] = useState<number[]>([]);
    const [yData, setYData] = useState<number[]>([]);

    const fetchData = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.get(`${config.API_URL}/api/calculate_power_function/?n=${n}`);
            setXData(response.data.x);
            setYData(response.data.y);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={fetchData}>
                <label>
                    Enter Power (n):
                    <input 
                        type="number" 
                        value={n} 
                        onChange={(e) => setN(Number(e.target.value))} 
                    />
                </label>
                <Submit />
            </form>
            <Plot
                data={[{
                    x: xData,
                    y: yData,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'blue'}
                }]}
                layout={{ width: 720, height: 440, title: 'Graph of x^n' }}
            />
            <ForceMassAnimation />
            <ExampleComponent />
            <ThreeDSurfaceGraph width={720} height={440} />
        </div>
    );
};

export default PowerGraph;



