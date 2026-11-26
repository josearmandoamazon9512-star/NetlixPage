function skipIntro(){
  const intro=document.getElementById('intro');
  if(!intro)return;
  intro.classList.add('hide');
  setTimeout(()=>intro.remove(),950);
}

window.addEventListener('load',()=>setTimeout(skipIntro,3900));

const seriesConfig=[
  {
    title:'Nuestra historia',
    subtitle:'Capítulos de nosotros',
    photo:'Captura de pantalla 2026-11-25 180300.png',
    video:'video.mp4',
    description:'Una colección de momentos, conversaciones y recuerdos que hicieron única nuestra historia.'
  },
  {
    title:'Pequeños momentos',
    subtitle:'Temporada especial',
    photo:'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=1400&q=85',
    video:'pequenos-momentos.mp4',
    description:'Las escenas más simples a veces son las que dejan el recuerdo más bonito.'
  },
  {
    title:'A pesar de la distancia',
    subtitle:'Una historia por descubrir',
    photo:'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=85',
    video:'distancia.mp4',
    description:'Mensajes, llamadas y encuentros que hicieron sentir cerca lo que parecía tan lejos.'
  },
  {
    title:'Lo que permanece',
    subtitle:'Nuevos capítulos pronto',
    photo:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85',
    video:'lo-que-permanece.mp4',
    description:'Los detalles que siguen presentes y hacen que cada recuerdo siga vivo.'
  }
];

