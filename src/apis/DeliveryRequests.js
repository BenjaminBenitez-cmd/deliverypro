import axios from "./CustomAxios";

const address = "/deliveries";

const getMany = () => axios.get(address);

const getOneById = (id) => axios.get(`${address}/${id}`);

const postOne = (values) => axios.post(address, values);

const deleteOne = (id) => axios.delete(`${address}/${id}`);

const updateOne = (id, values) => axios.put(`${address}/${id}`, values);

const toggleOne = (id) => axios.put(`${address}/toggle/${id}`);

const DeliveryRequests = {
  getMany,
  deleteOne,
  getOneById,
  postOne,
  updateOne,
  toggleOne,
};

export default DeliveryRequests;
