import axios from "./CustomAxios";

const address = "/schedules";

export const getOne = () => axios.get(address);

const ScheduleRequests = {
  getOne,
};

export default ScheduleRequests;
