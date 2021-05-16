import { filterDeliveries } from "redux/deliveries/DeliverySlice";
import { useDispatch, useSelector } from "react-redux";

//a hook used to dispatch a filter type the values to dispatch
//are determined by the event passed on to the filterItems function

export const useFilter = () => {
  const dispatch = useDispatch();
  const { deliveries } = useSelector((state) => state.deliveries);
  const filterItems = (e) => {
    dispatch(
      filterDeliveries({
        column: e.target.name,
        value: e.target.value,
        checked: e.target.checked,
      })
    );
  };
  return { deliveries, filterItems };
};
