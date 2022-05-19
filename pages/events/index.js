import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";

import EventList from "../../components/events/eventList";
import EventSearch from "../../components/events/eventSearch";

const eventHomePage = () => {
  const events = getAllEvents();
  const router = useRouter();

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

export default eventHomePage;
