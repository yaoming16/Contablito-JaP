const table = document.querySelector("#table");
const description = document.querySelector("#description") 
const transaction = document.querySelectorAll(".transaction")
const iva = document.querySelectorAll(".iva")
const subtotal = document.querySelector("#subtotal")
const add = document.querySelector("#btn")
const totalBought = document.querySelector("#total_bought")
const totalSold = document.querySelector("#total_sold")
const clearBtn = document.querySelector("#clearBtn")

// Function to say if buy or sell was selected 
function CoV() {
    let CoV =""
    if (transaction[0].checked === true){
        return CoV = "Compra"
    } 
    else if (transaction[1].checked === true) {
        return CoV = "Venta"
    }
}

// Function to select the iva
function IvaSelector() {
    let ivaSelected = []
    if (iva[0].checked === true){
        return ivaSelected = ["22%",0.22]
    } 
    else if (iva[1].checked === true) {
        return ivaSelected = ["10%",0.10]
    }
    else if (iva[2].checked === true) {
        return ivaSelected = ["0%",0]
    }
}

// function to check all needed data is compleated 
function check(){
    if(description.value.trim() !== "" && subtotal.value !== "" && (transaction[0].checked || transaction[1].checked) && (iva[0] || iva[1] || iva[2])){
        return true
}
}

// function to clear the fields
function clearfields() {
    for (i of transaction){
        i.checked = false
    }
    for(i of iva) {
        i.checked = false
    }
    subtotal.value = ""
    description.value = ""
}

// function to clar the information from the table, sold  and bought totals.
function clearinfo(){
    table.innerHTML =`
    <tr>
        <th>Description</th>
        <th>Tipo</th>
        <th>Subtotal($)</th>
        <th>IVA ($)</th>
        <th>Total (IVA inc.)</th>
    </tr>
    `
    sold = 0
    bought = 0
    totalBought.innerHTML = bought
    totalSold.innerHTML = sold
}

//function to save the values in a object
function save(whereToSave) {
    whereToSave += [
        description, 
        soldBought,
        value,
        ivaAmount,
        total,
    ]
    return whereToSave
}

let sold = 0
let bought = 0
let listToSave = []

// if the localstorage ("tablaAnterior") is not null it wil get the stored data and display it in the table 
if (localStorage.getItem("tablaAnterior") !== null){
    let tablaVieja = JSON.parse(localStorage.getItem("tablaAnterior"))

    for (i of tablaVieja){
        listToSave.push(i)
        table.innerHTML += `
        <tr>
            <td>${i[0]}</td>
            <td>${i[1]}</td>
            <td>${i[2]}</td>
            <td>${i[3]} (${i[4]})</td>
            <td>${i[5]}</td>
        </tr>
        `
    }
}

if (localStorage.getItem("totalSold") !== null){
    sold += localStorage.getItem("totalSold")
    totalSold.innerHTML = localStorage.getItem("totalSold")
}

if (localStorage.getItem("totalBought") !== null){
    sold += localStorage.getItem("totalBought")
    totalBought.innerHTML = localStorage.getItem("totalBought")
}



add.addEventListener("click", function(){

    if (check()){
        let value = parseInt(subtotal.value)
        let soldBought = CoV()
        let ivaSelected = IvaSelector()
        let ivaAmount = (ivaSelected[1] *  value)
        let total = ivaAmount + value
    
        if (soldBought === "Compra"){
            bought += value
        } 
        else if (soldBought === "Venta"){
            sold += value
            
        }
        
    
        table.innerHTML += `
        <tr>
            <td>${description.value}</td>
            <td>${soldBought}</td>
            <td>${value}</td>
            <td>${ivaAmount} (${ivaSelected[0]})</td>
            <td>${total}</td>
        </tr>
        `
        
        listToSave.push( [
            description.value, 
            soldBought,
            value,
            ivaAmount,
            ivaSelected[0],
            total
        ])

        localStorage.setItem("tablaAnterior",JSON.stringify(listToSave))
        localStorage.setItem("totalSold", sold)
        localStorage.setItem("totalBought", bought)

        totalBought.innerHTML = bought
        totalSold.innerHTML = sold
        clearfields()
    }



})

clearBtn.addEventListener("click", function(){
    clearfields()
    clearinfo()
    localStorage.removeItem("tablaAnterior")
    localStorage.removeItem("totalSold")
    localStorage.removeItem("totalBought")
})