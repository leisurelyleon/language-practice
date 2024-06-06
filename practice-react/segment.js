import React from 'react'
import { Segment } from 'semantic-ui-react'

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
"https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const Btt = () => (
    <div>
        <br/>
        <Segment>GeeksforGeeks</Segment>
    </div>
)

export default Btt