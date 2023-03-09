import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const BEST_URL = 'https://restcountries.com/v3.1/'
let arrCountry = [];

const refCartDiv = document.querySelector('.country-info')
const refInput = document.querySelector('#search-box')
const refUl = document.querySelector('.country-list')
refInput.addEventListener('input', handleCountry)
// const refBTN = document.querySelector('.js-country')
// refBTN.addEventListener('click', handleCountry)

function handleCountry(evt) {
    return fetch(`${BEST_URL}name/${refInput.value}`)
        .then((resp) => {
            
            if (!resp.ok) {
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
            console.log("uuuuuPPPPss")
        }else if (arrCountry.length < 19) {
                   arrCountry.splice(10); 
                createMarkupMany(arrCountry)
        } else if (arrCountry.length === 1) {
         createMarkupOne(arrCountry[0])   
         }
        // if (arrCountry.length >= 1) {
        //     const firstEl = arrCountry[0]
        //     console.log(arrCountry[0]);
        //    return createMarkupOne(firstEl)
        
     
        
    })  

}
     
function createMarkupOne({ name: { official }, capital, population, flags: { svg }, languages }) { 
     const  markupOne =   `
    <li class="country-item">${official}</li>
      <li class="country-item">${capital}</li>
      <li class="country-item">${population}</li>
      <li class="country-item">
      <img src="${ svg }" alt="official" width = 200px></li>
      <li class="country-item">${languages}</li>
        `
          return refUl.innerHTML = markupOne

    }

function createMarkupMany(arrCountry) {
    console.log(arrCountry);
    const markupMany = arrCountry.map(({ flags: { svg }, name: { official } }) =>    
     `<li class="country-item">
    <img src="${ svg }" alt="official" width = 50px></li>
    <li class="country-item">${official}</li>
        `
    )



refUl.innerHTML = markupMany;
console.log(arrCountry);

}   
    
 

// // {name.official,
// //  capital,
// //  population,
// //  flags,
// //  languages }




// // fetch(createEndPoind()).then((responce) => {
// //     return responce.json()
// // })
// //     .then((country) => {
// //         console.log(country);
        
// //     })
// //     .catch((error) => { console.log(error); })












    // прапор, назва, столиця, населення і мови

// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов


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
