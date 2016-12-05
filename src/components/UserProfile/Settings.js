import React, {Component} from 'react';
import {connect} from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import api from '../../api';
import ErrorsList from '../ErrorsList';

class MyEditor extends Component {
  constructor() {
    super();
    this.state = {
      canvas: '',
      canvasScaled: ''
    };

    this.updateStatus = () => {
      const newCanvas = this.refs.editor.getImage();
      const newCanvasScaled = this.refs.editor.getImageScaledToCanvas();

      const newState = Object.assign({}, this.state, {
        canvas: newCanvas,
        canvasScaled: newCanvasScaled
      });

      this.setState(newState);
    };
  }

  render() {
    return(
      <AvatarEditor
        ref="editor"
        image={this.props.pic}
        width={128}
        height={128}
        border={5}
        scale={1.1} />
    )
  };
 }

class PhotoForm extends Component {
  constructor() {
    super();
    this.state = {
      pic: ''
    }

    this.changeForm = ev => {
      ev.preventDefault();

      document.getElementById("profile-pic").style.display = "none";
      let input = ev.currentTarget;
      let file = input.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        let image_base64 = e.target.result;
        this.setState({pic: image_base64})
      }
      reader.readAsDataURL(file);
    }

    this.submitForm = ev => {
      ev.preventDefault();

      let files = new FormData(ev.currentTarget);
      for (var key in files) {
        if (files.hasOwnProperty(key) && files[key] instanceof File) {
          files.append(key, files[key]);
        }
      }

      this.props.onSubmitPhotoForm(files);
    }
  };

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        pic: this.props.currentUser.profile_pic
      })
    }
  }

  render() {
    return(
      <div className="photo-editor-app clearfix">
        <form onSubmit={this.submitForm}>
          <div className="form-group">

            <div className="setting-image-wrap">

              <MyEditor
                pic={this.state.pic}
                currentUser={this.props.currentUser} />

                <img
                  src={
                      this.props.currentUser.profile_pic === 'user-placeholder.png' ?
                      `/images/${this.props.currentUser.profile_pic}` :
                      `http://localhost:8000/images/users/${this.props.currentUser.id}/${this.props.currentUser.profile_pic}`
                      }
                  className="current-preview-pic"
                  id="profile-pic"
                  alt={this.props.currentUser.username} />

            </div>

            <input
              type="file"
              className="form-control settings-input"
              id="upload-photo"
              name="photo"
              onChange={this.changeForm} />

            <button
              type="submit"
              className="btn btn-sm btn-outline-secondary action-btn">
              <i className="fa fa-floppy-o" aria-hidden="true"></i> Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}

class SettingsForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, {[field]: ev.target.value});
      this.setState(newState);
    };

    this.submitForm = ev => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        username: this.props.currentUser.username,
        email: this.props.currentUser.email
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(Object.assign({}, this.state, {
        username: nextProps.currentUser.username,
        email: nextProps.currentUser.email
      }));
    }
  }

  render() {
    return(
      <form onSubmit={this.submitForm}>

        <div className="form-group">
          <input
            className="form-control settings-input"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.updateState('username')} />
        </div>

        <div className="form-group">
          <input
            className="form-control settings-input"
            type="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.updateState('email')} />
        </div>

        <div className="form-group">
          <input
            className="form-control settings-input"
            type="password"
            placeholder="Change Password"
            value={this.state.password}
            onChange={this.updateState('password')} />
        </div>

        <button
          className="btn btn-sm btn-outline-secondary action-btn"
          type="submit"
          disabled={this.state.inProgress}>
          <i className="fa fa-pencil" aria-hidden="true"></i> Update Profile
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.main.currentUser
});

const mapDispatchToProps = dispatch => ({
  onSubmitForm: user =>
    dispatch({type: 'SETTINGS_SAVED', payload: api.Auth.save(user)}),
  onSubmitPhotoForm: files =>
    dispatch({type: 'PHOTO_SAVED', payload: api.Auth.savePhoto(files)}),
  onUnload: () =>
    dispatch({type: 'SETTINGS_PAGE_UNLOADED'})
});

class Settings extends Component {
  render() {
    return(
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row user-row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <h2 className="text-xs-center form-head">Current Settings</h2>

                <ErrorsList errors={this.props.errors} />

                <PhotoForm
                  currentUser={this.props.currentUser}
                  onSubmitPhotoForm={this.props.onSubmitPhotoForm} />

                <SettingsForm
                  currentUser={this.props.currentUser}
                  onSubmitForm={this.props.onSubmitForm} />
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
