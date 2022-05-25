import React from "react";

import { getEventById, getAllEvents } from "../../util/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const eventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found!</p>
      </ErrorAlert>
    );
  }

  return (
    <React.Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </React.Fragment>
  );
};

export async function getStaticProps(context) {

  

  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
    },
    revalidate: 900
  };
}
 
export async function getStaticPaths() {

  const allEvent = await getAllEvents();
  const paths = allEvent.map(
    e => ({
      params: {eventId: e.id}
    })
  )

  return {
    paths: paths,
    fallback: false
  };
}

export default eventDetailPage;
