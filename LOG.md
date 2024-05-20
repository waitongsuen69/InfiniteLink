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
    