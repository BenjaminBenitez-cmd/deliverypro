import axios from './CustomAxios';

const address = '/deliveries';

const fetchDeliveriesRequest = () => axios.get(address);

const fetchDeliveryRequest = (id) => axios.get(`${address}/${id}`)

const postDeliveryRequest = (values) =>  axios.post(address, values);

const updateDeliveryRequest = (id, values) => axios.put(`${address}/${id}`, values);

const toggleDeliveryRequest = (id) => axios.put(`${address}/toggle/${id}`);

const DeliveryRequests = {
    fetchDeliveriesRequest,
    fetchDeliveryRequest,
    postDeliveryRequest,
    updateDeliveryRequest,
    toggleDeliveryRequest,
}

export default DeliveryRequests;