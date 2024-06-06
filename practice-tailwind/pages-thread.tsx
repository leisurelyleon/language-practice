// pages/thread/[id].tsx

import { useRouter } from 'next/router';
import React from 'react';
import ThreadDetail from '../../components/ThreadDetail';

const ThreadPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>
                Thread Detail
            <ThreadDetail threadId={id as string} />
            </h1>
        </div>
    );
};

export default ThreadPage;