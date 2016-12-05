import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from '../../api';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({type: 'ADD_RATING', payload})
});

class RatingInput extends Component {
  constructor() {
    super();

    this.state = {
      comment: '',
      rating: '',
      stars: document.getElementsByClassName('star')
    };

    this.updateComment = ev => {
      this.setState({comment: ev.target.value});
    };

    this.addRating = ev => {
      ev.preventDefault();
      api.Ratings.addRating(
        {
          userId: this.props.currentUser.id,
          distillId: this.props.distill.id,
          comment: this.state.comment,
          rating: this.state.rating
        }
      )
    };

    this.handleStarIn = ev => {
      let elem = ev.currentTarget;
      let currentValue = elem.dataset.value;
      let stars = this.state.stars;
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        let starValue = star.dataset.value;
        let starClass = star.getAttribute("class");

        if (starValue <= currentValue && starClass !== 'fa fa-star star selected') {
          star.setAttribute('class', 'fa fa-star star');
        } else {
          if (starClass !== 'fa fa-star star selected') {
            star.setAttribute('class', 'fa fa-star-o star');
          }
        }
      }
    };

    this.handleStarOut = ev => {
      let elem = ev.currentTarget;
      let stars = this.state.stars;
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        let starClass = star.getAttribute("class");

        if (starClass !== 'fa fa-star star selected') {
          star.setAttribute('class', 'fa fa-star-o star');
        }
      }
    };

    this.handleStarClick = ev => {
      let elem = ev.currentTarget;
      let currentRating = elem.dataset.value;
      this.setState({rating: currentRating});
      let stars = this.state.stars;
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        let value = star.dataset.value;
        if (value <= currentRating) {
          star.setAttribute("class", "fa fa-star star selected");
        } else {
          star.setAttribute("class", "fa fa-star-o star");
        }
      }
    };
  }

  render() {
    return(
      <form className="card comment-form" onSubmit={this.addRating}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Add a comment..."
            value={this.state.body}
            onChange={this.updateComment}
            rows="3">
          </textarea>
        </div>

        <div className="card-footer clearfix">
            <div className="stars-wrap pull-xs-left">
              <i className="fa fa-star-o star"
                data-value="1"
                aria-hidden="true"
                onMouseEnter={this.handleStarIn.bind(this)}
                onMouseLeave={this.handleStarOut.bind(this)}
                onClick={this.handleStarClick.bind(this)}>
              </i>
              <i className="fa fa-star-o star"
                data-value="2"
                aria-hidden="true"
                onMouseEnter={this.handleStarIn.bind(this)}
                onMouseLeave={this.handleStarOut.bind(this)}
                onClick={this.handleStarClick.bind(this)}>
              </i>
              <i className="fa fa-star-o star"
                data-value="3"
                aria-hidden="true"
                onMouseEnter={this.handleStarIn.bind(this)}
                onMouseLeave={this.handleStarOut.bind(this)}
                onClick={this.handleStarClick.bind(this)}>
              </i>
              <i className="fa fa-star-o star"
                data-value="4"
                aria-hidden="true"
                onMouseEnter={this.handleStarIn.bind(this)}
                onMouseLeave={this.handleStarOut.bind(this)}
                onClick={this.handleStarClick.bind(this)}>
              </i>
              <i className="fa fa-star-o star"
                data-value="5"
                aria-hidden="true"
                onMouseEnter={this.handleStarIn.bind(this)}
                onMouseLeave={this.handleStarOut.bind(this)}
                onClick={this.handleStarClick.bind(this)}>
              </i>
            </div>
            <button
              className="btn btn-sm btn-primary pull-xs-right"
              type="submit">
              Post Comment
            </button>
        </div>
      </form>
    )
  }
}

export default connect(() => ({}), mapDispatchToProps)(RatingInput);
