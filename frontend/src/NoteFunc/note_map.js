import React from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const MindMap = () => {
    return (
        <div style={{ margin: '30px', width: '80%', height: '100vh', backgroundColor: 'grey'}}>
        <ReactFlow nodes={initialNodes} edges={initialEdges} />
        </div>
    );
};

export default MindMap;
