// --- 1. LOCALIZATION & CONFIG ---
const ui = {
    en: { your_order: "Your Order", total: "Total", add: "Add", select: "Select Option", wa: "Order via WhatsApp", empty: "Cart is empty", start: "Start Ordering", customize: "Customize", clear: "Clear", confirm_clear: "Are you sure you want to clear the cart?" },
    mm: { your_order: "မှာယူထားသောစာရင်း", total: "စုစုပေါင်း", add: "မှာမည်", select: "ရွေးချယ်ပါ", wa: "WhatsApp ဖြင့်မှာယူမယ်", empty: "ဘာမှမရှိသေးပါ", start: "စတင်မှာယူမယ်", customize: "စိတ်ကြိုက်", clear: "ဖျက်မည်", confirm_clear: "အကုန်ဖျက်မှာ သေချာပါသလား?" }, 
    th: { your_order: "รายการที่สั่ง", total: "ยอดรวม", add: "เพิ่ม", select: "เลือกตัวเลือก", wa: "สั่งทาง WhatsApp", empty: "ตะกร้าว่างเปล่า", start: "ดูเมนู", customize: "ตัวเลือก", clear: "ล้าง", confirm_clear: "ล้างตะกร้า?" },
    ru: { your_order: "Ваш заказ", total: "Итого", add: "Добавить", select: "Выбрать", wa: "Заказать", empty: "Пусто", start: "Меню", customize: "Опции", clear: "Очистить", confirm_clear: "Очистить?" },
    cn: { your_order: "您的订单", total: "总计", add: "添加", select: "选择", wa: "下单", empty: "空", start: "点餐", customize: "选配", clear: "清空", confirm_clear: "清空?" },
    fr: { your_order: "Votre commande", total: "Total", add: "Ajouter", select: "Choisir", wa: "Commander WhatsApp", empty: "Panier vide", start: "Menu", customize: "Options", clear: "Vider", confirm_clear: "Voulez-vous vider le panier ?" },
    hi: { your_order: "आपका ऑर्डर", total: "कुल", add: "जोड़ें", select: "विकल्प चुनें", wa: "WhatsApp से ऑर्डर करें", empty: "खाली है", start: "मेन्यू", customize: "बदलाव", clear: "साफ़ करें", confirm_clear: "क्या आप वाकई कार्ट साफ़ करना चाहते हैं?" },
    ar: { your_order: "طلبك", total: "المجموع", add: "أضف", select: "خيار", wa: "اطلب عبر واتساب", empty: "السلة فارغة", start: "ابدأ الطلب", customize: "تخصيص", clear: "مسح", confirm_clear: "هل أنت متأكد أنك تريد مسح السلة؟" },
    ko: { your_order: "주문 내역", total: "합계", add: "추가", select: "옵션 선택", wa: "WhatsApp 주문", empty: "장바구니가 비었습니다", start: "주문하기", customize: "설정", clear: "비우기", confirm_clear: "장바구니를 비우시겠습니까?" },
    ja: { your_order: "ご注文", total: "合計", add: "追加", select: "オプション", wa: "WhatsAppで注文", empty: "カートは空です", start: "注文する", customize: "カスタマイズ", clear: "クリア", confirm_clear: "カートを空にしますか？" },
    de: { your_order: "Ihre Bestellung", total: "Gesamt", add: "Hinzufügen", select: "Wählen", wa: "Per WhatsApp bestellen", empty: "Leer", start: "Bestellen", customize: "Anpassen", clear: "Leeren", confirm_clear: "Möchten Sie den Warenkorb wirklich leeren?" }
};

