import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getOpenGames } from '../api/games';

class HomeRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      games: [],
    };

    this.loadGames = this.loadGames.bind(this);
  }

  componentWillMount() {
    this.loadGames();
  }

  async loadGames() {
    this.setState({ loading: true });

    try {
      const games = await getOpenGames();
      this.setState({
        loading: false,
        games,
      });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { games } = this.state;

    return (
      <div>
        <div className="hero">
          <div className="hero-body">
            <div className="container">
              <div className="title">
                Thunder Score Keeper
              </div>
              <div className="subtitle">
                Automatic score keeper for the &quot;Thunder&quot; card game
              </div>
              <div className="body">
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="title">Paused games</div>
            <table className="table is-hoverable">
              <thead>
                <tr>
                  <th colSpan={2}>Started on</th>
                </tr>
              </thead>
              <tbody>
                {games.map(game => (
                  <tr key={game.id}>
                    <td>
                      {moment(game.startedTimestamp).format('ddd Do MMM YYYY')}
                      {' '}
                      ({moment(game.startedTimestamp).from(moment())})
                    </td>
                    <td>
                      <Link to={`/game/${game.id}`}>Resume</Link>
                    </td>
                  </tr>
                ))}
                {games.length === 0 && (
                  <tr>
                    <td colSpan={2}>
                      <em className="has-text-grey">There are no paused games</em>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="field is-grouped">
              <div className="control">
                <Link to="/players" className="button is-primary">
                  <span className="icon is-small">
                    <i className="fas fa-bolt" />
                  </span>
                  <span>Start new game</span>
                </Link>
              </div>

              <div className="control">
                <Link to="/history" className="button">
                  <span className="icon is-small">
                    <i className="fas fa-history" />
                  </span>
                  <span>See history</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeRoute;
