
// Populate weight options
for (let i = 100; i <= 800; i += 100) {
  // get reference to select element
  let weight_select = document.getElementById('weight');

  // create new option element
  let option = document.createElement('option');

  // create text node to add to option element (opt)
  option.appendChild(document.createTextNode(i + 'kg'));

  // set value property of opt
  option.value = i; 

  // add opt to end of select box (sel)
  weight_select.appendChild(option); 
}

window.onload = function () {
  document.querySelector('.add-row').addEventListener('click', addRow)
}

/**
 * Function that adds another input row to the feed calculator.
 */
function addRow() {
  let existing_inputs = document.querySelectorAll('.form-feed-input');
  let existing_rows = document.querySelectorAll('.feed-row');
  let wrapper = document.querySelector('.feeding-calculator-flex-wrap')

  // add row wrapper
  let row_wrapper = document.createElement('div');
  row_wrapper.classList.add('feed-row', 'feed-row-' + (existing_rows.length + 1))
  wrapper.appendChild(row_wrapper);
  
  // Each row is 8 input fields so we only need the 8 first.
  for (let i = 0; i < 8; i++) {
    let input = existing_inputs[i].cloneNode(true);
    input.value = '';
    row_wrapper.appendChild(input);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Print results
 */
function printResult(section, mj, smrp, ca, phosphor, mg) {
  // Print result and round to closest Integer.
  document.querySelector('.result-' + section + '-mj').innerHTML = Math.round(mj)
  document.querySelector('.result-' + section + '-smrp').innerHTML = Math.round(smrp)
  document.querySelector('.result-' + section + '-ca').innerHTML = ca.toFixed(1)
  document.querySelector('.result-' + section + '-p').innerHTML = Math.round(((phosphor + 0.00001) * 100) / 100)
  document.querySelector('.result-' + section + '-mg').innerHTML = Math.round(((mg + Number.EPSILON) * 100) / 100)
  
  // If the total is less than 0 or higher than 5 alert user by adding color changeing class 
  document.querySelectorAll('li[class*="-total"]').forEach(element => {
    
    if (parseFloat(element.innerHTML) < 0) {
      element.classList.add('low-value')
    }
    else if (parseFloat(element.innerHTML) > 5.0) {
      element.classList.add('high-value')
    }
    else if (parseFloat(element.innerHTML) > -1 && parseFloat(element.innerHTML) < 1) {
      element.classList.add('good-value')
    }
  });
}

/**
 * Catch form inputs in submit and display the results
 */
function profile_submit() {
  let mj
  let smrp

  let name = document.querySelector('.name').value
  let born = document.querySelector('.born').value
  let weight = document.querySelector('.weight').value
  let look = document.querySelector('.hull').value
  let type = document.querySelector('.type').value
  
  if (born == '' || born.length != 4) {
    alert('Error! Enter the year the horse was born with four digits');
    document.querySelector('.born').classList.add('error');
    return
  }
  else {
    document.querySelector('.born').classList.remove('error');
  }

  // Calculate age.
  let age = new Date().getFullYear() - born

  if (age < 0) {
    alert('Well time flies! But we can\'t use a year ahead of the current year, ' + new Date().getFullYear())
    document.querySelector('.born').classList.add('error');
    return
  }
  else {
    document.querySelector('.born').classList.remove('error');
  }

  if (age > 65) {
    alert('The worlds oldest horse Billy died at the age of 62 years are you sure your horse is ' + age + ' years old?')
  }

  if (weight == 'null') {
    alert('You must fill in the weight field');
    document.querySelector('.weight').classList.add('error');
    return;
  }
  else {
    document.querySelector('.weight').classList.remove('error');
  }

  if (name != '') {
    document.querySelector('.profile-name').innerHTML = 'Uträkning för ' + capitalizeFirstLetter(name);
  }

  let base = base_amount_calculation (age, weight, type)

  work_amount_calculation(weight, base)

  let profile = {
    'age': age,
    'weight' : weight,
    'type' : type
  }
  return profile
}

/**
 * Function that calculates the base need for the horse based on its profile.
 * @param {int} age 
 * @param {int} weight 
 * @param {string} type 
 */
function base_amount_calculation (age, weight, type) {
  // Result container
  let result_need = document.querySelector('.result-need')
  let result;
  // General need for adult horse.
  mj = 0.5 * (parseInt(weight)**0.75)
  smrp = mj * 6
  ca = parseFloat(weight/100) * 4
  mg = parseFloat(weight/100) * 1.5;
  phosphor = parseFloat(weight/100) * 2.8;

  if (age < 3) {
    // Todo
  }
  else if (age < 20) {
  
    if (type == 'type-normal') {
      mj = mj * 1.05
      smrp = smrp * 1.05
    }
    else if (type == 'type-hard') {
      mj = mj * 1.1
      smrp = smrp * 1.1

    }

    result = {'mj': mj, 'smrp': smrp, 'ca': ca, 'p': phosphor, 'mg': mg}
  }
  else {
    // If older than 20
    smrp = smrp + (mj * 6)
    
  }
  
  printResult('need', mj, smrp, ca, phosphor, mg)

  return result
  
}

/**
 * Calculate the amount of energy the work needs. And print result.
 * @param {int} weight 
 */
function work_amount_calculation(weight, base) {
  // Result container
  let result_work = document.querySelector('.result-work')

  let walk_time = document.querySelector('.walk').value
  let trot_time = document.querySelector('.trot').value

  walk_mj = (((0.2/100) * weight) / 10) * walk_time
  walk_smrp = 6 * walk_mj

  trot_mj = (((1.3/100) * weight) / 10) * trot_time
  trot_smrp = 6 * trot_mj

  mj = walk_mj + trot_mj
  smrp = trot_smrp + walk_smrp
  
  // calculate ca value
  let percent_work = mj/base['mj'] * 100
  if (percent_work < 30) {
    work_ca = 6 * (weight/100)
    work_p = 3.6 * (weight/100)
    work_mg = 1.9 * (weight/100)
  }
  else if (percent_work >= 30 && percent_work < 50) {
    work_ca = 7 * (weight/100)
    work_p = 4.2 * (weight/100)
    work_mg = 2.3 * (weight/100)
  }
  else {
    work_ca = 8 * (weight/100)
    work_p = 5.8 * (weight/100)
    work_mg = 3 * (weight/100)
  }
  ca = work_ca - base['ca']
  p = work_p - base['p']
  mg = work_mg - base['mg']

  printResult('work', mj, smrp, ca, p, mg)
  // TODO MINERALS
  return {'mj': mj,'smrp': smrp, 'ca': ca, 'p': p, 'mg': mg}
}


/**
 * Function that collects all input values
 * @param {int} weight 
 */
function feed_input_collection(feed_type) {
  let input_list = document.querySelectorAll('input[class*="-'+ feed_type +'"]');
  let total = 0.0;
  input_list.forEach(element => {
    let children = element.parentNode.children
    let amount = 0.0;

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      // Get the amount of the feed type.
      if (child.classList.contains('input-amount')) {
        amount = child.value
      }
      // If there is a solids value modify the amount after that.
      if (child.classList.contains('input-solids') && child.value != '') {
        amount = amount * (child.value / 100);
      }
    }

    total += (parseFloat(element.value * amount))
  });

  return total;
}


function feed_calculation() {
  let profile = profile_submit()
  let need_result = base_amount_calculation(profile['age'],profile['weight'], profile['type'])
  let work_result = work_amount_calculation(profile['weight'], need_result)
  
  let mj_total_feed = feed_input_collection('mj');
  let smrp_total_feed = feed_input_collection('smrp');
  let selen_total_feed = feed_input_collection('selen');
  let ca_total_feed = feed_input_collection('ca');
  let mg_total_feed = feed_input_collection('mg');
  let p_total_feed = feed_input_collection('p');
 
  console.log(profile);
  console.log(need_result);
  console.log(work_result);

  mj = calculate(need_result['mj'],work_result['mj'], mj_total_feed)
  smrp = calculate(need_result['smrp'],work_result['smrp'], smrp_total_feed)
  ca = calculate(need_result['ca'], work_result['ca'], ca_total_feed)
  p = calculate(need_result['p'], work_result['p'], p_total_feed)
  mg = calculate(need_result['mg'], work_result['mg'], mg_total_feed)
  
  printResult('feed', mj['given'], smrp['given'], ca_total_feed, p_total_feed, mg_total_feed)
  printResult('total', mj['result'], smrp['result'], ca['result'], p['result'], mg['result'])

}

/**
 * TODO rework as minerals
 */
function hay_calculation() {
  let result_feed = document.querySelector('.result-feed')
  let mj
  let smrp
  let ca
  let p
  let ca_p
  let mg
  let selen


  let hay_amount = document.querySelector('.hay-amount').value
  let hay_solids = document.querySelector('.hay-solids').value
  let hay_mj = document.querySelector('.hay-mj').value
  let hay_smrp = document.querySelector('.hay-smrp').value
  let hay_ca = document.querySelector('.hay-ca').value
  let hay_p = document.querySelector('.hay-p').value
  let hay_mg = document.querySelector('.hay-mg').value
  let hay_se = document.querySelector('.hay-se').value

  hay_solids = parseFloat(hay_solids/100)
  hay_solid_amount = parseFloat(hay_amount) * parseFloat(hay_solids)
  hay_smrp = parseFloat(hay_smrp)
  hay_ca = parseFloat(hay_ca)
  hay_p = parseFloat(hay_p)
  hay_mg = parseFloat(hay_mg)
  hay_se = parseFloat(hay_se)

  mj = Math.round(hay_solid_amount * hay_mj)
  smrp = Math.round(hay_smrp * hay_amount)
  ca = Math.round(hay_ca * hay_solid_amount)
  p = Math.round(hay_p * hay_solid_amount)
  ca_p = Math.round(ca/p)
  mg = Math.round(hay_mg * hay_solid_amount)
  selen = Math.round(hay_se * hay_solid_amount)

  let result = {'mj': mj, 'smrp': smrp, 'ca': ca, 'p': p, 'ca/p': ca_p, 'mg': mg, 'selen': selen}

  return result

}

/**
 * function for summarize the result
 */
function calculate(need, work, feed) {
  return {
    'given': parseFloat(feed),
    'result': parseFloat(feed) - parseFloat(need + work)
  };
}