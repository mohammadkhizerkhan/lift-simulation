const floors = document.getElementById("floor");
const lifts = document.getElementById("lift");
const liftContainer = document.querySelector(".lifts-container");
const floorsContainer = document.querySelector(".floors-container");
const submitBtn = document.getElementById("submit");
let noOfLifts = 0;
let noOfFloors = 0;

floors.addEventListener("change", (e) => {
  noOfFloors = e.target.value;
});

lifts.addEventListener("change", (e) => {
  noOfLifts = e.target.value;
});

const moveLift = (position) => {
  const lifts = document.querySelectorAll(".lift");
  const distance = 165 * (position - 1);
  lifts[0].style.transform = `translateY(-${distance}px)`;
  lifts[0].style.transition = `all ${2}s linear`;
};

const handleFloorBtn = (floorNum) => {
  console.log("=======", floorNum);
  moveLift(floorNum);
};

const createLifts = () => {
  for (let i = 0; i < Number(noOfLifts); i++) {
    const liftDiv = document.createElement("div");
    liftDiv.classList.add("lift", `lift-${i + 1}`);
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
    floorBtnUp.classList.add("primary-btn");
    floorBtnUp.innerText = "up";
    floorBtnUp.addEventListener("click", () => {
      handleFloorBtn(i);
    });

    const floorBtnDown = document.createElement("button");
    floorBtnDown.classList.add("primary-btn");
    floorBtnDown.innerText = "down";
    floorBtnDown.addEventListener("click", () => {
      handleFloorBtn(i);
    });

    console.log("-----", i === noOfFloors);
    floorDetailsDiv.appendChild(floorHeader);
    i !== Number(noOfFloors) && floorDetailsDiv.appendChild(floorBtnUp);
    i !== 1 && floorDetailsDiv.appendChild(floorBtnDown);
    floorSection.appendChild(floorDetailsDiv);
    floorsContainer.appendChild(floorSection);
  }
};

submitBtn.addEventListener("click", () => {
  createFloors();
  createLifts();
});
