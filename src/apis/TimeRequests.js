import axios from "./CustomAxios";

const address = "/time";

export const deleteOne = (id) => axios.delete(`/schedules/time/${id}`);

export const getOneById = (id) => axios.get(`${address}/${id}`);

export const postOne = (values) => axios.post(`/schedules/time`, values);

export const updateOne = (id, values) =>
  axios.put(`/schedules/time/${id}`, values);

const TimeRequests = {
  deleteOne,
  getOneById,
  postOne,
  updateOne,
};

export default TimeRequests;
