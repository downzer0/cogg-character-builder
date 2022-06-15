const skills = {
  General: [
    "Bushcraft",
    "Climbing",
    "Fishing",
    "Meditation",
    "Perception",
    "Riding",
    "Stealth",
    "Swimming",
    "Tracking",
  ],
  Combat: ["Armor Use", "Dodge", "Melee Combat", "Ranged Combat", "Shield Use"],
  Scholar: [
    "Arcana",
    "Druidry",
    "Linguistics",
    "Medical",
    "Sorcery",
    "Trading",
  ],
  Profession: [
    "Animal Husbandry",
    "Construction",
    "Cooking",
    "Farming",
    "Leatherworking",
    "Locksmithing",
    "Masonry",
    "Mining",
    "Pottery",
    "Skinning",
    "Tailoring",
    "Weaving",
    "Woodcutting",
    "Woodworking",
  ],
  Performing: ["Acrobatics", "Artifice", "Dancing", "Music", "Storytelling"],
};

const createSkillRow = (skill, index) =>
  `
<tr>
  <th>${skill}</th>
  <td><input type="number" id="${skill}-${index}" class="form text-input" data-js="updateSkillValues" aria-label="${skill}" value="0" /></td>
  <td><span class="text value" id="${skill}-value"></span></td>
</tr>
`;

const buildSkillTable = (key) => {
  const skillArray = skills[key];
  const skillTable = [];
  skillArray.forEach((skill, index) =>
    skillTable.push(createSkillRow(skill, index))
  );
  document.querySelector(`#${key.toLowerCase()}-skills`).innerHTML =
    skillTable.join("");
};
