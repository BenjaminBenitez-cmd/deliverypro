import axios from "./CustomAxios";

const address = "/deliveries";

const getMany = () => axios.get(address);

const getOneById = (id) => axios.get(`${address}/${id}`);

const postOne = (values) => axios.post(address, values);

const updateOne = (id, values) => axios.put(`${address}/${id}`, values);

const toggleOne = (id) => axios.put(`${address}/toggle/${id}`);

const DeliveryRequests = {
  getMany,
  getOneById,
  postOne,
  updateOne,
  toggleOne,
};

export default DeliveryRequests;
