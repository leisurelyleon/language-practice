// components/ThreadDetail.tsx

import React from 'react';

interface ThreadDetailProps {
    threadId: string;
}

const ThreadDetail: React.FC<TheadDetailProps> = ({ threadId }) => {
    // Fetch thread details based on threadId from an API or database
    const threadDetails = { id: threadId, content: 'Thread content goes here'};

    return (
        <div>
            <h2>
                {threadDetails.content}
            </h2>
        </div>
    );
};

export default ThreadDetail;