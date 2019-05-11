import DS from 'ember-data';
const { Model } = DS;

/* In the ember docs, there's a built-in macros: 'union', 'filterBy.          - union: Creates a join table.
   - filterBy
*/
import { union, filterBy } from '@ember/object/computed';

//Create Model.
export default Model.extend({
  name: DS.attr('string'),
  homeGames: DS.hasMany('game', { inverse: 'homeTeam'}),
  awayGames: DS.hasMany('game', { inverse: 'awayTeam'}),

  gamesPlayed: union('homeGames', 'awayGames'),

  //filter games that meet the 'isDraw' computed boolean property created in the game model.
  gamesDrawn: filterBy('games', 'isDraw'),

  gamesWon: filterBy('games', 'isWon'),
  gamesLost: filterBy('games', 'isLost'),
});
