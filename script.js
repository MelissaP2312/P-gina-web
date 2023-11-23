document.addEventListener("DOMContentLoaded", function () {
  const Inicio = document.getElementById("inicio");
  const categorias = document.getElementById("categorias");
  const botonLibros = document.getElementById("botonlibros");
  const botonF1 = document.getElementById("botonf1");
  const botonPelis = document.getElementById("botonpelis");
  const juegoCont = document.getElementById("juego");
  const botonInicio = document.getElementById("botoninicio");
  const juego = document.getElementById("pantallajuego");
  const fin = document.getElementById("fin");
  const botonSig = document.getElementById("botonsig");
  const botonVeri = document.getElementById("botonverificar");
  const questionText = document.getElementById("preguntas");
  const respuesta = document.getElementById("respuestas");
  const botonesRadio = document.getElementById("botonesradio");
  const puntos = document.getElementById("puntuacion");
  const columnasVista = document.getElementById("emparejar");
  const columnas = document.querySelectorAll(".column");
 
  let currentQuestion = 0;
  let currentCategory = "";
  let score = 0;

  botonLibros.addEventListener("click", () => iniciarJuego("Literatura"));
  botonF1.addEventListener("click", () => iniciarJuego("Fórmula 1"));
  botonPelis.addEventListener("click", () => iniciarJuego("Películas"));

  botonInicio.addEventListener("click", () => {
    Inicio.style.display = "none";
    categorias.style.display = "block";
  });
  
  botonSig.addEventListener("click", mostrarSiguiente);
  botonVeri.addEventListener("click", verificarRespuesta);

  let verificationHistory = new Set(); 

  function verificarRespuesta() {
    const currentQuestionData = obtenerCategoriaPreguntas()[currentQuestion - 1];

    if (verificationHistory.has(currentQuestion)) {
      alert("Ya te caché, ¡No hagas trampa!");
      return;
    }
    const userAnswer = respuesta.value.trim().toLowerCase();

    if (currentQuestionData.tipo === "texto") {
      revisarTexto(userAnswer, currentQuestionData);
    } else if (currentQuestionData.tipo === "opcionmulti") {
      const selectedOption = document.querySelector('input[name="opcion"]:checked');
      if (selectedOption) {
        const selectedAnswer = selectedOption.value.toLowerCase();
        revisarTexto(selectedAnswer, currentQuestionData);
      } else {
        alert("Selecciona una opción antes de verificar");
      }
    } else if (currentQuestionData.tipo === "emparejamiento") {
      revisarEmparejadas();
    }
    verificationHistory.add(currentQuestion);
  }

  function iniciarJuego(category) {
    currentCategory = category;
    categorias.style.display = "none";
    juegoCont.style.display = "block";
    mostrarPreguntas();
  }

  function mostrarSiguiente() {
    respuesta.value = "";
    botonesRadio.innerHTML = "";

    if (currentQuestion < obtenerCategoriaPreguntas().length - 1) {
      mostrarPreguntas();
    } else {
      terminarJuego();
    }
  }

  function terminarJuego() {
    juego.style.display = "none";
    fin.style.display = "block";
    puntos.textContent = score;
  }

  function obtenerCategoriaPreguntas() {
    const questionsByCategory = {
      "Literatura": [
        {
          tipo: "texto",
          pregunta: "¿Cuál es el libro que comienza con la frase 'En un lugar de La Mancha, de cuyo nombre no quiero acordarme'?",
          respuesta: "Don Quijote de la Mancha"
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿Quién escribió 'Cien años de soledad'?",
          opciones: ["Gabriel García Márquez", "Mario Vargas Llosa", "Pablo Neruda"],
          respuesta: "Gabriel García Márquez"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Empareja a cada escritor con su libro",
          opciones: [
            {opcion1: "Rick Riordan", opcion2: "Percy Jackson"},
            {opcion1: "J. K. Rowling", opcion2:"Harry Potter"},
            {opcion1: "Gabriel García Márquez", opcion2: "Cien años de soledad"},
            {opcion1: "Antoine de Saint-Exupery", opcion2:"El Principito"},
            {opcion1: "Jane Austen", opcion2:"Orgullo y Prejuicio"}
          ]
        },
        {
          tipo: "texto",
          pregunta: "En Crepúsculo de Stephenie Meyer, ¿qué tipo de ser es Edward Cullen?",
          respuesta: "Vampiro"
        },
        {
          tipo: "opcionmulti",
          pregunta: "En El Gran Gatsby, ¿quién es el narrador de la historia?",
          opciones: ["Nick Carraway", "Jay Gatsby", "Daisy Buchanan"],
          respuesta: "Nick Carraway"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Relaciona el título del libro con su género",
          opciones: [
            {opcion1: "Frankenstein", opcion2: "Ciencia ficción"},
            {opcion1: "Cien años de soledad", opcion2:"Realismo mágico"},
            {opcion1: "Alicia en el país de las maravillas", opcion2: "Literatura fantástica"},
          ]
        },
        {
          tipo: "texto",
          pregunta: "Quién es el personaje principal en la novela El juego de Ender",
          respuesta: "Ender Wiggin"
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿En qué libro de Jane Austen se narra la historia de Elizabeth Bennet y Mr. Darcy?",
          opciones: ["Emma", "Sentido y sensibilidad", "Orgullo y prejuicio"],
          respuesta: "Orgullo y prejuicio"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Vincula el personaje con la serie de libros correspondiente",
          opciones: [
            {opcion1: "Frodo Bolsón", opcion2: "El Señor de los Anillos"},
            {opcion1: "Hercule Poirot", opcion2:"Hercule Poirot"},
            {opcion1: "Percy Jackson", opcion2: "Percy Jackson y los dioses del Olimpo"},
            {opcion1: "Clary Fray", opcion2:"Cazadores de Sombras"},
            {opcion1: "Katniss Everdeen", opcion2:"Los Juegos del Hambre"},
          ]
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿Quién es el autor de la serie de libros Las Crónicas de Narnia?",
          opciones: ["J.R.R. Tolkien", "C.S. Lewis", "J.K. Rowling"],
          respuesta: "C.S. Lewis"
        },
        {
          tipo: "texto",
          pregunta: "¿De qué saga de libros es protagonista Juliette Ferrars?",
          respuesta: "Shatter Me"
        },
      ],
      "Fórmula 1": [
        {
          tipo: "texto",
          pregunta: "¿Cuál es el equipo de Fórmula 1 de Lewis Hamilton?",
          respuesta: "Mercedes"
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿En qué país se celebra el Gran Premio de Mónaco?",
          opciones: ["Francia", "Italia", "Mónaco"],
          respuesta: "Mónaco"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Empareja a cada piloto con su país",
          opciones: [
            {opcion1: "Checo Pérez", opcion2: "México"},
            {opcion1: "Oscar Piastri", opcion2:"Australia"},
            {opcion1: "Carlos Sainz", opcion2: "España"},
            {opcion1: "Alex Albon", opcion2:"Tailandia"},
            {opcion1: "George Russell", opcion2:"Reino Unido"}
          ]
        },
        {
          tipo: "texto",
          pregunta: "¿Cuál es la pista de carreras con la vuelta más rápida en la Fórmula 1?",
          respuesta: "Spa"
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿Qué equipo ganó el Campeonato de Constructores en la temporada 2021?",
          opciones: ["Mercedes", "Ferrari", "Red Bull", "Williams", "McLaren"],
          respuesta: "Red Bull"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Vincula el Gran Premio con el circuito en el que se celebra",
          opciones: [
            {opcion1: "Mónaco", opcion2: "Circuit de Monaco"},
            {opcion1: "Australia", opcion2:"Albert Park Circuit"},
            {opcion1: "Italia", opcion2: "Autodromo Nazionale Monza"},
            {opcion1: "Azerbaiyán", opcion2:"Bakú"},
            {opcion1: "Estados Unidos", opcion2:"Hard Rock Stadium Circuit"}
          ]
        },
        {
          tipo: "texto",
          pregunta: "¿En qué año debutó Checo Pérez en la F1?",
          respuesta: "2011"
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿Cuál de los siguientes Grandes Premios es conocido por celebrarse en un circuito callejero nocturno?",
          opciones: ["Singapur", "Australia", "Mónaco", "México"],
          respuesta: "Singapur"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Relaciona el campeón del mundo con el año en que ganó su primer título",
          opciones: [
            {opcion1: "Sebastian Vettel", opcion2: "2010"},
            {opcion1: "Fernando Alonso", opcion2:"2005"},
            {opcion1: "Lewis Hamilton", opcion2: "2008"},
            {opcion1: "Nico Rosberg", opcion2:"2016"},
            {opcion1: "Jenson Button", opcion2:"2009"},
            {opcion1: "Kimi Räikkönen", opcion2:"2007"}
          ]
        },{
          tipo: "texto",
          pregunta: "¿Cuál es el equipo más exitoso en la historia de la F1 en términos de campeonatos de constructores?",
          respuesta: "Ferrari"
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿Cuál es el sistema de penalización por cambio de componentes que afecta a la parrilla de salida?",
          opciones: ["Sanción de tiempo", "Sanción de puntos", "Sanción de parrilla"],
          respuesta: "Sanción de parrilla"
        },
      ],
      "Películas": [
        {
          tipo: "opcionmulti",
          pregunta: "¿Cuál es el actor que interpreta a Iron Man en el Universo Cinematográfico de Marvel?",
          opciones: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth"],
          respuesta: "Robert Downey Jr."
        },
        {
          tipo: "emparejamiento",
          pregunta: "Empareja a cada película con su año de estreno",
          opciones: [
            {opcion1: "The Avengers", opcion2: "2012"},
            {opcion1: "Los Juegos del Hambre: Sinsajo Parte 1", opcion2:"2014"},
            {opcion1: "Yo antes de ti", opcion2: "2016"},
            {opcion1: "John Wick 3", opcion2:"2019"},
            {opcion1: "Siempre a tu lado", opcion2:"2009"}
          ],
        },
        {
          tipo: "texto",
          pregunta: "¿Qué película ganó el premio a la Mejor Película en los Oscar 2020?",
          respuesta: "Parásitos"
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿Quién dirigió la película El Padrino?",
          opciones: ["Steven Spielberg", "Martin Scorsese", "Francis Ford Coppola"],
          respuesta: "Francis Ford Coppola"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Empareja la película con su actor/actriz protagonista",
          opciones: [
            {opcion1: "La La Land", opcion2: "Emma Stone"},
            {opcion1: "The Silence of the Lambs", opcion2:"Jodie Foster"},
            {opcion1: "The Social Network", opcion2: "Jesse Eisenberg"},
            {opcion1: "Interestelar", opcion2:"Matthew McConaughey"},
          ],
        },
        {
          tipo: "texto",
          pregunta: "¿Quién interpretó el papel de Neo en la trilogía de The Matrix?",
          respuesta: "Keanu Reeves"
        },
        {
          tipo: "opcionmulti",
          pregunta: "¿Cuál es la película de animación que presenta a un ratón chef llamado Remy?",
          opciones: ["Shrek", "Toy Story", "Ratatouille"],
          respuesta: "Ratatouille"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Relaciona la película con el personaje animado principal",
          opciones: [
            {opcion1: "Buscando a Nemo", opcion2: "Nemo"},
            {opcion1: "Mi Villano Favorito", opcion2:"Gru"},
            {opcion1: "Shrek", opcion2: "Shrek"},
            {opcion1: "Kung Fu Panda", opcion2:"Po"},
            {opcion1: "El Rey León", opcion2:"Simba"}
          ],
        },
        {
          tipo: "texto",
          pregunta: "¿En qué película dirigida por Christopher Nolan Leonardo DiCaprio interpreta a Dom Cobb, un ladrón de sueños?",
          respuesta: "Inception"
        },
        {
          tipo: "emparejamiento",
          pregunta: "Empareja el título de la película con el año de su estreno",
          opciones: [
            {opcion1: "Titanic", opcion2: "1997"},
            {opcion1: "Avatar", opcion2:"2009"},
            {opcion1: "El Padrino", opcion2: "1972"},
            {opcion1: "Jurassic World", opcion2:"2015"},
            {opcion1: "007: Skyfall", opcion2:"2012"}
          ],
        }, 
        {
          tipo: "opcionmulti",
          pregunta: "¿Qué película ganó el Premio de la Academia a la Mejor Película en 2018?",
          opciones: ["La forma del agua", "Parásitos", "Spotlight", "Green Book"],
          respuesta: "Green Book"
        }
      ]
    };

    return questionsByCategory[currentCategory];
  }

  function revisarTexto(userAnswer, currentQuestionData) {
    const correctAnswer = currentQuestionData.respuesta.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      score += 10;
    }

    const resultMessage = isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta. La respuesta correcta es: " + correctAnswer;
    alert(resultMessage);

    actualizarContadorBuenas(isCorrect);
  }

  let correctAnswersCounter = 0;

  function actualizarContadorBuenas(isCorrect) {
    if (isCorrect) {
    correctAnswersCounter++;
    }
  }

  function mostrarPreguntas() {
    botonSig.style.display = "block";
    botonVeri.style.display = "block";
    juego.style.display = "block";

    const categoryQuestions = obtenerCategoriaPreguntas();

    if (currentQuestion < categoryQuestions.length) {
      const currentQuestionData = categoryQuestions[currentQuestion];
      questionText.textContent = currentQuestionData.pregunta;

      if (currentQuestionData.tipo === "texto") {
        respuesta.type = "text";
        respuesta.placeholder = "Escribe tu respuesta aquí";
        respuesta.style.display = "block";
        botonesRadio.style.display = "none";
        columnasVista.style.display = "none";
      } else if (currentQuestionData.tipo === "opcionmulti") {
        respuesta.style.display = "none";
        mostrarOpcionMultiple(currentQuestionData.opciones);
        columnasVista.style.display = "none";
      } else if (currentQuestionData.tipo === "emparejamiento") {
        respuesta.style.display = "none";
        botonesRadio.style.display = "none";
        mostrarEmparejar(currentQuestionData.opciones);
        columnasVista.style.display = "";
      }
      currentQuestion++;
    } else {
      terminarJuego();
    }
  }

  

  function mostrarOpcionMultiple(options) {
    options.forEach((option, index) => {
      const radioBtn = document.createElement("input");
      radioBtn.type = "radio";
      radioBtn.name = "opcion";
      radioBtn.value = option.toLowerCase();
      radioBtn.id = `opcion-${index}`;

      const label = document.createElement("label");
      label.textContent = option;
      label.setAttribute("for", `opcion-${index}`);

      botonesRadio.appendChild(radioBtn);
      botonesRadio.appendChild(label);
    });
    botonesRadio.style.display = "block";
  }

  let draggedItem = null;

  const column1 = document.querySelector(".column:first-child");
  const draggableItems = column1.querySelectorAll(".matching-item");

  draggableItems.forEach((item) => {
    item.draggable = true;
    item.addEventListener("dragstart", inicioArrastre);
    item.addEventListener("dragover", arrastreSobre);
    item.addEventListener("drop", manejarSoltar);
    item.addEventListener("dragend", finArrastre);
  });

  columnas[0].addEventListener("dragover", arrastreSobre);
  columnas[0].addEventListener("dragenter", handleDragEnter);
  columnas[0].addEventListener("dragleave", manejarArrastre);
  columnas[0].addEventListener("drop", manejarSoltar);

  function inicioArrastre(e) {
    draggedItem = e.target;
    e.dataTransfer.setData("text/plain", draggedItem.dataset.index);
    setTimeout(() => {
      draggedItem.style.opacity = "0.5";
    }, 0);
  }

  function arrastreSobre(e) {
    e.preventDefault();
    if (e.target.classList.contains("matching-item") && e.target !== draggedItem) {
      const isColumn1Item = e.target.parentElement.classList.contains("column") && e.target.parentElement.id === "column1";
  
      if (isColumn1Item) {
        e.target.classList.add("over");
      }
    }
  }
  

  function manejarArrastre(e) {
    if (e.target.classList.contains("matching-item")) {
      e.target.classList.remove("over");
    }
  }

  function manejarSoltar(e) {
    e.preventDefault();
    if (e.target.classList.contains("matching-item") && e.target !== draggedItem) {
      const targetItem = e.target;
      targetItem.classList.remove("over");

      const draggedIndex = e.dataTransfer.getData("text/plain");
      const draggedElement = document.querySelector(`.matching-item[data-index="${draggedIndex}"]`);

      if (draggedElement && targetItem !== draggedElement) {
        const temp = document.createElement("div");
        draggedElement.parentElement.insertBefore(temp, draggedElement);
        targetItem.parentElement.insertBefore(draggedElement, targetItem);
        temp.parentElement.insertBefore(targetItem, temp);
        temp.parentElement.removeChild(temp);
      }
    }
    draggedItem.style.opacity = "1";
  }

  function finArrastre() {
    draggedItem = null;
  }

  function mostrarEmparejar(options) {
    const [column1, column2] = columnas;
  
    column1.innerHTML = "";
    column2.innerHTML = "";
  
    const shuffledOptionsColumn1 = mezclarArray(options.map(pair => pair.opcion1));
  
    const pairedOptions = options.map((pair, index) => {
      return {
        opcion1: shuffledOptionsColumn1[index],
        opcion2: pair.opcion2
      };
    });
  
    pairedOptions.forEach((pair, index) => {
      const item1 = document.createElement("div");
      item1.classList.add("matching-item");
      item1.draggable = true;
      item1.dataset.index = index;
      item1.textContent = pair.opcion1; 
      item1.id = `item-${index}-1`;
  
      item1.addEventListener("dragstart", inicioArrastre);
      item1.addEventListener("dragover", arrastreSobre);
      item1.addEventListener("drop", manejarSoltar);
      item1.addEventListener("dragend", finArrastre);
  
      const item2 = document.createElement("div");
      item2.classList.add("matching-item");
      item2.draggable = false;
      item2.dataset.index = index;
      item2.textContent = pair.opcion2; 
      item2.id = `item-${index}-2`;
  
      column1.appendChild(item1);
      column2.appendChild(item2);
    });
  }
  
  function mezclarArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  
  
  function revisarEmparejadas() {
    const column1Items = document.querySelectorAll("#column1 .matching-item");
    const column2Items = document.querySelectorAll("#column2 .matching-item");
  
    let allCorrect = true;
    let incorrectPairs = [];
  
    const questionData = obtenerCategoriaPreguntas()[currentQuestion - 1];
    const expectedPairs = questionData.opciones.map((opcion) => [opcion.opcion1, opcion.opcion2]);
  
    for (let i = 0; i < column1Items.length; i++) {
      const item1 = column1Items[i];
      const item2 = column2Items[i];
  
      const text1 = item1.textContent.trim();
      const text2 = item2.textContent.trim();
  
      const isPairCorrect = expectedPairs.some((expectedPair) => {
        const [opcion1, opcion2] = expectedPair;
        return opcion1 === text1 && opcion2 === text2;
      });
  
      if (!isPairCorrect) {
        allCorrect = false;
        item1.classList.add("incorrect");
        if (item2) {
          item2.classList.add("incorrect");
          incorrectPairs.push([text1, text2]);
        }
      } else {
        item1.classList.remove("incorrect");
        if (item2) {
          item2.classList.remove("incorrect");
        }
      }
    }
  
    if (allCorrect) {
      score += 10;
      alert("¡Emparejamiento correcto!");
    } else {
      const incorrectPairsMessage = incorrectPairs.map(pair => `${pair[0]} - ${pair[1]}`).join("\n");
      alert(`Emparejamiento incorrecto. Las siguientes parejas son incorrectas:\n${incorrectPairsMessage}`);
    }
  
    actualizarContadorBuenas(allCorrect);
  }
  
});