// Descripciones personalizadas para cada producto
const descripcionesPersonalizadas = {
    1: "Perfume exclusivo con notas florales y cítricas. Aroma sofisticado que perdura todo el día con elegancia.",
    2: "Perfume de lujo con fragancia oriental. Combinación perfecta de especias y maderas nobles para ocasiones especiales.",
    3: "Perfume fresco y juvenil con esencias naturales. Ideal para uso diario con un toque de frescura primaveral.",
    4: "Perfume masculino intenso y duradero. Aroma amaderado que transmite seguridad y distinción.",
    5: "Perfume dulce con notas de vainilla y caramelo. Fragancia envolvente que cautiva los sentidos.",
    6: "Labial cremoso de larga duración. Fórmula hidratante con pigmentos intensos para labios perfectos.",
    7: "Base de maquillaje con cobertura total. Acabado natural que se adapta a todos los tonos de piel.",
    8: "Polvo compacto matificante profesional. Control de brillo durante todo el día con acabado sedoso.",
    9: "Kit de contorno facial profesional. Define y esculpe tus facciones como una experta del maquillaje.",
    10: "Paleta de sombras con 12 tonos versátiles. Desde looks naturales hasta dramáticos estilos de noche.",
    11: "Laptop ultradelgada de alto rendimiento. Procesador de última generación para trabajo y entretenimiento.",
    12: "Smartphone premium con cámara triple. Captura momentos increíbles con calidad profesional.",
    13: "Tablet versátil para productividad. Pantalla HD perfecta para trabajo, estudio y entretenimiento.",
    14: "Laptop gaming con gráficos potentes. Juega a máxima calidad con fluidez impresionante.",
    15: "Audífonos inalámbricos con cancelación de ruido. Sumérgete en tu música sin distracciones externas.",
    16: "Reloj inteligente multifuncional. Monitorea tu salud y mantente conectado con estilo.",
    17: "Bolso de cuero genuino hecho a mano. Elegancia atemporal con múltiples compartimentos organizadores.",
    18: "Mochila ergonómica resistente al agua. Perfecta para aventuras urbanas y viajes de fin de semana.",
    19: "Monedero compacto de diseño minimalista. Guarda tus esenciales con estilo y practicidad.",
    20: "Cartera de piel premium con protección RFID. Seguridad y elegancia en un accesorio imprescindible.",
    21: "Reloj deportivo con GPS integrado. Rastrea tus entrenamientos y alcanza tus metas fitness.",
    22: "Reloj clásico de acero inoxidable. Diseño atemporal que complementa cualquier outfit.",
    23: "Reloj elegante con correa de cuero. Sofisticación suiza para el profesional moderno.",
    24: "Reloj casual con múltiples funciones. Versatilidad y durabilidad para tu día a día.",
    25: "Reloj automático de lujo. Ingeniería de precisión y artesanía excepcional en tu muñeca.",
    26: "Sillón ergonómico de oficina premium. Máximo confort durante largas jornadas de trabajo.",
    27: "Escritorio ajustable en altura. Trabaja sentado o de pie para mejorar tu postura.",
    28: "Estantería modular de diseño escandinavo. Organiza con estilo tus libros y decoración.",
    29: "Mesa de centro moderna con almacenaje. Funcionalidad y diseño para tu sala de estar.",
    30: "Lámpara LED regulable inteligente. Iluminación perfecta controlada desde tu smartphone."
};

// Objeto Carrito con métodos
const carrito = {
    items: [],
    
    agregarItem(producto) {
        this.items.push(producto);
        this.renderizarCarrito();
    },
    
    eliminarItem(index) {
        this.items.splice(index, 1);
        this.renderizarCarrito();
    },
    
    calcularTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    },
    
    //muestra visualmente los productos del carrito//
    renderizarCarrito() {
        const carritoItems = document.getElementById('carrito-items');
        const carritoTotal = document.getElementById('carrito-total');
         
        //Hay productos en el
        if (this.items.length === 0) {
            carritoItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío</p>';
            carritoTotal.innerHTML = '';
            return;
        }
        //muestra los productos ,si hay//
        carritoItems.innerHTML = this.items.map((item, index) => `
            <div class="carrito-item">
                <img src="${item.thumbnail}" alt="${item.title}" class="carrito-item-imagen">
                <div class="carrito-item-info">
                    <div class="carrito-item-titulo">${item.title}</div>
                    <div class="carrito-item-precio">$${item.price.toFixed(2)}</div>
                </div>
                <div class="carrito-item-acciones">
                    <button class="btn-eliminar" onclick="carrito.eliminarItem(${index})">✕</button>
                </div>
            </div>
        `).join('');
        
        carritoTotal.innerHTML = `Total: <strong>$${this.calcularTotal().toFixed(2)}</strong>`;
    }
};

