// --- 1. LOCALIZATION & CONFIG ---
const ui = {
    en: { your_order: "Your Order", total: "Total", add: "Add", select: "Select Option", wa: "Order via WhatsApp", empty: "Cart is empty", start: "Start Ordering", customize: "Customize", clear: "Clear Cart", confirm_clear: "Are you sure you want to clear the cart?" },
    mm: { your_order: "မှာယူထားသော စာရင်း", total: "စုစုပေါင်း", add: "မှာယူမယ်", select: "ရွေးချယ်ပါ", wa: "WhatsApp ဖြင့်မှာယူမယ်", empty: "ဘာမှမရှိသေးပါ", start: "စတင်မှာယူမယ်", customize: "စိတ်ကြိုက်", clear: "ဖျက်မည်", confirm_clear: "အကုန်ဖျက်မှာ သေချာပါသလား?" },
    th: { your_order: "รายการที่สั่ง", total: "ยอดรวม", add: "เพิ่ม", select: "เลือกตัวเลือก", wa: "สั่งทาง WhatsApp", empty: "ตะกร้าว่างเปล่า", start: "ดูเมนู", customize: "ตัวเลือก", clear: "ล้างตะกร้า", confirm_clear: "คุณแน่ใจหรือไม่ว่าจะล้างตะกร้า?" },
    ru: { your_order: "Ваш заказ", total: "Итого", add: "Добавить", select: "Выбрать", wa: "Заказать в WhatsApp", empty: "Пусто", start: "Меню", customize: "Опции", clear: "Очистить", confirm_clear: "Вы уверены, что хотите очистить корзину?" },
    cn: { your_order: "您的订单", total: "总计", add: "添加", select: "选择", wa: "WhatsApp 下单", empty: "购物车为空", start: "点餐", customize: "选配", clear: "清空", confirm_clear: "您确定要清空购物车吗？" },
    fr: { your_order: "Votre commande", total: "Total", add: "Ajouter", select: "Choisir", wa: "Commander WhatsApp", empty: "Panier vide", start: "Menu", customize: "Options", clear: "Vider", confirm_clear: "Voulez-vous vider le panier ?" },
    hi: { your_order: "आपका ऑर्डर", total: "कुल", add: "जोड़ें", select: "विकल्प चुनें", wa: "WhatsApp से ऑर्डर करें", empty: "खाली है", start: "मेन्यू", customize: "बदलाव", clear: "साफ़ करें", confirm_clear: "क्या आप वाकई कार्ट साफ़ करना चाहते हैं?" },
    ar: { your_order: "طلبك", total: "المجموع", add: "أضف", select: "خيار", wa: "اطلب عبر واتساب", empty: "السلة فارغة", start: "ابدأ الطلب", customize: "تخصيص", clear: "مسح", confirm_clear: "هل أنت متأكد أنك تريد مسح السلة؟" },
    ko: { your_order: "주문 내역", total: "합계", add: "추가", select: "옵션 선택", wa: "WhatsApp 주문", empty: "장바구니가 비었습니다", start: "주문하기", customize: "설정", clear: "비우기", confirm_clear: "장바구니를 비우시겠습니까?" },
    ja: { your_order: "ご注文", total: "合計", add: "追加", select: "オプション", wa: "WhatsAppで注文", empty: "カートは空です", start: "注文する", customize: "カスタマイズ", clear: "クリア", confirm_clear: "カートを空にしますか？" },
    de: { your_order: "Ihre Bestellung", total: "Gesamt", add: "Hinzufügen", select: "Wählen", wa: "Per WhatsApp bestellen", empty: "Leer", start: "Bestellen", customize: "Anpassen", clear: "Leeren", confirm_clear: "Möchten Sie den Warenkorb wirklich leeren?" }
};

