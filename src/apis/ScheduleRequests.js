import axios from "./CustomAxios";

const address = "/schedules";

export const fetchScheduleRequest = () => axios.get(address);

export const deleteTimeRequest = (id) => axios.delete(`${address}/time/${id}`);

export const fetchTimeRequest = (id) => axios.get(`/time/${id}`);

export const addScheduleTime = (values) =>
  axios.post(`${address}/time`, values);

const ScheduleRequests = {
  fetchScheduleRequest,
  deleteTimeRequest,
  addScheduleTime,
  fetchTimeRequest,
};

export default ScheduleRequests;
