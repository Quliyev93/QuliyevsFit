const $ = (id) => document.getElementById(id);


const inputAgeElement = $("inputAge");
const inputHeightElement = $("inputHeight");
const inputWeightElement = $("inputWeight");
const workActivityElement = $("workActivity")
const submitBtn = $("submit");
const resetBtn = $("reset");
const resultCalorieElement = $("resultCalorie");
const resultWeightElement = $("resultWeight");
const resultProteinElement = $("resultProtein");
const resultCarbElement = $("resultCarb")
const genders = document.querySelectorAll('input[name="gender"]');
const aims = document.querySelectorAll('input[name="aim"]');



let selectedAim = document.querySelector('input[name="aim"]:checked') ? document.querySelector('input[name="aim"]:checked').value : null;
aims.forEach(aim => {
    aim.addEventListener("change", () => {
        selectedAim = aim.value
    })
});


function purpose(calNumber) {
    if (selectedAim == "aim1") {
        calNumber = Math.round(calNumber)
    } else if (selectedAim == "aim2") {
        calNumber = (Math.round(calNumber) - 300)
    } else if (selectedAim == "aim3") {
        calNumber = (Math.round(calNumber) - 500)
    } else if (selectedAim == "aim4") {
        calNumber = (Math.round(calNumber) + 300)
    } else if (selectedAim == "aim5") {
        calNumber = (Math.round(calNumber) + 500)
    } else {
        calNumber = Math.round(calNumber)
    }

    resultCalorieElement.innerText = calNumber + "" + "kcal/gün";
    carb(calNumber)
};


function carb(calNumber) {
    const carbNumberMin = Math.round(((calNumber / 100) * 45) / 4);
    const carbNumberMax = Math.round(((calNumber / 100) * 65) / 4);
    resultCarbElement.innerText = `${carbNumberMin} q - ${carbNumberMax} q`
}

function prot() {
    const protNumberMin = Math.round(inputWeightElement.value * 1.2)
    const protNumberMax = Math.round(inputWeightElement.value * 2)
    resultProteinElement.innerText = `${protNumberMin} q - ${protNumberMax} q`
}

function TDEEMen() {
    bestWeight();
    getActivity();
    const calNumber = activityNum * (66.5 + (13.75 * inputWeightElement.value) + (5 * inputHeightElement.value) - (6.77 * inputAgeElement.value));
    resultCalorieElement.innerText = Math.round(calNumber) + "" + "kcal/gün";
    purpose(calNumber);
};

function TDEEWomen() {
    bestWeight();
    getActivity();
    const calNumber = activityNum * (655.1 + (9.56 * inputWeightElement.value) + (1.85 * inputHeightElement.value) - (4.67 * inputAgeElement.value));
    resultCalorieElement.innerText = Math.round(calNumber) + "" + "kcal/gün";
    purpose(calNumber);
}



let selectedGender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : null;
genders.forEach(gender => {
    gender.addEventListener("change", () => {
        selectedGender = gender.value
    })
});


submitBtn.addEventListener("click", () => {
    if (selectedGender === 'male') {
        TDEEMen()
    } else if (selectedGender === 'female') {
        TDEEWomen()
    } else {
        console.log("Please select a valid gender.");
    }
    prot()
});


resetBtn.addEventListener("click", () => {
    resetInput();
});



let activityNum = 1.2;

function getActivity() {
    if (workActivityElement.value == 0) {
        activityNum = 1.2
    } else if (workActivityElement.value == 1) {
        activityNum = 1.3
    } else if (workActivityElement.value == 2) {
        activityNum = 1.5
    } else if (workActivityElement.value == 3) {
        activityNum = 1.7
    } else if (workActivityElement.value == 4) {
        activityNum = 1.9
    } else {
        activityNum = 1.2
    }
}

let HeightValueMain = 0;
let resultWeight = 0;


function bestWeight() {
    HeightValueMain = inputHeightElement.value / 100;

    resultWeight = inputWeightElement.value / (HeightValueMain * HeightValueMain);

    if (resultWeight < 18.5) {
        resultWeightElement.innerText = `Arıqsan 
        Normal kilo aralığı = (${Math.round(19 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(25 * (HeightValueMain * HeightValueMain))} kg)
        İdeal kilo aralığı = (${Math.round(23 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(24 * (HeightValueMain * HeightValueMain))} kg)`
    } else if (resultWeight >= 18.5 && resultWeight < 21) {
        resultWeightElement.innerText = ` Normalsan
        Normal kilo aralığı = (${Math.round(19 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(25 * (HeightValueMain * HeightValueMain))} kg)
         İdeal kilo aralığı = (${Math.round(23 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(24 * (HeightValueMain * HeightValueMain))} kg)`
    } else if (resultWeight >= 22 && resultWeight <= 24) {
        resultWeightElement.innerText = `İdealsan
        Normal kilo aralığı = (${Math.round(19 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(25 * (HeightValueMain * HeightValueMain))} kg)
         İdeal kilo aralığı = (${Math.round(23 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(24 * (HeightValueMain * HeightValueMain))} kg)`
    } else if (resultWeight >= 23 && resultWeight < 25) {
        resultWeightElement.innerText = `Normalsan
        Normal kilo aralığı = (${Math.round(19 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(25 * (HeightValueMain * HeightValueMain))} kg)
         İdeal kilo aralığı = (${Math.round(23 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(24 * (HeightValueMain * HeightValueMain))} kg)`
    } else if (resultWeight >= 25 && resultWeight <= 29.99) {
        resultWeightElement.innerText = `Biraz köksən
        Normal kilo aralığı = (${Math.round(19 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(25 * (HeightValueMain * HeightValueMain))} kg)
         İdeal kilo aralığı = (${Math.round(23 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(24 * (HeightValueMain * HeightValueMain))} kg)`
    } else if (resultWeight >= 30 && resultWeight <= 39.99) {
        resultWeightElement.innerText = `Köksən 
        Normal kilo aralığı = (${Math.round(19 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(25 * (HeightValueMain * HeightValueMain))} kg)
         İdeal kilo aralığı = (${Math.round(23 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(24 * (HeightValueMain * HeightValueMain))} kg)`
    } else if (resultWeight >= 40) {
        resultWeightElement.innerText = `Obezsən(Kutarmısan)
        Normal kilo aralığı = (${Math.round(19 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(25 * (HeightValueMain * HeightValueMain))} kg)
         İdeal kilo aralığı = (${Math.round(23 * (HeightValueMain * HeightValueMain))} kg - ${Math.round(24 * (HeightValueMain * HeightValueMain))} kg)`
    }

};

function resetInput() {
    inputAgeElement.value = "";
    inputHeightElement.value = "";
    inputWeightElement.value = "";
    workActivityElement.value = "0";
    resultCalorieElement.innerText = "0 kal/gün";
    resultWeightElement.innerText = "0 kg";
    resultProteinElement.innerText = "0 q"
    resultCarbElement.innerText = "0 q"
}




