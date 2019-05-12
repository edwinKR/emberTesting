import DS from 'ember-data';
const { Model } = DS;

import { computed } from '@ember/object';
/* In the ember docs, there's a built-in macros: 'union', 'filterBy.          - union: Creates a join table.
   - filterBy
*/
import { union, filterBy, mapBy, sum } from '@ember/object/computed';

//Create Model.
export default Model.extend({
  name: DS.attr('string'),
  homeGames: DS.hasMany('game', { inverse: 'homeTeam'}),
  awayGames: DS.hasMany('game', { inverse: 'awayTeam'}),

  gamesPlayed: union('homeGames', 'awayGames'),

  //filter games that meet the 'isDraw' computed boolean property created in the game model.
  gamesDrawn: filterBy('gamesPlayed', 'isDraw'),

  homeGamesWon: filterBy('homeGames', 'isHomeWin'),
  awayGamesWon: filterBy('awayGames', 'isAwayWin'),
  gamesWon: union('homeGamesWon', 'awayGamesWon'),

  homeGamesLost: filterBy('homeGames', 'isAwayWin'),
  awayGamesLost: filterBy('awayGames', 'isHomeWin'),
  gamesLost: union('homeGamesLost', 'awayGamesLost'),

  homeGoalsScoredArray: mapBy('homeGames','homeGoals'),
  homeGoalsScoredTotal: sum('homeGoalsScoredArray'),
  awayGoalsScoredArray: mapBy('awayGames','awayGoals'),
  awayGoalsScoredTotal: sum('awayGoalsScoredArray'),
  goalScored: computed('homeGoalsScoredTotal', 'awayGoalsScoredTotal', function () {
    return this.homeGoalsScoredTotal + this.awayGoalsScoredTotal;
  }),

  homeGoalsConcededArray: mapBy('homeGames','awayGoals'),
  homeGoalsConcededTotal: sum('homeGoalsConcededArray'),
  awayGoalsConcededArray: mapBy('awayGames','homeGoals'),
  awayGoalsConcededTotal: sum('awayGoalsConcededArray'),
  goalConceded: computed('homeGoalsConcededTotal', 'awayGoalsConcededTotal', function() {
    return this.homeGoalsConcededTotal + this.awayGoalsConcededTotal;
  }),

  goalDifference: computed('goalScored', 'goalConceded', function() {
    return this.goalScored - this.goalConceded;
  }),

  points: computed('gamesWon.length', 'gamesDrawn.length', function() {
    return this.gamesWon.length * 3 + this.gamesDrawn.length
  })

});
