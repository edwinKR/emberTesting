import Service, { inject } from '@ember/service';
import { later } from '@ember/runloop';

//Can check in the ember-composable-helpers github opensource to find the helper functions I need and just import it here to use it.
import { shuffle } from 'ember-composable-helpers/helpers/shuffle';

export default Service.extend({
  store: inject(),

  init() {
    this._super(...arguments);

    console.log('Game simulator...');

    this.seedTeams();

    later(this, this.simulateGame, 1000);
  },

  seedTeams() {
    let teamNames = ['Team1', 'Team2', 'Team3', 'Team4'];

    //Create a model
    for (let i = 0; i < teamNames.length; i++) {
      this.store.createRecord('team', { id: i, name: teamNames[i] })
    }
  },

  simulateGame() {
    //Get entire teams from the store.
    let teams = this.store.peekAll('team');

    //Shuffle teams
    let shuffledTeams = shuffle(teams);

    let homeTeam = shuffledTeams[0];
    let awayTeam = shuffledTeams[1];

    let homeGoals = this.randomScore(4);
    let awayGoals = this.randomScore(3);

    console.log(homeGoals)
    console.log(awayGoals)
  },

  randomScore(maximumGoals) {
    return Math.round(Math.random() * maximumGoals)
  }
});