const catTrans = {
    "All": { mm: "အားလုံး", th: "ทั้งหมด", ru: "Все", cn: "全部", fr: "Tout", hi: "सभी", ar: "الكل", ko: "전체", ja: "すべて", de: "Alle" },
    "Burmese Curry": { mm: "မြန်မာထမင်းဟင်း", th: "แกงพม่า", ru: "Бирманское карри", cn: "缅甸咖喱", fr: "Curry birman", hi: "बर्मी करी", ar: "كاري بورمي", ko: "미얀마 카레", ja: "ビルマカレー", de: "Burmesisches Curry" },
    "BBQ": { mm: "အကင်", th: "บาร์บีคิว", ru: "Барбекю", cn: "烧烤", fr: "Barbecue", hi: "BBQ", ar: "مشويات", ko: "바비큐", ja: "BBQ", de: "Grill" },
    "Salads": { mm: "အသုပ်", th: "ยำ/สลัด", ru: "Салаты", cn: "沙拉", fr: "Salades", hi: "सलाद", ar: "سلطات", ko: "샐러드", ja: "サラダ", de: "Salate" },
    "Drinks": { mm: "အချိုရည်", th: "เครื่องดื่ม", ru: "Напитки", cn: "饮料", fr: "Boissons", hi: "पेय", ar: "مشروبات", ko: "음료", ja: "飲み物", de: "Getränke" },
    "Noodle Soup": { mm: "ခေါက်ဆွဲပြုတ်", th: "ก๋วยเตี๋ยว", ru: "Суп с лапшой", cn: "汤面", fr: "Soupe de nouilles", hi: "नूडल सूप", ar: "حساء المعكرونة", ko: "국수", ja: "ヌードルスープ", de: "Nudelsuppe" },
    "Fried Rice": { mm: "ထမင်းကြော်", th: "ข้าวผัด", ru: "Жареный рис", cn: "炒饭", fr: "Riz frit", hi: "फ्राइड राइस", ar: "أرز مقلي", ko: "볶음밥", ja: "チャーハン", de: "Gebratener Reis" },
    "Fried Noodle": { mm: "ခေါက်ဆွဲကြော်", th: "ผัดหมี่", ru: "Жареная лапша", cn: "炒面", fr: "Nouilles frites", hi: "फ्राइड नूडल्स", ar: "نودلز مقلية", ko: "볶음면", ja: "焼きそば", de: "Gebratene Nudeln" },
    "Rice Salad": { mm: "ထမင်းသုပ်", th: "ข้าวยำ", ru: "Рисовый салат", cn: "拌饭", fr: "Salade de riz", hi: "राइस सलाद", ar: "سلطة أرز", ko: "쌀 샐러드", ja: "ライスサラダ", de: "Reissalat" },
    "Rice": { mm: "ထမင်း", th: "เมนูข้าว", ru: "Рис", cn: "米饭", fr: "Riz", hi: "चावल", ar: "أرز", ko: "밥", ja: "ご飯", de: "Reis" },
    "Mala": { mm: "မာလာ", th: "หม่าล่า", ru: "Мала", cn: "麻辣", fr: "Mala", hi: "माला", ar: "مالا", ko: "마라", ja: "マーラー", de: "Mala" },
    "Appetizer": { mm: "အဆာပြေစာ", th: "ของทานเล่น", ru: "Закуски", cn: "开胃菜", fr: "Entrée", hi: "ऐपेटाइज़र", ar: "مقبلات", ko: "에피타이저", ja: "前菜", de: "Vorspeise" },
    "Steamed Rice": { mm: "ထမင်းဖြူ", th: "ข้าวสวย", ru: "Вареный рис", cn: "白饭", fr: "Riz vapeur", hi: "उबले चावल", ar: "أرز على البخار", ko: "공깃밥", ja: "白ご飯", de: "Gedämpfter Reis" },
    "Vegetables": { mm: "အသီးအရွက်", th: "ผัก", ru: "Овощи", cn: "蔬菜", fr: "Légumes", hi: "सब्जियां", ar: "خضروات", ko: "야채", ja: "野菜", de: "Gemüse" }
};

let appState = { lang: 'en', menu: [], cart: {}, cat: 'All', modalItem: null, modalOpt: null };
const el = (id) => document.getElementById(id);
const nodes = { 
    grid: el('menu-grid'), cats: el('category-container'), 
    cartModal: el('cart-modal'), cartDrawer: el('cart-drawer'),
    cartList: el('cart-items'), total: el('cart-total'),
    toast: el('toast-container'), optModal: el('option-modal'), 
    langModal: el('lang-modal'),
    cartBar: el('bottom-cart-bar'), cartTotalBar: el('cart-total-bar'), cartCountBar: el('cart-count-bar'),
    imgModal: el('image-modal'), imgModalSrc: el('image-modal-src')
};

document.addEventListener('DOMContentLoaded', () => { 
    checkLanguage(); 
    loadCartFromStorage();
    fetchMenu(); 
});

