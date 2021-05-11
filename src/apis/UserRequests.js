import axios from "./CustomAxios";

const address = "/user";

export const updateUser = (values) => axios.put(address, values);

const UserRequests = {
  updateUser,
};

export default UserRequests;
