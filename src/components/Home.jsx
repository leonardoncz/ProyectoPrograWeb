import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { todosAnimales, galeriaImagenes } from './data/productos.js';
import { CarritoContext } from '../context/CarritoContext';

function Home() {
  const { agregarAlCarrito } = useContext(CarritoContext);
  
  const [imagenActual, setimagenActual] = useState(0);
  const [filtroTipo, setfiltroTipo] = useState('all');
  const [filtroRaza, setfiltroRaza] = useState('all');
  const [filtroAnimal, setfiltroAnimal] = useState(todosAnimales);

  useEffect(() => {
    const timer = setInterval(() => {
      setimagenActual(slideAnterior => (slideAnterior + 1) % galeriaImagenes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nuevofiltroAnimal = todosAnimales.filter(animal => {
      const tipoMatch = filtroTipo === 'all' || animal.tipo === filtroTipo;
      const razaMatch = filtroRaza === 'all' || animal.raza === filtroRaza;
      return tipoMatch && razaMatch;
    });
    setfiltroAnimal(nuevofiltroAnimal);
  }, [filtroTipo, filtroRaza]);

  return (
    <>
      <header className="top-nav">
        <div className="nav-left">
          <Link to="/" className="nav-logo">PetAdopt</Link>
        </div>
        <nav className="nav-center">
          <Link to="/">Home</Link>
          <Link to="/busqueda">Buscar</Link>
          <Link to="/carrito">Carrito</Link> {/* Te recomiendo tener un enlace directo al carrito */}
          <a href="#">Categories</a>
          <a href="#">Platform</a>
        </nav>
        <div className="nav-right">
          <img src="https://i.pinimg.com/236x/d3/3a/2d/d33a2d1b538f71b19af66d2276aa10e1.jpg" alt="User Photo" className="user-photo" />
        </div>
      </header>

      <main>
        <section className="carousel-container">
          <div className="carousel-slide" style={{ transform: `translateX(-${imagenActual * 100}%)` }}>
            {galeriaImagenes.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`Mascota en adopción ${index + 1}`} />
            ))}
          </div>
        </section>
        
        <section className="animal-gallery">
          <h2>Encuentra a tu nuevo amigo</h2>
          <div className="filters">
            <select value={filtroTipo} onChange={(e) => setfiltroTipo(e.target.value)}>
              <option value="all">Todos los animales</option>
              <option value="perro">Perros</option>
              <option value="gato">Gatos</option>
            </select>
            <select value={filtroRaza} onChange={(e) => setfiltroRaza(e.target.value)}>
              <option value="all">Todas las razas</option>
              <option value="labrador">Labrador</option>
              <option value="beagle">Beagle</option>
              <option value="siames">Siamés</option>
              <option value="persa">Persa</option>
            </select>
          </div>

          <div className="animal-grid">
            {filtroAnimal.map(animal => (
              <div key={animal.id} className="animal-card">
                <img src={animal.image} alt={animal.name} />
                <h3>{animal.name}</h3>
                {/* 2. CORRECCIÓN: La propiedad es 'breed' */}
                <p>Raza: {animal.breed}</p>
                {/* 3. ¡IMPORTANTE! Conectamos el botón con la función del carrito */}
                <button className="adopt-button" onClick={() => agregarAlCarrito(animal)}>
                  Adoptar
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;