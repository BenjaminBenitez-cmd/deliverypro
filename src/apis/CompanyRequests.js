import axios from "./CustomAxios";
const address = "/company";

const getOne = () => axios.get(address);
const updateAddress = (values) => axios.put(address, values);

const CompanyRequests = {
  getOne,
  updateAddress,
};

export default CompanyRequests;
