export function getRemainingPeople(people, person) {
  return people.filter(x => x !== person)
}

export function getRandomPerson(people) {
  return people[Math.floor(Math.random() * people.length)];
}
