'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = decorate;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reducer = require('./reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var any = _react.PropTypes.any,
    array = _react.PropTypes.array,
    func = _react.PropTypes.func,
    node = _react.PropTypes.node,
    object = _react.PropTypes.object,
    string = _react.PropTypes.string;
function decorate(key) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
    opts = key;
    key = opts.key;
  }

  function mapStateToProps(state, props) {
    var uiKey = [key, props.uiKey].join('');

    return {
      uiKey: uiKey,
      uiDefaults: opts.state || {},
      ui: state.interface.get(uiKey) || opts.state
    };
  };

  function mapDispatchToProps(dispatch, props) {
    return (0, _redux.bindActionCreators)({
      updateUI: _reducer.updateUI,
      mountUI: _reducer.mountUI,
      unmountUI: _reducer.unmountUI
    }, dispatch);
  };

  var connect = opts.connectWith || _reactRedux.connect;
  var connector = connect(mapStateToProps, mapDispatchToProps);

  return function (WrappedComponent) {
    var _class, _temp;

    return connector((_temp = _class = function (_Component) {
      _inherits(UI, _Component);

      function UI() {
        _classCallCheck(this, UI);

        return _possibleConstructorReturn(this, (UI.__proto__ || Object.getPrototypeOf(UI)).apply(this, arguments));
      }

      _createClass(UI, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          this.props.mountUI(this.props.uiKey, this.props.uiDefaults);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          // console.log('unmount');
          // if (opts.persist !== true) {
          //   if (window && window.requestAnimationFrame) {
          //     window.requestAnimationFrame(() => this.props.unmountUI(this.props.uiKey););
          //   } else {
          //     this.props.unmountUI(this.props.uiKey);;
          //   }
          // }
        }
      }, {
        key: 'updateUI',
        value: function updateUI(values) {
          return this.props.updateUI(this.props.uiKey, values);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, {
            updateUI: this.updateUI.bind(this) }));
        }
      }]);

      return UI;
    }(_react.Component), _class.displayName = 'ReduxInterface(' + WrappedComponent.displayName + ')', _temp));
  };
}