import axios from "./CustomAxios";

const address = "/deliveries";

const getMany = () => axios.get(address);

const getOneById = (id) => axios.get(`${address}/${id}`);

const postOne = (values) => axios.post(address, values);

const deleteOne = (id) => axios.delete(`${address}/${id}`);

const updateOne = (id, values) => axios.put(`${address}/${id}`, values);

const toggleOne = (id) => axios.put(`${address}/toggle/${id}`);

const getShareableLink = (delivery_id, client_id) =>
  axios.post(`${address}/sharablelink`, { delivery_id, client_id });

const DeliveryRequests = {
  getShareableLink,
  getMany,
  deleteOne,
  getOneById,
  postOne,
  updateOne,
  toggleOne,
};

export default DeliveryRequests;
