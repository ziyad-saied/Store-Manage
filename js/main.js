//call all elements 
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCategory = document.getElementById("searchByCategory");
let deleteAll = document.getElementById("delete");
let mood = "create";
let temp;

//----------------------------------------------------------------------------------------------
//**********************get the total price ****************************************************
//----------------------------------------------------------------------------------------------
function getTotal() {
    // check if the price contain a number 
    if (price.value != "") {
        let result = (+price.value + +tax.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background ="#040";
    }
    else {
        total.innerHTML = "";
        total.style.background = "#EC2222";
    }
}




//----------------------------------------------------------------------------------------------
//*********************create a product  &&& save data to local storage*************************
//----------------------------------------------------------------------------------------------
// dataProduct is an array to save the data in it 
let dataProduct;
//check if the the local storage is empty or not
if (localStorage.products != null) {
    dataProduct = JSON.parse(localStorage.products);
}
else {
    dataProduct = [];
}
// make an object that contain all the product content and push it to the array
create.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };
    //see how many product to add
    if (title.value != '') {
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[temp] = newProduct;
            mood = "create";
            create.value = "create";
            count.style.display = "block";
        }
        //clear the data from inputs
        clearData();
    }
    //save the array in the local storage as a json file to read it 
    localStorage.setItem("products", JSON.stringify(dataProduct));


    showData();
    deleteAllProduct(dataProduct.length);
}




//----------------------------------------------------------------------------------------------
//********************* clear inputs when click on create **************************************
//----------------------------------------------------------------------------------------------
function clearData() {
    title.value = '';
    price.value = '';
    tax.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background = "#EC2222";
    count.value = '';
    category.value = '';
}




//----------------------------------------------------------------------------------------------
//********************* read the data and show in the table ************************************
//----------------------------------------------------------------------------------------------
function showData() {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
              <td>${i + 1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].tax}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateProduct(${i})">update</button></td>
              <td><button onclick="deleteProduct(${i})">delete</button></td>
            </tr>
            `
}
    document.getElementById("tableBody").innerHTML = table;

    deleteAllProduct(dataProduct.length);
}




//----------------------------------------------------------------------------------------------
//********************* delete one or all products *********************************************
//----------------------------------------------------------------------------------------------
// one product 
function deleteProduct(i) {
    dataProduct.splice(i, 1);
    localStorage.products = JSON.stringify(dataProduct);
    showData();
    deleteAllProduct(dataProduct.length);
}
//all product
function deleteAllProduct(i) {
    deleteAll.value = `Delete All (${i})`;
    if (dataProduct.length == 0) {
        deleteAll.style.display = "none";
    }
    else {
        deleteAll.style.display = "block";
    }
}

deleteAll.onclick = function () {
    dataProduct = [];
    localStorage.products = JSON.stringify(dataProduct);
    showData();
    deleteAllProduct(dataProduct.length);
}




//----------------------------------------------------------------------------------------------
//******************************* update a product *********************************************
//----------------------------------------------------------------------------------------------
function updateProduct(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    tax.value = dataProduct[i].tax;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    category.value = dataProduct[i].category;
    getTotal();
    count.style.display = "none";
    create.value = "Update";

    mood = "update";
    temp = i;

    scroll({
        top: 0
    })
}




// search
let searchMood = "title";

function selectSearchMood(id) {
    if (id == "searchByTitle") {
        searchMood = "title";
        search.placeholder = "search by title";
    } else {
        searchMood = "category";
        search.placeholder = "search by category";
    }
    search.focus();
    search.value = '';
    showData();
}

function searchProduct(val) {
    let table = '';
    if (searchMood == "title") {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].title.toLowerCase().includes(val.toLowerCase())) {
                table += `
        <tr>
              <td>${i + 1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].tax}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateProduct(${i})">update</button></td>
              <td><button onclick="deleteProduct(${i})">delete</button></td>
            </tr>
            `
            }
        }
    }
    else {
        if (searchMood == "category") {
            for (let i = 0; i < dataProduct.length; i++) {
                if (dataProduct[i].category.toLowerCase().includes(val.toLowerCase())) {
                    table += `
        <tr>
              <td>${i + 1}</td>
              <td>${dataProduct[i].title}</td>
              <td>${dataProduct[i].price}</td>
              <td>${dataProduct[i].tax}</td>
              <td>${dataProduct[i].ads}</td>
              <td>${dataProduct[i].discount}</td>
              <td>${dataProduct[i].total}</td>
              <td>${dataProduct[i].category}</td>
              <td><button onclick="updateProduct(${i})">update</button></td>
              <td><button onclick="deleteProduct(${i})">delete</button></td>
            </tr>
            `
                }
            }
        }
    }
    document.getElementById("tableBody").innerHTML = table;
}




deleteAllProduct() 
showData();