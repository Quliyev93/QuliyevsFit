
const tbodyElement = document.getElementById("tbody");
const searchInputElement = document.getElementById("searchInput");
const cartList = document.getElementById("cartList");
const generalCalculateBtn = document.getElementById("generalCalculate");
const totalCalories = document.getElementById("totalCalories");
const totalProtein = document.getElementById("totalProtein");
const totalCarbohydrate = document.getElementById("totalCarbohydrate");
const totalOil = document.getElementById("totalOil");
const totalSugar = document.getElementById("totalSugar");
const resetValuesBtn = document.getElementById("resetValues");
const showModal = document.getElementById("show")


function getFetchFood() {
    fetch("../js/food.json")
        .then(res => res.json())
        .then(data => {
            if (tbodyElement) {
                data.forEach(element => {
                    const row = document.createElement("tr");
                    row.classList.add("food-row");
                    row.innerHTML += `    
                <tr>
                    <td>${element.foodName}</td>
                    <td>${element.calories}</td>
                    <td>${element.protein}</td>
                    <td>${element.carbohydrate}</td>
                    <td>${element.oil}</td>
                    <td>${element.sugar}</td>
                    <td class="display_flex">
                    <button class="btn btn-outline-primary custom-pointer" onclick="addFood('${element.foodName} ', ' ${element.calories} ', ' ${element.protein} ', ' ${element.carbohydrate} ', ' ${element.oil} ', ' ${element.sugar}')">
                     <i class="fa-solid fa-plus d-flex justify-content-center"></i>
                    </button>
                            
                    </td>
                </tr>`
                    tbodyElement.appendChild(row);
                })
            }

        })

        .catch(error => console.error(error));
}

let cartItems = [];

function addFood(foodName, calories, protein, carbohydrate, oil, sugar) {
    const listItem = document.createElement("li");
    listItem.textContent = `${foodName} - Kalori: ${calories}kal, Zülal: ${protein}qr, Karbonhidrat: ${carbohydrate}qr, Yağ: ${oil}qr, Şəkər: ${sugar}qr`;
    cartList.appendChild(listItem);

    cartItems.push({ foodName, calories: parseInt(calories), protein: parseInt(protein), carbohydrate: parseInt(carbohydrate), oil: parseInt(oil), sugar: parseInt(sugar) });


}

if (resetValuesBtn) {
    resetValuesBtn.addEventListener("click", () => {
        totalCalories.textContent = "Toplam Kalori: 0kal";
        totalProtein.textContent = "Toplam Zülal: 0qr";
        totalCarbohydrate.textContent = "Toplam Karbonhidrat: 0qr";
        totalOil.textContent = "Toplam Yağ: 0qr";
        totalSugar.textContent = "Toplam Şəkər: 0qr";
        cartList.textContent = "";
        cartItems.length = 0;
        cartList.classList.remove("active_list")
    })
}

if (generalCalculateBtn) {
    generalCalculateBtn.addEventListener("click", () => {
        let totalCaloriesValue = 0;
        let totalProteinValue = 0;
        let totalCarbohydrateValue = 0;
        let totalOilValue = 0;
        let totalSugarValue = 0;

        cartItems.forEach(item => {
            totalCaloriesValue += item.calories;
            totalProteinValue += item.protein;
            totalCarbohydrateValue += item.carbohydrate;
            totalOilValue += item.oil;
            totalSugarValue += item.sugar;
        });

        totalCalories.textContent = `Toplam Kalori: ${totalCaloriesValue}kal`;
        totalProtein.textContent = `Toplam Zülal: ${totalProteinValue}qr`;
        totalCarbohydrate.textContent = `Toplam Karbonhidrat: ${totalCarbohydrateValue}qr`;
        totalOil.textContent = `Toplam Yağ: ${totalOilValue}qr`;
        totalSugar.textContent = `Toplam Şəkər: ${totalSugarValue}qr`;
    });
}


document.addEventListener("DOMContentLoaded", function () {

    if (searchInputElement) {
        searchInputElement.addEventListener("keyup", function () {
            const searchTerm = searchInputElement.value.toLowerCase();

            const rows = document.querySelectorAll(".food-row");
            rows.forEach(row => {
                const foodName = row.cells[0].textContent.toLowerCase();
                if (foodName.includes(searchTerm)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }
});


showModal.addEventListener("click", () => {
    const cartListHeight = parseInt(window.getComputedStyle(cartList).height, 10);

    if (cartListHeight >= 100) {
        cartList.classList.toggle("active_list");
    }
})

getFetchFood();