function showPage(pageName){
  document.querySelectorAll('.page').forEach(page=>page.classList.remove('active-page'));
  const page=document.getElementById(pageName);
  if(page)page.classList.add('active-page');

  document.querySelectorAll('.nav-link').forEach(link=>{
    link.classList.toggle('active',link.dataset.page===pageName);
  });

  if(pageName==='series')renderSeries();
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderSeries(){
  const grid=document.getElementById('seriesGrid');
  grid.innerHTML=seriesConfig.map((series,index)=>`
    <button class="series-card" onclick="openSeries(${index})" aria-label="Abrir ${series.title}">
      <img src="${series.photo}" alt="${series.title}">
      <div class="series-card-info">
        <strong>${series.title}</strong>
        <span>${series.subtitle}</span>
      </div>
    </button>
  `).join('');
}

function openSeries(index){
  const series=seriesConfig[index];
  const detail=document.getElementById('seriesDetail');
  detail.classList.add('visible');
  detail.innerHTML=`
    <div class="series-hero" style="background:linear-gradient(90deg,#080808 10%,#080808cc 42%,transparent),linear-gradient(0deg,#080808,transparent 55%),url('${series.photo}') center/cover">
      <div class="content">
        <div class="tag">◆ SERIE ORIGINAL PERSONAL</div>
        <h2>${series.title}</h2>
        <div class="series-meta">98% coincidencia &nbsp; 2026 &nbsp; 1 temporada</div>
        <p>${series.description}</p>
        <div class="series-actions">
          <button onclick="openSeriesVideo(${index})">▶ Reproducir</button>
          <button class="secondary" onclick="showScene('Descripción','${series.description}')">ⓘ Más información</button>
        </div>
      </div>
    </div>
    <section>
      <div class="chapters-heading"><h2>Capítulos</h2></div>
      <div class="coming-grid">
        <article class="coming-card"><span>CAPÍTULO 01</span><strong>El primer recuerdo</strong><b>Disponible próximamente</b></article>
        <article class="coming-card"><span>CAPÍTULO 02</span><strong>Momentos especiales</strong><b>Disponible próximamente</b></article>
        <article class="coming-card"><span>CAPÍTULO 03</span><strong>Lo que sentimos</strong><b>Disponible próximamente</b></article>
        <article class="coming-card"><span>CAPÍTULO 04</span><strong>La próxima escena</strong><b>Disponible próximamente</b></article>
      </div>
    </section>
  `;
  detail.scrollIntoView({behavior:'smooth',block:'start'});
}

function openSeriesVideo(index){
  const series=seriesConfig[index];
  openVideo(series.video,series.title);
}

function showScene(title,text,image='',imageCaption='',youtubeUrl='',instagramUrl=''){
  const player=document.getElementById('player');
  const modalImage=document.getElementById('modalImage');
  const modalImageFrame=document.getElementById('modalImageFrame');
  const modalImageCaption=document.getElementById('modalImageCaption');
  const modalYouTube=document.getElementById('modalYouTube');
  const modalInstagram=document.getElementById('modalInstagram');
  const modalYouTubeFallback=document.getElementById('youtubeFallback');
  modalYouTubeFallback.style.display='none';

  player.pause();
  player.removeAttribute('src');
  player.style.display='none';
  if(modalYouTube){
    modalYouTube.removeAttribute('src');
    modalYouTube.style.display='none';
  }
  if(modalInstagram){
    modalInstagram.removeAttribute('src');
    modalInstagram.style.display='none';
  }

  if(instagramUrl){
    modalImageFrame.style.display='none';
    const url=new URL(instagramUrl);
    const parts=url.pathname.split('/').filter(Boolean);
    const postCode=parts[1] || '';
    if(postCode && modalInstagram){
      modalInstagram.src=`https://www.instagram.com/p/${postCode}/embed/captioned/`;
      modalInstagram.style.display='block';
    }
  }else if(youtubeUrl){
    const parsedUrl=new URL(youtubeUrl);
    const videoId=parsedUrl.hostname.includes('youtu.be')
      ? parsedUrl.pathname.slice(1).split('/')[0]
      : parsedUrl.searchParams.get('v');
    modalImageFrame.style.display='none';
    if(videoId && modalYouTube){
      modalYouTube.src='https://www.youtube.com/embed/UIyE-qvHil0?si=zsDaVMFWBTy8S6l8';
      modalYouTube.style.display='block';
      modalYouTubeFallback.href=youtubeUrl;
      modalYouTubeFallback.style.display='inline-block';
    }
  }else if(image){
    modalImageFrame.style.display='block';
    modalImage.src=image;
    modalImage.style.display='block';
    if(imageCaption){
      modalImageCaption.textContent=imageCaption;
      modalImageCaption.style.display='block';
    }else{
      modalImageCaption.textContent='';
      modalImageCaption.style.display='none';
    }
  }else{
    modalImageFrame.style.display='none';
    modalImage.removeAttribute('src');
  }

  document.getElementById('modalTitle').textContent=title;
  const modalText=document.getElementById('modalText');
  const urlPattern=/(https?:\/\/[^\s]+)/g;
  const safeText=text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  modalText.innerHTML=safeText.replace(urlPattern,(url)=>`<br><a class="description-link" href="${url}" target="_blank" rel="noopener noreferrer">Ver regalo de cumpleaños</a>`);
  document.getElementById('modal').classList.add('open');
}

function openVideo(source='video.mp4',title='Un vídeo especial'){
  const player=document.getElementById('player');
  const modalImage=document.getElementById('modalImage');
  const modalImageFrame=document.getElementById('modalImageFrame');
  const modalYouTube=document.getElementById('modalYouTube');
  modalImage.style.display='none';
  modalImageFrame.style.display='none';
  modalYouTube.style.display='none';
  const modalYouTubeFallback=document.getElementById('youtubeFallback');
  modalYouTubeFallback.style.display='none';

  player.src=source;
  player.style.display='block';
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalText').textContent='Coloca el vídeo configurado junto a index.html para reproducirlo.';
  document.getElementById('modal').classList.add('open');
  player.load();
}

function closeModal(){
  const player=document.getElementById('player');
  const modalYouTube=document.getElementById('modalYouTube');
  const modalInstagram=document.getElementById('modalInstagram');
  player.pause();
  if(modalYouTube){
    modalYouTube.removeAttribute('src');
    modalYouTube.style.display='none';
  }
  const modalYouTubeFallback=document.getElementById('youtubeFallback');
  modalYouTubeFallback.style.display='none';
  if(modalInstagram){
    modalInstagram.removeAttribute('src');
    modalInstagram.style.display='none';
  }
  document.getElementById('modal').classList.remove('open');
}

window.addEventListener('scroll',()=>{
  document.querySelector('header').classList.toggle('scrolled',window.scrollY>40);
});

let loveHeartInterval=null;

function stopLoveHearts(){
  if(loveHeartInterval){
    clearInterval(loveHeartInterval);
    loveHeartInterval=null;
  }
  document.querySelectorAll('#seasonTwoScreen .floating-heart').forEach(heart=>heart.remove());
}

function createLoveHeart(){
  const screen=document.getElementById('seasonTwoScreen');
  if(!screen||!screen.classList.contains('open'))return;

  const heart=document.createElement('span');
  heart.className='floating-heart';
  heart.textContent=Math.random()>0.35?'♥':'♡';
  heart.style.left=(Math.random()*96)+'%';
  heart.style.bottom=(-30-Math.random()*120)+'px';
  heart.style.animationDelay='0s';
  heart.style.animationDuration=(4+Math.random()*3)+'s';
  heart.style.fontSize=(18+Math.random()*30)+'px';
  screen.appendChild(heart);
  setTimeout(()=>heart.remove(),7200);
}

function startLoveHearts(){
  stopLoveHearts();
  for(let i=0;i<14;i++){
    setTimeout(createLoveHeart,i*80);
  }
  loveHeartInterval=setInterval(createLoveHeart,300);
}

function handleSeasonChange(season){
  if(season==='2'){
    document.getElementById('seasonTwoScreen').classList.add('open');
    document.getElementById('loveAnswer').textContent='';
    startLoveHearts();
  }else{
    stopLoveHearts();
  }
}

function backToSeasonOne(){
  stopLoveHearts();
  document.getElementById('seasonTwoScreen').classList.remove('open');
  const select=document.querySelector('.season-select');
  if(select)select.value='1';
}

function acceptLove(){
  saveLoveResponse('Sí','Quiero ser pareja');
  const answer=document.getElementById('loveAnswer');
  answer.textContent='¡Eres mi mejor decisión! ♡';
  startLoveHearts();
}

function askBeforeReturning(){
  document.getElementById('returnConfirm').classList.add('open');
}

function confirmReturn(){
  saveLoveResponse('Sí','Volver a Temporada 1');
  document.getElementById('returnConfirm').classList.remove('open');
  backToSeasonOne();
}

function showFinalChoice(){
  document.getElementById('returnConfirm').classList.remove('open');
  document.getElementById('finalChoiceScreen').classList.add('open');
}

function acceptFinalChoice(){
  document.getElementById('finalChoiceScreen').classList.remove('open');
  document.getElementById('seasonTwoScreen').classList.add('open');
  acceptLove();
}

function showSupportScreen(){
  saveLoveResponse('No','Rechaza la propuesta');
  document.getElementById('returnConfirm').classList.remove('open');
  document.getElementById('finalChoiceScreen').classList.remove('open');
  document.getElementById('supportScreen').classList.add('open');
}

function closeSupportScreen(){
  document.getElementById('supportScreen').classList.remove('open');
  document.getElementById('seasonTwoScreen').classList.add('open');
}

function returnToConfirmFromFinal(){
  document.getElementById('finalChoiceScreen').classList.remove('open');
  document.getElementById('returnConfirm').classList.add('open');
}

function keepInSeasonTwo(){
  const screen=document.getElementById('seasonTwoScreen');
  if(screen)screen.classList.add('open');
}

function stayInSeasonTwo(){
  saveLoveResponse('No','Prefiere continuar en la propuesta');
  document.getElementById('returnConfirm').classList.remove('open');
  document.getElementById('seasonTwoScreen').classList.add('open');
}

const responseEndpoint='https://script.google.com/macros/s/AKfycbwNy3g4GvwGHbWYuTaD5x3YaouEgU1Cm-A5TEkD0tW051DLXgEFaFbotfIe7y7USA57/exec';

function saveLoveResponse(respuesta,accion=''){
  const now=new Date();
  const fecha=now.toLocaleDateString('es-MX');
  const hora=now.toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  const params=new URLSearchParams({
    respuesta,
    accion,
    temporada:'Temporada 2',
    fecha,
    hora,
    timestamp:now.toISOString()
  });

  fetch(`${responseEndpoint}?${params.toString()}`,{
    method:'GET',
    mode:'no-cors',
    cache:'no-store'
  }).catch(()=>{});
}
