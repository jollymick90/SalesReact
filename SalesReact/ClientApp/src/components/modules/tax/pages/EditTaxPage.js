import React from 'react';
import { useParams } from 'react-router-dom';
import { EditTax } from '../components/EditTax';

export function EditTaxPage() {
    const { id } = useParams();
    return (
        
        <div>
            <EditTax dataId={id} ></EditTax>
        </div>
    );
}