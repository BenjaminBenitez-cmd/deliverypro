import React from "react";

const Loading = (props) => {
  switch (props.status) {
    case "loading":
      return <div>Loading</div>;
    case "success":
      return props.children;
    case "failed":
      return <div>Something went wrong contact us</div>;
    default:
      return props.children;
  }
};

export default Loading;
