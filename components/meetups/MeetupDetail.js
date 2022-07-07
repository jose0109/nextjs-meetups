import React from "react";

// CSS classes defined in our file will be available as properties
// on this classes object, and this will generate the appropriate
// css classes and guaranteed to be unique

import classes from "./MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <div className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </div>
  );
};

export default MeetupDetail;
