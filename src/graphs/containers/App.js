/*
 * Publet --- online publishing platform
 * Copyright (C) 2016, Publet Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import { Navbar } from '../../common/components/navbar/navbar'
import { GraphsOptions } from '../components/graphs-options/graphs-options'
import { LoadingSpinner } from '../components/loading-spinner/loading-spinner'
import { Dashboard } from '../components/dashboard/dashboard'
import Modal from 'react-modal'
import { Profile } from '../components/profile/profile'

const customModalStyles = {
  content : {
    border        : 'none',
    padding       : 0,
    top           : '7vh',
    left          : '6vw',
    right         : '6vw',
    bottom        : '10vh'
  }
}

class App extends Component {
  // temporary workaround because redux is not straightforward. This state should
  // be managed in the central store w/ appropriate reducers --AB
  constructor(props) {
    super(props);
    this.publicationId = null;
    this.state = {
      profileShown: false
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.fetch = this.fetch.bind(this)
    this.locationHashChanged = this.locationHashChanged.bind(this)
  }

  extractPublicationIdFromHashLocation() {
    return location.hash.slice(2, location.hash.length);
  }

  fetch() {
    if (!this.publicationId) {
      this.publicationId = this.extractPublicationIdFromHashLocation()
    }

    this.props.dispatch(actions.fetchDashboard(this.publicationId));

  }
  // temporary workaround because redux is not straightforward. This should be
  // a combination of an action and reducer utilized by central store. --AB
  toggleModal() {
    console.log('toggleModal called!')
    this.setState({profileShown: !this.state.profileShown})
  }
  componentWillMount() {
    window.addEventListener('hashchange', this.locationHashChanged, false)
  }
  componentDidMount() {
    this.fetch()
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.locationHashChanged, false)
  }
  locationHashChanged() {
    this.publicationId = null;
    this.fetch()
  }
  render() {
    const { dashboard, profile } = this.props;
    console.log('profile', profile);
    return (
      <div>
        <Navbar enabled={true} />
        <GraphsOptions enabled={true} />
        <Dashboard
          data={dashboard.data}
          loadState={dashboard.loadState}
          profileShown={this.state.profileShown}
          toggleModal={this.toggleModal}
        />
        <Modal
          style={customModalStyles}
          isOpen={this.state.profileShown}
          onRequestClose={this.toggleModal}
        >
          <Profile profile={profile} closeFn={this.toggleModal}/>
        </Modal>
      </div>
    )
  };

}

App.propTypes = {
  dashboard: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    dashboard: state.dashboard,
    profile: state.profile
  }
}

export default connect(
  mapStateToProps
)(App)
