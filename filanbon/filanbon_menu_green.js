
// ======== إعدادات التواصل — عدّل هذه القيم بمعلوماتك ========
// WhatsApp: رقم الجوال مع رمز الدولة بدون + أو مسافات أو أصفار في البداية
// مثال إماراتي: 971501234567  |  مثال سعودي: 966501234567
let CONFIG = {
  whatsappNumber: '971563193339',
  whatsappMessage: 'مرحبًا Filanbon Cafe! أرغب بالسؤال عن طلب.',
  phoneNumber: '+971563193339',       // رقم الاتصال المباشر (زر "اتصل بنا")
  mapsUrl: 'https://maps.google.com/?q=Filanbon+Cafe+Abu+Dhabi', // رابط الاتجاهات
  instagramUrl: 'https://www.instagram.com/filanbon_cafe',
  tiktokUrl: 'https://www.tiktok.com/@filanbon_cafe',
  openHour: 6,   // 6 = الساعة 6:00 صباحًا
  closeHour: 23, // 23 = الساعة 11:00 مساءً
};
// ================================================================

let IMAGES = {};
let MENU = [];
const DEFAULT_IMAGES = JSON.parse(document.getElementById('images-data').textContent);
const DEFAULT_MENU = JSON.parse(document.getElementById('menu-data').textContent);

function applyHeaderImages(){
  document.querySelectorAll('[data-img]').forEach(img => { img.src = IMAGES[img.dataset.img] || ''; });
}

// wire up social links from CONFIG
function applyConfig(){
  const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
  document.querySelectorAll('a[data-social="whatsapp"]').forEach(a => a.href = waLink);
  document.querySelectorAll('a[data-social="instagram"]').forEach(a => a.href = CONFIG.instagramUrl);
  document.querySelectorAll('a[data-social="tiktok"]').forEach(a => a.href = CONFIG.tiktokUrl);
  const callLink = document.getElementById('callLink');
  if (callLink) callLink.href = 'tel:' + CONFIG.phoneNumber;
  const dirLink = document.getElementById('directionsLink');
  if (dirLink) dirLink.href = CONFIG.mapsUrl;
  // العنوان مرتبط بالفرع النشط، يتجاوز نص الترجمة الثابت
  const addrText = (LANG === 'en' && CONFIG.addressEn) ? CONFIG.addressEn : (CONFIG.address || (typeof t === 'function' ? t('heroAddress') : ''));
  document.querySelectorAll('[data-i18n="heroAddress"]').forEach(el => { el.textContent = addrText; });
}

// Instant press-feedback for links (iOS Safari doesn't reliably fire
// CSS :active on <a> tags unless a touch listener is attached).
(function instantPressFeedback(){
  const selector = '.whatsapp-fab, #callLink, #directionsLink, .social-icon, .icon-btn, #hoursToggle';
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('touchstart', () => el.classList.add('pressed'), {passive:true});
    el.addEventListener('touchend', () => el.classList.remove('pressed'), {passive:true});
    el.addEventListener('touchcancel', () => el.classList.remove('pressed'), {passive:true});
    el.addEventListener('mousedown', () => el.classList.add('pressed'));
    el.addEventListener('mouseup', () => el.classList.remove('pressed'));
    el.addEventListener('mouseleave', () => el.classList.remove('pressed'));
  });
})();

const tabsEl = document.getElementById('tabs');
const mainEl = document.getElementById('main');

const currencySVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="7" y1="12" x2="17" y2="12"/></svg>`;
const sealSVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`;

// ---------------- i18n ----------------
const TR = {
  ar: {
    viewCart:"عرض السلة", yourCart:"سلة الطلب", continueCheckout:"متابعة الطلب",
    checkout:"إتمام الطلب", nameLabel:"الاسم", namePlaceholder:"اكتب اسمك",
    phoneLabel:"رقم الجوال", plateLabel:"رقم المركبة", platePlaceholder:"مثال: ABC 1234", orderTypeLabel:"طريقة الاستلام", pickup:"استلام من الفرع",
    tableDelivery:"توصيل للطاولة", tableNumLabel:"رقم الطاولة", tableNumPlaceholder:"مثال: 12",
    paymentLabel:"طريقة الدفع", cashMethod:"الدفع نقدًا عند الاستلام", cashSub:"ادفع كاش عند استلام الطلب",
    cardMethod:"Visa / Mastercard", cardSub:"دفع إلكتروني آمن",
    confirmPay:"تأكيد الطلب والدفع", confirmPayCash:"تأكيد الطلب (دفع نقدًا)",
    notesLabel:"ملاحظة",
    demoNotice:"✅ عند تأكيد الطلب سيُرسل تفصيل طلبك مباشرة إلى واتساب المقهى ليستلمه الموظف فورًا. ⚠️ ملاحظة: خانات الدفع هنا (بطاقة / Apple Pay) لا تخصم مبلغًا فعليًا حاليًا — الدفع الفعلي الإلكتروني يحتاج ربط بوابة دفع (مثل Moyasar أو Tap) لاحقًا.",
    orderReceived:"تم استلام طلبك!", thankYouMsg:"شكرًا لطلبك من Filanbon Cafe، سيتم تجهيزه الآن.",
    done:"تم", footerText:"صُمم هذا القائمة لتُفتح مباشرة عند مسح رمز",
    subtotal:"المجموع الفرعي", total:"الإجمالي", cartEmpty:"سلتك فارغة حتى الآن — أضف بعض المشروبات اللذيذة 🌿",
    addBtn:"أضف", itemsCount:"عدد الأصناف", totalDue:"الإجمالي المستحق",
    alertNamePhone:"من فضلك أدخل الاسم ورقم الجوال لإتمام الطلب", alertTable:"من فضلك أدخل رقم الطاولة",
    confirming:"جاري تأكيد الطلب...", typeTextPickup:"استلام من الفرع",
    typeTextTable:"توصيل للطاولة رقم", payTextCash:"الدفع نقدًا عند الاستلام", payTextOnline:"الدفع الإلكتروني",
    heroDesc:"فيلانبون كافيه هي علامة قهوة مختصة تقدم مشروبات وحلويات مصنوعة بعناية وجودة عالية، من مشروبات الإسبريسو الاحترافية إلى الموهيتو المنعش، كل صنف في قائمتنا مُعد بعناية ليرضي محبي القهوة وغيرهم.",
    heroAddress:"أبوظبي، الإمارات العربية المتحدة", openNow:"مفتوح الآن", getDirections:"الاتجاهات", callUs:"اتصل بنا",
    followUs:"تابعنا", terms:"الشروط والأحكام",
    beanTypeLabel:"نوع الحبوب", arabica:"أرابيكا", robusta:"روبستا",
    flavorLabel:"النكهة",
    comingSoon:"السعر قريبًا",
    tempLabel:"درجة الحرارة", iced:"مثلج", hot:"ساخن",
    sugarLabel:"مستوى السكر", noSugar:"بدون", lessSugar:"قليل", normalSugar:"عادي", extraSugar:"زيادة",
    qtyLabel:"الكمية", addToCartBtn:"أضف إلى السلة", addToCart:"أضف للسلة",
    applePaySub:"دفع سريع وآمن", confirmPayApple:"تأكيد الطلب عبر Apple Pay",
    hoursTitle:"أوقات الدوام", openNow:"مفتوح الآن", closedNow:"مغلق الآن",
    day0:"الأحد", day1:"الاثنين", day2:"الثلاثاء", day3:"الأربعاء", day4:"الخميس", day5:"الجمعة", day6:"السبت",
  },
  en: {
    viewCart:"View Cart", yourCart:"Your Cart", continueCheckout:"Continue to Checkout",
    checkout:"Checkout", nameLabel:"Name", namePlaceholder:"Enter your name",
    phoneLabel:"Phone Number", plateLabel:"Vehicle Plate Number", platePlaceholder:"e.g. ABC 1234", orderTypeLabel:"Order Type", pickup:"Pickup",
    tableDelivery:"Table Delivery", tableNumLabel:"Table Number", tableNumPlaceholder:"e.g. 12",
    paymentLabel:"Payment Method", cashMethod:"Cash on Pickup", cashSub:"Pay cash when you receive your order",
    cardMethod:"Visa / Mastercard", cardSub:"Secure online payment",
    confirmPay:"Confirm Order & Pay", confirmPayCash:"Confirm Order (Cash)",
    notesLabel:"Note",
    demoNotice:"✅ When you confirm the order, the full order details are sent directly to the café's WhatsApp so staff receive it instantly. ⚠️ Note: card / Apple Pay selections here don't actually charge a real payment yet — real online payment requires connecting a payment gateway (e.g. Moyasar or Tap) later.",
    orderReceived:"Order received!", thankYouMsg:"Thanks for your order from Filanbon Cafe, it's being prepared now.",
    done:"Done", footerText:"This menu is designed to open instantly when scanning the",
    subtotal:"Subtotal", total:"Total", cartEmpty:"Your cart is empty — add some delicious drinks 🌿",
    addBtn:"Add", itemsCount:"Items", totalDue:"Total Due",
    alertNamePhone:"Please enter your name and phone number to continue", alertTable:"Please enter your table number",
    confirming:"Confirming your order...", typeTextPickup:"Pickup from branch",
    typeTextTable:"Table delivery to table", payTextCash:"Cash on pickup", payTextOnline:"Online payment",
    heroDesc:"Filanbon Café is a specialty coffee brand dedicated to delivering high-quality, handcrafted beverages and delightful desserts. From expertly brewed espresso-based drinks to refreshing mojitos, every item on our menu is thoughtfully crafted to satisfy coffee lovers and non-coffee drinkers alike.",
    heroAddress:"Abu Dhabi, United Arab Emirates", openNow:"Open Now", getDirections:"Get Directions", callUs:"Call Us",
    followUs:"Follow Us", terms:"Terms & Conditions",
    beanTypeLabel:"Bean Type", arabica:"Arabica", robusta:"Robusta",
    flavorLabel:"Flavor",
    comingSoon:"Price Coming Soon",
    tempLabel:"Temperature", iced:"Iced", hot:"Hot",
    sugarLabel:"Sugar Level", noSugar:"No Sugar", lessSugar:"Less", normalSugar:"Normal", extraSugar:"Extra",
    qtyLabel:"Quantity", addToCartBtn:"Add to Cart", addToCart:"Add to cart",
    applePaySub:"Fast and secure payment", confirmPayApple:"Confirm Order with Apple Pay",
    hoursTitle:"Opening Hours", openNow:"Open Now", closedNow:"Closed Now",
    day0:"Sunday", day1:"Monday", day2:"Tuesday", day3:"Wednesday", day4:"Thursday", day5:"Friday", day6:"Saturday",
  }
};
let LANG = 'ar';
function t(key){ return TR[LANG][key] || key; }
function itemName(item){ return (LANG==='en' && item.nameEn) ? item.nameEn : item.name; }
function itemDesc(item){ if(!item.desc) return null; return (LANG==='ar' && item.descAr) ? item.descAr : item.desc; }
function catTitle(cat){ return (LANG==='en' && cat.titleEn) ? cat.titleEn : cat.title; }

function applyStaticTranslations(){
  document.documentElement.lang = (LANG==='ar' ? 'ar' : 'en');
  document.documentElement.dir = (LANG==='ar' ? 'rtl' : 'ltr');
  document.getElementById('langToggle').textContent = (LANG==='ar' ? 'EN' : 'AR');
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.getElementById('payBtnLabel').textContent = (payMethod === 'cash') ? t('confirmPayCash') : t('confirmPay');
}

document.getElementById('langToggle').addEventListener('click', ()=>{
  LANG = (LANG === 'ar') ? 'en' : 'ar';
  applyStaticTranslations();
  buildMenu();
  renderCartBar();
  updateOpenStatus();
  renderHoursList();
});

// ---------------- Opening hours ----------------
function isOpenNow(){
  const now = new Date();
  const h = now.getHours() + now.getMinutes()/60;
  return h >= CONFIG.openHour && h < CONFIG.closeHour;
}

function fmtHour(h){
  const period = h < 12 || h === 24 ? (LANG==='ar' ? 'ص' : 'AM') : (LANG==='ar' ? 'م' : 'PM');
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return h12 + ':00 ' + period;
}

function updateOpenStatus(){
  const open = isOpenNow();
  const btn = document.getElementById('hoursToggle');
  const text = document.getElementById('openStatusText');
  btn.classList.toggle('closed', !open);
  text.textContent = open ? t('openNow') : t('closedNow');

  const sheetStatus = document.getElementById('hoursSheetStatus');
  if (sheetStatus){
    sheetStatus.className = 'status-pill' + (open ? '' : ' closed');
    sheetStatus.innerHTML = `<span class="status-dot"></span>${open ? t('openNow') : t('closedNow')}`;
  }
}

function renderHoursList(){
  const list = document.getElementById('hoursList');
  if (!list) return;
  list.innerHTML = '';
  const todayIdx = new Date().getDay(); // 0=Sunday
  const hoursText = fmtHour(CONFIG.openHour) + ' – ' + fmtHour(CONFIG.closeHour);
  for (let i=0;i<7;i++){
    const row = document.createElement('div');
    row.className = 'hours-row' + (i===todayIdx ? ' today' : '');
    row.innerHTML = `<span class="day-name">${t('day'+i)}</span><span class="day-time">${hoursText}</span>`;
    list.appendChild(row);
  }
}

document.getElementById('hoursToggle').addEventListener('click', () => {
  renderHoursList();
  updateOpenStatus();
  openSheet('hoursOverlay');
});
document.getElementById('closeHours').addEventListener('click', () => closeSheet('hoursOverlay'));
document.getElementById('hoursOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'hoursOverlay') closeSheet('hoursOverlay');
});

updateOpenStatus();
renderHoursList();
setInterval(updateOpenStatus, 60000);

function buildMenu(){
  tabsEl.innerHTML = '';
  mainEl.innerHTML = '';

  MENU.forEach((cat, idx) => {
    // tab
    const tab = document.createElement('button');
    tab.className = 'tab-btn' + (idx===0 ? ' active' : '');
    tab.textContent = catTitle(cat);
    tab.dataset.target = 'cat-' + idx;
    tab.addEventListener('click', () => {
      // Mark this tab active immediately and lock scroll-spy briefly so a
      // short section (e.g. Filter Coffee with a single item) doesn't get
      // instantly overridden by the next section while the smooth scroll
      // animation is still in progress.
      Array.from(tabsEl.children).forEach(b => b.classList.remove('active'));
      tab.classList.add('active');
      window._scrollSpyLockedIdx = idx;
      window._scrollSpyLockedUntil = Date.now() + 700;
      document.getElementById('cat-' + idx).scrollIntoView({behavior:'smooth', block:'start'});
    });
    tabsEl.appendChild(tab);

    // section
    const section = document.createElement('section');
    section.id = 'cat-' + idx;

    const h = document.createElement('div');
    h.className = 'section-title' + (cat.hot ? ' flame' : '');
    h.textContent = catTitle(cat);
    section.appendChild(h);

    const grid = document.createElement('div');
    grid.className = 'grid';

    cat.items.forEach((item, itemIdx) => {
      const card = document.createElement('div');
      const NO_WIDE_IDS = new Set(['acai_smoothie', 'v60_2']);
      const isLastOdd = (cat.items.length % 2 === 1) && (itemIdx === cat.items.length - 1) && !NO_WIDE_IDS.has(item.id);
      card.className = 'item-card' + (isLastOdd ? ' wide' : '');
      card.dataset.key = item.id;

      const imgWrap = document.createElement('div');
      imgWrap.className = 'item-img-wrap';
      const img = document.createElement('img');
      img.className = 'item-img';
      img.src = IMAGES[item.img] || '';
      img.alt = itemName(item);
      img.loading = 'lazy';
      const seal = document.createElement('div');
      seal.className = 'item-seal';
      seal.innerHTML = sealSVG;
      imgWrap.appendChild(img);
      imgWrap.appendChild(seal);

      const body = document.createElement('div');
      body.className = 'item-body';

      const name = document.createElement('div');
      name.className = 'item-name';
      name.textContent = itemName(item);
      body.appendChild(name);

      if (item.milk) {
        const milkTag = document.createElement('div');
        milkTag.className = 'item-milk-tag';
        milkTag.textContent = '🥛 ' + item.milk;
        body.appendChild(milkTag);
      }

      const priceWrap = document.createElement('div');
      priceWrap.className = 'item-price-wrap';
      if (item.price === null || item.price === undefined) {
        const soon = document.createElement('span');
        soon.className = 'coming-soon-pill';
        soon.textContent = t('comingSoon');
        priceWrap.appendChild(soon);
      } else {
        if (hasDiscount(item)) {
          const pill = document.createElement('span');
          pill.className = 'discount-pill';
          pill.textContent = discountLabel(item);
          const oldP = document.createElement('span');
          oldP.className = 'item-price old';
          oldP.innerHTML = item.price.toFixed(2) + ' <span class="currency">' + currencySVG + '</span>';
          priceWrap.appendChild(pill);
          priceWrap.appendChild(oldP);
        }
        const price = document.createElement('span');
        price.className = 'item-price';
        price.innerHTML = effectivePrice(item).toFixed(2) + ' <span class="currency">' + currencySVG + '</span>';
        priceWrap.appendChild(price);
      }
      body.appendChild(priceWrap);

      const descText = itemDesc(item);
      if (descText) {
        const desc = document.createElement('div');
        desc.className = 'item-desc';
        desc.textContent = descText;
        body.appendChild(desc);
      }

      const isComingSoon = (item.price === null || item.price === undefined);

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'add-cart-btn' + (isComingSoon ? ' disabled' : '');
      if (isComingSoon) {
        addBtn.disabled = true;
        addBtn.innerHTML = `<span>${t('comingSoon')}</span>`;
      } else {
        addBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1.5"/><circle cx="19" cy="21" r="1.5"/><path d="M2.5 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H6"/></svg><span>${t('addToCart')}</span>`;
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openItemSheet(item);
        });
      }
      body.appendChild(addBtn);

      card.appendChild(imgWrap);
      card.appendChild(body);

      if (!isComingSoon) {
        card.addEventListener('click', () => {
          openItemSheet(item);
        });
      } else {
        card.classList.add('coming-soon-card');
      }

      grid.appendChild(card);
    });

    section.appendChild(grid);
    mainEl.appendChild(section);
  });

  // scroll-spy for active tab
  setupScrollSpy();
}

// ---------------- Cart logic ----------------
const CART = {}; // compositeKey -> {item, qty, options}
let freeMarks = {}; // compositeKey -> count of free units marked (buy-X-get-Y offer)

function fmt(n){ return n.toFixed(2); }

function effectivePrice(item){
  if (item.price === null || item.price === undefined) return null;
  if (!item.discountType || !item.discountValue) return item.price;
  let discounted = item.discountType === 'percent'
    ? item.price - (item.price * item.discountValue / 100)
    : item.price - item.discountValue;
  discounted = Math.max(0, discounted);
  return Math.round(discounted * 100) / 100;
}
function hasDiscount(item){
  if (item.price === null || item.price === undefined) return false;
  const eff = effectivePrice(item);
  return eff !== null && eff < item.price;
}
function discountLabel(item){
  if (!hasDiscount(item)) return '';
  return item.discountType === 'percent'
    ? ('-' + item.discountValue + '%')
    : ('-' + item.discountValue.toFixed(2));
}

const OPTION_LABELS = {
  ar: {
    arabica:'أرابيكا', robusta:'روبستا', brazil:'🇧🇷 Brazilian coffee', ethiopia:'🇪🇹 Ethiopian coffee',
    iced:'مثلج', hot:'ساخن',
    none:'بدون سكر', less:'سكر قليل', normal:'سكر عادي', extra:'سكر زيادة'
  },
  en: {
    arabica:'Arabica', robusta:'Robusta', brazil:'🇧🇷 Brazilian coffee', ethiopia:'🇪🇹 Ethiopian coffee',
    iced:'Iced', hot:'Hot',
    none:'No Sugar', less:'Less Sugar', normal:'Normal Sugar', extra:'Extra Sugar'
  }
};
function optLabel(val){ return OPTION_LABELS[LANG][val] || val; }

// ---- V60 flavor / origin options ----
const V60_FLAVORS = [
  {value:'colombia_strawberry', label:'Strawberry candy', flag:'🇨🇴'},
  {value:'colombia_lychee', label:'Lychee', flag:'🇨🇴'},
  {value:'colombia_coconut', label:'Coconut toffee', flag:'🇨🇴'},
  {value:'colombia_passion', label:'Passion fruit', flag:'🇨🇴'},
  {value:'colombia_peach', label:'Peach', flag:'🇨🇴'},
  {value:'colombia_classic', label:'Colombia classic', flag:'🇨🇴'},
];

// ---- Options sheet state ----
let currentOptionsItem = null;
let selBean = 'brazil', selTemp = 'iced', selSugar = 'none', selFlavor = null, optQty = 1;

function attachChipGroup(groupId, onChange, getSelected){
  const group = document.getElementById(groupId);
  Array.from(group.children).forEach(chip => {
    chip.classList.toggle('selected', chip.dataset.value === getSelected());
    chip.onclick = () => {
      Array.from(group.children).forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      onChange(chip.dataset.value);
      updateOptionsButton();
    };
  });
}

function buildFlavorGroup(){
  const group = document.getElementById('flavorGroup');
  group.innerHTML = '';
  V60_FLAVORS.forEach((f, idx) => {
    const chip = document.createElement('div');
    chip.className = 'option-chip flavor-chip' + (idx === 0 ? ' selected' : '');
    chip.dataset.value = f.value;
    chip.textContent = f.flag + ' ' + f.label;
    chip.onclick = () => {
      Array.from(group.children).forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selFlavor = f.value;
      updateOptionsButton();
    };
    group.appendChild(chip);
  });
  selFlavor = V60_FLAVORS[0].value;
}

function flavorLabelByValue(val){
  const f = V60_FLAVORS.find(fl => fl.value === val);
  return f ? (f.flag + ' ' + f.label) : val;
}

function refreshOptionChipsUI(){
  attachChipGroup('beanGroup', v => selBean = v, () => selBean);
  attachChipGroup('tempGroup', v => selTemp = v, () => selTemp);
  attachChipGroup('sugarGroup', v => selSugar = v, () => selSugar);
}

