/**
 * Dine Khin Client Logic
 * Configurations are now loaded from config.js
 */

// --- STATE ---
let appState = {
    lang: 'en',
    menu: [],
    cart: {},
    cat: 'All',
    sortBy: 'rec',
    searchQuery: '',
    modalItem: null,
    modalOpt: null
};

// --- DOM HELPERS ---
const el = (id) => document.getElementById(id);
const nodes = {
    grid: el('menu-grid'), cats: el('category-container'), cartModal: el('cart-modal'), cartDrawer: el('cart-drawer'),
    cartList: el('cart-items'), total: el('cart-total'), toast: el('toast-container'), optModal: el('option-modal'),
    langModal: el('lang-modal'), langGrid: el('lang-grid'), cartBar: el('bottom-cart-bar'), cartTotalBar: el('cart-total-bar'),
    cartCountBar: el('cart-count-bar'), imgModal: el('image-modal'), imgModalSrc: el('image-modal-src'), searchInput: el('search-input'),
    sortModal: el('sort-modal')
};

// --- CORE ---
document.addEventListener('DOMContentLoaded', () => {
    initLangModal(); checkLanguage(); loadCart(); fetchMenu();
});

// --- LOADING SCREEN ---
function hideLoading() {
    const el = document.getElementById('loading-screen');
    if (el) {
        el.style.opacity = '0';
        setTimeout(() => el.remove(), 500);
    }
}

// --- DATA ---
async function fetchMenu() {
    try {
        // Use the API URL from the external config file
        const res = await fetch(config.menuApi);

        if (!res.ok) throw new Error("API Error");

        const data = await res.json();
        appState.menuData = data;
        appState.menu = data.items;
        renderCats(); renderMenu();

        // Hide Loader on Success
        hideLoading();
    } catch (e) {
        console.error("Menu Load Error:", e);
        nodes.grid.innerHTML = `<div class="col-span-full text-center py-20 flex flex-col items-center gap-2">
            <span class="text-4xl">⚠️</span>
            <p class="text-gray-400 font-bold">Failed to load menu</p>
            <button onclick="location.reload()" class="text-brand text-sm hover:underline">Tap to retry</button>
        </div>`;

        // Hide Loader even on fail, so user sees the error
        hideLoading();
    }
}

const t = (k) => (ui[appState.lang] || ui['en'])[k] || ui['en'][k];
const getTxt = (obj, prop) => {
    if (!obj) return "";
    const langVal = obj[`${prop}_${appState.lang}`];
    if (langVal && langVal.trim() !== "") return langVal;
    if (appState.lang === 'mm' && obj[`${prop}_mm`]) return obj[`${prop}_mm`];
    return obj[prop] || "";
};
const getCatTxt = (c) => {
    if (appState.lang === 'en') return c;
    return (catTrans[c] && catTrans[c][appState.lang]) ? catTrans[c][appState.lang] : c;
};
const getImg = (item) => {
    if (item.image && item.image.trim() !== "") {
        if (item.image.startsWith('http')) return item.image;
        return `${item.image}`;
    }
    return `${config.placeholderApi}${encodeURIComponent(item.name || 'Food')}`;
};

// --- UTILS ---

// Variable to store scroll position to prevent jumping
let scrollPosition = 0;

function toggleBodyLock(isLocked) {
    const body = document.body;

    if (isLocked) {
        // Store current scroll position
        scrollPosition = window.scrollY;

        // Add lock class (ensure you have the CSS below)
        body.classList.add('locked');

        // Mobile-specific fix: Fix body position to prevent background scroll
        body.style.position = 'fixed';
        body.style.top = `-${scrollPosition}px`;
        body.style.width = '100%';
        body.style.left = '0';
        body.style.right = '0';
    } else {
        // Remove lock class
        body.classList.remove('locked');

        // Restore body position
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        body.style.left = '';
        body.style.right = '';

        // Restore scroll position
        window.scrollTo(0, scrollPosition);
    }
}

