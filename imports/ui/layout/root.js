import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './layout-main';

import './root.html';

import '../style/main.less';
import '../style/style.less';


Template.Root.helpers({
  getLayout() {
    let instance = Template.instance()
    return instance.data && instance.data.layout && instance.data.layout() || 'LayoutMain'
  },
  getData() {
    let instance = Template.instance()
    let data = {} //instance.data && instance.data.data && instance.data.data() || {}
    data.main = instance.data && instance.data.main && instance.data.main() || null
    data.nav = instance.data && instance.data.nav && instance.data.nav() || null
    return data
  },
})