function updateOptionsButton(){
  if (!currentOptionsItem) return;
  const total = effectivePrice(currentOptionsItem) * optQty;
  document.getElementById('optQtyNum').textContent = optQty;
  document.getElementById('addToCartBtn').innerHTML =
    `${t('addToCartBtn')} — ${fmt(total)} ${currencySVG}`;
}

function openItemSheet(item){
  if (item.useStaffModifiers && item.staffModifierGroupIds && item.staffModifierGroupIds.length){
    openComponentsSheet(item);
  } else {
    openOptionsSheet(item);
  }
}

let compModSelections = {};
let compModComment = '';
function buildModifierClusters(groups){
  const clusters = [];
  const seen = new Set();
  groups.forEach(g => {
    if (seen.has(g.id)) return;
    if (g.exclusiveGroupKey){
      const members = groups.filter(x => x.exclusiveGroupKey === g.exclusiveGroupKey);
      members.forEach(m => seen.add(m.id));
      clusters.push({ exclusive: true, members });
    } else {
      seen.add(g.id);
      clusters.push({ exclusive: false, members: [g] });
    }
  });
  return clusters;
}

function openComponentsSheet(item){
  const groups = (item.staffModifierGroupIds || []).map(findModifierGroup).filter(Boolean);
  if (!groups.length){ openOptionsSheet(item); return; }

  compModSelections = {};
  compModComment = '';
  let compQty = 1;
  const clusters = buildModifierClusters(groups);
  clusters.forEach(cluster => {
    for (const g of cluster.members){
      const enabledIds = (item.modifierOptionOverrides && item.modifierOptionOverrides[g.id]) || (g.options || []).map(o => o.id);
      const firstEnabled = (g.options || []).find(o => enabledIds.includes(o.id));
      if (firstEnabled){ compModSelections[g.id] = firstEnabled.id; break; } // كلستر واحد = اختيار افتراضي واحد بس
    }
  });

  const old = document.getElementById('componentsOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'componentsOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:85vh;overflow-y:auto;padding-bottom:16px;';
  overlay.appendChild(sheet);

  function render(){
    sheet.innerHTML = '';

    const handle = document.createElement('div');
    handle.className = 'sheet-handle';
    sheet.appendChild(handle);

    const titleRow = document.createElement('div');
    titleRow.className = 'sheet-title';
    const titleSpan = document.createElement('span');
    titleSpan.textContent = itemName(item);
    const closeBtn = document.createElement('button');
    closeBtn.className = 'sheet-close';
    closeBtn.textContent = '→';
    closeBtn.onclick = () => overlay.remove();
    titleRow.appendChild(titleSpan); titleRow.appendChild(closeBtn);
    sheet.appendChild(titleRow);

    // نفس صف الصورة + السعر بالضبط زي نافذة Americano
    let modifierTotal = 0;
    const chosen = [];
    groups.forEach(g => {
      const optId = compModSelections[g.id];
      const opt = (g.options || []).find(o => o.id === optId);
      if (opt){
        modifierTotal += opt.price || 0;
        chosen.push({ groupTitle: g.title, optionName: (LANG === 'en' ? (opt.nameEn || opt.name) : opt.name), price: opt.price || 0 });
      }
    });
    const unitTotal = effectivePrice(item) + modifierTotal;

    const imgRow = document.createElement('div');
    imgRow.style.cssText = 'display:flex;gap:14px;align-items:center;margin-bottom:16px;';
    imgRow.innerHTML = `<img src="${IMAGES[item.img] || ''}" alt="${itemName(item)}" style="width:64px;height:64px;border-radius:14px;object-fit:cover;border:1px solid #eee;">
      <span style="font-weight:800;font-size:1.05rem;color:var(--hero-green);display:flex;align-items:center;gap:4px;">${unitTotal.toFixed(2)} ${currencySVG}</span>`;
    sheet.appendChild(imgRow);

    clusters.forEach(cluster => {
      const field = document.createElement('div');
      field.className = 'field';
      const label = document.createElement('label');
      const clusterKey = cluster.members[0] && cluster.members[0].exclusiveGroupKey;
      if (clusterKey === 'temperature') label.textContent = LANG === 'en' ? 'Temperature' : 'درجة الحرارة';
      else label.textContent = cluster.members.map(g => LANG === 'en' ? (g.titleEn || g.title) : g.title).join(' / ');
      field.appendChild(label);
      const optGroup = document.createElement('div');
      optGroup.className = 'option-group';
      optGroup.style.flexWrap = 'wrap';
      cluster.members.forEach(g => {
        const enabledIds = (item.modifierOptionOverrides && item.modifierOptionOverrides[g.id]) || (g.options || []).map(o => o.id);
        (g.options || []).filter(opt => enabledIds.includes(opt.id)).forEach(opt => {
          const selected = compModSelections[g.id] === opt.id;
          const chip = document.createElement('div');
          chip.className = 'option-chip flavor-chip' + (selected ? ' selected' : '');
          const label2 = (LANG === 'en' ? (opt.nameEn || opt.name) : opt.name);
          chip.textContent = opt.price ? `${label2} (+${opt.price.toFixed(2)})` : label2;
          chip.onclick = () => {
            if (cluster.exclusive) cluster.members.forEach(m => delete compModSelections[m.id]);
            compModSelections[g.id] = opt.id;
            render();
          };
          optGroup.appendChild(chip);
        });
      });
      field.appendChild(optGroup);
      sheet.appendChild(field);
    });

    const notesField = document.createElement('div');
    notesField.className = 'field';
    const notesLabel = document.createElement('label');
    notesLabel.textContent = t('notesLabel');
    const commentInput = document.createElement('textarea');
    commentInput.rows = 2;
    commentInput.placeholder = 'مثال: بدون ثلج، حار زيادة...';
    commentInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:10px;padding:9px 12px;font-size:.85rem;font-family:inherit;resize:vertical;';
    commentInput.value = compModComment;
    commentInput.addEventListener('input', () => { compModComment = commentInput.value; });
    keepFieldVisibleOnKeyboard(commentInput);
    notesField.appendChild(notesLabel); notesField.appendChild(commentInput);
    sheet.appendChild(notesField);

    const stickyFooter = document.createElement('div');
    stickyFooter.className = 'sheet-sticky-footer';

    const qtyField = document.createElement('div');
    qtyField.className = 'field';
    qtyField.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:0;';
    const qtyLabel = document.createElement('label');
    qtyLabel.style.margin = '0';
    qtyLabel.textContent = t('qtyLabel');
    const stepper = document.createElement('div');
    stepper.className = 'qty-stepper';
    const minus = document.createElement('button');
    minus.type = 'button'; minus.textContent = '−';
    minus.onclick = () => { if (compQty > 1) compQty--; render(); };
    const num = document.createElement('span');
    num.className = 'qty-num';
    num.textContent = compQty;
    const plus = document.createElement('button');
    plus.type = 'button'; plus.textContent = '+';
    plus.onclick = () => { compQty++; render(); };
    stepper.appendChild(minus); stepper.appendChild(num); stepper.appendChild(plus);
    qtyField.appendChild(qtyLabel); qtyField.appendChild(stepper);
    stickyFooter.appendChild(qtyField);

    const addBtn = document.createElement('button');
    addBtn.className = 'primary-btn';
    addBtn.innerHTML = `${t('addToCartBtn')} — ${(unitTotal * compQty).toFixed(2)} ${currencySVG}`;
    addBtn.onclick = () => {
      const key = item.id + '|comp|' + groups.map(g => compModSelections[g.id]).join(',') + '|' + Date.now();
      if (!CART[key]) {
        CART[key] = { item, qty: 0, options: { components: chosen, modifierTotal, comment: compModComment.trim() || undefined } };
      }
      CART[key].qty += compQty;
      overlay.remove();
      renderCartBar();
      const cartOv = document.getElementById('cartOverlay');
      if (cartOv && cartOv.classList.contains('open')) renderCartSheet();
    };
    stickyFooter.appendChild(addBtn);
    sheet.appendChild(stickyFooter);
  }

  render();
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function openOptionsSheet(item){
  currentOptionsItem = item;
  selBean = 'brazil'; selTemp = 'iced'; selSugar = 'none'; optQty = 1;
  document.getElementById('itemNotesInput').value = '';

  document.getElementById('optionsItemName').textContent = itemName(item);
  document.getElementById('optionsItemImg').src = IMAGES[item.img] || '';
  const d = itemDesc(item);
  const eff = effectivePrice(item);
  document.getElementById('optionsItemPrice').innerHTML = hasDiscount(item)
    ? `<span style="text-decoration:line-through;opacity:.55;font-size:.85em;">${item.price.toFixed(2)}</span> ${eff.toFixed(2)} ${currencySVG}`
    : eff.toFixed(2) + ' ' + currencySVG;

  const flavorField = document.getElementById('flavorField');
  const beanField = document.getElementById('beanField');
  const tempField = document.getElementById('tempField');
  const sugarField = document.getElementById('sugarField');
  sugarField.style.display = item.noSugar ? 'none' : 'block';
  if (item.hasFlavors){
    flavorField.style.display = 'block';
    beanField.style.display = 'none';
    tempField.style.display = item.noTemp ? 'none' : 'block';
    buildFlavorGroup();
  } else if (item.noBeanOrigin){
    flavorField.style.display = 'none';
    beanField.style.display = 'none';
    tempField.style.display = 'none';
    selFlavor = null;
  } else {
    flavorField.style.display = 'none';
    beanField.style.display = 'block';
    tempField.style.display = item.noTemp ? 'none' : 'block';
    selFlavor = null;
  }

  refreshOptionChipsUI();
  updateOptionsButton();
  openSheet('optionsOverlay');
}

document.getElementById('optQtyMinus').addEventListener('click', () => {
  if (optQty > 1) optQty--;
  updateOptionsButton();
});
document.getElementById('optQtyPlus').addEventListener('click', () => {
  optQty++;
  updateOptionsButton();
});
document.getElementById('closeOptions').addEventListener('click', () => closeSheet('optionsOverlay'));
document.getElementById('optionsOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'optionsOverlay') closeSheet('optionsOverlay');
});

function keepFieldVisibleOnKeyboard(el){
  // الحل الشامل الحين موجود بمستمع عام واحد بالأسفل (يغطي كل الحقول تلقائيًا،
  // حتى الحقول اللي تتولد لاحقًا) — هذي الدالة صارت بس نقطة ربط قديمة، خليناها
  // فاضية عشان ما نكسر أي استدعاء موجود لها بمكان ثاني بالكود.
}

// ============ إبقاء حقل الإدخال ظاهر فوق كيبورد iOS (يغطي كل الحقول تلقائيًا) ============
// حل عام واحد عبر تفويض الأحداث (Event Delegation) على مستوى الصفحة كلها،
// يشتغل على أي input/textarea موجود الآن أو يتولد لاحقًا (زي حقل الملاحظات
// بنافذة الإضافات)، بدون ما نحتاج نربط كل حقل لحاله.
// - يحرك السكرول مرة وحدة بس بعد تأخير بسيط (يكفي الكيبورد يبدأ يفتح فعليًا)
//   عشان الحركة تصير ناعمة وما تتكرر (يمنع أي رجّة).
// - يشتغل بنفس الطريقة على Safari وChrome على آيفون لأنه يعتمد على APIs
//   قياسية (focusin + scrollIntoView)، مو خاصية مختصة بمتصفح معيّن.
// - ما يغيّر أي تصميم أو حجم عنصر — بس يسكرول الصفحة الموجودة أصلاً.
// - قفل تمرير الصفحة الخلفية (بالأسفل بالكود) يمنع تعارض iOS المعروف بين
//   position:fixed ومحاولة المتصفح التلقائية سكرول الصفحة، وهذا يخلي رجوع
//   الصفحة لوضعها الطبيعي بعد إغلاق الكيبورد يصير تلقائيًا وسلس.
(function(){
  function isTextField(el){
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') &&
      el.type !== 'checkbox' && el.type !== 'radio' && el.type !== 'button' && el.type !== 'submit';
  }
  document.addEventListener('focusin', function(e){
    if (!isTextField(e.target)) return;
    var el = e.target;
    setTimeout(function(){
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }, true);
})();

keepFieldVisibleOnKeyboard(document.getElementById('itemNotesInput'));
['custName','custPhone','custPlate','custBirthdate'].forEach(id => {
  const el = document.getElementById(id);
  if (el) keepFieldVisibleOnKeyboard(el);
});
document.getElementById('addToCartBtn').addEventListener('click', () => {
  const item = currentOptionsItem;
  const showBean = !item.hasFlavors && !item.noBeanOrigin;
  const showTemp = !item.noBeanOrigin && !item.noTemp;
  const showSugar = !item.noSugar;
  const noteVal = document.getElementById('itemNotesInput').value.trim();
  const key = item.id + '|' + (showBean ? selBean : 'none') + '|' + (showTemp ? selTemp : 'none') + '|' + (showSugar ? selSugar : 'none') + '|' + (selFlavor || '') + '|' + Date.now();
  if (!CART[key]) {
    CART[key] = { item, qty: 0, options: { bean: showBean ? selBean : null, temp: showTemp ? selTemp : null, sugar: showSugar ? selSugar : null, flavor: selFlavor, comment: noteVal || undefined } };
  }
  CART[key].qty += optQty;
  closeSheet('optionsOverlay');
  renderCartBar();
  if (document.getElementById('cartOverlay').classList.contains('open')) renderCartSheet();
});

function cartLineOptionsText(options){
  if (!options) return '';
  const bits = [];
  if (options.components && options.components.length){
    bits.push(options.components.map(c => c.optionName + (c.price ? ` (+${c.price.toFixed(2)})` : '')).join(' • '));
  } else {
    const parts = [];
    if (options.temp) parts.push(optLabel(options.temp));
    if (options.flavor){
      parts.push(flavorLabelByValue(options.flavor));
    } else if (options.bean){
      parts.push(optLabel(options.bean));
    }
    if (options.sugar) parts.push(optLabel(options.sugar));
    if (parts.length) bits.push(parts.join(' • '));
  }
  if (options.comment) bits.push('📝 ' + options.comment);
  return bits.join(' — ');
}

function incCartLine(key){ CART[key].qty += 1; renderCartSheet(); renderCartBar(); if (checkoutOpen()) renderCheckoutSummary(); }
function decCartLine(key){
  CART[key].qty -= 1;
  if (CART[key].qty <= 0) delete CART[key];
  renderCartSheet(); renderCartBar();
  if (checkoutOpen()) renderCheckoutSummary();
}
function checkoutOpen(){ return document.getElementById('checkoutOverlay').classList.contains('open'); }

function cartRawCount(){
  let count = 0;
  Object.values(CART).forEach(({qty}) => count += qty);
  return count;
}

function offerEligibleFreeCount(){
  const o = OFFERS.buyXGetY;
  if (!o || !o.enabled) return 0;
  const buy = Number(o.buyCount) || 0;
  const free = Number(o.freeCount) || 0;
  if (buy <= 0 || free <= 0) return 0;
  return Math.floor(cartRawCount() / (buy + free)) * free;
}

function totalFreeMarked(){
  return Object.values(freeMarks).reduce((a, b) => a + b, 0);
}

function clampFreeMarks(){
  const eligible = offerEligibleFreeCount();
  let used = 0;
  Object.keys(freeMarks).forEach(key => {
    if (!CART[key]) { delete freeMarks[key]; return; }
    let m = Math.min(freeMarks[key] || 0, CART[key].qty);
    if (used + m > eligible) m = Math.max(0, eligible - used);
    if (m > 0) { freeMarks[key] = m; used += m; }
    else delete freeMarks[key];
  });
}

function cartLineUnitPrice(item, options){
  return effectivePrice(item) + ((options && options.modifierTotal) || 0);
}

function cartTotals(){
  clampFreeMarks();
  let count = 0, rawTotal = 0, freeDiscount = 0;
  Object.entries(CART).forEach(([key, {item, qty, options}]) => {
    count += qty;
    const unit = cartLineUnitPrice(item, options);
    rawTotal += unit * qty;
    freeDiscount += unit * (freeMarks[key] || 0);
  });
  return { count, total: Math.max(0, rawTotal - freeDiscount), rawTotal, freeDiscount };
}

function renderCartBar(){
  const {count, total} = cartTotals();
  const bar = document.getElementById('cartBar');
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').innerHTML = fmt(total) + ' ' + currencySVG;
  bar.classList.toggle('show', count > 0);

  const badge = document.getElementById('headerCartBadge');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

document.getElementById('headerCartBtn').addEventListener('click', () => {
  renderCartSheet();
  openSheet('cartOverlay');
});

function renderCartSheet(){
  const linesEl = document.getElementById('cartLines');
  const summaryEl = document.getElementById('cartSummary');
  linesEl.innerHTML = '';
  const entries = Object.entries(CART);
  if (entries.length === 0){
    linesEl.innerHTML = `<div class="cart-empty">${t('cartEmpty')}</div>`;
    summaryEl.innerHTML = '';
    document.getElementById('goCheckout').disabled = true;
    return;
  }
  document.getElementById('goCheckout').disabled = false;

  const eligible = offerEligibleFreeCount();
  if (eligible > 0){
    const marked = totalFreeMarked();
    const banner = document.createElement('div');
    banner.className = 'free-offer-banner';
    banner.textContent = marked < eligible
      ? `🎁 عندك ${eligible - marked} منتج مجاني! اختر أي صنف بالأسفل`
      : `🎁 تم اختيار كل منتجاتك المجانية (${eligible})`;
    linesEl.appendChild(banner);
  }

  entries.forEach(([key, {item, qty, options}]) => {
    const line = document.createElement('div');
    line.className = 'cart-line';
    const optsText = cartLineOptionsText(options);
    const unit = cartLineUnitPrice(item, options);
    line.innerHTML = `
      <img src="${IMAGES[item.img] || ''}" alt="${itemName(item)}">
      <div class="cl-info">
        <div class="cl-name">${itemName(item)}</div>
        ${optsText ? `<div class="cl-opts">${optsText}</div>` : ''}
        <div class="cl-price">${fmt(unit)} × ${qty}</div>
      </div>
    `;
    const stepper = document.createElement('div');
    stepper.className = 'qty-stepper';
    const minus = document.createElement('button'); minus.type='button'; minus.textContent='−';
    minus.onclick = () => decCartLine(key);
    const num = document.createElement('span'); num.className='qty-num'; num.textContent = qty;
    const plus = document.createElement('button'); plus.type='button'; plus.textContent='+';
    plus.onclick = () => incCartLine(key);
    stepper.appendChild(minus); stepper.appendChild(num); stepper.appendChild(plus);
    line.appendChild(stepper);

    if (eligible > 0){
      const marked = freeMarks[key] || 0;
      const remainingBudget = Math.max(0, eligible - (totalFreeMarked() - marked));
      const freeRow = document.createElement('div');
      freeRow.className = 'free-mark-row';
      const label = document.createElement('span'); label.textContent = '🎁 مجاني:';
      const fMinus = document.createElement('button'); fMinus.type='button'; fMinus.textContent='−';
      fMinus.disabled = marked <= 0;
      fMinus.onclick = () => { freeMarks[key] = Math.max(0, marked - 1); renderCartSheet(); renderCartBar(); };
      const fNum = document.createElement('span'); fNum.className='qty-num'; fNum.textContent = marked;
      const fPlus = document.createElement('button'); fPlus.type='button'; fPlus.textContent='+';
      fPlus.disabled = marked >= qty || remainingBudget <= 0;
      fPlus.onclick = () => { freeMarks[key] = marked + 1; renderCartSheet(); renderCartBar(); };
      freeRow.appendChild(label);
      freeRow.appendChild(fMinus);
      freeRow.appendChild(fNum);
      freeRow.appendChild(fPlus);
      line.appendChild(freeRow);
    }

    linesEl.appendChild(line);
  });

  const {total, freeDiscount} = cartTotals();
  summaryEl.innerHTML = `
    ${freeDiscount > 0 ? `<div class="summary-row"><span>🎁 خصم المنتجات المجانية</span><span>-${fmt(freeDiscount)}</span></div>` : ''}
    <div class="summary-row total"><span>${t('total')}</span><span>${fmt(total)}</span></div>
  `;
}

function renderCheckoutSummary(){
  const {count, total, freeDiscount} = cartTotals();
  document.getElementById('checkoutSummary').innerHTML = `
    <div class="summary-row"><span>${t('itemsCount')}</span><span>${count}</span></div>
    ${freeDiscount > 0 ? `<div class="summary-row"><span>🎁 خصم المنتجات المجانية</span><span>-${fmt(freeDiscount)}</span></div>` : ''}
    <div class="summary-row total"><span>${t('totalDue')}</span><span>${fmt(total)}</span></div>
  `;
}

// ---- Sheet open/close ----
function openSheet(id){ document.getElementById(id).classList.add('open'); }
function closeSheet(id){ document.getElementById(id).classList.remove('open'); }

// ============ قفل تمرير الصفحة الخلفية وقت فتح أي نافذة (كل النوافذ) ============
// مراقب واحد يغطي كل نافذة بالموقع مهما كانت طريقة فتحها/إغلاقها (classList,
// إنشاء العنصر ديناميكيًا، إلخ) — يمنع تعارض iOS المعروف بين تثبيت النافذة
// ومحاولة المتصفح التلقائية سكرول الصفحة كلها لما تضغط حقل نص، اللي يسبب
// الرجّة ويمنع الكيبورد من احترام حدود النافذة.
(function(){
  let locked = false;
  let savedScrollY = 0;
  function syncBodyLock(){
    const anyOpen = document.querySelector('.overlay.open');
    if (anyOpen && !locked){
      savedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.position = 'fixed';
      document.body.style.top = (-savedScrollY) + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      locked = true;
    } else if (!anyOpen && locked){
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      locked = false;
      window.scrollTo(0, savedScrollY);
    }
  }
  const bodyLockObserver = new MutationObserver(syncBodyLock);
  bodyLockObserver.observe(document.body, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
  syncBodyLock();
})();

// ---------------- Swipe-down-to-close for bottom sheets ----------------
(function enableSwipeToClose(){
  document.querySelectorAll('.overlay').forEach(overlay => {
    const sheet = overlay.querySelector('.sheet');
    const closeBtn = overlay.querySelector('.sheet-close');
    if (!sheet) return;

    let startY = 0, currentY = 0, dragging = false, engaged = false, startTime = 0;

    function reset(){
      dragging = false;
      engaged = false;
      sheet.classList.remove('dragging');
      sheet.style.transition = '';
      sheet.style.transform = '';
    }

    function finish(shouldClose){
      sheet.style.transition = 'transform .18s ease';
      if (shouldClose){
        sheet.style.transform = 'translateY(100%)';
        setTimeout(() => { overlay.classList.remove('open'); reset(); }, 160);
      } else {
        sheet.style.transform = 'translateY(0)';
        setTimeout(reset, 180);
      }
    }

    // Touch: works from anywhere on the sheet. We only "engage" the
    // drag-to-close once the user pulls downward while the sheet's own
    // content is already scrolled to the top — exactly like native
    // iOS/Android sheets — so it never fights with normal scrolling.
    sheet.addEventListener('touchstart', e => {
      if (closeBtn && (e.target === closeBtn || closeBtn.contains(e.target))) return;
      dragging = true;
      engaged = false;
      startY = e.touches[0].clientY;
      currentY = startY;
      startTime = Date.now();
    }, {passive:true});

    sheet.addEventListener('touchmove', e => {
      if (!dragging) return;
      currentY = e.touches[0].clientY;
      const delta = currentY - startY;

      if (!engaged){
        if (delta > 6 && sheet.scrollTop <= 0){
          engaged = true;
          sheet.classList.add('dragging');
          sheet.style.transition = 'none';
        } else {
          return; // let the sheet scroll normally
        }
      }

      if (engaged){
        if (e.cancelable) e.preventDefault();
        sheet.style.transform = `translateY(${Math.max(0, delta)}px)`;
      }
    }, {passive:false});

    sheet.addEventListener('touchend', () => {
      if (!dragging) return;
      const delta = Math.max(0, currentY - startY);
      const elapsed = Math.max(1, Date.now() - startTime);
      const velocity = delta / elapsed;
      if (engaged && (delta > 55 || (delta > 20 && velocity > 0.5))){
        finish(true);
      } else if (engaged){
        finish(false);
      } else {
        dragging = false;
      }
    }, {passive:true});

    sheet.addEventListener('touchcancel', () => { if (engaged) finish(false); else dragging = false; }, {passive:true});

    // Mouse (desktop testing): drag from the handle/title only.
    const handle = overlay.querySelector('.sheet-handle');
    const titleBar = overlay.querySelector('.sheet-title');
    [handle, titleBar].filter(Boolean).forEach(zone => {
      zone.addEventListener('mousedown', e => {
        if (closeBtn && (e.target === closeBtn || closeBtn.contains(e.target))) return;
        dragging = true; engaged = true;
        startY = e.clientY; currentY = startY; startTime = Date.now();
        sheet.classList.add('dragging');
        sheet.style.transition = 'none';
        e.preventDefault();
      });
    });
    window.addEventListener('mousemove', e => {
      if (!dragging || !engaged) return;
      currentY = e.clientY;
      sheet.style.transform = `translateY(${Math.max(0, currentY - startY)}px)`;
    });
    window.addEventListener('mouseup', () => {
      if (!dragging) return;
      const delta = Math.max(0, currentY - startY);
      if (engaged) finish(delta > 55);
      dragging = false;
    });
  });
})();


document.getElementById('cartBar').addEventListener('click', () => {
  renderCartSheet();
  openSheet('cartOverlay');
});
document.getElementById('closeCart').addEventListener('click', () => closeSheet('cartOverlay'));
document.getElementById('cartOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'cartOverlay') closeSheet('cartOverlay');
});

document.getElementById('goCheckout').addEventListener('click', () => {
  if (Object.keys(CART).length === 0) return;
  closeSheet('cartOverlay');
  renderCheckoutSummary();
  openSheet('checkoutOverlay');
});
document.getElementById('closeCheckout').addEventListener('click', () => closeSheet('checkoutOverlay'));
document.getElementById('checkoutOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'checkoutOverlay') closeSheet('checkoutOverlay');
});

// order type toggle
let orderType = 'pickup';
document.querySelectorAll('#orderTypeGroup .option-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('#orderTypeGroup .option-chip').forEach(c => c.classList.remove('selected'));
    chip.classList.add('selected');
    orderType = chip.dataset.value;
    document.getElementById('tableField').style.display = (orderType === 'table') ? 'block' : 'none';
  });
});

