import React, { useState } from "react";
import { useFilter } from "hooks/useFilter";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Button,
  Row,
} from "reactstrap";
import DeliveryAddModal from "components/Modals/DeliveryAddModal";

const SearchFilter = () => {
  const { filterItems } = useFilter();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleToggle = () => {
    setIsAddOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    filterItems(e);
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
        <CardFooter>
          <Button color="primary" className="btn-simple">
            Select All
          </Button>
          <Button color="primary" className="btn-simple" disabled>
            Delete
          </Button>
          <Button color="primary" className="btn-simple" disabled>
            Archive
          </Button>
        </CardFooter>
      </Card>
      {isAddOpen && (
        <DeliveryAddModal
          isOpen={isAddOpen}
          toggleModal={handleToggle}
          information={{ hello: "hello" }}
        />
      )}
    </>
  );
};

export default SearchFilter;
