//import
import axios from 'axios';

//constant
const prefix_api = "https://api-dev.all-posonline.net";
// const prefix_api = 'https://pycjh7udr7.execute-api.ap-southeast-1.amazonaws.com/prd';
// const prefix_api2 = "https://g5ull09frb.execute-api.ap-southeast-1.amazonaws.com/dev";
const prefix_api2 = 'https://ejkjg9twtk.execute-api.ap-southeast-1.amazonaws.com/prd';

// const prefix_api3 = 'https://g5ull09frb.execute-api.ap-southeast-1.amazonaws.com/dev';



export async function get_store_api(apiRequest) {
    return await axios.post(prefix_api+'/backend/getstore', apiRequest);
}

export async function get_transaction_count(apiRequest){
    return await axios.post(prefix_api+'/backend/gettransactioncount',apiRequest);
}

export async function get_transaction_by_store_api(apiRequest) {
    return await axios.post(prefix_api+'/backend/gettransaction', apiRequest);
}

export async function get_receipt_by_receiptno_api(apiRequest) {
    return await axios.post(prefix_api+'/backend/getreceipt', apiRequest);
}

export async function resend_by_receiptno_api(apiRequest) {
    return await axios.post(prefix_api2+'/backend/resendmessage', apiRequest);
}

export async function get_store_info_api(apiRequest){
    return await axios.post(prefix_api2+'/getstoreinfo',apiRequest)
}

export async function set_one_touch(apiRequest){
    return await axios.post(prefix_api+'/backend/setonetouch',apiRequest)
}