import React from 'react';

import { EditReceipt } from '../receipt/EditReceipt';
import { useParams } from "react-router";

export function EditReceiptPage() {
    const { id } = useParams();

    return (
        <div>
            <EditReceipt receiptId={id}></EditReceipt>
        </div>
    );
}