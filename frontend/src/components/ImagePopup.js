import React from "react";

function ImagePopup({ card, onClose, refs }) {
  return (
    <section className="modal modal_type_lightbox" ref={refs}>
      <div className="modal__lightbox">
        <figure className="modal__figure">
          <img src={card.link} alt={card.link} className="modal__image" />
          <figcaption className="modal__caption">{card.name}</figcaption>
        </figure>
        <button
          className="modal__close-btn button"
          type="button"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default ImagePopup;
