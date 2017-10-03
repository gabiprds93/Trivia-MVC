class Model 
{
      constructor(imgs, preguntas) 
      {
            this.imgs = imgs;
            this.preguntas = preguntas;
            this.total = 5;
            this.arregloRespuestas = new Array(this.total);
            this.contCorrectas = 0;
            this.contador = 0;
            this.titulo = "Aqui estan tus respuestas:",
            this.invisible = " invisible",
            this.flechaAnterior = " disabled",
            this.flechaSiguiente = " disabled",
            this.incorrectas = [];
            this.render = undefined;
      }
      guardarRespuestas(e)
      {
            this.arregloRespuestas[this.contador] = e.target.textContent;
            this.siguiente();
      }
      siguiente()
      {
            if(this.contador >= 0 && this.contador <= this.total - 1)
            {
                  this.contador++;
                  this.invisible = "";
                  this.flechaAnterior = ""; 
                  this.inform();
            }
            if(this.arregloRespuestas[this.contador] == undefined)
            {
                  this.flechaSiguiente = " disabled";
                  this.inform();
            }
      }
      anterior()
      {
            if(this.contador >= 1 && this.contador <= this.total)
            {
                  this.contador--;
                  this.inform();
            }
            if(this.contador == 0)
            {
                  this.flechaAnterior = " disabled";
                  this.inform();
            }
            this.flechaSiguiente = "";
            this.inform();
      }
      comprobar()
      {
            let cont = 0;
            for(let i in this.preguntas)
            {
                  if(this.arregloRespuestas[cont] == this.preguntas[i].respuesta)
                  {
                        this.contCorrectas++;
                  }
                  else
                  {
                        this.incorrectas.push(cont);
                  }
                  cont++;
            }
            this.titulo = `${this.contCorrectas} de ${this.total} correctas!`;
            this.invisible = " invisible";
            this.inform();
      }
      reiniciar()
      {
            this.contCorrectas = 0;
            this.arregloRespuestas = new Array(this.total);
            this.contador = 0,
            this.titulo = "Aqui estan tus respuestas:",
            this.invisible = " invisible",
            this.incorrectas = [];
            this.inform();
      }
      subscribe(render) 
      {
            this.render = render;
      }
      inform() 
      {
            this.render();
      }
}

