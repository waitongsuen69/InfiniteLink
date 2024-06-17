### database testing
- open 2 terminal, in the first one run the server by `node server.js`
- second one can use curl to run the **GET** and **POST**
    - noteRoutes.js
        - GET: `curl http://localhost:5000/return_all_notes`
        - POST: `curl -X POST http://localhost:5000/add_note -H "Content-Type: application/json" -d '{"type": "txt", "name": "example_note", "tags": ["urgent", "confidential"]}'`
        - DELETE: `curl -X DELETE http://localhost:5000/delete_all_notes`
        - EXPORT: `curl http://localhost:5000/save_notes/csv`
        - IMPORT: `curl -X POST http://localhost:5000/import_notes/csv`
        - EditNotes: `curl -G --data-urlencode 'note={"FILE_NAME":"waiton","TAGS":["not useful","stupid shit"],"TYPE":"md","UPDATE_TIME":"2024-05-28T13:28:11.595Z","_id":"6655dbeb975efe3ad8c78855"}' http://localhost:5000/editNote`
    - tagRoutes.js
        - GET: `curl http://localhost:5000/get_all_tags`

- docker build 
    - cd /INFINITELINKS
    - docker-compose build
    - docker-compose up 
- local build
    - npm run start:backend
    - npm run start:frontend
    - npm start
    