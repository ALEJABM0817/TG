export const PlanesItem = ({title, content, imgSrc}) => {
  return (
    <div className="container-planes">
        <h3>{title}</h3>
        <div className='container-img'>
            <img src={imgSrc} alt="Plan Básico" />
        </div>
        <p>{content}</p>
        <input className="buttons" type="submit" value="Solicitar" />
      </div>
  )
}
