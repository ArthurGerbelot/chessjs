import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

import '../../../ui/layout/root'

// import './pool'
// import './account'
// import './messages'

FlowRouter.route('/', {
  name: 'App.Home',
  action() {
    BlazeLayout.render('Root', {layout: 'LayoutMain', main: 'Home'})
  }
})
FlowRouter.route('/play', {
  name: 'App.Play',
  action() {
    BlazeLayout.render('Root', {layout: 'LayoutMain', main: 'Play'})
  }
})