// Category Translations Fallback
const catTrans = {
    "All": { mm: "အားလုံး", th: "ทั้งหมด", ru: "Все", cn: "全部", fr: "Tout", hi: "सभी", ar: "الكل", ko: "전체", ja: "すべて", de: "Alle" },
    "Burmese Curry": { mm: "မြန်မာဟင်း", th: "แกงพม่า", ru: "Карри", cn: "咖喱", fr: "Curry", hi: "करी", ar: "كاري", ko: "카레", ja: "カレー", de: "Curry" },
    "BBQ": { mm: "အကင်", th: "บาร์บีคิว", ru: "Барбекю", cn: "烧烤", fr: "Barbecue", hi: "BBQ", ar: "مشويات", ko: "바비큐", ja: "BBQ", de: "Grill" },
    "Salads": { mm: "အသုပ်", th: "ยำ/สลัด", ru: "Салаты", cn: "沙拉", fr: "Salades", hi: "सलाद", ar: "سلطات", ko: "샐러드", ja: "サラダ", de: "Salate" },
    "Drinks": { mm: "အချိုရည်", th: "เครื่องดื่ม", ru: "Напитки", cn: "饮料", fr: "Boissons", hi: "पेय", ar: "مشروبات", ko: "음료", ja: "飲み物", de: "Getränke" }
};

let appState = { lang: 'en', menu: [], cart: {}, cat: 'All', modalItem: null, modalOpt: null };
const el = (id) => document.getElementById(id);
const nodes = { grid: el('menu-grid'), cats: el('category-container'), cartModal: el('cart-modal'), cartDrawer: el('cart-drawer'), cartList: el('cart-items'), badge: el('cart-count'), total: el('cart-total'), toast: el('toast-container'), optModal: el('option-modal'), langModal: el('lang-modal') };

document.addEventListener('DOMContentLoaded', () => {
    checkLanguage();
    loadCartFromStorage();
    fetchMenu();
});

// --- LOCAL STORAGE ---
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('dine_cart');
    if (savedCart) {
        try { appState.cart = JSON.parse(savedCart); updateCartUI(); } catch (e) { localStorage.removeItem('dine_cart'); }
    }
}
function saveCartToStorage() { localStorage.setItem('dine_cart', JSON.stringify(appState.cart)); }
function clearCart() {
    if (Object.keys(appState.cart).length === 0) return;
    if (confirm(t('confirm_clear'))) { appState.cart = {}; saveCartToStorage(); updateCartUI(); }
}

// --- LANGUAGE ---
function checkLanguage() {
    const saved = localStorage.getItem('dine_pref');
    if (saved && (Date.now() - JSON.parse(saved).ts < 86400000)) { setLang(JSON.parse(saved).lang, false); }
    else { nodes.langModal.classList.remove('hidden'); }
}
function setLang(lang, save = true) {
    appState.lang = lang;
    if (save) { localStorage.setItem('dine_pref', JSON.stringify({ lang, ts: Date.now() })); nodes.langModal.classList.add('hidden'); }
    updateUIText();
    if (appState.menuData) { renderCats(appState.menuData.categories); renderMenu(appState.cat); updateCartUI(); }
}
function t(key) { return ui[appState.lang][key] || ui['en'][key]; }
function getTxt(obj, prop) {
    if (!obj) return "";
    if (appState.lang === 'en') return obj[prop];
    return obj[`${prop}_${appState.lang}`] || obj[prop];
}
function getCatTxt(c) {
    if (appState.lang === 'en') return c;
    return (catTrans[c] && catTrans[c][appState.lang]) ? catTrans[c][appState.lang] : c;
}
function updateUIText() { document.querySelectorAll('[data-i18n]').forEach(e => e.innerText = t(e.dataset.i18n)); }

