import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Plot from 'react-plotly.js';
import { RootState } from '../../store/store'; // Update the path as needed
import { fetchGraphData } from '../../store/actions/graphDataActions'; // Update the path as needed
import { AppDispatch } from '../../store/store';

const MtBrunoElevation: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const graphData = useSelector((state: RootState) => state.graphData.data);
    const isLoading = useSelector((state: RootState) => state.graphData.loading);
    const error = useSelector((state: RootState) => state.graphData.error);

    React.useEffect(() => {
        if (!graphData) {
            dispatch(fetchGraphData());
        }
    }, [dispatch, graphData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
            <Plot
                data={[{ x: graphData?.x, y: graphData?.y, z: graphData?.z, type: 'surface' }]}
                layout={{
                    title: 'Mt Bruno Elevation',
                    autosize: false,
                    width: 900,
                    height: 800,
                    margin: { l: 65, r: 50, b: 65, t: 90 },
                }}
            />
           
    );
};

export default MtBrunoElevation;
