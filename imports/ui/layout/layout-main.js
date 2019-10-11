import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/* Includes */
import '../includes/header/header';
// import '../includes/menu/menu';

/* Pages */
import '../pages/home/home';
import '../pages/play/play';

import './layout-main.html';




Template.LayoutMain.onCreated(function LayoutMainCreated() {
  let instance = this
});

