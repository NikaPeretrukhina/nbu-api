/*Завдання:
1. зайти на сайт нбу і перейти до частини для розробників та скопіювати апі лінк 
https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json

2. Призавантажені курсу валют вони повинні відображатися в списку або таблицію
3. Додати поле інпут для вводу назви валюти щоб легко знаходити валюту по назві 
(фільтр по буквах)
4. Створити фільтр на поточній сорінці 
5. Зберегти в об´єкт 
*/

const currencyData = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
const tableBody = document.querySelector('#currencyTable tbody');
const inputValue = document.querySelector('.input-search');
const errorText = 'Щось пішло не так:';

let data = [];

function renderCurrencyTable(data){
    tableBody.innerHTML = "";

    data.forEach(currency=>{
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${currency.cc}</td>
        <td>${currency.txt}</td>
        <td>${currency.rate.toFixed(2)}</td>
        <td>${currency.exchangedate}</td>
        `;
        tableBody.appendChild(row);
    });
}

async function loadCurrencyData() {
    try {
        const response = await fetch(currencyData);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} `);
        }
        
        
        data = await response.json();
        renderCurrencyTable(data);

    }catch(error){
        console.log(errorText, error.message);
        
    }
}



function filterTable(){
    const searchText =inputValue.value.trim().toLowerCase();

    let filtered = data.filter(currency=>
        currency.cc.toLowerCase().includes(searchText) ||
        currency.txt.toLowerCase().includes(searchText)
    );
   
    renderCurrencyTable(filtered);

}
inputValue.addEventListener("input", filterTable);
loadCurrencyData();
