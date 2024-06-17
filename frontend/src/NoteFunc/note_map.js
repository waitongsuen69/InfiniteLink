import React, { useEffect, useState } from 'react';
const handler = require('./handler.js');

const MindMap = () => {
    const [tagCollect, setTagCollect] = useState(new Map());
    const [notes, setNotes] = useState([]);
    const [rootNode, setRootNode] = useState(null);

    const fetchAllNotes = async () => {
        try {
            const allNotes = await handler.fetchAllNotes();
            setNotes(allNotes);
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

        // Set the root node to the most popular tag if not set
        if (sortedTagArray.length > 0) {
            const [tagName, tagData] = sortedTagArray[0];
            setRootNode({
                tagName,
                popular: tagData.popular,
                connections: Array.from(tagData.connections)
            });
        }
    };

    useEffect(() => {
        fetchAllNotes();
    }, []);

    useEffect(() => {
        if (notes.length > 0) {
            processTags();
        }
    }, [notes]);

    const handleTagClick = (tagName) => {
        const tagData = tagCollect.get(tagName);
        if (tagData) {
            setRootNode({
                tagName,
                popular: tagData.popular,
                connections: Array.from(tagData.connections)
            });
        }
    };

    return (
        <div>
            <button onClick={processTags}>Back to top</button>
            {rootNode && (
                <div>
                    <h2>Current Tag: {rootNode.tagName}</h2>
                    <p>Popularity: {rootNode.popular}</p>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1, marginRight: '20px' }}>
                            <h3>Related Tags</h3>
                            <ul>
                                {rootNode.connections.map((connection, index) => (
                                    <li key={index}>
                                        <button onClick={() => handleTagClick(connection)}>{connection}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ flex: 2 }}>
                            <h3>Notes Including {rootNode.tagName}</h3>
                            <ul>
                                {notes
                                    .filter(note => note.TAGS.includes(rootNode.tagName))
                                    .map(note => (
                                        <li key={note._id}>
                                            {note.FILE_NAME}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default MindMap;