// table number selection (dynamic — built from the active branch's tables list)
let selectedTableNum = null;
const qrParams = new URLSearchParams(window.location.search);
const presetTableFromQR = qrParams.get('table');
const presetPickupFromQR = qrParams.get('type') === 'pickup';

function buildTableChips(tables){
  const group = document.getElementById('tableNumGroup');
  if (!group) return;
  group.innerHTML = '';
  (tables && tables.length ? tables : ['1']).forEach((num, i) => {
    const chip = document.createElement('div');
    chip.className = 'option-chip' + (i===0 ? '' : '');
    chip.dataset.value = String(num);
    chip.textContent = String(num);
    chip.addEventListener('click', () => {
      document.querySelectorAll('#tableNumGroup .option-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedTableNum = chip.dataset.value;
    });
    group.appendChild(chip);
  });
  selectedTableNum = null;
  applyQRPreset();
}

function applyQRPreset(){
  if (presetTableFromQR){
    const matchChip = document.querySelector(`#tableNumGroup .option-chip[data-value="${presetTableFromQR}"]`);
    if (matchChip){
      document.querySelectorAll('#orderTypeGroup .option-chip').forEach(c => c.classList.remove('selected'));
      const tableTypeChip = document.querySelector('#orderTypeGroup .option-chip[data-value="table"]');
      if (tableTypeChip) tableTypeChip.classList.add('selected');
      orderType = 'table';
      document.getElementById('tableField').style.display = 'block';

      document.querySelectorAll('#tableNumGroup .option-chip').forEach(c => c.classList.remove('selected'));
      matchChip.classList.add('selected');
      selectedTableNum = presetTableFromQR;
    }
  } else if (presetPickupFromQR){
    document.querySelectorAll('#orderTypeGroup .option-chip').forEach(c => c.classList.remove('selected'));
    const pickupChip = document.querySelector('#orderTypeGroup .option-chip[data-value="pickup"]');
    if (pickupChip) pickupChip.classList.add('selected');
    orderType = 'pickup';
    document.getElementById('tableField').style.display = 'none';
  }
}

// payment method toggle
let payMethod = 'cash';
function refreshPayLabel(){
  document.getElementById('payBtnLabel').textContent =
    payMethod === 'cash' ? t('confirmPayCash') : t('confirmPay');
  const btn = document.getElementById('confirmPay');
  btn.classList.toggle('applepay-btn', payMethod === 'applepay');
  if (payMethod === 'applepay'){
    document.getElementById('payBtnLabel').innerHTML =
      ` <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:-4px;margin-inline-end:4px;"><path d="M16.7 12.4c0-2 1.6-3 1.7-3.1-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.7-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.6 2.7-.6s1.6.6 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.2-.8-2.2-3.1zM14.8 6.2c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z"/></svg>${t('confirmPayApple')}`;
  }
}
document.querySelectorAll('#payMethods .pay-method').forEach(pm => {
  pm.addEventListener('click', () => {
    document.querySelectorAll('#payMethods .pay-method').forEach(p => p.classList.remove('selected'));
    pm.classList.add('selected');
    payMethod = pm.dataset.value;
    refreshPayLabel();
  });
});

// confirm & pay
let lastPlacedOrderId = null;

document.getElementById('confirmPay').addEventListener('click', async () => {
  const btn = document.getElementById('confirmPay');
  const label = document.getElementById('payBtnLabel');
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();

  if (!name || !phone){
    alert(t('alertNamePhone'));
    return;
  }
  if (orderType === 'table' && !selectedTableNum){
    alert(t('alertTable'));
    return;
  }

  const orderNo = Math.floor(1000 + Math.random()*9000);
  const plateVal = document.getElementById('custPlate').value.trim();
  const tableVal = selectedTableNum || '';

  const {total, freeDiscount} = cartTotals();
  const typeText = orderType === 'pickup' ? t('typeTextPickup') : (t('typeTextTable') + ' ' + tableVal);
  const payText = payMethod === 'cash' ? t('payTextCash') : (payMethod === 'applepay' ? 'Apple Pay' : t('payTextOnline'));

  const orderLines = Object.entries(CART).map(([key, {item, qty, options}]) => {
    const optsText = cartLineOptionsText(options);
    const unit = cartLineUnitPrice(item, options);
    const freeUnits = freeMarks[key] || 0;
    return { name: itemName(item), qty, unit, optionsText: optsText, freeUnits };
  });

  const liveOrder = {
    id: 'live-' + Date.now(),
    orderNo,
    createdAt: new Date().toISOString(),
    customerName: name,
    customerPhone: phone,
    plateVal, tableVal,
    typeText, payText, payMethod,
    lines: orderLines,
    total, freeDiscount,
    status: 'new'
  };

  btn.disabled = true;
  const prevHTML = label.innerHTML;
  label.innerHTML = `<span class="spinner"></span> ${t('confirming')}`;

  // لو مكتبة Firebase ما تحمّلت (شبكة جوال ضعيفة وقت فتح الصفحة)، نعطيها
  // فرصة ثانية تتحمّل الآن قبل ما نستسلم — بدل ما نفشل فورًا لأنها ما
  // كانت جاهزة بالضبط وقت الضغط على الزر.
  if (typeof firebase === 'undefined'){
    label.innerHTML = `<span class="spinner"></span> ${LANG === 'ar' ? 'جاري تجهيز الاتصال...' : 'Preparing connection...'}`;
    await ensureFirebaseSdkLoaded();
    label.innerHTML = `<span class="spinner"></span> ${t('confirming')}`;
  }

  // نتحقق فعليًا إن الطلب وصل ونجح حفظه بـ Firestore (عبر Compat API:
  // .collection().doc().set() — نفس النمط المستخدم بكل المشروع، بدون
  // أي استدعاء من Modular API زي addDoc()) قبل ما نعرض أي رسالة نجاح.
  const savedOrder = await Storage.addLiveOrder(liveOrder);

  if (!savedOrder){
    btn.disabled = false;
    label.innerHTML = prevHTML;
    alert(LANG === 'ar'
      ? '⚠️ تعذّر إرسال طلبك — يبدو إن فيه مشكلة بالاتصال بالإنترنت. تأكد من الاتصال وحاول مرة ثانية.'
      : '⚠️ Could not send your order — check your internet connection and try again.');
    return;
  }

  lastPlacedOrderId = liveOrder.id;
  const birthdateVal = document.getElementById('custBirthdate').value || null;
  recordLoyaltyPurchase(phone, name, cartRawCount(), birthdateVal);

  // وصلنا هنا يعني الحفظ نجح فعلاً بقاعدة البيانات — الحين آمن نعرض التأكيد
  setTimeout(() => {
    btn.disabled = false;
    label.innerHTML = prevHTML;
    closeSheet('checkoutOverlay');

    document.getElementById('orderNumber').textContent = '#' + orderNo;
    const plateText = plateVal ? ` — ${t('plateLabel')}: ${plateVal}` : '';
    document.getElementById('successDetails').textContent =
      `${typeText} — ${payText} — ${t('total')}: ${fmt(total)}${plateText}`;

    const cancelBtn = document.getElementById('cancelOrderBtn');
    if (cancelBtn){
      cancelBtn.style.display = 'block';
      cancelBtn.disabled = false;
      cancelBtn.textContent = 'إلغاء الطلب';
    }

    openSheet('successOverlay');

    // reset cart
    Object.keys(CART).forEach(k => delete CART[k]);
    renderCartBar();
  }, 1400);
});

document.getElementById('cancelOrderBtn').addEventListener('click', async () => {
  if (!lastPlacedOrderId) return;
  const cancelBtn = document.getElementById('cancelOrderBtn');
  cancelBtn.disabled = true;
  cancelBtn.textContent = 'جاري الإرسال...';
  await Storage.updateLiveOrder(lastPlacedOrderId, {
    status: 'cancel_requested',
    cancelRequestedAt: new Date().toISOString()
  });
  cancelBtn.textContent = '✅ تم إرسال طلب الإلغاء للمشرف';
});


function buildOrderWhatsAppLink({orderNo, name, phone, plateVal, tableVal}){
  const {total} = cartTotals();
  const typeText = orderType === 'pickup' ? t('typeTextPickup') : (t('typeTextTable') + ' ' + tableVal);
  const payText = payMethod === 'cash' ? t('payTextCash') : (payMethod === 'applepay' ? 'Apple Pay' : t('payTextOnline'));

  const lines = [];
  lines.push(`🌿 *طلب جديد — Filanbon Cafe* 🌿`);
  lines.push(`رقم الطلب: #${orderNo}`);
  lines.push(``);
  lines.push(`👤 الاسم: ${name}`);
  lines.push(`📱 الجوال: ${phone}`);
  lines.push(`📍 ${typeText}`);
  if (plateVal) lines.push(`🚗 رقم المركبة: ${plateVal}`);
  lines.push(``);
  lines.push(`— — — الأصناف — — —`);
  Object.entries(CART).forEach(([key, {item, qty, options}]) => {
    const optsText = cartLineOptionsText(options);
    const unit = cartLineUnitPrice(item, options);
    const freeUnits = freeMarks[key] || 0;
    const paidUnits = qty - freeUnits;
    const lineTotal = (unit * paidUnits).toFixed(2);
    const freeNote = freeUnits > 0 ? ` 🎁 (${freeUnits} مجانًا)` : '';
    lines.push(`• ${qty}x ${itemName(item)}${optsText ? ' (' + optsText + ')' : ''} — ${lineTotal}${freeNote}`);
  });
  lines.push(``);
  lines.push(`💰 الإجمالي: ${fmt(total)}`);
  lines.push(`💳 الدفع: ${payText}`);

  const text = lines.join('\n');
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}


document.getElementById('closeSuccess').addEventListener('click', () => {
  closeSheet('successOverlay');
});

// scroll-spy for active tab
let scrollListenerAdded = false;
function setupScrollSpy(){
  const sections = Array.from(document.querySelectorAll('main > section'));
  const tabBtns = Array.from(tabsEl.children);

  function onScroll(){
    // Respect a brief lock right after a tab click so the manually-selected
    // tab stays highlighted while the smooth scroll is still animating,
    // instead of scroll-spy immediately jumping to the next section.
    if (window._scrollSpyLockedUntil && Date.now() < window._scrollSpyLockedUntil){
      return;
    }
    const headerH = document.querySelector('.tabs-wrap').offsetHeight + 10;
    let currentIdx = 0;
    for (let i=0;i<sections.length;i++){
      const rect = sections[i].getBoundingClientRect();
      if (rect.top - headerH <= 0) currentIdx = i;
    }
    tabBtns.forEach((b,i)=> b.classList.toggle('active', i===currentIdx));
    const activeBtn = tabBtns[currentIdx];
    if (activeBtn) activeBtn.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  }
  window._menuOnScroll = onScroll;
  if (!scrollListenerAdded){
    window.addEventListener('scroll', () => window._menuOnScroll && window._menuOnScroll(), {passive:true});
    scrollListenerAdded = true;
  }
}

// ---------------- Data loading (storage-aware) ----------------
async function loadStorageState(){
  // كانت 7 طلبات متتالية لقاعدة البيانات (كل وحدة تنتظر الثانية) — هذا كان
  // السبب الحقيقي لتأخر ظهور المنتجات والأسعار وقت فتح الصفحة. الحين
  // نسويهم كلهم بنفس الوقت (بالتوازي) بما إنهم مستقلين عن بعض.
  const [loaded, branches, settings, offers, modifierGroups, loyalty, staffGroups] =
    await Promise.all([
      Storage.load(),
      Storage.loadBranches(),
      Storage.loadSettings(),
      Storage.loadOffers(),
      Storage.loadModifierGroups(),
      Storage.loadLoyalty(),
      Storage.loadStaffGroups()
    ]);
  MENU = loaded.menu;
  IMAGES = loaded.images;
  BRANCHES = branches;
  SETTINGS = settings;
  applyOffers(offers);
  MODIFIER_GROUPS = modifierGroups;
  LOYALTY = loyalty;
  STAFF_GROUPS = staffGroups;
  applySettings(SETTINGS);
}

async function loadMenuData(){
  if (ADMIN_MODE){
    document.body.classList.add('owner-portal-mode');
    if (safeSessionGet('filanbon_admin_auth') === '1'){
      await loadStorageState();
      renderAdminPanel();
    } else {
      showAdminLogin(); // فورية — بدون انتظار أي بيانات من Firebase
    }
    return;
  }
  if (STAFF_MODE){
    document.body.classList.add('staff-portal-mode');
    if (safeSessionGet('filanbon_staff_auth') === '1'){
      await loadStorageState();
      renderStaffPanel();
    } else {
      showStaffLogin(); // فورية أيضًا
    }
    return;
  }

  await loadStorageState();
  applyActiveBranch();
  applyHeaderImages();
  buildMenu();
  applyStaticTranslations();
  renderCartBar();
}




/* =====================================================================
   ADMIN PANEL — لوحة تحكم المالك
   يفتحها المالك بالضغط على أيقونة الترس (⚙) أسفل يسار الشاشة.
   كلمة المرور الافتراضية: filanbon2026  — غيّرها من ADMIN_PASSWORD بالأسفل.
===================================================================== */
/* ---------- Owner portal mode (?admin=1) ----------
   رابط العميل (QR): الرابط العادي بدون أي إضافة.
   رابط المالك: نفس الرابط + ?admin=1  — يفتح مباشرة على شاشة الدخول
   بملء الصفحة، بدون أي محتوى منيو تحته. */
const ADMIN_MODE = new URLSearchParams(window.location.search).get('admin') === '1';

const ADMIN_PASSWORD = 'filanbon2026';
function currentOwnerPassword(){
  return (SETTINGS.ownerPassword && SETTINGS.ownerPassword.trim()) || ADMIN_PASSWORD;
}

/* ---------- Staff portal mode (?staff=1) ----------
   رابط الموظف: نفس رابط الموقع + ?staff=1  — يفتح شاشة دخول خاصة
   بكلمة مرور منفصلة (STAFF_PASSWORD)، وما يشوف الموظف غير برنامج
   الولاء (بحث عن زبون + تسليم المنتج المجاني) — بدون أي وصول لبقية
   إعدادات المتجر أو المنتجات أو الأسعار. */
const STAFF_MODE = new URLSearchParams(window.location.search).get('staff') === '1';
const STAFF_PASSWORD = 'filanbon-staff2026';

/* =====================================================================
   FIREBASE — للاستضافة الذاتية فقط (خارج Claude)
   =====================================================================
   إذا الملف مفتوح كرابط Claude، هذا القسم غير مستخدم إطلاقًا (التخزين
   السحابي يشتغل تلقائيًا عبر window.storage).

   إذا استضفت الملف بنفسك (Netlify، دومين خاص، إلخ) ولازم كل الزبائن
   يشوفون نفس تعديلات المالك، مع حماية حقيقية بمستوى السيرفر (مو مجرد
   كلمة مرور بالواجهة)، اتبع الخطوات:

   1) روح إلى https://console.firebase.google.com وسوّي مشروع مجاني جديد.
   2) من القائمة اليسرى: Build → Firestore Database → Create database
      (اختر أي منطقة قريبة، ووضع Production mode).
   3) من ⚙ Project settings → مرّر لتحت لـ "Your apps" → اضغط أيقونة الويب </>
      → سجّل التطبيق → انسخ الكائن firebaseConfig اللي يظهر لك.
   4) الصق قيمك بدل PASTE_HERE بالأسفل (كل قيمة بمكانها).

   5) 🔐 فعّل تسجيل الدخول الحقيقي (هذا اللي يعطيك الحماية القوية):
      - من القائمة: Build → Authentication → Get started
      - تبويب Sign-in method → فعّل "Email/Password"
      - تبويب Users → Add user → حط إيميل المالك وكلمة مرور قوية يختارها
        هو بنفسه (هذي بيانات دخول حقيقية، منفصلة تمامًا عن أي كلمة مرور
        مكتوبة بالكود — لازم يحفظها المالك بمكان آمن).

   6) من تبويب Firestore Database → Rules، الصق هذي القاعدة واضغط Publish:
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            match /filanbon/{docId} {
              allow read: if true;
              allow write: if request.auth != null;
            }
          }
        }
      هذي القاعدة تسمح للجميع بقراءة المنيو (طبيعي)، لكن الكتابة/التعديل
      ما تصير إلا لمن يسجّل دخول فعليًا بالإيميل وكلمة المرور اللي سويتها
      بخطوة 5 — حتى لو حد فتح كود الصفحة، ما يقدر يعدّل شي بدون تسجيل
      دخول حقيقي عبر خوادم Google.

   7) احفظ الملف وارفعه من جديد للاستضافة.
===================================================================== */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDDikcOvKJ1oIGw6g0fesPejlHORjw8u5Y",
  authDomain: "filanbon.firebaseapp.com",
  projectId: "filanbon",
  storageBucket: "filanbon.firebasestorage.app",
  messagingSenderId: "232556759378",
  appId: "1:232556759378:web:06afd7226bed336b30528b"
};
let firestoreDb = null;
let firebaseAuth = null;
function initFirebase(){
  if (firestoreDb) return true;
  if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'PASTE_HERE'){ console.error('🔴 initFirebase: FIREBASE_CONFIG.apiKey missing/placeholder'); return false; }
  if (typeof firebase === 'undefined'){ console.error('🔴 initFirebase: firebase SDK not loaded (window.firebase is undefined)'); return false; }
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    firestoreDb = firebase.firestore();
    firebaseAuth = firebase.auth();
    try {
      if (typeof firebase.appCheck === 'function'){
        const appCheck = firebase.appCheck();
        appCheck.activate(
          new firebase.appCheck.ReCaptchaEnterpriseProvider('6Leq58gtAAAAAEg7UyX9ZNOyh2uY8cSbICvV0laU'),
          true
        );
      }
    } catch(e){ /* App Check مو أساسي لعمل الموقع — نتجاهل أي فشل صامت */ }
    return true;
  } catch(e){ console.error('🔴 initFirebase failed:', e); return false; }
}

