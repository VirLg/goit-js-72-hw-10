

import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './js/api-service'

const DEBOUNCE_DELAY = 300;
// const BEST_URL = 'https://restcountries.com/v3.1/'
let arrCountry = [];

const refCartDiv = document.querySelector('.country-info')
const refInput = document.querySelector('#search-box')
const refUl = document.querySelector('.country-list')
refInput.addEventListener('input', debounce(handleCountry,DEBOUNCE_DELAY))
// const refBTN = document.querySelector('.js-country')
// refBTN.addEventListener('click', handleCountry)

function handleCountry(evt) {
    const checkValue = evt.target.value.trim()
    if (!checkValue) {
        Notify.warning("Empty value")
        console.log('!!!!!!!');
        
        return
    }
    API.fetchCountrys(checkValue).then(data => {
                arrCountry = [...data]
                if (arrCountry.length > 10) {
                    Notify.info("Too many matches found. Please enter a more specific name.")
                 refUl.innerHTML = ''   
                }else if (arrCountry.length <= 10&&arrCountry.length > 1) {
                           arrCountry.length = 10; 
                    createMarkupMany(arrCountry)
                    refUl.classList.add('group')
                } else if (arrCountry.length === 1) {
                    refUl.classList.remove('group')
                 createMarkupOne(arrCountry[0])   
                 }   
            })  


} 
function createMarkupOne({ name: { official }, capital, population, flags: { svg }, languages }) { 

    const markupOne = `
        <li style ="display: contents" class="country-item">
            <img src="${svg}" alt="official" width = "50"></li>
        <li style ="display: contents" class="country-item">${official}</li>
        <li class="country-item"><span class="span">Capital</span>: ${capital}</li>
        <li class="country-item"><span class="span">Population</span>: ${population}</li>
        <li class="country-item"><span class="span">Languages</span>: ${Object.values(languages).join(", ")}</li>
        `
          return refUl.innerHTML = markupOne
    }

function createMarkupMany(arrCountry) {
 
    const markupMany = arrCountry.map(({ flags: { svg }, name: { official } }) =>`
        <li class="country-item js-many">
        <img src="${svg}" alt="official" width = "50"></li>
        <li class="country-item js-many">${official}</li>`);
          refUl.innerHTML = markupMany.join('');
}   
    
 

