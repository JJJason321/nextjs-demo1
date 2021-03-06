import { getFeaturedEvents } from "../util/api-util";

import EventList from "../components/events/eventList";

const HomePage = (props) =>{



    return (
        <div>
            <EventList items = {props.events} />
        </div>
    )
}


export async function getStaticProps() {

    const featuredEvents = await getFeaturedEvents();

    return {
        props:{
            events: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage

