import Controller from '@ember/controller';

/*
Need to inject our 'game-simulator' to our controller here.

First import the service here.
*/
import { inject as service } from '@ember/service'

export default Controller.extend({
  gameSimulator: service()
});
