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