// --- HELPER: GET IMAGE OR PLACEHOLDER ---
function getImg(item) {
    if (item.image && item.image.trim() !== "") return item.image;
    // Auto-generate placeholder using current language name
    const txt = getTxt(item, 'name'); 
    return `https://placehold.co/300x300/FF7200/FFFFFF?text=${encodeURIComponent(txt)}`;
}

// Newer version to handle relative paths
// function getImg(item) {
//     if (item.image && item.image.trim() !== "") {
//         // If it's a full URL (like placehold.co), use it
//         if (item.image.startsWith('http')) return item.image;
        
//         // If it's just a filename (e.g. "curry.jpg"), assume it's in the GitHub img folder
//         // Since app.js is on GitHub, relative path 'img/' works fine.
//         return `img/${item.image}`;
//     }
//     // Placeholder fallback
//     const txt = getTxt(item, 'name'); 
//     return `https://placehold.co/300x300/FF7200/FFFFFF?text=${encodeURIComponent(txt)}`;
// }

// --- LOCAL STORAGE ---
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('dine_cart');
    if (savedCart) {
        try { appState.cart = JSON.parse(savedCart); updateCartUI(); } catch (e) { localStorage.removeItem('dine_cart'); }
    }
}
function saveCartToStorage() { localStorage.setItem('dine_cart', JSON.stringify(appState.cart)); }
function clearCart() {
    if(Object.keys(appState.cart).length === 0) return;
    if(confirm(t('confirm_clear'))) { appState.cart = {}; saveCartToStorage(); updateCartUI(); }
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
    // Re-render everything to update text AND placeholder images
    if(appState.menuData) { renderCats(appState.menuData.categories); renderMenu(appState.cat); updateCartUI(); }
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
        // const res = await fetch('menu.json');
        const res = await fetch('https://oceanviewtreasure.com/api/menu.json');
        appState.menuData = await res.json();
        appState.menu = appState.menuData.items;
        renderCats(appState.menuData.categories); renderMenu('All');
    } catch(e) { nodes.grid.innerHTML = `<div class="col-span-full text-center text-red-500">Error loading menu</div>`; }
}
function renderCats(cats) {
    nodes.cats.innerHTML = cats.map(c => `<button onclick="setCat('${c}')" class="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-colors ${appState.cat === c ? 'bg-brand text-white border-brand shadow-md' : 'bg-gray-50 text-gray-500 border-gray-100'}">${getCatTxt(c)}</button>`).join('');
}
function setCat(c) { appState.cat = c; renderCats(appState.menuData.categories); renderMenu(c); }

function renderMenu(cat) {
    nodes.grid.innerHTML = '';
    const items = cat === 'All' ? appState.menu : appState.menu.filter(i => i.category === cat);
    if(!items.length) { nodes.grid.innerHTML = `<div class="text-center text-gray-400 py-20">No items found</div>`; return; }

    items.forEach(item => {
        const hasOpt = item.options?.length > 0;
        const descText = getTxt(item, 'description');
        const isLong = descText.length > 60; 
        const displayImg = getImg(item); // Uses Helper
        
        const card = document.createElement('div');
        card.className = 'bg-white p-3 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex gap-4 transition-all';
        
        card.innerHTML = `
            <div class="w-28 h-28 shrink-0 relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer" onclick="openImageModal('${displayImg}')">
                <img src="${displayImg}" loading="lazy" class="w-full h-full object-cover">
                ${hasOpt ? `<div class="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[9px] font-bold text-center py-1 backdrop-blur-sm uppercase tracking-wide">${t('customize')}</div>` : ''}
            </div>
            
            <div class="flex-1 flex flex-col min-w-0">
                <div class="flex-1">
                    <h3 class="font-burmese text-base font-bold text-gray-800 leading-tight mb-1">${getTxt(item, 'name')}</h3>
                    <div class="text-xs text-gray-500 font-burmese leading-relaxed">
                        <p id="desc-${item.id}" class="line-clamp-2 transition-all duration-300">${descText}</p>
                        ${isLong ? `<span id="btn-read-${item.id}" onclick="toggleDesc(${item.id})" class="read-more-btn" style="font-size:0.7rem;color:#ff7200;font-weight:600;cursor:pointer;margin-top:2px;display:inline-block">Read more...</span>` : ''}
                    </div>
                </div>
                <div class="flex justify-between items-end mt-2">
                    <span class="text-base font-bold text-brand">${item.price} ฿</span>
                    <button onclick="${hasOpt ? `openOpt(${item.id})` : `addToCart(${item.id})`}" 
                        class="bg-gray-100 active:bg-brand active:text-white text-brand w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-sm transition-colors">+</button>
                </div>
            </div>`;
        nodes.grid.appendChild(card);
    });
}

