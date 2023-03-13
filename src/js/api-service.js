import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BEST_URL = 'https://restcountries.com/v3.1/'

function fetchCountrys(checkValue) {

    return fetch(`${BEST_URL}name/${checkValue}`).then((resp) => {
            
        // if (!resp.ok) {
        //     Notify.failure("Oops, there is no country with that name")
        //     throw new Error(resp.statusText)
        // }
       
        return resp.json();
    })

}

export default {fetchCountrys}