import React from 'react';
import Songs from './Songs';
import axios from 'axios'



class SinglePlaylist extends React.Component {
  constructor() {
    super()
    this.state = {
      playlist: {
        id: -1,
        name: '',
        songs: [],
      }
    }
  }

  getter (id) {
    axios.get(`/api/playlists/${id}`)
      .then( playlist => {
        this.setState({playlist: {id: playlist.data.id, name: playlist.data.name, song: playlist.data.songs}})
      })
  }

  componentDidMount() {
    let playlistId = this.props.match.params.playlistId;
    this.getter(playlistId)
  }
  componentWillReceiveProps(nextProps) {
    const nextplaylistId = nextProps.match.params.playlistId
    const playlistId = this.props.match.params.playlistId;
    if (nextplaylistId !== playlistId) {
      this.getter(nextplaylistId)
    }
  }
  render() {
    const playlist = this.state.playlist
    return (

      <div>
        <h3>{playlist.name}</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
        <hr />
      </div>

    )
  }
}

export default SinglePlaylist;
