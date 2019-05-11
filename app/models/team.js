import DS from 'ember-data';
const { Model } = DS;

//Create Model.
export default Model.extend({
  name: DS.attr('string'),
  homeGames: DS.hasMany('game', { inverse: 'homeTeam'}),
  awayGames: DS.hasMany('game', { inverse: 'awayTeam'}),
});
