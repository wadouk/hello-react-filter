function fetch(setState) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "groups.json", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        setState({loaded: true, groups: JSON.parse(xhr.responseText).results})
      }
    }
  };

  xhr.send(null);
}

var App = React.createClass({
  displayName: "App",

  componentWillMount: function () {
    fetch(this.setState.bind(this));
  },

  getInitialState: function () {
    return {loaded: false, groups: [], expected: ""}
  },

  renderStyle: function mapStyle(style) {
    return React.createElement("span", {key: style}, style)
  },

  filterStyle: function (style) {
    return (style).toLowerCase().indexOf(this.state.expected.toLowerCase()) != -1
  },

  filter: function filter(group) {
    var expected = this.state.expected;
    return !expected || ((group.name).toLowerCase().indexOf(expected.toLowerCase()) != -1) || group.style.some(this.filterStyle);
  },

  renderGroup: function mapGroup(group) {
    return React.createElement("li", {key: group.name}, [
      React.createElement("span", {key: group.name}, group.name),
      React.createElement("text", {key: " "}, " "),
      group.style.map(this.renderStyle)]);
  },

  renderGroups: function renderGroups() {
    return React.createElement("ul", {key: "ul"}, this.state.groups.filter(this.filter).map(this.renderGroup));
  },

  onChange: function (event) {
    this.setState({expected: event.target.value})
  },

  renderFilter: function () {
    return (React.createElement("input", {name: "filter", onChange: this.onChange, key: "input"}))
  },

  render: function () {
    return (React.createElement("div", null, [this.renderFilter(), this.renderGroups()]))
  }
});

window.addEventListener("load", function () {
  ReactDOM.render(React.createElement(App), document.querySelector("#app"));
}, false);