const App = ({model}) => 
{
      let respuestas = model.arregloRespuestas.map((item, index) => 
      {
            return <h4 key={index}>{index+1}. {model.preguntas[index].pregunta} {item}</h4>;
      });
      if(model.incorrectas.length > 0)
      {
            for(let i of model.incorrectas)
            {
                  respuestas[i] = <h4 key={i} style={{color:"red"}}>{i+1}. {model.preguntas[i].pregunta} <strike>{model.arregloRespuestas[i]}</strike> <strong>{model.preguntas[i].respuesta}</strong></h4>;           
            }
      }
      let secPreguntas;
      if(model.contador < model.total)
      {
            secPreguntas = (
            <div className="container" id="contenedorPreguntas">
                  <div className="row text-center">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                              <h1>{model.preguntas[model.contador].pregunta}</h1>
                        </div>
                  </div>
                  <div className="row text-center opciones">
                        <div className="col-md-4 col-sm-4 col-xs-12">
                              <h1 className="btn btn-default" id="opcion1" onClick={e => model.guardarRespuestas(e)}>{model.preguntas[model.contador].opcion1}</h1>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                              <h1 className="btn btn-default" id="opcion1" onClick={e => model.guardarRespuestas(e)}>{model.preguntas[model.contador].opcion2}</h1>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12">
                              <h1 className="btn btn-default" id="opcion1" onClick={e => model.guardarRespuestas(e)}>{model.preguntas[model.contador].opcion3}</h1>
                        </div>
                  </div>
                  <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 col-md-offset-0 col-xs-offset-0 text-center">
                              <img className="btn social" src="img/Facebook-icon.png" alt=""/>
                              <img className="btn social" src="img/Googleplus-icon.png" alt=""/>
                              <img className="btn social" src="img/Twitter-icon.png" alt=""/>
                        </div>
                  </div>
            </div>);
      }
      if(model.contador == model.total)
      {
            secPreguntas = (
            <div className="container" id="contenedorRespuestas">
                  <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                              <h1 id="titulo">{model.titulo}</h1>
                        </div>
                  </div>
                  <div className="row text-center">
                        <div className="col-md-12 col-sm-12 col-xs-12" id="respuestas">
                              {respuestas}
                        </div>
                  </div>
                  <div className="row text-center">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className={"btn btn-primary " + model.invisible} id="btnEnviar" onClick={e => model.comprobar(e)}>Enviar</div>
                              <div className="btn btn-primary oculto" id="btnComenzar" onClick={e => model.reiniciar(e)}>Comenzar de nuevo</div>
                        </div>
                  </div>
            </div>);
      }
      return (
      <div>
            <header id="cabecera">
                  <div className="container">
                        <div className="row">
                              <div className="col-md-1 col-sm-1 col-xs-2 col-md-offset-10 col-sm-offset-9 col-xs-offset-6">
                                    <img className={"btn "+ model.invisible + model.flechaAnterior} id="anterior" src="img/flecha-izq.png" onClick={e => model.anterior(e)} alt=""/>
                              </div>
                              <div className="col-md-1 col-sm-1 col-xs-2">
                                    <img className={"btn"+ model.invisible + model.flechaSiguiente} id="siguiente" src="img/flecha-der.png" onClick={e => model.siguiente(e)} alt=""/>
                              </div>
                        </div>
                  </div>
            </header>
            <section id="secImagen">
                  <div className="container">
                        <div className="row">
                              <div className="col-md-4 col-sm-8 col-xs-10 col-md-offset-4 col-sm-offset-3 col-xs-offset-1 text-center">
                                    <img className="img-responsive" id="imagen" alt="" src={model.imgs[model.contador]}/>
                              </div>
                        </div>
                  </div>
            </section>
            <section id="secProgreso">
                  <div className="container">
                        <div className="row">
                              <div className="col-md-12 col-sm-12 col-xs-12">
                                    <h4 id="progreso">{model.contador} de {model.total} respondidas</h4>
                              </div>
                        </div>
                        <div className="row">
                              <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="progress">
                                          <div className="progress-bar progress-bar-striped active" id="barra" role="progressbar"
                                          aria-valuenow={model.contador*20} aria-valuemin="0" aria-valuemax="100" style={{width:model.contador*20+"%"}}>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
            <section id="secPreguntas">
                  {secPreguntas}
            </section>
            <section id="fondo">
                  <div className="container">
                        <div className="row">
                              <div className="col-md-12 col-sm-12 col-xs-12">
                                    <img className="img-responsive" src="img/cinema.png" alt=""/>
                              </div>
                        </div>
                  </div>
            </section>
            <footer>
                  <div className="container">
                        <div className="row">
                              <div className="col-md-12 col-sm-12 col-xs-12 text-center">
                                    <label className="">Copyright 2017</label>
                              </div>
                        </div>
                  </div>
            </footer>
      </div>
      );
};

const arregloImagenes = 
[
      "img/aladino.jpg", 
      "img/frozen.jpg", 
      "img/mulan.jpg", 
      "img/toystory.jpg", 
      "img/elreyleon.jpg", 
      "img/final.gif"
];

const preguntas =
[
      {
            pregunta: "¿De qué película es esta imagen?",
            opcion1: "Aladino",
            opcion2: "El Rey León",
            opcion3: "La Sirenita",
            respuesta: "Aladino",
      },
      {
            pregunta: "¿Te suena familiar?",
            opcion1: "Pinocho",
            opcion2: "Frozen",
            opcion3: "La Bella Durmiente",
            respuesta: "Frozen",
      },
      {
            pregunta: "¿Recuerdas esta?",
            opcion1: "Enredados",
            opcion2: "Fantasía",
            opcion3: "Mulán",
            respuesta: "Mulán",
      },
      {
            pregunta: "¿Sabes cuál es esta película?",
            opcion1: "Buscando a Nemo",
            opcion2: "Toy Story",
            opcion3: "Enredados",
            respuesta: "Toy Story",
      },
      {
            pregunta: "¿Y esta?",
            opcion1: "Aladino",
            opcion2: "El Rey León",
            opcion3: "La Sirenita",
            respuesta: "El Rey León",
      },
];

let model = new Model(arregloImagenes, preguntas);
let render = () => 
{
      ReactDOM.render(
      <App title="TodoApp" model={model} />,
      document.getElementById('container')
      );
};

model.subscribe(render);
render(); 