/* botão claro/escuro */
var root=document.documentElement;
document.getElementById('toggle').addEventListener('click',function(){
  root.setAttribute('data-theme', root.getAttribute('data-theme')==='dark'?'light':'dark');
});
/* nome: separa em palavras para animar uma a uma */
var nome=document.getElementById('nome'), txt=nome.getAttribute('aria-label'), n=0;
nome.textContent='';
txt.split(' ').forEach(function(pal,k,arr){
  var w=document.createElement('span'); w.className='w'; w.setAttribute('aria-hidden','true');
  w.textContent=pal; w.style.setProperty('--i',n++);
  nome.appendChild(w);
  if(k<arr.length-1) nome.appendChild(document.createTextNode(' '));
});
function tocar(){ nome.classList.remove('tocar'); void nome.offsetWidth; nome.classList.add('tocar'); }
tocar();
/* toca de novo ao voltar para o topo ou ao reabrir a aba */
var dentro=true;
if('IntersectionObserver' in window){
  new IntersectionObserver(function(es){ var v=es[0].isIntersecting; if(v&&!dentro) tocar(); dentro=v; },{threshold:.6}).observe(document.getElementById('inicio'));
}
document.addEventListener('visibilitychange',function(){ if(!document.hidden) tocar(); });

/* cargo: troca de frase com fade (mude as frases aqui) */
var cargo=document.getElementById('cargo');
var frases=['Desenvolvedor Full Stack','Apps Mobile com Flutter','IA e Visão Computacional'];
var fi=0;
function trocar(){
  cargo.classList.add('sai');
  setTimeout(function(){
    fi=(fi+1)%frases.length; cargo.textContent=frases[fi];
    cargo.style.transition='none'; cargo.classList.remove('sai'); cargo.classList.add('pre');
    void cargo.offsetWidth;
    cargo.style.transition=''; cargo.classList.remove('pre');
    setTimeout(trocar,2600);
  },450);
}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){ setTimeout(trocar,2800); }

/* aparecer ao rolar */
if('IntersectionObserver' in window){
  var itens=document.querySelectorAll('section > :not(.list):not(.techs), .list li, .tech');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.15});
  itens.forEach(function(el,i){
    el.classList.add('reveal');
    if(el.tagName==='LI' || el.classList.contains('tech')){ el.style.transitionDelay=(Array.prototype.indexOf.call(el.parentNode.children,el)*70)+'ms'; setTimeout(function(){ el.style.transitionDelay=''; },2200); }
    io.observe(el);
  });
}
/* barra laranja de progresso */
var bar=document.getElementById('progress');
function prog(){
  var max=document.documentElement.scrollHeight-window.innerHeight;
  bar.style.height=(max>0?Math.min(100,window.scrollY/max*100):0)+'%';
}
window.addEventListener('scroll',prog,{passive:true}); prog();
