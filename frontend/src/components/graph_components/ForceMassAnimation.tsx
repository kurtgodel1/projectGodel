import React, { useState } from 'react';
import Plot from 'react-plotly.js';

const ForceMassAnimation: React.FC = () => {
    const [force, setForce] = useState<number>(10);
    const [mass, setMass] = useState<number>(2);
    const [position, setPosition] = useState<number>(0);
    let timer: NodeJS.Timeout | null = null;

    const calculateAcceleration = (): number => force / mass;

    const startAnimation = () => {
        if (timer) clearInterval(timer);
        
        let currentPosition = 0;
        let velocity = 0;
        const acceleration = calculateAcceleration();

        timer = setInterval(() => {
            velocity += acceleration; // Increase velocity
            currentPosition += velocity; // Update position
            setPosition(currentPosition);

            if (currentPosition > 100) { // Arbitrary end condition
                if (timer) clearInterval(timer);
            }
        }, 100); // Update every 100 milliseconds
    };

    return (
        <div>
            <input 
                type="number" 
                value={force} 
                onChange={(e) => setForce(Number(e.target.value))} 
                placeholder="Force (N)" 
            />
            <input 
                type="number" 
                value={mass} 
                onChange={(e) => setMass(Number(e.target.value))} 
                placeholder="Mass (kg)" 
            />
            <button onClick={startAnimation}>Start Animation</button>
            <Plot
                data={[{
                    x: [position],
                    y: [0],
                    type: 'scatter',
                    mode: 'markers',
                    marker: { size: 12 }
                }]}
                layout={{ 
                    width: 720, 
                    height: 240, 
                    title: 'f=ma Animation', 
                    xaxis: { range: [-100, 100] },
                    yaxis: { range: [-10, 10] }
                }}  
            />
        </div>
    );
};

export default ForceMassAnimation;