// --- LANGUAGE ---
function initLangModal() {
    nodes.langGrid.innerHTML = languages.map(l =>
        `<button onclick="setLang('${l.code}')" class="p-4 border border-gray-100 rounded-2xl hover:bg-brand hover:text-white hover:border-brand hover:shadow-lg transition-all duration-200 flex flex-col items-center gap-2 group">
            <span class="text-3xl group-hover:scale-110 transition-transform">${l.flag}</span>
            <span class="font-bold text-sm ${l.font || ''}">${l.name}</span>
        </button>`
    ).join('');
}

function checkLanguage() {
    const saved = localStorage.getItem('dine_pref');
    if (saved) {
        const d = JSON.parse(saved);
        if (Date.now() - d.ts < 86400000) return setLang(d.lang, false);
    }
    nodes.langModal.classList.remove('hidden');
    toggleBodyLock(true);
}

function setLang(lang, save = true) {
    appState.lang = lang;
    if (save) {
        localStorage.setItem('dine_pref', JSON.stringify({ lang, ts: Date.now() }));
        nodes.langModal.classList.add('hidden');
        toggleBodyLock(false);
    }

    // Update Header Icon & Text Hint
    const langObj = languages.find(l => l.code === lang);
    const flagEl = document.getElementById('header-lang-flag');
    const textEl = document.getElementById('header-lang-text');

    if (langObj) {
        if (flagEl) flagEl.innerText = langObj.flag;
        if (textEl) textEl.innerText = langObj.code.toUpperCase();
    }

    document.querySelectorAll('[data-i18n]').forEach(e => e.innerText = t(e.dataset.i18n));
    if (appState.menu.length) { renderCats(); renderMenu(); updateCartUI(); }
}

// --- RENDERING ---
function renderCats() {
    const cats = appState.menuData.categories || [];
    nodes.cats.innerHTML = cats.map(c => {
        const isActive = appState.cat === c;
        return `<button onclick="setCat('${c}')" class="px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border transition-all active:scale-95 ${isActive ? 'bg-brand text-white border-brand shadow-lg shadow-brand/30 ring-2 ring-brand ring-offset-1' : 'bg-gray-100 text-gray-500 border-transparent hover:bg-white hover:border-gray-200'}">
            ${getCatTxt(c)}
        </button>`;
    }).join('');
}

