'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Type = _react2['default'].PropTypes;

exports['default'] = _react2['default'].createClass({
  displayName: "Select",

  propTypes: {
    addLabelText: _react2['default'].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
    allowCreate: _react2['default'].PropTypes.bool, // whether to allow creation of new entries
    asyncOptions: _react2['default'].PropTypes.func, // function to call to get options
    autoload: _react2['default'].PropTypes.bool, // whether to auto-load the default async options set
    backspaceRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
    cacheAsyncResults: _react2['default'].PropTypes.bool, // whether to allow cache
    className: _react2['default'].PropTypes.string, // className for the outer element
    clearAllText: _react2['default'].PropTypes.string, // title for the "clear" control when multi: true
    clearValueText: _react2['default'].PropTypes.string, // title for the "clear" control
    clearable: _react2['default'].PropTypes.bool, // should it be possible to reset value
    delimiter: _react2['default'].PropTypes.string, // delimiter to use to join multiple values
    disabled: _react2['default'].PropTypes.bool, // whether the Select is disabled or not
    filterOption: _react2['default'].PropTypes.func, // method to filter a single option: function(option, filterString)
    filterOptions: _react2['default'].PropTypes.func, // method to filter the options array: function([options], filterString, [values])
    ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering
    inputProps: _react2['default'].PropTypes.object, // custom attributes for the Input (in the Select-control) e.g: {'data-foo': 'bar'}
    matchPos: _react2['default'].PropTypes.string, // (any|start) match the start or entire string when filtering
    matchProp: _react2['default'].PropTypes.string, // (any|label|value) which option property to filter on
    multi: _react2['default'].PropTypes.bool, // multi-value input
    name: _react2['default'].PropTypes.string, // field name, for hidden <input /> tag
    newOptionCreator: _react2['default'].PropTypes.func, // factory to create new options when allowCreate set
    noResultsText: _react2['default'].PropTypes.string, // placeholder displayed when there are no matching search results
    onBlur: _react2['default'].PropTypes.func, // onBlur handler: function(event) {}
    onChange: _react2['default'].PropTypes.func, // onChange handler: function(newValue) {}
    onFocus: _react2['default'].PropTypes.func, // onFocus handler: function(event) {}
    onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function(inputValue) {}
    onOptionLabelClick: _react2['default'].PropTypes.func, // onCLick handler for value labels: function (value, event) {}
    optionComponent: _react2['default'].PropTypes.func, // option component to render in dropdown
    optionRenderer: _react2['default'].PropTypes.func, // optionRenderer: function(option) {}
    options: _react2['default'].PropTypes.array, // array of options
    placeholder: _react2['default'].PropTypes.string, // field placeholder, displayed when there's no value
    searchable: _react2['default'].PropTypes.bool, // whether to enable searching feature or not
    searchingText: _react2['default'].PropTypes.string, // message to display whilst options are loading via asyncOptions
    searchPromptText: _react2['default'].PropTypes.string, // label to prompt for search input
    singleValueComponent: _react2['default'].PropTypes.func, // single value component when multiple is set to false
    value: _react2['default'].PropTypes.any, // initial field value
    valueComponent: _react2['default'].PropTypes.func, // value component to render in multiple mode
    valueRenderer: _react2['default'].PropTypes.func // valueRenderer: function(option) {}
  },

  getDefaultProps: function getDefaultProps() {
    return {
      addLabelText: 'Add "{label}"?',
      allowCreate: false,
      asyncOptions: undefined,
      autoload: true,
      backspaceRemoves: true,
      cacheAsyncResults: true,
      className: undefined,
      clearAllText: 'Clear all',
      clearValueText: 'Clear value',
      clearable: true,
      delimiter: ',',
      disabled: false,
      ignoreCase: true,
      inputProps: {},
      matchPos: 'any',
      matchProp: 'any',
      name: undefined,
      newOptionCreator: undefined,
      noResultsText: 'No results found',
      onChange: undefined,
      onInputChange: undefined,
      onOptionLabelClick: undefined,
      optionComponent: Option,
      options: undefined,
      placeholder: 'Select...',
      searchable: true,
      searchingText: 'Searching...',
      searchPromptText: 'Type to search',
      singleValueComponent: SingleValue,
      value: undefined,
      valueComponent: Value
    };
  },

  getInitialState: function getInitialState() {
    return {
      /*
       * set by getStateFromValue on componentWillMount:
       * - value
       * - values
       * - filteredOptions
       * - inputValue
       * - placeholder
       * - focusedOption
      */
      isFocused: false,
      isLoading: false,
      isOpen: false,
      options: this.props.options
    };
  },

  componentWillMount: function componentWillMount() {
    var _this = this;

    this._optionsCache = {};
    this._optionsFilterString = '';
    this._closeMenuIfClickedOutside = function (event) {
      if (!_this.state.isOpen) {
        return;
      }
      var menuElem = _react2['default'].findDOMNode(_this.refs.selectMenuContainer);
      var controlElem = _react2['default'].findDOMNode(_this.refs.control);

      var eventOccuredOutsideMenu = _this.clickedOutsideElement(menuElem, event);
      var eventOccuredOutsideControl = _this.clickedOutsideElement(controlElem, event);

      // Hide dropdown menu if click occurred outside of menu
      if (eventOccuredOutsideMenu && eventOccuredOutsideControl) {
        _this.setState({
          isOpen: false
        }, _this._unbindCloseMenuIfClickedOutside);
      }
    };
    this._bindCloseMenuIfClickedOutside = function () {
      if (!document.addEventListener && document.attachEvent) {
        document.attachEvent('onclick', this._closeMenuIfClickedOutside);
      } else {
        document.addEventListener('click', this._closeMenuIfClickedOutside);
      }
    };
    this._unbindCloseMenuIfClickedOutside = function () {
      if (!document.removeEventListener && document.detachEvent) {
        document.detachEvent('onclick', this._closeMenuIfClickedOutside);
      } else {
        document.removeEventListener('click', this._closeMenuIfClickedOutside);
      }
    };
    this.setState(this.getStateFromValue(this.props.value));
  },

  componentDidMount: function componentDidMount() {
    if (this.props.asyncOptions && this.props.autoload) {
      this.autoloadAsyncOptions();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._blurTimeout);
    clearTimeout(this._focusTimeout);
    if (this.state.isOpen) {
      this._unbindCloseMenuIfClickedOutside();
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    var _this2 = this;

    var optionsChanged = false;
    if (JSON.stringify(newProps.options) !== JSON.stringify(this.props.options)) {
      optionsChanged = true;
      this.setState({
        options: newProps.options,
        filteredOptions: this.filterOptions(newProps.options)
      });
    }
    if (newProps.value !== this.state.value || newProps.placeholder !== this.props.placeholder || optionsChanged) {
      var setState = function setState(newState) {
        _this2.setState(_this2.getStateFromValue(newProps.value, newState && newState.options || newProps.options, newProps.placeholder));
      };
      if (this.props.asyncOptions) {
        this.loadAsyncOptions(newProps.value, {}, setState);
      } else {
        setState();
      }
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    var _this3 = this;

    if (!this.props.disabled && this._focusAfterUpdate) {
      clearTimeout(this._blurTimeout);
      this._focusTimeout = setTimeout(function () {
        _this3.getInputNode().focus();
        _this3._focusAfterUpdate = false;
      }, 50);
    }
    if (this._focusedOptionReveal) {
      if (this.refs.focused && this.refs.menu) {
        var focusedDOM = _react2['default'].findDOMNode(this.refs.focused);
        var menuDOM = _react2['default'].findDOMNode(this.refs.menu);
        var focusedRect = focusedDOM.getBoundingClientRect();
        var menuRect = menuDOM.getBoundingClientRect();

        if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
          menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
        }
      }
      this._focusedOptionReveal = false;
    }
  },

  focus: function focus() {
    this.getInputNode().focus();
  },

  clickedOutsideElement: function clickedOutsideElement(element, event) {
    var eventTarget = event.target ? event.target : event.srcElement;
    while (eventTarget != null) {
      if (eventTarget === element) return false;
      eventTarget = eventTarget.offsetParent;
    }
    return true;
  },

  getStateFromValue: function getStateFromValue(value, options, placeholder) {
    if (!options) {
      options = this.state.options;
    }
    if (!placeholder) {
      placeholder = this.props.placeholder;
    }

    // reset internal filter string
    this._optionsFilterString = '';

    var values = this.initValuesArray(value, options);
    var filteredOptions = this.filterOptions(options, values);

    var focusedOption;
    var valueForState = null;
    if (!this.props.multi && values.length) {
      focusedOption = values[0];
      valueForState = values[0].value;
    } else {
      focusedOption = this.getFirstFocusableOption(filteredOptions);
      valueForState = values.map(function (v) {
        return v.value;
      }).join(this.props.delimiter);
    }

    return {
      value: valueForState,
      values: values,
      inputValue: '',
      filteredOptions: filteredOptions,
      placeholder: !this.props.multi && values.length ? values[0].label : placeholder,
      focusedOption: focusedOption
    };
  },

  getFirstFocusableOption: function getFirstFocusableOption(options) {

    for (var optionIndex = 0; optionIndex < options.length; ++optionIndex) {
      if (!options[optionIndex].disabled) {
        return options[optionIndex];
      }
    }
  },

  initValuesArray: function initValuesArray(values, options) {
    if (!Array.isArray(values)) {
      if (typeof values === 'string') {
        values = values === '' ? [] : this.props.multi ? values.split(this.props.delimiter) : [values];
      } else {
        values = values !== undefined && values !== null ? [values] : [];
      }
    }
    return values.map(function (val) {
      if (typeof val === 'string' || typeof val === 'number') {
        for (var key in options) {
          if (options.hasOwnProperty(key) && options[key] && (options[key].value === val || typeof options[key].value === 'number' && options[key].value.toString() === val)) {
            return options[key];
          }
        }
        return { value: val, label: val };
      } else {
        return val;
      }
    });
  },

  setValue: function setValue(value, focusAfterUpdate) {
    if (focusAfterUpdate || focusAfterUpdate === undefined) {
      this._focusAfterUpdate = true;
    }
    var newState = this.getStateFromValue(value);
    newState.isOpen = false;
    this.fireChangeEvent(newState);
    this.setState(newState);
  },

  selectValue: function selectValue(value) {
    if (!this.props.multi) {
      this.setValue(value);
    } else if (value) {
      this.addValue(value);
    }
    this._unbindCloseMenuIfClickedOutside();
  },

  addValue: function addValue(value) {
    this.setValue(this.state.values.concat(value));
  },

  popValue: function popValue() {
    this.setValue(this.state.values.slice(0, this.state.values.length - 1));
  },

  removeValue: function removeValue(valueToRemove) {
    this.setValue(this.state.values.filter(function (value) {
      return value !== valueToRemove;
    }));
  },

  clearValue: function clearValue(event) {
    // if the event was triggered by a mousedown and not the primary
    // button, ignore it.
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.setValue(null);
  },

  resetValue: function resetValue() {
    this.setValue(this.state.value === '' ? null : this.state.value);
  },

  getInputNode: function getInputNode() {
    var input = this.refs.input;
    return this.props.searchable ? input : _react2['default'].findDOMNode(input);
  },

  fireChangeEvent: function fireChangeEvent(newState) {
    if (newState.value !== this.state.value && this.props.onChange) {
      this.props.onChange(newState.value, newState.values);
    }
  },

  handleMouseDown: function handleMouseDown(event) {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    // for the non-searchable select, close the dropdown when button is clicked
    if (this.state.isOpen && !this.props.searchable) {
      this.setState({
        isOpen: false
      }, this._unbindCloseMenuIfClickedOutside);
      return;
    }

    if (this.state.isFocused) {
      this.setState({
        isOpen: true
      }, this._bindCloseMenuIfClickedOutside);
    } else {
      this._openAfterFocus = true;
      this.getInputNode().focus();
    }
  },

  handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    // If not focused, handleMouseDown will handle it
    if (!this.state.isOpen) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      isOpen: false
    }, this._unbindCloseMenuIfClickedOutside);
  },

  handleInputFocus: function handleInputFocus(event) {
    var newIsOpen = this.state.isOpen || this._openAfterFocus;
    this.setState({
      isFocused: true,
      isOpen: newIsOpen
    }, function () {
      if (newIsOpen) {
        this._bindCloseMenuIfClickedOutside();
      } else {
        this._unbindCloseMenuIfClickedOutside();
      }
    });
    this._openAfterFocus = false;
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  },

  handleInputBlur: function handleInputBlur(event) {
    var _this4 = this;

    this._blurTimeout = setTimeout(function () {
      if (_this4._focusAfterUpdate) return;
      _this4.setState({
        isFocused: false,
        isOpen: false
      });
    }, 50);
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  },

  handleKeyDown: function handleKeyDown(event) {
    if (this.props.disabled) return;
    switch (event.keyCode) {
      case 8:
        // backspace
        if (!this.state.inputValue && this.props.backspaceRemoves) {
          event.preventDefault();
          this.popValue();
        }
        return;
      case 9:
        // tab
        if (event.shiftKey || !this.state.isOpen || !this.state.focusedOption) {
          return;
        }
        this.selectFocusedOption();
        break;
      case 13:
        // enter
        if (!this.state.isOpen) return;

        this.selectFocusedOption();
        break;
      case 27:
        // escape
        if (this.state.isOpen) {
          this.resetValue();
        } else if (this.props.clearable) {
          this.clearValue(event);
        }
        break;
      case 38:
        // up
        this.focusPreviousOption();
        break;
      case 40:
        // down
        this.focusNextOption();
        break;
      case 188:
        // ,
        if (this.props.allowCreate && this.props.multi) {
          event.preventDefault();
          event.stopPropagation();
          this.selectFocusedOption();
        } else {
          return;
        }
        break;
      default:
        return;
    }
    event.preventDefault();
  },

  // Ensures that the currently focused option is available in filteredOptions.
  // If not, returns the first available option.
  _getNewFocusedOption: function _getNewFocusedOption(filteredOptions) {
    for (var key in filteredOptions) {
      if (filteredOptions.hasOwnProperty(key) && filteredOptions[key] === this.state.focusedOption) {
        return filteredOptions[key];
      }
    }
    return this.getFirstFocusableOption(filteredOptions);
  },

  handleInputChange: function handleInputChange(event) {
    // assign an internal variable because we need to use
    // the latest value before setState() has completed.
    this._optionsFilterString = event.target.value;

    if (this.props.onInputChange) {
      this.props.onInputChange(event.target.value);
    }

    if (this.props.asyncOptions) {
      this.setState({
        isLoading: true,
        inputValue: event.target.value
      });
      this.loadAsyncOptions(event.target.value, {
        isLoading: false,
        isOpen: true
      }, this._bindCloseMenuIfClickedOutside);
    } else {
      var filteredOptions = this.filterOptions(this.state.options);
      this.setState({
        isOpen: true,
        inputValue: event.target.value,
        filteredOptions: filteredOptions,
        focusedOption: this._getNewFocusedOption(filteredOptions)
      }, this._bindCloseMenuIfClickedOutside);
    }
  },

  autoloadAsyncOptions: function autoloadAsyncOptions() {
    var _this5 = this;

    this.setState({
      isLoading: true
    });
    this.loadAsyncOptions(this.props.value || '', { isLoading: false }, function () {
      // update with fetched but don't focus
      _this5.setValue(_this5.props.value, false);
    });
  },

  loadAsyncOptions: function loadAsyncOptions(input, state, callback) {
    var _this6 = this;

    var thisRequestId = this._currentRequestId = requestId++;
    if (this.props.cacheAsyncResults) {
      for (var i = 0; i <= input.length; i++) {
        var cacheKey = input.slice(0, i);
        if (this._optionsCache[cacheKey] && (input === cacheKey || this._optionsCache[cacheKey].complete)) {
          var options = this._optionsCache[cacheKey].options;
          var filteredOptions = this.filterOptions(options);
          var newState = {
            options: options,
            filteredOptions: filteredOptions,
            focusedOption: this._getNewFocusedOption(filteredOptions)
          };
          for (var key in state) {
            if (state.hasOwnProperty(key)) {
              newState[key] = state[key];
            }
          }
          this.setState(newState);
          if (callback) callback.call(this, newState);
          return;
        }
      }
    }

    this.props.asyncOptions(input, function (err, data) {
      if (err) throw err;
      if (_this6.props.cacheAsyncResults) {
        _this6._optionsCache[input] = data;
      }
      if (thisRequestId !== _this6._currentRequestId) {
        return;
      }
      var filteredOptions = _this6.filterOptions(data.options);
      var newState = {
        options: data.options,
        filteredOptions: filteredOptions,
        focusedOption: _this6._getNewFocusedOption(filteredOptions)
      };
      for (var key in state) {
        if (state.hasOwnProperty(key)) {
          newState[key] = state[key];
        }
      }
      _this6.setState(newState);
      if (callback) callback.call(_this6, newState);
    });
  },

  filterOptions: function filterOptions(options, values) {
    var filterValue = this._optionsFilterString;
    var exclude = (values || this.state.values).map(function (i) {
      return i.value;
    });
    if (this.props.filterOptions) {
      return this.props.filterOptions.call(this, options, filterValue, exclude);
    } else {
      var filterOption = function filterOption(op) {
        if (this.props.multi && exclude.indexOf(op.value) > -1) return false;
        if (this.props.filterOption) return this.props.filterOption.call(this, op, filterValue);
        var valueTest = String(op.value),
            labelTest = String(op.label);
        if (this.props.ignoreCase) {
          valueTest = valueTest.toLowerCase();
          labelTest = labelTest.toLowerCase();
          filterValue = filterValue.toLowerCase();
        }
        return !filterValue || this.props.matchPos === 'start' ? this.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || this.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : this.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || this.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
      };
      return (options || []).filter(filterOption, this);
    }
  },

  selectFocusedOption: function selectFocusedOption() {
    if (this.props.allowCreate && !this.state.focusedOption) {
      return this.selectValue(this.state.inputValue);
    }

    if (this.state.focusedOption) {
      return this.selectValue(this.state.focusedOption);
    }
  },

  focusOption: function focusOption(op) {
    this.setState({
      focusedOption: op
    });
  },

  focusNextOption: function focusNextOption() {
    this.focusAdjacentOption('next');
  },

  focusPreviousOption: function focusPreviousOption() {
    this.focusAdjacentOption('previous');
  },

  focusAdjacentOption: function focusAdjacentOption(dir) {
    this._focusedOptionReveal = true;
    var ops = this.state.filteredOptions.filter(function (op) {
      return !op.disabled;
    });
    if (!this.state.isOpen) {
      this.setState({
        isOpen: true,
        inputValue: '',
        focusedOption: this.state.focusedOption || ops[dir === 'next' ? 0 : ops.length - 1]
      }, this._bindCloseMenuIfClickedOutside);
      return;
    }
    if (!ops.length) {
      return;
    }
    var focusedIndex = -1;
    for (var i = 0; i < ops.length; i++) {
      if (this.state.focusedOption === ops[i]) {
        focusedIndex = i;
        break;
      }
    }
    var focusedOption = ops[0];
    if (dir === 'next' && focusedIndex > -1 && focusedIndex < ops.length - 1) {
      focusedOption = ops[focusedIndex + 1];
    } else if (dir === 'previous') {
      if (focusedIndex > 0) {
        focusedOption = ops[focusedIndex - 1];
      } else {
        focusedOption = ops[ops.length - 1];
      }
    }
    this.setState({
      focusedOption: focusedOption
    });
  },

  unfocusOption: function unfocusOption(op) {
    if (this.state.focusedOption === op) {
      this.setState({
        focusedOption: null
      });
    }
  },

  buildMenu: function buildMenu() {
    var focusedValue = this.state.focusedOption ? this.state.focusedOption.value : null;
    var renderLabel = this.props.optionRenderer || function (op) {
      return op.label;
    };
    if (this.state.filteredOptions.length > 0) {
      focusedValue = focusedValue == null ? this.state.filteredOptions[0] : focusedValue;
    }
    // Add the current value to the filtered options in last resort
    var options = this.state.filteredOptions;
    if (this.props.allowCreate && this.state.inputValue.trim()) {
      var inputValue = this.state.inputValue;
      options = options.slice();
      var newOption = this.props.newOptionCreator ? this.props.newOptionCreator(inputValue) : {
        value: inputValue,
        label: inputValue,
        create: true
      };
      options.unshift(newOption);
    }
    var ops = Object.keys(options).map(function (key) {
      var op = options[key];
      var isSelected = this.state.value === op.value;
      var isFocused = focusedValue === op.value;
      var optionClass = classes({
        'Select-option': true,
        'is-selected': isSelected,
        'is-focused': isFocused,
        'is-disabled': op.disabled
      });
      var ref = isFocused ? 'focused' : null;
      var mouseEnter = this.focusOption.bind(this, op);
      var mouseLeave = this.unfocusOption.bind(this, op);
      var mouseDown = this.selectValue.bind(this, op);
      var optionResult = _react2['default'].createElement(this.props.optionComponent, {
        key: 'option-' + op.value,
        className: optionClass,
        renderFunc: renderLabel,
        mouseEnter: mouseEnter,
        mouseLeave: mouseLeave,
        mouseDown: mouseDown,
        click: mouseDown,
        addLabelText: this.props.addLabelText,
        option: op,
        ref: ref
      });
      return optionResult;
    }, this);

    if (ops.length) {
      return ops;
    } else {
      var noResultsText, promptClass;
      if (this.state.isLoading) {
        promptClass = 'Select-searching';
        noResultsText = this.props.searchingText;
      } else if (this.state.inputValue || !this.props.asyncOptions) {
        promptClass = 'Select-noresults';
        noResultsText = this.props.noResultsText;
      } else {
        promptClass = 'Select-search-prompt';
        noResultsText = this.props.searchPromptText;
      }

      return _react2['default'].createElement('div', { className: promptClass }, noResultsText);
    }
  },

  handleOptionLabelClick: function handleOptionLabelClick(value, event) {
    if (this.props.onOptionLabelClick) {
      this.props.onOptionLabelClick(value, event);
    }
  },

  render: function render() {
    var selectClass = classes('Select', this.props.className, {
      'is-multi': this.props.multi,
      'is-searchable': this.props.searchable,
      'is-open': this.state.isOpen,
      'is-focused': this.state.isFocused,
      'is-loading': this.state.isLoading,
      'is-disabled': this.props.disabled,
      'has-value': this.state.value
    });
    var value = [];
    if (this.props.multi) {
      this.state.values.forEach(function (val) {
        var onOptionLabelClick = this.handleOptionLabelClick.bind(this, val);
        var onRemove = this.removeValue.bind(this, val);
        var valueComponent = _react2['default'].createElement(this.props.valueComponent, {
          key: val.value,
          option: val,
          renderer: this.props.valueRenderer,
          optionLabelClick: !!this.props.onOptionLabelClick,
          onOptionLabelClick: onOptionLabelClick,
          onRemove: onRemove,
          disabled: this.props.disabled
        });
        value.push(valueComponent);
      }, this);
    }

    if (!this.state.inputValue && (!this.props.multi || !value.length)) {
      var val = this.state.values[0] || null;
      if (this.props.valueRenderer && !!this.state.values.length) {
        value.push(_react2['default'].createElement(Value, {
          key: 0,
          option: val,
          renderer: this.props.valueRenderer,
          disabled: this.props.disabled }));
      } else {
        var singleValueComponent = _react2['default'].createElement(this.props.singleValueComponent, {
          key: 'placeholder',
          value: val,
          placeholder: this.state.placeholder
        });
        value.push(singleValueComponent);
      }
    }

    var loading = this.state.isLoading ? _react2['default'].createElement('span', { className: 'Select-loading', 'aria-hidden': 'true' }) : null;
    var clear = this.props.clearable && this.state.value && !this.props.disabled ? _react2['default'].createElement('span', { className: 'Select-clear', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText, 'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText, onMouseDown: this.clearValue, onTouchEnd: this.clearValue, onClick: this.clearValue, dangerouslySetInnerHTML: { __html: '&times;' } }) : null;

    var menu;
    var menuProps;
    if (this.state.isOpen) {
      menuProps = {
        ref: 'menu',
        className: 'Select-menu',
        onMouseDown: this.handleMouseDown
      };
      menu = _react2['default'].createElement('div', { ref: 'selectMenuContainer', className: 'Select-menu-outer' }, _react2['default'].createElement('div', menuProps, this.buildMenu()));
    }

    var input;
    var inputProps = {
      ref: 'input',
      className: 'Select-input ' + (this.props.inputProps.className || ''),
      tabIndex: this.props.tabIndex || 0,
      onFocus: this.handleInputFocus,
      onBlur: this.handleInputBlur
    };
    for (var key in this.props.inputProps) {
      if (this.props.inputProps.hasOwnProperty(key) && key !== 'className') {
        inputProps[key] = this.props.inputProps[key];
      }
    }

    if (!this.props.disabled) {
      if (this.props.searchable) {
        input = _react2['default'].createElement(Input, _extends({ value: this.state.inputValue, onChange: this.handleInputChange, minWidth: '5' }, inputProps));
      } else {
        input = _react2['default'].createElement('div', inputProps, ' ');
      }
    } else if (!this.props.multi || !this.state.values.length) {
      input = _react2['default'].createElement('div', { className: 'Select-input' }, ' ');
    }

    return _react2['default'].createElement('div', { ref: 'wrapper', className: selectClass }, _react2['default'].createElement('input', { type: 'hidden', ref: 'value', name: this.props.name, value: this.state.value, disabled: this.props.disabled }), _react2['default'].createElement('div', { className: 'Select-control', ref: 'control', onKeyDown: this.handleKeyDown, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown }, value, input, _react2['default'].createElement('span', { className: 'Select-arrow-zone', onMouseDown: this.handleMouseDownOnArrow }), _react2['default'].createElement('span', { className: 'Select-arrow', onMouseDown: this.handleMouseDownOnArrow }), loading, clear), menu);
  }

});

module.exports = FancySelect;
module.exports = exports['default'];