function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}


//Effettua la ricerca attraverso l'api dayone/country/italy/status/confirmed/live
function totaliItalia(){
const site='https://api.covid19api.com/dayone/country/italy/status/confirmed/live';
fetch(site,
  {
    method: 'GET',
    headers:
    {
      'Content-Type': 'application/json'
    },
  }
).then(onTokenResponse).then(getResponse);
}


//json di risposta all'api
function getResponse(json)
{
  let numero=0;
  console.log(json);
  const results = json
  const mese = document.querySelector('#selmese');
  const selmese = mese.selectedIndex;
  const anno = document.querySelector('#selanno');
  const selanno = anno.selectedIndex;
  const risultato = document.querySelector('#risultato');



  let dt = new Date();
  risultato.innerHTML='';
  // Processa ciascun risultato
  const lista=document.createElement('div');
  lista.classList.add("flex-container");
  parag = document.createElement('span');
  txt = document.createTextNode("Giorno");
  parag.appendChild(txt);
  lista.appendChild(parag);
  parag = document.createElement('span');
  txt = document.createTextNode("Malati");
  parag.appendChild(txt);
  lista.appendChild(parag);
  risultato.appendChild(lista);

  for(result of results)
  {
    dt=result.Date;
    xt=dt.split('-');
    const valanno=anno.options[selanno].text;
    const valmese=mese.options[selmese].text;
    if ((xt[0]-valanno==0) && (xt[1]-valmese==0))
   {

    // Leggiamo info
    numero++;
	  //console.log(dt);
    const lista=document.createElement('div');
    lista.classList.add("flex-container");
    parag = document.createElement('span');
    let txt = document.createTextNode(xt[2].substr(0,2)+"/");
    parag.appendChild(txt);
    txt = document.createTextNode(xt[1]+"/");
    parag.appendChild(txt);
    txt = document.createTextNode(xt[0]);
    parag.appendChild(txt);
    lista.appendChild(parag);


    parag = document.createElement('span');
    txt = document.createTextNode(result.Cases);
    parag.appendChild(txt);
    lista.appendChild(parag);
    risultato.appendChild(lista);

  }
  }

//se nessun risultato per la selezione effettuata è presente nel sjon di risposta
  if(numero == 0)
  {
	const errore = document.createElement("h1");
	const messaggio = document.createTextNode("Nessun risultato!");
	errore.appendChild(messaggio);
	risultato.appendChild(errore);
  }
}


function onTokenResponse(response) {
  return response.json();
}

function getToken(json)
{
	token_data = json;
	console.log(json);
}


//Effettuo la richiesta del token attraverso l'api con le credenziali
let url_request='https://api.covid19api.dev/token';

//console.log(url_request);
//  richiediamo il token

const credentials={
"username":"testapi1",
"password":"coronavirus19"
};


let token_data;
fetch(url_request,
{
	method: 'POST',
  headers:
	{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(credentials)
}
).then(onTokenResponse).then(getToken);



//carico mesi da 1 a 12 nel select mese
const mese = document.querySelector('#mese');
mese.innerHTML='Mese:';
const selmese = document.createElement('select');
selmese.setAttribute('id', 'selmese');
for(i=1;i<=12;i++){
  opt=document.createElement('option');
  opt.value = i;
  opt.text = i;
  selmese.appendChild(opt);
}
mese.appendChild(selmese);

//carico anni da 2020 a 2030 nel select anno
const anno = document.querySelector('#anno');
anno.innerHTML='Anno:';
const selanno = document.createElement('select');
selanno.setAttribute('id', 'selanno');
for(i=2020;i<=2030;i++){
  let opt=document.createElement('option');
  opt.value = i;
  opt.text = i;
  selanno.appendChild(opt);
}
anno.appendChild(selanno);
selanno.selectedIndex = 1;

pulsante = document.querySelector('#Italia');
pulsante.addEventListener('click', totaliItalia);