// Sistema de Login con DummyJSON
const loginForm = document.getElementById('login-form');
const loginContainer = document.getElementById('login-container');
const app = document.getElementById('app');
const errorMessage = document.getElementById('error-message');
const btnLogin = document.getElementById('btn-login');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //evita que la pagina se recarge//
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    btnLogin.disabled = true;
    btnLogin.textContent = 'Iniciando sesión...';
    errorMessage.style.display = 'none';
    
    //envia los datos al servidor//
    try {
    const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username.trim(),
            password: password.trim()
        })
    });

    const data = await response.json();
    console.log('Respuesta del servidor:', data);

    if (response.ok && data.accessToken) {
        // Guardar datos del usuario
        sessionStorage.setItem('token', data.accessToken);
        sessionStorage.setItem('userData', JSON.stringify(data));
        mostrarApp(data);
    } else {
        errorMessage.textContent = data.message || 'Usuario o contraseña incorrectos';
        errorMessage.style.display = 'block';
        btnLogin.disabled = false;
        btnLogin.textContent = 'Iniciar Sesión';
    }
    } catch (error) {
    errorMessage.textContent = 'Error al conectar con el servidor'; //cambie el detexto del mensje//
    errorMessage.style.display = 'block'; //Muestra el mensaje//
    console.error('Error en login:', error);
    btnLogin.disabled = false; //reactiva el boton
    btnLogin.textContent = 'Iniciar Sesión'; // restaura el texto
    }

});

// Función para mostrar la app
function mostrarApp(userData) {
    loginContainer.style.display = 'none'; //oculta//
    app.style.display = 'block';
    
    // Mostrar información del usuario
    document.getElementById('user-name').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('user-email').textContent = userData.email;
    document.getElementById('user-avatar').src = userData.image;
    
    cargarProductos();
}

// Cerrar sesión
document.getElementById('btn-logout').addEventListener('click', () => {
    sessionStorage.clear();
    carrito.items = [];
    loginContainer.style.display = 'flex';
    app.style.display = 'none';
    errorMessage.style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    btnLogin.disabled = false;
    btnLogin.textContent = 'Iniciar Sesión';
});

// Verificar si ya hay sesión
const userData = sessionStorage.getItem('userData');
if (userData) {
    mostrarApp(JSON.parse(userData));
}

// Array global para almacenar los productos
let productosGlobales = [];

// Función para cargar productos desde DummyJSON
async function cargarProductos() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=30');
        const data = await response.json();
        productosGlobales = data.products; // Guardar productos globalmente
        renderizarProductos(data.products); //variable global//
    } catch (error) {
        console.error('Error al cargar productos:', error);
        document.getElementById('catalogo-productos').innerHTML = 
            '<p style="color: white;">Error al cargar los productos. Por favor, intenta más tarde.</p>';
    }
}

// Función para renderizar productos
function renderizarProductos(productos) {
    const catalogo = document.getElementById('catalogo-productos');
    catalogo.className = '';
    
    catalogo.innerHTML = productos.map((producto, index) => `
        <div class="producto-card">
            <img src="${producto.thumbnail}" alt="${producto.title}" class="producto-imagen">
            <span class="producto-categoria">${producto.category}</span>
            <h3 class="producto-titulo">${producto.title}</h3>
            <p class="producto-descripcion">${descripcionesPersonalizadas[producto.id] || producto.description}</p>
            <div class="producto-stock">✓ Stock disponible: ${producto.stock} unidades</div>
            <div class="producto-footer">
                <div class="producto-precio">$${producto.price}</div>
                <div class="producto-rating">
                    ⭐ ${producto.rating.toFixed(1)}
                </div>
            </div>
            <button class="btn-agregar" data-index="${index}">
                Añadir al carrito
            </button>
        </div>
    `).join('');
    
    // Agregar event listeners a los botones
    const botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const producto = productosGlobales[index];
            
            // Agregar descripción personalizada al objeto producto
            const productoConDescripcion = {
                ...producto,
                descripcionPersonalizada: descripcionesPersonalizadas[producto.id]
            };
            
            carrito.agregarItem(productoConDescripcion);
            
            // Feedback visual
            e.target.textContent = '✓ Agregado';
            setTimeout(() => {
                e.target.textContent = 'Añadir al carrito';
            }, 1000);
        });
    });
}