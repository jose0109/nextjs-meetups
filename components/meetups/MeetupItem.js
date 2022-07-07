import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

//To Navigate programmatically
import { useRouter } from "next/router";

function MeetupItem(props) {
  const router = useRouter();

  const showDetailsHandler = () => {
    // Pushing a new page into the stack of pages
    // equivalent to Link component
    // router.push("/" + props.id);
    router.push(`/${props.id}`);
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