// --- DATA & RENDER ---
async function fetchMenu() {
    try {
        const res = await fetch('menu.json');
        appState.menuData = await res.json();
        appState.menu = appState.menuData.items;
        renderCats(appState.menuData.categories); renderMenu('All');
    } catch (e) { nodes.grid.innerHTML = `<div class="col-span-full text-center text-red-500">Error loading menu</div>`; }
}
function renderCats(cats) {
    nodes.cats.innerHTML = cats.map(c => `<button onclick="setCat('${c}')" class="px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap border transition-colors ${appState.cat === c ? 'bg-brand text-white border-brand' : 'bg-white text-gray-500 hover:bg-gray-50'}">${getCatTxt(c)}</button>`).join('');
}
function setCat(c) { appState.cat = c; renderCats(appState.menuData.categories); renderMenu(c); }
function renderMenu(cat) {
    nodes.grid.innerHTML = '';
    const items = cat === 'All' ? appState.menu : appState.menu.filter(i => i.category === cat);
    if (!items.length) { nodes.grid.innerHTML = `<div class="col-span-full text-center text-gray-400 py-10">No items</div>`; return; }

    items.forEach(item => {
        const hasOpt = item.options?.length > 0;
        const card = document.createElement('div');
        card.className = 'group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform flex flex-col h-full';
        card.onclick = () => hasOpt ? openOpt(item) : addToCart(item);

        card.innerHTML = `
            <div class="relative aspect-[4/3] overflow-hidden">
                <img src="${item.image}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                ${hasOpt ? `<div class="absolute bottom-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white uppercase font-bold">${t('customize')}</div>` : ''}
            </div>
            <div class="p-4 flex flex-col flex-1">
                <h3 class="font-burmese text-lg font-bold text-gray-800 leading-tight mb-1">${getTxt(item, 'name')}</h3>
                <p class="text-xs text-gray-500 line-clamp-2 mb-3 flex-1 font-burmese">${getTxt(item, 'description')}</p>
                <div class="flex justify-between items-center mt-auto">
                    <span class="text-lg font-bold text-gray-900">${item.price} ฿</span>
                    <button class="bg-brand text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg group-active:scale-90 transition-transform">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    </button>
                </div>
            </div>`;
        nodes.grid.appendChild(card);
    });
}

function openOpt(item) {
    appState.modalItem = item; appState.modalOpt = item.options[0];
    el('opt-modal-title').innerText = getTxt(item, 'name');
    el('opt-modal-price').innerText = item.price + " ฿";
    el('opt-modal-list').innerHTML = item.options.map((o, i) => `
        <button onclick="pickOpt(${i})" class="opt-btn px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${i === 0 ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600'}">
            <span class="font-burmese">${getTxt(o, 'name')}</span> ${o.price > 0 ? `(+${o.price})` : ''}
        </button>`).join('');
    nodes.optModal.classList.remove('hidden'); calcOptTotal();
}
function pickOpt(idx) {
    appState.modalOpt = appState.modalItem.options[idx];
    const btns = el('opt-modal-list').children;
    for (let i = 0; i < btns.length; i++) btns[i].className = `opt-btn px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${i === idx ? 'bg-brand text-white border-brand' : 'bg-white text-gray-600'}`;
    calcOptTotal();
}
function calcOptTotal() { el('opt-modal-total').innerText = appState.modalItem.price + appState.modalOpt.price; }
function closeOptionModal() { nodes.optModal.classList.add('hidden'); }
function confirmAddToCart() { addToCart(appState.modalItem, appState.modalOpt); closeOptionModal(); }

