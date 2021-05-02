import axios from './CustomAxios';

const address = '/invites';

const fetchInvites = () => axios.get(address);

const addInvite = (values) =>  axios.post(address, values);

const InviteRequests = {
    fetchInvites,
    addInvite
}

export default InviteRequests;