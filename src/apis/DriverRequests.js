import axios from './CustomAxios';

const address = '/drivers';

const fetchDrivers = () => axios.get(address);

const DriverRequests = {
    fetchDrivers
}

export default DriverRequests;