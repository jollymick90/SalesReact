import React from 'react';

import { EditGood } from '../good/EditGood';
import { useParams } from "react-router";

export function EditGoodPage() {
    const { id } = useParams();

    return (
        <div>
            <EditGood goodid={id}></EditGood>
        </div>
    );
}