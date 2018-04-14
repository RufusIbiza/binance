import { Template } from 'meteor/templating';
 
import { Coins } from '../api/coins.js';
 
import './body.html';
 
Template.body.helpers({
  coins() {
    return db.Coins.find({}, { sort: { volume: -1 } }).fetch()
  },
});