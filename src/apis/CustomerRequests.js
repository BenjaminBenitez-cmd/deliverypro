import axios from './CustomAxios';

const address = '/customers';

const getCustomers = () => axios.get(address);

const CustomerRequests = {
    getCustomers
}

export default CustomerRequests;