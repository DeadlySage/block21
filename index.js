// ====State====

// API
const URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2503-FTB-ET-WEB-FT/events";

// stores the event list objects
const eventInfo = [];

// ====CRUD functions====

// CRUD: Create (POST)
const createEvent = async (eventObj) => {
  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventObj),
    });
  } catch (error) {
    console.error(error);
  }
};

// CRUD: READ (GET)
const getEvents = async () => {
  try {
    const response = await fetch(`${URL}`);

    const json = await response.json();

    return json.data;
  } catch (error) {
    console.error(error);
  }
};

// CRUD: Delete (DELETE)
const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });

    // const json = await response.json();

    // console.log(json);
  } catch (error) {
    console.error(error);
  }
};

// ====Renderer====

// renders the events list
const renderEvents = async () => {

  // wait for getEvents
  const eventList = await getEvents();

  for (let i = 0; i < eventList.length; i++) {
    // create a div structure
    const div1 = document.createElement("div");
    div1.classList.add("d-flex", "text-body-secondary", "pt-3", "eventContainer");

    const div2 = document.createElement("div");
    div2.classList.add(
      "pb-3",
      "mb-0",
      "small",
      "lh-sm",
      "border-bottom",
      "w-100"
    );

    const div3 = document.createElement("div");
    div3.classList.add("d-flex", "justify-content-between");

    // create div3 children
    const strong = document.createElement("strong");
    strong.classList.add("text-gray-dark");
    strong.textContent = eventList[i].name;

    const button1 = document.createElement("button");
    button1.classList.add("btn", "btn-primary", "deleteBtn");
    button1.type = "button";
    button1.textContent = "Delete Event";

    // create div2 children
    const span1 = document.createElement("span");
    span1.textContent = "Location: ";

    span1.classList.add("d-block", "ps-2");
    const p1 = document.createElement("p");
    p1.textContent = eventList[i].location;

    const span2 = document.createElement("span");
    span2.textContent = "Date: ";

    span2.classList.add("d-block", "ps-2");
    const p2 = document.createElement("p");
    p2.textContent = eventList[i].date;

    const span3 = document.createElement("span");
    span3.textContent = "Event Description: ";

    span3.classList.add("d-block", "ps-2");
    const p3 = document.createElement("p");
    p3.textContent = eventList[i].description;

    // add elements to the HTML
    const eventListMaster = document.querySelector("#eventList");

    // eventListmaster children
    eventListMaster.appendChild(div1);

    // div1 children
    div1.appendChild(div2);

    // div2 children
    div2.appendChild(div3);
    div2.appendChild(span1);
    span1.appendChild(p1);
    div2.appendChild(span2);
    span2.appendChild(p2);
    div2.appendChild(span3);
    span3.appendChild(p3);

    // div3 children
    div3.appendChild(strong);
    div3.appendChild(button1);

    button1.addEventListener("click", async () => {
      await deleteEvent(eventList[i].id);
      //renderEvents(); // trying to automatically reload the event list sometimes breaks
    })
  }
};

// submits new event listed in form to API
const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // grab data from forms
  const data = new FormData(event.target);

  // creates an object from the 4 data points from the form
  const eventObj = {
    name: data.get("name"),
    date: data.get("date"),
    location: data.get("location"),
    description: data.get("description"),
  };

  // add new event to API
  createEvent(eventObj);

  // empty form fields after user submits
  form.reset();

  // updates event list
  //renderEvents(); // trying to automatically reload the event list sometimes breaks
});

// ====Script====

// updates the Events list from the API upon initilization
renderEvents();
