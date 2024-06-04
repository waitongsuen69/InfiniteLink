import React, { useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';

const MindMap = () => {
    const [tagCollect, setTagCollect] = useState({tagName: '', popular: '', connection: []});
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [notes, setNotes] = useState([]);

    // Fetch notes from the backend
    const get_all_notes = async () => {
        try {
            const response = await fetch('http://localhost:5000/return_all_notes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include' // if you need to include cookies
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const processTags = () => {
        const tagMap = new Map();

        notes.forEach(note => {
            const tags = note.TAGS;
            tags.forEach((tag) => {
                if (!tagMap.has(tag)) {
                    tagMap.set(tag, { popular: 0, connections: new Set() });
                }
                const tagData = tagMap.get(tag);
                tagData.popular += 1;
                tags.forEach((relatedTag) => {
                    if (relatedTag !== tag) {
                        tagData.connections.add(relatedTag);
                    }
                });
            });
        });
        
        // Convert tagMap to array, sort it by popularity, then convert it back to a Map
        const sortedTagArray = Array.from(tagMap.entries()).sort((a, b) => b[1].popular - a[1].popular);
        const sortedTagMap = new Map(sortedTagArray);

        setTagCollect(sortedTagMap);
    };

    // Process tags and create nodes and edges
    useEffect(() => {
        if (notes.length > 0) {
            processTags();
        }
    }, [notes]);

    // Fetch notes on component mount
    useEffect(() => {
        get_all_notes();
    }, []);

    // Handler to return tagCollect
    const handleReturnTagCollect = () => {
        console.log("Tag Collect:", Array.from(tagCollect.entries()));
        alert(JSON.stringify(Array.from(tagCollect.entries()), null, 2));
    };

    return (
        <div style={{ margin: '30px', width: '80%', height: '100vh', backgroundColor: 'grey' }}>
            <ReactFlow nodes={nodes} edges={edges} />
            <button onClick={get_all_notes}>Refresh</button>
            <button onClick={handleReturnTagCollect}>Return TagCollect</button>
        </div>
    );
};

export default MindMap;
