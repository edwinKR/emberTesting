import Service, { inject } from '@ember/service';
import { later } from '@ember/runloop';

//Can check in the ember-composable-helpers github opensource to find the helper functions I need and just import it here to use it.
import { shuffle } from 'ember-composable-helpers/helpers/shuffle';

import { computed } from '@ember/object';

const DELAY_BETWEEN_GAMES = 1000;

export default Service.extend({
  store: inject(),

  //FYI - Arrow functions don't work for callbacks.
  teams: computed(function() {
    return this.store.peekAll('team');
  }),

  games: computed(function() {
    return this.store.peekAll('game');
  }),

  init() {
    this._super(...arguments);

    console.log('Game simulator...');

    this.seedTeams();

    later(this, this.simulateGame, DELAY_BETWEEN_GAMES);
  },

  seedTeams() {
    let teamNames = [
      'Bulls',
      'G.State',
      'Rockets',
      'Heats',
      'Knicks',
      'Lakers',
      'Clippers',
      'Nets',
      'Jazz',
      'Celtics'
    ];

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

    this.store.createRecord('game', {
      homeTeam,
      awayTeam,
      homeGoals,
      awayGoals,
      playedOn: new Date()
    });

    later(this, this.simulateGame, DELAY_BETWEEN_GAMES);
  },

  randomScore(maximumGoals) {
    return Math.round(Math.random() * maximumGoals)
  }
});

//After creating and seeding the models, pass in the generated data to the components.
