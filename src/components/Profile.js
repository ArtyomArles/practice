import React from 'react'
import {CgProfile} from 'react-icons/cg'

class Profile extends React.Component {
  render() {

    return (<div className="profile">
      <div className="icon">{this.props.icon}</div>
      {this.props.name}
    </div>
    )
  }
}

Profile.defaultProps = {
  icon: <CgProfile />
}
export default Profile