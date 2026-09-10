const $=s=>document.querySelector(s),fmt=n=>n.toLocaleString('en-US'),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const weapons=VAULT.items.filter(x=>VAULT.categories.includes(x.category));
const accessories=VAULT.items.filter(x=>!VAULT.categories.includes(x.category));
const standalone=weapons.filter(x=>!x.bundle),individualTotal=standalone.reduce((a,x)=>a+(x.price||0),0),bundleTotal=VAULT.bundles.reduce((a,b)=>a+b.price,0),adjusted=individualTotal+bundleTotal;
const catalog=VAULT.items.filter(x=>!x.extra).reduce((a,x)=>a+(x.price||0),0);
$('#skin-count').textContent=weapons.length;
$('#catalog-value').textContent=fmt(catalog);

$('#rank-image').src='assets/immortal.png';$('#rank-image').hidden=false;
let category='All';
function render(){
 $('#categories').innerHTML=['All',...VAULT.categories].map(c=>`<button aria-pressed="${category===c}" data-category="${c}">${c}<span>${c==='All'?weapons.length:weapons.filter(x=>x.category===c).length}</span></button>`).join('');
 const shown=weapons.filter(x=>category==='All'||x.category===category);
 $('#results-count').textContent=`${String(shown.length).padStart(2,'0')} ${category==='All'?'weapon skins':category==='Melee'?'melee skins':category+' skins'}`;
 $('#skin-grid').innerHTML=shown.map(x=>`<button class="skin-card ${x.limited?'limited':''}" data-id="${esc(x.id)}" aria-label="Inspect ${esc(x.name)}"><div class="card-top"><span>${x.limited?'LIMITED COLLECTION':esc(x.tier.toUpperCase())}</span><span>${esc(x.category.toUpperCase())}</span></div><img src="${x.image}" alt="${esc(x.name)}" loading="lazy" width="500" height="200"><div class="card-bottom"><div><h3>${esc(x.name)}</h3><p>${x.bundle?esc(x.bundle)+' · included':'Individual purchase'}</p></div><span class="card-price">${x.price?fmt(x.price)+' <small>VP</small>':'Capsule only'}</span></div></button>`).join('');
}
$('#categories').addEventListener('click',e=>{const b=e.target.closest('button');if(b){category=b.dataset.category;render();$('#categories').querySelector(`[data-category="${category}"]`).focus({preventScroll:true});}});
$('#skin-grid').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(!b)return;const x=weapons.find(x=>x.id===b.dataset.id);$('#detail-content').innerHTML=`<p class="eyebrow">${esc(x.category)} / ${esc(x.tier)}</p><img src="${x.image}" alt="${esc(x.name)}"><h2 id="detail-title">${esc(x.name)}</h2><p class="detail-price">${x.price?fmt(x.price)+' VP':'2,340 VP · capsule'}</p><p>${x.price?'Standalone catalog price.':'No separate skin price; sold only in the 2024 PRX capsule.'} ${x.bundle?'Included in '+esc(x.bundle)+'. Part of the full collection purchase.':'Counted once as an individual skin.'}</p><a href="${x.priceSource}" target="_blank" rel="noopener">View collection & price source ↗</a>`;$('#skin-dialog').setAttribute('aria-labelledby','detail-title');$('#skin-dialog').showModal();});
$('.close').addEventListener('click',()=>$('#skin-dialog').close());$('#skin-dialog').addEventListener('click',e=>{if(e.target===$('#skin-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
const accessoryGroups=[['Buddy','Gun buddies'],['Player card','Player cards'],['Spray','Sprays'],['Flex','Flex'],['Player title','Player titles']];
$('#accessory-grid').className='accessory-sections';
$('#accessory-grid').innerHTML=accessoryGroups.map(([category,title])=>{const items=accessories.filter(x=>x.category===category);return `<section class="accessory-group"><h3 class="group-heading">${title}<span>${items.length}</span></h3><div class="accessory-grid ${category==='Player card'?'player-cards':''}">${items.map(x=>`<article class="accessory-card">${x.image?`<img src="${x.image}" alt="${esc(x.name)}" loading="lazy" width="200" height="${category==='Player card'?'450':'140'}">`:'<div class="title-art">CHAMPION</div>'}<h3>${esc(x.name)}</h3><p>${esc(x.groupLabel||x.bundle||'Collection item').replace(' (inferred)','')}${x.quantity?' · '+x.quantity+' copies':''}</p></article>`).join('')}</div></section>`;}).join('');
$('#bundle-ledger').innerHTML=VAULT.bundles.map(b=>`<div class="ledger-row"><span><a href="${b.source}" target="_blank" rel="noopener">${esc(b.name)}</a></span><b>${fmt(b.price)} VP</b></div>`).join('');
render();
