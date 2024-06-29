import ReactStars from "react-rating-stars-component";
export const OfertantesItem = ({imgSrc,content}) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

    return (
      <div className="ofertantes-content">         
          <div className='container-img'>
              <img src={imgSrc} alt="Fotografía" />
          </div>
          <p>{content}</p>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            position="center"
            classNames="stars-container"
          />
          <input className="buttons" type="submit" value="Contratar" />
        </div>
    )
  }