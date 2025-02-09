/*Завдання:
1. зайти на сайт нбу і перейти до частини для розробників та скопіювати апі лінк 
https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json

2. Призавантажені курсу валют вони повинні відображатися в списку або таблицію
3. Додати поле інпут для вводу назви валюти щоб легко знаходити валюту по назві 
(фільтр по буквах)
4. Створити фільтр на поточній сорінці 
5. Зберегти в об´єкт 
*/

async function exchangeRate() {
    try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        if (!response.ok) {
            throw new Error(`Error: ${response.status} `);
        }
        
        const data = await response.json();

        const tableBody = document.querySelector('#currencyTable tbody');
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
    }catch(error){
        console.log('Щось пішло не так:', error.message);
        
    }
}
function filterTable(){

}
exchangeRate();
