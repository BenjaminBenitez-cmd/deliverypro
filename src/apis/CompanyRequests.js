import axios from "./CustomAxios";
const address = "/company";

const getOne = () => axios.get(address);

const CompanyRequests = {
  getOne,
};

export default CompanyRequests;
