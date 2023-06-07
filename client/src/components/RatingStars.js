import React from 'react';
import RatingStars from 'react-rating-stars-component';

const ratingStars = (item, isSharedPage, isAuth) => {
  if (!isSharedPage) return null;

  return (
    <div className="d-flex justify-content-between align-items-center">
      <RatingStars
        count={5}
        size={24}
        activeColor="#ffd700"
        inactiveColor="#e4e4e4"
        edit={isAuth}
        value={isAuth ? item.mark : 0}
      />
      <h6 style={{ marginTop: '8px' }}>{item.rating}</h6>
    </div>
  );
};

export default ratingStars;
