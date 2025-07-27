```mermaid
sequenceDiagramSPA
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS File
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: The Javascript File
    deactivate server
    
    Note right of browser: The browser starts executing the javascript code that fetches the
    JSON from the browser
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "testing these", "date": "2025-07-27T07:13:16.118Z"}, ...],
    deactivate server
    
    Note right of browser: The browser executes the callback function that renders the notes
```