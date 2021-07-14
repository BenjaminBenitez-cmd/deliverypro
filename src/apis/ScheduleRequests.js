import axios from "./CustomAxios";

const address = "/schedules";

export const createOne = (values) => axios.post(address, values);

export const getMany = () => axios.get(address);

export const getActive = () => axios.get(address + "/active");

export const getOne = (id) => axios.get(`${address}/${id}`);

const ScheduleRequests = {
  createOne,
  getMany,
  getActive,
  getOne,
};

export default ScheduleRequests;
