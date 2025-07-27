```mermaid
sequenceDiagram SPA NewNote
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
    
    Note right of server: The server starts executing the Javascript code that push the
    new note to the data with json format and send no HTTP requests
```