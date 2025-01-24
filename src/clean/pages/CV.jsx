export const CV = () => {
    const submitComment = () => {
        console.log('hola')
    }
  return (
    <div className="container">
      <header>
        <h1>Nombre del Candidato</h1>
        <p>Perfil Profesional</p>
      </header>

      <section className="basic-info">
        <h2>Información Básica</h2>
        <p>
          <strong>Correo electrónico:</strong> ejemplo@correo.com
        </p>
        <p>
          <strong>Teléfono:</strong> +1234567890
        </p>
        <p>
          <strong>Dirección:</strong> Calle Ficticia 123, Ciudad
        </p>
      </section>

      <section className="skills">
        <h2>Habilidades</h2>
        <ul>
          <li>Desarrollo Web</li>
          <li>Gestión de Proyectos</li>
          <li>Comunicación Efectiva</li>
        </ul>
      </section>

      <section className="comments">
        <h2>Comentarios y Calificación</h2>
        <div id="stars" className="stars">
          <span data-value="1">&#9733;</span>
          <span data-value="2">&#9733;</span>
          <span data-value="3">&#9733;</span>
          <span data-value="4">&#9733;</span>
          <span data-value="5">&#9733;</span>
        </div>
        <p id="rating">Calificación: 0</p>
        <textarea
          id="comment"
          placeholder="Escribe tu comentario aquí..."
        ></textarea>
        <button onClick={submitComment()}>Enviar Comentario</button>
      </section>
    </div>
  );
};