// --- HELPER FOR DESC ---
function toggleDesc(id) {
    const p = document.getElementById(`desc-${id}`);
    const btn = document.getElementById(`btn-read-${id}`);
    if (p.classList.contains('line-clamp-2')) { p.classList.remove('line-clamp-2'); btn.style.display = 'none'; }
}

// --- OPTION MODAL ---
function openOpt(id) {
    const item = appState.menu.find(i => i.id === id);
    appState.modalItem = item; appState.modalOpt = item.options[0];
    
    el('opt-modal-title').innerText = getTxt(item, 'name');
    el('opt-modal-price').innerText = item.price + " ฿";
    el('opt-modal-list').innerHTML = item.options.map((o, i) => `
        <label class="flex items-center justify-between p-3 rounded-xl border border-gray-100 has-[:checked]:border-brand has-[:checked]:bg-orange-50 cursor-pointer transition-colors">
            <div class="flex items-center gap-3">
                <input type="radio" name="opt" class="w-4 h-4 accent-brand" ${i===0?'checked':''} onchange="pickOpt(${i})">
                <span class="font-burmese text-sm font-medium text-gray-700">${getTxt(o, 'name')}</span>
            </div>
            ${o.price > 0 ? `<span class="text-xs font-bold text-brand">+${o.price}</span>` : ''}
        </label>`).join('');
    
    document.body.classList.add('overflow-hidden');
    nodes.optModal.classList.remove('hidden'); calcOptTotal();
}
function pickOpt(idx) { appState.modalOpt = appState.modalItem.options[idx]; calcOptTotal(); }
function calcOptTotal() { el('opt-modal-total').innerText = appState.modalItem.price + appState.modalOpt.price; }
function closeOptionModal() { document.body.classList.remove('overflow-hidden'); nodes.optModal.classList.add('hidden'); }
function confirmAddToCart() { addToCart(appState.modalItem, appState.modalOpt); closeOptionModal(); }

// --- IMAGE MODAL ---
function openImageModal(src) {
    if (!src) return;
    nodes.imgModalSrc.src = src;
    nodes.imgModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    requestAnimationFrame(() => { nodes.imgModal.classList.remove('opacity-0'); nodes.imgModalSrc.classList.remove('scale-95'); nodes.imgModalSrc.classList.add('scale-100'); });
}
function closeImageModal() {
    nodes.imgModal.classList.add('opacity-0'); nodes.imgModalSrc.classList.remove('scale-100'); nodes.imgModalSrc.classList.add('scale-95');
    setTimeout(() => { nodes.imgModal.classList.add('hidden'); document.body.classList.remove('overflow-hidden'); nodes.imgModalSrc.src = ''; }, 300);
}

