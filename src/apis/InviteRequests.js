import axios from "./CustomAxios";

const address = "/invites";

const getOne = () => axios.get(address);

const postOne = (values) => axios.post(address, values);

const InviteRequests = {
  getOne,
  postOne,
};

export default InviteRequests;
