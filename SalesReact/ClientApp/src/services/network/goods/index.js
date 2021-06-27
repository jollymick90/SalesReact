import API from "../API";

export const getGoods = async () => {
    return await API.get('/api/goods');
}
