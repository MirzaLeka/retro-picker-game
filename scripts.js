import { updatePlayers, toggleButton, changeLayout } from './ui-changes.js';
import { getRemainingPeople, getRandomPerson } from './filters.js';

let challengersList = [];
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

  const existingPlayers = challengersList.map(challenger => challenger.toLowerCase());

  if (existingPlayers.includes(inputElement.value.toLowerCase())) {
    handleErrors('Please avoid adding duplicate players');
    return;
  }

  challengersList.push(inputElement.value);
  challengersList.sort();
  performersList = [...challengersList];

  toggleButton(document.getElementById('readyBtn'), true);
  updatePlayers(null, null, challengersList, performersList);

  document.getElementById('playersTitle').style.display = 'block'
  inputElement.value = '';
}

function startGame() {

  if (!challengersList.length) {
    return;
  }

  if (challengersList.length < 2) {
    handleErrors('You need at least two players to start');
    return;
  }

  changeLayout();
  document.querySelector('#pickBtn').addEventListener('click', () => challenge())
}

function challenge() {

  const challenger = getRandomPerson(challengersList);
  const remainingchallengers = getRemainingPeople(challengersList, challenger);
  const performersWithoutchallengerList = getRemainingPeople(performersList, challenger); // so that you cannot pick yourself

  const performer = getRandomPerson(performersWithoutchallengerList);
  const remainingPerformers = getRemainingPeople(performersWithoutchallengerList, performer);

  challengersList = [...remainingchallengers];
  performersList = [...remainingPerformers];

  if (!previousPerformersList.includes(challenger)) {
    performersList.push(challenger)
    performersList.sort();
  }

  if (!challengersList.length) {
    toggleButton(document.getElementById('pickBtn'), false);
  }

  previousPerformersList.push(performer);
  updatePlayers(challenger, performer, challengersList, performersList);
}

function handleErrors(errorMessage) {
  errorElement.textContent = errorMessage;
  errorElement.style.display = 'block';
}
