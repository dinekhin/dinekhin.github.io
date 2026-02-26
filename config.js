/**
 * Dine Khin Configuration & Data
 * This file should be hosted on the PHP server (oceanviewtreasure.com) 
 * so it can be updated without redeploying the static site.
 */

// --- CONFIG ---
const config = {
    whatsappNumber: "66949198983",
    placeholderApi: "https://placehold.co/400x400/ff7200/ffffff/?text=",
    // API URL to fetch the menu data
    menuApi: "menu.json"
    // Telegram Proxy (credentials stored server-side in tg.php)
    // tgProxyUrl: "https://oceanviewtreasure.com/api/tg.php",
    // tgSecret: "dk_notify_2026"
};

// --- TRANSLATIONS ---
const ui = {
    en: { your_order: "Your Order", total: "Total", add: "Add to Order", select: "Select Option", wa: "Order via WhatsApp", empty: "Your cart is empty", customize: "Customize", clear: "Clear", confirm_clear: "Clear entire cart?", read_more: "Read More", read_less: "Less" },
    mm: { your_order: "မှာယူထားသောစာရင်း", total: "စုစုပေါင်း", add: "မှာမည်", select: "ရွေးချယ်ပါ", wa: "WhatsApp ဖြင့်မှာယူမယ်", empty: "ဘာမှမရှိသေးပါ", customize: "စိတ်ကြိုက်", clear: "ဖျက်မည်", confirm_clear: "အကုန်ဖျက်မည်လား?", read_more: "ပိုဖတ်ရန်", read_less: "ပြန်ပိတ်" },
    th: { your_order: "รายการที่สั่ง", total: "ยอดรวม", add: "เพิ่มลงตะกร้า", select: "เลือกตัวเลือก", wa: "สั่งทาง WhatsApp", empty: "ตะกร้าว่างเปล่า", customize: "ตัวเลือก", clear: "ล้าง", confirm_clear: "ล้างตะกร้า?", read_more: "อ่านเพิ่มเติม", read_less: "น้อยลง" },
    ru: { your_order: "Ваш заказ", total: "Итого", add: "Добавить", select: "Выбрать", wa: "Заказать", empty: "Пусто", customize: "Опции", clear: "Очистить", confirm_clear: "Очистить?", read_more: "Читать далее", read_less: "Скрыть" },
    cn: { your_order: "您的订单", total: "总计", add: "添加", select: "选择", wa: "下单", empty: "购物车为空", customize: "选配", clear: "清空", confirm_clear: "清空?", read_more: "阅读更多", read_less: "收起" },
    ja: { your_order: "ご注文内容", total: "合計", add: "追加", select: "選択", wa: "WhatsAppで注文", empty: "カートは空です", customize: "カスタマイズ", clear: "クリア", confirm_clear: "カートを空にしますか？", read_more: "もっと見る", read_less: "閉じる" },
    ko: { your_order: "주문 내역", total: "합계", add: "추가", select: "선택", wa: "WhatsApp 주문", empty: "장바구니가 비었습니다", customize: "옵션", clear: "비우기", confirm_clear: "전체 삭제하시겠습니까?", read_more: "더 보기", read_less: "접기" },
    fr: { your_order: "Votre commande", total: "Total", add: "Ajouter", select: "Choisir", wa: "Commander (WhatsApp)", empty: "Votre panier est vide", customize: "Personnaliser", clear: "Vider", confirm_clear: "Vider le panier ?", read_more: "Lire la suite", read_less: "Réduire" },
    de: { your_order: "Ihre Bestellung", total: "Gesamt", add: "Hinzufügen", select: "Auswählen", wa: "Über WhatsApp bestellen", empty: "Warenkorb ist leer", customize: "Anpassen", clear: "Leeren", confirm_clear: "Warenkorb leeren?", read_more: "Mehr lesen", read_less: "Weniger" },
    hi: { your_order: "आपका ऑर्डर", total: "कुल", add: "जोड़ें", select: "चुनें", wa: "WhatsApp से ऑर्डर करें", empty: "कार्ट खाली है", customize: "कस्टमाइज़", clear: "साफ़ करें", confirm_clear: "कार्ट साफ़ करें?", read_more: "और पढ़ें", read_less: "कम करें" },
    ar: { your_order: "طلبك", total: "المجموع", add: "إضافة", select: "اختر", wa: "اطلب عبر واتساب", empty: "السلة فارغة", customize: "تخصيص", clear: "مسح", confirm_clear: "مسح السلة؟", read_more: "اقرأ المزيد", read_less: "إخفاء" }
};

