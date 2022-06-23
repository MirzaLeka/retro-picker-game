import { updatePlayers, toggleButton, changeLayout } from './ui-changes.js';
import { getRemainingPeople, getRandomPerson } from './filters.js';

let pickersList = [];
let performersList = [];
let previousPerformersList = [];

const errorElement = document.getElementById('inputError');

(() => {
  document.querySelector('#addPlayersInput').addEventListener('keydown', (event) => {

    if (errorElement) {
      errorElement.style.display = 'none';
    }

    if (event.key === 'Enter' && event.target.value && event.target.value.trim()) {
      addPlayers(event.target);
    }
  })

  document.getElementById('readyBtn').addEventListener('click', () => startGame())
})();

function addPlayers(inputElement) {

  const existingPlayers = pickersList.map(picker => picker.toLowerCase());

  if (existingPlayers.includes(inputElement.value.toLowerCase())) {
    handleErrors('Please avoid adding duplicate players');
    return;
  }

  pickersList.push(inputElement.value);
  pickersList.sort();
  performersList = [...pickersList];

  toggleButton(document.getElementById('readyBtn'), true);
  updatePlayers(null, null, pickersList, performersList);

  document.getElementById('playersTitle').style.display = 'block'
  inputElement.value = '';
}

function startGame() {

  if (!pickersList.length) {
    return;
  }

  if (pickersList.length < 2) {
    handleErrors('You need at least two players to start');
    return;
  }

  changeLayout();
  document.querySelector('#pickBtn').addEventListener('click', () => pickCombination())
}

function pickCombination() {

  const picker = getRandomPerson(pickersList);
  const remainingPickers = getRemainingPeople(pickersList, picker);
  const performersWithoutPickerList = getRemainingPeople(performersList, picker); // so that you cannot pick yourself

  const performer = getRandomPerson(performersWithoutPickerList);
  const remainingPerformers = getRemainingPeople(performersWithoutPickerList, performer);

  pickersList = [...remainingPickers];
  performersList = [...remainingPerformers];

  if (!previousPerformersList.includes(picker)) {
    performersList.push(picker)
    performersList.sort();
  }

  if (!pickersList.length) {
    toggleButton(document.getElementById('pickBtn'), false);
  }

  previousPerformersList.push(performer);
  updatePlayers(picker, performer, pickersList, performersList);
}

function handleErrors(errorMessage) {
  errorElement.textContent = errorMessage;
  errorElement.style.display = 'block';
}
