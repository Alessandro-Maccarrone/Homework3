
var listaPreferiti=[];
var path="./images/";

//Visualizza gli elementi in base al testoRicerca della ricerca
function Inizializza(testoRicerca)
{
  const gr = document.querySelector("#griglia");
  gr.innerHTML='';
  for(i=0;i<objectLength(titoli);i++)
  {
    let descri=titoli[i].toUpperCase();
    let trovato=0;
    if (testoRicerca!='') trovato=descri.indexOf(testoRicerca);
    if(trovato!=-1) addBlocco("griglia",gr,i);
   }
    addEventi();
}


//Visualizza i Preferiti
function Inizializza_preferiti()
{
   const pr=document.querySelector('#preferiti');
  // const res=document.querySelectorAll('nascosta');

pr.innerHTML='';
if (objectLength(listaPreferiti)>0)
{
 for(i of listaPreferiti)
 {
   addBlocco("preferiti",pr,i);
 }
 pr.classList.remove("nascosta");
}
else
 pr.classList.add("nascosta");

 stars = document.querySelectorAll(".starp");
 for(star of stars)
 {
  star.addEventListener("click", addPreferiti);
 }

}

//Aggiunge gli evnti click e keyup
function addEventi()
{
  let lists = document.querySelectorAll(".star");
  for(list of lists)
  {
       list.addEventListener("click", addPreferiti);
       if (listaPreferiti.indexOf(list.id.substr(2))==-1){
         list.classList.remove("selected");
         list.classList.add("deselected");
       }
       else {
         list.classList.remove("deselected");
         list.classList.add("selected");
       }
   }

   lists = document.querySelectorAll(".piu");
   for(list of lists)
  {
   list.addEventListener("click", piuDettagli);
  }


  lists = document.querySelectorAll(".meno");
  for(list of lists)
  {
   list.addEventListener("click", menoDettagli);
  }

  lists = document.querySelectorAll("input");
  for(list of lists)
  {
    list.addEventListener("keyup", Cerca);
  }

  lists = document.querySelectorAll(".imgmap");
  for(list of lists)
  {
    list.addEventListener("click", showMaps);
  }
}

//Aggiunge-Rimuove testo e immagini del blocco selezionato ai Preferiti
function addPreferiti(event)
{
    // Aggiungo il blocco selezionato
    const i=event.currentTarget.id.substr(2);
    const n=listaPreferiti.indexOf(i);
    if(event.currentTarget.classList.contains("deselected")){
      if(n==-1)  listaPreferiti.push(i);
      event.currentTarget.src="images/checked.png";
      event.currentTarget.classList.add("selected");
      event.currentTarget.classList.remove("deselected");
    }
    else {
      // Rimuovo il blocco selezionato
      if(n>=0) listaPreferiti.splice(n,1);
      const x=document.querySelector("#id"+i);
      if(x!=null){
      x.src="images/unchecked.png";
      x.classList.add("deselected");
      x.classList.remove("selected");
      event.currentTarget.src="images/unchecked.png";
      event.currentTarget.classList.add("deselected");
      event.currentTarget.classList.remove("selected");
    }
    }

    Inizializza_preferiti();
}


// Aggiunge un blocco
function addBlocco(xtipo,xdiv,j){

  const xtitolo=titoli[j];
  const xdescrizione=descrizioni[j];
  const ximmagine=path+immagini[j];

  var createD,createD1,createD2,createP,createP1,createA,createI,createT,createS ;

  createD = document.createElement('div');

//AGGIUNGO IL TITOLO
  createD2 = document.createElement('span');
  createT = document.createTextNode(xtitolo);
  createD2.appendChild(createT);

  //AGGIUNGO LA STELLINA
  createI = document.createElement('img');
    if(xtipo=="griglia")
    {
      createI.src='images/unchecked.png';
      createI.className="star right";
      createI.setAttribute('id', "id"+i);
  }
  else
  {
      createI.src='images/checked.png';
      createI.className="starp right selected";
      createI.setAttribute('id', "pd"+i);
}
    createD2.appendChild(createI);
  createD.appendChild(createD2);

//AGGIUNGO L'IMMAGINE
  createI = document.createElement('img');
  createI.src=ximmagine;
  if(xtipo!="griglia")
    createI.setAttribute('id', "imgp"+i);
  else
    createI.setAttribute('id', "imgg"+i);
  createI.className="imgmap";
  createD.appendChild(createI);

if(xtipo=="griglia"){
//AGGIUNGO LA DESCRIZIONE
  createP1 = document.createElement('p');
  createT = document.createTextNode(xdescrizione);
  createP1.appendChild(createT);
  createP1.setAttribute('id', "txt"+j);
  createP1.className="hidden";
  createD.appendChild(createP1);

//AGGIUNGO LA SELEZIONE PIU'
  createP1 = document.createElement('p');
  createP1.setAttribute('id', "piu"+j);
  createP1.className="piu";
  createT = document.createTextNode('Clicca per pi\u00F9 dettagli');
  createP1.appendChild(createT);
  createD.appendChild(createP1);

//AGGIUNGO LA SELEZIONE MENO'
  createP1 = document.createElement('p');
  createP1.setAttribute('id', "meno"+j);
  createP1.className="hidden meno";
  createT = document.createTextNode('Clicca per meno dettagli');
  createP1.appendChild(createT);
  createD.appendChild(createP1);
}

  xdiv.appendChild(createD);
}


//Evento più dettagli
function piuDettagli(event){

  // Estraggo indice dall'id
  const i=event.currentTarget.id.substring(3);

  document.querySelector('#piu'+i).classList.add("hidden");
  document.querySelector('#txt'+i).classList.remove("hidden");
  document.querySelector('#meno'+i).classList.remove("hidden");
}

//Evento meno dettagli
function menoDettagli(event){

  // Estraggo indice dall'id
  const i=event.currentTarget.id.substring(4);

  document.querySelector('#piu'+i).classList.remove("hidden");
  document.querySelector('#txt'+i).classList.add("hidden");
  document.querySelector('#meno'+i).classList.add("hidden");

}


// Evento ketup dell'inputbox Cerca
function Cerca(event){
  const x = event.currentTarget.value;
  Inizializza(x.toUpperCase());
}

// estrai il numero dielementi di obj
function objectLength(obj)
{
    let l = 0;
    for(let key in obj)
    {
        l++;
    }
    return l;
}


// Evento click dell'immagine
function showMaps(event){
    const i=event.currentTarget.id.substring(4);
   document.location.href = 'showmap.html?index='+i;
}
