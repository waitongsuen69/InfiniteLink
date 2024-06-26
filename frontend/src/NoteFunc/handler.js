// tags_handle.js
import React, { useState } from 'react';

// Helper function to fetch all tags from the backend
const fetchAllTags = async () => {
    try {
      const response = await fetch('http://localhost:5000/get_all_tags');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      return data; // Assuming the response is an array of tags
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
};

const fetchAllNotes = async () => {
  try {
    const response = await fetch('http://localhost:5000/return_all_notes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("fetchAllNotes called");
    return data; // Assuming the response is an array of tags
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};


export {
  fetchAllNotes, fetchAllTags
};