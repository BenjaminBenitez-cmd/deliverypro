import React from "react";

const TableRow = ({ handleToggle, properties }) => (
  <tr key={properties.id} onClick={() => handleToggle(properties.id)}>
    <td>
      <h5 className="pl-0">{properties.name}</h5>
      <p className="text-muted">
        {properties.verified ? "Verified" : "Unverified"}
      </p>
    </td>
  </tr>
);

export default TableRow;
