// import ready form components

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fieldsCheckbox = require('./fields/checkbox');

var _fieldsCheckbox2 = _interopRequireDefault(_fieldsCheckbox);

var _fieldsDateDatePicker = require('./fields/date/date-picker');

var _fieldsDateDatePicker2 = _interopRequireDefault(_fieldsDateDatePicker);

var _fieldsNumber = require('./fields/number');

var _fieldsNumber2 = _interopRequireDefault(_fieldsNumber);

var _fieldsRadio = require('./fields/radio');

var _fieldsRadio2 = _interopRequireDefault(_fieldsRadio);

var _fieldsSelectSimpleSelect = require('./fields/select/simple-select');

var _fieldsSelectSimpleSelect2 = _interopRequireDefault(_fieldsSelectSimpleSelect);

var _fieldsText = require('./fields/text');

var _fieldsText2 = _interopRequireDefault(_fieldsText);

var _fieldsTextarea = require('./fields/textarea');

var _fieldsTextarea2 = _interopRequireDefault(_fieldsTextarea);

exports['default'] = {
  Checkbox: _fieldsCheckbox2['default'],
  Date: _fieldsDateDatePicker2['default'],
  Number: _fieldsNumber2['default'],
  Radio: _fieldsRadio2['default'],
  SimpleSelect: _fieldsSelectSimpleSelect2['default'],
  Text: _fieldsText2['default'],
  Textarea: _fieldsTextarea2['default']
};
module.exports = exports['default'];