import axios from "./CustomAxios";
const address = "/addresses";

const getOne = () => axios.get(address);

const AddressRequests = {
  getOne,
};

export default AddressRequests;
