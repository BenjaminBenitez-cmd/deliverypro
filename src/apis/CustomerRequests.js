import axios from "./CustomAxios";

const address = "/customers";

const getOne = () => axios.get(address);

const CustomerRequests = {
  getOne,
};

export default CustomerRequests;
