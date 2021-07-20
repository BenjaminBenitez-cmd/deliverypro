import axios from "./CustomAxios";

export const deleteOne = (scheduleid, timeid) =>
  axios.delete(`/schedules/${scheduleid}/time/${timeid}`);

export const getOneById = (scheduleid, timeid) =>
  axios.get(`/schedules/${scheduleid}/time/${timeid}`);

export const postOne = (scheduleid, values) =>
  axios.post(`/schedules/${scheduleid}/time`, values);

export const updateOne = (scheduleid, timeid, values) =>
  axios.put(`/schedules/${scheduleid}/time/${timeid}`, values);

const TimeRequests = {
  deleteOne,
  getOneById,
  postOne,
  updateOne,
};

export default TimeRequests;
