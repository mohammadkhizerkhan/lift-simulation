let addLiftArray = []; //
let floorArray = []; // use for looping floors
let liftArray = []; // use for looping lifts
let busyLift = [];
let leftRequest = [];
let no_of_floors;
let no_of_lifts;
const submit = document.querySelector("#submit-button");

function submitHandler(e) {
  e.preventDefault();
  const totalFloors = document.querySelector("#floors");
  const totalLifts = document.querySelector("#lifts");

  // Assigning how many floors and lift to create
  no_of_floors = totalFloors.value;
  no_of_lifts = totalLifts.value;

  // Empty form data
  totalFloors.innerText = "";
  totalLifts.innerText = "";

  // Disabled form
  const formData = document.querySelector(".form");
  const heading = document.querySelector(".heading");
  formData.style.display = "none";
  heading.style.display = "none";

  for (let i = 0; i < no_of_floors; i++) {
    floorArray.push(i);
  }
  for (let i = 0; i < no_of_lifts; i++) {
    liftArray.push(i);
    busyLift = [...busyLift, { lift: i + 1, busy: false, currentFloor: 0 }];
  }
  addFloor();
  addLifts();
}

function addFloor() {
  const floorContainer = document.querySelector(".floor-container");
  const floors = floorArray
    ?.map(
      (item, index) => `<div class="floor" key=${index} data-floor-value=${
        index + 1
      }>
      <div>Floor ${index + 1}</div>
      <div>
        ${
          index !== floorArray.length - 1
            ? `<button onclick="clickButtonHandler(${index})">Up</button>`
            : ""
        }
        ${
          index !== 0
            ? `<button onclick="clickButtonHandler(${index})">Down</button>`
            : ""
        }
      </div>
    </div>`
    )
    .join("");
  floorContainer.innerHTML = floors;

  addLifts();
}

function addLifts() {
  const liftContainer = document.querySelector(".lift-container");
  const lift = liftArray
    ?.map(
      (
        item,
        index
      ) => `<div class="lift" onclick="openLiftDoors()" key=${index} data-lift=${index}>
          <div class="left-door"></div>
          <div class="right-door"></div>
        </div>`
    )
    .join("");
  liftContainer.innerHTML = lift;
}

function clickButtonHandler(floor) {
  leftRequest = [...leftRequest, floor];
  moveLifts(floor);
}

function moveLifts(floor) {
  const freeLiftIndex = checkShortestDistanceLift(floor);
  // console.log(freeLiftIndex);
  // if no lift is free
  if (freeLiftIndex < 0) return;
  else {
    leftRequest.shift();
    const liftWithAttribute = document.querySelector(
      `[data-lift="${freeLiftIndex}"]`
    );
    changeLiftStatusToTrue(freeLiftIndex);
    liftWithAttribute.style.transitionDuration = `${
      Math.abs(floor - busyLift[freeLiftIndex].currentFloor) * 2.5
    }s`;
    liftWithAttribute.style.transform = `translateY(-${floor * 100}px)`;
    setTimeout(() => {
      openLiftDoors(freeLiftIndex);
      // Lift will take 5 minutes to open and close the door
      setTimeout(() => {
        changeLiftStatusToFalse(freeLiftIndex);
      }, 5000);
    }, Math.abs(floor - busyLift[freeLiftIndex].currentFloor) * 2000);
    busyLift[freeLiftIndex].currentFloor = floor;
  }
}

function checkShortestDistanceLift(floor) {
  let getShortestDistanceLiftIndex = 0;
  let data = Math.abs(busyLift[0].currentFloor - floor);
  for (let i = 1; i < busyLift.length; i++) {
    if (data > Math.abs(busyLift[i].currentFloor - floor)) {
      getShortestDistanceLiftIndex = i;
      data = Math.abs(busyLift[i].currentFloor - floor);
    }
  }
  // if lift is busy
  if (busyLift[getShortestDistanceLiftIndex].busy === false)
    return getShortestDistanceLiftIndex;
  // free lift
  else {
    let getLiftIndex = busyLift.findIndex((item) => item.busy === false);
    return getLiftIndex;
  }
}

function changeLiftStatusToFalse(liftIndex) {
  let data = busyLift.map((item, index) =>
    index === liftIndex ? { ...item, busy: false } : item
  );
  busyLift = data;
  if (leftRequest.length > 0) {
    moveLifts(leftRequest[0]);
  }
}

function changeLiftStatusToTrue(liftIndex) {
  let data = busyLift.map((item, index) =>
    index === liftIndex ? { ...item, busy: true } : item
  );
  busyLift = data;
}

function openLiftDoors(freeLiftIndex) {
  const leftDoor = document.querySelector(
    `[data-lift="${freeLiftIndex}"] .left-door`
  );
  const rightDoor = document.querySelector(
    `[data-lift="${freeLiftIndex}"] .right-door`
  );

  leftDoor.style.width = "0px";
  rightDoor.style.width = "0px";

  setTimeout(() => {
    leftDoor.style.width = "50%";
    rightDoor.style.width = "50%";
  }, 2500);
}

submit.addEventListener("click", submitHandler);
