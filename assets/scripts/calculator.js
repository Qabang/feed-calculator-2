// Populate weight options
for (let i = 100; i <= 1000; i += 50) {
  // get reference to select element
  let weight_select = document.getElementById("weight");

  if (weight_select) {
    // create new option element
    let option = document.createElement("option");

    // create text node to add to option element (opt)
    option.appendChild(document.createTextNode(i + "kg"));

    // set value property of opt
    option.value = i;
    // add opt to end of select box (sel)
    weight_select.appendChild(option);
  }
}

window.onload = function () {
  if (document.querySelector(".add-row")) {
    document.querySelector(".add-row").addEventListener("click", addRow);
  }
  if (document.querySelector("#save-calculation")) {
    document
      .querySelector("#save-calculation")
      .addEventListener("click", submitForm);
  }
  if (document.querySelector(".change-profile-button")) {
    let button = document.querySelector(".change-profile-button");
    profile_name = button.getAttribute("id");

    button.addEventListener("click", () => {
      window.location.href = "/profile/" + profile_name + "/edit";
    });
  }
};

/**
 * Function that adds another input row to the feed calculator.
 */
function addRow() {
  let existing_inputs = document.querySelectorAll(".form-feed-input");
  let existing_rows = document.querySelectorAll(".feed-row");
  let wrapper = document.querySelector(".feeding-calculator-flex-wrap");

  // add row wrapper
  let row_wrapper = document.createElement("div");
  row_wrapper.classList.add(
    "feed-row",
    "feed-row-" + (existing_rows.length + 1)
  );
  wrapper.appendChild(row_wrapper);

  // Each row is 8 input fields so we only need the 8 first.
  for (let i = 0; i < 8; i++) {
    let input = existing_inputs[i].cloneNode(true);
    input.value = "";
    row_wrapper.appendChild(input);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Print results
 */
function printResult(section, mj, smrp, ca, phosphor, mg, selenium = false) {
  // Print result and round to closest Integer.
  document.querySelector(".result-" + section + "-mj").innerHTML = Math.round(
    mj
  );
  document.querySelector(".result-" + section + "-smrp").innerHTML = Math.round(
    smrp
  );
  document.querySelector(".result-" + section + "-ca").innerHTML = ca.toFixed(
    1
  );
  document.querySelector(".result-" + section + "-p").innerHTML = Math.round(
    ((phosphor + 0.00001) * 100) / 100
  );
  document.querySelector(".result-" + section + "-mg").innerHTML = Math.round(
    ((mg + Number.EPSILON) * 100) / 100
  );

  if (selenium) {
    document.querySelector(
      ".result-" + section + "-selen"
    ).innerHTML = selenium.toFixed(1);

    // Selenium is really toxic if given to much.
    // Alert if the value is greater than 5mg.
    if (
      document.querySelector(".result-" + section + "-selen").innerHTML > 5.0 &&
      alerted == false
    ) {
      alert("The amount of selenium is probably toxic for your horse!");
      alerted = true;
    } else {
      alerted = false;
    }
  }

  // If the total is less than 0 or higher than 5 alert user by adding color changeing class
  document.querySelectorAll('li[class*="-total"]').forEach((element) => {
    if (parseFloat(element.innerHTML) < 0) {
      element.classList.add("low-value");
    } else if (parseFloat(element.innerHTML) > 5.0) {
      element.classList.add("high-value");
    } else if (
      parseFloat(element.innerHTML) > -1 &&
      parseFloat(element.innerHTML) < 1
    ) {
      element.classList.add("good-value");
    }
  });
}
/**
 * Function for alreday registred profiles. And display results.
 */
function get_profile() {
  let name = document.querySelector(".profile-name").innerHTML;
  let born = document.querySelector(".profile-born").innerHTML;
  let weight = document.querySelector(".profile-weight").innerHTML;
  let look = document.querySelector(".profile-look").innerHTML;
  let type = document.querySelector(".profile-type").innerHTML;
  let age = new Date().getFullYear() - born;

  let base = base_amount_calculation(age, weight, type);

  work_amount_calculation(weight, base);

  let profile = {
    age: age,
    weight: weight,
    type: type,
  };

  document
    .querySelector(".result-wrapper")
    .scrollIntoView({ behavior: "smooth" });
  return feed_calculation(profile);
}

/**
 * Catch form inputs in submit and display the results
 */
function profile_submit() {
  let name = document.querySelector(".name").value;
  let born = document.querySelector(".born").value;
  let weight = document.querySelector(".weight").value;
  let look = document.querySelector(".hull").value;
  let type = document.querySelector(".type").value;

  if (born == "" || born.length != 4) {
    alert("Error! Enter the year the horse was born with four digits");
    document.querySelector(".born").classList.add("error");
    return;
  } else {
    document.querySelector(".born").classList.remove("error");
  }

  // Calculate age.
  let age = new Date().getFullYear() - born;

  if (age < 0) {
    alert(
      "Well time flies! But we can't use a year ahead of the current year, " +
        new Date().getFullYear()
    );
    document.querySelector(".born").classList.add("error");
    return;
  } else {
    document.querySelector(".born").classList.remove("error");
  }

  if (age > 65) {
    alert(
      "The worlds oldest horse Billy died at the age of 62 years are you sure your horse is " +
        age +
        " years old?"
    );
    document.querySelector(".born").classList.add("error");
    return;
  } else {
    document.querySelector(".born").classList.remove("error");
  }

  if (weight == "null") {
    alert("You must fill in the weight field");
    document.querySelector(".weight").classList.add("error");
    return;
  } else {
    document.querySelector(".weight").classList.remove("error");
  }

  if (name != "") {
    document.querySelector(".profile-name").innerHTML =
      "Uträkning för " + capitalizeFirstLetter(name);
  }

  let base = base_amount_calculation(age, weight, type);

  work_amount_calculation(weight, base);

  let profile = {
    age: age,
    weight: weight,
    type: type,
  };

  document
    .querySelector(".result-wrapper")
    .scrollIntoView({ behavior: "smooth" });
  return feed_calculation(profile);
}

/**
 * Function that calculates the base need for the horse based on its profile.
 * @param {int} age
 * @param {int} weight
 * @param {string} type
 */
function base_amount_calculation(age, weight, type) {
  let result;
  // General need for adult horse.
  mj = 0.5 * parseInt(weight) ** 0.75;
  smrp = mj * 6;
  ca = parseFloat(weight / 100) * 4;
  mg = parseFloat(weight / 100) * 1.5;
  phosphor = parseFloat(weight / 100) * 2.8;
  selenium = parseFloat(weight / 100) * 0.2;

  if (age < 3) {
    // Todo
    alert(
      "Unfortunatly we don't calculate the need for growing horses at the moment"
    );
    return;
  } else if (age < 20) {
    if (type == "type-normal") {
      mj = mj * 1.05;
      smrp = smrp * 1.05;
    } else if (type == "type-hard") {
      mj = mj * 1.1;
      smrp = smrp * 1.1;
    }

    result = {
      mj: mj,
      smrp: smrp,
      ca: ca,
      p: phosphor,
      mg: mg,
      selen: selenium,
    };
  } else {
    // If older than 20
    smrp = smrp + mj * 6;
  }

  printResult("need", mj, smrp, ca, phosphor, mg, selenium);

  return result;
}

/**
 * Calculate the amount of energy the work needs. And print result.
 * @param {int} weight
 */
function work_amount_calculation(weight, base) {
  let walk_time = 0;
  if (document.querySelector(".walk")) {
    walk_time = document.querySelector(".walk").value;
  } else {
    walk_time = document.querySelector(".profile-walk").innerHTML;

    walk_time = walk_time.replace(/\D/g, "");
  }

  let trot_time = 0;
  if (document.querySelector(".trot")) {
    trot_time = document.querySelector(".trot").value;
  } else {
    trot_time = document.querySelector(".profile-trot-canter").innerHTML;
    trot_time = trot_time.replace(/\D/g, "");
  }

  if (
    walk_time == "" &&
    trot_time == "" /*|| (walk_time == 0 && trot_time == 0)*/
  ) {
    let result_box = document.querySelector(".result-work");
    // If there is no work added. Clear that table from data.
    result_box.querySelectorAll("li").forEach((element) => {
      element.innerHTML = "";
    });

    return;
  } else if (walk_time == "") {
    walk_time = 0;
  } else if (trot_time == "") {
    trot_time = 0;
  }

  walk_mj = (((0.2 / 100) * weight) / 10) * walk_time;
  walk_smrp = 6 * walk_mj;

  trot_mj = (((1.3 / 100) * weight) / 10) * trot_time;
  trot_smrp = 6 * trot_mj;

  mj = walk_mj + trot_mj;
  smrp = trot_smrp + walk_smrp;

  // calculate ca value
  let percent_work = (mj / base["mj"]) * 100;
  let calculate = true;
  if (percent_work < 30 && percent_work > 0) {
    work_ca = 6 * (weight / 100);
    work_p = 3.6 * (weight / 100);
    work_mg = 1.9 * (weight / 100);
  } else if (percent_work >= 30 && percent_work < 50) {
    work_ca = 7 * (weight / 100);
    work_p = 4.2 * (weight / 100);
    work_mg = 2.3 * (weight / 100);
  } else if (percent_work > 50) {
    work_ca = 8 * (weight / 100);
    work_p = 5.8 * (weight / 100);
    work_mg = 3 * (weight / 100);
  } else {
    work_ca = 0;
    work_mg = 0;
    work_p = 0;
    calculate = false;
  }

  if (calculate) {
    ca = work_ca - base["ca"];
    p = work_p - base["p"];
    mg = work_mg - base["mg"];
  } else {
    ca = 0;
    p = 0;
    mg = 0;
  }

  printResult("work", mj, smrp, ca, p, mg);
  // TODO MINERALS
  return { mj: mj, smrp: smrp, ca: ca, p: p, mg: mg };
}

/**
 * Function that collects all input values
 * @param {int} weight
 */
function feed_input_collection(feed_type) {
  let input_list = document.querySelectorAll(
    'input[class*="-' + feed_type + '"]'
  );
  let total = 0.0;
  input_list.forEach((element) => {
    let children = element.parentNode.children;
    let amount = 0.0;

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      // Get the amount of the feed type.
      if (child.classList.contains("input-amount")) {
        amount = child.value;
      }
      // If there is a solids value modify the amount after that.
      if (child.classList.contains("input-solids") && child.value != "") {
        amount = amount * (child.value / 100);
      }
    }

    total += parseFloat(element.value * amount);
  });

  return total;
}

function feed_calculation(profile) {
  let need_result = base_amount_calculation(
    profile["age"],
    profile["weight"],
    profile["type"]
  );
  let work_result = work_amount_calculation(profile["weight"], need_result);

  let mj_total_feed = feed_input_collection("mj");
  let smrp_total_feed = feed_input_collection("smrp");
  let selen_total_feed = feed_input_collection("selen");
  let ca_total_feed = feed_input_collection("ca");
  let mg_total_feed = feed_input_collection("mg");
  let p_total_feed = feed_input_collection("p");

  if (work_result) {
    mj = calculate(need_result["mj"], work_result["mj"], mj_total_feed);
    smrp = calculate(need_result["smrp"], work_result["smrp"], smrp_total_feed);
    ca = calculate(need_result["ca"], work_result["ca"], ca_total_feed);
    p = calculate(need_result["p"], work_result["p"], p_total_feed);
    mg = calculate(need_result["mg"], work_result["mg"], mg_total_feed);
  }
  // If there is no work added. woek_amount equals to 0.
  else {
    mj = calculate(need_result["mj"], 0, mj_total_feed);
    smrp = calculate(need_result["smrp"], 0, smrp_total_feed);
    ca = calculate(need_result["ca"], 0, ca_total_feed);
    p = calculate(need_result["p"], 0, p_total_feed);
    mg = calculate(need_result["mg"], 0, mg_total_feed);
  }

  selen = calculate(need_result["selen"], 0, selen_total_feed);

  printResult(
    "feed",
    mj["given"],
    smrp["given"],
    ca_total_feed,
    p_total_feed,
    mg_total_feed,
    selen_total_feed
  );
  printResult(
    "total",
    mj["result"],
    smrp["result"],
    ca["result"],
    p["result"],
    mg["result"],
    selen["result"]
  );
}

/**
 * function for summarize the result
 */
function calculate(need, work, feed) {
  return {
    given: parseFloat(feed),
    result: parseFloat(feed) - parseFloat(need + work),
  };
}

function submitForm() {
  document.querySelector(".form-feed").submit();
}

function editCalculation(ratio_id, name) {
  window.location.href = "/calculate/" + name + "?q=" + ratio_id;

  let ratio = document.querySelector(".feed-ratio-ul-" + ratio_id);

  ratio.querySelectorAll("label").forEach((element) => {
    if (element.innerHTML == "amount") {
      let child_li = element.parentNode.querySelectorAll("li");

      for (let index = 0; index < child_li.length; index++) {
        addRow();
      }
    }
  });
}
