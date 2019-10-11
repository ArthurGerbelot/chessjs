
Template.registerHelper('equals', function (a, b) {
  return a === b
})
Template.registerHelper('gt', function (a, b) {
  return a > b
})
Template.registerHelper('gte', function (a, b) {
  return a >= b
})
Template.registerHelper('lt', function (a, b) {
  return a < b
})
Template.registerHelper('lte', function (a, b) {
  return a <= b
})
Template.registerHelper('notequals', function (a, b) {
  return a !== b
})
Template.registerHelper('and',(a,b) => {
  return a && b
})
Template.registerHelper('or',(a,b) => {
  return a || b
})
Template.registerHelper('not', function (a) {
  return !a
})
Template.registerHelper('length', function (a) {
  return a && a.length || 0
})
Template.registerHelper('get', function (key) {
  return Template.instance()[key].get()
})
Template.registerHelper('dict', function (key, attr) {
  return Template.instance()[key].get(attr)
})
Template.registerHelper('add', function (a, b) {
  return a + b
})
Template.registerHelper('minus', function (a, b) {
  return a - b
})
Template.registerHelper('modulo', function (a, b) {
  return a % b
})

Template.registerHelper('getField', function (field, key) {
  return field[key]
})
Template.registerHelper('concat', function () {
  return Array.prototype.slice.call(arguments, 0, -1).join('')
})

Template.registerHelper('formatNumber', function (number) {
  if (number && number > 1000) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    number = parts.join(".");
  }
  return number
})

Template.registerHelper('in', function (a, k) {
  return a && a.indexOf(k) !== -1 || false
})

// This allows us to write inline arrays in Blaze templates
// like so: {{> template param=(array 1 2 3) }}
// => The template's data context will look like this:
// { param: [1, 2, 3] }
Template.registerHelper('array', function() {
  return Array.from(arguments).slice(0, arguments.length-1);
});
Template.registerHelper('keys', function(obj) {
  return obj && Object.keys(obj) || []
});
Template.registerHelper('join', function(arr, str) {
  return arr.join(str)
})
Template.registerHelper('log', function(obj, log_definition) {
  console.log(typeof log_definition === 'string' ? log_definition : "Blaze logger ", obj)
})
Template.registerHelper('stringify', function(obj, is_format) {
  return JSON.stringify(obj, null, (is_format === true) ? 2 : null)
})