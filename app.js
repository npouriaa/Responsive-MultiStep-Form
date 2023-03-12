//variables
const items_circle = document.querySelectorAll(".items-con li .circle"),
  items = document.querySelectorAll(".items-con li"),
  step_number = document.querySelector(".step-number"),
  step_title = document.querySelector(".step-title"),
  step_title_details = document.querySelector(".step-title-details"),
  step_con = document.querySelector(".step-con"),
  previousBtn = document.querySelector(".previousBtn"),
  nextBtn = document.querySelector(".nextBtn"),
  Vtext = document.querySelector(".v-text"),
  container = document.querySelector(".container"),
  main_content = document.querySelector(".main-content"),
  header_con = document.querySelector(".main-content-header"),
  btn_con = document.querySelector(".main-content-form-btn-con"),
  form = document.querySelector(".main-content-form");
  //The steps content comes from this array
  stepContent = [
    {
      step: 1,
      title: "Lets start with your name",
      title_details: "Please fill the details below",
      content: `
            <div class="main-content-form-section input-v">
                <label for="">Enter your name</label>
                <input class="" type="text" name="" id="">
            </div>
            `,
    },
    {
      step: 2,
      title: "Whats best describe you?",
      title_details: "Please let us know what type of business describe you",
      content: `
        <div class="main-content-form-section btn-v-con">
            <div class="main-content-form-section-content">
                <button type="button" class="btn-v"></button>
                <div class="main-content-form-section-content-text-centent-con">
                    <img src="./images/celebration-emooji.webp" alt="">
                    <div class="main-content-form-section-content-text-centent">
                        <h4>New Business</h4>
                        <p class="text-gray">Started trading whitin the last 12 month</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-content-form-section btn-v-con">
            <div class="main-content-form-section-content">
                <button type="button" class="btn-v"></button>
                <div class="main-content-form-section-content-text-centent-con">
                    <img src="./images/smiling-face-with-sunglasses.png" alt="">
                    <div class="main-content-form-section-content-text-centent">
                        <h4>Existing Business</h4>
                        <p class="text-gray">Have been operating beyond last 12 month</p>
                    </div>
                </div>
            </div>
        </div>
            `,
    },

    {
      step: 3,
      title: "Please select your budget",
      title_details: "Please let us known the budget for your project",
      content: `
            <div class="main-content-form-section v-range">
                <input min='5000' max="25000" type="range" class="v-range-input" name="" id="">
                <div class="chart-line">
                    <p>|</p>
                    <p>|</p>
                    <p>|</p>
                    <p>|</p>
                    <p>|</p>
                </div>
                <div class="chart-number">
                    <p class="text-gray">5,000</p>
                    <p class="text-gray">10,000</p>
                    <p class="text-gray">15,000</p>
                    <p class="text-gray">20,000</p>
                    <p class="text-gray">25,000</p>
                </div>
            </div>
            `,
    },
    {
      step: 4,
      title: "Complete Submission",
      title_details:
        "Please enter your email below and we will be in contact whitin 24 hours",
      content: `
            <div class="main-content-form-section input-v">
                <label for="">Enter your email</label>
                <input type="email" class="input-v" name="" id="">
            </div>
            `,
    },
],
  //The information entered by user  
  stepContent_answers = {
    name: "",
    describe: "",
    budget: "",
    email: "",
  };

let sIndex = 0; //Step index

//EventListeners
step_con.addEventListener("click", function (e) {
  if (sIndex == 1) {
    if (e.target.classList.contains("btn-v")) {
      let title =
        e.target.nextElementSibling.children[1].children[0].textContent;
      stepContent_answers.describe = title;
    }
  }
  if (sIndex == 2) {
    if (e.target.classList.contains("v-range-input")) {
      let Rangevalue = e.target.value;
      stepContent_answers.budget = Rangevalue;
    }
  }
});
document.addEventListener("DOMContentLoaded", loadStep(sIndex));
nextBtn.addEventListener("click", nextStep);
previousBtn.addEventListener("click", previousStep);

