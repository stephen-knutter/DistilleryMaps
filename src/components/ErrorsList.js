import React, {Component} from 'react';

class ErrorsList extends Component {
  render() {
    const errors = this.props.errors;
    if (errors) {
      return(
        <ul className="error-messages">
          {
            Object.keys(errors).map(key => {
              return(
                <li key={key}>
                  {key} {errors[key]}
                </li>
              )
            })
          }
        </ul>
      )
    }
    return null;
  }
}

export default ErrorsList;