import { BaseService } from "../../common/ApiBase";

const type = "goods";
const api = `/api/${type}`;

class GoodAPI {

    constructor() {
        instance = new BaseService(api)
    }

    getAll() {
        return this.instance.getAll();
    }

    get(id) {
        return this.instance.get(id);
    }

    create(data) {
        return this.instance.post(data);
    }

    update(id, data) {
        return this.instance.put(id, data);
    }

    delete(id) {
        return this.instance.delete(id);
    }

    deleteAll() {
        return this.instance.delete();
    }

}

export default new GoodAPI();