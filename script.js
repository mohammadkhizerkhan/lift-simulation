const floors = document.getElementById("floor");
const lifts = document.getElementById("lift");
const liftContainer = document.querySelector(".lifts-container");
const floorsContainer = document.querySelector(".floors-container");
const submitBtn = document.getElementById("submit");
const allLifts = document.querySelectorAll(".lift");
const reCreateBtn = document.querySelector(".recreate-btn");
const formContainer = document.querySelector(".form");
let noOfLifts = 0;
let noOfFloors = 0;

floors.addEventListener("change", (e) => {
  noOfFloors = e.target.value;
});

lifts.addEventListener("change", (e) => {
  noOfLifts = e.target.value;
});

const openCloseDoors = (lift, position) => {
  const openTiming =
    2000 * Math.abs(position - Number(lift.dataset.liftPosition));

  const closeTiming =
    2000 * Math.abs(position - Number(lift.dataset.liftPosition)) + 2500;
  lift.setAttribute("data-lift-status", "busy");

  setTimeout(() => {
    lift.childNodes[0].classList.add("left-door-open");
    lift.childNodes[1].classList.add("right-door-open");
    lift.setAttribute("data-lift-position", position);
  }, openTiming);

  setTimeout(() => {
    lift.childNodes[0].classList.remove("left-door-open");
    lift.childNodes[1].classList.remove("right-door-open");
    lift.setAttribute("data-lift-status", "free");
  }, closeTiming);
};

const calculateClosestLift = (floorNum) => {
  const freeLifts = Array.from(document.querySelectorAll(".lift")).filter(
    (lift) => lift.dataset.liftStatus === "free"
  );
  const closest =
    freeLifts.length > 0 &&
    freeLifts.reduce(function (prev, curr) {
      return Math.abs(curr.dataset.liftPosition - floorNum) <
        Math.abs(prev.dataset.liftPosition - floorNum)
        ? curr
        : prev;
    });
  return closest;
};

const handleFloorBtn = (position) => {
  const freeLift = calculateClosestLift(position);
  const distance = 165 * (position - 1);
  if (freeLift) {
    const liftPosition = Math.abs(
      Number(freeLift.dataset.liftPosition) - position
    );
    freeLift.style.transform = `translateY(-${distance}px)`;
    freeLift.style.transition = `all ${2 * liftPosition}s linear`;
    openCloseDoors(freeLift, position);
  }
};

const createLifts = () => {
  for (let i = 0; i < Number(noOfLifts); i++) {
    const liftDiv = document.createElement("div");
    liftDiv.classList.add("lift", `lift-${i + 1}`);
    liftDiv.setAttribute("data-lift-status", "free");
    liftDiv.setAttribute("data-lift-position", "1");

    const left_door = document.createElement("div");
    left_door.classList.add("door", "left-door");

    const right_door = document.createElement("div");
    right_door.classList.add("door", "right-door");

    liftDiv.appendChild(left_door);
    liftDiv.appendChild(right_door);
    liftContainer.appendChild(liftDiv);
  }
};

const createFloors = () => {
  for (let i = Number(noOfFloors); i >= 1; i--) {
    const floorSection = document.createElement("section");
    floorSection.classList.add("floor", `floor-${i}`);

    const floorDetailsDiv = document.createElement("div");
    floorDetailsDiv.classList.add("floor-details");

    const floorHeader = document.createElement("h3");
    floorHeader.classList.add("floor-name");
    floorHeader.innerText = `Floor ${i}`;

    const floorBtnUp = document.createElement("button");
    floorBtnUp.classList.add("btn");
    floorBtnUp.innerText = "up";
    floorBtnUp.addEventListener("click", () => {
      handleFloorBtn(i);
    });

    const floorBtnDown = document.createElement("button");
    floorBtnDown.classList.add("btn");
    floorBtnDown.innerText = "down";
    floorBtnDown.addEventListener("click", () => {
      handleFloorBtn(i);
    });

    floorDetailsDiv.appendChild(floorHeader);
    i !== Number(noOfFloors) && floorDetailsDiv.appendChild(floorBtnUp);
    i !== 1 && floorDetailsDiv.appendChild(floorBtnDown);
    floorSection.appendChild(floorDetailsDiv);
    floorsContainer.appendChild(floorSection);
  }
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (noOfFloors > 15 && noOfLifts > 10) {
    alert("you can't create more than 15 floors and 10 lifts");
    floors.value = 0;
    lifts.value = 0;
  } else if (noOfFloors > 0 && noOfLifts > 0) {
    formContainer.style.display = "none";
    reCreateBtn.style.display = "block";
    createFloors();
    createLifts();
  }
});

reCreateBtn.addEventListener("click", () => {
  location.reload();
});
