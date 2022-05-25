import { getAllEvents } from "../../util/api-util";
import { useRouter } from "next/router";

import EventList from "../../components/events/eventList";
import EventSearch from "../../components/events/eventSearch";

const eventHomePage = (props) => {
  
  const router = useRouter();
  const events =  props.events

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps(){
  const events = await getAllEvents();

  return {
    props:{
      events: events
    },
    revalidate: 600
  }


}

export default eventHomePage;
