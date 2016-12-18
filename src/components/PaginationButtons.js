import React from 'react';
import api from '../api';
import {connect} from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onSetPage: (page, payload) =>
    dispatch({type: 'SET_PAGE', page, payload})
});

const PaginationButtons = props => {
  if (props.ratings) {
    let ratings = props.ratings[0];
    let currentPage = props.currentPage;
    let pages = 0;
    if (ratings) {
      pages = ratings.rating_count ? parseInt(ratings.rating_count) : 0;
      if (pages > 5) {
        const buttons = [];

        for (let i = 0; i < Math.ceil(pages / 5); i++) {
          buttons.push(i);
        }

        const setPage = page => {
          let payload = props.profileType === 'distill' ?
            api.Ratings.getRatingsByDistillSlug(props.userSlug, page) :
            api.Ratings.getRatingsByUserSlug(props.userSlug, page)

          props.onSetPage(page, payload);
        }

        return(
          <nav>
            <ul className="pagination">
              {
                buttons.map(num => {
                  const btnClick = ev => {
                    ev.preventDefault();
                    console.log('user: ', props.currentUser);
                    setPage(num);
                  }
                  return(
                    <li className={currentPage === num ? 'btn-item active' : 'btn-item'} key={num}>
                      <a onClick={btnClick}
                        className="btn-link" href="">
                        {num + 1}
                      </a>
                    </li>
                  )
                })
              }
            </ul>
          </nav>
        )
      }
      return null;
    }
    return null;
  }
  return null;
}

export default connect(() => ({}), mapDispatchToProps)(PaginationButtons);
