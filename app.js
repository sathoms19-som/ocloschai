const PIN = "1234"; // à changer si besoin
const WHATSAPP_NUMBER = "33600000000"; // numéro de ton père, format international sans +

const products = [
  // VINS — saisie libre car la carte change selon ardoise/étagères
  {id:"wine_glass", name:"Verre de vin — saisie libre", cat:"Vins", price:0, custom:true, type:"wine", unit:"verre"},
  {id:"wine_bottle", name:"Bouteille de vin — saisie libre", cat:"Vins", price:0, custom:true, type:"wine", unit:"bouteille"},

  // APÉRITIFS
  {id:1, name:"Spritz Aperol", cat:"Apéritifs", price:9},
  {id:2, name:"Spritz Saint-Germain", cat:"Apéritifs", price:10},
  {id:3, name:"Bière Ratz Blonde / Blanche / Ambrée / Triple 33cl", cat:"Apéritifs", price:6},
  {id:4, name:"Fénelon 8cl", cat:"Apéritifs", price:6.5},
  {id:5, name:"Kir Côtes du Lot cassis 12cl", cat:"Apéritifs", price:6.5},
  {id:6, name:"Ricard 2cl", cat:"Apéritifs", price:4.5},

  // JUS, SODAS, EAUX, CHAUD
  {id:7, name:"Jus 25cl", cat:"Softs", price:4},
  {id:8, name:"Soda 33cl", cat:"Softs", price:4},
  {id:9, name:"Abatilles Plate ou Pétillante 50cl", cat:"Eaux", price:3},
  {id:10, name:"Abatilles Plate ou Pétillante 1L", cat:"Eaux", price:5},
  {id:11, name:"Expresso / Décaféiné", cat:"Boissons chaudes", price:2},
  {id:12, name:"Double Expresso", cat:"Boissons chaudes", price:4},
  {id:13, name:"Café viennois", cat:"Boissons chaudes", price:3.5},
  {id:14, name:"Café au lait", cat:"Boissons chaudes", price:3},
  {id:15, name:"Thé", cat:"Boissons chaudes", price:3},

  // TAPAS
  {id:16, name:"Foie Gras de Canard entier 130g et ses toasts", cat:"Tapas", price:32},
  {id:17, name:"Tapenade d’olives noires", cat:"Tapas", price:8},
  {id:18, name:"Pimientos à la plancha", cat:"Tapas", price:8},
  {id:19, name:"Rillettes pur canard", cat:"Tapas", price:8.5},
  {id:20, name:"Foie de canard & Magret de canard", cat:"Tapas", price:9},
  {id:21, name:"Cœurs de canard 150g", cat:"Tapas", price:9},
  {id:22, name:"Chiffonade de tête de moine", cat:"Tapas", price:9},

  // SALADES
  {id:23, name:"Salade Gourmande Quercynoise avec tranche de foie gras", cat:"Salades", price:24},
  {id:24, name:"Salade Quercynoise avec gésier de canard", cat:"Salades", price:16.5},
  {id:25, name:"Chèvre chaud Rocamadour sur toast et magret séché", cat:"Salades", price:15.5},
  {id:26, name:"Salade de crudités", cat:"Salades", price:13.5},
  {id:27, name:"Tomates mozzarella Buffala AOP, parmesan, jambon de pays, basilic", cat:"Salades", price:18.5},

  // PLATS CHAUDS
  {id:28, name:"Onglet de bœuf 200g à la plancha", cat:"Plats chauds", price:25},
  {id:29, name:"Magret de canard entier à la plancha", cat:"Plats chauds", price:28.5},
  {id:30, name:"Souris d’agneau, écrasé de pommes de terre", cat:"Plats chauds", price:27.5},
  {id:31, name:"Risotto gambas parmesan", cat:"Plats chauds", price:18},
  {id:32, name:"Tataki de thon, tian de légumes, huile de sésame", cat:"Plats chauds", price:25},
  {id:33, name:"Paleron de bœuf confit, carottes vichy, écrasé de pommes de terre", cat:"Plats chauds", price:24},
  {id:34, name:"Cassoulet au confit de canard Maison Valette et saucisse de Toulouse", cat:"Plats chauds", price:23.5},
  {id:35, name:"Côte de Bœuf 1,2kg +/- avec gratin dauphinois", cat:"Sur commande", price:82},

  // PLANCHES
  {id:36, name:"Tartine chaude tomates, pesto basilic, morbier, jambon de pays", cat:"Planches", price:9.5},
  {id:37, name:"Grande planche Fromage", cat:"Planches", price:26},
  {id:38, name:"Grande planche Charcuterie", cat:"Planches", price:26},
  {id:39, name:"Petite planche Fromage", cat:"Planches", price:14},
  {id:40, name:"Petite planche Charcuterie", cat:"Planches", price:14},
  {id:41, name:"Grande planche Mixte", cat:"Planches", price:27.5},
  {id:42, name:"Petite planche Mixte", cat:"Planches", price:18},
  {id:43, name:"Planche Gourmande Canard", cat:"Planches", price:42.5},

  // DESSERTS / GLACES
  {id:44, name:"Gâteau aux noix", cat:"Desserts", price:7},
  {id:45, name:"Crème brûlée maison", cat:"Desserts", price:8.5},
  {id:46, name:"Mousse au chocolat maison", cat:"Desserts", price:7},
  {id:47, name:"Moelleux au chocolat noir", cat:"Desserts", price:7},
  {id:48, name:"Glace 1 boule", cat:"Glaces", price:3.5},
  {id:49, name:"Glace 2 boules", cat:"Glaces", price:6},
  {id:50, name:"Glace 3 boules", cat:"Glaces", price:8},
  {id:51, name:"Supplément Chantilly", cat:"Glaces", price:1}
];

