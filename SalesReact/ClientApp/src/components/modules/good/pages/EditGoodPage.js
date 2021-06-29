import React from 'react';
import { useParams } from 'react-router-dom';
import { EditGood } from '../components/EditGood';
export function EditGoodPage() {
    const { id } = useParams();
    return (
        <div>
            <EditGood dataId={id} ></EditGood>
        </div>
    );
}