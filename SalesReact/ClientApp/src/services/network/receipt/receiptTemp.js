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

    getPrice(good, totalItem) {

        return this.instance.getHttp().get(`${this.instance.baseApi}/getPrice`,
            {
                params: {
                    "GoodId": good.goodId,
                    "Quantity": totalItem
                }
            }
        );
    }
}
const ReceiptTempApi = new ReceiptTempAPI();
export default ReceiptTempApi;