// --- CART ---
function addToCart(itemOrId, opt = null) {
    let item = itemOrId;
    if (typeof itemOrId === 'number' || typeof itemOrId === 'string') { item = appState.menu.find(i => i.id === parseInt(itemOrId)); }
    const finalPrice = item.price + (opt ? opt.price : 0);
    const key = opt ? `${item.id}-${opt.name}` : item.id;
    if(appState.cart[key]) appState.cart[key].q++; else appState.cart[key] = { i: item, o: opt, p: finalPrice, q: 1 };
    saveCartToStorage(); updateCartUI(); showToast(getTxt(item, 'name'), opt);
}
function modQ(key, n) {
    if(appState.cart[key]) { appState.cart[key].q += n; if(appState.cart[key].q <= 0) delete appState.cart[key]; }
    saveCartToStorage(); updateCartUI();
}
function updateCartUI() {
    const entries = Object.entries(appState.cart);
    const count = entries.reduce((s, [,v]) => s + v.q, 0);
    const totalAmount = entries.reduce((s, [,v]) => s + (v.p * v.q), 0);
    nodes.total.innerText = totalAmount + " ฿";
    
    if(!entries.length) { nodes.cartList.innerHTML = `<div class="flex flex-col items-center justify-center h-64 text-gray-300 text-sm gap-2"><p>${t('empty')}</p></div>`; } 
    else {
        nodes.cartList.innerHTML = entries.map(([k, v]) => `
            <div class="flex gap-3 bg-white p-3 rounded-xl border border-gray-100 items-center shadow-sm">
                <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0"><img src="${getImg(v.i)}" class="w-full h-full object-cover"></div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-burmese font-bold text-gray-800 text-sm truncate">${getTxt(v.i, 'name')}</h4>
                    ${v.o ? `<p class="text-xs text-gray-500 font-burmese">${getTxt(v.o, 'name')}</p>` : ''}
                    <p class="text-brand font-bold text-xs">${v.p * v.q} ฿</p>
                </div>
                <div class="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                    <button onclick="modQ('${k}', -1)" class="w-6 h-6 flex items-center justify-center bg-white rounded shadow text-gray-600 font-bold">-</button>
                    <span class="text-sm font-bold w-4 text-center">${v.q}</span>
                    <button onclick="modQ('${k}', 1)" class="w-6 h-6 flex items-center justify-center bg-white rounded shadow text-brand font-bold">+</button>
                </div>
            </div>`).join('');
    }

    if(count > 0) {
        nodes.cartBar.classList.remove('cart-hidden'); nodes.cartBar.classList.add('cart-visible');
        nodes.cartCountBar.innerText = count; nodes.cartTotalBar.innerText = totalAmount + " ฿";
    } else {
        nodes.cartBar.classList.remove('cart-visible'); nodes.cartBar.classList.add('cart-hidden');
        if(!nodes.cartModal.classList.contains('hidden')) toggleCart();
    }
}

function toggleCart() {
    if(nodes.cartModal.classList.contains('hidden')) {
        nodes.cartModal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        setTimeout(() => { nodes.cartModal.firstElementChild.classList.remove('opacity-0'); nodes.cartDrawer.classList.remove('translate-y-full', 'md:translate-x-full'); }, 10);
    } else {
        document.body.classList.remove('overflow-hidden');
        nodes.cartModal.firstElementChild.classList.add('opacity-0'); nodes.cartDrawer.classList.add('translate-y-full', 'md:translate-x-full');
        setTimeout(() => nodes.cartModal.classList.add('hidden'), 300);
    }
}

function showToast(name, opt = null) {
    const d = document.createElement('div'); d.className = 'bg-gray-800 text-white px-4 py-3 rounded-full text-sm font-medium shadow-xl animate-slide-up font-burmese flex items-center gap-2 z-[70]';
    const optText = opt ? ` (${getTxt(opt, 'name')})` : '';
    d.innerHTML = appState.lang === 'mm' ? `<svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> <b>${name}${optText}</b> ${t('add')}` : `<svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg> ${t('add')} <b>${name}${optText}</b>`;
    nodes.toast.appendChild(d); setTimeout(() => d.remove(), 2000);
}

function checkout() {
    const entries = Object.entries(appState.cart);
    if(!entries.length) return alert(t('empty'));
    let msg = "", tot = 0, isMM = appState.lang === 'mm';
    msg = isMM ? "မင်္ဂလာပါ Dine Khin 🙏 ဒါလေးတွေမှာချင်ပါတယ်\n\n" : "Hello Dine Khin 🙏 I would like to order:\n\n";
    entries.forEach(([k, v], i) => {
        const sub = v.p * v.q; tot += sub;
        const itemName = isMM ? getTxt(v.i, 'name') : v.i.name;
        const optName = v.o ? (isMM ? `(${getTxt(v.o, 'name')})` : `(${v.o.name})`) : '';
        msg += `*${i+1}. ${itemName}* ${optName}\n   └ ${v.q} x ${v.p} = ${sub} ฿\n\n`;
    });
    msg += isMM ? `----------------\n*စုစုပေါင်း: ${tot} THB*\n----------------` : `----------------\n*Total: ${tot} THB*\n----------------`;
    window.open(`https://wa.me/66626410636?text=${encodeURIComponent(msg)}`, '_blank');
}