export function updatePlayers(picker, performer, pickersList, performersList) {
  generateList(pickersList, '#newPlayers');
  generateList(pickersList, '#pickers');
  generateList(performersList, '#performers');

  if (picker && performer) {
    displayResults(picker, performer);
  }
}

export function toggleButton(element, enable) {
  if (enable) {
    element.classList.remove('disabled-button');
    element.classList.add('active-button');
  } else {
    element.classList.add('disabled-button');
    element.classList.remove('active-button');
    element.setAttribute('disabled', true);
    element.removeEventListener('click', () => {})
  }
}

export function changeLayout() {
  document.getElementById('gameSetup').style.display = 'none';
  document.querySelectorAll('.container').forEach(element => {
    element.style.display = 'block';
  });
}

function generateList(list, element) {
  const newList = list.map(item => `<li>${item}</li>`).join('');
  document.querySelector(element).innerHTML = newList;
}

function displayResults(picker, performer) {
  document.querySelector('#combination').innerHTML += `<li>Picker: ${picker}, Performer: ${performer}</li>`;
}

