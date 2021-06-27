import API from "../API";

export const getGoodTypes = async () => {
    return await API.get('/api/goodTypes');
}

export const getGoodType = async (id) => {
    return await API.get(`/api/goodTypes/${id}`);
}
