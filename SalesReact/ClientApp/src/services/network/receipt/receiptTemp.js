import { BaseService } from "../../common/ApiBase";

const type = "receiptsTemp";
const api = `/api/${type}`;

class ReceiptTempAPI {

    constructor() {
        this.instance = new BaseService(api)
    }

    create(data) {
        return this.instance.create(data);
    }
}
const ReceiptTempApi = new ReceiptTempAPI();
export default ReceiptTempApi;