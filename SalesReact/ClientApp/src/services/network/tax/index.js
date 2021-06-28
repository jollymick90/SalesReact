import { BaseService } from "../../common/ApiBase";

const type = "taxes";
const api = `/api/${type}`;

class TaxAPI {

    constructor() {
        this.instance = new BaseService(api)
    }

    getAll() {
        return this.instance.getAll();
    }

    get(id) {
        return this.instance.get(id);
    }

    create(data) {
        return this.instance.create(data);
    }

    update(id, data) {
        return this.instance.update(id, data);
    }

    delete(id) {
        return this.instance.delete(id);
    }

    deleteAll() {
        return this.instance.delete();
    }

}
const TaxApi = new TaxAPI();
export default TaxApi;