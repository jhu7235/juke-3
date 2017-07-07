import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import Sidebar from './Sidebar';
import Player from './Player';
import NewPlaylist from './NewPlaylist';
import SinglePlaylist from './SinglePlaylist'
import axios from 'axios'

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      playlists: []
    }
    this.addPlaylist = this.addPlaylist.bind(this)
  }

  componentDidMount () {
    axios.get('/api/playlists')
      .then(res => res.data)
      .then(playlists => {
        this.setState({ playlists })
      });
  }

  addPlaylist(playlistName){
   axios.post('/api/playlists', { name: playlistName})
    .then(res => res.data)
    .then(newPlaylist => {
      this.setState({playlists: [...this.state.playlists].concat(newPlaylist)})
    })
  }

  render () {
    const playlists = this.state.playlists;
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={playlists} />
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route path="/new-playlist" render= {() => (<NewPlaylist addPlaylist={this.addPlaylist} />)}/>
              <Route path='/playlist/:playlistId' component={SinglePlaylist} />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
