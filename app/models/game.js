import DS from 'ember-data';
const { Model } = DS;

import { computed } from '@ember/object'

//Can define associations here.
export default Model.extend({
  //Need to specify inverse b/c each team will have different keys on the team model.
  homeTeam: DS.belongsTo('team', { inverse: 'homeGames'}),
  awayTeam: DS.belongsTo('team', { inverse: 'awayGames'}),
  homeGoals: DS.attr('number'),
  awayGoals: DS.attr('number'),
  playedOn: DS.attr('date'),

  isWon: computed('homeGoals', 'awayGoals', function() {
    return this.homeGoals > this.awayGoals
  }),

  isDraw: computed('homeGoals', 'awayGoals', function() {
    return this.homeGoals === this.awayGoals
  }),

  isLost: computed('homeGoals', 'awayGoals', function() {
    return this.homeGoals < this.awayGoals
  }),
});
