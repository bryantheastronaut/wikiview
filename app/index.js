var React = require('react')
var ReactDOM = require('react-dom')
var axios = require('axios')

var App = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      searchResults: [
        '', [],
        [],
        []
      ]
    }
  },
  handleChange: function(e) {
    this.setState({
      value: e.target.value
    })
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let searchItem = this.state.value;
    this.callAPI(searchItem);
  },
  callAPI: function(searchItem) {
    axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + searchItem)
    .then(function(response) {
      console.log(response);
      this.setState({
        searchResults: response.data
      });
    }.bind(this))
    .catch(function(response) {
      console.log('Error:' + response)
    });
    this.setState({
      value: ''
    });
  },
  render: function() {
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
          <input id='searchbar' placeholder="search..." onChange={this.handleChange} value={this.state.value}/>
         <input id='searchsubmit' type='submit' />
        </form>
        <RandomArticle />
        <ResultsList results={this.state.searchResults} />
    </div>
    )
  }
});

var SingleResult = React.createClass({
  render: function() {
    return (
      <div className='singleResult'>
        <a href={this.props.url} target="_blank">
          <h3>{this.props.title}</h3>
          <p>{this.props.info}</p>
        </a>
      </div>
    )
  }
});

var ResultsList = React.createClass({
  render: function() {
    let result = this.props.results[1].map((item, idx) => {
      return (
        <SingleResult key={idx} title={this.props.results[1][idx]} info={this.props.results[2][idx]} url={this.props.results[3][idx]} />
      )
    })
    return (
      <div className='resultsList'>
        {result}
      </div>

    )
  }
})

var Header = React.createClass({
  render: function() {
    return (
      <div id='header'>
      <h2 id='title'>Wikipedia Viewer</h2>
        <p>A bryantheastronaut Production</p>
    </div>
    )
  }
});

var RandomArticle = React.createClass({
  render: function() {
    return (
      <div id="random">
        <a href='http://en.wikipedia.org/wiki/Special:Random' target="_blank">or click here for a random article.</a>
      </div>
    )
  }
});

ReactDOM.render(<App />, document.getElementById('app'))
