// Populate weight options
for (let i = 100; i <= 800; i += 100) {
  // get reference to select element
  let weight_select = document.getElementById("weight");

  // create new option element
  let option = document.createElement("option");

  // create text node to add to option element (opt)
  option.appendChild(document.createTextNode(i + "kg"));

  // set value property of opt
  option.value = i;

  // add opt to end of select box (sel)
  weight_select.appendChild(option);
}

/**
 * Catch form inputs in submit and display the results
 */
function profile_submit() {
  let mj;
  let smrp;

  let name = document.querySelector(".name").value;
  let born = document.querySelector(".born").value;
  let weight = document.querySelector(".weight").value;
  let look = document.querySelector(".hull").value;
  let type = document.querySelector(".type").value;

  let result_boxes = document.querySelectorAll(".result");

  result_boxes.forEach((element) => {
    element.style.display = "block";
  });

  // calculations
  let age = new Date().getFullYear() - born;
  if (age < 0) {
    console.error("Age must be a higer value");
    document.querySelector(".born").style.border = "1px solid red";
    return;
  }
  base_amount_calculation(age, weight, type);

  work_amount_calculation(weight);

  let profile = {
    age: age,
    weight: weight,
    type: type,
  };
  return profile;
}

/**
 * Calculate the amount of energy the work needs. And print result.
 * @param {int} weight
 */
function work_amount_calculation(weight) {
  // Result container
  let result_work = document.querySelector(".result-work");

  let walk_time = document.querySelector(".walk").value;
  let trot_time = document.querySelector(".trot").value;

  walk_mj = (((0.2 / 100) * weight) / 10) * walk_time;
  walk_smrp = 6 * walk_mj;

  trot_mj = (((1.3 / 100) * weight) / 10) * trot_time;
  trot_smrp = 6 * trot_mj;

  mj = walk_mj + trot_mj;
  smrp = trot_smrp + walk_smrp;

  // Print result and round to closest Integer.
  result_work.appendChild(document.createTextNode("Mj = " + Math.round(mj)));
  result_work.appendChild(document.createElement("br"));
  result_work.appendChild(
    document.createTextNode("G smb rp = " + Math.round(smrp))
  );

  return { mj: mj, smrp: smrp };
}

function base_amount_calculation(age, weight, type) {
  // Result container
  let result_need = document.querySelector(".result-need");
  // General need for adult horse.
  mj = 0.5 * parseInt(weight) ** 0.75;
  smrp = mj * 6;

  if (age < 3) {
    // Todo
  } else if (age < 20) {
    if (type == "type-normal") {
      mj = mj * 1.05;
      smrp = smrp * 1.05;
    } else if (type == "type-hard") {
      mj = mj * 1.1;
      smrp = smrp * 1.1;
    }

    // Print result and round to closest Integer.
    result_need.appendChild(document.createTextNode("Mj = " + Math.round(mj)));
    result_need.appendChild(document.createElement("br"));
    result_need.appendChild(
      document.createTextNode("G smb rp = " + Math.round(smrp))
    );
    let result = { mj: mj, smrp: smrp };
    return result;
  } else {
    // If older than 20
    smrp = smrp + mj * 6;
  }
}

/**
 *
 * @param {int} weight
 */
function mineral_calculation(weight) {}

function feed_calculation() {
  let result_feed = document.querySelector(".result-feed");
  let profile = profile_submit();
  let need_result = base_amount_calculation(
    profile["age"],
    profile["weight"],
    profile["type"]
  );
  let work_result = work_amount_calculation(profile["weight"]);
  let hay_result = hay_calculation();

  let total_needed_mj = need_result["mj"] + work_result["mj"];
  let total_given_mj = hay_result["mj"];
  let total_needed_smrp = need_result["smrp"] + work_result["smrp"];
  let total_given_smrp = hay_result["smrp"];

  let result_mj = parseFloat(total_given_mj) - parseFloat(total_needed_mj);
  let result_smrp =
    parseFloat(total_given_smrp) - parseFloat(total_needed_smrp);

  result_feed.appendChild(
    document.createTextNode("Tilldelat MJ: " + result_mj)
  );
  result_feed.appendChild(document.createElement("br"));
  result_feed.appendChild(
    document.createTextNode("Tilldelat g smb rp: " + result_smrp)
  );
  result_feed.appendChild(document.createElement("br"));
}

