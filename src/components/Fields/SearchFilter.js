import React, { useState } from "react";
import { Card, CardBody, CardHeader, Input, Button, Row } from "reactstrap";
import DeliveryAddModal from "components/Modals/DeliveryAddModal";
import { useDispatch } from "react-redux";
import { filterDeliveries } from "redux/deliveries/DeliverySlice";

const SearchFilter = () => {
  const dispatch = useDispatch();
  // const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // const toggleSelectAll = () => {
  //   setSelectAll(!selectAll);
  // };

  const handleToggle = () => {
    setIsAddOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch(filterDeliveries({ value: e.target.value, data: "first_name" }));
  };

  return (
    <>
      <Card className="card-plain">
        <CardHeader>
          <Row className="justify-content-between px-3">
            <Button
              color="primary"
              className="btn-inline"
              onClick={handleToggle}
            >
              Add
            </Button>
          </Row>
        </CardHeader>
        <CardBody>
          <Input
            type="search"
            name="search"
            value={search}
            onChange={handleChange}
            placeholder="Search"
          />
        </CardBody>
        {/* <CardFooter>
          <Button
            color="primary"
            className="btn-simple"
            onClick={toggleSelectAll}
          >
            {selectAll ? "Deselect" : "Select All"}
          </Button>
          <Button color="primary" className="btn-simple" disabled={!selectAll}>
            Delete
          </Button>
          <Button color="primary" className="btn-simple" disabled={!selectAll}>
            Archive
          </Button>
        </CardFooter> */}
      </Card>
      {isAddOpen && (
        <DeliveryAddModal isOpen={isAddOpen} toggleModal={handleToggle} />
      )}
    </>
  );
};

export default SearchFilter;
