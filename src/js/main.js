let title = document.getElementById('title');
let price = document.getElementById('price');
let taxas = document.getElementById('taxas');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'Create';
let tmp;

// Get Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxas.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}

// Create Product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}
submit.onclick = () => {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxas: taxas.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value != '' &&
        price.value != '' &&
        category.value != '' &&
        newPro.count < 100) {
        if (mood === 'Create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.length; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    // sessionStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

// Clear Inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxas.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxas}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
            <td><button onclick="deleteAll()">delete All (${dataPro.length})</button></td>
        `
    } else {
        btnDelete.innerHTML = '';
    }
}

showData();
// Count 

// Delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    // sessionStorage.product = JSON.stringify(dataPro);
    showData();
}

// Delete All
function deleteAll() {
    localStorage.clear();
    // sessionStorage.clear();
    dataPro.splice(0);
    showData();
}

// Update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxas.value = dataPro[i].taxas;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// Search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxas}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `
            }

        } else {

            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxas}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}


// Clean Data

