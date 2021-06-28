import http from "../../common/API";

export class BaseService {
    constructor(baseApi) {
        this.baseApi = baseApi;
    }
    getAll() {
      return http.get(this.baseApi);
    }
  
    get(id) {
      return http.get(`${this.baseApi}/${id}`);
    }
  
    create(data) {
      return http.post(`${this.baseApi}/`, data);
    }
  
    update(id, data) {
      return http.put(`${this.baseApi}/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`${this.baseApi}/${id}`);
    }
  
    deleteAll() {
      return http.delete(`${this.baseApi}`);
    }
  }
  