function setCat(c) { appState.cat = c; renderCats(); renderMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function handleSearch() { appState.searchQuery = nodes.searchInput.value.toLowerCase(); renderMenu(); }

function toggleSort() {
    const isHidden = nodes.sortModal.classList.contains('hidden');
    nodes.sortModal.classList.toggle('hidden');
    toggleBodyLock(isHidden);

    // Update checkmarks
    ['rec', 'price_asc', 'price_desc'].forEach(id => {
        const el = document.getElementById(`check-${id}`);
        if (el) el.classList.toggle('hidden', id !== appState.sortBy);
    });
}

function applySort(type) {
    appState.sortBy = type;
    toggleSort();
    renderMenu();
}

function renderMenu() {
    nodes.grid.innerHTML = '';

    let items = appState.menu.filter(i => i.active !== false);

    // Filter
    if (appState.cat !== 'All') items = items.filter(i => i.category === appState.cat);
    if (appState.searchQuery) items = items.filter(i => {
        const n1 = (i.name || '').toLowerCase(), n2 = (i.name_mm || '').toLowerCase();
        return n1.includes(appState.searchQuery) || n2.includes(appState.searchQuery);
    });

    // Sort
    if (appState.sortBy === 'price_asc') items.sort((a, b) => a.price - b.price);
    else if (appState.sortBy === 'price_desc') items.sort((a, b) => b.price - a.price);
    else {
        items.sort((a, b) => {
            if (a.hot !== b.hot) return b.hot ? 1 : -1;
            if (a.new !== b.new) return b.new ? 1 : -1;
            if (a.special !== b.special) return b.special ? 1 : -1;
            return a.id - b.id;
        });
    }

    if (!items.length) {
        nodes.grid.innerHTML = `<div class="col-span-full text-center text-gray-400 py-20 flex flex-col items-center"><span class="text-5xl mb-3">🍽️</span><p>No items found</p></div>`;
        return;
    }

    items.forEach(item => {
        const hasOpt = item.options?.length > 0;
        const displayImg = getImg(item);

        let mainName = getTxt(item, 'name');
        let secName = "";
        if (appState.lang === 'mm') { mainName = item.name_mm || item.name; secName = item.name; }
        else if (appState.lang === 'en') { secName = item.name_mm; }
        else { secName = item.name; }

        let priceTxt = `${item.price} ฿`;
        if (hasOpt) {
            const prices = item.options.map(o => item.price + (o.price || 0));
            const min = Math.min(...prices), max = Math.max(...prices);
            priceTxt = min === max ? `${min} ฿` : `${min} - ${max} ฿`;
        }

        // Desc Logic
        const descText = getTxt(item, 'description');
        const isLong = descText.length > 60;
        const descHtml = isLong
            ? `<p id="desc-${item.id}" class="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed transition-all">${descText}</p>
               <button onclick="toggleDesc('${item.id}')" id="btn-desc-${item.id}" class="text-[10px] font-bold text-brand mt-1 hover:underline">${t('read_more')}</button>`
            : `<p class="text-xs text-gray-500 mt-2 leading-relaxed">${descText}</p>`;

        // Pills for Options (New Feature)
        let pillsHtml = '';
        if (hasOpt) {
            pillsHtml = `<div class="flex flex-wrap gap-1.5 mt-2.5">
                ${item.options.map(o => `<span class="inline-block bg-gray-50 border border-gray-300 text-gray-900 text-[10px] font-medium px-2 py-0.5 rounded-md font-burmese">${getTxt(o, 'name')}</span>`).join('')}
            </div>`;
        }

        let badgesHtml = '';
        if (item.hot) badgesHtml += `<span class="badge-hot text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse-soft">HOT</span>`;
        if (item.new) badgesHtml += `<span class="badge-new text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">NEW</span>`;
        if (item.special) badgesHtml += `<span class="badge-special text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">SPECIAL</span>`;
        if (item.veg) badgesHtml += `<span class="badge-veg text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg> VEGETARIAN</span>`;

        const card = document.createElement('div');
        card.className = 'bg-white rounded-[1.5rem] shadow-soft hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-50 flex flex-col';
        card.innerHTML = `
            <div class="relative aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer" onclick="openImageModal('${displayImg}')">
                <img src="${displayImg}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                <div class="absolute top-3 left-3 flex flex-wrap gap-2 z-10">${badgesHtml}</div>
                ${hasOpt ? `<div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1"><span>⚙️</span> ${t('customize')}</div>` : ''}
            </div>
            
            <div class="p-4 flex flex-col flex-1">
                <div class="flex-1 mb-3">
                    <h3 class="font-burmese text-lg font-bold text-gray-800 leading-tight mb-1">${mainName}</h3>
                    ${secName && secName !== mainName ? `<p class="text-sm text-gray-400 font-medium">${secName}</p>` : ''}
                    ${pillsHtml}
                    ${descHtml} 
                </div>
                
                <div class="flex justify-between items-center mt-auto pt-3 border-t border-gray-50">
                    <span class="text-2xl font-extrabold text-brand tracking-tight drop-shadow-sm">${priceTxt}</span>
                    <button onclick="${hasOpt ? `openOpt(${item.id})` : `addToCart(${item.id})`}" 
                        class="bg-brand hover:bg-brand-dark text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-brand/30 active:scale-90 transition-all">
                        +
                    </button>
                </div>
            </div>`;
        nodes.grid.appendChild(card);
    });
}

function toggleDesc(id) {
    const p = document.getElementById(`desc-${id}`);
    const btn = document.getElementById(`btn-desc-${id}`);
    if (p.classList.contains('line-clamp-2')) {
        p.classList.remove('line-clamp-2');
        btn.innerText = t('read_less');
    } else {
        p.classList.add('line-clamp-2');
        btn.innerText = t('read_more');
    }
}

// --- OPTION MODAL ---
function openOpt(id) {
    const item = appState.menu.find(i => i.id === id);
    if (!item) return;

    appState.modalItem = item;
    appState.modalOpt = item.options[0]; // Default to first option

    el('opt-modal-list').innerHTML = item.options.map((o, i) => {
        const optName = getTxt(o, 'name');
        return `
        <label class="flex items-center justify-between p-4 rounded-2xl border-2 border-transparent bg-gray-50 hover:bg-orange-50 has-[:checked]:border-brand has-[:checked]:bg-white has-[:checked]:shadow-md cursor-pointer transition-all duration-200 select-none group">
            <div class="flex items-center gap-4">
                <div class="w-5 h-5 rounded-full border-2 border-gray-300 group-has-[:checked]:border-brand flex items-center justify-center">
                    <div class="w-2.5 h-2.5 rounded-full bg-brand opacity-0 group-has-[:checked]:opacity-100 transition-opacity"></div>
                </div>
                <input type="radio" name="opt" class="hidden" ${i === 0 ? 'checked' : ''} onchange="pickOpt(${i})">
                <span class="font-burmese text-sm font-bold text-gray-700 group-has-[:checked]:text-gray-900">${optName}</span>
            </div>
            ${o.price > 0 ? `<span class="text-xs font-bold text-brand bg-brand/10 px-2 py-1 rounded-lg">+${o.price} ฿</span>` : ''}
        </label>`
    }).join('');

    updateModalUI(); // Initialize Title & Price
    nodes.optModal.classList.remove('hidden');
    toggleBodyLock(true);
}

function pickOpt(idx) {
    appState.modalOpt = appState.modalItem.options[idx];
    updateModalUI(); // Update Title & Price when selection changes
}

function updateModalUI() {
    // Dynamic Name: "Curry (Chicken)"
    const baseName = getTxt(appState.modalItem, 'name');
    const optName = getTxt(appState.modalOpt, 'name');
    el('opt-modal-title').innerText = `${baseName} (${optName})`;

    // Dynamic Price Calculation
    const total = appState.modalItem.price + (appState.modalOpt ? (appState.modalOpt.price || 0) : 0);
    const totalStr = `${total} ฿`;

    el('opt-modal-price').innerText = totalStr;
    el('opt-modal-total').innerText = totalStr;
}

function closeOptionModal() { nodes.optModal.classList.add('hidden'); toggleBodyLock(false); }
function confirmAddToCart() { addToCart(appState.modalItem, appState.modalOpt); closeOptionModal(); }

// --- CART ---
function loadCart() { const s = localStorage.getItem('dine_cart'); if (s) { try { appState.cart = JSON.parse(s); updateCartUI(); } catch (e) { localStorage.removeItem('dine_cart'); } } }
function saveCart() { localStorage.setItem('dine_cart', JSON.stringify(appState.cart)); }

function addToCart(itemOrId, opt = null) {
    let item = typeof itemOrId === 'object' ? itemOrId : appState.menu.find(i => i.id === parseInt(itemOrId));
    if (!item) return;

    const key = opt ? `${item.id}_${opt.name}` : `${item.id}`;
    const price = item.price + (opt ? (opt.price || 0) : 0);

    if (appState.cart[key]) appState.cart[key].q++;
    else appState.cart[key] = { i: item, o: opt, p: price, q: 1 };

    saveCart(); updateCartUI(); showToast(getTxt(item, 'name'), opt);
}

function modCart(key, delta) {
    if (appState.cart[key]) {
        appState.cart[key].q += delta;
        if (appState.cart[key].q <= 0) delete appState.cart[key];
        saveCart(); updateCartUI();
    }
}

function clearCart() { if (confirm(t('confirm_clear'))) { appState.cart = {}; saveCart(); updateCartUI(); } }

function updateCartUI() {
    const entries = Object.entries(appState.cart);
    const count = entries.reduce((s, [, v]) => s + v.q, 0);
    const total = entries.reduce((s, [, v]) => s + (v.p * v.q), 0);
    const totalStr = `${total} ฿`;

    nodes.total.innerText = totalStr; nodes.cartCountBar.innerText = count; nodes.cartTotalBar.innerText = totalStr;

    if (count > 0) nodes.cartBar.classList.replace('cart-hidden', 'cart-visible');
    else { nodes.cartBar.classList.replace('cart-visible', 'cart-hidden'); if (!nodes.cartModal.classList.contains('hidden')) toggleCart(); }

    if (count === 0) nodes.cartList.innerHTML = `<div class="flex flex-col items-center justify-center h-full text-gray-300 gap-2"><p>${t('empty')}</p></div>`;
    else {
        nodes.cartList.innerHTML = entries.map(([k, v]) => `
            <div class="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 items-center shadow-sm">
                <div class="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0"><img src="${getImg(v.i)}" class="w-full h-full object-cover"></div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-burmese font-bold text-gray-800 text-sm truncate leading-tight">${getTxt(v.i, 'name')}</h4>
                    ${v.o ? `<p class="text-xs text-gray-500 font-burmese mt-0.5">${getTxt(v.o, 'name')}</p>` : ''}
                    <p class="text-brand font-bold text-sm mt-1">${v.p * v.q} ฿</p>
                </div>
                <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-1.5 border border-gray-100">
                    <button onclick="modCart('${k}', -1)" class="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600 font-bold active:scale-90 transition-transform">-</button>
                    <span class="text-sm font-bold w-4 text-center">${v.q}</span>
                    <button onclick="modCart('${k}', 1)" class="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-sm text-brand font-bold active:scale-90 transition-transform">+</button>
                </div>
            </div>`).join('');
    }
}

function toggleCart() {
    const m = nodes.cartModal, d = nodes.cartDrawer;
    if (m.classList.contains('hidden')) {
        m.classList.remove('hidden'); toggleBodyLock(true);
        requestAnimationFrame(() => { m.firstElementChild.classList.remove('opacity-0'); d.classList.remove('translate-y-full', 'md:translate-x-full'); });
    } else {
        toggleBodyLock(false); m.firstElementChild.classList.add('opacity-0'); d.classList.add('translate-y-full', 'md:translate-x-full');
        setTimeout(() => m.classList.add('hidden'), 300);
    }
}

function checkout() {
    const e = Object.entries(appState.cart);
    if (!e.length) return alert(t('empty'));
    let tVal = 0; const isMM = appState.lang === 'mm';
    let msg = isMM ? "မင်္ဂလာပါ Dine Khin 🙏 ဒါလေးတွေမှာချင်ပါတယ်\n\n" : "Hello Dine Khin 🙏 I would like to order:\n\n";
    e.forEach(([k, v], i) => {
        const sub = v.p * v.q; tVal += sub;
        const name = isMM ? (v.i.name_mm || v.i.name) : v.i.name;
        const opt = v.o ? ` (${isMM ? (v.o.name_mm || v.o.name) : v.o.name})` : '';
        msg += `*${i + 1}. ${name}*${opt}\n   └ ${v.q} x ${v.p} = ${sub} ฿\n`;
    });
    msg += `\n----------------\n*${t('total')}: ${tVal} THB*\n----------------`;
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}

function showToast(name, opt) {
    const d = document.createElement('div');
    d.className = 'bg-gray-800/90 backdrop-blur text-white px-5 py-3 rounded-full text-sm font-medium shadow-2xl animate-slide-up font-burmese flex items-center gap-3 z-[70] border border-gray-700';
    const txt = opt ? `${name} (${getTxt(opt, 'name')})` : name;
    d.innerHTML = `<span class="bg-green-500 rounded-full p-1"><svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></span> <span>Added <b>${txt}</b></span>`;
    nodes.toast.appendChild(d);
    setTimeout(() => { d.style.opacity = '0'; d.style.transform = 'translateY(-10px)'; setTimeout(() => d.remove(), 300); }, 2000);
}

function openImageModal(src) {
    if (!src) return;
    nodes.imgModalSrc.src = src;
    nodes.imgModal.classList.remove('hidden');

    // Lock scroll
    toggleBodyLock(true);

    requestAnimationFrame(() => {
        nodes.imgModal.classList.remove('opacity-0');
        nodes.imgModalSrc.classList.replace('scale-95', 'scale-100');
    });
}

function closeImageModal() {
    nodes.imgModal.classList.add('opacity-0');
    nodes.imgModalSrc.classList.replace('scale-100', 'scale-95');

    // Unlock scroll
    toggleBodyLock(false);

    setTimeout(() => {
        nodes.imgModal.classList.add('hidden');
        nodes.imgModalSrc.src = '';
    }, 300);
}