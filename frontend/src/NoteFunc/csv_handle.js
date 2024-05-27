// csv_handle.js
import React, { useState } from 'react';

export const ExportCSV = () => {

  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:5000/save_notes/csv', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // if you need to include cookies
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const message = await response.json();
      console.log(message);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <button onClick={handleExport}>Export as csv</button>
  );
};

export const ImportCSV = ({ get_all_notes }) => {

    const handleImport = async () => {
      try {
        const response = await fetch('http://localhost:5000/import_notes/csv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // if you need to include cookies
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const message = await response.json();
        get_all_notes();
        console.log(message);
      } catch (error) {
        console.error('Error adding note:', error);
      }
    };
  
    return (
      <button onClick={handleImport}>import csv</button>
    );
};