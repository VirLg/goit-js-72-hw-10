import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const BEST_URL = 'https://restcountries.com/v3.1/'
let arrCountry = [];

const refCartDiv = document.querySelector('.country-info')
const refInput = document.querySelector('#search-box')
const refUl = document.querySelector('.country-list')
refInput.addEventListener('input', debounce(handleCountry,DEBOUNCE_DELAY))
// const refBTN = document.querySelector('.js-country')
// refBTN.addEventListener('click', handleCountry)

function handleCountry(evt) {
  
    return fetch(`${BEST_URL}name/${refInput.value}`) 
        .then((resp) => {
            
            if (!resp.ok) {
                Notify.failure("Oops, there is no country with that name")
                throw new Error(resp.statusText)
            }  
         return dataAPI(resp.json())

        })  
}

function dataAPI(resp) { 
    resp.then(data => { 
        // return console.log(data.splice(10));
        arrCountry = [...data]
        if (arrCountry.length > 30) {
Notify.info("Too many matches found. Please enter a more specific name.")
        }else if (arrCountry.length < 19&&arrCountry.length > 1) {
                   arrCountry.splice(10); 
            createMarkupMany(arrCountry)
            refUl.classList.add('group')
        } else if (arrCountry.length === 1) {
            refUl.classList.remove('group')
         createMarkupOne(arrCountry[0])   
         }   
    })  

}
     
function createMarkupOne({ name: { official }, capital, population, flags: { svg }, languages }) { 
    console.log(capital);
    const markupOne = `
     <li style ="display: contents" class="country-item">
        <img src="${svg}" alt="official" width = "50"></li>
      <li style ="display: contents" class="country-item">${official}</li>
      <li class="country-item"><span class="span">Capital</span>: ${capital}</li>
      <li class="country-item"><span class="span">Population</span>: ${population}</li>
      
    <li class="country-item"><span class="span">Languages</span>: ${languages}</li>

        `
          return refUl.innerHTML = markupOne
    }

function createMarkupMany(arrCountry) {
 
    const markupMany = arrCountry.map(({ flags: { svg }, name: { official } }) =>
        `<li class="country-item js-many">
    <img src="${svg}" alt="official" width = "50"></li>
    <li class="country-item js-many">${official}</li>
        `
    );
refUl.innerHTML = markupMany.join('');
}   
    
 




// ==================================================

// // key 9837a04f7ff64382a06141028230803

// const request = fetch('http://api.weatherapi.com/v1/forecast.json?key=9837a04f7ff64382a06141028230803&q=Kiev&days=5')


// request.then(resp =>resp.json()).then(data=>console.log(data))

// const refForm = document.querySelector('.js-serch')
// refForm.addEventListener('submit', wheatherSerch)

// function wheatherSerch(evt) { 
//     evt.preventDefault()
//     const { query, days } = evt.currentTarget
    
//     weatherApi(query.value, days.value).then((data) => { console.log(data)}).catch(err=>console.log('err'))
// }

// function weatherApi(city,days) { 
// const BEST_URL = 'http://api.weatherapi.com/v1';
//  const key = '9837a04f7ff64382a06141028230803'
//     return fetch(`${BEST_URL}/forecast.json?key=${key}&q=${city}&days=${days}`)
//         .then((resp) => {
            
//             if (!resp.ok) {
//                 throw new Error(resp.statusText)
//             }

//         return resp.json()
//          })
// }
