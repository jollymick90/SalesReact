import API from "../API";

export const getGoods = async () => {
    return await API.get('/api/goods');
}

export const getGood = async (id) => {
    return await API.get(`/api/goods/${id}`);
}
