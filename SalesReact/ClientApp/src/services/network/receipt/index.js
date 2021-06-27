import API from "../API";

export const getReceipts = async () => {
    return await API.get('/api/receipts');
}

export const getReceipt = async (id) => {
    return await API.get(`/api/receipts/${id}`);
}
