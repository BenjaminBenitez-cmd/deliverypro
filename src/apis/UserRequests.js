import axios from "./CustomAxios";

const address = "/user";

export const updateOne = (values) => axios.put(address, values);

const UserRequests = {
  updateOne,
};

export default UserRequests;