let state = JSON.parse(localStorage.getItem("closChaiOrderState") || "null") || {
  screen:"login", code:"", seller:"", table:"", category:"Toutes", cart:[], comment:"", orders:[], search:""
};
const save = () => localStorage.setItem("closChaiOrderState", JSON.stringify(state));
const euro = n => new Intl.NumberFormat("fr-FR", {style:"currency", currency:"EUR"}).format(Number(n)||0);
const cats = ["Toutes", "Vins", "Apéritifs", "Tapas", "Planches", "Plats chauds", "Salades", "Desserts", "Glaces", "Softs", "Eaux", "Boissons chaudes", "Sur commande"];
const total = () => state.cart.reduce((s,p)=>s + (Number(p.price)||0) * (Number(p.qty)||1), 0);
const esc = s => String(s ?? "").replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));

function h(html){ document.querySelector("#app").innerHTML = html; save(); }
function header(extra="") { return `<div class="header"><div class="logo"><div class="mark">O</div><div>O Clos Chai<br><span class="muted">Service</span></div></div>${extra}</div>`; }

function login(){
  h(`${header()}<section class="card hero"><div class="title">Prise de commande</div><p class="subtitle">Application interne — bar à vins & restaurant.</p><div class="code">${state.code.padEnd(4,"•")}</div><div class="keypad">${[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(k=>`<button class="key" onclick="tapKey('${k}')">${k}</button>`).join("")}</div></section>`);
}
function tapKey(k){
  if(k==="⌫") state.code = state.code.slice(0,-1); else if(k!=="" && state.code.length<4) state.code += k;
  if(state.code === PIN){ state.screen="setup"; state.code=""; }
  state.screen==="login" ? login() : render();
}
function setup(){
  h(`${header(`<button class="pill" onclick="logout()">Déconnexion</button>`)}<section class="card"><div class="title">Nouvelle commande</div><p class="subtitle">Indique le serveur et la table avant de commencer.</p><label>Serveur</label><input class="field" placeholder="Ex : Sarah" value="${esc(state.seller)}" oninput="state.seller=this.value;save()"><label>Table / client</label><input class="field" placeholder="Ex : Table 4 / Terrasse / Bar" value="${esc(state.table)}" oninput="state.table=this.value;save()"><button class="btn primary" style="width:100%" onclick="state.screen='catalog';render()">Démarrer la commande</button></section><button class="btn ghost" style="width:100%" onclick="state.screen='boss';render()">Vue patron / caisse</button>`);
}
function catalog(){
  const q=(state.search||"").toLowerCase();
  const list = products.filter(p=>(state.category==="Toutes" || p.cat===state.category) && p.name.toLowerCase().includes(q));
  h(`${header(`<button class="pill" onclick="state.screen='setup';render()">${esc(state.table)||"Table —"}</button>`)}<input class="field" placeholder="⌕ Rechercher un produit" value="${esc(state.search)}" oninput="state.search=this.value;render()"><div class="tabs">${cats.map(c=>`<button class="tab ${state.category===c?'active':''}" onclick="state.category='${c}';state.search='';render()">${c}</button>`).join("")}</div><section id="products">${productList(list)}</section>${cartButton()}`);
}
function productList(list){ return list.map(p=>`<div class="product ${p.custom?'wine-card':''}" onclick="${p.custom?`openCustomWine('${p.id}')`:`addProduct('${p.id}')`}"><div><strong>${esc(p.name)}</strong><small>${esc(p.cat)}${p.custom?' · nom + prix libres':''}</small></div><div class="price">${p.custom?'Saisir':euro(p.price)}</div></div>`).join("") || `<div class="empty">Aucun produit</div>`; }
function openCustomWine(id){
  const p = products.find(x=>String(x.id)===String(id));
  state.screen="customWine"; state.customWine={baseId:id, unit:p.unit, name:"", price:"", qty:1}; render();
}
function customWine(){
  const cw = state.customWine || {unit:"vin", name:"", price:"", qty:1};
  h(`${header(`<button class="pill" onclick="state.screen='catalog';render()">Retour</button>`)}<section class="card"><div class="title">Ajouter un ${cw.unit}</div><p class="subtitle">Pour les vins non référencés : le serveur écrit le nom exact et le prix.</p><label>Nom du vin</label><input class="field" placeholder="Ex : Château du Cèdre, Cahors" value="${esc(cw.name)}" oninput="state.customWine.name=this.value;save()"><label>Prix</label><input class="field" type="number" inputmode="decimal" placeholder="Ex : 42" value="${esc(cw.price)}" oninput="state.customWine.price=this.value;save()"><label>Quantité</label><div class="qty wide"><button class="round" onclick="state.customWine.qty=Math.max(1,(state.customWine.qty||1)-1);render()">−</button><strong>${cw.qty||1}</strong><button class="round" onclick="state.customWine.qty=(state.customWine.qty||1)+1;render()">+</button></div><button class="btn primary" style="width:100%;margin-top:16px" onclick="addCustomWine()">Ajouter au panier</button></section>`);
}
function addCustomWine(){
  const cw=state.customWine; const price=parseFloat(String(cw.price).replace(",","."));
  if(!cw.name || isNaN(price)) { alert("Ajoute le nom du vin et son prix."); return; }
  state.cart.push({lineId:Date.now()+Math.random(), id:cw.baseId, name:`${cw.unit==='verre'?'Verre':'Bouteille'} — ${cw.name}`, cat:"Vins", price, qty:cw.qty||1, custom:true});
  state.customWine=null; state.screen="catalog"; render();
}
function addProduct(id){
  const p=products.find(x=>String(x.id)===String(id));
  const existing=state.cart.find(x=>String(x.id)===String(id) && !x.custom);
  if(existing) existing.qty += 1; else state.cart.push({lineId:Date.now()+Math.random(), id:p.id, name:p.name, cat:p.cat, price:p.price, qty:1});
  render();
}
function cartButton(){ return `<div class="cartbar"><div class="cartbar-inner"><button class="btn ghost" style="flex:1" onclick="state.screen='boss';render()">Commandes</button><button class="btn primary" style="flex:2" onclick="state.screen='cart';render()">Panier · ${state.cart.reduce((s,p)=>s+p.qty,0)} · ${euro(total())}</button></div></div>`; }
function cart(){
  h(`${header(`<button class="pill" onclick="state.screen='catalog';render()">Catalogue</button>`)}<section class="card"><div class="title">Panier</div>${state.cart.length?state.cart.map(p=>`<div class="cart-item"><div><strong>${esc(p.name)}</strong><div class="muted">${euro(p.price)} · ${esc(p.cat)}</div></div><div class="qty"><button class="round" onclick="changeQty('${p.lineId}',-1)">−</button><strong>${p.qty}</strong><button class="round" onclick="changeQty('${p.lineId}',1)">+</button></div></div>`).join(""):`<div class="empty">Panier vide</div>`}<textarea class="field" placeholder="Commentaire cuisine/bar/caisse" oninput="state.comment=this.value;save()">${esc(state.comment)}</textarea><div class="total"><span>Total</span><span>${euro(total())}</span></div><button class="btn primary" style="width:100%;margin-top:16px" onclick="sendOrder()">Envoyer la commande</button><button class="btn danger" style="width:100%;margin-top:10px" onclick="clearCart()">Vider</button></section>`);
}
function changeQty(lineId,d){ const p=state.cart.find(x=>String(x.lineId)===String(lineId)); if(!p) return; p.qty+=d; if(p.qty<=0) state.cart=state.cart.filter(x=>String(x.lineId)!==String(lineId)); render(); }
function clearCart(){ state.cart=[]; state.comment=""; render(); }
function sendOrder(){
  if(!state.cart.length) return;
  const order = {id:Date.now(), time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}), seller:state.seller, table:state.table, lines:[...state.cart], comment:state.comment, total:total(), status:"À encaisser"};
  state.orders.unshift(order);
  const msg = `Nouvelle commande%0A${order.time} — ${encodeURIComponent(order.table || "Sans table")}%0AVendeur: ${encodeURIComponent(order.seller || "—")}%0A%0A${order.lines.map(p=>`${p.qty} x ${encodeURIComponent(p.name)} — ${euro(p.price*p.qty)}`).join('%0A')}%0A%0ATotal: ${euro(order.total)}%0ACommentaire: ${encodeURIComponent(order.comment || "—")}`;
  state.cart=[]; state.comment=""; state.screen="boss"; save();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  render();
}
function boss(){
  h(`${header(`<button class="pill" onclick="state.screen='catalog';render()">Nouvelle</button>`)}<section class="card"><div class="title">Commandes</div><p class="subtitle">Vue patron / caisse.</p>${state.orders.length?state.orders.map(o=>`<div class="order"><div class="row"><strong>${esc(o.table)||"Sans table"} · ${euro(o.total)}</strong><span class="muted">${o.time}</span></div><div class="muted">${esc(o.seller)||"—"} · ${o.status}</div><br>${o.lines.map(p=>`<div class="row"><span>${p.qty} × ${esc(p.name)}</span><span>${euro(p.qty*p.price)}</span></div>`).join("")}${o.comment?`<p class="muted">Note : ${esc(o.comment)}</p>`:""}<div class="grid2" style="margin-top:12px"><button class="btn primary" onclick="mark(${o.id},'Encaissé')">Encaissé</button><button class="btn ghost" onclick="mark(${o.id},'Annulé')">Annuler</button></div></div>`).join(""):`<div class="empty">Aucune commande</div>`}</section>`);
}
function mark(id,status){ const o=state.orders.find(o=>o.id===id); if(o) o.status=status; render(); }
function logout(){ state.screen="login"; state.code=""; render(); }
function render(){ ({login,setup,catalog,cart,boss,customWine}[state.screen] || login)(); }
render();
