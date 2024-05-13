### database testing
- open 2 terminal, in the first one run the server by `node server.js`
- second one can use curl to run the **GET** and **POST**
    - GET: `curl http://localhost:5000/return_all_items`
    - POST: `curl -X POST http://localhost:5000/add_item -H "Content-Type: application/json" -d '{"name": "Sample Item", "quantity": 10}'`
    - DELETE: `curl -X DELETE http://localhost:5000/delete_all_items`
    - EXPORT: `curl http://localhost:5000/save/csv`
    - IMPORT: `curl -X POST http://localhost:5000/import/csv`

- docker build 
    - 