/**
 * TODO
 */
function hay_calculation() {
  let result_feed = document.querySelector(".result-feed");
  let mj;
  let smrp;
  let ca;
  let p;
  let ca_p;
  let mg;
  let selen;

  let hay_amount = document.querySelector(".hay-amount").value;
  let hay_solids = document.querySelector(".hay-solids").value;
  let hay_mj = document.querySelector(".hay-mj").value;
  let hay_smrp = document.querySelector(".hay-smrp").value;
  let hay_ca = document.querySelector(".hay-ca").value;
  let hay_p = document.querySelector(".hay-p").value;
  let hay_mg = document.querySelector(".hay-mg").value;
  let hay_se = document.querySelector(".hay-se").value;

  hay_solids = parseFloat(hay_solids / 100);
  hay_solid_amount = parseFloat(hay_amount) * parseFloat(hay_solids);
  hay_smrp = parseFloat(hay_smrp);
  hay_ca = parseFloat(hay_ca);
  hay_p = parseFloat(hay_p);
  hay_mg = parseFloat(hay_mg);
  hay_se = parseFloat(hay_se);

  mj = Math.round(hay_solid_amount * hay_mj);
  smrp = Math.round(hay_smrp * hay_amount);
  ca = Math.round(hay_ca * hay_solid_amount);
  p = Math.round(hay_p * hay_solid_amount);
  ca_p = Math.round(ca / p);
  mg = Math.round(hay_mg * hay_solid_amount);
  selen = Math.round(hay_se * hay_solid_amount);

  let result = {
    mj: mj,
    smrp: smrp,
    ca: ca,
    p: p,
    "ca/p": ca_p,
    mg: mg,
    selen: selen,
  };

  return result;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUG9wdWxhdGUgd2VpZ2h0IG9wdGlvbnNcbmZvciAobGV0IGkgPSAxMDA7IGkgPD0gODAwOyBpICs9IDEwMCkge1xuICAvLyBnZXQgcmVmZXJlbmNlIHRvIHNlbGVjdCBlbGVtZW50XG4gIGxldCB3ZWlnaHRfc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlaWdodCcpO1xuXG4gIC8vIGNyZWF0ZSBuZXcgb3B0aW9uIGVsZW1lbnRcbiAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXG4gIC8vIGNyZWF0ZSB0ZXh0IG5vZGUgdG8gYWRkIHRvIG9wdGlvbiBlbGVtZW50IChvcHQpXG4gIG9wdGlvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShpICsgJ2tnJykpO1xuXG4gIC8vIHNldCB2YWx1ZSBwcm9wZXJ0eSBvZiBvcHRcbiAgb3B0aW9uLnZhbHVlID0gaTsgXG5cbiAgLy8gYWRkIG9wdCB0byBlbmQgb2Ygc2VsZWN0IGJveCAoc2VsKVxuICB3ZWlnaHRfc2VsZWN0LmFwcGVuZENoaWxkKG9wdGlvbik7IFxufVxuXG4vKipcbiAqIENhdGNoIGZvcm0gaW5wdXRzIGluIHN1Ym1pdCBhbmQgZGlzcGxheSB0aGUgcmVzdWx0c1xuICovXG5mdW5jdGlvbiBwcm9maWxlX3N1Ym1pdCgpIHtcbiAgbGV0IG1qXG4gIGxldCBzbXJwXG5cbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZScpLnZhbHVlXG4gIGxldCBib3JuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvcm4nKS52YWx1ZVxuICBsZXQgd2VpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlaWdodCcpLnZhbHVlXG4gIGxldCBsb29rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmh1bGwnKS52YWx1ZVxuICBsZXQgdHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50eXBlJykudmFsdWVcblxuICBsZXQgcmVzdWx0X2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlc3VsdCcpXG5cbiAgcmVzdWx0X2JveGVzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJyBcbiAgfSk7XG5cbiAgLy8gY2FsY3VsYXRpb25zXG4gIGxldCBhZ2UgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSBib3JuXG4gIGlmIChhZ2UgPCAwKSB7XG4gICAgY29uc29sZS5lcnJvcignQWdlIG11c3QgYmUgYSBoaWdlciB2YWx1ZScpXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvcm4nKS5zdHlsZS5ib3JkZXI9XCIxcHggc29saWQgcmVkXCJcbiAgICByZXR1cm5cbiAgfVxuICBiYXNlX2Ftb3VudF9jYWxjdWxhdGlvbiAoYWdlLCB3ZWlnaHQsIHR5cGUpXG5cbiAgd29ya19hbW91bnRfY2FsY3VsYXRpb24od2VpZ2h0KVxuXG4gIGxldCBwcm9maWxlID0ge1xuICAgICdhZ2UnOiBhZ2UsXG4gICAgJ3dlaWdodCcgOiB3ZWlnaHQsXG4gICAgJ3R5cGUnIDogdHlwZVxuICB9XG4gIHJldHVybiBwcm9maWxlXG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIHRoZSBhbW91bnQgb2YgZW5lcmd5IHRoZSB3b3JrIG5lZWRzLiBBbmQgcHJpbnQgcmVzdWx0LlxuICogQHBhcmFtIHtpbnR9IHdlaWdodCBcbiAqL1xuZnVuY3Rpb24gd29ya19hbW91bnRfY2FsY3VsYXRpb24od2VpZ2h0KSB7XG4gIC8vIFJlc3VsdCBjb250YWluZXJcbiAgbGV0IHJlc3VsdF93b3JrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdC13b3JrJylcblxuICBsZXQgd2Fsa190aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndhbGsnKS52YWx1ZVxuICBsZXQgdHJvdF90aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyb3QnKS52YWx1ZVxuXG4gIHdhbGtfbWogPSAoKCgwLjIvMTAwKSAqIHdlaWdodCkgLyAxMCkgKiB3YWxrX3RpbWVcbiAgd2Fsa19zbXJwID0gNiAqIHdhbGtfbWpcblxuICB0cm90X21qID0gKCgoMS4zLzEwMCkgKiB3ZWlnaHQpIC8gMTApICogdHJvdF90aW1lXG4gIHRyb3Rfc21ycCA9IDYgKiB0cm90X21qXG5cbiAgbWogPSB3YWxrX21qICsgdHJvdF9talxuICBzbXJwID0gdHJvdF9zbXJwICsgd2Fsa19zbXJwXG5cbiAgLy8gUHJpbnQgcmVzdWx0IGFuZCByb3VuZCB0byBjbG9zZXN0IEludGVnZXIuXG4gIHJlc3VsdF93b3JrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdNaiA9ICcgKyBNYXRoLnJvdW5kKG1qKSkpXG4gIHJlc3VsdF93b3JrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG4gIHJlc3VsdF93b3JrLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdHIHNtYiBycCA9ICcgKyBNYXRoLnJvdW5kKHNtcnApKSlcblxuICByZXR1cm4geydtaic6IG1qLCdzbXJwJzogc21ycH1cbn1cblxuZnVuY3Rpb24gYmFzZV9hbW91bnRfY2FsY3VsYXRpb24gKGFnZSwgd2VpZ2h0LCB0eXBlKSB7XG4gIC8vIFJlc3VsdCBjb250YWluZXJcbiAgbGV0IHJlc3VsdF9uZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdC1uZWVkJylcbiAgLy8gR2VuZXJhbCBuZWVkIGZvciBhZHVsdCBob3JzZS5cbiAgbWogPSAwLjUgKiAocGFyc2VJbnQod2VpZ2h0KSoqMC43NSlcbiAgc21ycCA9IG1qICogNlxuXG4gIGlmIChhZ2UgPCAzKSB7XG4gICAgLy8gVG9kb1xuICB9XG4gIGVsc2UgaWYgKGFnZSA8IDIwKSB7XG4gIFxuICAgIGlmICh0eXBlID09ICd0eXBlLW5vcm1hbCcpIHtcbiAgICAgIG1qID0gbWogKiAxLjA1XG4gICAgICBzbXJwID0gc21ycCAqIDEuMDVcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZSA9PSAndHlwZS1oYXJkJykge1xuICAgICAgbWogPSBtaiAqIDEuMVxuICAgICAgc21ycCA9IHNtcnAgKiAxLjFcblxuICAgIH1cblxuICAgIC8vIFByaW50IHJlc3VsdCBhbmQgcm91bmQgdG8gY2xvc2VzdCBJbnRlZ2VyLlxuICAgIHJlc3VsdF9uZWVkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdNaiA9ICcgKyBNYXRoLnJvdW5kKG1qKSkpXG4gICAgcmVzdWx0X25lZWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcbiAgICByZXN1bHRfbmVlZC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnRyBzbWIgcnAgPSAnICsgTWF0aC5yb3VuZChzbXJwKSkpXG4gICAgbGV0IHJlc3VsdCA9IHsnbWonOiBtaiwgJ3NtcnAnOiBzbXJwfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBJZiBvbGRlciB0aGFuIDIwXG4gICAgc21ycCA9IHNtcnAgKyAobWogKiA2KVxuICBcbiAgfVxufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIHtpbnR9IHdlaWdodCBcbiAqL1xuZnVuY3Rpb24gbWluZXJhbF9jYWxjdWxhdGlvbih3ZWlnaHQpIHtcblxufVxuXG5cbmZ1bmN0aW9uIGZlZWRfY2FsY3VsYXRpb24oKSB7XG4gIGxldCByZXN1bHRfZmVlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZXN1bHQtZmVlZCcpXG4gIGxldCBwcm9maWxlID0gcHJvZmlsZV9zdWJtaXQoKVxuICBsZXQgbmVlZF9yZXN1bHQgPSBiYXNlX2Ftb3VudF9jYWxjdWxhdGlvbihwcm9maWxlWydhZ2UnXSxwcm9maWxlWyd3ZWlnaHQnXSwgcHJvZmlsZVsndHlwZSddKVxuICBsZXQgd29ya19yZXN1bHQgPSB3b3JrX2Ftb3VudF9jYWxjdWxhdGlvbihwcm9maWxlWyd3ZWlnaHQnXSlcbiAgbGV0IGhheV9yZXN1bHQgPSBoYXlfY2FsY3VsYXRpb24oKTtcblxuICBjb25zb2xlLmxvZyhwcm9maWxlKTtcbiAgY29uc29sZS5sb2cobmVlZF9yZXN1bHQpO1xuICBjb25zb2xlLmxvZyh3b3JrX3Jlc3VsdCk7XG4gIGNvbnNvbGUubG9nKGhheV9yZXN1bHQpO1xuICBcbiAgbGV0IHRvdGFsX25lZWRlZF9taiA9IG5lZWRfcmVzdWx0WydtaiddICsgd29ya19yZXN1bHRbJ21qJ107XG4gIGxldCB0b3RhbF9naXZlbl9taiA9IGhheV9yZXN1bHRbJ21qJ11cbiAgbGV0IHRvdGFsX25lZWRlZF9zbXJwID0gbmVlZF9yZXN1bHRbJ3NtcnAnXSArIHdvcmtfcmVzdWx0WydzbXJwJ107XG4gIGxldCB0b3RhbF9naXZlbl9zbXJwID0gaGF5X3Jlc3VsdFsnc21ycCddXG5cbiAgbGV0IHJlc3VsdF9taiA9IChwYXJzZUZsb2F0KHRvdGFsX2dpdmVuX21qKSAtIHBhcnNlRmxvYXQodG90YWxfbmVlZGVkX21qKSk7XG4gIGxldCByZXN1bHRfc21ycCA9IChwYXJzZUZsb2F0KHRvdGFsX2dpdmVuX3NtcnApIC0gcGFyc2VGbG9hdCh0b3RhbF9uZWVkZWRfc21ycCkpO1xuXG4gIHJlc3VsdF9mZWVkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdUaWxsZGVsYXQgTUo6ICcgKyAgcmVzdWx0X21qKSlcbiAgcmVzdWx0X2ZlZWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcbiAgcmVzdWx0X2ZlZWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJ1RpbGxkZWxhdCBnIHNtYiBycDogJyArICByZXN1bHRfc21ycCkpXG4gIHJlc3VsdF9mZWVkLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2JyJykpXG5cbn1cblxuLyoqXG4gKiBUT0RPXG4gKi9cbmZ1bmN0aW9uIGhheV9jYWxjdWxhdGlvbigpIHtcbiAgbGV0IHJlc3VsdF9mZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3VsdC1mZWVkJylcbiAgbGV0IG1qXG4gIGxldCBzbXJwXG4gIGxldCBjYVxuICBsZXQgcFxuICBsZXQgY2FfcFxuICBsZXQgbWdcbiAgbGV0IHNlbGVuXG5cblxuICBsZXQgaGF5X2Ftb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYXktYW1vdW50JykudmFsdWVcbiAgbGV0IGhheV9zb2xpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGF5LXNvbGlkcycpLnZhbHVlXG4gIGxldCBoYXlfbWogPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGF5LW1qJykudmFsdWVcbiAgbGV0IGhheV9zbXJwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhheS1zbXJwJykudmFsdWVcbiAgbGV0IGhheV9jYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYXktY2EnKS52YWx1ZVxuICBsZXQgaGF5X3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGF5LXAnKS52YWx1ZVxuICBsZXQgaGF5X21nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhheS1tZycpLnZhbHVlXG4gIGxldCBoYXlfc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGF5LXNlJykudmFsdWVcblxuICBoYXlfc29saWRzID0gcGFyc2VGbG9hdChoYXlfc29saWRzLzEwMClcbiAgaGF5X3NvbGlkX2Ftb3VudCA9IHBhcnNlRmxvYXQoaGF5X2Ftb3VudCkgKiBwYXJzZUZsb2F0KGhheV9zb2xpZHMpXG4gIGhheV9zbXJwID0gcGFyc2VGbG9hdChoYXlfc21ycClcbiAgaGF5X2NhID0gcGFyc2VGbG9hdChoYXlfY2EpXG4gIGhheV9wID0gcGFyc2VGbG9hdChoYXlfcClcbiAgaGF5X21nID0gcGFyc2VGbG9hdChoYXlfbWcpXG4gIGhheV9zZSA9IHBhcnNlRmxvYXQoaGF5X3NlKVxuXG4gIG1qID0gTWF0aC5yb3VuZChoYXlfc29saWRfYW1vdW50ICogaGF5X21qKVxuICBzbXJwID0gTWF0aC5yb3VuZChoYXlfc21ycCAqIGhheV9hbW91bnQpXG4gIGNhID0gTWF0aC5yb3VuZChoYXlfY2EgKiBoYXlfc29saWRfYW1vdW50KVxuICBwID0gTWF0aC5yb3VuZChoYXlfcCAqIGhheV9zb2xpZF9hbW91bnQpXG4gIGNhX3AgPSBNYXRoLnJvdW5kKGNhL3ApXG4gIG1nID0gTWF0aC5yb3VuZChoYXlfbWcgKiBoYXlfc29saWRfYW1vdW50KVxuICBzZWxlbiA9IE1hdGgucm91bmQoaGF5X3NlICogaGF5X3NvbGlkX2Ftb3VudClcblxuICBsZXQgcmVzdWx0ID0geydtaic6IG1qLCAnc21ycCc6IHNtcnAsICdjYSc6IGNhLCAncCc6IHAsICdjYS9wJzogY2FfcCwgJ21nJzogbWcsICdzZWxlbic6IHNlbGVufVxuICBcbiAgLy8gcmVzdWx0LmZvckVhY2goZWxlbWVudCA9PiB7XG4gIC8vICAgcmVzdWx0X2ZlZWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZWxlbWVudCkpXG4gIC8vICAgcmVzdWx0X2ZlZWQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnInKSlcblxuICAvLyAgIGNvbnNvbGUubG9nKGVsZW1lbnQpO1xuICAgIFxuICAvLyB9KTtcblxuICByZXR1cm4gcmVzdWx0XG5cbn0iXX0=
