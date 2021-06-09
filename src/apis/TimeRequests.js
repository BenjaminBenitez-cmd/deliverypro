import axios from "./CustomAxios";

const address = "/time";

export const deleteOne = (id) => axios.delete(`/schedules/time/${id}`);

export const getOneById = (id) => axios.get(`${address}/${id}`);

export const postOne = (values) => axios.post(`/schedules/time`, values);

const ScheduleRequests = {
  deleteOne,
  getOneById,
  postOne,
};

export default ScheduleRequests;
