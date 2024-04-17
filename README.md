# InfiniteLink
A note-taking app that leverages a reticular formation for dynamic information organization, enabling seamless management and organization of notes with endless interconnections.

## Overview
InfiniteLink offers a flexible and intuitive way to access and prioritize information, enhancing productivity by organizing notes in a network-like structure without fixed endpoints.

## Design

### Development Stack
This project is built using:
- **Python**: Handles backend functionalities and logic implementation.
- **MySQL**: Manages database operations.
- **Flask**: Used for frontend development and server-side logic.

### Core Objects

#### EVENT
Each note is represented as an "EVENT", structured as follows:
- **ID** (`uint16_t`): Unique identifier for each event.
- **TYPE** (`string`): Specifies the type of event.
- **UPDATE_TIME** (`DATETIME`): Records the last time the event was updated.
- **TAGS** (`list<string>`): Tags associated with the event for categorization and search.

Events are stored in Markdown files or other suitable formats to facilitate extensive documentation.

### Weight Function (Priority)
Priority is assigned based on:
- **Tag Priority**: Calculated from the frequency of events associated with each tag.
- **Event Recency**: Recent updates confer a higher priority to the event.

### Features

#### Search by Tags
Enhanced search capabilities allow users to navigate information efficiently:
1. **Tag Display**: Tags are displayed with priority consideration, showcasing more relevant tags prominently.
2. **Tag Selection**:
   - **List 1**: Displays events associated with a selected tag, sorted by priority.
   - **List 2**: Shows other tags related to the events in List 1, sorted by their relevance to the selected tag.
3. **Navigation Options**:
   - Users can refine the display by continuing to select related tags.
   - Selecting new tags will update the event list accordingly.
4. **Event Access**: Clicking an event provides a direct link to detailed view and edit options.

#### workbench
Workbench can build new tags with EVENT or pure EVENT
1. **Relate Tags**: workbench would be saved into an exiting tag
2. **Relate EVENT**: Related event will define as member of the new workbench, only declaring new tag will effected the Related EVENT.
3. **Declare new tag**: workbench will declare as new tag and add the tag to all EVENT related in the workbench
## Versioning
Ensure each release of your application is properly versioned. Use semantic versioning (SEMVER) for clarity and consistency. Examples:
- Major updates: `1.0.0`, `2.0.0`
- Minor updates for new features: `1.1.0`, `1.2.0`
- Patches and fixes: `1.0.1`, `1.0.2`

Use tags in your version control system to mark these versions accordingly.

## Contribution
Contributions are welcome. Please fork the repository, make changes, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

Ensure to update tests as appropriate.
