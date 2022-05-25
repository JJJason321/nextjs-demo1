import React from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/eventList";
import { getFilteredEvents } from "../../util/api-util";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const filteredEventPage = (props) => {
  
  // const router = useRouter();
  // const filterData = router.query.slugs;

  // if (!filterData) {
  //   return (
  //     <ErrorAlert>
  //       <p>No Event Found!</p>
  //     </ErrorAlert>
  //   );
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // if (
  //   isNaN(numMonth) ||
  //   isNaN(numYear) ||
  //   numYear > 2030 ||
  //   numYear < 2021 ||
  //   numMonth < 1 ||
  //   numMonth > 12
  // ) {
  //   return (
  //     <React.Fragment>
  //       <ErrorAlert>
  //         <p>Invalid filter inputs, please try again</p>
  //       </ErrorAlert>
  //       <div className="center">
  //         <Button link="/events">Show All Events</Button>
  //       </div>
  //     </React.Fragment>
  //   );
  // }

  // const inputObj = { year: numYear, month: numMonth };
  // const filteredEvents = getFilteredEvents(inputObj);

  const events = props.events

  console.log(events);

  if (props.hasError) {
    return (
      <React.Fragment>
        <ErrorAlert>
          <p>No events found for given filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }

  if(props.events.length === 0){
    return(
      <React.Fragment>
        <ErrorAlert>
          <p>No events found for given time</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    )
  }

  const date = new Date(props.date.year, props.date.month -1 );

  return (
    <React.Fragment>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slugs;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props:{hasError: true}
    }
  }

  const inputObj = { year: numYear, month: numMonth };
  const filteredEvents = await getFilteredEvents(inputObj);



  return {
    props: {
      events: filteredEvents,
      date:{
        year: numYear,
        month: numMonth
      }
    },
  };
}

export default filteredEventPage;
