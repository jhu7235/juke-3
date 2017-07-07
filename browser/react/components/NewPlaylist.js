import React, {Component} from 'react';


export default class NewPlaylist extends Component {

  constructor () {
    super();
    this.state = {
      // artists: [],
      inputValue: {value: '', clean: true}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputObject = {};
  }

  validInput () {
    return this.state.inputValue.value.length < 16 && this.state.inputValue.value.length !== 0;
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state.inputValue.value);
    this.setState({inputValue: {value: ''}});
  }

  handleChange(event) {
    this.setState( {
      inputValue: {
        value: event.target.value,
        clean: false
      }
    });
  }

  render() {
    return (
      <div className="well">
        <form className="form-horizontal">
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input
                value = {this.state.inputValue.value}
                onChange = {this.handleChange}
                className="form-control"
                type="text" />
                {
                  !this.validInput() && !this.state.inputValue.clean ?
                  (<div className="alert alert-warning">Please enter a name</div>) :
                  null
                }
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button
                disabled = {!this.validInput()}
                onClick = {this.onSubmit}
                type="submit"
                className="btn btn-success">Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
