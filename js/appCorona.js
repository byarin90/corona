let countries = ['Israel', 'France', 'UK']; //array of countries
let allCounteries = [];
window.onload = () => {
    declareEvnets();
    doApi();
}





const filterCountries = (json, arrCountries) => { //filter function to json by array countries
    let countries_ar = json.filter(item => {
        return (arrCountries.includes(item.country));
    })

    return countries_ar;
}

const setAllCountries = (json) => {
    allCounteries = json.map((item) => {
        return item.country;
    })
}

const addCountry = (country) => {
    country = country.toLowerCase();
    country = country.charAt(0).toUpperCase() + country.slice(1);
    countries.push(country);
}

const resetFilter = () => {
    countries = [];
    doApi();
}

const declareEvnets = () => {
    let input_val = document.querySelector('#id_input');
    let btn_filter = document.querySelector('#id_filter');
    btn_filter.addEventListener('click', () => {
        addCountry(input_val.value);
        doApi();
    })

    let btn_reset = document.querySelector('#id_reset');
    btn_reset.addEventListener('click', () => {
        resetFilter();
        doApi();
    })



}

const createFilterSelection = () => {
    let select = document.querySelector('#id_select');
    allCounteries.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item;
        opt.innerHTML = item;
        select.append(opt)
    });

    select.addEventListener('change', (e) => {
        e.preventDefault();
        countries.push(select.value);
        doApi()
    })



}


const doApi = () => { // call to json
    let url = `https://coronavirus-19-api.herokuapp.com/countries`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('readystatechange', () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            let json = JSON.parse(xhr.response);


            setAllCountries(json);
            console.log(allCounteries)
            allCounteries.sort();
            createFilterSelection()



            json = filterCountries(json, countries); //filter json by countries array


            console.log('filter')
            console.log(json)

            createCorona(json)

        }

    })
    xhr.send();


}



const createCorona = (json) => {
    document.querySelector('#id_parent').innerHTML = '';
    json.forEach(item => {
        let corona = new Corona('#id_parent', item);
        corona.render();
    });
}