import React, { useEffect, useState } from 'react';

const handler = require('./handler.js');


const MindMap = () => {
    const [tagCollect, setTagCollect] = useState({tagName: '', popular: '', connection: []});
    const [notes, setNotes] = useState([]);
    const [rootNode, setRootNode] = useState(null);

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

        // Set the root node to the most popular tag
        if (sortedTagArray.length > 0) {
            const [tagName, tagData] = sortedTagArray[0];
            setRootNode({
                tagName,
                popular: tagData.popular,
                connections: Array.from(tagData.connections)
            });
        }
    };

    // Process tags and create nodes and edges
    useEffect(() => {
        console.log("Use effect runs");
        handler.fetchAllNotes();
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            processTags();
        }
    }, [notes]);

    // Handler to return tagCollect
    const handleReturnTagCollect = () => {
        console.log("Tag Collect:", Array.from(tagCollect.entries()));
        console.log(JSON.stringify(rootNode));
    };

    return (
        <div>
            <button onClick={handler.fetchAllNotes}>Refresh</button>
            <button onClick={handleReturnTagCollect}>Return TagCollect</button>
        </div>
    );
};

export default MindMap;
