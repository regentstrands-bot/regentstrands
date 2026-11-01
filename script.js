const raw='https://raw.githubusercontent.com/noirstrands/noir-strands/main/';
const products=[
['Pixie Cut','Pixie Cut',191,'Natural Black','8 inch','HD Lace','pixie-cut.jpg'],
['Pixie Curls','Pixie Curls',222,'Espresso','12 inch','Transparent Lace','pixie-curls.jpg'],
['Bone Straight','Bone Straight',139,'Natural Black','16 inch','','DD67239A-8B14-4DB1-BAB3-6D5982B589BD.png'],
['Body Wave','Body Wave',129,'Burgundy','20 inch','5x5 Closure','body-wave-card.jpg'],
['Deep Wave','Deep Wave',314,'Natural Black','','13x4 Lace Front','E7991C70-6C31-4265-B47F-29089799952B.png'],
['Water Wave','Water Wave',129,'Natural Black','5x5','HD Lace','IMG_0881.jpeg'],
['Loose Deep Waves','Loose Deep Waves',349,'Black','','HD Lace','IMG_0885.jpeg'],
['Straight Bob','Straight Bob',120,'Copper Orange','','Transparent Lace','04AABB70-9A50-4222-AC37-11C838CCB456.png'],
['Curly Bob','Curly Bob',245,'Black','14 inch','4x4 Closure','curly-bob.jpg'],
['Burmese Curly','Burmese Curly',229,'Natural Black','12 inch','HD Lace','B7602B7F-1214-4DD8-94B1-8D280EDCD245.png'],
['Deep Curly','Deep Curly',337,'Pink','24 inch','5x5 Closure','deep-curly.jpg'],
['Afro Kinky','Afro Kinky',150,'Blonde','30 inch','13x4 Lace Front','afro-kinky.jpg'],
['Layered Straight','Layered Straight',245,'Natural Black','20 inch','HD Lace','loose-deep-2.jpg'],
['Layered Body Wave','Layered Body Wave',339,'Natural Black','20 inch','Transparent Lace','layered-body-wave.jpg']
];
const cats=['All styles','Pixie Cut','Pixie Curls','Bone Straight','Body Wave','Deep Wave','Water Wave','Loose Wave','Kinky Curly','Kinky Straight','Jerry Curl','Loose Deep Waves','Straight Bob','Curly Bob','Burmese Curly','Bob Wig','Jerry Straight','Deep Curly','Afro Kinky'];
let cart=JSON.parse(localStorage.cart||'[]'),saved=JSON.parse(localStorage.saved||'[]');
const chips=document.querySelector('#chips');
cats.forEach((c,i)=>{let b=document.createElement('button');b.className='chip'+(i===0?' active':'');b.type='button';b.textContent=c;b.onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(c==='All styles'?'':c)};chips.appendChild(b)});
function currentList(filter=''){const q=(document.querySelector('#search').value||'').toLowerCase();return products.filter(p=>(!filter||p[0]===filter)&&(!q||p[0].toLowerCase().includes(q)))}
function render(filter=''){
 const list=currentList(filter);
 document.querySelector('#products').innerHTML=list.map((p,i)=>{
  const name=p[0];
  const isPixie=name==='Pixie Cut',isPixieCurls=name==='Pixie Curls',isBodyWave=name==='Body Wave',isStraightBob=name==='Straight Bob',isWaterWave=name==='Water Wave',isLooseDeepWaves=name==='Loose Deep Waves',isCurlyBob=name==='Curly Bob',isBurmeseCurly=name==='Burmese Curly';
  const bobColors=['Copper Orange','Auburn Brown','Dark Chocolate Brown','Natural Black'];
  const slides=['2F4B1925-05C6-4A60-A163-5BB1E694B9BC.png','5C67CEE6-3B7A-43F7-AB7B-94653487040D.png','IMG_0801.jpeg'];
  const curlsSlides=['IMG_0857.webp','IMG_0856.webp'];
  const bodySlides=['temp_image_3C634754-F18F-469F-AB28-25B1D857BBDA.jpeg','IMG_0865.jpeg'];
  const waterSlides=['IMG_0881.jpeg','IMG_0880.jpeg'];
  const looseSlides=['IMG_0885.jpeg','IMG_0884.jpeg','IMG_0883.jpeg','IMG_0882.jpeg'];
  const curlySlides=['IMG_0889.jpeg','IMG_0888.jpeg'];
  const burmeseSlides=['B7602B7F-1214-4DD8-94B1-8D280EDCD245.png'];
  const slideNames=isPixie?slides:isPixieCurls?curlsSlides:isBodyWave?bodySlides:isWaterWave?waterSlides:isLooseDeepWaves?looseSlides:isCurlyBob?curlySlides:isBurmeseCurly?burmeseSlides:null;
  const imageList=slideNames?slideNames.map(name=>raw+name):[raw+p[6]];
  const hasSlides=!!slideNames;
  const attrs=hasSlides?'data-slides="'+imageList.join('|')+'" data-slide-index="0"':'';
  const hideLaceLabel=name==='Bone Straight';
  let colorOptions='<select><option>'+p[3]+'</option></select>';
  if(isPixie)colorOptions='<select class="color-select"><option>Natural Black</option><option>Gold</option><option>Auburn Copper</option></select>';
  else if(isBodyWave||isWaterWave)colorOptions='<select class="color-select"><option>Natural Black</option><option>Burgundy</option></select>';
  else if(isLooseDeepWaves)colorOptions='<select class="color-select"><option>Black</option></select>';
  else if(isCurlyBob)colorOptions='<select class="color-select"><option>Black</option><option>Burgundy</option></select>';
  else if(isBurmeseCurly)colorOptions='<select class="color-select"><option>Natural Black</option></select>';
  else if(isStraightBob)colorOptions='<select class="color-select">'+bobColors.map(color=>'<option>'+color+'</option>').join('')+'</select>';
  const lengthOptions=p[4]?'<select aria-label="Length"><option>'+p[4]+'</option></select>':'';
  return `<article class="product"><img class="product-img" ${attrs} src="${imageList[0]}" alt="${name} wig" loading="eager" decoding="async" onerror="this.onerror=null;this.src='${raw+p[6]}'">${hideLaceLabel?'':'<span class="badge">'+p[5]+'</span><small>'+p[5].toUpperCase()+'</small>'}<h3>${p[1]}</h3><div class="meta">${p[1]}<br>● ${p[3]}${p[4]?' · '+p[4]:''}</div><div class="price">$ ${p[2]}</div>${colorOptions}${lengthOptions}<button class="add" type="button" onclick="addCart(${i},'${filter}')">ADD TO CART</button></article>`;
 }).join('');
 document.querySelectorAll('.product').forEach(card=>{
  const img=card.querySelector('img[data-slides]'),select=card.querySelector('.color-select');
  if(!img||!select)return;
  select.selectedIndex=Number(img.dataset.slideIndex||0);
  select.addEventListener('change',()=>{
   const slides=img.dataset.slides.split('|'),selected=select.selectedIndex,preload=new Image();
   preload.onload=()=>{img.src=slides[selected];img.dataset.slideIndex=String(selected);img.dataset.manualSelection='true';};
   preload.onerror=()=>console.error('Selected wig image failed to load:',slides[selected]);
   preload.src=slides[selected];
  });
 });
 if(window.productSlideshowTimer)clearInterval(window.productSlideshowTimer);
 window.productSlideshowTimer=setInterval(()=>{
  document.querySelectorAll('#products img[data-slides]').forEach(img=>{
   if(img.dataset.manualSelection==='true')return;
   const slides=img.dataset.slides.split('|'),next=(Number(img.dataset.slideIndex||0)+1)%slides.length,preload=new Image();
   preload.onload=()=>{img.src=slides[next];img.dataset.slideIndex=String(next);const select=img.closest('.product')?.querySelector('.color-select');if(select)select.selectedIndex=next;};
   preload.onerror=()=>console.error('Product slideshow image failed to load:',slides[next]);
   preload.src=slides[next];
  });
 },2000);
}
window.addCart=(i,filter)=>{const p=currentList(filter)[i];if(!p)return;cart.push(p);localStorage.cart=JSON.stringify(cart);update()};
function update(){document.querySelector('#cartCount').textContent=cart.length;document.querySelector('#savedCount').textContent=saved.length;document.querySelector('#cartItems').innerHTML=cart.map(p=>`<div class="cart-row"><span>${p[1]}</span><b>$${p[2]}</b></div>`).join('')||'<p>Your bag is empty.</p>';document.querySelector('#cartTotal').textContent=cart.length?'Items selected: '+cart.length:'';document.querySelector('#savedItems').innerHTML=saved.map(p=>'<div class="cart-row">'+p[1]+'</div>').join('')||'<p>No saved looks yet.</p>'}
function openDrawer(id){document.querySelector(id).classList.add('open')}function closeAll(){document.querySelectorAll('.drawer').forEach(x=>x.classList.remove('open'))}
document.querySelector('#cartBtn').onclick=()=>openDrawer('#cartDrawer');document.querySelector('#savedBtn').onclick=()=>openDrawer('#savedDrawer');document.querySelectorAll('.close').forEach(b=>b.onclick=closeAll);document.querySelector('#search').oninput=()=>render();document.querySelector('#filterToggle').onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));document.querySelector('.chip').classList.add('active');render()};

