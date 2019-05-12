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


  isDraw: computed('homeGoals', 'awayGoals', function() {
    return this.homeGoals === this.awayGoals
  }),

  isHomeWin: computed('homeGoals', 'awayGoals', function() {
    return this.homeGoals > this.awayGoals
  }),
  isAwayWin: computed('homeGoals', 'awayGoals', function() {
    return this.homeGoals < this.awayGoals
  }),

  winningTeam: computed('isHomeWin', 'isAwayWin', 'homeTeam', 'awayTeam', function() {
    if (this.isHomeWin) {
      return this.homeTeam;
    } else if (this.AwayWin) {
      return this.awayTeam;
    }
  })
});