// إعادة محاولة تحميل مكتبة Firebase عبر JS مباشرة لو فشل تحميلها الأول
// (شبكة جوال ضعيفة/متقطعة وقت فتح الصفحة). بدون هذا، لو فشلت وسم <script>
// الأصلية مرة وحدة، تضل firebase غير معرّفة طول الجلسة وكل محاولة طلب
// تفشل بثبات — حتى لو الشبكة رجعت تشتغل بعدين.
let firebaseSdkRetryPromise = null;
function ensureFirebaseSdkLoaded(timeoutMs){
  if (typeof firebase !== 'undefined') return Promise.resolve(true);
  if (firebaseSdkRetryPromise) return firebaseSdkRetryPromise;
  const urls = [
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js'
  ];
  function loadScript(src){
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('فشل تحميل: ' + src));
      document.head.appendChild(s);
    });
  }
  const loadAll = (async () => {
    try {
      for (const url of urls) await loadScript(url);
      return typeof firebase !== 'undefined';
    } catch(e){
      console.error('🔴 إعادة محاولة تحميل Firebase SDK فشلت:', e);
      return false;
    }
  })();
  const timeout = new Promise(resolve => setTimeout(() => resolve(false), timeoutMs || 8000));
  firebaseSdkRetryPromise = Promise.race([loadAll, timeout]);
  return firebaseSdkRetryPromise;
}

function isFirebaseAuthReady(){
  return initFirebase() && !!firebaseAuth;
}
async function firebaseSignIn(email, password){
  if (!isFirebaseAuthReady()) return { ok:false, error:'not-configured' };
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
    return { ok:true };
  } catch(e){ return { ok:false, error: e.code || e.message }; }
}
function firebaseSignOut(){
  if (firebaseAuth) { try { firebaseAuth.signOut(); } catch(e){} }
}
function firebaseCurrentUser(){
  return (firebaseAuth && firebaseAuth.currentUser) ? firebaseAuth.currentUser : null;
}

/* ---------- Storage adapter: يعمل تلقائيًا حسب مكان الاستضافة ---------- */
function safeSessionGet(key){ try { return sessionStorage.getItem(key); } catch(e){ return null; } }
function safeSessionSet(key, value){ try { sessionStorage.setItem(key, value); } catch(e){ /* بيئة بدون صلاحية تخزين (مثل معاينة معزولة) — نتجاهل بصمت */ } }
function safeSessionRemove(key){ try { sessionStorage.removeItem(key); } catch(e){ /* تجاهل صامت */ } }

const Storage = {
  hasCloud(){
    return ((typeof window !== 'undefined') && !!window.storage) || initFirebase();
  },
  async get(key){
    if (typeof window !== 'undefined' && window.storage){
      try { const res = await window.storage.get(key, true); return res ? res.value : null; }
      catch(e){ return null; }
    }
    if (initFirebase()){
      try {
        const doc = await firestoreDb.collection('filanbon').doc(key).get();
        return doc.exists ? doc.data().value : null;
      } catch(e){ return null; }
    }
    try { return localStorage.getItem('filanbon_' + key); } catch(e){ return null; }
  },
  async set(key, value){
    if (typeof window !== 'undefined' && window.storage){
      try { await window.storage.set(key, value, true); return true; }
      catch(e){ console.error('🔴 Storage.set (window.storage) failed for key:', key, e); return false; }
    }
    if (initFirebase()){
      // ملاحظة: بدون Firebase persistence مفعّل (غير مفعّل بهذا المشروع)،
      // الـ .set() نفسه ما يرجّع نجاح إلا بعد تأكيد حقيقي من السيرفر —
      // فالتحقق الإضافي بقراءة ثانية زايد عن الحاجة ويضاعف فرصة الفشل
      // على شبكة ضعيفة (رحلة ثانية كاملة للسيرفر). هذا الفحص الوحيد كافٍ.
      try { await firestoreDb.collection('filanbon').doc(key).set({ value }); return true; }
      catch(e){ console.error('🔴 Storage.set (Firestore) failed for key:', key, '— Error:', e.code || '', e.message || e); return false; }
    }
    try { localStorage.setItem('filanbon_' + key, value); return true; }
    catch(e){ console.error('🔴 Storage.set (localStorage) failed for key:', key, e); return false; }
  },
  async load(){
    let menuRaw = await this.get('menu-data-live');
    let imagesRaw = await this.get('images-data-live');
    let menu = null, images = null;
    if (menuRaw && imagesRaw){
      try { menu = JSON.parse(menuRaw); images = JSON.parse(imagesRaw); }
      catch(e){ menu = null; images = null; }
    }
    if (!menu || !images){
      menu = JSON.parse(JSON.stringify(DEFAULT_MENU));
      images = JSON.parse(JSON.stringify(DEFAULT_IMAGES));
      this.set('menu-data-live', JSON.stringify(menu));
      this.set('images-data-live', JSON.stringify(images));
    }
    return { menu, images };
  },
  async saveAll(menu, images){
    const a = await this.set('menu-data-live', JSON.stringify(menu));
    const b = await this.set('images-data-live', JSON.stringify(images));
    return a && b;
  },
  async saveMenuOnly(menu){
    return await this.set('menu-data-live', JSON.stringify(menu));
  },
  async loadBranches(){
    let raw = await this.get('branches-live');
    let branches = null;
    if (raw){ try { branches = JSON.parse(raw); } catch(e){ branches = null; } }
    if (!branches || !branches.length){
      branches = [{
        id: 'main',
        name: 'Filanbon Cafe',
        address: CONFIG.address || 'أبوظبي، الإمارات العربية المتحدة',
        addressEn: CONFIG.addressEn || 'Abu Dhabi, United Arab Emirates',
        whatsappNumber: CONFIG.whatsappNumber,
        phoneNumber: CONFIG.phoneNumber,
        mapsUrl: CONFIG.mapsUrl,
        openHour: CONFIG.openHour,
        closeHour: CONFIG.closeHour,
        tables: ['1']
      }];
      this.set('branches-live', JSON.stringify(branches));
    }
    return branches;
  },
  async saveBranches(branches){
    return await this.set('branches-live', JSON.stringify(branches));
  },
  async loadSettings(){
    let raw = await this.get('settings-live');
    let settings = null;
    if (raw){ try { settings = JSON.parse(raw); } catch(e){ settings = null; } }
    if (!settings){
      settings = {
        siteName: 'Filanbon Cafe',
        instagramUrl: CONFIG.instagramUrl,
        tiktokUrl: CONFIG.tiktokUrl,
        whatsappMessage: CONFIG.whatsappMessage,
        primaryColor: '#1f7a4d'
      };
      this.set('settings-live', JSON.stringify(settings));
    }
    return settings;
  },
  async saveSettings(settings){
    return await this.set('settings-live', JSON.stringify(settings));
  },
  async loadOffers(){
    let raw = await this.get('offers-live');
    let offers = null;
    if (raw){ try { offers = JSON.parse(raw); } catch(e){ offers = null; } }
    if (!offers){
      offers = { buyXGetY: { enabled: false, buyCount: 4, freeCount: 1 } };
      this.set('offers-live', JSON.stringify(offers));
    }
    return offers;
  },
  async saveOffers(offers){
    return await this.set('offers-live', JSON.stringify(offers));
  },
  async loadModifierGroups(){
    let raw = await this.get('modifier-groups-live');
    let groups = null;
    if (raw){ try { groups = JSON.parse(raw); } catch(e){ groups = null; } }
    if (!groups){
      groups = [{"id": "grp-sweetness-default", "title": "درجة الحلاوة", "titleEn": "Sweetness", "options": [{"id": "opt-sweet-normal", "name": "حلاوة عادية", "nameEn": "Normal sweetness", "price": 0}, {"id": "opt-sweet-extra", "name": "حلاوة زيادة", "nameEn": "Extra sweetness", "price": 3}, {"id": "opt-sweet-less", "name": "حلاوة أقل", "nameEn": "Less sweetness", "price": 0}]}, {"id": "grp-milk-default", "title": "الحليب", "titleEn": "Milk", "options": [{"id": "opt-milk-full", "name": "حليب كامل الدسم", "nameEn": "Full fat milk", "price": 0}, {"id": "opt-milk-lactose", "name": "خالي من اللاكتوز", "nameEn": "Lactose free", "price": 5}, {"id": "opt-milk-coconut", "name": "حليب جوز الهند", "nameEn": "Coconut milk", "price": 5}, {"id": "opt-milk-almond", "name": "حليب لوز", "nameEn": "Almond milk", "price": 5}, {"id": "opt-milk-oatly", "name": "حليب شوفان", "nameEn": "Oatly milk", "price": 5}]}, {"id": "grp-espresso-default", "title": "شكل الإسبريسو", "titleEn": "Espresso shot", "options": [{"id": "opt-shot-single", "name": "شوت واحد", "nameEn": "Single", "price": 0}, {"id": "opt-shot-extra", "name": "شوت إضافي", "nameEn": "Extra", "price": 5}]}, {"id": "grp-syrup-default", "title": "شراب منكّه", "titleEn": "Flavoured syrup", "options": [{"id": "opt-syrup-vanilla", "name": "فانيلا", "nameEn": "Vanilla", "price": 3}, {"id": "opt-syrup-caramel", "name": "كراميل", "nameEn": "Caramel", "price": 3}, {"id": "opt-syrup-hazelnut", "name": "بندق", "nameEn": "Hazelnut", "price": 3}, {"id": "opt-syrup-whitemocha", "name": "وايت موكا", "nameEn": "White mocha", "price": 3}, {"id": "opt-syrup-saffron", "name": "زعفران", "nameEn": "Saffron", "price": 3}, {"id": "opt-syrup-rose", "name": "ورد", "nameEn": "Rose", "price": 5}]}, {"id": "grp-beans-default", "title": "نوع حبوب القهوة", "titleEn": "Coffee beans", "options": [{"id": "opt-bean-peach", "name": "خوخ", "nameEn": "Peach", "price": 0}, {"id": "opt-bean-strawberry-candy", "name": "حلوى فراولة", "nameEn": "Strawberry candy", "price": 0}, {"id": "opt-bean-lychee", "name": "ليتشي", "nameEn": "Lychee", "price": 0}, {"id": "opt-bean-coconut-toffee", "name": "توفي جوز الهند", "nameEn": "Coconut toffee", "price": 0}, {"id": "opt-bean-passionfruit", "name": "فاكهة العاطفة", "nameEn": "Passion fruit", "price": 0}, {"id": "opt-bean-classic", "name": "كلاسيك", "nameEn": "Classic", "price": 0}]}, {"id": "grp-bean-origin-default", "title": "منشأ حبوب القهوة", "titleEn": "Coffee Bean Origin", "options": [{"id": "opt-origin-brazil", "name": "🇧🇷 برازيلي", "nameEn": "🇧🇷 Brazilian", "price": 0}, {"id": "opt-origin-ethiopia", "name": "🇪🇹 إثيوبي", "nameEn": "🇪🇹 Ethiopian", "price": 0}, {"id": "opt-origin-colombia", "name": "🇨🇴 كولومبي", "nameEn": "🇨🇴 Colombian", "price": 0}]}, {"id": "grp-temperature-default", "title": "درجة الحرارة", "titleEn": "Temperature", "options": [{"id": "opt-hot", "name": "حار", "nameEn": "Hot", "price": 0}, {"id": "opt-cold", "name": "بارد", "nameEn": "Cold", "price": 0}]}];
      this.set('modifier-groups-live', JSON.stringify(groups));
    }
    return groups;
  },
  async saveModifierGroups(groups){
    return await this.set('modifier-groups-live', JSON.stringify(groups));
  },
  async loadLoyalty(){
    let raw = await this.get('loyalty-live');
    let loyalty = null;
    if (raw){ try { loyalty = JSON.parse(raw); } catch(e){ loyalty = null; } }
    if (!loyalty){
      loyalty = {};
      this.set('loyalty-live', JSON.stringify(loyalty));
    }
    return loyalty;
  },
  async saveLoyalty(loyalty){
    return await this.set('loyalty-live', JSON.stringify(loyalty));
  },
  async loadLiveOrders(){
    let raw = await this.get('live-orders-live');
    let orders = null;
    if (raw){ try { orders = JSON.parse(raw); } catch(e){ orders = null; } }
    if (!orders) orders = [];
    return orders;
  },
  async saveLiveOrders(orders){
    return await this.set('live-orders-live', JSON.stringify(orders));
  },
  async addLiveOrder(order){
    let orders = await this.loadLiveOrders();
    orders.unshift(order);
    // تنظيف تلقائي: نحذف الطلبات المكتملة/الملغاة الأقدم من 48 ساعة عشان
    // مستند "الطلبات الحيّة" ما يكبر بلا حدود (Firestore يرفض أي مستند
    // أكبر من 1 ميجابايت) — هذا كان السبب المرجّح لفشل الحفظ بعد تراكم
    // كثير من الطلبات التجريبية.
    const cutoff = Date.now() - 48 * 60 * 60 * 1000;
    orders = orders.filter(o => {
      const isDone = o.status === 'completed' || o.status === 'cancelled';
      if (!isDone) return true;
      const orderTime = o.createdAt ? new Date(o.createdAt).getTime() : Date.now();
      return orderTime >= cutoff;
    });
    const ok = await this.saveLiveOrders(orders);
    return ok ? order : null;
  },
  async updateLiveOrder(orderId, patch){
    const orders = await this.loadLiveOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return null;
    orders[idx] = Object.assign({}, orders[idx], patch);
    await this.saveLiveOrders(orders);
    return orders[idx];
  },
  async loadStaffGroups(){
    let raw = await this.get('staff-groups-live');
    let groups = null;
    if (raw){ try { groups = JSON.parse(raw); } catch(e){ groups = null; } }
    if (!groups) groups = [];
    return groups;
  },
  async saveStaffGroups(groups){
    return await this.set('staff-groups-live', JSON.stringify(groups));
  }
};

