import axios from "./CustomAxios";
const address = "/addresses";

const getAddressesRequest = () => axios.get(address);

const AddressRequests = {
  getAddressesRequest,
};

export default AddressRequests;
