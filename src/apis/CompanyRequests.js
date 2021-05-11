import axios from "./CustomAxios";
const address = "/company";
const getCompanyRequest = () => axios.get(address);

const CompanyRequests = {
  getCompanyRequest,
};

export default CompanyRequests;
