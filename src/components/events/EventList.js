import React, { Children } from 'react';
import EventItem from '@/components/events/EventItem';
import classes from './EventList.module.css';

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {Children.toArray(
        items.map((value) => (
          <EventItem
            id={value.id}
            title={value.title}
            location={value.location}
            date={value.date}
            image={value.image}
          />
        )),
      )}
    </ul>
  );
};

export default EventList;