// --- CART ---
function addToCart(item, opt = null) {
    const finalPrice = item.price + (opt ? opt.price : 0);
    const key = opt ? `${item.id}-${opt.name}` : item.id;
    if (appState.cart[key]) appState.cart[key].q++; else appState.cart[key] = { i: item, o: opt, p: finalPrice, q: 1 };
    saveCartToStorage(); updateCartUI(); showToast(getTxt(item, 'name'), opt);
}
function modQ(key, n) {
    if (appState.cart[key]) { appState.cart[key].q += n; if (appState.cart[key].q <= 0) delete appState.cart[key]; }
    saveCartToStorage(); updateCartUI();
}
function updateCartUI() {
    const entries = Object.entries(appState.cart);
    const count = entries.reduce((s, [, v]) => s + v.q, 0);
    nodes.badge.innerText = count; nodes.badge.classList.toggle('hidden', count === 0);
    nodes.total.innerText = entries.reduce((s, [, v]) => s + (v.p * v.q), 0) + " ฿";

    if (!entries.length) { nodes.cartList.innerHTML = `<div class="flex flex-col items-center justify-center h-48 text-gray-400 text-sm"><p>${t('empty')}</p><button onclick="toggleCart()" class="mt-2 text-brand font-bold">${t('start')}</button></div>`; return; }

    nodes.cartList.innerHTML = entries.map(([k, v]) => `
        <div class="flex gap-3 bg-white p-3 rounded-xl border border-gray-100 items-center">
            <img src="${v.i.image}" class="w-14 h-14 rounded-lg bg-gray-100 object-cover">
            <div class="flex-1 min-w-0">
                <h4 class="font-burmese font-bold text-gray-800 text-sm truncate">${getTxt(v.i, 'name')}</h4>
                ${v.o ? `<p class="text-xs text-gray-500 font-burmese">${getTxt(v.o, 'name')}</p>` : ''}
                <p class="text-brand font-bold text-xs">${v.p * v.q} ฿</p>
            </div>
            <div class="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                <button onclick="modQ('${k}', -1)" class="w-7 h-7 flex items-center justify-center bg-white rounded shadow text-gray-600">-</button><span class="text-sm font-bold w-4 text-center">${v.q}</span><button onclick="modQ('${k}', 1)" class="w-7 h-7 flex items-center justify-center bg-white rounded shadow text-brand">+</button>
            </div>
        </div>`).join('');
}
function toggleCart() {
    if (nodes.cartModal.classList.contains('hidden')) {
        nodes.cartModal.classList.remove('hidden');
        setTimeout(() => { nodes.cartModal.firstElementChild.classList.remove('opacity-0'); nodes.cartDrawer.classList.remove('translate-y-full', 'md:translate-x-full'); }, 10);
    } else {
        nodes.cartModal.firstElementChild.classList.add('opacity-0'); nodes.cartDrawer.classList.add('translate-y-full', 'md:translate-x-full');
        setTimeout(() => nodes.cartModal.classList.add('hidden'), 300);
    }
}
function showToast(name, opt = null) {
    const d = document.createElement('div'); d.className = 'bg-gray-900/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-xl animate-slide-up font-burmese';
    const optText = opt ? ` (${getTxt(opt, 'name')})` : '';
    d.innerHTML = appState.lang === 'mm' ? `✅ <b>${name}${optText}</b> ${t('add')}` : `✅ ${t('add')} <b>${name}${optText}</b>`;
    nodes.toast.appendChild(d); setTimeout(() => d.remove(), 2000);
}

// --- CHECKOUT (UPDATED) ---
function checkout() {
    const entries = Object.entries(appState.cart);
    if (!entries.length) return alert(t('empty'));

    let msg = "";
    let tot = 0;
    const isMM = appState.lang === 'mm'; // Check if current language is Burmese

    // 1. Header
    if (isMM) {
        msg = "မင်္ဂလာပါ ဒိုင်းခင် 🙏 ဒါလေးတွေမှာချင်ပါတယ်:\n\n";
    } else {
        msg = "Hello Dine Khin 🙏 I would like to order:\n\n";
    }

    // 2. Items
    entries.forEach(([k, v], i) => {
        const sub = v.p * v.q;
        tot += sub;

        // If MM -> use MM Name (or fallback). If Other -> FORCE English.
        const itemName = isMM ? getTxt(v.i, 'name') : v.i.name;

        let optName = "";
        if (v.o) {
            // If MM -> use MM Option. If Other -> FORCE English Option.
            optName = isMM ? `(${getTxt(v.o, 'name')})` : `(${v.o.name})`;
        }

        msg += `*${i + 1}. ${itemName}* ${optName}\n   └ ${v.q} x ${v.p} = ${sub} ฿\n\n`;
    });

    // 3. Footer
    if (isMM) {
        msg += `----------------\n*စုစုပေါင်း: ${tot} THB*\n----------------`;
    } else {
        msg += `----------------\n*Total: ${tot} THB*\n----------------`;
    }

    window.open(`https://wa.me/66626410636?text=${encodeURIComponent(msg)}`, '_blank');
}