/* ---------- Theme color utilities ---------- */
function hexToRgb(hex){
  hex = (hex || '#1f7a4d').replace('#','');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
function rgbToHex(r, g, b){
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
}
function rgbToHsl(r, g, b){
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min){ h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
function hslToRgb(h, s, l){
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0){ r = g = b = l; }
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function hexToHsl(hex){ const { r, g, b } = hexToRgb(hex); return rgbToHsl(r, g, b); }
function hslToHex(h, s, l){ const { r, g, b } = hslToRgb(h, s, l); return rgbToHex(r, g, b); }
function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

function generatePalette(baseHex){
  const { h, s } = hexToHsl(baseHex);
  return {
    '--green-900': hslToHex(h, clamp(s, 20, 90), 16),
    '--green-700': hslToHex(h, clamp(s, 20, 90), 30),
    '--green-600': hslToHex(h, clamp(s, 20, 90), 39),
    '--green-400': hslToHex(h, clamp(s - 10, 15, 80), 62),
    '--green-200': hslToHex(h, clamp(s - 25, 8, 70), 84),
    '--green-100': hslToHex(h, clamp(s - 30, 6, 60), 92),
    '--green-50':  hslToHex(h, clamp(s - 35, 5, 50), 97),
  };
}
function applyTheme(baseHex){
  if (!baseHex) return;
  const palette = generatePalette(baseHex);
  Object.entries(palette).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

/* ---------- General settings ---------- */
let SETTINGS = {};
function applySettings(settings){
  SETTINGS = Object.assign({
    siteName: 'Filanbon Cafe',
    instagramUrl: CONFIG.instagramUrl,
    tiktokUrl: CONFIG.tiktokUrl,
    whatsappMessage: CONFIG.whatsappMessage,
    primaryColor: '#1f7a4d',
    staffAccentColor: '#ffb648'
  }, settings || {});
  CONFIG.instagramUrl = SETTINGS.instagramUrl;
  CONFIG.tiktokUrl = SETTINGS.tiktokUrl;
  CONFIG.whatsappMessage = SETTINGS.whatsappMessage;
  document.querySelectorAll('.hero-title, .footer-name').forEach(el => { el.textContent = SETTINGS.siteName; });
  if (SETTINGS.siteName && typeof IS_STAFF_STANDALONE === 'undefined') document.title = SETTINGS.siteName;
  applyTheme(SETTINGS.primaryColor);
  document.documentElement.style.setProperty('--staff-accent', SETTINGS.staffAccentColor || '#ffb648');
  if (typeof applyConfig === 'function') applyConfig();
}

/* ---------- Offers (storewide buy-X-get-Y) ---------- */
let OFFERS = { buyXGetY: { enabled: false, buyCount: 4, freeCount: 1 } };
function applyOffers(offers){
  OFFERS = Object.assign({ buyXGetY: { enabled: false, buyCount: 4, freeCount: 1 } }, offers || {});
  if (!OFFERS.buyXGetY) OFFERS.buyXGetY = { enabled: false, buyCount: 4, freeCount: 1 };
}

/* ---------- Priced modifier groups (components), owner-controlled, shared with staff site ---------- */
let MODIFIER_GROUPS = [];
function findModifierGroup(id){ return MODIFIER_GROUPS.find(g => g.id === id); }

/* ---------- Customer loyalty program (persists across visits, keyed by phone) ---------- */
let LOYALTY = {};
function normalizePhone(phone){
  return (phone || '').replace(/[^\d]/g, '');
}
function loyaltyPendingFree(entry){
  if (!entry) return 0;
  const buy = OFFERS.buyXGetY.buyCount || 0;
  const free = OFFERS.buyXGetY.freeCount || 0;
  if (buy <= 0 || free <= 0) return 0;
  const earned = Math.floor((entry.totalItems || 0) / (buy + free)) * free;
  return Math.max(0, earned - (entry.redeemedFree || 0));
}
async function recordLoyaltyPurchase(phone, name, itemCount, birthdate){
  const key = normalizePhone(phone);
  if (!key || !itemCount) return;
  const prev = LOYALTY[key] || { name, totalItems: 0, redeemedFree: 0, ordersCount: 0 };
  LOYALTY[key] = {
    name: name || prev.name,
    phone: phone,
    totalItems: (prev.totalItems || 0) + itemCount,
    redeemedFree: prev.redeemedFree || 0,
    ordersCount: (prev.ordersCount || 0) + 1,
    lastOrderAt: Date.now(),
    birthdate: birthdate || prev.birthdate || null
  };
  await Storage.saveLoyalty(LOYALTY);
}

/* ---------- Staff groups (owner-defined, independent from customer menu categories) ---------- */
let STAFF_GROUPS = [];
function findItemById(id){
  for (const cat of MENU){
    const item = cat.items.find(it => it.id === id);
    if (item) return item;
  }
  return null;
}

/* ---------- Helpers ---------- */
let BRANCHES = [];
let ACTIVE_BRANCH_ID = null;

function getBranchIdFromUrl(){
  const params = new URLSearchParams(window.location.search);
  return params.get('branch');
}

function applyActiveBranch(){
  if (!BRANCHES || !BRANCHES.length) return;
  const urlId = getBranchIdFromUrl();
  let branch = BRANCHES.find(b => b.id === urlId) || BRANCHES.find(b => b.id === ACTIVE_BRANCH_ID) || BRANCHES[0];
  ACTIVE_BRANCH_ID = branch.id;

  CONFIG.whatsappNumber = branch.whatsappNumber || CONFIG.whatsappNumber;
  CONFIG.phoneNumber = branch.phoneNumber || CONFIG.phoneNumber;
  CONFIG.mapsUrl = branch.mapsUrl || CONFIG.mapsUrl;
  CONFIG.openHour = (branch.openHour !== undefined && branch.openHour !== null) ? Number(branch.openHour) : CONFIG.openHour;
  CONFIG.closeHour = (branch.closeHour !== undefined && branch.closeHour !== null) ? Number(branch.closeHour) : CONFIG.closeHour;
  CONFIG.address = branch.address || '';
  CONFIG.addressEn = branch.addressEn || '';

  if (typeof applyConfig === 'function') applyConfig();
  if (typeof updateOpenStatus === 'function') updateOpenStatus();
  if (typeof renderHoursList === 'function') renderHoursList();
  if (typeof buildTableChips === 'function') buildTableChips(branch.tables);

  renderBranchSwitcher();
}

function switchBranch(id){
  ACTIVE_BRANCH_ID = id;
  const url = new URL(window.location.href);
  url.searchParams.set('branch', id);
  window.history.replaceState({}, '', url);
  applyActiveBranch();
}

function renderBranchSwitcher(){
  let wrap = document.getElementById('branchSwitcherWrap');
  if (BRANCHES.length <= 1){
    if (wrap) wrap.remove();
    return;
  }
  const addrEl = document.querySelector('.hero-address');
  if (!addrEl) return;
  if (!wrap){
    wrap = document.createElement('div');
    wrap.id = 'branchSwitcherWrap';
    wrap.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;';
    addrEl.insertAdjacentElement('afterend', wrap);
  }
  wrap.innerHTML = '';
  BRANCHES.forEach(b => {
    const pill = document.createElement('button');
    pill.type = 'button';
    const active = b.id === ACTIVE_BRANCH_ID;
    pill.textContent = (LANG === 'en' && b.nameEn) ? b.nameEn : b.name;
    pill.style.cssText = `border-radius:99px;padding:6px 14px;font-size:.78rem;font-weight:700;border:1.5px solid ${active ? 'var(--green-700)' : 'var(--green-200)'};background:${active ? 'var(--green-700)' : '#fff'};color:${active ? '#fff' : 'var(--green-900)'};cursor:pointer;`;
    pill.onclick = () => switchBranch(b.id);
    wrap.appendChild(pill);
  });
}

function slugify(str){
  return 'item_' + str.toString().toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF]+/g,'_').replace(/^_+|_+$/g,'') + '_' + Date.now().toString(36).slice(-4);
}

function resizeImageFile(file, maxDim){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width, h = img.height;
        const scale = Math.min(1, maxDim / Math.max(w, h));
        w = Math.round(w * scale); h = Math.round(h * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,w,h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---------- Admin styles ---------- */
(function injectAdminStyles(){
  const css = `
  .admin-fab{
    position:fixed;bottom:18px;left:18px;z-index:55;
    width:44px;height:44px;border-radius:50%;
    background:rgba(15,61,46,.55);color:#fff;border:none;
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 4px 14px rgba(0,0,0,.2);cursor:pointer;
    opacity:.55;transition:opacity .2s, transform .06s;
  }
  .admin-fab:active{transform:scale(.88);}
  .admin-fab:hover{opacity:1;}
  .admin-overlay{
    position:fixed;inset:0;z-index:200;background:rgba(15,30,25,.55);
    display:none;align-items:flex-end;justify-content:center;
  }
  .admin-overlay.open{display:flex;}
  .admin-sheet{
    background:#fff;width:100%;max-width:520px;max-height:92vh;overflow-y:auto;
    border-radius:20px 20px 0 0;padding:20px 18px 30px;box-sizing:border-box;
    font-family:inherit;direction:rtl;
  }
  .admin-sheet h2{color:var(--green-900);font-size:1.15rem;margin:0 0 14px;display:flex;justify-content:space-between;align-items:center;}
  .admin-close{width:32px;height:32px;border-radius:50%;background:var(--green-100,#e3faec);color:var(--green-700,#1f7a4d);border:none;font-size:1.1rem;cursor:pointer;}
  .admin-login input{
    width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;
    border:1.5px solid #ddd;font-size:1rem;margin-bottom:12px;direction:ltr;text-align:center;
  }
  .admin-btn{
    width:100%;background:var(--green-700,#1f7a4d);color:#fff;border:none;
    padding:13px;border-radius:12px;font-weight:700;font-size:.95rem;cursor:pointer;
  }
  .admin-btn.secondary{background:var(--green-100,#e3faec);color:var(--green-900,#0f3d2e);}
  .admin-btn.danger{background:#e74c3c;}
  .admin-btn.small{width:auto;padding:8px 14px;font-size:.82rem;}
  .admin-cat{border:1px solid var(--green-100,#e3faec);border-radius:14px;margin-bottom:14px;overflow:hidden;}
  .admin-cat-head{background:var(--green-50,#f4fdf8);padding:10px 14px;font-weight:800;color:var(--green-900,#0f3d2e);display:flex;justify-content:space-between;align-items:center;}
  .admin-item-row{display:flex;gap:10px;align-items:center;padding:10px 14px;border-top:1px solid #f1f1f1;}
  .admin-item-row img{width:48px;height:48px;border-radius:10px;object-fit:cover;flex-shrink:0;background:#eee;}
  .admin-item-fields{flex:1;min-width:0;}
  .admin-item-fields input, .admin-item-fields select{
    width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;
    padding:7px 9px;font-size:.85rem;margin-bottom:5px;
  }
  .admin-item-actions{display:flex;flex-direction:column;gap:6px;}
  .admin-icon-btn{width:30px;height:30px;border-radius:8px;border:none;background:#f2f2f2;cursor:pointer;font-size:.9rem;}
  .admin-icon-btn.upload{background:var(--green-100,#e3faec);}
  .admin-icon-btn.del{background:#fde8e6;color:#e74c3c;}
  .admin-add-item-btn{margin:10px 14px 12px;}
  .admin-hint{font-size:.75rem;color:#888;margin:0 0 14px;line-height:1.5;}
  .inline-dialog-overlay{
    position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:400;
    display:flex;align-items:center;justify-content:center;padding:20px;
  }
  .inline-dialog-box{
    background:#fff;border-radius:16px;padding:20px;width:100%;max-width:340px;
    box-shadow:0 10px 30px rgba(0,0,0,.3);
  }
  .inline-dialog-title{margin:0 0 12px;font-weight:800;font-size:.95rem;color:#20252b;}
  .inline-dialog-input{
    width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:10px;
    padding:10px 12px;font-size:.9rem;font-family:inherit;margin-bottom:14px;
  }
  .inline-dialog-btns{display:flex;gap:10px;}
  .inline-dialog-btns .admin-btn{flex:1;margin:0;}
  .admin-toast{
    position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
    background:var(--green-900,#0f3d2e);color:#fff;padding:10px 18px;border-radius:99px;
    font-size:.85rem;z-index:300;box-shadow:0 6px 16px rgba(0,0,0,.25);
  }
  /* ---- Owner portal mode: صفحة مستقلة بملء الشاشة للمالك ---- */
  body.owner-portal-mode > *:not(.admin-overlay):not(.inline-dialog-overlay):not(.admin-toast){ display:none !important; }
  body.staff-portal-mode > *:not(.staff-overlay):not(.inline-dialog-overlay):not(.admin-toast):not(#cartOverlay):not(#optionsOverlay):not(#checkoutOverlay):not(#successOverlay):not(.cart-bar):not(#componentsOverlay){ display:none !important; }

  /* ---- Staff portal: تصميم داكن منفصل تمامًا عن الزبون والمالك ---- */
  .staff-overlay{
    position:fixed;inset:0;z-index:200;background:#14181b;
    display:none;overflow-y:auto;font-family:inherit;direction:rtl;
  }
  .staff-overlay.open{display:block;}
  body.staff-portal-mode #cartOverlay,
  body.staff-portal-mode #optionsOverlay,
  body.staff-portal-mode #checkoutOverlay,
  body.staff-portal-mode #successOverlay{
    z-index:250;
  }
  body.staff-portal-mode .cart-bar{ z-index:250; }
  .staff-login-wrap{
    min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;
  }
  .staff-login-card{
    background:#1e2529;border:1px solid #2c3438;border-radius:20px;
    padding:26px 22px;width:100%;max-width:360px;box-sizing:border-box;
  }
  .staff-login-card h2{color:#fff;font-size:1.2rem;margin:0 0 16px;text-align:center;}
  .staff-badge{
    display:block;text-align:center;background:var(--staff-accent, #ffb648);color:#2a1b00;font-weight:800;
    font-size:.75rem;padding:5px 10px;border-radius:99px;margin:0 auto 16px;width:fit-content;
  }
  .staff-login-card input{
    width:100%;box-sizing:border-box;padding:13px 14px;border-radius:12px;
    border:1.5px solid #363f44;background:#12171a;color:#fff;font-size:1rem;
    margin-bottom:12px;direction:ltr;text-align:center;
  }
  .staff-btn{
    width:100%;background:var(--staff-accent, #ffb648);color:#2a1b00;border:none;
    padding:13px;border-radius:12px;font-weight:800;font-size:.95rem;cursor:pointer;
  }
  .staff-btn.secondary{background:#2c3438;color:#fff;}
  .staff-hint{font-size:.75rem;color:#8a9296;margin:14px 0 0;line-height:1.6;text-align:center;}
  .staff-link{display:block;text-align:center;margin-top:16px;color:var(--staff-accent, #ffb648);font-size:.82rem;text-decoration:none;}

  .staff-topbar{
    position:sticky;top:0;z-index:5;background:#1e2529;border-bottom:1px solid #2c3438;
    padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:10px;
  }
  .staff-topbar-title{color:#fff;font-weight:800;font-size:1rem;}
  .staff-tabs{display:flex;gap:8px;}
  .staff-tab-btn{
    background:#2c3438;color:#c7ccce;border:none;padding:9px 14px;border-radius:99px;
    font-weight:700;font-size:.82rem;cursor:pointer;
  }
  .staff-tab-btn.active{background:var(--staff-accent, #ffb648);color:#2a1b00;}
  .staff-logout-btn{
    background:none;border:1px solid #3a4247;color:#c7ccce;border-radius:99px;
    padding:8px 12px;font-size:.78rem;cursor:pointer;
  }
  .staff-content{padding:16px;max-width:720px;margin:0 auto;}
  .staff-cat-grid{
    display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;
  }
  .staff-cat-tile{
    background:#1e2529;border:1px solid #2c3438;border-radius:16px;
    padding:22px 12px;text-align:center;cursor:pointer;transition:.15s;
  }
  .staff-cat-tile:active{background:#262e32;}
  .staff-cat-tile .emoji{font-size:2rem;display:block;margin-bottom:8px;}
  .staff-cat-tile .title{color:#fff;font-weight:800;font-size:.88rem;}
  .staff-back-row{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
  .staff-back-btn{
    background:#2c3438;color:#fff;border:none;width:34px;height:34px;border-radius:10px;
    font-size:1rem;cursor:pointer;flex-shrink:0;
  }
  .staff-back-title{color:#fff;font-weight:800;font-size:1rem;}
  .staff-prod-grid{display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;}
  .staff-prod-tile{
    background:#1e2529;border:1px solid #2c3438;border-radius:14px;overflow:hidden;cursor:pointer;
  }
  .staff-prod-tile img{width:100%;aspect-ratio:1;object-fit:cover;background:#2c3438;}
  .staff-prod-tile .info{padding:10px;}
  .staff-prod-tile .name{color:#fff;font-weight:700;font-size:.78rem;line-height:1.35;min-height:2.1em;}
  .staff-prod-tile .price{color:var(--staff-accent, #ffb648);font-weight:800;font-size:.85rem;margin-top:4px;}
  .staff-prod-tile .price.disabled{color:#6d757a;font-size:.72rem;}
  body.owner-portal-mode{ background:var(--green-50,#f4fdf8); }
  body.owner-portal-mode .admin-overlay{
    align-items:center; padding:20px; background:var(--green-900,#0f3d2e);
  }
  body.owner-portal-mode .admin-sheet{
    max-width:520px; border-radius:20px; max-height:90vh; overflow-y:auto; width:100%;
  }
  .owner-portal-badge{
    display:inline-block;background:var(--green-100,#e3faec);color:var(--green-700,#1f7a4d);
    font-size:.72rem;font-weight:800;padding:4px 10px;border-radius:99px;margin-bottom:10px;
  }
  .owner-portal-link{
    display:inline-block;font-size:.78rem;color:var(--green-700,#1f7a4d);text-decoration:underline;
    margin-top:6px;cursor:pointer;
  }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ---------- Toast ---------- */
function adminToast(msg){
  const el = document.createElement('div');
  el.className = 'admin-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

/* ---------- Build admin UI shell ---------- */
let adminOverlayEl, adminSheetEl;
function showInlinePrompt(title, defaultValue, onConfirm){
  const overlay = document.createElement('div');
  overlay.className = 'inline-dialog-overlay';
  const box = document.createElement('div');
  box.className = 'inline-dialog-box';
  const h = document.createElement('p');
  h.className = 'inline-dialog-title';
  h.textContent = title;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = defaultValue || '';
  input.className = 'inline-dialog-input';
  const btnRow = document.createElement('div');
  btnRow.className = 'inline-dialog-btns';
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'admin-btn secondary small';
  cancelBtn.textContent = 'إلغاء';
  const okBtn = document.createElement('button');
  okBtn.className = 'admin-btn small';
  okBtn.textContent = 'موافق';
  const close = () => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); };
  okBtn.onclick = () => { const v = input.value.trim(); close(); if (v) onConfirm(v); };
  cancelBtn.onclick = close;
  overlay.onclick = (e) => { if (e.target === overlay) close(); };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') okBtn.click(); });
  btnRow.appendChild(cancelBtn);
  btnRow.appendChild(okBtn);
  box.appendChild(h);
  box.appendChild(input);
  box.appendChild(btnRow);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  setTimeout(() => input.focus(), 150);
}

function showInlineConfirm(title, onConfirm){
  const overlay = document.createElement('div');
  overlay.className = 'inline-dialog-overlay';
  const box = document.createElement('div');
  box.className = 'inline-dialog-box';
  const h = document.createElement('p');
  h.className = 'inline-dialog-title';
  h.textContent = title;
  const btnRow = document.createElement('div');
  btnRow.className = 'inline-dialog-btns';
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'admin-btn secondary small';
  cancelBtn.textContent = 'إلغاء';
  const okBtn = document.createElement('button');
  okBtn.className = 'admin-btn danger small';
  okBtn.textContent = 'تأكيد';
  const close = () => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); };
  okBtn.onclick = () => { close(); onConfirm(); };
  cancelBtn.onclick = close;
  overlay.onclick = (e) => { if (e.target === overlay) close(); };
  btnRow.appendChild(cancelBtn);
  btnRow.appendChild(okBtn);
  box.appendChild(h);
  box.appendChild(btnRow);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

function ensureAdminOverlay(){
  if (adminOverlayEl) return;
  adminOverlayEl = document.createElement('div');
  adminOverlayEl.className = 'admin-overlay';
  adminSheetEl = document.createElement('div');
  adminSheetEl.className = 'admin-sheet';
  adminOverlayEl.appendChild(adminSheetEl);
  document.body.appendChild(adminOverlayEl);
  adminOverlayEl.addEventListener('click', (e) => {
    if (ADMIN_MODE) return; // في بوابة المالك المستقلة لا يوجد شي تحتها لنكشفه
    if (e.target === adminOverlayEl) adminOverlayEl.classList.remove('open');
  });
}

function openAdminOverlay(){ ensureAdminOverlay(); adminOverlayEl.classList.add('open'); }
function closeAdminOverlay(){ if (adminOverlayEl) adminOverlayEl.classList.remove('open'); }

/* ---------- Staff overlay (separate portal: ordering + loyalty) ---------- */
let staffOverlayEl = null, staffSheetEl = null;
let staffTab = 'order'; // 'order' | 'loyalty'
let staffCategoryIdx = null; // null = category grid, else index into MENU

function ensureStaffOverlay(){
  if (staffOverlayEl) return;
  staffOverlayEl = document.createElement('div');
  staffOverlayEl.className = 'staff-overlay';
  staffSheetEl = document.createElement('div');
  staffOverlayEl.appendChild(staffSheetEl);
  document.body.appendChild(staffOverlayEl);
}
function openStaffOverlay(){ ensureStaffOverlay(); staffOverlayEl.classList.add('open'); }

function currentStaffPassword(){
  return (SETTINGS.staffPassword && SETTINGS.staffPassword.trim()) || STAFF_PASSWORD;
}

function showStaffLogin(){
  ensureStaffOverlay();
  staffSheetEl.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'staff-login-wrap';
  const card = document.createElement('div');
  card.className = 'staff-login-card';

  const badge = document.createElement('div');
  badge.className = 'staff-badge';
  badge.textContent = '☕ بوابة الموظف';
  card.appendChild(badge);

  const h2 = document.createElement('h2');
  h2.textContent = 'دخول الموظف';
  card.appendChild(h2);

  if (SETTINGS.staffEnabled === false){
    const off = document.createElement('p');
    off.className = 'staff-hint';
    off.textContent = 'نظام الموظف معطّل حاليًا من المشرف. تواصل مع المشرف لتفعيله.';
    card.appendChild(off);
    wrap.appendChild(card);
    staffSheetEl.appendChild(wrap);
    openStaffOverlay();
    return;
  }

  const input = document.createElement('input');
  input.type = 'password';
  input.placeholder = 'كلمة مرور الموظف';
  card.appendChild(input);

  const btn = document.createElement('button');
  btn.className = 'staff-btn';
  btn.textContent = 'دخول';
  btn.onclick = () => {
    if (input.value === currentStaffPassword()){
      safeSessionSet('filanbon_staff_auth', '1');
      staffTab = 'order';
      staffCategoryIdx = null;
      renderStaffPanel();
    } else {
      input.style.borderColor = '#e74c3c';
      input.value = '';
      input.placeholder = 'كلمة مرور خاطئة، حاول مرة أخرى';
    }
  };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
  card.appendChild(btn);

  const hint = document.createElement('p');
  hint.className = 'staff-hint';
  hint.textContent = 'صفحة خاصة بفريق العمل: تسوية طلبات وتسليم مجانيات برنامج الولاء.';
  card.appendChild(hint);

  const link = document.createElement('a');
  link.className = 'staff-link';
  link.textContent = '🔗 فتح صفحة المنيو كما يراها العميل';
  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete('staff');
  link.href = cleanUrl.toString();
  link.target = '_blank';
  link.rel = 'noopener';
  card.appendChild(link);

  wrap.appendChild(card);
  staffSheetEl.appendChild(wrap);
  openStaffOverlay();
  setTimeout(() => input.focus(), 200);
}

function renderStaffPanel(){
  ensureStaffOverlay();
  staffSheetEl.innerHTML = '';

  const topbar = document.createElement('div');
  topbar.className = 'staff-topbar';

  const title = document.createElement('div');
  title.className = 'staff-topbar-title';
  title.textContent = '☕ نظام الموظف';
  topbar.appendChild(title);

  const tabs = document.createElement('div');
  tabs.className = 'staff-tabs';
  const orderTabBtn = document.createElement('button');
  orderTabBtn.className = 'staff-tab-btn' + (staffTab === 'order' ? ' active' : '');
  orderTabBtn.textContent = '🧾 طلب جديد';
  orderTabBtn.onclick = () => { staffTab = 'order'; staffCategoryIdx = null; renderStaffPanel(); };
  const loyaltyTabBtn = document.createElement('button');
  loyaltyTabBtn.className = 'staff-tab-btn' + (staffTab === 'loyalty' ? ' active' : '');
  loyaltyTabBtn.textContent = '👥 الولاء';
  loyaltyTabBtn.onclick = () => { staffTab = 'loyalty'; renderStaffPanel(); };
  tabs.appendChild(orderTabBtn);
  tabs.appendChild(loyaltyTabBtn);
  topbar.appendChild(tabs);

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'staff-logout-btn';
  logoutBtn.textContent = 'خروج';
  logoutBtn.onclick = () => {
    safeSessionRemove('filanbon_staff_auth');
    Object.keys(CART).forEach(k => delete CART[k]);
    renderCartBar();
    showStaffLogin();
  };
  topbar.appendChild(logoutBtn);

  staffSheetEl.appendChild(topbar);

  const content = document.createElement('div');
  content.className = 'staff-content';
  staffSheetEl.appendChild(content);

  if (staffTab === 'order') renderStaffOrderTab(content);
  else renderLoyaltySection(content, () => renderStaffPanel());

  openStaffOverlay();
  renderCartBar();
}

function renderStaffOrderTab(content){
  if (staffCategoryIdx === null){
    if (!STAFF_GROUPS.length){
      const empty = document.createElement('p');
      empty.style.cssText = 'color:#8a9296;font-size:.85rem;text-align:center;padding:30px 10px;';
      empty.textContent = 'المشرف لسا ما جهّز مجموعات المنتجات لهذه الصفحة. تواصل معه.';
      content.appendChild(empty);
      return;
    }
    const grid = document.createElement('div');
    grid.className = 'staff-cat-grid';
    const catEmojis = ['☕','🍵','🍹','🧋','🍰','🥤','✨','🫖','⭐'];
    STAFF_GROUPS.forEach((grp, idx) => {
      const tile = document.createElement('div');
      tile.className = 'staff-cat-tile';
      const emoji = document.createElement('span');
      emoji.className = 'emoji';
      emoji.textContent = grp.emoji || catEmojis[idx % catEmojis.length];
      const titleEl = document.createElement('div');
      titleEl.className = 'title';
      titleEl.textContent = LANG === 'en' ? (grp.titleEn || grp.title) : grp.title;
      tile.appendChild(emoji);
      tile.appendChild(titleEl);
      tile.onclick = () => { staffCategoryIdx = idx; renderStaffPanel(); };
      grid.appendChild(tile);
    });
    content.appendChild(grid);
    return;
  }

  const grp = STAFF_GROUPS[staffCategoryIdx];
  if (!grp){ staffCategoryIdx = null; renderStaffOrderTab(content); return; }

  const backRow = document.createElement('div');
  backRow.className = 'staff-back-row';
  const backBtn = document.createElement('button');
  backBtn.className = 'staff-back-btn';
  backBtn.textContent = '‹';
  backBtn.onclick = () => { staffCategoryIdx = null; renderStaffPanel(); };
  const backTitle = document.createElement('div');
  backTitle.className = 'staff-back-title';
  backTitle.textContent = LANG === 'en' ? (grp.titleEn || grp.title) : grp.title;
  backRow.appendChild(backBtn);
  backRow.appendChild(backTitle);
  content.appendChild(backRow);

  const items = (grp.itemIds || []).map(findItemById).filter(Boolean);
  if (!items.length){
    const empty = document.createElement('p');
    empty.style.cssText = 'color:#8a9296;font-size:.85rem;text-align:center;padding:20px 10px;';
    empty.textContent = 'ما فيه منتجات بهذه المجموعة بعد.';
    content.appendChild(empty);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'staff-prod-grid';
  items.forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'staff-prod-tile';
    const img = document.createElement('img');
    img.src = IMAGES[item.img] || '';
    img.alt = itemName(item);
    tile.appendChild(img);
    const info = document.createElement('div');
    info.className = 'info';
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = itemName(item);
    info.appendChild(name);
    const priceEl = document.createElement('div');
    if (item.price === null || item.price === undefined){
      priceEl.className = 'price disabled';
      priceEl.textContent = 'قريبًا';
    } else {
      priceEl.className = 'price';
      priceEl.innerHTML = effectivePrice(item).toFixed(2) + ' ' + currencySVG;
    }
    info.appendChild(priceEl);
    tile.appendChild(info);
    if (item.price !== null && item.price !== undefined){
      tile.onclick = () => openItemSheet(item);
    } else {
      tile.style.opacity = '.5';
    }
    grid.appendChild(tile);
  });
  content.appendChild(grid);
}

/* ---------- Login screen ---------- */
function showAdminLogin(){
  ensureAdminOverlay();
  adminSheetEl.innerHTML = '';
  adminSheetEl.className = 'admin-sheet admin-login';

  if (ADMIN_MODE){
    const badge = document.createElement('div');
    badge.className = 'owner-portal-badge';
    badge.textContent = '🔒 بوابة المشرف';
    adminSheetEl.appendChild(badge);
  }

  const h2 = document.createElement('h2');
  h2.innerHTML = `<span>لوحة تحكم المشرف</span>`;
  if (!ADMIN_MODE){
    const closeBtn = document.createElement('button');
    closeBtn.className = 'admin-close'; closeBtn.textContent = '→';
    closeBtn.onclick = closeAdminOverlay;
    h2.appendChild(closeBtn);
  }
  adminSheetEl.appendChild(h2);

  const useFirebaseAuth = isFirebaseAuthReady();

  if (useFirebaseAuth){
    const secureBadge = document.createElement('div');
    secureBadge.className = 'owner-portal-badge';
    secureBadge.style.background = '#e3f0fa';
    secureBadge.style.color = '#1a5f8f';
    secureBadge.textContent = '🔐 حماية Firebase مفعّلة';
    adminSheetEl.appendChild(secureBadge);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'البريد الإلكتروني';
    emailInput.style.direction = 'ltr';
    adminSheetEl.appendChild(emailInput);

    const passInput = document.createElement('input');
    passInput.type = 'password';
    passInput.placeholder = 'كلمة المرور';
    passInput.style.marginTop = '8px';
    adminSheetEl.appendChild(passInput);

    const btn = document.createElement('button');
    btn.className = 'admin-btn';
    btn.style.marginTop = '10px';
    btn.textContent = 'دخول';
    btn.onclick = async () => {
      btn.disabled = true;
      btn.textContent = 'جاري التحقق...';
      const res = await firebaseSignIn(emailInput.value.trim(), passInput.value);
      if (res.ok){
        safeSessionSet('filanbon_admin_auth', '1');
        btn.textContent = 'جاري تحميل البيانات...';
        await loadStorageState();
        renderAdminPanel();
      } else {
        btn.disabled = false;
        btn.textContent = 'دخول';
        passInput.style.borderColor = '#e74c3c';
        passInput.value = '';
        passInput.placeholder = 'بيانات دخول خاطئة، حاول مرة أخرى';
      }
    };
    passInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
    adminSheetEl.appendChild(btn);
  } else {
    const input = document.createElement('input');
    input.type = 'password';
    input.placeholder = 'كلمة المرور';
    adminSheetEl.appendChild(input);

    const btn = document.createElement('button');
    btn.className = 'admin-btn';
    btn.textContent = 'دخول';
    btn.onclick = async () => {
      if (input.value === currentOwnerPassword()){
        safeSessionSet('filanbon_admin_auth', '1');
        btn.disabled = true;
        btn.textContent = 'جاري تحميل البيانات...';
        await loadStorageState();
        renderAdminPanel();
      } else {
        input.style.borderColor = '#e74c3c';
        input.value = '';
        input.placeholder = 'كلمة مرور خاطئة، حاول مرة أخرى';
      }
    };
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
    adminSheetEl.appendChild(btn);
  }

  const hint = document.createElement('p');
  hint.className = 'admin-hint';
  if (typeof window !== 'undefined' && window.storage){
    hint.textContent = 'التغييرات تُحفظ تلقائيًا وتظهر لكل الزبائن فورًا.';
  } else if (useFirebaseAuth){
    hint.textContent = '✅ متصل بـ Firebase مع تسجيل دخول حقيقي — التعديلات تظهر لكل الزبائن فورًا، والكتابة محمية بمصادقة Google.';
  } else if (initFirebase()){
    hint.textContent = '⚠️ متصل بـ Firebase لكن بدون تسجيل دخول محمي — فعّل Email/Password Authentication لحماية أقوى (راجع تعليمات FIREBASE_CONFIG).';
  } else {
    hint.textContent = 'تنبيه: هذه النسخة مستضافة خارج Claude، لذا التغييرات تُحفظ على هذا الجهاز/المتصفح فقط ولن تظهر لباقي الزبائن — تحتاج قاعدة بيانات خارجية لمشاركة التعديلات مع الجميع.';
  }
  adminSheetEl.appendChild(hint);

  if (ADMIN_MODE){
    const link = document.createElement('a');
    link.className = 'owner-portal-link';
    link.textContent = '🔗 فتح صفحة المنيو كما يراها العميل';
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('admin');
    link.href = cleanUrl.toString();
    link.target = '_blank';
    link.rel = 'noopener';
    adminSheetEl.appendChild(link);
  }

  openAdminOverlay();
  setTimeout(() => { const first = adminSheetEl.querySelector('input'); if (first) first.focus(); }, 200);
}

/* ---------- Main admin panel ---------- */
let adminTab = 'products';

function renderAdminPanel(){
  ensureAdminOverlay();
  adminSheetEl.innerHTML = '';
  adminSheetEl.className = 'admin-sheet';

  if (ADMIN_MODE){
    const badge = document.createElement('div');
    badge.className = 'owner-portal-badge';
    badge.textContent = '🔒 بوابة المشرف';
    adminSheetEl.appendChild(badge);
  }

  const h2 = document.createElement('h2');
  h2.innerHTML = `<span>لوحة تحكم المشرف</span>`;
  if (!ADMIN_MODE){
    const closeBtn = document.createElement('button');
    closeBtn.className = 'admin-close'; closeBtn.textContent = '→';
    closeBtn.onclick = closeAdminOverlay;
    h2.appendChild(closeBtn);
  }
  adminSheetEl.appendChild(h2);

  if (ADMIN_MODE){
    const link = document.createElement('a');
    link.className = 'owner-portal-link';
    link.textContent = '🔗 فتح صفحة المنيو كما يراها العميل';
    link.style.display = 'block';
    link.style.marginBottom = '10px';
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('admin');
    link.href = cleanUrl.toString();
    link.target = '_blank';
    link.rel = 'noopener';
    adminSheetEl.appendChild(link);
  }

  const hint = document.createElement('p');
  hint.className = 'admin-hint';
  if (typeof window !== 'undefined' && window.storage){
    hint.textContent = '✅ متصل بالتخزين السحابي — أي تعديل يُحفظ وينعكس على الزبائن مباشرة.';
  } else if (isFirebaseAuthReady() && firebaseCurrentUser()){
    hint.textContent = '🔐 متصل بـ Firebase — الجلسة محمية بتسجيل دخول حقيقي (' + firebaseCurrentUser().email + ').';
  } else if (initFirebase()){
    hint.textContent = '✅ متصل بالتخزين السحابي (Firebase) — أي تعديل يظهر لكل الزبائن.';
  } else {
    hint.textContent = '⚠️ وضع محلي فقط (بدون تخزين سحابي) — التعديلات تُحفظ على هذا الجهاز فقط.';
  }
  adminSheetEl.appendChild(hint);

  // tab switcher
  const tabsWrap = document.createElement('div');
  tabsWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;';
  const tabProducts = document.createElement('button');
  tabProducts.className = 'admin-btn small' + (adminTab === 'products' ? '' : ' secondary');
  tabProducts.style.cssText = 'flex:1 1 28%;';
  tabProducts.textContent = '🧋 المنتجات';
  tabProducts.onclick = () => { adminTab = 'products'; renderAdminPanel(); };
  const tabBranches = document.createElement('button');
  tabBranches.className = 'admin-btn small' + (adminTab === 'branches' ? '' : ' secondary');
  tabBranches.style.cssText = 'flex:1 1 28%;';
  tabBranches.textContent = '📍 الفروع والطاولات';
  tabBranches.onclick = () => { adminTab = 'branches'; renderAdminPanel(); };
  const tabSettings = document.createElement('button');
  tabSettings.className = 'admin-btn small' + (adminTab === 'settings' ? '' : ' secondary');
  tabSettings.style.cssText = 'flex:1 1 28%;';
  tabSettings.textContent = '⚙ الإعدادات';
  tabSettings.onclick = () => { adminTab = 'settings'; renderAdminPanel(); };
  const tabOffers = document.createElement('button');
  tabOffers.className = 'admin-btn small' + (adminTab === 'offers' ? '' : ' secondary');
  tabOffers.style.cssText = 'flex:1 1 28%;';
  tabOffers.textContent = '🎁 العروض';
  tabOffers.onclick = () => { adminTab = 'offers'; renderAdminPanel(); };
  const tabStaffGroups = document.createElement('button');
  tabStaffGroups.className = 'admin-btn small' + (adminTab === 'staffgroups' ? '' : ' secondary');
  tabStaffGroups.style.cssText = 'flex:1 1 28%;';
  tabStaffGroups.textContent = '👔 مجموعات الموظف';
  tabStaffGroups.onclick = () => { adminTab = 'staffgroups'; renderAdminPanel(); };
  const tabModifiers = document.createElement('button');
  tabModifiers.className = 'admin-btn small' + (adminTab === 'modifiers' ? '' : ' secondary');
  tabModifiers.style.cssText = 'flex:1 1 28%;';
  tabModifiers.textContent = '🧩 المكونات';
  tabModifiers.onclick = () => { adminTab = 'modifiers'; renderAdminPanel(); };
  tabsWrap.appendChild(tabProducts);
  tabsWrap.appendChild(tabBranches);
  tabsWrap.appendChild(tabOffers);
  tabsWrap.appendChild(tabStaffGroups);
  tabsWrap.appendChild(tabModifiers);
  tabsWrap.appendChild(tabSettings);
  adminSheetEl.appendChild(tabsWrap);

  const body = document.createElement('div');
  adminSheetEl.appendChild(body);

  if (adminTab === 'products') renderAdminProductsTab(body);
  else if (adminTab === 'branches') renderAdminBranchesTab(body);
  else if (adminTab === 'offers') renderAdminOffersTab(body);
  else if (adminTab === 'staffgroups') renderAdminStaffGroupsTab(body);
  else if (adminTab === 'modifiers') renderAdminModifiersTab(body);
  else renderAdminSettingsTab(body);

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'admin-btn secondary';
  logoutBtn.style.marginTop = '8px';
  logoutBtn.textContent = 'تسجيل الخروج';
  logoutBtn.onclick = () => {
    safeSessionRemove('filanbon_admin_auth');
    firebaseSignOut();
    if (ADMIN_MODE) showAdminLogin();
    else closeAdminOverlay();
  };
  adminSheetEl.appendChild(logoutBtn);
}

/* ---------- Products tab ---------- */
function renderAdminProductsTab(body){
  MENU.forEach((cat, catIdx) => {
    const catBox = document.createElement('div');
    catBox.className = 'admin-cat';

    const catHead = document.createElement('div');
    catHead.className = 'admin-cat-head';
    catHead.innerHTML = `<span>${cat.title} (${cat.titleEn || ''})</span>`;
    catBox.appendChild(catHead);

    cat.items.forEach((item, itemIdx) => {
      const row = document.createElement('div');
      row.className = 'admin-item-row';

      const img = document.createElement('img');
      img.src = IMAGES[item.img] || '';
      row.appendChild(img);

      const fields = document.createElement('div');
      fields.className = 'admin-item-fields';

      const nameInput = document.createElement('input');
      nameInput.value = item.name || '';
      nameInput.placeholder = 'اسم المنتج';
      fields.appendChild(nameInput);

      const priceInput = document.createElement('input');
      priceInput.type = 'number';
      priceInput.step = '0.01';
      priceInput.value = (item.price === null || item.price === undefined) ? '' : item.price;
      priceInput.placeholder = 'السعر (اتركه فارغًا = قريبًا)';
      fields.appendChild(priceInput);

      const discountRow = document.createElement('div');
      discountRow.style.cssText = 'display:flex;gap:6px;';
      const discountType = document.createElement('select');
      discountType.style.cssText = 'font-size:.8rem;flex:0 0 auto;width:auto;';
      [['', 'بدون خصم'], ['percent', 'نسبة %'], ['fixed', 'مبلغ ثابت']].forEach(([val, label]) => {
        const opt = document.createElement('option');
        opt.value = val; opt.textContent = label;
        if ((item.discountType || '') === val) opt.selected = true;
        discountType.appendChild(opt);
      });
      const discountValue = document.createElement('input');
      discountValue.type = 'number';
      discountValue.step = '0.01';
      discountValue.min = '0';
      discountValue.placeholder = 'قيمة الخصم';
      discountValue.style.cssText = 'font-size:.8rem;flex:1;width:auto;';
      discountValue.value = item.discountValue || '';
      discountValue.disabled = !item.discountType;
      discountType.onchange = () => { discountValue.disabled = !discountType.value; commit(); };
      discountRow.appendChild(discountType);
      discountRow.appendChild(discountValue);
      fields.appendChild(discountRow);

      const milkInput = document.createElement('input');
      milkInput.value = item.milk || '';
      milkInput.placeholder = 'نوع الحليب (اختياري، مثال: دايري لايت)';
      milkInput.style.cssText = 'font-size:.82rem;';
      fields.appendChild(milkInput);

      const commit = () => {
        item.name = nameInput.value.trim() || item.name;
        const p = priceInput.value.trim();
        item.price = p === '' ? null : parseFloat(p);
        item.discountType = discountType.value || undefined;
        const dv = parseFloat(discountValue.value);
        item.discountValue = (item.discountType && !isNaN(dv) && dv > 0) ? dv : undefined;
        if (!item.discountType) item.discountValue = undefined;
        const m = milkInput.value.trim();
        item.milk = m === '' ? undefined : m;
        img.src = IMAGES[item.img] || '';
      };
      nameInput.addEventListener('blur', commit);
      priceInput.addEventListener('blur', commit);
      discountValue.addEventListener('blur', commit);
      milkInput.addEventListener('blur', commit);

      row.appendChild(fields);

      const actions = document.createElement('div');
      actions.className = 'admin-item-actions';

      const uploadBtn = document.createElement('button');
      uploadBtn.className = 'admin-icon-btn upload';
      uploadBtn.type = 'button';
      uploadBtn.textContent = '📷';
      uploadBtn.title = 'تغيير الصورة';
      const fileInput = document.createElement('input');
      fileInput.type = 'file'; fileInput.accept = 'image/*'; fileInput.style.display = 'none';
      fileInput.addEventListener('change', async () => {
        if (!fileInput.files[0]) return;
        adminToast('جاري رفع الصورة...');
        try {
          const dataUrl = await resizeImageFile(fileInput.files[0], 900);
          if (!item.img) item.img = slugify(item.name);
          IMAGES[item.img] = dataUrl;
          img.src = dataUrl;
          adminToast('تم تحديث الصورة، لا تنسَ الحفظ 👇');
        } catch(e){ adminToast('تعذّر رفع الصورة'); }
      });
      uploadBtn.onclick = () => fileInput.click();
      actions.appendChild(uploadBtn);
      actions.appendChild(fileInput);

      const delBtn = document.createElement('button');
      delBtn.className = 'admin-icon-btn del';
      delBtn.type = 'button';
      delBtn.textContent = '🗑';
      delBtn.title = 'حذف المنتج';
      delBtn.onclick = () => {
        showInlineConfirm('حذف هذا المنتج نهائيًا؟', () => {
          cat.items.splice(itemIdx, 1);
          renderAdminPanel();
        });
      };
      actions.appendChild(delBtn);

      row.appendChild(actions);
      catBox.appendChild(row);
    });

    const addItemBtn = document.createElement('button');
    addItemBtn.className = 'admin-btn secondary small admin-add-item-btn';
    addItemBtn.textContent = '+ إضافة منتج لهذا القسم';
    addItemBtn.onclick = () => {
      showInlinePrompt('اسم المنتج الجديد:', '', (name) => {
        const newItem = { name: name.trim(), price: null, img: '', id: slugify(name) };
        cat.items.push(newItem);
        renderAdminPanel();
      });
    };
    catBox.appendChild(addItemBtn);

    body.appendChild(catBox);
  });

  const addCatBtn = document.createElement('button');
  addCatBtn.className = 'admin-btn secondary';
  addCatBtn.style.marginBottom = '10px';
  addCatBtn.textContent = '+ إضافة قسم جديد';
  addCatBtn.onclick = () => {
    showInlinePrompt('اسم القسم بالعربي:', '', (title) => {
      showInlinePrompt('اسم القسم بالإنجليزي:', title, (titleEn) => {
        MENU.push({ title: title.trim(), titleEn: (titleEn || title).trim(), items: [] });
        renderAdminPanel();
      });
    });
  };
  body.appendChild(addCatBtn);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'admin-btn';
  saveBtn.style.marginTop = '4px';
  saveBtn.textContent = '💾 حفظ ونشر التغييرات';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    const ok = await Storage.saveAll(MENU, IMAGES);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر التغييرات';
    applyHeaderImages();
    buildMenu();
    adminToast(ok ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);
}

/* ---------- Offers tab ---------- */
/* ---------- Modifier groups tab (priced components, owner-controlled) ---------- */
function renderAdminModifiersTab(body){
  const intro = document.createElement('p');
  intro.className = 'admin-hint';
  intro.style.margin = '0 0 14px';
  intro.textContent = 'هذي مكونات مسعّرة (زي الحليب، السكر، الشراب المنكّه) تظهر للزبون وللموظف عند تفعيلها لمنتج معيّن. سوّي مجموعة، حط خياراتها وأسعارها، وبعدين فعّلها لأي منتج تحت من قسم "ربط المنتجات".';
  body.appendChild(intro);

  MODIFIER_GROUPS.forEach((grp, gIdx) => {
    const box = document.createElement('div');
    box.className = 'admin-cat';

    const head = document.createElement('div');
    head.className = 'admin-cat-head';
    head.innerHTML = `<span>🧩 ${grp.title || 'مجموعة بدون اسم'}</span>`;
    const delBtn = document.createElement('button');
    delBtn.className = 'admin-icon-btn del';
    delBtn.textContent = '🗑';
    delBtn.onclick = () => {
      showInlineConfirm('حذف هذي المجموعة نهائيًا؟ (بتنشال من كل المنتجات المربوطة فيها)', () => {
        const removedId = grp.id;
        MODIFIER_GROUPS.splice(gIdx, 1);
        MENU.forEach(cat => cat.items.forEach(it => {
          if (it.staffModifierGroupIds) it.staffModifierGroupIds = it.staffModifierGroupIds.filter(id => id !== removedId);
        }));
        renderAdminPanel();
      });
    };
    head.appendChild(delBtn);
    box.appendChild(head);

    const fields = document.createElement('div');
    fields.style.cssText = 'padding:12px 14px;';

    const nameInput = document.createElement('input');
    nameInput.value = grp.title || '';
    nameInput.placeholder = 'اسم المجموعة (مثال: الحليب)';
    nameInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;margin-bottom:8px;';
    nameInput.addEventListener('blur', () => { grp.title = nameInput.value.trim() || grp.title; });
    fields.appendChild(nameInput);

    const nameEnInput = document.createElement('input');
    nameEnInput.value = grp.titleEn || '';
    nameEnInput.placeholder = 'اسم المجموعة بالإنجليزي (اختياري)';
    nameEnInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;margin-bottom:10px;direction:ltr;';
    nameEnInput.addEventListener('blur', () => { grp.titleEn = nameEnInput.value.trim(); });
    fields.appendChild(nameEnInput);

    if (!grp.options) grp.options = [];

    const optsWrap = document.createElement('div');
    optsWrap.style.cssText = 'display:flex;flex-direction:column;gap:6px;margin-bottom:10px;';

    function renderOptions(){
      optsWrap.innerHTML = '';
      grp.options.forEach((opt, oIdx) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;';
        const nameI = document.createElement('input');
        nameI.value = opt.name || '';
        nameI.placeholder = 'اسم الخيار (مثال: حليب لوز)';
        nameI.style.cssText = 'flex:1.5;min-width:100px;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
        nameI.addEventListener('blur', () => { opt.name = nameI.value.trim() || opt.name; });
        const nameEnI = document.createElement('input');
        nameEnI.value = opt.nameEn || '';
        nameEnI.placeholder = 'بالإنجليزي (اختياري)';
        nameEnI.style.cssText = 'flex:1.5;min-width:100px;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;direction:ltr;';
        nameEnI.addEventListener('blur', () => { opt.nameEn = nameEnI.value.trim(); });
        const priceI = document.createElement('input');
        priceI.type = 'number'; priceI.step = '0.01'; priceI.min = '0';
        priceI.value = opt.price || 0;
        priceI.placeholder = 'السعر';
        priceI.style.cssText = 'flex:1;min-width:70px;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
        priceI.addEventListener('blur', () => { opt.price = parseFloat(priceI.value) || 0; });
        const delOptBtn = document.createElement('button');
        delOptBtn.className = 'admin-icon-btn del';
        delOptBtn.textContent = '🗑';
        delOptBtn.style.cssText = 'width:28px;height:28px;font-size:.75rem;';
        delOptBtn.onclick = () => { grp.options.splice(oIdx, 1); renderOptions(); };
        row.appendChild(nameI); row.appendChild(nameEnI); row.appendChild(priceI); row.appendChild(delOptBtn);
        optsWrap.appendChild(row);
      });
    }
    renderOptions();
    fields.appendChild(optsWrap);

    const addOptBtn = document.createElement('button');
    addOptBtn.className = 'admin-btn secondary small';
    addOptBtn.textContent = '+ إضافة خيار';
    addOptBtn.onclick = () => {
      grp.options.push({ id: 'opt-' + Date.now() + '-' + Math.floor(Math.random()*1000), name: '', nameEn: '', price: 0 });
      renderOptions();
    };
    fields.appendChild(addOptBtn);

    box.appendChild(fields);
    body.appendChild(box);
  });

  const addGroupBtn = document.createElement('button');
  addGroupBtn.className = 'admin-btn secondary';
  addGroupBtn.style.marginBottom = '14px';
  addGroupBtn.textContent = '+ إضافة مجموعة مكونات جديدة';
  addGroupBtn.onclick = () => {
    showInlinePrompt('اسم المجموعة الجديدة (مثال: الحليب):', '', (title) => {
      MODIFIER_GROUPS.push({
        id: 'grp-' + slugify(title) + '-' + Date.now(),
        title: title.trim(), titleEn: '', options: []
      });
      renderAdminPanel();
    });
  };
  body.appendChild(addGroupBtn);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'admin-btn';
  saveBtn.style.marginBottom = '20px';
  saveBtn.textContent = '💾 حفظ ونشر المكونات';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    const okG = await Storage.saveModifierGroups(MODIFIER_GROUPS);
    const okM = await Storage.saveMenuOnly(MENU);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر المكونات';
    adminToast((okG && okM) ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);

  // ---- Link products to modifier groups ----
  const linkTitle = document.createElement('div');
  linkTitle.style.cssText = 'font-weight:800;font-size:.95rem;margin:6px 0 10px;';
  linkTitle.textContent = '🔗 ربط المنتجات بالمكونات';
  body.appendChild(linkTitle);

  if (!MODIFIER_GROUPS.length){
    const empty = document.createElement('p');
    empty.className = 'admin-hint';
    empty.textContent = 'سوّي مجموعة مكونات فوق أول شي، وبعدها تقدر تربطها بأي منتج من هنا.';
    body.appendChild(empty);
    return;
  }

  MENU.forEach(cat => {
    if (!cat.items.length) return;
    const catBox = document.createElement('div');
    catBox.className = 'admin-cat';
    const catHead = document.createElement('div');
    catHead.className = 'admin-cat-head';
    catHead.innerHTML = `<span>${cat.title}</span>`;
    catBox.appendChild(catHead);

    const catFields = document.createElement('div');
    catFields.style.cssText = 'padding:10px 14px;display:flex;flex-direction:column;gap:14px;';

    cat.items.forEach(item => {
      if (!item.staffModifierGroupIds) item.staffModifierGroupIds = [];
      const itemBox = document.createElement('div');
      itemBox.style.cssText = 'border-bottom:1px solid #eee;padding-bottom:10px;';

      const toggleRow = document.createElement('label');
      toggleRow.style.cssText = 'display:flex;align-items:center;gap:8px;font-weight:700;font-size:.83rem;margin-bottom:6px;';
      const toggle = document.createElement('input');
      toggle.type = 'checkbox';
      toggle.style.cssText = 'width:22px;height:22px;flex-shrink:0;cursor:pointer;';
      toggle.checked = !!item.useStaffModifiers;
      toggle.onchange = () => { item.useStaffModifiers = toggle.checked; groupsRow.style.display = toggle.checked ? 'flex' : 'none'; };
      const toggleLabel = document.createElement('span');
      toggleLabel.textContent = itemName(item);
      toggleRow.appendChild(toggle);
      toggleRow.appendChild(toggleLabel);
      itemBox.appendChild(toggleRow);

      const groupsRow = document.createElement('div');
      groupsRow.style.cssText = 'display:' + (item.useStaffModifiers ? 'flex' : 'none') + ';flex-direction:column;gap:8px;padding-right:26px;';
      if (!item.modifierOptionOverrides) item.modifierOptionOverrides = {};
      MODIFIER_GROUPS.forEach(grp => {
        const grpBox = document.createElement('div');
        const chipLabel = document.createElement('label');
        chipLabel.style.cssText = 'display:flex;align-items:center;gap:4px;font-size:.76rem;background:#f5f5f5;border-radius:8px;padding:5px 8px;cursor:pointer;width:fit-content;';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.style.cssText = 'width:19px;height:19px;flex-shrink:0;cursor:pointer;';
        cb.checked = item.staffModifierGroupIds.includes(grp.id);
        const span = document.createElement('span');
        span.textContent = grp.title;
        chipLabel.appendChild(cb);
        chipLabel.appendChild(span);
        grpBox.appendChild(chipLabel);

        const optsRow = document.createElement('div');
        optsRow.style.cssText = 'display:' + (cb.checked ? 'flex' : 'none') + ';flex-wrap:wrap;gap:6px;padding-right:20px;margin-top:6px;';

        function renderOptionChecks(){
          optsRow.innerHTML = '';
          const enabledIds = item.modifierOptionOverrides[grp.id] || (grp.options || []).map(o => o.id);
          (grp.options || []).forEach(opt => {
            const optLabel = document.createElement('label');
            optLabel.style.cssText = 'display:flex;align-items:center;gap:4px;font-size:.72rem;background:#fff;border:1px solid #e2e2e2;border-radius:6px;padding:4px 7px;cursor:pointer;';
            const optCb = document.createElement('input');
            optCb.type = 'checkbox';
            optCb.style.cssText = 'width:16px;height:16px;flex-shrink:0;cursor:pointer;';
            optCb.checked = enabledIds.includes(opt.id);
            optCb.onchange = () => {
              let list = item.modifierOptionOverrides[grp.id] ? item.modifierOptionOverrides[grp.id].slice() : (grp.options || []).map(o => o.id);
              if (optCb.checked){
                if (!list.includes(opt.id)) list.push(opt.id);
              } else {
                list = list.filter(id => id !== opt.id);
              }
              item.modifierOptionOverrides[grp.id] = list;
            };
            const optSpan = document.createElement('span');
            optSpan.textContent = opt.name;
            optLabel.appendChild(optCb);
            optLabel.appendChild(optSpan);
            optsRow.appendChild(optLabel);
          });
        }
        renderOptionChecks();
        grpBox.appendChild(optsRow);

        cb.onchange = () => {
          if (cb.checked){
            if (!item.staffModifierGroupIds.includes(grp.id)) item.staffModifierGroupIds.push(grp.id);
          } else {
            item.staffModifierGroupIds = item.staffModifierGroupIds.filter(id => id !== grp.id);
          }
          optsRow.style.display = cb.checked ? 'flex' : 'none';
        };

        groupsRow.appendChild(grpBox);
      });
      itemBox.appendChild(groupsRow);
      catFields.appendChild(itemBox);
    });

    catBox.appendChild(catFields);
    body.appendChild(catBox);
  });

  const saveBtn2 = document.createElement('button');
  saveBtn2.className = 'admin-btn';
  saveBtn2.textContent = '💾 حفظ ربط المنتجات';
  saveBtn2.onclick = async () => {
    saveBtn2.disabled = true;
    saveBtn2.textContent = 'جاري الحفظ...';
    const ok = await Storage.saveMenuOnly(MENU);
    saveBtn2.disabled = false;
    saveBtn2.textContent = '💾 حفظ ربط المنتجات';
    adminToast(ok ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn2);
}

function renderAdminOffersTab(body){
  const box = document.createElement('div');
  box.className = 'admin-cat';

  const head = document.createElement('div');
  head.className = 'admin-cat-head';
  head.innerHTML = `<span>🎁 اشتري وخذ منتج مجاني (على كل المنيو)</span>`;
  box.appendChild(head);

  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:14px;';

  const desc = document.createElement('p');
  desc.className = 'admin-hint';
  desc.style.margin = '0 0 12px';
  desc.textContent = 'مثال: اشتري 4 منتجات والخامس مجانًا — اكتب 4 بخانة "اشتري" و1 بخانة "مجانًا". يشتغل على أي منتجات بالسلة مجتمعة، والزبون يختار بنفسه أي منتج يكون مجاني.';
  wrap.appendChild(desc);

  const toggleRow = document.createElement('label');
  toggleRow.style.cssText = 'display:flex;align-items:center;gap:8px;font-weight:700;font-size:.9rem;margin-bottom:14px;';
  const toggle = document.createElement('input');
  toggle.type = 'checkbox';
  toggle.checked = !!OFFERS.buyXGetY.enabled;
  toggle.style.cssText = 'width:20px;height:20px;';
  toggleRow.appendChild(toggle);
  const toggleLabel = document.createElement('span');
  toggleLabel.textContent = 'تفعيل هذا العرض';
  toggleRow.appendChild(toggleLabel);
  wrap.appendChild(toggleRow);

  const fieldsRow = document.createElement('div');
  fieldsRow.style.cssText = 'display:flex;gap:10px;align-items:flex-end;';

  const buyWrap = document.createElement('div');
  buyWrap.style.flex = '1';
  const buyLabel = document.createElement('div');
  buyLabel.textContent = 'اشتري (عدد المنتجات)';
  buyLabel.style.cssText = 'font-size:.78rem;color:#666;margin-bottom:4px;';
  const buyInput = document.createElement('input');
  buyInput.type = 'number'; buyInput.min = '1';
  buyInput.value = OFFERS.buyXGetY.buyCount || 4;
  buyInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.9rem;';
  buyWrap.appendChild(buyLabel);
  buyWrap.appendChild(buyInput);

  const freeWrap = document.createElement('div');
  freeWrap.style.flex = '1';
  const freeLabel = document.createElement('div');
  freeLabel.textContent = 'واحصل مجانًا (عدد)';
  freeLabel.style.cssText = 'font-size:.78rem;color:#666;margin-bottom:4px;';
  const freeInput = document.createElement('input');
  freeInput.type = 'number'; freeInput.min = '1';
  freeInput.value = OFFERS.buyXGetY.freeCount || 1;
  freeInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.9rem;';
  freeWrap.appendChild(freeLabel);
  freeWrap.appendChild(freeInput);

  fieldsRow.appendChild(buyWrap);
  fieldsRow.appendChild(freeWrap);
  wrap.appendChild(fieldsRow);

  box.appendChild(wrap);
  body.appendChild(box);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'admin-btn';
  saveBtn.style.marginTop = '4px';
  saveBtn.textContent = '💾 حفظ ونشر العروض';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    OFFERS.buyXGetY = {
      enabled: toggle.checked,
      buyCount: Math.max(1, parseInt(buyInput.value) || 4),
      freeCount: Math.max(1, parseInt(freeInput.value) || 1)
    };
    const ok = await Storage.saveOffers(OFFERS);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر العروض';
    adminToast(ok ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);

  renderLoyaltySection(body);
}

/* ---------- Shared customer loyalty card (used by owner + staff views) ---------- */
function renderCustomerCard(container, key, entry, onRedeemDone){
  const pending = loyaltyPendingFree(entry);
  const buy = OFFERS.buyXGetY.buyCount || 0;
  const free = OFFERS.buyXGetY.freeCount || 0;
  const cycle = buy + free;
  const progress = cycle > 0 ? (entry.totalItems || 0) % cycle : 0;
  const card = document.createElement('div');
  card.style.cssText = 'background:var(--green-50,#f3fbf6);border-radius:12px;padding:12px 14px;';
  const nameLine = document.createElement('div');
  nameLine.style.cssText = 'font-weight:800;font-size:.9rem;margin-bottom:2px;';
  nameLine.textContent = (entry.name || 'زبون') + ' — ' + (entry.phone || key);
  const statsLine = document.createElement('div');
  statsLine.style.cssText = 'font-size:.78rem;color:#666;margin-bottom:8px;';
  statsLine.textContent = `إجمالي المنتجات: ${entry.totalItems || 0} | عدد الطلبات: ${entry.ordersCount || 0} | التقدم بالدورة الحالية: ${progress}/${cycle}`;
  card.appendChild(nameLine);
  card.appendChild(statsLine);
  if (pending > 0){
    const pendingBadge = document.createElement('div');
    pendingBadge.style.cssText = 'background:#ffd76b;color:#5a4300;font-weight:800;font-size:.8rem;padding:6px 10px;border-radius:8px;display:inline-block;margin-bottom:8px;';
    pendingBadge.textContent = `🎁 يستاهل ${pending} منتج مجاني الآن`;
    card.appendChild(pendingBadge);
    const redeemBtn = document.createElement('button');
    redeemBtn.className = 'admin-btn small';
    redeemBtn.style.cssText = 'display:block;margin-top:4px;';
    redeemBtn.textContent = '✅ تم تسليم المنتج المجاني';
    redeemBtn.onclick = async () => {
      entry.redeemedFree = (entry.redeemedFree || 0) + free;
      LOYALTY[key] = entry;
      await Storage.saveLoyalty(LOYALTY);
      if (onRedeemDone) onRedeemDone();
    };
    card.appendChild(redeemBtn);
  } else {
    const remaining = cycle - progress;
    const noteEl = document.createElement('div');
    noteEl.style.cssText = 'font-size:.78rem;color:#999;';
    noteEl.textContent = `يحتاج ${remaining} منتج إضافي عشان يوصل للمجاني`;
    card.appendChild(noteEl);
  }
  container.appendChild(card);
}

/* ---------- Loyalty section (inside Offers tab) ---------- */
function renderLoyaltySection(body, rerender){
  rerender = rerender || renderAdminPanel;
  const box = document.createElement('div');
  box.className = 'admin-cat';
  box.style.marginTop = '18px';

  const head = document.createElement('div');
  head.className = 'admin-cat-head';
  head.innerHTML = `<span>👥 برنامج الولاء — رصيد كل زبون</span>`;
  box.appendChild(head);

  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:14px;';

  const desc = document.createElement('p');
  desc.className = 'admin-hint';
  desc.style.margin = '0 0 12px';
  desc.textContent = 'يحسب تلقائيًا من كل طلبات الزبون عبر كل الأيام حسب نفس أرقام "اشتري وخذ مجاني" فوق. لما يستاهل الزبون منتج مجاني، سلّمه إياه ثم اضغط "تم التسليم" عشان يبدأ يتجمع من جديد.';
  wrap.appendChild(desc);

  // Search box
  const searchRow = document.createElement('div');
  searchRow.style.cssText = 'display:flex;gap:8px;margin-bottom:14px;';
  const searchInput = document.createElement('input');
  searchInput.type = 'tel';
  searchInput.placeholder = 'ابحث برقم جوال الزبون';
  searchInput.style.cssText = 'flex:1;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:9px 12px;font-size:.88rem;';
  const searchResult = document.createElement('div');
  searchResult.style.cssText = 'margin-bottom:16px;';
  searchRow.appendChild(searchInput);
  wrap.appendChild(searchRow);
  wrap.appendChild(searchResult);

  searchInput.addEventListener('input', () => {
    const q = normalizePhone(searchInput.value);
    searchResult.innerHTML = '';
    if (!q) return;
    const match = Object.entries(LOYALTY).find(([key]) => key.includes(q));
    if (match){
      renderCustomerCard(searchResult, match[0], match[1], () => { adminToast('تم تحديث رصيد الزبون ✅'); rerender(); });
    } else {
      searchResult.innerHTML = '<p class="admin-hint" style="margin:0;">ما فيه زبون بهذا الرقم لسا.</p>';
    }
  });

  // Full sorted list (closest to free first)
  const listTitle = document.createElement('div');
  listTitle.style.cssText = 'font-weight:800;font-size:.85rem;margin:10px 0 8px;color:var(--green-700,#1f7a4d);';
  listTitle.textContent = '📋 كل الزبائن — الأقرب للمجاني أولًا';
  wrap.appendChild(listTitle);

  const entries = Object.entries(LOYALTY);
  if (!entries.length){
    const empty = document.createElement('p');
    empty.className = 'admin-hint';
    empty.style.margin = '0';
    empty.textContent = 'ما فيه زبائن مسجلين لسا — تسجّل تلقائيًا أول ما زبون يكمل طلب.';
    wrap.appendChild(empty);
  } else {
    const buy = OFFERS.buyXGetY.buyCount || 0;
    const free = OFFERS.buyXGetY.freeCount || 0;
    const cycle = buy + free || 1;
    entries.sort((a, b) => {
      const remA = cycle - ((a[1].totalItems || 0) % cycle);
      const remB = cycle - ((b[1].totalItems || 0) % cycle);
      const pendA = loyaltyPendingFree(a[1]);
      const pendB = loyaltyPendingFree(b[1]);
      if (pendA !== pendB) return pendB - pendA;
      return remA - remB;
    });
    const listWrap = document.createElement('div');
    listWrap.style.cssText = 'display:flex;flex-direction:column;gap:10px;';
    entries.slice(0, 30).forEach(([key, entry]) => renderCustomerCard(listWrap, key, entry, () => { adminToast('تم تحديث رصيد الزبون ✅'); rerender(); }));
    wrap.appendChild(listWrap);
  }

  box.appendChild(wrap);
  body.appendChild(box);
}

/* ---------- Staff groups tab (owner defines custom groupings for staff site) ---------- */
function renderAdminStaffGroupsTab(body){
  const intro = document.createElement('p');
  intro.className = 'admin-hint';
  intro.style.margin = '0 0 14px';
  intro.textContent = 'هذي التصنيفات تظهر بصفحة الموظف بدل أقسام منيو الزبون. سوّي مجموعة زي "لاتيه" أو "ماتشا" وحدد أي منتجات تدخل تحتها من أي قسم كانت.';
  body.appendChild(intro);

  const importBtn = document.createElement('button');
  importBtn.className = 'admin-btn secondary';
  importBtn.style.marginBottom = '14px';
  importBtn.textContent = '🔄 استيراد كل أقسام المنيو تلقائيًا كمجموعات';
  importBtn.onclick = () => {
    showInlineConfirm('هذا بيضيف مجموعة جديدة لكل قسم من أقسام المنيو الحالية (Coffee، Filter Coffee...) بنفس منتجاته. تقدر تعدّلها بعدين. أكمل؟', () => {
      MENU.forEach(cat => {
        if (!cat.items.length) return;
        const already = STAFF_GROUPS.find(g => g.title === cat.title);
        if (already){
          already.itemIds = cat.items.map(it => it.id);
        } else {
          STAFF_GROUPS.push({
            id: slugify(cat.title) + '-' + Date.now() + '-' + Math.floor(Math.random()*1000),
            title: cat.title,
            titleEn: cat.titleEn || '',
            itemIds: cat.items.map(it => it.id)
          });
        }
      });
      renderAdminPanel();
      adminToast('تم الاستيراد — لا تنسَ الحفظ بالأسفل ✅');
    });
  };
  body.appendChild(importBtn);

  STAFF_GROUPS.forEach((grp, gIdx) => {
    const box = document.createElement('div');
    box.className = 'admin-cat';

    const head = document.createElement('div');
    head.className = 'admin-cat-head';
    head.innerHTML = `<span>👔 ${grp.title || 'مجموعة بدون اسم'}</span>`;
    const delBtn = document.createElement('button');
    delBtn.className = 'admin-icon-btn del';
    delBtn.textContent = '🗑';
    delBtn.onclick = () => {
      showInlineConfirm('حذف هذه المجموعة نهائيًا؟', () => {
        STAFF_GROUPS.splice(gIdx, 1);
        renderAdminPanel();
      });
    };
    head.appendChild(delBtn);
    box.appendChild(head);

    const fields = document.createElement('div');
    fields.style.cssText = 'padding:12px 14px;';

    const nameInput = document.createElement('input');
    nameInput.value = grp.title || '';
    nameInput.placeholder = 'اسم المجموعة بالعربي (مثال: لاتيه)';
    nameInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;margin-bottom:8px;';
    nameInput.addEventListener('blur', () => { grp.title = nameInput.value.trim() || grp.title; });
    fields.appendChild(nameInput);

    const nameEnInput = document.createElement('input');
    nameEnInput.value = grp.titleEn || '';
    nameEnInput.placeholder = 'اسم المجموعة بالإنجليزي (اختياري)';
    nameEnInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;margin-bottom:10px;';
    nameEnInput.addEventListener('blur', () => { grp.titleEn = nameEnInput.value.trim(); });
    fields.appendChild(nameEnInput);

    const pickTitle = document.createElement('div');
    pickTitle.style.cssText = 'font-weight:700;font-size:.8rem;color:#666;margin-bottom:6px;';
    pickTitle.textContent = 'اختر المنتجات اللي تدخل بهذي المجموعة:';
    fields.appendChild(pickTitle);

    if (!grp.itemIds) grp.itemIds = [];

    MENU.forEach(cat => {
      if (!cat.items.length) return;
      const catLabel = document.createElement('div');
      catLabel.style.cssText = 'font-weight:800;font-size:.76rem;color:var(--green-700,#1f7a4d);margin:8px 0 4px;';
      catLabel.textContent = cat.title;
      fields.appendChild(catLabel);

      const list = document.createElement('div');
      list.style.cssText = 'display:flex;flex-direction:column;gap:4px;margin-bottom:6px;';
      cat.items.forEach(item => {
        const row = document.createElement('label');
        row.style.cssText = 'display:flex;align-items:center;gap:8px;font-size:.82rem;color:#333;';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.style.cssText = 'width:19px;height:19px;flex-shrink:0;cursor:pointer;';
        cb.checked = grp.itemIds.includes(item.id);
        cb.onchange = () => {
          if (cb.checked){
            if (!grp.itemIds.includes(item.id)) grp.itemIds.push(item.id);
          } else {
            grp.itemIds = grp.itemIds.filter(id => id !== item.id);
          }
        };
        const span = document.createElement('span');
        span.textContent = itemName(item);
        row.appendChild(cb);
        row.appendChild(span);
        list.appendChild(row);
      });
      fields.appendChild(list);
    });

    box.appendChild(fields);
    body.appendChild(box);
  });

  const addGroupBtn = document.createElement('button');
  addGroupBtn.className = 'admin-btn secondary';
  addGroupBtn.style.marginBottom = '14px';
  addGroupBtn.textContent = '+ إضافة مجموعة جديدة';
  addGroupBtn.onclick = () => {
    showInlinePrompt('اسم المجموعة الجديدة (مثال: لاتيه):', '', (title) => {
      STAFF_GROUPS.push({ id: slugify(title) + '-' + Date.now(), title: title.trim(), titleEn: '', itemIds: [] });
      renderAdminPanel();
    });
  };
  body.appendChild(addGroupBtn);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'admin-btn';
  saveBtn.textContent = '💾 حفظ ونشر مجموعات الموظف';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    const ok = await Storage.saveStaffGroups(STAFF_GROUPS);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر مجموعات الموظف';
    adminToast(ok ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);
}

/* ---------- Branches & Tables tab ---------- */
function renderAdminBranchesTab(body){
  BRANCHES.forEach((branch, bIdx) => {
    const box = document.createElement('div');
    box.className = 'admin-cat';

    const head = document.createElement('div');
    head.className = 'admin-cat-head';
    head.innerHTML = `<span>📍 ${branch.name || 'فرع بدون اسم'}</span>`;
    box.appendChild(head);

    const fieldsWrap = document.createElement('div');
    fieldsWrap.style.cssText = 'padding:12px 14px;display:flex;flex-direction:column;gap:8px;';

    function labeledInput(labelText, value, placeholder, onCommit, type){
      const w = document.createElement('div');
      const l = document.createElement('label');
      l.textContent = labelText;
      l.style.cssText = 'font-size:.75rem;color:#888;display:block;margin-bottom:3px;';
      const inp = document.createElement('input');
      inp.type = type || 'text';
      inp.value = value || '';
      inp.placeholder = placeholder || '';
      inp.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;';
      inp.addEventListener('blur', () => onCommit(inp.value));
      w.appendChild(l); w.appendChild(inp);
      return w;
    }

    fieldsWrap.appendChild(labeledInput('اسم الفرع (عربي)', branch.name, 'اسم الفرع', v => branch.name = v.trim()));
    fieldsWrap.appendChild(labeledInput('اسم الفرع (English)', branch.nameEn, 'Branch name', v => branch.nameEn = v.trim()));
    fieldsWrap.appendChild(labeledInput('العنوان (عربي)', branch.address, 'أبوظبي، الإمارات', v => branch.address = v.trim()));
    fieldsWrap.appendChild(labeledInput('العنوان (English)', branch.addressEn, 'Abu Dhabi, UAE', v => branch.addressEn = v.trim()));
    fieldsWrap.appendChild(labeledInput('رقم واتساب (بدون + أو أصفار، مثال 971501234567)', branch.whatsappNumber, '971501234567', v => branch.whatsappNumber = v.trim()));
    fieldsWrap.appendChild(labeledInput('رقم الاتصال', branch.phoneNumber, '+971501234567', v => branch.phoneNumber = v.trim()));
    fieldsWrap.appendChild(labeledInput('رابط الاتجاهات (Google Maps)', branch.mapsUrl, 'https://maps.google.com/?q=...', v => branch.mapsUrl = v.trim()));

    const hoursRow = document.createElement('div');
    hoursRow.style.cssText = 'display:flex;gap:8px;';
    const openWrap = labeledInput('ساعة الفتح (0-23)', branch.openHour, '6', v => branch.openHour = parseInt(v)||0, 'number');
    const closeWrap = labeledInput('ساعة الإغلاق (0-23)', branch.closeHour, '23', v => branch.closeHour = parseInt(v)||23, 'number');
    openWrap.style.flex = '1'; closeWrap.style.flex = '1';
    hoursRow.appendChild(openWrap); hoursRow.appendChild(closeWrap);
    fieldsWrap.appendChild(hoursRow);

    // tables management
    const tablesLabel = document.createElement('label');
    tablesLabel.textContent = 'الطاولات المتاحة';
    tablesLabel.style.cssText = 'font-size:.75rem;color:#888;display:block;margin-top:6px;';
    fieldsWrap.appendChild(tablesLabel);

    const chipsWrap = document.createElement('div');
    chipsWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';
    if (!branch.tables) branch.tables = [];

    function renderTableChips(){
      chipsWrap.innerHTML = '';
      branch.tables.forEach((num, tIdx) => {
        const chip = document.createElement('span');
        chip.style.cssText = 'display:inline-flex;align-items:center;gap:5px;background:var(--green-100,#e3faec);color:var(--green-900,#0f3d2e);border-radius:99px;padding:5px 6px 5px 12px;font-size:.8rem;font-weight:700;';
        chip.innerHTML = `<span>${num}</span>`;
        const x = document.createElement('button');
        x.type = 'button'; x.textContent = '→';
        x.style.cssText = 'width:18px;height:18px;border-radius:50%;border:none;background:#fff;color:#e74c3c;font-size:.7rem;cursor:pointer;line-height:1;';
        x.onclick = () => { branch.tables.splice(tIdx, 1); renderTableChips(); };
        chip.appendChild(x);
        chipsWrap.appendChild(chip);
      });
      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.textContent = '+ طاولة';
      addBtn.style.cssText = 'border:1.5px dashed var(--green-200,#bdf0d3);background:none;color:var(--green-700,#1f7a4d);border-radius:99px;padding:5px 12px;font-size:.8rem;cursor:pointer;';
      addBtn.onclick = () => {
        showInlinePrompt('رقم الطاولة الجديدة:', '', (num) => {
          branch.tables.push(num.trim());
          renderTableChips();
        });
      };
      chipsWrap.appendChild(addBtn);
    }
    renderTableChips();
    fieldsWrap.appendChild(chipsWrap);

    box.appendChild(fieldsWrap);

    const delBranchBtn = document.createElement('button');
    delBranchBtn.className = 'admin-btn danger small';
    delBranchBtn.style.margin = '4px 14px 14px';
    delBranchBtn.textContent = '🗑 حذف هذا الفرع';
    if (BRANCHES.length <= 1){
      delBranchBtn.disabled = true;
      delBranchBtn.style.opacity = '.4';
      delBranchBtn.title = 'لازم يبقى فرع واحد على الأقل';
    }
    delBranchBtn.onclick = () => {
      showInlineConfirm('حذف هذا الفرع نهائيًا؟', () => {
        BRANCHES.splice(bIdx, 1);
        renderAdminPanel();
      });
    };
    box.appendChild(delBranchBtn);

    body.appendChild(box);
  });

  const addBranchBtn = document.createElement('button');
  addBranchBtn.className = 'admin-btn secondary';
  addBranchBtn.style.marginBottom = '10px';
  addBranchBtn.textContent = '+ إضافة فرع جديد';
  addBranchBtn.onclick = () => {
    showInlinePrompt('اسم الفرع الجديد:', '', (name) => {
      BRANCHES.push({
        id: slugify(name),
        name: name.trim(),
        nameEn: '',
        address: '', addressEn: '',
        whatsappNumber: CONFIG.whatsappNumber,
        phoneNumber: CONFIG.phoneNumber,
        mapsUrl: '',
        openHour: 6, closeHour: 23,
        tables: ['1']
      });
      renderAdminPanel();
    });
  };
  body.appendChild(addBranchBtn);

  const hint = document.createElement('p');
  hint.className = 'admin-hint';
  hint.textContent = 'لكل فرع رابط خاص لمسح الـ QR: أضف ?branch=المعرّف في نهاية رابط المنيو (مثال: ...?branch=' + (BRANCHES[0] ? BRANCHES[0].id : 'main') + ')';
  body.appendChild(hint);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'admin-btn';
  saveBtn.textContent = '💾 حفظ ونشر التغييرات';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    const ok = await Storage.saveBranches(BRANCHES);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر التغييرات';
    applyActiveBranch();
    adminToast(ok ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);
}

/* ---------- General Settings tab ---------- */
function renderAdminSettingsTab(body){
  function labeledField(labelText, value, placeholder, onCommit, type){
    const w = document.createElement('div');
    w.style.marginBottom = '12px';
    const l = document.createElement('label');
    l.textContent = labelText;
    l.style.cssText = 'font-size:.78rem;color:#888;display:block;margin-bottom:4px;';
    const inp = document.createElement(type === 'textarea' ? 'textarea' : 'input');
    if (type && type !== 'textarea') inp.type = type;
    inp.value = value || '';
    inp.placeholder = placeholder || '';
    inp.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:10px;padding:10px 12px;font-size:.88rem;font-family:inherit;';
    if (type === 'textarea') inp.rows = 2;
    inp.addEventListener('blur', () => onCommit(inp.value));
    w.appendChild(l); w.appendChild(inp);
    return w;
  }

  const box = document.createElement('div');
  box.className = 'admin-cat';
  const head = document.createElement('div');
  head.className = 'admin-cat-head';
  head.innerHTML = '<span>🏷 هوية الموقع</span>';
  box.appendChild(head);

  const fields = document.createElement('div');
  fields.style.cssText = 'padding:12px 14px;';
  fields.appendChild(labeledField('اسم المقهى (يظهر بالهيدر والفوتر)', SETTINGS.siteName, 'Filanbon Cafe', v => SETTINGS.siteName = v.trim()));
  fields.appendChild(labeledField('رابط إنستغرام', SETTINGS.instagramUrl, 'https://instagram.com/...', v => SETTINGS.instagramUrl = v.trim()));
  fields.appendChild(labeledField('رابط تيك توك', SETTINGS.tiktokUrl, 'https://tiktok.com/@...', v => SETTINGS.tiktokUrl = v.trim()));
  fields.appendChild(labeledField('رسالة واتساب الافتراضية (زر التواصل السريع)', SETTINGS.whatsappMessage, '', v => SETTINGS.whatsappMessage = v.trim(), 'textarea'));
  box.appendChild(fields);
  body.appendChild(box);

  const colorBox = document.createElement('div');
  colorBox.className = 'admin-cat';
  const colorHead = document.createElement('div');
  colorHead.className = 'admin-cat-head';
  colorHead.innerHTML = '<span>🎨 لون الموقع الأساسي</span>';
  colorBox.appendChild(colorHead);

  const colorFields = document.createElement('div');
  colorFields.style.cssText = 'padding:14px;display:flex;align-items:center;gap:14px;';
  const colorInput = document.createElement('input');
  colorInput.type = 'color';
  colorInput.value = SETTINGS.primaryColor || '#1f7a4d';
  colorInput.style.cssText = 'width:56px;height:56px;border:none;border-radius:14px;cursor:pointer;padding:0;background:none;';
  colorInput.addEventListener('input', () => {
    SETTINGS.primaryColor = colorInput.value;
    applyTheme(colorInput.value); // معاينة فورية بدون حفظ
  });
  const colorHint = document.createElement('p');
  colorHint.className = 'admin-hint';
  colorHint.style.margin = '0';
  colorHint.textContent = 'اختر اللون وشاهد التغيير مباشرة على الصفحة خلفك، ثم اضغط حفظ لتثبيته لجميع الزبائن.';
  colorFields.appendChild(colorInput);
  colorFields.appendChild(colorHint);
  colorBox.appendChild(colorFields);
  body.appendChild(colorBox);

  const staffBox = document.createElement('div');
  staffBox.className = 'admin-cat';
  const staffHead = document.createElement('div');
  staffHead.className = 'admin-cat-head';
  staffHead.innerHTML = '<span>👤 نظام الموظف</span>';
  staffBox.appendChild(staffHead);

  const staffFields = document.createElement('div');
  staffFields.style.cssText = 'padding:14px;';

  const staffDesc = document.createElement('p');
  staffDesc.className = 'admin-hint';
  staffDesc.style.margin = '0 0 12px';
  staffDesc.textContent = 'صفحة منفصلة للموظفين بتصميم مختلف (' + (function(){ const u = new URL(window.location.href); u.searchParams.delete('admin'); u.searchParams.set('staff','1'); return u.toString(); })() + ') يسوّون منها طلبات ويسلّمون مجانيات الولاء. أنت تتحكم بتفعيلها وكلمة مرورها من هنا فقط.';
  staffFields.appendChild(staffDesc);

  const staffToggleRow = document.createElement('label');
  staffToggleRow.style.cssText = 'display:flex;align-items:center;gap:8px;font-weight:700;font-size:.9rem;margin-bottom:14px;';
  const staffToggle = document.createElement('input');
  staffToggle.type = 'checkbox';
  staffToggle.checked = SETTINGS.staffEnabled !== false;
  staffToggle.style.cssText = 'width:20px;height:20px;';
  staffToggleRow.appendChild(staffToggle);
  const staffToggleLabel = document.createElement('span');
  staffToggleLabel.textContent = 'تفعيل صفحة الموظف';
  staffToggleRow.appendChild(staffToggleLabel);
  staffFields.appendChild(staffToggleRow);

  staffFields.appendChild(labeledField('كلمة مرور الموظف', SETTINGS.staffPassword || 'filanbon-staff2026', 'كلمة مرور خاصة بالموظفين', v => SETTINGS.staffPassword = v.trim() || 'filanbon-staff2026'));

  const staffColorRow = document.createElement('div');
  staffColorRow.style.cssText = 'display:flex;align-items:center;gap:14px;margin-top:12px;';
  const staffColorInput = document.createElement('input');
  staffColorInput.type = 'color';
  staffColorInput.value = SETTINGS.staffAccentColor || '#ffb648';
  staffColorInput.style.cssText = 'width:48px;height:48px;border:none;border-radius:12px;cursor:pointer;padding:0;background:none;';
  staffColorInput.addEventListener('input', () => {
    SETTINGS.staffAccentColor = staffColorInput.value;
    document.documentElement.style.setProperty('--staff-accent', staffColorInput.value);
  });
  const staffColorLabel = document.createElement('p');
  staffColorLabel.className = 'admin-hint';
  staffColorLabel.style.margin = '0';
  staffColorLabel.textContent = 'لون صفحة الموظف المميز (الأزرار والأسعار). افتح صفحة الموظف بتاب ثاني لترى المعاينة.';
  staffColorRow.appendChild(staffColorInput);
  staffColorRow.appendChild(staffColorLabel);
  staffFields.appendChild(staffColorRow);

  staffBox.appendChild(staffFields);
  body.appendChild(staffBox);

  renderOwnerPasswordSection(body);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'admin-btn';
  saveBtn.textContent = '💾 حفظ ونشر التغييرات';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    SETTINGS.staffEnabled = staffToggle.checked;
    const ok = await Storage.saveSettings(SETTINGS);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر التغييرات';
    applySettings(SETTINGS);
    adminToast(ok ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);
}

/* ---------- Owner's own password change ---------- */
function renderOwnerPasswordSection(body){
  const box = document.createElement('div');
  box.className = 'admin-cat';

  const head = document.createElement('div');
  head.className = 'admin-cat-head';
  head.innerHTML = '<span>🔑 كلمة مرور المشرف</span>';
  box.appendChild(head);

  const fields = document.createElement('div');
  fields.style.cssText = 'padding:12px 14px;';

  const intro = document.createElement('p');
  intro.className = 'admin-hint';
  intro.style.margin = '0 0 12px';
  intro.textContent = 'غيّر كلمة المرور اللي تدخل فيها للوحة التحكم (تحتاج كلمة المرور الحالية أول).';
  fields.appendChild(intro);

  const curInput = document.createElement('input');
  curInput.type = 'password';
  curInput.placeholder = 'كلمة المرور الحالية';
  curInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;margin-bottom:8px;';
  fields.appendChild(curInput);

  const newInput = document.createElement('input');
  newInput.type = 'password';
  newInput.placeholder = 'كلمة المرور الجديدة';
  newInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;margin-bottom:8px;';
  fields.appendChild(newInput);

  const confirmInput = document.createElement('input');
  confirmInput.type = 'password';
  confirmInput.placeholder = 'تأكيد كلمة المرور الجديدة';
  confirmInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;margin-bottom:10px;';
  fields.appendChild(confirmInput);

  const changeBtn = document.createElement('button');
  changeBtn.className = 'admin-btn secondary';
  changeBtn.textContent = 'تغيير كلمة المرور';
  changeBtn.onclick = async () => {
    if (curInput.value !== currentOwnerPassword()){
      adminToast('كلمة المرور الحالية غلط');
      return;
    }
    if (!newInput.value || newInput.value.length < 4){
      adminToast('كلمة المرور الجديدة قصيرة، اكتب 4 أحرف/أرقام على الأقل');
      return;
    }
    if (newInput.value !== confirmInput.value){
      adminToast('تأكيد كلمة المرور ما يطابق');
      return;
    }
    changeBtn.disabled = true;
    changeBtn.textContent = 'جاري الحفظ...';
    SETTINGS.ownerPassword = newInput.value;
    const ok = await Storage.saveSettings(SETTINGS);
    changeBtn.disabled = false;
    changeBtn.textContent = 'تغيير كلمة المرور';
    if (ok){
      curInput.value = ''; newInput.value = ''; confirmInput.value = '';
      adminToast('✅ تم تغيير كلمة المرور بنجاح');
    } else {
      adminToast('تعذّر الحفظ، حاول مرة أخرى');
    }
  };
  fields.appendChild(changeBtn);

  box.appendChild(fields);
  body.appendChild(box);
}

/* ---------- Secret role gate (شعار الفوتر — 5 نقرات خلال 3 ثوانٍ) ----------
   لا يوجد أي زر ظاهر للعملاء. يفتح قائمة اختيار المهنة (موظف/مشرف/مالك)،
   وبعد إدخال كلمة المرور الصحيحة الخاصة بتلك المهنة (يتحقق منها مباشرة من
   بيانات Firestore/Firebase الحقيقية)، ينقلك مباشرة لصفحة تلك المهنة. */
(function setupRoleGate(){
  const ROLE_LABELS  = { owner: 'مالك', supervisor: 'مشرف', staff: 'موظف' };
  const ROLE_TARGETS = {
    owner: 'filanbon_owner.html',
    supervisor: 'filanbon_staff.html?role=supervisor',
    staff: 'filanbon_staff.html?role=staff'
  };
  const OWNER_EMAIL = 'filanboncafe@gmail.com';

  async function fetchStaffAccounts(){
    try {
      const raw = await Storage.get('staff-accounts-live');
      return raw ? JSON.parse(raw) : [];
    } catch(e){ return []; }
  }

  // للمالك والمشرف: كلمة مرور واحدة للمهنة. للموظف: نتحقق من كلمة مرور
  // الحساب المحدد بالاسم تحديدًا (account يُمرَّر فقط لما role === 'staff').
  async function verifyRolePassword(role, password, account){
    if (!password) return false;
    if (role === 'owner'){
      if (!isFirebaseAuthReady()) return false;
      const res = await firebaseSignIn(OWNER_EMAIL, password);
      return !!res.ok;
    }
    if (role === 'staff'){
      return !!account && account.password === password;
    }
    const accounts = await fetchStaffAccounts();
    return accounts.some(a => a.role === role && a.password === password);
  }

  function closeGate(){
    const el = document.getElementById('roleGateOverlay');
    if (el) el.remove();
  }

  function ensureOverlay(){
    let overlay = document.getElementById('roleGateOverlay');
    if (!overlay){
      overlay = document.createElement('div');
      overlay.id = 'roleGateOverlay';
      overlay.className = 'overlay open';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', (e) => { if (e.target === overlay) closeGate(); });
    }
    return overlay;
  }

  function showPasswordStep(role, account){
    const overlay = ensureOverlay();
    const title = (role === 'staff' && account)
      ? (ROLE_LABELS.staff + ' — ' + (account.name || account.nameEn || ''))
      : ROLE_LABELS[role];
    overlay.innerHTML =
      '<div class="sheet role-gate-card">' +
        '<button type="button" class="role-gate-close" id="roleGateClose">✕</button>' +
        '<button type="button" class="role-gate-back" id="roleGateBack">→ رجوع</button>' +
        '<h3 class="role-gate-title">' + title + '</h3>' +
        '<input type="password" id="roleGatePin" class="role-gate-input" placeholder="كلمة المرور" inputmode="text" autocomplete="off">' +
        '<button type="button" class="role-gate-btn" id="roleGateSubmit">دخول</button>' +
        '<p class="role-gate-error" id="roleGateError" style="display:none;">كلمة المرور غير صحيحة</p>' +
      '</div>';
    document.getElementById('roleGateClose').onclick = closeGate;
    document.getElementById('roleGateBack').onclick = (role === 'staff') ? showStaffNameStep : showRoleStep;
    const pinInput = document.getElementById('roleGatePin');
    const errorMsg = document.getElementById('roleGateError');
    const submitBtn = document.getElementById('roleGateSubmit');
    const submit = async () => {
      submitBtn.disabled = true;
      submitBtn.textContent = 'جاري التحقق...';
      const ok = await verifyRolePassword(role, pinInput.value, account);
      if (ok){
        window.location.href = ROLE_TARGETS[role];
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'دخول';
        errorMsg.style.display = 'block';
        pinInput.value = '';
        pinInput.focus();
      }
    };
    submitBtn.onclick = submit;
    pinInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    setTimeout(() => pinInput.focus(), 50);
  }

  // خطوة إضافية خاصة بالموظف بس: نعرض أسماء الموظفين (اللي يضيفهم المشرف
  // من لوحته) عشان يختار اسمه قبل ما يدخل كلمة مروره الخاصة فيه.
  async function showStaffNameStep(){
    const overlay = ensureOverlay();
    overlay.innerHTML =
      '<div class="sheet role-gate-card">' +
        '<button type="button" class="role-gate-close" id="roleGateClose">✕</button>' +
        '<button type="button" class="role-gate-back" id="roleGateBack">→ رجوع</button>' +
        '<h3 class="role-gate-title">اختر اسمك</h3>' +
        '<p class="role-gate-error" id="roleGateLoading" style="display:block;color:#888;">جاري تحميل الأسماء...</p>' +
      '</div>';
    document.getElementById('roleGateClose').onclick = closeGate;
    document.getElementById('roleGateBack').onclick = showRoleStep;

    const accounts = await fetchStaffAccounts();
    const staffAccounts = accounts.filter(a => a.role === 'staff');
    const card = overlay.querySelector('.role-gate-card');
    const loadingMsg = document.getElementById('roleGateLoading');

    if (!staffAccounts.length){
      loadingMsg.textContent = 'ما فيه موظفين مسجّلين بعد — المشرف يقدر يضيفهم من لوحته.';
      loadingMsg.style.color = '#e74c3c';
      return;
    }
    loadingMsg.remove();

    const select = document.createElement('select');
    select.id = 'roleGateNameSelect';
    select.className = 'role-gate-select';
    select.innerHTML =
      '<option value="" selected disabled hidden>اضغط هنا لاختيار اسمك</option>' +
      staffAccounts.map((a, i) => '<option value="' + i + '">' + (a.name || a.nameEn || ('موظف ' + (i + 1))) + '</option>').join('');
    card.appendChild(select);
    select.addEventListener('change', () => {
      if (select.value !== '') showPasswordStep('staff', staffAccounts[+select.value]);
    });
    setTimeout(() => { try { select.focus(); select.click(); } catch(e){} }, 100);
  }

  function showRoleStep(){
    const overlay = ensureOverlay();
    overlay.innerHTML =
      '<div class="sheet role-gate-card">' +
        '<button type="button" class="role-gate-close" id="roleGateClose">✕</button>' +
        '<h3 class="role-gate-title">اختر المهنة</h3>' +
        '<select id="roleGateSelect" class="role-gate-select" size="1">' +
          '<option value="" selected disabled hidden>اضغط هنا لاختيار المهنة</option>' +
          '<option value="owner">مالك</option>' +
          '<option value="supervisor">مشرف</option>' +
          '<option value="staff">موظف</option>' +
        '</select>' +
      '</div>';
    document.getElementById('roleGateClose').onclick = closeGate;
    const sel = document.getElementById('roleGateSelect');
    sel.addEventListener('change', () => {
      if (sel.value === 'staff') showStaffNameStep();
      else if (sel.value) showPasswordStep(sel.value);
    });
    // نفتح قائمة الاختيار تلقائيًا فور ظهور النافذة (تجربة أسرع للمستخدم)
    setTimeout(() => { try { sel.focus(); sel.click(); } catch(e){} }, 100);
  }

  let tapCount = 0;
  let tapTimer = null;
  function tryLogo(){
    const logo = document.querySelector('.footer-logo');
    if (!logo){ setTimeout(tryLogo, 500); return; }
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
      tapCount++;
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => { tapCount = 0; }, 3000);
      if (tapCount >= 5){
        tapCount = 0;
        clearTimeout(tapTimer);
        showRoleStep();
      }
    });
  }
  tryLogo();
})();

loadMenuData();