const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'mm', flag: '🇲🇲', name: 'မြန်မာစာ', font: 'font-burmese' },
    { code: 'th', flag: '🇹🇭', name: 'ไทย' },
    { code: 'cn', flag: '🇨🇳', name: '中文' },
    { code: 'ru', flag: '🇷🇺', name: 'Русский' },
    { code: 'ja', flag: '🇯🇵', name: '日本語' },
    { code: 'ko', flag: '🇰🇷', name: '한국어' },
    { code: 'fr', flag: '🇫🇷', name: 'Français' },
    { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
    { code: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
    { code: 'ar', flag: '🇸🇦', name: 'العربية' }
];

const catTrans = {
    "All": { mm: "အားလုံး", th: "ทั้งหมด", cn: "全部", ru: "Все", ja: "すべて", ko: "전체", fr: "Tout", de: "Alle", hi: "सभी", ar: "الكل" },
    "Burmese Curry": { mm: "မြန်မာထမင်းဟင်း", th: "แกงพม่า", cn: "缅甸咖喱", ru: "Бирманское карри", ja: "ビルマカレー", ko: "미얀마 커리", fr: "Curry birman", de: "Burmesisches Curry", hi: "बर्मी करी", ar: "كاري بورمي" },
    "BBQ": { mm: "အကင်", th: "บาร์บีคิว", cn: "烧烤", ru: "Барбекю", ja: "バーベキュー", ko: "바베큐", fr: "Barbecue", de: "Grillen", hi: "बारबेक्यू", ar: "مشاوي" },
    "Salads": { mm: "အသုပ်", th: "ยำ/สลัด", cn: "沙拉", ru: "Салаты", ja: "サラダ", ko: "샐러드", fr: "Salades", de: "Salate", hi: "सलाद", ar: "سلطات" },
    "Drinks": { mm: "အချိုရည်", th: "เครื่องดื่ม", cn: "饮料", ru: "Напитки", ja: "ドリンク", ko: "음료", fr: "Boissons", de: "Getränke", hi: "पेय", ar: "مشروبات" },
    "Noodle Soup": { mm: "ခေါက်ဆွဲပြုတ်", th: "ก๋วยเตี๋ยว", cn: "汤面", ru: "Суп с лапшой", ja: "麺類 (汁あり)", ko: "국수", fr: "Soupe de nouilles", de: "Nudelsuppe", hi: "नूडल सूप", ar: "حساء المعكرونة" },
    "Fried Rice": { mm: "ထမင်းကြော်", th: "ข้าวผัด", cn: "炒饭", ru: "Жареный рис", ja: "チャーハン", ko: "볶음밥", fr: "Riz frit", de: "Gebratener Reis", hi: "फ्राइड राइस", ar: "أرز مقلي" },
    "Fried Noodle": { mm: "ခေါက်ဆွဲကြော်", th: "ผัดซีอิ๊ว/บะหมี่ผัด", cn: "炒面", ru: "Жареная лапша", ja: "焼きそば", ko: "볶음면", fr: "Nouilles sautées", de: "Gebratene Nudeln", hi: "फ्राइड नूडल्स", ar: "نودلز مقلية" },
    "Rice Salad": { mm: "ထမင်းသုပ်", th: "ข้าวยำ", cn: "拌饭", ru: "Рисовый салат", ja: "ライスサラダ", ko: "비빔밥/쌀 샐러드", fr: "Salade de riz", de: "Reissalat", hi: "चावल का सलाद", ar: "سلطة أرز" },
    "Rice": { mm: "ထမင်း", th: "เมนูข้าว", cn: "米饭", ru: "Рис", ja: "ご飯", ko: "밥", fr: "Riz", de: "Reis", hi: "चावल", ar: "أرز" },
    "Mala": { mm: "မာလာ", th: "หม่าล่า", cn: "麻辣", ru: "Мала (Острое)", ja: "マーラー", ko: "마라", fr: "Mala", de: "Mala", hi: "माला", ar: "مالا" },
    "Appetizer": { mm: "အဆာပြေ", th: "อาหารว่าง", cn: "开胃菜", ru: "Закуски", ja: "前菜", ko: "에피타이저", fr: "Entrées", de: "Vorspeisen", hi: "नाश्ता", ar: "مقبلات" },
    "Steamed Rice": { mm: "ထမင်းပေါင်း", th: "ข้าวสวย", cn: "蒸饭", ru: "Отварной рис", ja: "白ご飯", ko: "공기밥", fr: "Riz vapeur", de: "Gedämpfter Reis", hi: "उबले चावल", ar: "أرز مطهو على البخار" },
    "Vegetables": { mm: "အသီးအရွက်", th: "ผัก", cn: "蔬菜", ru: "Овощи", ja: "野菜", ko: "야채", fr: "Légumes", de: "Gemüse", hi: "सब्जियाँ", ar: "خضروات" },
    "Pounding": {
        "mm": "အထောင်း", "th": "ตำ", "cn": "舂菜", "ru": "Толчёные",
        "ja": "たたき", "ko": "찧기", "fr": "Pilé", "de": "Gestampftes",
        "hi": "कुटा हुआ", "ar": "مدقوق"
    }
};
