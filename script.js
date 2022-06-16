const skills = {
  General: {
    Bushcraft: {
      general: 400,
      ranger: 700,
      rogue: 600,
      adventurer: 500,
    },
    Climbing: {
      general: 400,
      ranger: 700,
      rogue: 600,
      "treasure-hunter": 500,
      adventurer: 400,
    },
    Fishing: {
      general: 400,
      adventurer: 500,
    },
    Meditation: {
      general: 200,
      primalist: 500,
      arcanist: 300,
      guardian: 200,
      scholar: 200,
    },
    Perception: {
      general: 400,
      ranger: 700,
      rogue: 700,
      "treasure-hunter": 700,
      adventurer: 400,
    },
    Riding: {
      general: 400,
      adventurer: 500,
    },
    Stealth: {
      general: 400,
      rogue: 700,
      nightblade: 600,
      ranger: 600,
      adventurer: 500,
    },
    Swimming: {
      general: 400,
      ranger: 600,
      "treasure-hunter": 600,
      adventurer: 500,
    },
    Tracking: {
      general: 400,
      ranger: 700,
      "treasure-hunter": 600,
      adventurer: 500,
    },
  },
  Combat: {
    "Armor Use": {
      general: 400,
      bard: 500,
      ranger: 600,
      warrior: 700,
    },
    Dodge: {
      general: 400,
      adventurer: 500,
      bard: 600,
      warrior: 700,
      ranger: 700,
      rogue: 700,
    },
    "Melee Combat": {
      general: 400,
      adventurer: 500,
      bard: 550,
      ranger: 600,
      warrior: 700,
    },
    "Ranged Combat": {
      general: 400,
      adventurer: 500,
      bard: 550,
      ranger: 650,
      warrior: 700,
    },
    "Shield Use": {
      general: 400,
      bard: 500,
      warrior: 700,
    },
  },
  Scholar: {
    Arcana: {
      general: 100,
      "treasure-hunter": 200,
      ranger: 300,
      scholar: 400,
      bard: 400,
      warlock: 500,
      arcanist: 700,
    },
    Druidry: {
      berserker: 300,
      ranger: 300,
      primalist: 700,
    },
    Linguistics: {
      general: 100,
      scholar: 400,
      adventurer: 500,
      bard: 600,
    },
    Medical: {
      general: 250,
      scholar: 400,
      physicker: 700,
    },
    Sorcery: {
      nightblade: 200,
      warlock: 700,
    },
    Trading: {
      scholar: 400,
    },
  },
  Profession: {
    "Animal Husbandry": {
      general: 400,
    },
    Construction: {
      general: 400,
    },
    Cooking: {
      general: 400,
    },
    Farming: {
      general: 400,
    },
    Leatherworking: {
      general: 400,
      ranger: 600,
    },
    Locksmithing: {
      adventurer: 300,
      nightblade: 400,
      bard: 600,
      "treasure-hunter": 700,
      rogue: 700,
    },
    Masonry: {
      general: 400,
    },
    Metalworking: {
      general: 400,
    },
    Mining: {
      general: 400,
    },
    Pottery: {
      general: 400,
    },
    Skinning: {
      general: 400,
      adventurer: 500,
      ranger: 700,
    },
    Tailoring: {
      general: 400,
    },
    Weaving: {
      general: 400,
    },
    Woodcutting: {
      general: 400,
      ranger: 600,
    },
    Woodworking: {
      general: 400,
      ranger: 600,
    },
  },
  Performing: {
    Acrobatics: {
      duelist: 600,
      nightblade: 600,
      bard: 700,
    },
    Artifice: {
      marauder: 500,
      adventurer: 500,
      "treasure-hunter": 600,
      nightblade: 600,
      rogue: 700,
      bard: 700,
    },
    Dancing: {},
    Music: {
      bard: 700,
    },
    Storytelling: {
      general: 200,
      adventurer: 500,
      bard: 700,
    },
  },
};

const getIncrementCost = (number) => {
  if (!number || number === 0) return false;
  const n = parseInt(number, 10);
  if (n <= 99) return 1;
  if (n >= 100 && n <= 199) return 2;
  if (n >= 200 && n <= 299) return 3;
  if (n >= 300 && n <= 399) return 4;
  if (n >= 400 && n <= 499) return 5;
  if (n >= 500 && n <= 599) return 6;
  if (n >= 600 && n <= 699) return 7;
  if (n === 700) return 8;
};

const updateSkillValues = (event) => {
  const inputs = Array.from(document.querySelectorAll("input.text-input"));
  let total = parseInt(0);
  inputs.forEach((input) => {
    const value = parseInt(input.value, 10);
    const cost = getIncrementCost(input.value);
    const costValue = value * cost;
    total = total + costValue;
  });
  updateTotal(total);
};

const checkValueIsValid = (event) => {
  const input = event.target;
  const max = parseInt(input.getAttribute("max"), 10);
  if (input.value === 0 || !input.value) {
    input.value = 0;
  }
  if (input.value > max) {
    input.value = max;
  }
  updateSkillValues(event);
};

const applyListenerToInputs = () => {
  const skillInputs = Array.from(document.querySelectorAll("[data-js]"));
  skillInputs.forEach((input) => {
    input.addEventListener("change", (event) => checkValueIsValid(event));
    input.addEventListener("blur", (event) => checkValueIsValid(event));
  });
};

const updateTotal = (newTotal) => {
  const total = document.querySelector("#available");
  const internationalNumberFormat = new Intl.NumberFormat("en-US");
  total.innerText = internationalNumberFormat.format(10000 - newTotal);
};

const createSkillRow = (skill, allSkillClasses, chosenClass, index) => {
  const classname = chosenClass || "general";
  return `
<tr>
  <th>${skill}</th>
  <td><input type="number" id="${skill}-${index}" class="form text-input" min="0" max="${
    allSkillClasses[chosenClass] || 400
  }" data-js="updateSkillValues" aria-label="${skill}" value="0" ${
    !allSkillClasses[classname] && "disabled=disabled"
  } /></td>
  <td><span class="text value" id="${skill}-value">${
    allSkillClasses[classname] || "N/A"
  }</span></td>
</tr>
`;
};

const buildSkillTable = (key, chosenClass) => {
  const skillTable = [];
  let i = 1;
  for (const k in skills[key]) {
    const allSkillClasses = skills[key][k];
    i++;
    skillTable.push(createSkillRow(k, allSkillClasses, chosenClass, i));
  }
  document.querySelector(`#${key.toLowerCase()}-skills`).innerHTML =
    skillTable.join("");
  applyListenerToInputs();
};

const rebuildSkillTable = (chosenClass) => {
  Object.keys(skills).forEach((skill) => buildSkillTable(skill, chosenClass));
};

const updateClassSkills = (chosenClass) => {
  rebuildSkillTable(chosenClass);
};

const applyListenerToClass = () => {
  const classSelector = document.querySelector("#class");
  const func = (event) => {
    updateClassSkills(event.target.value);
    updateTotal(0);
  };
  classSelector.addEventListener("change", (event) => func(event));
  classSelector.addEventListener("blur", (event) => func(event));
};

document.addEventListener("DOMContentLoaded", () => {
  applyListenerToInputs();
  applyListenerToClass();
});
