import React, { useState } from "react";
import { Card, CardHeader, Input, Button, Row, Container } from "reactstrap";
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
          <Container>
            <Row className="justify-content-between px-0">
              <div>
                <Input
                  type="search"
                  name="search"
                  value={search}
                  onChange={handleChange}
                  placeholder="Search"
                />
              </div>
              <Button
                className="btn-inline btn-info btn-simple"
                onClick={handleToggle}
              >
                Add
              </Button>
            </Row>
          </Container>
        </CardHeader>
      </Card>
      {isAddOpen && (
        <DeliveryAddModal isOpen={isAddOpen} toggleModal={handleToggle} />
      )}
    </>
  );
};

export default SearchFilter;
