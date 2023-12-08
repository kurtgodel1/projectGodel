import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const MtBrunoElevation: React.FC = () => {
    const [zData, setZData] = useState<number[][]>([]);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv')
            .then(response => {
                const rows = response.data.split('\n').map((row: string) => row.split(','));
                const unpackedData: number[][] = [];

                for (let i = 0; i < 24; i++) {
                    unpackedData.push(rows.map((row: string[]) => parseFloat(row[i])));
                }

                setZData(unpackedData);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <Plot
            data={[{ z: zData, type: 'surface' }]}
            layout={{
                title: 'Mt Bruno Elevation',
                autosize: false,
                width: 500,
                height: 500,
                margin: { l: 65, r: 50, b: 65, t: 90 },
            }}
        />
    );
};

export default MtBrunoElevation;
