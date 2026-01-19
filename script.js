const products = [
  { id:1, name:"kit de higiene bucal", price:7500, desc:"Conjunto completo para cuidados diários.", img:"imagens/kit_de_higiene_bucal.jpg" },
  { id:2, name:"escova electrica + fios dentais", price:10500, desc:"Escova elétrica com fios dentais incluídos.", img:"imagens/escova_eletrica.jpg" },
  { id:3, name:"raspadores de lingua premium", price:5500, desc:"Melhore o hálito com raspadores premium.", img:"imagens/Raspadores_De_Língua.jpg" },
  { id:4, name:"medidor de açucar no sangue", price:11500, desc:"Monitor portátil e preciso.", img:"imagens/acucar.jpg" },
  { id:5, name:"imagens/Espignomanometro digital", price:10500, desc:"Medidor de pressão digital fácil de usar.", img:"imagens/espi_dig.jpg" },
  { id:6, name:"Espignomanometro manual", price:10500, desc:"Modelo manual robusto e preciso.", img:"imagens/espi_man.jpg" },
  { id:7, name:"oximetro", price:6000, desc:"Oximetro de dedo, fácil leitura.", img:"imagens/oximetro.jpg" }
];

const carousel = document.getElementById('carousel');
const details = document.getElementById('details');
const detailsContent = document.getElementById('detailsContent');
const detailsPrice = document.getElementById('detailsPrice');
const buyBtn = document.getElementById('buyBtn');
const closeDetails = document.getElementById('closeDetails');

function formatKzs(v){ return new Intl.NumberFormat('pt-PT').format(v) + " kzs"; }

function createCard(p){
  const el = document.createElement('article');
  el.className = 'product';
  el.innerHTML = `
    <div class="thumb"><img src="${p.img}" alt="${p.name}"></div>
    <div class="info">
      <div class="row">
        <div>
          <div class="title">${p.name}</div>
          <div class="desc">${p.desc}</div>
        </div>
        <div style="text-align:right">
          <div class="price">${formatKzs(p.price)}</div>
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">
            <button class="action details-btn" data-id="${p.id}">Detalhes</button>
            <button class="action buy" data-id="${p.id}">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  return el;
}

function openDetails(product){
  detailsContent.innerHTML = `
    <div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap">
      <div style="flex:0 0 120px;border-radius:10px;overflow:hidden">
        <img src="${product.img}" alt="${product.name}" style="width:120px;height:120px;object-fit:cover;display:block;border-radius:8px">
      </div>
      <div style="flex:1;min-width:160px">
        <h3 style="margin:0 0 8px 0;color:var(--blue-700)">${product.name}</h3>
        <p style="margin:0 0 8px 0;color:#2e587f">${product.desc}</p>
        <ul style="margin:6px 0 0 18px;color:#2e587f">
          <li>Entrega: grátis</li>
          <li>Pagamento: MB WAY / Transferência / Cash</li>
        </ul>
      </div>
    </div>
  `;
  detailsPrice.textContent = formatKzs(product.price);
  buyBtn.dataset.id = product.id;
  details.classList.add('open');
  details.setAttribute('aria-hidden','false');
}

function closeModal(){
  details.classList.remove('open');
  details.setAttribute('aria-hidden','true');
}

function sendWhatsApp(product){
  const phone = '244975106869';
  const text = encodeURIComponent(`Olá! Quero comprar: ${product.name} - ${formatKzs(product.price)}. Como procedemos?`);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

/* render */
products.forEach(p => {
  const card = createCard(p);
  carousel.appendChild(card);
});

/* event delegation */
carousel.addEventListener('click', (e)=>{
  const det = e.target.closest('.details-btn');
  const buy = e.target.closest('.buy');
  if(det){
    const id = Number(det.dataset.id);
    openDetails(products.find(x=>x.id===id));
  } else if(buy){
    const id = Number(buy.dataset.id);
    sendWhatsApp(products.find(x=>x.id===id));
  }
});

closeDetails.addEventListener('click', closeModal);
details.addEventListener('click', (e)=>{
  if(e.target === details) closeModal();
});
buyBtn.addEventListener('click', ()=>{
  const id = Number(buyBtn.dataset.id);
  const product = products.find(x=>x.id===id);
  if(product) sendWhatsApp(product);
});

/* small UX: allow keyboard close */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});