//functions

//Load Step Function
function loadStep(index) {
  step_number.innerHTML = `Step ${stepContent[index].step}/4`;
  step_title.innerHTML = stepContent[index].title;
  step_title_details.innerHTML = stepContent[index].title_details;
  step_con.innerHTML = stepContent[index].content;
  index == 3
    ? (nextBtn.innerHTML = "Submit") -
      nextBtn.classList.add("submit") -
      nextBtn.classList.remove("next")
    : (nextBtn.innerHTML = "Next") -
      nextBtn.classList.add("next") -
      nextBtn.classList.remove("submit");

  if (index == 0) {
    step_con.children[0].children[1].value = stepContent_answers.name;
  }
  if (index == 1) {
    Array.from(step_con.children).map((i) => {
      if (
        i.children[0].children[1].children[1].children[0].textContent ==
        stepContent_answers.describe
      ) {
        i.children[0].children[0].style.border = "2px solid #25CC88";
      }
    });
  }

  if (index == 2) {
    Array.from(step_con.children).map((i) => {
      i.children[0].value = stepContent_answers.budget;
    });
  }

  if (index == 3) {
    step_con.children[0].children[1].value = stepContent_answers.email;
  }
}

//Next Step Function
function nextStep() {
  let once = false;
  var arr = Array.from(step_con.children);
  if (nextBtn.classList.contains("next")) {
    vOptions(arr, "name", "name");
    arr.forEach((i) => {
      if (i.classList.contains("btn-v-con")) {
        if (stepContent_answers.describe == "") {
          Vtext.innerHTML = "Please select one option to continue";
        } else {
          if (!once) {
            sIndex++;
            once = true;
          }
          return (Vtext.innerHTML = "");
        }
      } else if (i.classList.contains("v-range")) {
        sIndex++;
      }
    });
    if (sIndex > stepContent.length - 1) sIndex = stepContent.length;
    loadStep(sIndex);
    items_circle[sIndex].style.backgroundColor = "#25CC88";
  } else {
    vOptions(arr, "email", "email");
  }
}

//Previous Step Function
function previousStep() {
  sIndex--;
  if (sIndex < 0) sIndex = 0;
  items_circle[sIndex + 1].style.backgroundColor = "#232360";
  loadStep(sIndex);
}

//Validate Inputs step Function
function vOptions(array, arrayOption, vText) {
  array.forEach((i) => {
    if (i.classList.contains("input-v")) {
      if (i.children[1].value == "") {
        Vtext.innerHTML = `Please enter your ${vText}`;
      } else {
        Vtext.innerHTML = "";
        if (arrayOption == "name") {
          stepContent_answers.name = i.children[1].value;
          sIndex++;
        }
        if (arrayOption == "email") {
          //Show Profile Section
          stepContent_answers.email = i.children[1].value;
          items_circle[4].style.backgroundColor = "#25CC88";
          step_title.textContent = "Registration Completed";
          step_number.style.display = "none";
          step_title_details.style.display = "none";
          header_con.style.justifyContent = "end";
          form.innerHTML = `
          <div class="main-content-lastForm">
            <div class="main-content-lastForm-row">
              <h3>Name :</h3>
              <p class="">${stepContent_answers.name}</p>
            </div>
            <div class="main-content-lastForm-row">
              <h3>Describe :</h3>
              <p class="">${stepContent_answers.describe}</p>
            </div>
            <div class="main-content-lastForm-row">
              <h3>Budget :</h3>
              <p class="">${stepContent_answers.budget} $</p>
            </div>
            <div class="main-content-lastForm-row">
              <h3>Email :</h3>
              <p class="">${stepContent_answers.email}</p>
            </div>
          </div>
        `;
          btn_con.children[1].innerHTML = "Reload";
          btn_con.children[1].addEventListener("click", () =>
            window.location.reload()
          );
        }
      }
    }
  });
}