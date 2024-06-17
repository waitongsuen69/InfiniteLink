## Project Log 

### Day 1
- **Date**: 23/04/2024
- **Contributor**: @husky
- **Changes**:
    - Change Development Stack after research
    - build up frame of node.js
    - basic of setup.sh

### Day 2
- **Date**: 29/04/2024
- **Contributor**: @husky
- **Changes**:
    - Sort of setup database `MongoDB`
    - refer [MongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) to install in local

### Day 3
- **Date**: 30/04/2024
- **Contributor**: @husky
- **Changes**:
    - Setup database connection in `config/db.js`
    - Setup database functions in `routes/itemRoutes.js`
        - save of single item [add_item], list of all items [return_all_items], delete all items [delete_all_items]
        - export [save/csv] and import [import/csv] as an csv file
    - Setup a demo item in `models/Item.js`
    - Create `developer_notes.md` to save all the comments for quick catch-up

### Day 4
- **Date**: 13/05/2024
- **Contributor**: @husky
- **Changes**:
    - creating docker compose  
    - create server image
    - separate out front end image 
    - mongodb still can't connect
    - going to fix db.js to match the new host port

### Day 5
- **Date**: 14/05/2024
- **Contributor**: @husky
- **Changes**:
    - bring docker-compose to working status
    - separate repo into `backend` and `frontend`
    - create separate frontend and backend `package.json`
    - `dockerignore` and `gitignore` mods to prevent node_modules get into docker image

### Day 6
- **Date**: 20/05/2024
- **Contributor**: @husky
- **Changes**:
    - new markdown introduce: FIXME.md to list all the potential bugs to fix
    - new package.json to simplify command 
    - mongodb connection accept both docker and localhost
    - create `/backend/routes/itemRoutesFunc.js` for easy function call for server
    - verify that the backend is not fucked up
    
### Day 7
- **Date**: 23/05/2024
- **Contributor**: @husky
- **Changes**:
    - Notes object implemented
    - Notes object basic function done
    - finish fixme connection using MONGO_URL variable

### Day 8
- **Date**: 27/05/2024
- **Contributor**: @husky
- **Changes**:
    - today mainly focus on frontend, separate out Note component to `frontend/src/NoteFunc`
    - finish `get_all_notes`, `AddNote`, `ExportCSV`, `ImportCSV`

### Day 9
- **Date**: 27/05/2024
- **Contributor**: @husky
- **focus**: today mainly focus on tags function
- **Changes**:
    - new function `get_all_tags`
    - `note_add_new.js/AddNote` now can properly add tags 
    - implement auto suggest for tags
    - fix the import csv issue of json.stringify
    - now allow to add multiple tags when create new Notes
    - FIXME: documentation of functions in `note_add_new.js`

### Day 10
- **Date**: 05/06/2024
- **Contributor**: @husky
- **focus**: today mainly focus on the graph
- **Changes**:
    - create new `tagCollect` to collect relationship of tags
    - create `note_map.js` for the graph 
    - generate some notes entries for testing

### Day 11
- **Date**: 17/06/2024
- **Contributor**: @husky
- **focus**: FIX the mind map, working on notes editor
- **Changes**:
    - merge `fetchAllNotes` into `handler.js`
    - `note_map.js` Mindmap algorithm seems to be working now
    - create `notes_editor.js` working on the notes editor, working on it
    - create `backend/routes/noteRoutes.js` and `Documents` for notes editor handling
    
