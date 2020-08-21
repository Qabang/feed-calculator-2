console.log('1loaded')
window.onload = function(){
    card_click_event();
    console.log('loaded')
}

function errorRun() {
    alert('random text')
}

function validateProfile() {
    console.log('Validating')

    let form = document.getElementById("add-profile-form");
    let inputs = form.querySelectorAll('input');
    let selects = form.querySelectorAll('select');
    let error = {};
    document.querySelector('.error-list').innerHTML = "";

    console.log(selects);
    
    inputs.forEach(input => {
        // We dont want the submit button.
        if (input.type != 'submit') {
            error[input.name] = [];
        }

        if (!(input.name == 'walk' || input.name == 'trotCanter' || input.type == 'submit')) {
            if (input.value == '' || input.value == null) {
                error[input.name].push('Fältet får inte vara tomt');
                input.classList.add('error-input-' + input.name, 'error')
            }
            else {
                input.classList.remove('error-input-' + input.name, 'error')
            }
        }

        // strip < > from textinput to disable HTML.
        if (input.name == 'name') {
            console.log(input.value)
            let name = input.value.replace(/[^a-zA-Z0-9äöåÄÖÅ '-]/g, '').trim()
            if (name == '') {
                error[input.name].push('Endast tecken A-Ö, 1-9, apostrof och bindestreck  är tillåtna att använda');
                input.classList.add('error-input-' + input.name, 'error')
            } 
            else {
                input.value = name;
            }
        }

        // Check if correct year and format. 
        if (input.name == 'born') {
            if (input.value > new Date().getFullYear()) {
                error[input.name].push('Årtalet kan inte vara satt i framtiden');
                input.classList.add('error-input-' + input.name, 'error');
            }
            else if (input.value.length < 4) {
                error[input.name].push('Årtalet måste vara angivet med 4 siffror exempel: ' + new Date().getFullYear());
                input.classList.add('error-input-' + input.name, 'error');
            }
            else {
                input.classList.remove('error-input-' + input.name, 'error')
            }
        }

        console.log(input);
        
    });
    console.log('Running selects')
    selects.forEach(select => {
        error[select.name] = [];

        if (select.value == 'null' || select.value == '') {
            error[select.name].push('Fältet får inte vara tomt');
            select.classList.add('error-input-' + select.name, 'error')
        }
        else {
            select.classList.remove('error-input-' + select.name, 'error')
        }
    });

    var size = Object.keys(error).length;
    
    let should_submit = true;

    for (let i = 0; i < size; i++) {
        console.log('forloop');
        const key = Object.keys(error)[i]
        const element = error[key];
        console.log(element);
        
        if(element.length > 0) {
            console.log('We have errors!')
            let list = document.querySelector('.error-list');
            element.forEach(item => {
            let field = ''
                switch (key) {
                    case 'name':
                        field = 'Namn'
                        break;
                    case 'born':
                        field = 'Född'
                        break;
                    case 'gender':
                        field = 'Kön'
                        break;
                    case 'weight':
                        field = 'Vikt'
                        break;
                    case 'type':
                        field = 'Typ'
                        break;
                    case 'look':
                        field = 'Hull'
                        break;
                
                    default:
                        break;
                }
                let li = document.createElement('li');
                li.innerHTML = field + ': ' + item;
                list.appendChild(li);
            });
            should_submit = false;
        }
    }

    if (should_submit == false) {
        document.querySelector('.error-list').style.display = 'block';
    }
    else {
        document.querySelector('.error-list').style.display = 'none';
        document.getElementById("add-profile-form").submit();
    }
}

function card_click_event() {
    if (!document.querySelector(".cards_wrapper")) {
        console.warn("Couldn't find wrapper");
        return;
    }

    const card_calculator = document.querySelector('.sec_first');
    const card_profiles = document.querySelector('.sec_second');
    const card_add_profile = document.querySelector('.sec_third');

    card_calculator.addEventListener('click', () => {
        window.location.href = window.location.href + 'calculator'
    })
    card_profiles.addEventListener('click', () => {
        window.location.href = window.location.href + 'profiles'
    })
    card_add_profile.addEventListener('click', () => {
        window.location.href = window.location.href + 'profile/add'
    })
}

function validateSearchForm() {
    
    let inputs = document.querySelectorAll('input');
    console.log(inputs);
    inputs.forEach(input => {
        input.value = input.value.replace(/[^a-zA-Z0-9äöåÄÖÅ '-]/g, '').trim()
    });

    document.getElementById("profiles-search-form").submit();
}