import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeliveries } from 'features/deliveries/DeliverySlice';
import { filterDeliveries } from 'features/deliveries/DeliverySlice';

const filter = ({ deliveries, filter: fl }) => {
    const isChecked = fl.checked;
    switch(fl.column) {
        case 'date':
            return deliveries.filter(item => {
                return item.delivery_date.toLowerCase().includes(fl.value.toLowerCase());
                                
            })
        case 'province':
            if(!isChecked) {
                return deliveries
            }
            return deliveries.filter(item => {
                return item.district.toLowerCase().includes(fl.value.toLowerCase());
            })
        case 'status':
            return deliveries.map(item => {
                return item.delivery_status === fl.value;
            }) 
        case 'search':
            return deliveries.filter(item => {
                return item.first_name.toLowerCase().includes(fl.value.toLowerCase());
            })
        default:
            return deliveries;

    }
}


function useGetDeliveries (){
    const dispatch = useDispatch();
    const state = useSelector(state => state.deliveries);
    const filterItems = (e) => {
        dispatch(filterDeliveries({ column: e.target.name, value: e.target.value, checked: e.target.checked }))
    }
    useEffect(() => {
        dispatch(getDeliveries());
    }, [])

    return {deliveries: filter(state), filterItems} ;
}

export default useGetDeliveries;


