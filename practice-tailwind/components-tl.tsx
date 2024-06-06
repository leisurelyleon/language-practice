// components/ThreadList.tsx

import React from 'react';
import Link from 'next/link';

const ThreadList: React.FC = () => {
    const threads = [
        { id: '1', title: 'Thread 1'},
        { id: '2', title: 'Thread 2'},
        { id: '3', title: 'Thread 3'},
    ];

    return (
        <ul>
            {threads.map((thread) => (
                <li key={thread.id}>
                    <Link href={`/thread/${thread.id}`}>
                        <a>{thread.title}</a>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ThreadList;