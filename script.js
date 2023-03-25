
const floors=document.getElementById('floor')
const lifts=document.getElementById('lift')
const liftContainer=document.querySelector('.lifts-container');
const floorsContainer=document.querySelector('.floors-container');
const submitBtn=document.getElementById('submit')
let noOfLifts=0;
let noOfFloors=0;

floors.addEventListener('change',(e)=>{
    noOfFloors=e.target.value;
})

lifts.addEventListener('change',(e)=>{
    noOfLifts=e.target.value;
})

const createLifts=()=>{
    for(let i=0;i<Number(noOfLifts);i++){
        const liftDiv=document.createElement("div");
        liftDiv.classList.add('lift');
        liftContainer.appendChild(liftDiv)
    }
}

const createFloors=()=>{
    for(let i=Number(noOfFloors);i>=0;i--){

        const floorSection=document.createElement("section");
        floorSection.classList.add('floor');

        const floorDetailsDiv=document.createElement("div");
        floorDetailsDiv.classList.add('floor-details');

        const floorHeader=document.createElement("h3");
        floorHeader.classList.add('floor-name');
        floorHeader.innerText=`Floor ${i}`
    

        const floorBtnUp=document.createElement("button");
        floorBtnUp.classList.add('primary-btn');
        floorBtnUp.innerText='up'


        const floorBtnDown=document.createElement("button");
        floorBtnDown.classList.add('primary-btn');
        floorBtnDown.innerText='down'

        floorDetailsDiv.appendChild(floorHeader)
        floorDetailsDiv.appendChild(floorBtnUp)
        floorDetailsDiv.appendChild(floorBtnDown)
        floorSection.appendChild(floorDetailsDiv)
        floorsContainer.appendChild(floorSection)
    }
}

submitBtn.addEventListener('click',()=>{
  createFloors()
    createLifts();
})




