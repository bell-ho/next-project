export const getAllEvents = async () => {
  const res = await fetch('https://meet-up-c8c64-default-rtdb.firebaseio.com/events.json').catch(
    (res) => console.log(res),
  );
  const data = await res.json();
  return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getFilteredEvents = async (dateFilter) => {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  return allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
};

export const getEventById = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
