import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `elements__like ${isLiked && 'elements__like_active'}`
  );

  function handleClick() {
    onCardClick({ name: card.name, link: card.link});
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete({ _id: card._id });
  };

  return (
    <div className="elements__element">
      {isOwn &&
        <button
          className="elements__delete"
          aria-label="Удалить"
          type="button"
          onClick={handleDeleteClick}
        />
      }
      <img src={card.link} alt={card.name} className="elements__image" onClick={handleClick} />
      <div className="elements__items">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
