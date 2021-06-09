import axios from "./CustomAxios";

const address = "/drivers";

const getOne = () => axios.get(address);

const DriverRequests = {
  getOne,
};

export default DriverRequests;