const creatorForm=document.querySelector('#creatorForm');
const formStatus=document.querySelector('#formStatus');
if(creatorForm){
 creatorForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const submitButton=creatorForm.querySelector('button[type="submit"]');
  submitButton.disabled=true;submitButton.textContent='Submitting application…';
  if(formStatus)formStatus.textContent='Submitting application…';
  try{
   const street=creatorForm.querySelector('[name="shipping_street"]').value.trim();
   const city=creatorForm.querySelector('[name="shipping_city"]').value.trim();
   const state=creatorForm.querySelector('[name="shipping_state"]').value.trim();
   const zip=creatorForm.querySelector('[name="shipping_zip"]').value.trim();
   creatorForm.querySelector('[name="shipping_address"]').value=[street,city,state,zip].join(', ');
   const ajaxUrl=creatorForm.action.replace('https://formsubmit.co/','https://formsubmit.co/ajax/');
   const response=await fetch(ajaxUrl,{method:'POST',body:new FormData(creatorForm),headers:{'Accept':'application/json'}});
   if(!response.ok)throw new Error('Submission failed');
   const result=await response.json().catch(()=>({}));
   if(result.success===false)throw new Error(result.message||'Submission failed');
   window.location.href='thank-you.html';
  }catch(error){
   if(formStatus)formStatus.textContent='Please complete the verification and try again.';
   submitButton.disabled=false;submitButton.textContent='Submit application';
  }
 });
}
render();update();
