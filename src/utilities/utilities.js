export const statustoText = (status) => {
    if(status) {
        return (<span className="text-success">Fullfilled</span>)
    } else {
        return (<span className="text-info">Pending</span>);
    }
}

export const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user'));

export const setUserToLocalStorage = (value) => localStorage.setItem('user', JSON.stringify(value));

export const removeUserFromLocalStorage = () => localStorage.removeItem('user');

  
 