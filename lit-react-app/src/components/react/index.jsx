import React, { useState } from 'react';
import { MyLitComponent } from '../lit';

const ReactComponent = () => {
    const [state, setState] = useState({});

    const handleChange = (newState) => {
        setState(newState);
    };

    return (
        <div>
            <h1>Style Management with Lit and React</h1>
            <MyLitComponent onChange={handleChange} />
            {/* Additional UI elements can be added here */}
        </div>
    );
};

export default ReactComponent;