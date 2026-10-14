
// ======== إعدادات التواصل — عدّل هذه القيم بمعلوماتك ========
// WhatsApp: رقم الجوال مع رمز الدولة بدون + أو مسافات أو أصفار في البداية
// مثال إماراتي: 971501234567  |  مثال سعودي: 966501234567
const IS_STAFF_STANDALONE = true;
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
function accountDisplayName(acc){ return (LANG==='en' && acc && acc.nameEn) ? acc.nameEn : (acc ? acc.name : ''); }
function receiptEmployeeName(receipt){ return (LANG==='en' && receipt.employeeNameEn) ? receipt.employeeNameEn : receipt.employee; }
function shiftStaffName(shift){ return (LANG==='en' && shift.staffNameEn) ? shift.staffNameEn : shift.staffName; }

/* ---------- Staff-only bilingual dictionary (AR/EN) ---------- */
const ST_TR = {
  ar: {
    staffPortalBadge: '☕ بوابة الموظف',
    staffLoginTitle: 'دخول الموظف',
    professionLabel: 'المهنة',
    professionPlaceholder: 'اختر المهنة',
    roleSupervisor: 'المشرف',
    roleStaff: 'الموظف',
    nameLabel: 'الاسم',
    nameChooseFirst: 'اختر المهنة أول',
    namePlaceholder: 'اختر اسمك',
    passwordLabel: 'كلمة المرور',
    passwordPlaceholder: 'كلمة المرور الخاصة فيك',
    loginBtn: 'دخول',
    wrongPassword: 'كلمة مرور خاطئة، حاول مرة أخرى',
    staffHint: 'صفحة خاصة بفريق العمل: تسوية طلبات وتسليم مجانيات برنامج الولاء.',
    viewMenuLink: '🔗 فتح صفحة المنيو كما يراها العميل',
    ownerLoginLink: '🔐 أنا المشرف — دخول لوحة التحكم',
    staffDisabledMsg: 'نظام الموظف معطّل حاليًا من المشرف. تواصل مع المشرف لتفعيله.',
    ownerLoginLinkOff: '🔐 دخول المشرف (لوحة التحكم)',

    topbarTitle: '☕ نظام الموظف',
    tabOrder: '🧾 طلب جديد',
    tabLoyalty: '👥 الولاء',
    logout: 'خروج',

    sidebarSales: 'المبيعات',
    sidebarIncoming: 'الطلبات الواردة',
    sidebarAllItems: 'كل المنتجات',
    sidebarReceipts: 'الإيصالات',
    sidebarEndShift: 'إنهاء الشفت الحالي',
    sidebarStartShift: 'بدء الشفت',
    sidebarShifts: 'الشفتات',
    sidebarChangePass: 'تغيير كلمة المرور',
    sidebarSettings: 'الإعدادات / لوحة التحكم',
    sidebarSupport: 'الدعم',

    comingSoon: 'قريبًا',
    searchProducts: 'ابحث عن منتج...',
    noResults: 'ما فيه نتائج',

    ticketClear: 'تفريغ السلة',
    ticketEdit: 'تعديل السلة',
    ticketPrint: 'طباعة الفاتورة',
    ticketSync: 'مزامنة البيانات',

    orderStatusNew: '🆕 جديد',
    orderStatusPreparing: '👨‍🍳 قيد التحضير',
    orderStatusReady: '✅ جاهز للتسليم',
    orderStatusCompleted: '📦 تم التسليم',
    orderStatusCancelRequested: '⚠️ الزبون طلب إلغاء',
    orderStatusCancelled: '❌ ملغي',
    nextStartPrep: 'بدء التحضير',
    nextReady: 'جاهز للتسليم',
    nextDone: 'تم التسليم',
    confirmCancel: '✅ تأكيد الإلغاء',
    dismissCancel: '↩️ تجاهل وإبقاء الطلب',
    waitingSupervisor: 'بانتظار تأكيد المشرف للإلغاء',
    incomingTitle: '📥 الطلبات الواردة',
    noActiveOrders: 'ما فيه طلبات نشطة حاليًا.',
    noOrdersAtAll: 'ما فيه طلبات واردة حاليًا.',
    recentCancelled: '❌ طلبات ملغاة مؤخرًا',

    paymentTitle: '💳 الدفع',
    amountDue: 'المبلغ المطلوب',
    cash: '💵 كاش',
    card: '💳 بطاقة',
    amountReceived: 'المبلغ المستلم',
    changeDue: 'الباقي للزبون',
    shortAmount: 'ناقص',
    chargeCash: '💵 تحصيل الدفعة',
    chargeCard: '💳 تأكيد الدفع بالبطاقة',
    discounts: 'خصومات',
    freeDiscount: '🎁 خصم مجاني',
    total: 'الإجمالي',
    receivedLabel: 'المستلم',
    changeLabel: 'الباقي',

    receiptsTitle: '🧾 الإيصالات',
    allSales: '(الكل)',
    mySales: '(مبيعاتي)',
    noReceipts: 'ما فيه إيصالات محفوظة بعد.',
    printReceipt: '🖨 طباعة الإيصال',
    cancelOrderBtn: '❌ إلغاء هذا الطلب',

    shiftsTitle: '📊 الشفتات',
    myShifts: '(شفتاتي)',
    allShifts: '(الكل)',
    noShifts: 'ما فيه شفتات محفوظة بعد.',
    shiftSummaryTitle: '📊 ملخص الشفت',
    totalSales: 'إجمالي المبيعات',
    employee: 'الموظف',
    orderCount: 'عدد الطلبات',
    startTime: 'البداية',
    endTime: 'النهاية',
    duration: 'المدة',

    changePassTitle: '🔑 تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور الجديدة',
    save: 'حفظ'
  },
  en: {
    staffPortalBadge: '☕ Staff Portal',
    staffLoginTitle: 'Staff Login',
    professionLabel: 'Role',
    professionPlaceholder: 'Choose your role',
    roleSupervisor: 'Supervisor',
    roleStaff: 'Staff',
    nameLabel: 'Name',
    nameChooseFirst: 'Choose role first',
    namePlaceholder: 'Choose your name',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Your password',
    loginBtn: 'Login',
    wrongPassword: 'Wrong password, try again',
    staffHint: 'For staff only: manage orders and redeem loyalty rewards.',
    viewMenuLink: '🔗 View menu as customer sees it',
    ownerLoginLink: '🔐 I\'m the supervisor — Dashboard login',
    staffDisabledMsg: 'Staff system is currently disabled by the supervisor. Contact the supervisor to enable it.',
    ownerLoginLinkOff: '🔐 Supervisor login (Dashboard)',

    topbarTitle: '☕ Staff System',
    tabOrder: '🧾 New Order',
    tabLoyalty: '👥 Loyalty',
    logout: 'Log out',

    sidebarSales: 'Sales',
    sidebarIncoming: 'Incoming Orders',
    sidebarAllItems: 'All Products',
    sidebarReceipts: 'Receipts',
    sidebarEndShift: 'End Current Shift',
    sidebarStartShift: 'Start Shift',
    sidebarShifts: 'Shifts',
    sidebarChangePass: 'Change Password',
    sidebarSettings: 'Settings / Dashboard',
    sidebarSupport: 'Support',

    comingSoon: 'Coming soon',
    searchProducts: 'Search products...',
    noResults: 'No results',

    ticketClear: 'Clear Cart',
    ticketEdit: 'Edit Cart',
    ticketPrint: 'Print Receipt',
    ticketSync: 'Sync Data',

    orderStatusNew: '🆕 New',
    orderStatusPreparing: '👨‍🍳 Preparing',
    orderStatusReady: '✅ Ready',
    orderStatusCompleted: '📦 Delivered',
    orderStatusCancelRequested: '⚠️ Customer requested cancellation',
    orderStatusCancelled: '❌ Cancelled',
    nextStartPrep: 'Start Preparing',
    nextReady: 'Mark Ready',
    nextDone: 'Mark Delivered',
    confirmCancel: '✅ Confirm Cancellation',
    dismissCancel: '↩️ Dismiss & Keep Order',
    waitingSupervisor: 'Waiting for supervisor to confirm cancellation',
    incomingTitle: '📥 Incoming Orders',
    noActiveOrders: 'No active orders right now.',
    noOrdersAtAll: 'No incoming orders yet.',
    recentCancelled: '❌ Recently Cancelled',

    paymentTitle: '💳 Payment',
    amountDue: 'Amount Due',
    cash: '💵 Cash',
    card: '💳 Card',
    amountReceived: 'Amount Received',
    changeDue: 'Change Due',
    shortAmount: 'Short',
    chargeCash: '💵 Charge',
    chargeCard: '💳 Confirm Card Payment',
    discounts: 'Discounts',
    freeDiscount: '🎁 Free Item Discount',
    total: 'Total',
    receivedLabel: 'Received',
    changeLabel: 'Change',

    receiptsTitle: '🧾 Receipts',
    allSales: '(All)',
    mySales: '(My Sales)',
    noReceipts: 'No receipts saved yet.',
    printReceipt: '🖨 Print Receipt',
    cancelOrderBtn: '❌ Cancel This Order',

    shiftsTitle: '📊 Shifts',
    myShifts: '(My Shifts)',
    allShifts: '(All)',
    noShifts: 'No shifts saved yet.',
    shiftSummaryTitle: '📊 Shift Summary',
    totalSales: 'Total Sales',
    employee: 'Employee',
    orderCount: 'Orders Count',
    startTime: 'Start',
    endTime: 'End',
    duration: 'Duration',

    changePassTitle: '🔑 Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm New Password',
    save: 'Save'
  }
};
function st(key){ return (ST_TR[LANG] && ST_TR[LANG][key]) || key; }

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

// تحديث تلقائي لأرقام المبيعات كل 60 ثانية — بس لو لوحة "المبيعات والتقارير"
// مفتوحة فعليًا وبتبويب الرئيسية (وين الأرقام تظهر)، ويتوقف تلقائيًا لو
// المتصفح بالخلفية (الصفحة مو ظاهرة) عشان ما نستهلك قراءات بلا داعي.
setInterval(async () => {
  if (document.hidden) return;
  if (typeof reportSection !== 'undefined' && reportSection !== 'home') return;
  if (!adminOverlayEl || !adminOverlayEl.classList.contains('open')) return;
  if (!currentReportsBodyEl) return;
  await refreshReportsData();
  renderAdminReportsTab(currentReportsBodyEl);
}, 60000);

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
          openOptionsSheet(item);
        });
      }
      body.appendChild(addBtn);

      card.appendChild(imgWrap);
      card.appendChild(body);

      if (!isComingSoon) {
        card.addEventListener('click', () => {
          openOptionsSheet(item);
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
let selDiscount = null; // { id, label, percent } | null

function renderDiscountGroup(){
  const field = document.getElementById('discountField');
  const group = document.getElementById('discountGroup');
  group.innerHTML = '';
  if (!DISCOUNT_PRESETS.length){ field.style.display = 'none'; return; }
  field.style.display = 'block';
  DISCOUNT_PRESETS.forEach(preset => {
    const row = document.createElement('div');
    const active = selDiscount && selDiscount.id === preset.id;
    row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;border:1px solid #e2e2e2;border-radius:10px;padding:9px 12px;cursor:pointer;' +
      (active ? 'border-color:var(--hero-green);background:var(--green-50,#f3fbf6);' : '');
    row.innerHTML = `<span style="font-size:.85rem;font-weight:700;">${preset.label}</span><span style="font-size:.8rem;color:#888;">${preset.percent}%</span>`;
    row.onclick = () => {
      selDiscount = active ? null : preset;
      renderDiscountGroup();
      updateOptionsButton();
    };
    group.appendChild(row);
  });
}

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
  let unit = effectivePrice(currentOptionsItem);
  if (selDiscount) unit = unit * (1 - selDiscount.percent / 100);
  const total = unit * optQty;
  document.getElementById('optQtyNum').textContent = optQty;
  document.getElementById('addToCartBtn').innerHTML =
    `${t('addToCartBtn')} — ${fmt(total)} ${currencySVG}`;
}

let staffModSelections = {};
let staffModComment = '';
function openStaffModifierSheet(item){
  const groups = (item.staffModifierGroupIds || []).map(findModifierGroup).filter(Boolean);
  if (!groups.length){ openOptionsSheet(item); return; }

  currentOptionsItem = item;
  optQty = 1;
  staffModSelections = {};
  staffModComment = '';
  selDiscount = null;
  const clusters = buildModifierClusters(groups);
  clusters.forEach(cluster => {
    for (const g of cluster.members){
      const enabledIds = (item.modifierOptionOverrides && item.modifierOptionOverrides[g.id]) || (g.options || []).map(o => o.id);
      const firstEnabled = (g.options || []).find(o => enabledIds.includes(o.id));
      if (firstEnabled){ staffModSelections[g.id] = firstEnabled.id; break; } // كلستر واحد = اختيار افتراضي واحد بس
    }
  });

  const old = document.getElementById('staffModOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffModOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:85vh;overflow-y:auto;padding-bottom:16px;';
  overlay.appendChild(sheet);

  function render(){
    sheet.innerHTML = '';
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;';
    const title = document.createElement('h3');
    title.style.margin = '0';
    title.textContent = itemName(item);
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '→';
    closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(title); header.appendChild(closeBtn);
    sheet.appendChild(header);

    clusters.forEach(cluster => {
      const groupBox = document.createElement('div');
      groupBox.style.cssText = 'padding:0 16px 14px;';
      const gTitle = document.createElement('div');
      gTitle.style.cssText = 'font-weight:800;font-size:.85rem;color:var(--hero-green,#1f7a4d);margin-bottom:8px;';
      gTitle.textContent = cluster.members.map(g => LANG === 'en' ? (g.titleEn || g.title) : g.title).join(' / ');
      groupBox.appendChild(gTitle);
      const optList = document.createElement('div');
      optList.style.cssText = 'display:flex;flex-direction:column;gap:6px;';
      cluster.members.forEach(g => {
        const enabledIds = (item.modifierOptionOverrides && item.modifierOptionOverrides[g.id]) || (g.options || []).map(o => o.id);
        (g.options || []).filter(opt => enabledIds.includes(opt.id)).forEach(opt => {
          const selected = staffModSelections[g.id] === opt.id;
          const row = document.createElement('div');
          row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;border:1.5px solid ' +
            (selected ? 'var(--hero-green,#1f7a4d)' : '#e2e2e2') + ';border-radius:10px;padding:9px 12px;font-size:.85rem;cursor:pointer;' +
            (selected ? 'background:var(--green-50,#f3fbf6);' : '');
          const left = document.createElement('span');
          left.textContent = (LANG === 'en' ? (opt.nameEn || opt.name) : opt.name);
          const right = document.createElement('span');
          right.style.cssText = 'color:#888;font-weight:700;';
          right.textContent = opt.price ? ('+' + opt.price.toFixed(2)) : '—';
          row.appendChild(left); row.appendChild(right);
          row.onclick = () => {
            if (cluster.exclusive) cluster.members.forEach(m => delete staffModSelections[m.id]);
            staffModSelections[g.id] = opt.id;
            render();
          };
          optList.appendChild(row);
        });
      });
      groupBox.appendChild(optList);
      sheet.appendChild(groupBox);
    });

    const commentBox = document.createElement('div');
    commentBox.style.cssText = 'padding:0 16px 14px;';
    const commentLabel = document.createElement('div');
    commentLabel.style.cssText = 'font-weight:800;font-size:.85rem;color:var(--hero-green,#1f7a4d);margin-bottom:8px;';
    commentLabel.textContent = 'ملاحظة (اختياري)';
    const commentInput = document.createElement('textarea');
    commentInput.value = staffModComment;
    commentInput.placeholder = 'مثال: بدون ثلج، حار زيادة...';
    commentInput.rows = 2;
    commentInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:10px;padding:8px 10px;font-size:.85rem;font-family:inherit;resize:vertical;';
    commentInput.addEventListener('input', () => { staffModComment = commentInput.value; });
    keepFieldVisibleOnKeyboard(commentInput);
    commentBox.appendChild(commentLabel);
    commentBox.appendChild(commentInput);
    sheet.appendChild(commentBox);

    if (DISCOUNT_PRESETS.length){
      const discBox = document.createElement('div');
      discBox.style.cssText = 'padding:0 16px 14px;';
      const discTitle = document.createElement('div');
      discTitle.style.cssText = 'font-weight:800;font-size:.85rem;color:var(--hero-green,#1f7a4d);margin-bottom:8px;';
      discTitle.textContent = 'الخصومات';
      discBox.appendChild(discTitle);
      const discList = document.createElement('div');
      discList.style.cssText = 'display:flex;flex-direction:column;gap:6px;';
      DISCOUNT_PRESETS.forEach(preset => {
        const active = selDiscount && selDiscount.id === preset.id;
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;border:1.5px solid ' +
          (active ? 'var(--hero-green,#1f7a4d)' : '#e2e2e2') + ';border-radius:10px;padding:9px 12px;font-size:.85rem;cursor:pointer;' +
          (active ? 'background:var(--green-50,#f3fbf6);' : '');
        row.innerHTML = `<span>${preset.label}</span><span style="color:#888;font-weight:700;">${preset.percent}%</span>`;
        row.onclick = () => { selDiscount = active ? null : preset; render(); };
        discList.appendChild(row);
      });
      discBox.appendChild(discList);
      sheet.appendChild(discBox);
    }

    // الفوتر (عداد الكمية + زر الإضافة) ثابت بأسفل الشاشة دائماً فوق الكيبورد
    const stickyFooter = document.createElement('div');
    stickyFooter.className = 'sheet-sticky-footer';
    stickyFooter.style.cssText = 'padding:0 16px 4px;';

    const qtyRow = document.createElement('div');
    qtyRow.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:18px;padding:6px 0 10px;';
    const minus = document.createElement('button');
    minus.textContent = '−';
    minus.style.cssText = 'width:36px;height:36px;border-radius:50%;border:1px solid #ddd;background:#fff;font-size:1.1rem;cursor:pointer;';
    minus.onclick = () => { if (optQty > 1) optQty--; render(); };
    const num = document.createElement('span');
    num.style.cssText = 'font-weight:800;font-size:1rem;min-width:20px;text-align:center;';
    num.textContent = optQty;
    const plus = document.createElement('button');
    plus.textContent = '+';
    plus.style.cssText = 'width:36px;height:36px;border-radius:50%;border:1px solid #ddd;background:#fff;font-size:1.1rem;cursor:pointer;';
    plus.onclick = () => { optQty++; render(); };
    qtyRow.appendChild(minus); qtyRow.appendChild(num); qtyRow.appendChild(plus);
    stickyFooter.appendChild(qtyRow);

    let modifierTotal = 0;
    const chosen = [];
    groups.forEach(g => {
      const optId = staffModSelections[g.id];
      const opt = (g.options || []).find(o => o.id === optId);
      if (opt){
        modifierTotal += opt.price || 0;
        chosen.push({ groupTitle: g.title, optionName: opt.name, price: opt.price || 0 });
      }
    });
    const unitTotal = (effectivePrice(item) + modifierTotal) * (selDiscount ? (1 - selDiscount.percent / 100) : 1);

    const addBtn = document.createElement('button');
    addBtn.className = 'primary-btn';
    addBtn.style.cssText = 'display:block;width:100%;margin:0;';
    addBtn.textContent = `إضافة للسلة — ${(unitTotal * optQty).toFixed(2)} ${SETTINGS.currencySymbol || ''}`.trim();
    addBtn.onclick = () => {
      const key = item.id + '|mod|' + groups.map(g => staffModSelections[g.id]).join(',') + '|' + Date.now();
      if (!CART[key]) {
        CART[key] = { item, qty: 0, options: { staffModifiers: chosen, modifierTotal, comment: staffModComment.trim() || undefined, discountPreset: selDiscount } };
      }
      CART[key].qty += optQty;
      overlay.remove();
      renderCartBar();
      if (document.getElementById('cartOverlay').classList.contains('open')) renderCartSheet();
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
  selBean = 'brazil'; selTemp = 'iced'; selSugar = 'none'; optQty = 1; selDiscount = null;

  document.getElementById('optionsItemName').textContent = itemName(item);
  document.getElementById('optionsItemImg').src = IMAGES[item.img] || '';
  const d = itemDesc(item);
  const eff = effectivePrice(item);
  document.getElementById('optionsItemPrice').innerHTML = hasDiscount(item)
    ? `<span style="text-decoration:line-through;opacity:.55;font-size:.85em;">${item.price.toFixed(2)}</span> ${eff.toFixed(2)} ${currencySVG}`
    : eff.toFixed(2) + ' ' + currencySVG;

  renderDiscountGroup();

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

['custName','custPhone','custPlate','custBirthdate'].forEach(id => {
  const el = document.getElementById(id);
  if (el) keepFieldVisibleOnKeyboard(el);
});

document.getElementById('addToCartBtn').addEventListener('click', () => {
  const item = currentOptionsItem;
  const showBean = !item.hasFlavors && !item.noBeanOrigin;
  const showTemp = !item.noBeanOrigin && !item.noTemp;
  const showSugar = !item.noSugar;
  const key = item.id + '|' + (showBean ? selBean : 'none') + '|' + (showTemp ? selTemp : 'none') + '|' + (showSugar ? selSugar : 'none') + '|' + (selFlavor || '') + '|' + (selDiscount ? selDiscount.id : 'none');
  if (!CART[key]) {
    CART[key] = { item, qty: 0, options: { bean: showBean ? selBean : null, temp: showTemp ? selTemp : null, sugar: showSugar ? selSugar : null, flavor: selFlavor, discountPreset: selDiscount } };
  }
  CART[key].qty += optQty;
  closeSheet('optionsOverlay');
  renderCartBar();
  if (document.getElementById('cartOverlay').classList.contains('open')) renderCartSheet();
});

function cartLineOptionsText(options){
  if (!options) return '';
  const bits = [];
  if (options.staffModifiers && options.staffModifiers.length){
    bits.push(options.staffModifiers.map(m => m.optionName + (m.price ? ` (+${m.price.toFixed(2)})` : '')).join(' • '));
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
  if (options.discountPreset) bits.push(`🏷 ${options.discountPreset.label} (-${options.discountPreset.percent}%)`);
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
  let unit = effectivePrice(item) + ((options && options.modifierTotal) || 0);
  if (options && options.discountPreset){
    unit = unit * (1 - options.discountPreset.percent / 100);
  }
  return unit;
}

function cartTotals(){
  clampFreeMarks();
  let count = 0, rawTotal = 0, freeDiscount = 0, discountTotal = 0;
  Object.entries(CART).forEach(([key, {item, qty, options}]) => {
    count += qty;
    const baseUnit = effectivePrice(item) + ((options && options.modifierTotal) || 0);
    const unit = cartLineUnitPrice(item, options);
    rawTotal += unit * qty;
    discountTotal += (baseUnit - unit) * qty;
    freeDiscount += unit * (freeMarks[key] || 0);
  });
  return { count, total: Math.max(0, rawTotal - freeDiscount), rawTotal, freeDiscount, discountTotal };
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
  if (document.body.classList.contains('staff-portal-mode')){
    openStaffPaymentScreen();
    return;
  }
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
document.getElementById('confirmPay').addEventListener('click', () => {
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

  // Build the order summary and send it to the café's WhatsApp immediately,
  // while still inside the click handler so the browser allows the popup.
  const waOrderLink = buildOrderWhatsAppLink({
    orderNo, name, phone, plateVal, tableVal
  });
  window.open(waOrderLink, '_blank');
  recordLoyaltyPurchase(phone, name, cartRawCount());

  btn.disabled = true;
  const prevHTML = label.innerHTML;
  label.innerHTML = `<span class="spinner"></span> ${t('confirming')}`;

  setTimeout(() => {
    btn.disabled = false;
    label.innerHTML = prevHTML;
    closeSheet('checkoutOverlay');

    document.getElementById('orderNumber').textContent = '#' + orderNo;
    const {total} = cartTotals();
    const typeText = orderType === 'pickup' ? t('typeTextPickup') : (t('typeTextTable') + ' ' + tableVal);
    const payText = payMethod === 'cash' ? t('payTextCash') : (payMethod === 'applepay' ? 'Apple Pay' : t('payTextOnline'));
    const plateText = plateVal ? ` — ${t('plateLabel')}: ${plateVal}` : '';
    document.getElementById('successDetails').textContent =
      `${typeText} — ${payText} — ${t('total')}: ${fmt(total)}${plateText}`;

    openSheet('successOverlay');

    // reset cart
    Object.keys(CART).forEach(k => delete CART[k]);
    renderCartBar();
  }, 1400);
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
async function loadEssentialLoginData(){
  SETTINGS = await Storage.loadSettings();
  STAFF_ACCOUNTS = await Storage.loadStaffAccounts();
  applySettings(SETTINGS);
}

async function loadFullStorageState(){
  // كانت 12 طلب متتالي لقاعدة البيانات (كل وحدة تنتظر الثانية) — سبب
  // رئيسي لتأخر ظهور البيانات. الحين كلهم بالتوازي بنفس الوقت.
  const [loaded, branches, offers, loyalty, staffGroups, modifierGroups,
    discountPresets, receipts, shifts, liveOrders, expenses, shiftSchedule] =
    await Promise.all([
      Storage.load(),
      Storage.loadBranches(),
      Storage.loadOffers(),
      Storage.loadLoyalty(),
      Storage.loadStaffGroups(),
      Storage.loadModifierGroups(),
      Storage.loadDiscountPresets(),
      Storage.loadReceipts(),
      Storage.loadShifts(),
      Storage.loadLiveOrders(),
      Storage.loadExpenses(),
      Storage.loadShiftSchedule()
    ]);
  MENU = loaded.menu;
  IMAGES = loaded.images;
  BRANCHES = branches;
  applyOffers(offers);
  LOYALTY = loyalty;
  STAFF_GROUPS = staffGroups;
  MODIFIER_GROUPS = modifierGroups;
  DISCOUNT_PRESETS = discountPresets;
  RECEIPTS = receipts;
  SHIFTS = shifts;
  LIVE_ORDERS = liveOrders;
  EXPENSES = expenses;
  SHIFT_SCHEDULE = shiftSchedule;
}

async function loadMenuData(){
  // هذا ملف الموظف المستقل: افتراضيًا بوابة موظف، لكن المالك يقدر يدخل بلوحة تحكم
  // كاملة (منتجات/فروع/عروض/إعدادات) عبر إضافة ?admin=1 لنفس الرابط.
  if (ADMIN_MODE){
    document.body.classList.add('owner-portal-mode');
    if (safeSessionGet('filanbon_admin_auth') === '1'){
      await loadEssentialLoginData();
      await loadFullStorageState();
      renderAdminPanel();
    } else {
      showAdminLogin(); // فورية تمامًا — بدون انتظار أي بيانات من Firebase
    }
    return;
  }

  document.body.classList.add('staff-portal-mode');
  const session = getCurrentStaffSession();
  if (session){
    CURRENT_STAFF = session;
    await loadEssentialLoginData();
    await loadFullStorageState();
    renderStaffPanel();
  } else {
    await loadEssentialLoginData(); // سريعة — بس الإعدادات وحسابات الموظفين (بدون صور/منتجات)
    showStaffLogin();
  }
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
const ADMIN_MODE = true; // هذا ملف المالك المستقل: يفتح مباشرة على لوحة التحكم دائمًا

const ADMIN_PASSWORD = 'filanbon2026';

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
  if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'PASTE_HERE') return false;
  if (typeof firebase === 'undefined') return false;
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    firestoreDb = firebase.firestore();
    firebaseAuth = firebase.auth();
    // App Check (reCAPTCHA Enterprise) — يثبت إن الطلبات جايه فعليًا من
    // موقعنا، مو من أداة/سكربت خارجي. Compat API (مو Modular).
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
  } catch(e){ return false; }
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
      catch(e){ return false; } // فشل الحفظ السحابي صامت — لا يوقف تجربة العميل
    }
    if (initFirebase()){
      try { await firestoreDb.collection('filanbon').doc(key).set({ value }); return true; }
      catch(e){ return false; }
    }
    try { localStorage.setItem('filanbon_' + key, value); return true; }
    catch(e){ return false; }
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
  async loadStaffGroups(){
    let raw = await this.get('staff-groups-live');
    let groups = null;
    if (raw){ try { groups = JSON.parse(raw); } catch(e){ groups = null; } }
    if (!groups){
      groups = [{"id": "staffgrp-coffee-default", "title": "Coffee", "titleEn": "Coffee", "itemIds": ["espresso", "double_espresso", "americano_2", "cappuccino", "macchiato", "cortado", "flat_white", "latte", "spanish_latte_2", "babyccino", "spanish_cortado", "piccolo", "spanish_piccolo"]}, {"id": "staffgrp-matcha-default", "title": "Matcha", "titleEn": "Matcha", "itemIds": ["iced_matcha_latte", "iced_cloudy_matcha", "strawberry_matcha", "hot_matcha_latte", "pistachio_cream"]}, {"id": "staffgrp-v60-default", "title": "V60", "titleEn": "V60", "itemIds": ["v60_2"]}, {"id": "staffgrp-mojito-default", "title": "Mojito", "titleEn": "Mojito", "itemIds": ["lemon_mint_mojito", "blue_mojito", "passion_fruit_mango_mojito", "passion_fruit_watermelon_mojito", "watermelon_lemonade", "fruity_hibiscus_mojito", "hibiscus_iced_tea", "water_still_sparkling", "lychee_mango_mojito"]}, {"id": "staffgrp-signature-default", "title": "Signature Drink", "titleEn": "Signature Drink", "itemIds": ["mocha_signature", "hot_chocolate", "dirty_cinnabon", "cinnabon_latte", "cinnamon_latte", "iced_cinnamon_latte", "iced_chocolate"]}, {"id": "staffgrp-icedtea-default", "title": "Iced Tea", "titleEn": "Iced Tea", "itemIds": ["شاي_الخوخ", "شاي_الليمون"]}, {"id": "staffgrp-acai-default", "title": "Acai", "titleEn": "Acai", "itemIds": ["acai_smoothie"]}, {"id": "staffgrp-sweets-default", "title": "Sweets", "titleEn": "Sweets", "itemIds": ["coconut_and_chocolate_chia_cup", "raspberry_chia_cup", "blueberry_cheesecake_healthy", "strawberry_cheesecake_healthy", "lava_cake", "choc_cream_cup", "blueberry_mango_chia", "cheesecake"]}];
      this.set('staff-groups-live', JSON.stringify(groups));
    }
    return groups;
  },
  async saveStaffGroups(groups){
    return await this.set('staff-groups-live', JSON.stringify(groups));
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
  async loadDiscountPresets(){
    let raw = await this.get('discount-presets-live');
    let presets = null;
    if (raw){ try { presets = JSON.parse(raw); } catch(e){ presets = null; } }
    if (!presets){
      presets = [
        { id: 'disc-15', label: '15%', percent: 15 },
        { id: 'disc-20', label: '20%', percent: 20 },
        { id: 'disc-family', label: 'خصم عائلي', percent: 30 },
        { id: 'disc-100', label: 'مجاني بالكامل', percent: 100 }
      ];
      this.set('discount-presets-live', JSON.stringify(presets));
    }
    return presets;
  },
  async saveDiscountPresets(presets){
    return await this.set('discount-presets-live', JSON.stringify(presets));
  },
  async loadStaffAccounts(){
    let raw = await this.get('staff-accounts-live');
    let accounts = null;
    if (raw){ try { accounts = JSON.parse(raw); } catch(e){ accounts = null; } }
    if (!accounts || !accounts.length){
      accounts = [
        { id: 'acc-supervisor-default', name: 'المشرف', nameEn: 'Supervisor', password: 'admin2026', role: 'supervisor' },
        { id: 'acc-mohammed-default', name: 'Mohammed', nameEn: 'Mohammed', password: '123456', role: 'staff' }
      ];
      this.set('staff-accounts-live', JSON.stringify(accounts));
    }
    return accounts;
  },
  async saveStaffAccounts(accounts){
    return await this.set('staff-accounts-live', JSON.stringify(accounts));
  },
  async loadReceipts(){
    let raw = await this.get('receipts-live');
    let receipts = null;
    if (raw){ try { receipts = JSON.parse(raw); } catch(e){ receipts = null; } }
    if (!receipts) receipts = [];
    return receipts;
  },
  async saveReceipts(receipts){
    return await this.set('receipts-live', JSON.stringify(receipts));
  },
  async addReceipt(receipt){
    const receipts = await this.loadReceipts();
    receipts.unshift(receipt);
    return await this.saveReceipts(receipts);
  },
  async loadExpenses(){
    let raw = await this.get('expenses-live');
    let expenses = null;
    if (raw){ try { expenses = JSON.parse(raw); } catch(e){ expenses = null; } }
    if (!expenses) expenses = [];
    return expenses;
  },
  async saveExpenses(expenses){
    return await this.set('expenses-live', JSON.stringify(expenses));
  },
  async loadShiftSchedule(){
    let raw = await this.get('shift-schedule-live');
    let sched = null;
    if (raw){ try { sched = JSON.parse(raw); } catch(e){ sched = null; } }
    if (!sched) sched = [];
    return sched;
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
  async updateLiveOrder(orderId, patch){
    const orders = await this.loadLiveOrders();
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx === -1) return null;
    orders[idx] = Object.assign({}, orders[idx], patch);
    await this.saveLiveOrders(orders);
    return orders[idx];
  },
  async loadShifts(){
    let raw = await this.get('shifts-live');
    let shifts = null;
    if (raw){ try { shifts = JSON.parse(raw); } catch(e){ shifts = null; } }
    if (!shifts) shifts = [];
    return shifts;
  },
  async saveShifts(shifts){
    return await this.set('shifts-live', JSON.stringify(shifts));
  },
  async addShift(shift){
    const shifts = await this.loadShifts();
    shifts.unshift(shift);
    return await this.saveShifts(shifts);
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
    staffAccentColor: '#0e7c3a'
  }, settings || {});
  CONFIG.instagramUrl = SETTINGS.instagramUrl;
  CONFIG.tiktokUrl = SETTINGS.tiktokUrl;
  CONFIG.whatsappMessage = SETTINGS.whatsappMessage;
  document.querySelectorAll('.hero-title, .footer-name').forEach(el => { el.textContent = SETTINGS.siteName; });
  if (SETTINGS.siteName && typeof IS_STAFF_STANDALONE === 'undefined') document.title = SETTINGS.siteName;
  applyTheme(SETTINGS.primaryColor);
  document.documentElement.style.setProperty('--staff-accent', SETTINGS.staffAccentColor || '#0e7c3a');
  if (typeof applyConfig === 'function') applyConfig();
}

/* ---------- Offers (storewide buy-X-get-Y) ---------- */
let OFFERS = { buyXGetY: { enabled: false, buyCount: 4, freeCount: 1 } };
function applyOffers(offers){
  OFFERS = Object.assign({ buyXGetY: { enabled: false, buyCount: 4, freeCount: 1 } }, offers || {});
  if (!OFFERS.buyXGetY) OFFERS.buyXGetY = { enabled: false, buyCount: 4, freeCount: 1 };
}

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
async function recordLoyaltyPurchase(phone, name, itemCount){
  const key = normalizePhone(phone);
  if (!key || !itemCount) return;
  const prev = LOYALTY[key] || { name, totalItems: 0, redeemedFree: 0, ordersCount: 0 };
  LOYALTY[key] = {
    name: name || prev.name,
    phone: phone,
    totalItems: (prev.totalItems || 0) + itemCount,
    redeemedFree: prev.redeemedFree || 0,
    ordersCount: (prev.ordersCount || 0) + 1,
    lastOrderAt: Date.now()
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

/* ---------- Staff priced modifier groups (owner-controlled add-ons, staff site only) ---------- */
let MODIFIER_GROUPS = []; // [{ id, title, titleEn, options: [{ id, name, nameEn, price }] }]
function findModifierGroup(id){ return MODIFIER_GROUPS.find(g => g.id === id); }
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

let DISCOUNT_PRESETS = [];
let STAFF_ACCOUNTS = [];
let CURRENT_STAFF = null; // { id, name, role }

function getCurrentStaffSession(){
  try {
    const raw = safeSessionGet('filanbon_staff_auth');
    if (!raw || raw === '1') return null;
    return JSON.parse(raw);
  } catch(e){ return null; }
}
function setCurrentStaffSession(account){
  const session = { id: account.id, name: account.name, nameEn: account.nameEn || '', role: account.role };
  safeSessionSet('filanbon_staff_auth', JSON.stringify(session));
  CURRENT_STAFF = session;
}
function clearCurrentStaffSession(){
  safeSessionRemove('filanbon_staff_auth');
  CURRENT_STAFF = null;
}
let RECEIPTS = [];
let SHIFTS = [];
let LIVE_ORDERS = [];
let EXPENSES = [];
let SHIFT_SCHEDULE = [];
let ACTIVE_SHIFT = null; // { id, staffId, staffName, startTime, ordersCount, cashTotal, cardTotal }

function loadActiveShiftForCurrentStaff(){
  try {
    const raw = safeSessionGet('filanbon_active_shift');
    if (!raw) return null;
    const shift = JSON.parse(raw);
    if (CURRENT_STAFF && shift.staffId === CURRENT_STAFF.id) return shift;
    return null;
  } catch(e){ return null; }
}
function saveActiveShiftSession(shift){
  if (shift) safeSessionSet('filanbon_active_shift', JSON.stringify(shift));
  else safeSessionRemove('filanbon_active_shift');
}
function startStaffShift(){
  ACTIVE_SHIFT = {
    id: 'shift-' + Date.now(),
    staffId: CURRENT_STAFF.id,
    staffName: CURRENT_STAFF.name,
    staffNameEn: CURRENT_STAFF.nameEn || '',
    startTime: new Date().toISOString(),
    ordersCount: 0,
    cashTotal: 0,
    cardTotal: 0
  };
  saveActiveShiftSession(ACTIVE_SHIFT);
}
async function endStaffShift(){
  if (!ACTIVE_SHIFT) return null;
  const shift = Object.assign({}, ACTIVE_SHIFT, { endTime: new Date().toISOString() });
  await Storage.addShift(shift);
  SHIFTS.unshift(shift);
  ACTIVE_SHIFT = null;
  saveActiveShiftSession(null);
  return shift;
}
function recordOrderInActiveShift(payMethod, amount){
  if (!ACTIVE_SHIFT) return;
  ACTIVE_SHIFT.ordersCount += 1;
  if (payMethod === 'cash') ACTIVE_SHIFT.cashTotal += amount;
  else ACTIVE_SHIFT.cardTotal += amount;
  saveActiveShiftSession(ACTIVE_SHIFT);
}
function formatShiftDuration(startIso, endIso){
  const ms = new Date(endIso) - new Date(startIso);
  const totalMin = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(totalMin / 60), m = totalMin % 60;
  return h > 0 ? `${h} س ${m} د` : `${m} د`;
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
  body.staff-portal-mode > *:not(.staff-overlay):not(.inline-dialog-overlay):not(.admin-toast):not(#cartOverlay):not(#optionsOverlay):not(#checkoutOverlay):not(#successOverlay):not(.cart-bar):not(#staffModOverlay):not(#staffSidebarOverlay):not(#staffTicketMenu):not(#staffAllItemsOverlay):not(#staffPaymentOverlay):not(#staffReceiptDetailOverlay):not(#staffReceiptsListOverlay):not(#staffShiftSummaryOverlay):not(#staffShiftsListOverlay):not(#staffChangePassOverlay):not(#staffIncomingOrdersOverlay):not(#staffOrderNotifyOverlay):not(#staffSplitSummaryOverlay){ display:none !important; }
  body.staff-portal-mode #staffSplitSummaryOverlay{ z-index:250; }
  body.staff-portal-mode #staffOrderNotifyOverlay{ z-index:300; }
  body.staff-portal-mode #staffIncomingOrdersOverlay{ z-index:250; }
  body.staff-portal-mode #staffChangePassOverlay{ z-index:250; }
  body.staff-portal-mode #staffSidebarOverlay,
  body.staff-portal-mode #staffTicketMenu,
  body.staff-portal-mode #staffAllItemsOverlay{ z-index:260; }
  body.staff-portal-mode #staffModOverlay,
  body.staff-portal-mode #staffPaymentOverlay,
  body.staff-portal-mode #staffReceiptDetailOverlay,
  body.staff-portal-mode #staffReceiptsListOverlay,
  body.staff-portal-mode #staffShiftSummaryOverlay,
  body.staff-portal-mode #staffShiftsListOverlay{ z-index:250; }

  /* ---- Staff portal: تصميم داكن منفصل تمامًا عن الزبون والمالك ---- */
  .staff-overlay{
    position:fixed;inset:0;z-index:200;background:#ffffff;
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
  .staff-flag-stripe{
    height:4px;width:100%;
    background:linear-gradient(90deg,
      #d21034 0%, #d21034 14%,
      #00732f 14%, #00732f 45%,
      #f7f7f7 45%, #f7f7f7 72%,
      #0e7c3a 72%, #0e7c3a 100%);
  }
  .staff-login-wrap{
    min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:#f4fbf6;
  }
  .staff-login-card{
    background:#ffffff;border:1px solid #d7ecdf;border-radius:20px;
    padding:0 22px 26px;width:100%;max-width:360px;box-sizing:border-box;overflow:hidden;
    box-shadow:0 10px 30px rgba(14,124,58,.08);
  }
  .staff-login-card .staff-flag-stripe{ margin:0 -22px 20px; width:calc(100% + 44px); border-radius:20px 20px 0 0; }
  .staff-login-card h2{color:#0d2818;font-size:1.2rem;margin:0 0 16px;text-align:center;}
  .staff-badge{
    display:block;text-align:center;background:var(--staff-accent, #0e7c3a);color:#fff;font-weight:800;
    font-size:.75rem;padding:5px 10px;border-radius:99px;margin:0 auto 16px;width:fit-content;
  }
  .staff-login-card input{
    width:100%;box-sizing:border-box;padding:13px 14px;border-radius:12px;
    border:1.5px solid #cfe9d9;background:#f4fbf6;color:#0d2818;font-size:1rem;
    margin-bottom:12px;direction:ltr;text-align:center;
  }
  .staff-btn{
    width:100%;background:var(--staff-accent, #0e7c3a);color:#fff;border:none;
    padding:13px;border-radius:12px;font-weight:800;font-size:.95rem;cursor:pointer;
  }
  .staff-btn.secondary{background:#eaf7ef;color:#0d2818;}
  .staff-hint{font-size:.75rem;color:#5b7566;margin:14px 0 0;line-height:1.6;text-align:center;}
  .staff-link{display:block;text-align:center;margin-top:16px;color:var(--staff-accent, #0e7c3a);font-size:.82rem;text-decoration:none;}

  .staff-topbar{
    position:sticky;top:0;z-index:5;background:#ffffff;
    padding:14px 16px 12px;display:flex;align-items:center;justify-content:space-between;gap:10px;
    box-shadow:0 1px 0 #eaf3ec;
  }
  .staff-topbar-title{color:#0d2818;font-weight:800;font-size:1rem;}
  .staff-tabs{display:flex;gap:8px;}
  .staff-tab-btn{
    background:#eaf7ef;color:#28503a;border:none;padding:9px 14px;border-radius:99px;
    font-weight:700;font-size:.82rem;cursor:pointer;
  }
  .staff-tab-btn.active{background:var(--staff-accent, #0e7c3a);color:#fff;}
  .staff-logout-btn{
    background:none;border:1px solid #cfe9d9;color:#28503a;border-radius:99px;
    padding:8px 12px;font-size:.78rem;cursor:pointer;
  }
  .staff-icon-btn{
    background:#eaf7ef;color:#0d2818;border:none;width:36px;height:36px;border-radius:10px;
    font-size:1.05rem;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  }

  /* ---- Left sidebar drawer (☰) ---- */
  .staff-drawer-overlay{
    position:fixed;inset:0;z-index:260;background:rgba(0,0,0,0);
    transition:background .2s;
  }
  .staff-drawer-overlay.open{ background:rgba(0,0,0,.4); }
  .staff-drawer-panel{
    position:absolute;top:0;right:0;height:100%;width:78%;max-width:300px;
    background:#ffffff;box-shadow:-4px 0 20px rgba(0,0,0,.15);
    transform:translateX(100%);transition:transform .25s;
    display:flex;flex-direction:column;padding:20px 0;
  }
  .staff-drawer-overlay.open .staff-drawer-panel{ transform:translateX(0); }
  .staff-drawer-head{ padding:0 20px 18px; border-bottom:1px solid #eaf3ec; margin-bottom:10px; }
  .staff-drawer-head .sd-role{ color:var(--staff-accent, #0e7c3a); font-weight:800; font-size:.85rem; }
  .staff-drawer-head .sd-place{ color:#0d2818; font-weight:700; font-size:.95rem; margin-top:2px; }
  .staff-drawer-item{
    display:flex;align-items:center;gap:12px;background:none;border:none;
    color:#0d2818;text-align:right;padding:14px 20px;font-size:.9rem;font-weight:700;cursor:pointer;
  }
  .staff-drawer-item:active{ background:#f4fbf6; }
  .staff-drawer-item .sd-icon{ font-size:1.1rem; }

  /* ---- Right dropdown menu (⋯) ---- */
  .staff-dropdown-menu{
    position:fixed;top:60px;left:16px;z-index:270;
    background:#fff;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.2);
    min-width:190px;overflow:hidden;padding:6px 0;border:1px solid #eaf3ec;
  }
  .staff-dropdown-item{
    display:flex;align-items:center;gap:10px;width:100%;background:none;border:none;
    text-align:right;padding:11px 16px;font-size:.85rem;font-weight:600;color:#0d2818;cursor:pointer;
  }
  .staff-dropdown-item:active{ background:#f4fbf6; }

  .staff-content{padding:16px;max-width:720px;margin:0 auto;background:#ffffff;}
  .staff-cat-grid{
    display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;
  }
  .staff-cat-tile{
    background:#f4fbf6;border:1px solid #d7ecdf;border-radius:16px;
    padding:22px 12px;text-align:center;cursor:pointer;transition:.15s;
  }
  .staff-cat-tile:active{background:#eaf7ef;}
  .staff-cat-tile .emoji{font-size:2rem;display:block;margin-bottom:8px;}
  .staff-cat-tile .title{color:#0d2818;font-weight:800;font-size:.88rem;}
  .staff-back-row{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
  .staff-back-btn{
    background:#eaf7ef;color:#0d2818;border:none;width:34px;height:34px;border-radius:10px;
    font-size:1rem;cursor:pointer;flex-shrink:0;
  }
  .staff-back-title{color:#0d2818;font-weight:800;font-size:1rem;}
  .staff-prod-grid{display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;}
  .staff-prod-tile{
    background:#f4fbf6;border:1px solid #d7ecdf;border-radius:14px;overflow:hidden;cursor:pointer;
    display:flex;align-items:center;justify-content:center;text-align:center;min-height:88px;
  }
  .staff-prod-tile:active{ background:#eaf7ef; }
  .staff-prod-tile .info{padding:14px 10px;}
  .staff-prod-tile .name{color:#0d2818;font-weight:700;font-size:.85rem;line-height:1.35;}
  .staff-prod-tile .price{color:var(--staff-accent, #0e7c3a);font-weight:800;font-size:.85rem;margin-top:6px;}
  .staff-prod-tile .price.disabled{color:#9aab9d;font-size:.72rem;}
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
function currentOwnerPassword(){
  return (SETTINGS.ownerPassword && SETTINGS.ownerPassword.trim()) || ADMIN_PASSWORD;
}

function switchToOwnerLogin(){
  document.body.classList.remove('staff-portal-mode');
  document.body.classList.add('owner-portal-mode');
  if (staffOverlayEl) staffOverlayEl.classList.remove('open');
  showAdminLogin();
}

function showStaffLogin(){
  ensureStaffOverlay();
  staffSheetEl.innerHTML = '';
  document.documentElement.lang = (LANG === 'ar' ? 'ar' : 'en');
  document.documentElement.dir = (LANG === 'ar' ? 'rtl' : 'ltr');

  const wrap = document.createElement('div');
  wrap.className = 'staff-login-wrap';
  const card = document.createElement('div');
  card.className = 'staff-login-card';

  const flagStripe = document.createElement('div');
  flagStripe.className = 'staff-flag-stripe';
  card.appendChild(flagStripe);

  const langBtn = document.createElement('button');
  langBtn.textContent = (LANG === 'ar' ? 'EN' : 'AR');
  langBtn.style.cssText = 'position:absolute;top:14px;' + (LANG === 'ar' ? 'left' : 'right') + ':14px;background:#eaf7ef;border:1px solid #cfe9d9;border-radius:8px;padding:5px 10px;font-size:.72rem;font-weight:800;color:#0d2818;cursor:pointer;';
  langBtn.onclick = () => { LANG = (LANG === 'ar') ? 'en' : 'ar'; showStaffLogin(); };
  card.style.position = 'relative';
  card.appendChild(langBtn);

  const badge = document.createElement('div');
  badge.className = 'staff-badge';
  badge.textContent = st('staffPortalBadge');
  card.appendChild(badge);

  const h2 = document.createElement('h2');
  h2.textContent = st('staffLoginTitle');
  card.appendChild(h2);

  if (SETTINGS.staffEnabled === false){
    const off = document.createElement('p');
    off.className = 'staff-hint';
    off.textContent = st('staffDisabledMsg');
    card.appendChild(off);
    const ownerLinkOff = document.createElement('button');
    ownerLinkOff.className = 'staff-link';
    ownerLinkOff.style.cssText = 'background:none;border:none;width:100%;cursor:pointer;font-family:inherit;';
    ownerLinkOff.textContent = st('ownerLoginLinkOff');
    ownerLinkOff.onclick = switchToOwnerLogin;
    card.appendChild(ownerLinkOff);
    wrap.appendChild(card);
    staffSheetEl.appendChild(wrap);
    openStaffOverlay();
    return;
  }

  const textAlignSide = LANG === 'ar' ? 'right' : 'left';

  const roleLabel = document.createElement('div');
  roleLabel.textContent = st('professionLabel');
  roleLabel.style.cssText = `font-size:.78rem;font-weight:700;color:#28503a;margin-bottom:6px;text-align:${textAlignSide};`;
  card.appendChild(roleLabel);

  const roleSelect = document.createElement('select');
  roleSelect.style.cssText = 'width:100%;box-sizing:border-box;padding:13px 14px;border-radius:12px;border:1.5px solid #cfe9d9;background:#f4fbf6;color:#0d2818;font-size:1rem;margin-bottom:12px;font-family:inherit;';
  const roleOpts = [['', st('professionPlaceholder')], ['supervisor', st('roleSupervisor')], ['staff', st('roleStaff')]];
  roleOpts.forEach(([val, label]) => {
    const opt = document.createElement('option');
    opt.value = val; opt.textContent = label;
    roleSelect.appendChild(opt);
  });
  card.appendChild(roleSelect);

  const nameLabel = document.createElement('div');
  nameLabel.textContent = st('nameLabel');
  nameLabel.style.cssText = `font-size:.78rem;font-weight:700;color:#28503a;margin-bottom:6px;text-align:${textAlignSide};`;
  card.appendChild(nameLabel);

  const nameSelect = document.createElement('select');
  nameSelect.style.cssText = 'width:100%;box-sizing:border-box;padding:13px 14px;border-radius:12px;border:1.5px solid #cfe9d9;background:#f4fbf6;color:#0d2818;font-size:1rem;margin-bottom:12px;font-family:inherit;';
  card.appendChild(nameSelect);

  function refreshNameOptions(){
    nameSelect.innerHTML = '';
    const placeholderOpt = document.createElement('option');
    placeholderOpt.value = '';
    placeholderOpt.textContent = roleSelect.value ? st('namePlaceholder') : st('nameChooseFirst');
    nameSelect.appendChild(placeholderOpt);
    STAFF_ACCOUNTS
      .filter(acc => !roleSelect.value || acc.role === roleSelect.value)
      .forEach(acc => {
        const opt = document.createElement('option');
        opt.value = acc.id;
        opt.textContent = accountDisplayName(acc);
        nameSelect.appendChild(opt);
      });
  }
  roleSelect.addEventListener('change', refreshNameOptions);

  const presetRole = new URLSearchParams(window.location.search).get('role');
  if (presetRole === 'supervisor' || presetRole === 'staff'){
    roleSelect.value = presetRole;
  }
  refreshNameOptions();

  const passLabel = document.createElement('div');
  passLabel.textContent = st('passwordLabel');
  passLabel.style.cssText = `font-size:.78rem;font-weight:700;color:#28503a;margin-bottom:6px;text-align:${textAlignSide};`;
  card.appendChild(passLabel);

  const input = document.createElement('input');
  input.type = 'password';
  input.placeholder = st('passwordPlaceholder');
  card.appendChild(input);

  const btn = document.createElement('button');
  btn.className = 'staff-btn';
  btn.textContent = st('loginBtn');
  btn.onclick = async () => {
    const account = STAFF_ACCOUNTS.find(a => a.id === nameSelect.value);
    if (account && input.value === account.password){
      unlockNotificationAudio();
      setCurrentStaffSession(account);
      btn.disabled = true;
      btn.textContent = LANG === 'ar' ? 'جاري تحميل البيانات...' : 'Loading data...';
      await loadFullStorageState();
      staffTab = 'order';
      staffCategoryIdx = null;
      renderStaffPanel();
    } else {
      input.style.borderColor = '#e74c3c';
      input.value = '';
      input.placeholder = st('wrongPassword');
    }
  };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });
  card.appendChild(btn);

  const hint = document.createElement('p');
  hint.className = 'staff-hint';
  hint.textContent = st('staffHint');
  card.appendChild(hint);

  const link = document.createElement('a');
  link.className = 'staff-link';
  link.textContent = st('viewMenuLink');
  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete('staff');
  link.href = cleanUrl.toString();
  link.target = '_blank';
  link.rel = 'noopener';
  card.appendChild(link);

  const ownerLink = document.createElement('button');
  ownerLink.className = 'staff-link';
  ownerLink.style.cssText = 'background:none;border:none;width:100%;cursor:pointer;font-family:inherit;color:var(--staff-accent, #0e7c3a);';
  ownerLink.textContent = st('ownerLoginLink');
  ownerLink.onclick = switchToOwnerLogin;
  card.appendChild(ownerLink);

  wrap.appendChild(card);
  staffSheetEl.appendChild(wrap);
  openStaffOverlay();
  setTimeout(() => input.focus(), 200);
}

/* ---------- Left sidebar menu (☰) ---------- */
function openStaffSidebar(){
  const old = document.getElementById('staffSidebarOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'staffSidebarOverlay';
  overlay.className = 'staff-drawer-overlay';

  const panel = document.createElement('div');
  panel.className = 'staff-drawer-panel';

  const head = document.createElement('div');
  head.className = 'staff-drawer-head';
  head.innerHTML = `<div class="sd-role">👤 ${CURRENT_STAFF ? accountDisplayName(CURRENT_STAFF) : st('roleStaff')}</div><div class="sd-place">${SETTINGS.siteName || 'Filanbon Cafe'}</div>`;
  panel.appendChild(head);

  const pendingCount = LIVE_ORDERS.filter(o => o.status === 'new' || o.status === 'preparing' || o.status === 'ready' || o.status === 'cancel_requested').length;
  const items = [
    { icon: '🛒', label: st('sidebarSales'), action: () => { staffTab = 'order'; staffCategoryIdx = null; overlay.remove(); renderStaffPanel(); } },
    { icon: '📥', label: st('sidebarIncoming') + (pendingCount ? ` (${pendingCount})` : ''), action: () => { overlay.remove(); openStaffIncomingOrders(); } },
    { icon: '📦', label: st('sidebarAllItems'), action: () => { overlay.remove(); openStaffAllItemsList(); } },
    { icon: '🧾', label: st('sidebarReceipts'), action: () => { overlay.remove(); openStaffReceiptsList(); } },
    ACTIVE_SHIFT
      ? { icon: '⏹', label: st('sidebarEndShift'), action: () => { overlay.remove(); confirmEndShift(); } }
      : { icon: '🕐', label: st('sidebarStartShift'), action: () => { overlay.remove(); startShiftFlow(); } },
    { icon: '📊', label: st('sidebarShifts'), action: () => { overlay.remove(); openStaffShiftsList(); } },
    { icon: '🔑', label: st('sidebarChangePass'), action: () => { overlay.remove(); openChangeMyPassword(); } },
    { icon: '⚙️', label: st('sidebarSettings'), action: () => { overlay.remove(); switchToOwnerLogin(); } },
    { icon: '☎️', label: st('sidebarSupport'), action: () => { overlay.remove(); openStaffSupportInfo(); } }
  ];
  items.forEach(it => {
    const row = document.createElement('button');
    row.className = 'staff-drawer-item';
    row.innerHTML = `<span class="sd-icon">${it.icon}</span><span>${it.label}</span>`;
    row.onclick = it.action;
    panel.appendChild(row);
  });

  overlay.appendChild(panel);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('open'));
}

function openStaffAllItemsList(){
  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffAllItemsOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:85vh;overflow-y:auto;padding-bottom:16px;';

  const header = document.createElement('div');
  header.style.cssText = 'position:sticky;top:0;background:#fff;z-index:2;padding:16px;border-bottom:1px solid #eee;';
  header.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
      <h3 style="margin:0;">${st('sidebarAllItems')}</h3>
      <button id="staffAllItemsClose" style="background:none;border:none;font-size:1.1rem;cursor:pointer;">→</button>
    </div>`;
  sheet.appendChild(header);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = st('searchProducts');
  searchInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:10px;padding:9px 12px;font-size:.9rem;';
  header.appendChild(searchInput);

  const listWrap = document.createElement('div');
  listWrap.style.cssText = 'padding:10px 16px;';
  sheet.appendChild(listWrap);

  const allItems = [];
  MENU.forEach(cat => cat.items.forEach(item => allItems.push({ item, catTitle: cat.title })));

  function renderList(filter){
    listWrap.innerHTML = '';
    const q = (filter || '').trim().toLowerCase();
    const filtered = q ? allItems.filter(({item}) => itemName(item).toLowerCase().includes(q)) : allItems;
    if (!filtered.length){
      listWrap.innerHTML = `<p style="color:#888;text-align:center;padding:20px;">${st('noResults')}</p>`;
      return;
    }
    filtered.forEach(({item, catTitle}) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f0f0f0;cursor:pointer;';
      const info = document.createElement('div');
      info.style.cssText = 'flex:1;';
      const isComingSoon = (item.price === null || item.price === undefined);
      info.innerHTML = `<div style="font-weight:700;font-size:.85rem;">${itemName(item)}</div>
        <div style="font-size:.75rem;color:#888;">${catTitle} ${isComingSoon ? '· ' + st('comingSoon') : '· ' + effectivePrice(item).toFixed(2)}</div>`;
      row.appendChild(info);
      if (!isComingSoon){
        row.onclick = () => {
          overlay.remove();
          if (item.useStaffModifiers && item.staffModifierGroupIds && item.staffModifierGroupIds.length){
            openStaffModifierSheet(item);
          } else {
            openOptionsSheet(item);
          }
        };
      } else {
        row.style.opacity = '.5';
      }
      listWrap.appendChild(row);
    });
  }
  renderList('');
  searchInput.addEventListener('input', () => renderList(searchInput.value));

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  document.getElementById('staffAllItemsClose').onclick = () => overlay.remove();
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  setTimeout(() => searchInput.focus(), 150);
}

function openStaffSupportInfo(){
  const msg = LANG === 'ar'
    ? `☎️ الدعم — تواصل مع المشرف عبر واتساب: ${CONFIG.whatsappNumber || CONFIG.phoneNumber || ''}`
    : `☎️ Support — contact the supervisor via WhatsApp: ${CONFIG.whatsappNumber || CONFIG.phoneNumber || ''}`;
  showInlineConfirm(msg, () => { window.open('https://wa.me/' + (CONFIG.whatsappNumber || '').replace(/[^\d]/g, ''), '_blank'); });
}

function openChangeMyPassword(){
  if (!CURRENT_STAFF) return;
  const old = document.getElementById('staffChangePassOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffChangePassOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'padding-bottom:16px;';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;';
  header.innerHTML = `<h3 style="margin:0;">${st('changePassTitle')}</h3>`;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '→';
  closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
  closeBtn.onclick = () => overlay.remove();
  header.appendChild(closeBtn);
  sheet.appendChild(header);

  const body = document.createElement('div');
  body.style.cssText = 'padding:0 16px;';

  function field(placeholder){
    const inp = document.createElement('input');
    inp.type = 'password';
    inp.placeholder = placeholder;
    inp.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #cfe9d9;border-radius:10px;padding:11px 12px;font-size:.9rem;margin-bottom:10px;';
    body.appendChild(inp);
    return inp;
  }
  const curInput = field(st('currentPassword'));
  const newInput = field(st('newPassword'));
  const confirmInput = field(st('confirmPassword'));
  sheet.appendChild(body);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'primary-btn';
  saveBtn.style.cssText = 'display:block;width:calc(100% - 32px);margin:6px 16px 0;';
  saveBtn.textContent = st('save');
  saveBtn.onclick = async () => {
    const account = STAFF_ACCOUNTS.find(a => a.id === CURRENT_STAFF.id);
    if (!account || curInput.value !== account.password){
      adminToast(LANG==='ar'?'كلمة المرور الحالية غلط':'Current password is wrong');
      return;
    }
    if (!newInput.value || newInput.value.length < 4){
      adminToast(LANG==='ar'?'كلمة المرور الجديدة قصيرة، اكتب 4 أحرف/أرقام على الأقل':'New password too short, use at least 4 characters');
      return;
    }
    if (newInput.value !== confirmInput.value){
      adminToast(LANG==='ar'?'تأكيد كلمة المرور ما يطابق':'Password confirmation does not match');
      return;
    }
    saveBtn.disabled = true;
    saveBtn.textContent = LANG==='ar'?'جاري الحفظ...':'Saving...';
    account.password = newInput.value;
    const ok = await Storage.saveStaffAccounts(STAFF_ACCOUNTS);
    saveBtn.disabled = false;
    saveBtn.textContent = st('save');
    if (ok){
      adminToast('✅ تم تغيير كلمة المرور بنجاح');
      overlay.remove();
    } else {
      adminToast('تعذّر الحفظ، حاول مرة أخرى');
    }
  };
  sheet.appendChild(saveBtn);

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

/* ---------- Staff payment screen (real cash/card charge flow) ---------- */
function openStaffPaymentScreen(){
  const { total, discountTotal, freeDiscount } = cartTotals();
  const old = document.getElementById('staffPaymentOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffPaymentOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:90vh;overflow-y:auto;padding-bottom:16px;';
  overlay.appendChild(sheet);

  let payMethod = 'cash';
  let cashReceived = total;
  let paymentMode = null; // null | 'direct' | 'split'
  let splitCount = null;
  let splitIndex = 0;
  let splitPayments = [];

  function quickAmounts(t){
    const base = Math.ceil(t / 10) * 10;
    return Array.from(new Set([base, base + 10, base + 50, Math.ceil(t/100)*100 + 100])).slice(0,4);
  }

  function currentDueAmount(){
    if (!splitCount) return total;
    const base = Math.floor((total / splitCount) * 100) / 100;
    const isLast = splitIndex === splitCount - 1;
    if (!isLast) return base;
    const sumSoFar = base * (splitCount - 1);
    return Math.round((total - sumSoFar) * 100) / 100;
  }

  function render(){
    sheet.innerHTML = '';
    const due = currentDueAmount();

    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;';
    header.innerHTML = `<h3 style="margin:0;">${st('paymentTitle')}${splitCount ? ` — ${LANG==='ar'?'الدفعة':'Payment'} ${splitIndex+1}/${splitCount}` : ''}</h3>`;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '→';
    closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);
    sheet.appendChild(header);

    // Ticket summary
    const ticketBox = document.createElement('div');
    ticketBox.style.cssText = 'padding:0 16px 12px;border-bottom:1px solid #eee;margin-bottom:14px;';
    Object.values(CART).forEach(({item, qty, options}) => {
      const unit = cartLineUnitPrice(item, options);
      const optsText = cartLineOptionsText(options);
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;padding:4px 0;font-size:.85rem;';
      row.innerHTML = `<span>${qty}x ${itemName(item)}${optsText ? '<br><small style="color:#888;">' + optsText + '</small>' : ''}</span><span>${(unit*qty).toFixed(2)}</span>`;
      ticketBox.appendChild(row);
    });
    if (discountTotal > 0){
      const dRow = document.createElement('div');
      dRow.style.cssText = 'display:flex;justify-content:space-between;padding:4px 0;font-size:.85rem;color:#c0392b;';
      dRow.innerHTML = `<span>${st('discounts')}</span><span>-${discountTotal.toFixed(2)}</span>`;
      ticketBox.appendChild(dRow);
    }
    if (freeDiscount > 0){
      const fRow = document.createElement('div');
      fRow.style.cssText = 'display:flex;justify-content:space-between;padding:4px 0;font-size:.85rem;color:#8a6d00;';
      fRow.innerHTML = `<span>${st('freeDiscount')}</span><span>-${freeDiscount.toFixed(2)}</span>`;
      ticketBox.appendChild(fRow);
    }
    if (splitCount){
      const splitInfoRow = document.createElement('div');
      splitInfoRow.style.cssText = 'display:flex;justify-content:space-between;padding:6px 0 0;font-size:.8rem;color:#666;font-weight:700;';
      splitInfoRow.innerHTML = `<span>${LANG==='ar'?'الإجمالي الكلي':'Grand total'}</span><span>${total.toFixed(2)}</span>`;
      ticketBox.appendChild(splitInfoRow);
    }
    sheet.appendChild(ticketBox);

    // Total due
    const totalBox = document.createElement('div');
    totalBox.style.cssText = 'text-align:center;padding:0 16px 16px;';
    totalBox.innerHTML = `<div style="font-size:1.7rem;font-weight:800;">${due.toFixed(2)} ${currencySVG}</div>
      <div style="color:#888;font-size:.8rem;">${splitCount ? (LANG==='ar'?'المطلوب من هذا الشخص':"This person's share") : st('amountDue')}</div>`;
    sheet.appendChild(totalBox);

    // ---- Step 1: choose mode (direct payment OR split bill) ----
    if (!paymentMode){
      const modeIntro = document.createElement('div');
      modeIntro.style.cssText = 'padding:0 16px 10px;font-size:.8rem;color:#888;text-align:center;';
      modeIntro.textContent = LANG==='ar' ? 'كيف يبي الزبون يدفع؟' : 'How does the customer want to pay?';
      sheet.appendChild(modeIntro);

      const directBtn = document.createElement('button');
      directBtn.textContent = '💳 ' + (LANG==='ar' ? 'دفع مباشر (شخص واحد)' : 'Direct payment (one person)');
      directBtn.style.cssText = 'display:block;width:calc(100% - 32px);margin:0 16px 10px;background:var(--hero-green,#0e7c3a);color:#fff;border:none;border-radius:12px;padding:14px;font-weight:800;font-size:.9rem;cursor:pointer;';
      directBtn.onclick = () => { paymentMode = 'direct'; render(); };
      sheet.appendChild(directBtn);

      const splitBtn = document.createElement('button');
      splitBtn.textContent = '👥 ' + (LANG==='ar' ? 'تقسيم الفاتورة على أكثر من شخص' : 'Split bill between people');
      splitBtn.style.cssText = 'display:block;width:calc(100% - 32px);margin:0 16px 6px;background:#eaf7ef;color:#0d2818;border:1.5px solid #cfe9d9;border-radius:12px;padding:14px;font-weight:800;font-size:.9rem;cursor:pointer;';
      splitBtn.onclick = () => {
        showInlinePrompt(
          LANG==='ar' ? 'الفاتورة راح تنقسم بالتساوي. كم شخص بيدفعون؟ (اكتب رقم من 2 إلى 10)' : 'The bill will be split equally. How many people are paying? (enter a number from 2 to 10)',
          '2',
          (val) => {
            const n = parseInt(val);
            if (!n || n < 2 || n > 10){ adminToast(LANG==='ar'?'رقم غير صحيح، اكتب بين 2 و10':'Invalid number, enter between 2 and 10'); return; }
            paymentMode = 'split';
            splitCount = n; splitIndex = 0; splitPayments = [];
            payMethod = 'cash'; cashReceived = currentDueAmount();
            render();
          }
        );
      };
      sheet.appendChild(splitBtn);
      return;
    }

    if (splitCount){
      const progressBox = document.createElement('div');
      progressBox.style.cssText = 'padding:0 16px 14px;font-size:.78rem;color:#888;text-align:center;';
      const doneList = splitPayments.map((p,i) => `#${i+1}: ${p.amount.toFixed(2)} (${methodLabelFor(p.method)})`).join(' • ');
      progressBox.innerHTML = doneList ? `${LANG==='ar'?'تم':'Paid'}: ${doneList}` : '';
      sheet.appendChild(progressBox);
    }

    // Payment method tabs
    const methodRow = document.createElement('div');
    methodRow.style.cssText = 'display:flex;gap:8px;padding:0 16px 14px;';
    const methodLabels = { cash: st('cash'), card: st('card'), applepay: 'Apple Pay' };
    ['cash','card','applepay'].forEach(m => {
      const btn = document.createElement('button');
      btn.textContent = methodLabels[m];
      const active = payMethod === m;
      btn.style.cssText = 'flex:1;padding:10px;border-radius:10px;font-weight:700;font-size:.85rem;cursor:pointer;border:1.5px solid ' +
        (active ? 'var(--hero-green,#1f7a4d)' : '#e2e2e2') + ';background:' + (active ? 'var(--green-50,#f3fbf6)' : '#fff') + ';';
      btn.onclick = () => { payMethod = m; if (m === 'cash') cashReceived = due; render(); };
      methodRow.appendChild(btn);
    });
    sheet.appendChild(methodRow);

    if (payMethod === 'cash'){
      const cashBox = document.createElement('div');
      cashBox.style.cssText = 'padding:0 16px 10px;';
      const label = document.createElement('div');
      label.style.cssText = 'font-size:.8rem;color:#666;margin-bottom:6px;';
      label.textContent = st('amountReceived');
      const input = document.createElement('input');
      input.type = 'number'; input.step = '0.01';
      input.value = cashReceived;
      input.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:10px;padding:10px 12px;font-size:1rem;text-align:center;font-weight:800;';
      input.addEventListener('input', () => { cashReceived = parseFloat(input.value) || 0; renderChange(); });
      cashBox.appendChild(label);
      cashBox.appendChild(input);
      sheet.appendChild(cashBox);

      const quickRow = document.createElement('div');
      quickRow.style.cssText = 'display:flex;gap:8px;padding:0 16px 14px;flex-wrap:wrap;';
      quickAmounts(due).forEach(amt => {
        const qBtn = document.createElement('button');
        qBtn.textContent = amt.toFixed(2);
        qBtn.style.cssText = 'flex:1;min-width:70px;padding:9px;border-radius:10px;border:1px solid #e2e2e2;background:#f7f7f7;font-weight:700;font-size:.85rem;cursor:pointer;';
        qBtn.onclick = () => { cashReceived = amt; render(); };
        quickRow.appendChild(qBtn);
      });
      sheet.appendChild(quickRow);

      const changeBox = document.createElement('div');
      changeBox.id = 'staffChangeBox';
      changeBox.style.cssText = 'text-align:center;padding:0 16px 14px;font-weight:800;';
      sheet.appendChild(changeBox);
      function renderChange(){
        const change = cashReceived - due;
        changeBox.innerHTML = change >= 0
          ? `<span style="color:var(--hero-green,#1f7a4d);">${st('changeDue')}: ${change.toFixed(2)}</span>`
          : `<span style="color:#c0392b;">${st('shortAmount')}: ${Math.abs(change).toFixed(2)}</span>`;
      }
      renderChange();
    }

    const chargeBtn = document.createElement('button');
    chargeBtn.className = 'primary-btn';
    chargeBtn.style.cssText = 'display:block;width:calc(100% - 32px);margin:6px 16px 0;';
    const canCharge = payMethod === 'card' || payMethod === 'applepay' || cashReceived >= due;
    const isLastSplit = splitCount && splitIndex === splitCount - 1;
    let btnLabel = payMethod === 'cash' ? st('chargeCash') : (payMethod === 'applepay' ? 'تأكيد الدفع عبر Apple Pay' : st('chargeCard'));
    if (splitCount && !isLastSplit) btnLabel += ` — ${LANG==='ar'?'التالي':'Next'}`;
    chargeBtn.textContent = btnLabel;
    chargeBtn.disabled = !canCharge;
    chargeBtn.style.opacity = canCharge ? '1' : '.5';
    chargeBtn.onclick = () => {
      if (splitCount){
        const paidAmount = payMethod === 'cash' ? cashReceived : due;
        splitPayments.push({ method: payMethod, amount: due, received: paidAmount, change: payMethod === 'cash' ? Math.max(0, paidAmount - due) : 0 });
        if (splitIndex < splitCount - 1){
          splitIndex++;
          payMethod = 'cash';
          cashReceived = currentDueAmount();
          render();
        } else {
          finalizeSplitStaffOrder(splitPayments, overlay);
        }
      } else {
        finalizeStaffOrder(payMethod, payMethod === 'cash' ? cashReceived : total, overlay);
      }
    };
    sheet.appendChild(chargeBtn);
  }

  render();
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function methodLabelFor(m){
  return m === 'cash' ? st('cash') : (m === 'applepay' ? 'Apple Pay' : st('card'));
}

async function finalizeSplitStaffOrder(payments, overlay){
  const { total, discountTotal, freeDiscount } = cartTotals();
  let nextNo = RECEIPTS.length ? (parseInt((RECEIPTS[0].shortNo || '0')) + 1) : 2234;
  const now = new Date();
  const lines = Object.values(CART).map(({item, qty, options}) => ({
    name: itemName(item),
    qty,
    unit: cartLineUnitPrice(item, options),
    optionsText: cartLineOptionsText(options)
  }));
  const groupId = 'split-' + Date.now();
  const newReceipts = [];

  payments.forEach((p, idx) => {
    const receipt = {
      id: 'rcpt-' + Date.now() + '-' + idx,
      shortNo: String(nextNo + idx),
      date: now.toISOString(),
      employee: CURRENT_STAFF ? CURRENT_STAFF.name : st('roleStaff'),
      employeeNameEn: CURRENT_STAFF ? CURRENT_STAFF.nameEn : '',
      employeeId: CURRENT_STAFF ? CURRENT_STAFF.id : null,
      placeName: SETTINGS.siteName || 'Filanbon Cafe',
      lines,
      discountTotal: idx === 0 ? discountTotal : 0,
      freeDiscount: idx === 0 ? freeDiscount : 0,
      total: p.amount,
      payMethod: p.method,
      amountReceived: p.received,
      change: p.change,
      splitInfo: { groupId, index: idx + 1, of: payments.length, orderTotal: total }
    };
    newReceipts.push(receipt);
  });

  const allReceipts = await Storage.loadReceipts();
  newReceipts.slice().reverse().forEach(r => allReceipts.unshift(r));
  await Storage.saveReceipts(allReceipts);
  RECEIPTS = allReceipts;
  payments.forEach(p => recordOrderInActiveShift(p.method, p.amount));

  Object.keys(CART).forEach(k => delete CART[k]);
  Object.keys(freeMarks).forEach(k => delete freeMarks[k]);
  renderCartBar();
  overlay.remove();
  staffCategoryIdx = null;
  if (staffTab) renderStaffPanel();
  adminToast(`✅ تم الدفع وحفظ ${newReceipts.length} فواتير منفصلة`);
  openStaffSplitReceiptsSummary(newReceipts);
}

function openStaffSplitReceiptsSummary(receipts){
  const old = document.getElementById('staffSplitSummaryOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffSplitSummaryOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:85vh;overflow-y:auto;padding-bottom:16px;';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;';
  header.innerHTML = `<h3 style="margin:0;">${LANG==='ar'?'✅ تم — الفواتير المنفصلة':'✅ Done — Split Receipts'}</h3>`;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '→';
  closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
  closeBtn.onclick = () => overlay.remove();
  header.appendChild(closeBtn);
  sheet.appendChild(header);

  const listWrap = document.createElement('div');
  listWrap.style.cssText = 'padding:0 16px;';
  receipts.forEach((r, i) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:12px 0;border-bottom:1px solid #f0f0f0;cursor:pointer;';
    row.innerHTML = `<span style="font-size:.88rem;font-weight:700;">${LANG==='ar'?'فاتورة':'Receipt'} #${r.shortNo} — ${methodLabelFor(r.payMethod)}</span><span style="font-weight:800;">${r.total.toFixed(2)}</span>`;
    row.onclick = () => openStaffReceiptDetail(r, false);
    listWrap.appendChild(row);
  });
  sheet.appendChild(listWrap);

  const printAllBtn = document.createElement('button');
  printAllBtn.className = 'primary-btn';
  printAllBtn.style.cssText = 'display:block;width:calc(100% - 32px);margin:14px 16px 0;';
  printAllBtn.textContent = LANG==='ar' ? '🖨 طباعة كل الفواتير' : '🖨 Print all receipts';
  printAllBtn.onclick = () => receipts.forEach((r, i) => setTimeout(() => printStaffReceiptObject(r), i * 500));
  sheet.appendChild(printAllBtn);

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

async function finalizeStaffOrder(payMethod, amountReceived, overlay){
  const { total, discountTotal, freeDiscount } = cartTotals();
  const receiptNo = RECEIPTS.length ? (parseInt((RECEIPTS[0].shortNo || '0')) + 1) : 2234;
  const now = new Date();
  const lines = Object.values(CART).map(({item, qty, options}) => ({
    name: itemName(item),
    qty,
    unit: cartLineUnitPrice(item, options),
    optionsText: cartLineOptionsText(options)
  }));
  const receipt = {
    id: 'rcpt-' + Date.now(),
    shortNo: String(receiptNo),
    date: now.toISOString(),
    employee: CURRENT_STAFF ? CURRENT_STAFF.name : st('roleStaff'),
    employeeNameEn: CURRENT_STAFF ? CURRENT_STAFF.nameEn : '',
    employeeId: CURRENT_STAFF ? CURRENT_STAFF.id : null,
    placeName: SETTINGS.siteName || 'Filanbon Cafe',
    lines,
    discountTotal,
    freeDiscount,
    total,
    payMethod,
    amountReceived,
    change: payMethod === 'cash' ? Math.max(0, amountReceived - total) : 0
  };
  await Storage.addReceipt(receipt);
  RECEIPTS.unshift(receipt);
  recordOrderInActiveShift(payMethod, total);

  Object.keys(CART).forEach(k => delete CART[k]);
  Object.keys(freeMarks).forEach(k => delete freeMarks[k]);
  renderCartBar();
  overlay.remove();
  staffCategoryIdx = null;
  if (staffTab) renderStaffPanel();
  adminToast('✅ تم الدفع وحفظ الفاتورة');
  openStaffReceiptDetail(receipt, true);
}

function openStaffReceiptDetail(receipt, showPrintCta){
  const old = document.getElementById('staffReceiptDetailOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffReceiptDetailOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:88vh;overflow-y:auto;padding-bottom:16px;';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;';
  header.innerHTML = `<h3 style="margin:0;">${LANG==='ar'?'إيصال':'Receipt'} #${receipt.shortNo}${receipt.cancelled ? ` <span style="color:#c0392b;font-size:.8rem;">(${st('orderStatusCancelled')})</span>` : ''}</h3>`;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '→';
  closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
  closeBtn.onclick = () => overlay.remove();
  header.appendChild(closeBtn);
  sheet.appendChild(header);

  const body = document.createElement('div');
  body.style.cssText = 'padding:0 16px;';
  const dt = new Date(receipt.date);
  const locale = LANG==='ar' ? 'ar-AE' : 'en-US';
  const linesHtml = receipt.lines.map(l =>
    `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f2f2f2;font-size:.85rem;">
      <span>${l.qty}x ${l.name}${l.optionsText ? '<br><small style="color:#888;">' + l.optionsText + '</small>' : ''}</span>
      <span>${(l.unit*l.qty).toFixed(2)}</span>
    </div>`
  ).join('');
  body.innerHTML = `
    ${receipt.cancelled ? `<div style="background:#fdecea;color:#c0392b;font-weight:700;font-size:.8rem;padding:8px 12px;border-radius:10px;margin-bottom:10px;">${LANG==='ar'?'❌ تم إلغاء هذا الطلب بواسطة':'❌ Cancelled by'} ${receipt.cancelledBy || ''} — ${receipt.cancelledAt ? new Date(receipt.cancelledAt).toLocaleString(locale) : ''}</div>` : ''}
    ${receipt.splitInfo ? `<div style="background:#eaf7ef;color:#0d2818;font-weight:700;font-size:.78rem;padding:8px 12px;border-radius:10px;margin-bottom:10px;">👥 ${LANG==='ar'?'جزء من فاتورة مقسّمة':'Part of a split bill'} — ${receipt.splitInfo.index}/${receipt.splitInfo.of} (${LANG==='ar'?'إجمالي الطلب الكلي':'Full order total'}: ${receipt.splitInfo.orderTotal.toFixed(2)})</div>` : ''}
    <div style="font-size:.8rem;color:#666;margin-bottom:10px;">
      <div>${LANG==='ar'?'التاريخ':'Date'}: ${dt.toLocaleString(locale)}</div>
      <div>${st('employee')}: ${receiptEmployeeName(receipt)}</div>
      <div>${LANG==='ar'?'طريقة الدفع':'Payment method'}: ${methodLabelFor(receipt.payMethod)}</div>
    </div>
    ${linesHtml}
    ${receipt.discountTotal > 0 ? `<div style="display:flex;justify-content:space-between;padding:6px 0;color:#c0392b;font-size:.85rem;"><span>${st('discounts')}</span><span>-${receipt.discountTotal.toFixed(2)}</span></div>` : ''}
    ${receipt.freeDiscount > 0 ? `<div style="display:flex;justify-content:space-between;padding:6px 0;color:#8a6d00;font-size:.85rem;"><span>${st('freeDiscount')}</span><span>-${receipt.freeDiscount.toFixed(2)}</span></div>` : ''}
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-top:2px solid #000;font-weight:800;">
      <span>${receipt.splitInfo ? (LANG==='ar'?'المطلوب من هذا الشخص':"This person's share") : st('total')}</span><span>${receipt.total.toFixed(2)}</span>
    </div>
    ${receipt.payMethod === 'cash' ? `<div style="display:flex;justify-content:space-between;font-size:.8rem;color:#666;"><span>${st('receivedLabel')}</span><span>${receipt.amountReceived.toFixed(2)}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:.8rem;color:#666;"><span>${st('changeLabel')}</span><span>${receipt.change.toFixed(2)}</span></div>` : ''}
  `;
  sheet.appendChild(body);

  const printBtn = document.createElement('button');
  printBtn.className = 'primary-btn';
  printBtn.style.cssText = 'display:block;width:calc(100% - 32px);margin:14px 16px 0;';
  printBtn.textContent = st('printReceipt');
  printBtn.onclick = () => printStaffReceiptObject(receipt);
  sheet.appendChild(printBtn);

  if (CURRENT_STAFF && CURRENT_STAFF.role === 'supervisor' && !receipt.cancelled){
    const cancelBtn = document.createElement('button');
    cancelBtn.style.cssText = 'display:block;width:calc(100% - 32px);margin:10px 16px 0;background:#fdecea;color:#c0392b;border:1.5px solid #f5c6c0;border-radius:12px;padding:12px;font-weight:800;font-size:.9rem;cursor:pointer;';
    cancelBtn.textContent = st('cancelOrderBtn');
    cancelBtn.onclick = () => {
      showInlineConfirm(LANG==='ar'?'إلغاء هذا الطلب نهائيًا؟ هذا الإجراء يسجَّل باسمك.':'Cancel this order permanently? This action will be logged under your name.', async () => {
        receipt.cancelled = true;
        receipt.cancelledBy = CURRENT_STAFF.name;
        receipt.cancelledAt = new Date().toISOString();
        const idx = RECEIPTS.findIndex(r => r.id === receipt.id);
        if (idx !== -1) RECEIPTS[idx] = receipt;
        await Storage.saveReceipts(RECEIPTS);
        adminToast(LANG==='ar'?'تم إلغاء الطلب ✅':'Order cancelled ✅');
        overlay.remove();
        openStaffReceiptDetail(receipt, false);
      });
    };
    sheet.appendChild(cancelBtn);
  }

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  if (showPrintCta){
    setTimeout(() => printStaffReceiptObject(receipt), 400);
  }
}

function printStaffReceiptObject(receipt){
  const dt = new Date(receipt.date);
  const rows = receipt.lines.map(l => `<tr>
      <td style="padding:4px 0;">${l.qty}x ${l.name}${l.optionsText ? '<br><small style="color:#666;">' + l.optionsText + '</small>' : ''}</td>
      <td style="padding:4px 0;text-align:left;">${(l.unit*l.qty).toFixed(2)}</td>
    </tr>`).join('');
  const win = window.open('', '_blank');
  win.document.write(`
    <html dir="rtl"><head><meta charset="utf-8"><title>إيصال #${receipt.shortNo}</title>
    <style>
      body{font-family:sans-serif;padding:20px;max-width:340px;margin:0 auto;}
      h2{text-align:center;margin-bottom:4px;}
      p{text-align:center;color:#666;margin:0 0 16px;font-size:.85rem;}
      table{width:100%;border-collapse:collapse;font-size:.9rem;}
      .total-row td{border-top:2px solid #000;font-weight:800;padding-top:8px;}
    </style></head>
    <body>
      <h2>${receipt.placeName}</h2>
      <p>إيصال #${receipt.shortNo} — ${dt.toLocaleString('ar-AE')}</p>
      ${receipt.splitInfo ? `<p style="color:#1f7a4d;font-weight:700;">👥 جزء ${receipt.splitInfo.index} من ${receipt.splitInfo.of} — من طلب إجمالي ${receipt.splitInfo.orderTotal.toFixed(2)}</p>` : ''}
      <table>${rows}
        ${receipt.discountTotal > 0 ? `<tr><td>خصومات</td><td style="text-align:left;">-${receipt.discountTotal.toFixed(2)}</td></tr>` : ''}
        ${receipt.freeDiscount > 0 ? `<tr><td>🎁 خصم مجاني</td><td style="text-align:left;">-${receipt.freeDiscount.toFixed(2)}</td></tr>` : ''}
        <tr class="total-row"><td>${receipt.splitInfo ? 'المطلوب من هذا الشخص' : 'الإجمالي'}</td><td style="text-align:left;">${receipt.total.toFixed(2)}</td></tr>
      </table>
    </body></html>
  `);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
}

function startShiftFlow(){
  showInlineConfirm(`بدء شفت جديد باسم ${CURRENT_STAFF.name}؟`, () => {
    startStaffShift();
    adminToast('🕐 بدأ الشفت — بالتوفيق!');
  });
}

function confirmEndShift(){
  if (!ACTIVE_SHIFT) return;
  showInlineConfirm('إنهاء الشفت الحالي؟', async () => {
    const shift = await endStaffShift();
    adminToast('✅ تم إنهاء الشفت');
    if (shift) openShiftSummary(shift);
  });
}

function openShiftSummary(shift){
  const old = document.getElementById('staffShiftSummaryOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffShiftSummaryOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:85vh;overflow-y:auto;padding-bottom:16px;';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;';
  header.innerHTML = `<h3 style="margin:0;">${st('shiftSummaryTitle')}</h3>`;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '→';
  closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
  closeBtn.onclick = () => overlay.remove();
  header.appendChild(closeBtn);
  sheet.appendChild(header);

  const total = shift.cashTotal + shift.cardTotal;
  const locale = LANG==='ar' ? 'ar-AE' : 'en-US';
  const body = document.createElement('div');
  body.style.cssText = 'padding:0 16px;';
  body.innerHTML = `
    <div style="text-align:center;margin-bottom:16px;">
      <div style="font-size:1.6rem;font-weight:800;color:var(--hero-green,#0e7c3a);">${total.toFixed(2)}</div>
      <div style="color:#888;font-size:.8rem;">${st('totalSales')}</div>
    </div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:.9rem;"><span>👤 ${st('employee')}</span><span>${shiftStaffName(shift)}</span></div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:.9rem;"><span>🧾 ${st('orderCount')}</span><span>${shift.ordersCount}</span></div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:.9rem;"><span>${st('cash')}</span><span>${shift.cashTotal.toFixed(2)}</span></div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:.9rem;"><span>${st('card')}</span><span>${shift.cardTotal.toFixed(2)}</span></div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:.9rem;"><span>🕐 ${st('startTime')}</span><span>${new Date(shift.startTime).toLocaleString(locale)}</span></div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:.9rem;"><span>🏁 ${st('endTime')}</span><span>${new Date(shift.endTime).toLocaleString(locale)}</span></div>
    <div style="display:flex;justify-content:space-between;padding:8px 0;font-size:.9rem;font-weight:800;"><span>⏱ ${st('duration')}</span><span>${formatShiftDuration(shift.startTime, shift.endTime)}</span></div>
  `;
  sheet.appendChild(body);

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function openStaffShiftsList(){
  const old = document.getElementById('staffShiftsListOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffShiftsListOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:88vh;overflow-y:auto;padding-bottom:16px;';

  const isSupervisor = CURRENT_STAFF && CURRENT_STAFF.role === 'supervisor';
  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #eee;';
  header.innerHTML = `<h3 style="margin:0;">${st('shiftsTitle')} ${isSupervisor ? st('allShifts') : st('myShifts')}</h3>`;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '→';
  closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
  closeBtn.onclick = () => overlay.remove();
  header.appendChild(closeBtn);
  sheet.appendChild(header);

  const listWrap = document.createElement('div');
  listWrap.style.cssText = 'padding:8px 16px;';
  sheet.appendChild(listWrap);

  const visibleShifts = isSupervisor
    ? SHIFTS
    : SHIFTS.filter(s => s.staffId === (CURRENT_STAFF && CURRENT_STAFF.id));

  if (!visibleShifts.length){
    listWrap.innerHTML = `<p style="color:#888;text-align:center;padding:30px 10px;">${st('noShifts')}</p>`;
  } else {
    const locale = LANG==='ar' ? 'ar-AE' : 'en-US';
    visibleShifts.forEach(s => {
      const total = s.cashTotal + s.cardTotal;
      const row = document.createElement('div');
      row.style.cssText = 'padding:10px 0;border-bottom:1px solid #f0f0f0;cursor:pointer;';
      row.innerHTML = `<div style="display:flex;justify-content:space-between;font-size:.85rem;font-weight:700;">
          <span>${isSupervisor ? shiftStaffName(s) + ' — ' : ''}${new Date(s.startTime).toLocaleDateString(locale)}</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div style="font-size:.75rem;color:#888;">${s.ordersCount} ${LANG==='ar'?'طلب':'orders'} — ${formatShiftDuration(s.startTime, s.endTime)}</div>`;
      row.onclick = () => openShiftSummary(s);
      listWrap.appendChild(row);
    });
  }

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

/* ---------- Incoming live orders from customer site ---------- */
function orderStatusLabel(status){
  const map = { new: 'orderStatusNew', preparing: 'orderStatusPreparing', ready: 'orderStatusReady',
    completed: 'orderStatusCompleted', cancel_requested: 'orderStatusCancelRequested', cancelled: 'orderStatusCancelled' };
  return map[status] ? st(map[status]) : status;
}
const ORDER_NEXT_STATUS = { new: 'preparing', preparing: 'ready', ready: 'completed' };
function orderNextLabel(status){
  const map = { new: 'nextStartPrep', preparing: 'nextReady', ready: 'nextDone' };
  return map[status] ? st(map[status]) : '';
}

/* ---------- Real-time-ish order notifications (center-screen popup) ---------- */
let seenOrderEvents = null;
let orderNotificationTimer = null;

function loadSeenOrderEvents(){
  if (seenOrderEvents) return seenOrderEvents;
  try {
    seenOrderEvents = new Set(JSON.parse(safeSessionGet('filanbon_seen_order_events') || '[]'));
  } catch(e){ seenOrderEvents = new Set(); }
  return seenOrderEvents;
}
function markOrderEventSeen(key){
  loadSeenOrderEvents().add(key);
  safeSessionSet('filanbon_seen_order_events', JSON.stringify([...seenOrderEvents]));
}

async function ensureOrderNotifications(){
  if (!CURRENT_STAFF) return;
  if (!seenOrderEvents){
    // first time this tab/session sees orders: mark everything currently existing as seen
    // so we don't spam old history as "new" notifications.
    const orders = await Storage.loadLiveOrders();
    LIVE_ORDERS = orders;
    loadSeenOrderEvents();
    orders.forEach(o => {
      markOrderEventSeen('new-' + o.id);
      markOrderEventSeen('reqcancel-' + o.id);
      markOrderEventSeen('cancelled-' + o.id);
    });
  }
  if (!orderNotificationTimer){
    startLiveOrdersRealtimeListener();
    orderNotificationTimer = setInterval(checkForOrderNotifications, 8000);
  }
}

function processIncomingOrders(orders){
  if (!CURRENT_STAFF) return;
  LIVE_ORDERS = orders;
  const isSupervisor = CURRENT_STAFF.role === 'supervisor';

  for (const o of orders){
    if (o.status === 'new'){
      const key = 'new-' + o.id;
      if (!loadSeenOrderEvents().has(key)){
        markOrderEventSeen(key);
        showOrderNotificationPopup('📥 طلب جديد', `#${o.orderNo} — ${o.customerName} — الإجمالي ${o.total.toFixed(2)}`, '#eaf7ef');
        return;
      }
    }
    if (o.status === 'cancel_requested' && isSupervisor){
      const key = 'reqcancel-' + o.id;
      if (!loadSeenOrderEvents().has(key)){
        markOrderEventSeen(key);
        showOrderNotificationPopup('⚠️ طلب إلغاء من الزبون', `#${o.orderNo} — ${o.customerName} — بانتظار قرارك`, '#fdf3f2');
        return;
      }
    }
    if (o.status === 'cancelled'){
      const key = 'cancelled-' + o.id;
      if (!loadSeenOrderEvents().has(key)){
        markOrderEventSeen(key);
        showOrderNotificationPopup('❌ تم إلغاء طلب', `#${o.orderNo} — ${o.customerName} — ألغاه ${o.cancelledBy || ''}`, '#fdf3f2');
        return;
      }
    }
  }
}

let liveOrdersUnsubscribe = null;
function startLiveOrdersRealtimeListener(){
  if (liveOrdersUnsubscribe) return true;
  if (!initFirebase()) return false;
  try {
    liveOrdersUnsubscribe = firestoreDb.collection('filanbon').doc('live-orders-live')
      .onSnapshot((doc) => {
        if (!doc.exists) return;
        let orders;
        try { orders = JSON.parse(doc.data().value); } catch(e){ return; }
        processIncomingOrders(orders);
      }, () => { /* تجاهل صامت — الفحص الدوري (fallback) يبقى يغطي أي انقطاع */ });
    return true;
  } catch(e){ return false; }
}

async function checkForOrderNotifications(){
  if (!CURRENT_STAFF) return;
  const orders = await Storage.loadLiveOrders();
  processIncomingOrders(orders);
}

let notificationAudioCtx = null;
function unlockNotificationAudio(){
  try {
    if (!notificationAudioCtx){
      notificationAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (notificationAudioCtx.state === 'suspended') notificationAudioCtx.resume();
  } catch(e){ /* تجاهل صامت */ }
}
function playNotificationSound(){
  try {
    if (!notificationAudioCtx) unlockNotificationAudio();
    const ctx = notificationAudioCtx;
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    [880, 1108].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = now + i * 0.15;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.25, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.32);
    });
  } catch(e){ /* الصوت مو أساسي، نتجاهل أي خطأ صامت */ }
}

function showOrderNotificationPopup(title, subtitle, bg){
  playNotificationSound();
  const old = document.getElementById('staffOrderNotifyOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.id = 'staffOrderNotifyOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:300;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;padding:20px;';

  const card = document.createElement('div');
  card.style.cssText = `background:${bg || '#fff'};border-radius:18px;padding:26px 22px;width:100%;max-width:340px;box-shadow:0 12px 40px rgba(0,0,0,.25);text-align:center;`;
  card.innerHTML = `
    <div style="font-size:1.05rem;font-weight:800;color:#0d2818;margin-bottom:8px;">${title}</div>
    <div style="font-size:.88rem;color:#333;margin-bottom:18px;">${subtitle}</div>
  `;

  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:8px;';
  const viewBtn = document.createElement('button');
  viewBtn.textContent = 'عرض الطلبات';
  viewBtn.style.cssText = 'flex:1;background:var(--hero-green,#0e7c3a);color:#fff;border:none;border-radius:10px;padding:11px;font-weight:800;font-size:.85rem;cursor:pointer;';
  viewBtn.onclick = () => { overlay.remove(); openStaffIncomingOrders(); };
  const dismissBtn = document.createElement('button');
  dismissBtn.textContent = 'إغلاق';
  dismissBtn.style.cssText = 'flex:1;background:#fff;color:#333;border:1.5px solid #ddd;border-radius:10px;padding:11px;font-weight:700;font-size:.85rem;cursor:pointer;';
  dismissBtn.onclick = () => overlay.remove();
  btnRow.appendChild(viewBtn);
  btnRow.appendChild(dismissBtn);
  card.appendChild(btnRow);

  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

async function openStaffIncomingOrders(){
  LIVE_ORDERS = await Storage.loadLiveOrders();
  const old = document.getElementById('staffIncomingOrdersOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffIncomingOrdersOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:88vh;overflow-y:auto;padding-bottom:16px;';

  function render(){
    sheet.innerHTML = '';
    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #eee;';
    header.innerHTML = `<h3 style="margin:0;">${st('incomingTitle')}</h3>`;
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '→';
    closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
    closeBtn.onclick = () => overlay.remove();
    header.appendChild(closeBtn);
    sheet.appendChild(header);

    const activeOrders = LIVE_ORDERS.filter(o => o.status !== 'completed' && o.status !== 'cancelled');
    const recentCancelled = LIVE_ORDERS.filter(o => o.status === 'cancelled').slice(0, 10);
    const listWrap = document.createElement('div');
    listWrap.style.cssText = 'padding:8px 16px;';
    sheet.appendChild(listWrap);

    if (!activeOrders.length && !recentCancelled.length){
      listWrap.innerHTML = `<p style="color:#888;text-align:center;padding:30px 10px;">${st('noOrdersAtAll')}</p>`;
      return;
    }
    if (!activeOrders.length){
      const noneMsg = document.createElement('p');
      noneMsg.style.cssText = 'color:#888;text-align:center;padding:16px 10px;';
      noneMsg.textContent = st('noActiveOrders');
      listWrap.appendChild(noneMsg);
    }

    activeOrders.forEach(order => {
      const card = document.createElement('div');
      card.style.cssText = 'background:#f4fbf6;border:1px solid #d7ecdf;border-radius:14px;padding:12px 14px;margin-bottom:12px;';
      if (order.status === 'cancel_requested') card.style.cssText += 'border-color:#f5c6c0;background:#fdf3f2;';

      const linesText = order.lines.map(l => `${l.qty}x ${l.name}${l.optionsText ? ' (' + l.optionsText + ')' : ''}${l.freeUnits ? ' 🎁' : ''}`).join('<br>');
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-weight:800;font-size:.9rem;">#${order.orderNo} — ${order.customerName}</span>
          <span style="font-size:.75rem;font-weight:700;">${orderStatusLabel(order.status)}</span>
        </div>
        <div style="font-size:.78rem;color:#666;margin-bottom:6px;">${order.typeText} — ${order.payText} — 📱 ${order.customerPhone}</div>
        <div style="font-size:.82rem;line-height:1.6;margin-bottom:8px;">${linesText}</div>
        <div style="display:flex;justify-content:space-between;font-weight:800;font-size:.9rem;margin-bottom:8px;">
          <span>${st('total')}</span><span>${order.total.toFixed(2)}</span>
        </div>
      `;

      if (order.status === 'cancel_requested'){
        const note = document.createElement('div');
        if (CURRENT_STAFF && CURRENT_STAFF.role === 'supervisor'){
          const btnRow = document.createElement('div');
          btnRow.style.cssText = 'display:flex;gap:8px;';
          const confirmCancelBtn = document.createElement('button');
          confirmCancelBtn.textContent = st('confirmCancel');
          confirmCancelBtn.style.cssText = 'flex:1;background:#fdecea;color:#c0392b;border:1.5px solid #f5c6c0;border-radius:10px;padding:9px;font-weight:800;font-size:.82rem;cursor:pointer;';
          confirmCancelBtn.onclick = async () => {
            await Storage.updateLiveOrder(order.id, { status: 'cancelled', cancelledBy: CURRENT_STAFF.name, cancelledAt: new Date().toISOString() });
            LIVE_ORDERS = await Storage.loadLiveOrders();
            render();
            adminToast(LANG==='ar'?'تم تأكيد إلغاء الطلب':'Order cancellation confirmed');
          };
          const dismissBtn = document.createElement('button');
          dismissBtn.textContent = st('dismissCancel');
          dismissBtn.style.cssText = 'flex:1;background:#eaf7ef;color:#0d2818;border:1.5px solid #cfe9d9;border-radius:10px;padding:9px;font-weight:700;font-size:.82rem;cursor:pointer;';
          dismissBtn.onclick = async () => {
            await Storage.updateLiveOrder(order.id, { status: 'new' });
            LIVE_ORDERS = await Storage.loadLiveOrders();
            render();
            adminToast(LANG==='ar'?'تم إبقاء الطلب':'Order kept');
          };
          btnRow.appendChild(confirmCancelBtn);
          btnRow.appendChild(dismissBtn);
          card.appendChild(btnRow);
        } else {
          note.style.cssText = 'font-size:.78rem;color:#c0392b;font-weight:700;';
          note.textContent = st('waitingSupervisor');
          card.appendChild(note);
        }
      } else if (ORDER_NEXT_STATUS[order.status]){
        const nextBtn = document.createElement('button');
        nextBtn.textContent = orderNextLabel(order.status);
        nextBtn.style.cssText = 'width:100%;background:var(--hero-green,#0e7c3a);color:#fff;border:none;border-radius:10px;padding:9px;font-weight:800;font-size:.82rem;cursor:pointer;';
        nextBtn.onclick = async () => {
          await Storage.updateLiveOrder(order.id, { status: ORDER_NEXT_STATUS[order.status] });
          LIVE_ORDERS = await Storage.loadLiveOrders();
          render();
        };
        card.appendChild(nextBtn);
      }

      listWrap.appendChild(card);
    });

    if (recentCancelled.length){
      const cancelledHead = document.createElement('div');
      cancelledHead.style.cssText = 'font-weight:800;font-size:.82rem;color:#c0392b;margin:14px 0 8px;';
      cancelledHead.textContent = st('recentCancelled');
      listWrap.appendChild(cancelledHead);

      recentCancelled.forEach(order => {
        const card = document.createElement('div');
        card.style.cssText = 'background:#faf5f4;border:1px solid #eee;border-radius:12px;padding:10px 14px;margin-bottom:8px;opacity:.8;';
        const linesText = order.lines.map(l => `${l.qty}x ${l.name}`).join(LANG==='ar'?'، ':', ');
        card.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-weight:700;font-size:.85rem;">#${order.orderNo} — ${order.customerName}</span>
            <span style="font-size:.75rem;font-weight:700;color:#c0392b;">${st('orderStatusCancelled')}</span>
          </div>
          <div style="font-size:.78rem;color:#888;margin-bottom:4px;">${linesText} — ${order.total.toFixed(2)}</div>
          <div style="font-size:.72rem;color:#aaa;">${order.cancelledBy || '—'} — ${order.cancelledAt ? new Date(order.cancelledAt).toLocaleString(LANG==='ar'?'ar-AE':'en-US') : ''}</div>
        `;
        listWrap.appendChild(card);
      });
    }
  }

  render();
  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function openStaffReceiptsList(){
  const old = document.getElementById('staffReceiptsListOverlay');
  if (old) old.remove();

  const overlay = document.createElement('div');
  overlay.className = 'overlay open';
  overlay.id = 'staffReceiptsListOverlay';
  const sheet = document.createElement('div');
  sheet.className = 'sheet';
  sheet.style.cssText = 'max-height:88vh;overflow-y:auto;padding-bottom:16px;';

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid #eee;';
  const isSupervisor = CURRENT_STAFF && CURRENT_STAFF.role === 'supervisor';
  header.innerHTML = `<h3 style="margin:0;">${st('receiptsTitle')} ${isSupervisor ? st('allSales') : st('mySales')}</h3>`;
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '→';
  closeBtn.style.cssText = 'background:none;border:none;font-size:1.1rem;cursor:pointer;';
  closeBtn.onclick = () => overlay.remove();
  header.appendChild(closeBtn);
  sheet.appendChild(header);

  const listWrap = document.createElement('div');
  listWrap.style.cssText = 'padding:8px 16px;';
  sheet.appendChild(listWrap);

  const visibleReceipts = isSupervisor
    ? RECEIPTS
    : RECEIPTS.filter(r => r.employeeId === (CURRENT_STAFF && CURRENT_STAFF.id));

  const locale = LANG==='ar' ? 'ar-AE' : 'en-US';
  if (!visibleReceipts.length){
    listWrap.innerHTML = `<p style="color:#888;text-align:center;padding:30px 10px;">${st('noReceipts')}</p>`;
  } else {
    const groups = {};
    visibleReceipts.forEach(r => {
      const d = new Date(r.date);
      const key = d.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(r);
    });
    Object.entries(groups).forEach(([dateLabel, receipts]) => {
      const dateHead = document.createElement('div');
      dateHead.style.cssText = 'font-weight:800;font-size:.8rem;color:var(--hero-green,#1f7a4d);margin:10px 0 6px;';
      dateHead.textContent = dateLabel;
      listWrap.appendChild(dateHead);
      receipts.forEach(r => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;cursor:pointer;' + (r.cancelled ? 'opacity:.5;' : '');
        const time = new Date(r.date).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
        const empBit = isSupervisor ? ` — ${receiptEmployeeName(r)}` : '';
        row.innerHTML = `<span style="font-size:.85rem;">#${r.shortNo} — ${time}${empBit}${r.cancelled ? ' ' + st('orderStatusCancelled') : ''}</span><span style="font-weight:700;">${r.total.toFixed(2)}</span>`;
        row.onclick = () => openStaffReceiptDetail(r, false);
        listWrap.appendChild(row);
      });
    });
  }

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

function openStaffTicketMenu(){
  const old = document.getElementById('staffTicketMenu');
  if (old) { old.remove(); return; }

  const menu = document.createElement('div');
  menu.id = 'staffTicketMenu';
  menu.className = 'staff-dropdown-menu';

  const items = [
    { icon: '🗑', label: st('ticketClear'), action: () => {
        if (!Object.keys(CART).length) { adminToast(LANG==='ar'?'السلة فاضية أصلًا':'Cart is already empty'); return; }
        showInlineConfirm(LANG==='ar'?'تفريغ كل السلة الحالية؟':'Clear the entire current cart?', () => {
          Object.keys(CART).forEach(k => delete CART[k]);
          Object.keys(freeMarks).forEach(k => delete freeMarks[k]);
          renderCartBar();
          adminToast(LANG==='ar'?'تم تفريغ السلة':'Cart cleared');
        });
      }
    },
    { icon: '✏️', label: st('ticketEdit'), action: () => {
        if (!Object.keys(CART).length) { adminToast(LANG==='ar'?'السلة فاضية، ضيف منتج أول':'Cart is empty, add a product first'); return; }
        document.getElementById('cartOverlay').classList.add('open');
        renderCartSheet();
      }
    },
    { icon: '🖨', label: st('ticketPrint'), action: () => staffPrintReceipt() },
    { icon: '🔄', label: st('ticketSync'), action: () => staffSyncData() }
  ];
  items.forEach(it => {
    const row = document.createElement('button');
    row.className = 'staff-dropdown-item';
    row.innerHTML = `<span>${it.icon}</span><span>${it.label}</span>`;
    row.onclick = () => { menu.remove(); it.action(); };
    menu.appendChild(row);
  });

  document.body.appendChild(menu);
  setTimeout(() => {
    document.addEventListener('click', function closeOnce(e){
      if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener('click', closeOnce); }
    });
  }, 50);
}

function staffPrintReceipt(){
  if (!Object.keys(CART).length){ adminToast('السلة فاضية، ما فيه شي تطبعه'); return; }
  const { total, freeDiscount } = cartTotals();
  const rows = Object.entries(CART).map(([key, {item, qty, options}]) => {
    const unit = cartLineUnitPrice(item, options);
    const optsText = cartLineOptionsText(options);
    return `<tr>
      <td style="padding:4px 0;">${qty}x ${itemName(item)}${optsText ? '<br><small style="color:#666;">' + optsText + '</small>' : ''}</td>
      <td style="padding:4px 0;text-align:left;">${(unit*qty).toFixed(2)}</td>
    </tr>`;
  }).join('');
  const win = window.open('', '_blank');
  win.document.write(`
    <html dir="rtl"><head><meta charset="utf-8"><title>فاتورة</title>
    <style>
      body{font-family:sans-serif;padding:20px;max-width:340px;margin:0 auto;}
      h2{text-align:center;margin-bottom:4px;}
      p{text-align:center;color:#666;margin:0 0 16px;font-size:.85rem;}
      table{width:100%;border-collapse:collapse;font-size:.9rem;}
      .total-row td{border-top:2px solid #000;font-weight:800;padding-top:8px;}
    </style></head>
    <body>
      <h2>${SETTINGS.siteName || 'Filanbon Cafe'}</h2>
      <p>${new Date().toLocaleString('ar-AE')}</p>
      <table>${rows}
        ${freeDiscount > 0 ? `<tr><td>🎁 خصم مجاني</td><td style="text-align:left;">-${freeDiscount.toFixed(2)}</td></tr>` : ''}
        <tr class="total-row"><td>الإجمالي</td><td style="text-align:left;">${total.toFixed(2)}</td></tr>
      </table>
    </body></html>
  `);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
}

async function staffSyncData(){
  adminToast('جاري المزامنة...');
  await loadMenuData();
  if (staffTab) renderStaffPanel();
  adminToast('تمت المزامنة ✅');
}

function renderStaffPanel(){
  ensureStaffOverlay();
  staffSheetEl.innerHTML = '';
  if (!ACTIVE_SHIFT) ACTIVE_SHIFT = loadActiveShiftForCurrentStaff();
  ensureOrderNotifications();
  document.documentElement.lang = (LANG === 'ar' ? 'ar' : 'en');
  document.documentElement.dir = (LANG === 'ar' ? 'rtl' : 'ltr');

  const topbar = document.createElement('div');
  topbar.className = 'staff-topbar';

  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.className = 'staff-icon-btn';
  hamburgerBtn.innerHTML = '☰';
  hamburgerBtn.title = st('sidebarSettings');
  hamburgerBtn.onclick = openStaffSidebar;
  topbar.appendChild(hamburgerBtn);

  const title = document.createElement('div');
  title.className = 'staff-topbar-title';
  title.textContent = st('topbarTitle');
  topbar.appendChild(title);

  const tabs = document.createElement('div');
  tabs.className = 'staff-tabs';
  const orderTabBtn = document.createElement('button');
  orderTabBtn.className = 'staff-tab-btn' + (staffTab === 'order' ? ' active' : '');
  orderTabBtn.textContent = st('tabOrder');
  orderTabBtn.onclick = () => { staffTab = 'order'; staffCategoryIdx = null; renderStaffPanel(); };
  const loyaltyTabBtn = document.createElement('button');
  loyaltyTabBtn.className = 'staff-tab-btn' + (staffTab === 'loyalty' ? ' active' : '');
  loyaltyTabBtn.textContent = st('tabLoyalty');
  loyaltyTabBtn.onclick = () => { staffTab = 'loyalty'; renderStaffPanel(); };
  tabs.appendChild(orderTabBtn);
  tabs.appendChild(loyaltyTabBtn);
  topbar.appendChild(tabs);

  const langBtn = document.createElement('button');
  langBtn.className = 'staff-icon-btn';
  langBtn.style.fontSize = '.72rem';
  langBtn.style.fontWeight = '800';
  langBtn.textContent = (LANG === 'ar' ? 'EN' : 'AR');
  langBtn.onclick = () => { LANG = (LANG === 'ar') ? 'en' : 'ar'; renderStaffPanel(); };
  topbar.appendChild(langBtn);

  const dotsBtn = document.createElement('button');
  dotsBtn.className = 'staff-icon-btn';
  dotsBtn.innerHTML = '⋯';
  dotsBtn.title = st('ticketEdit');
  dotsBtn.onclick = openStaffTicketMenu;
  topbar.appendChild(dotsBtn);

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'staff-logout-btn';
  logoutBtn.textContent = st('logout');
  logoutBtn.onclick = () => {
    clearCurrentStaffSession();
    ACTIVE_SHIFT = null;
    Object.keys(CART).forEach(k => delete CART[k]);
    renderCartBar();
    showStaffLogin();
  };
  topbar.appendChild(logoutBtn);

  staffSheetEl.appendChild(topbar);

  const flagStripe = document.createElement('div');
  flagStripe.className = 'staff-flag-stripe';
  staffSheetEl.appendChild(flagStripe);

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
      empty.style.cssText = 'color:#9db3a2;font-size:.85rem;text-align:center;padding:30px 10px;';
      empty.textContent = 'المشرف لسا ما جهّز مجموعات المنتجات لهذه الصفحة. تواصل معه.';
      content.appendChild(empty);
      return;
    }
    const grid = document.createElement('div');
    grid.className = 'staff-cat-grid';
    STAFF_GROUPS.forEach((grp, idx) => {
      const tile = document.createElement('div');
      tile.className = 'staff-cat-tile';
      const titleEl = document.createElement('div');
      titleEl.className = 'title';
      titleEl.textContent = LANG === 'en' ? (grp.titleEn || grp.title) : grp.title;
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
    empty.style.cssText = 'color:#9db3a2;font-size:.85rem;text-align:center;padding:20px 10px;';
    empty.textContent = 'ما فيه منتجات بهذه المجموعة بعد.';
    content.appendChild(empty);
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'staff-prod-grid';
  items.forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'staff-prod-tile';
    const info = document.createElement('div');
    info.className = 'info';
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = itemName(item);
    info.appendChild(name);
    const priceEl = document.createElement('div');
    if (item.price === null || item.price === undefined){
      priceEl.className = 'price disabled';
      priceEl.textContent = st('comingSoon');
    } else {
      priceEl.className = 'price';
      priceEl.innerHTML = effectivePrice(item).toFixed(2) + ' ' + currencySVG;
    }
    info.appendChild(priceEl);
    tile.appendChild(info);
    if (item.price !== null && item.price !== undefined){
      tile.onclick = () => {
        if (item.useStaffModifiers && item.staffModifierGroupIds && item.staffModifierGroupIds.length){
          openStaffModifierSheet(item);
        } else {
          openOptionsSheet(item);
        }
      };
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
    badge.textContent = '🔒 بوابة المالك';
    adminSheetEl.appendChild(badge);
  }

  const h2 = document.createElement('h2');
  h2.innerHTML = `<span>لوحة تحكم المالك</span>`;
  if (!ADMIN_MODE){
    const closeBtn = document.createElement('button');
    closeBtn.className = 'admin-close'; closeBtn.textContent = '→';
    closeBtn.onclick = () => {
      closeAdminOverlay();
      document.body.classList.remove('owner-portal-mode');
      document.body.classList.add('staff-portal-mode');
      if (getCurrentStaffSession()) { CURRENT_STAFF = getCurrentStaffSession(); renderStaffPanel(); }
      else showStaffLogin();
    };
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
        await loadEssentialLoginData();
        await loadFullStorageState();
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
        await loadEssentialLoginData();
        await loadFullStorageState();
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
    try { link.href = new URL('filanbon_menu_green.html', window.location.href).toString(); }
    catch(e){ link.href = 'filanbon_menu_green.html'; }
    link.target = '_blank';
    link.rel = 'noopener';
    adminSheetEl.appendChild(link);
  }

  openAdminOverlay();
  setTimeout(() => { const first = adminSheetEl.querySelector('input'); if (first) first.focus(); }, 200);
}

/* ---------- Main admin panel ---------- */
let adminTab = 'reports';
let currentReportsBodyEl = null;

function renderAdminPanel(){
  ensureAdminOverlay();
  adminSheetEl.innerHTML = '';
  adminSheetEl.className = 'admin-sheet';

  if (ADMIN_MODE){
    const badge = document.createElement('div');
    badge.className = 'owner-portal-badge';
    badge.textContent = '🔒 بوابة المالك';
    adminSheetEl.appendChild(badge);
  }

  const h2 = document.createElement('h2');
  h2.innerHTML = `<span>لوحة تحكم المالك</span>`;
  if (!ADMIN_MODE){
    const closeBtn = document.createElement('button');
    closeBtn.className = 'admin-close'; closeBtn.textContent = '→';
    closeBtn.onclick = () => {
      closeAdminOverlay();
      document.body.classList.remove('owner-portal-mode');
      document.body.classList.add('staff-portal-mode');
      if (getCurrentStaffSession()) { CURRENT_STAFF = getCurrentStaffSession(); renderStaffPanel(); }
      else showStaffLogin();
    };
    h2.appendChild(closeBtn);
  }
  adminSheetEl.appendChild(h2);

  if (ADMIN_MODE){
    const link = document.createElement('a');
    link.className = 'owner-portal-link';
    link.textContent = '🔗 فتح صفحة المنيو كما يراها العميل';
    link.style.display = 'block';
    link.style.marginBottom = '6px';
    try { link.href = new URL('filanbon_menu_green.html', window.location.href).toString(); }
    catch(e){ link.href = 'filanbon_menu_green.html'; }
    link.target = '_blank';
    link.rel = 'noopener';
    adminSheetEl.appendChild(link);

    const staffLink = document.createElement('a');
    staffLink.className = 'owner-portal-link';
    staffLink.textContent = '🔗 فتح صفحة الموظف';
    staffLink.style.display = 'block';
    staffLink.style.marginBottom = '10px';
    try { staffLink.href = new URL('filanbon_staff.html', window.location.href).toString(); }
    catch(e){ staffLink.href = 'filanbon_staff.html'; }
    staffLink.target = '_blank';
    staffLink.rel = 'noopener';
    adminSheetEl.appendChild(staffLink);
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

  const body = document.createElement('div');
  adminSheetEl.appendChild(body);
  currentReportsBodyEl = body;

  renderAdminReportsTab(body);

  const pwBox = document.createElement('div');
  pwBox.style.cssText = 'margin-top:24px;';
  renderOwnerPasswordSection(pwBox);
  adminSheetEl.appendChild(pwBox);

  const logoutBtn = document.createElement('button');
  logoutBtn.className = 'admin-btn secondary';
  logoutBtn.style.marginTop = '8px';
  logoutBtn.textContent = 'تسجيل الخروج';
  logoutBtn.onclick = () => {
    safeSessionRemove('filanbon_admin_auth');
    firebaseSignOut();
    if (ADMIN_MODE) {
      showAdminLogin();
    } else {
      closeAdminOverlay();
      document.body.classList.remove('owner-portal-mode');
      document.body.classList.add('staff-portal-mode');
      if (getCurrentStaffSession()) { CURRENT_STAFF = getCurrentStaffSession(); renderStaffPanel(); }
      else showStaffLogin();
    }
  };
  adminSheetEl.appendChild(logoutBtn);
}

/* ---------- Products tab ---------- */
let reportPeriod = 'today';
let reportCustomDate = null; // 'YYYY-MM-DD' من حقل التقويم

function getReportDateRange(period){
  const now = new Date();
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
  const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
  if (period === 'custom' && reportCustomDate){
    const [y, m, d] = reportCustomDate.split('-').map(Number);
    const picked = new Date(y, m - 1, d);
    const dateLabel = picked.toLocaleDateString('ar-AE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return { start: startOfDay(picked), end: endOfDay(picked), label: dateLabel };
  }
  if (period === 'today'){
    return { start: startOfDay(now), end: endOfDay(now), label: 'اليوم' };
  }
  if (period === 'yesterday'){
    const y = new Date(now); y.setDate(y.getDate() - 1);
    return { start: startOfDay(y), end: endOfDay(y), label: 'أمس' };
  }
  if (period === 'thisMonth'){
    return { start: new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0), end: endOfDay(now), label: 'هذا الشهر' };
  }
  if (period === 'lastMonth'){
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0);
    const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    return { start, end, label: 'الشهر الماضي' };
  }
  if (period === 'thisYear'){
    return { start: new Date(now.getFullYear(), 0, 1, 0, 0, 0), end: endOfDay(now), label: 'هذي السنة' };
  }
  if (period === 'last2Years'){
    const start = new Date(now.getFullYear() - 2, now.getMonth(), now.getDate(), 0, 0, 0);
    return { start, end: endOfDay(now), label: 'آخر سنتين' };
  }
  return { start: new Date(0), end: endOfDay(now), label: 'كل الفترات' };
}

function computeReportStats(start, end){
  const inRange = RECEIPTS.filter(r => {
    if (r.cancelled) return false;
    const d = new Date(r.date);
    return d >= start && d <= end;
  });

  let revenue = 0;
  const paymentTotals = { cash: 0, card: 0, applepay: 0 };
  const productMap = {}; // name -> { qty, revenue }
  const employeeMap = {}; // employeeId -> { name, total, orderCount, products: {name: qty} }

  inRange.forEach(r => {
    revenue += r.total;
    if (paymentTotals[r.payMethod] !== undefined) paymentTotals[r.payMethod] += r.total;
    const empKey = r.employeeId || r.employee || 'غير معروف';
    const empAccount = STAFF_ACCOUNTS.find(a => a.id === r.employeeId);
    const isSupervisorSale = empAccount && empAccount.role === 'supervisor';

    (r.lines || []).forEach(line => {
      if (!productMap[line.name]) productMap[line.name] = { qty: 0, revenue: 0 };
      productMap[line.name].qty += line.qty;
      productMap[line.name].revenue += (line.unit || 0) * line.qty;
    });

    if (!isSupervisorSale){
      if (!employeeMap[empKey]) employeeMap[empKey] = { name: r.employee || 'غير معروف', total: 0, orderCount: 0, products: {} };
      employeeMap[empKey].total += r.total;
      employeeMap[empKey].orderCount += 1;
      (r.lines || []).forEach(line => {
        if (!employeeMap[empKey].products[line.name]) employeeMap[empKey].products[line.name] = 0;
        employeeMap[empKey].products[line.name] += line.qty;
      });
    }
  });

  const topProducts = Object.entries(productMap)
    .map(([name, v]) => ({ name, qty: v.qty, revenue: v.revenue }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 10);

  const byEmployee = Object.values(employeeMap)
    .map(e => {
      const topProductEntry = Object.entries(e.products).sort((a, b) => b[1] - a[1])[0];
      return {
        name: e.name,
        total: e.total,
        orderCount: e.orderCount,
        topProduct: topProductEntry ? topProductEntry[0] : '—',
        topProductQty: topProductEntry ? topProductEntry[1] : 0
      };
    })
    .sort((a, b) => b.total - a.total);

  const expensesInRange = EXPENSES.filter(ex => {
    const d = new Date(ex.date);
    return d >= start && d <= end;
  });
  const totalExpenses = expensesInRange.reduce((s, ex) => s + ex.amount, 0);

  return { revenue, orderCount: inRange.length, topProducts, byEmployee, paymentTotals, expensesInRange, totalExpenses, netProfit: revenue - totalExpenses };
}

let reportSection = 'home';

function renderReportPeriodControls(container, refreshFn){
  const periodSelect = document.createElement('select');
  periodSelect.style.cssText = 'width:100%;box-sizing:border-box;padding:13px 14px;border-radius:12px;border:1.5px solid #cfe9d9;background:#f4fbf6;color:#0d2818;font-size:1rem;margin-bottom:12px;font-family:inherit;';
  const periods = [
    ['today', 'اليوم'], ['yesterday', 'أمس'], ['thisMonth', 'هذا الشهر'],
    ['lastMonth', 'الشهر الماضي'], ['thisYear', 'هذي السنة'], ['last2Years', 'آخر سنتين'], ['all', 'كل الفترات']
  ];
  periods.forEach(([key, plabel]) => {
    const opt = document.createElement('option');
    opt.value = key; opt.textContent = plabel;
    if (reportPeriod === key) opt.selected = true;
    periodSelect.appendChild(opt);
  });
  periodSelect.onchange = () => { reportPeriod = periodSelect.value; refreshFn(); };
  container.appendChild(periodSelect);

  const calendarRow = document.createElement('div');
  calendarRow.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:16px;background:#f7faf8;border-radius:10px;padding:9px 11px;';
  const calLabel = document.createElement('span');
  calLabel.style.cssText = 'font-size:.78rem;font-weight:700;color:#28503a;white-space:nowrap;';
  calLabel.textContent = 'يوم محدد:';
  const dateInput = document.createElement('input');
  dateInput.type = 'date';
  const today = new Date();
  const yearAgo = new Date(); yearAgo.setFullYear(yearAgo.getFullYear() - 1);
  dateInput.max = today.toISOString().slice(0, 10);
  dateInput.min = yearAgo.toISOString().slice(0, 10);
  if (reportCustomDate) dateInput.value = reportCustomDate;
  dateInput.style.cssText = 'flex:1;border:1px solid #cfe9d9;border-radius:8px;padding:6px 9px;font-size:.8rem;font-family:inherit;';
  dateInput.onchange = () => {
    if (dateInput.value){ reportCustomDate = dateInput.value; reportPeriod = 'custom'; refreshFn(); }
  };
  calendarRow.appendChild(calLabel);
  calendarRow.appendChild(dateInput);
  container.appendChild(calendarRow);
}

async function refreshReportsData(){
  RECEIPTS = await Storage.loadReceipts();
  EXPENSES = await Storage.loadExpenses();
}

function renderHomeSection(content, stats, label){
  const refreshRow = document.createElement('div');
  refreshRow.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;';
  const lastUpdatedSpan = document.createElement('span');
  lastUpdatedSpan.style.cssText = 'font-size:.68rem;color:#999;';
  lastUpdatedSpan.textContent = 'آخر تحديث: ' + new Date().toLocaleTimeString('ar-AE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const refreshBtn = document.createElement('button');
  refreshBtn.textContent = '🔄 تحديث الآن';
  refreshBtn.style.cssText = 'background:#eaf7ef;border:1px solid #cfe9d9;border-radius:8px;padding:4px 10px;font-size:.7rem;font-weight:700;color:#0e7c3a;cursor:pointer;';
  refreshBtn.onclick = async () => {
    refreshBtn.disabled = true;
    refreshBtn.textContent = 'جاري التحديث...';
    await refreshReportsData();
    if (currentReportsBodyEl) renderAdminReportsTab(currentReportsBodyEl);
  };
  refreshRow.appendChild(refreshBtn);
  refreshRow.appendChild(lastUpdatedSpan);
  content.appendChild(refreshRow);

  const heroCard = document.createElement('div');
  heroCard.style.cssText = 'background:linear-gradient(135deg,#0e7c3a,#0a5c2b);border-radius:14px;padding:16px 18px;margin-bottom:10px;text-align:center;color:#fff;box-shadow:0 4px 12px rgba(14,124,58,.2);max-width:280px;margin-left:auto;margin-right:auto;';
  heroCard.innerHTML = `
    <div style="font-size:.72rem;opacity:.85;margin-bottom:6px;">الرصيد المالي للكوفي — ${label}</div>
    <div style="font-size:1.6rem;font-weight:800;">${stats.netProfit.toFixed(2)} <span style="font-size:.85rem;font-weight:600;">د.إ</span></div>
    <div style="display:flex;justify-content:center;gap:16px;margin-top:10px;font-size:.7rem;opacity:.92;border-top:1px solid rgba(255,255,255,.25);padding-top:9px;">
      <span>المبيعات: ${stats.revenue.toFixed(2)}</span>
      <span>المصروفات: ${stats.totalExpenses.toFixed(2)}</span>
    </div>
    <div style="font-size:.65rem;opacity:.75;margin-top:6px;">${stats.orderCount} طلب بهذي الفترة</div>
  `;
  content.appendChild(heroCard);
}

function renderExpensesSection(content, stats, body){
  const addExpBtn = document.createElement('button');
  addExpBtn.className = 'admin-btn small';
  addExpBtn.style.cssText = 'margin-bottom:12px;';
  addExpBtn.textContent = '+ إضافة مصروف جديد';
  addExpBtn.onclick = () => {
    showInlinePrompt('وصف المصروف (مثال: إيجار شهر 9):', '', (desc) => {
      if (!desc || !desc.trim()) return;
      showInlinePrompt('المبلغ بالدرهم:', '', async (amountStr) => {
        const amount = parseFloat(amountStr);
        if (!amount || amount <= 0){ adminToast('مبلغ غير صحيح'); return; }
        EXPENSES.unshift({ id: 'exp-' + Date.now(), description: desc.trim(), amount, date: new Date().toISOString() });
        await Storage.saveExpenses(EXPENSES);
        adminToast('تم إضافة المصروف');
        renderAdminReportsTab(body);
      });
    });
  };
  content.appendChild(addExpBtn);

  if (stats.expensesInRange.length){
    const expList = document.createElement('div');
    expList.style.cssText = 'margin-bottom:10px;';
    stats.expensesInRange.forEach(ex => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f0f0f0;';
      const dateStr = new Date(ex.date).toLocaleDateString('ar-AE');
      row.innerHTML = `<span style="font-size:.82rem;">${ex.description} <span style="color:#aaa;font-size:.72rem;">(${dateStr})</span></span>
        <span style="font-weight:700;color:#c0392b;">-${ex.amount.toFixed(2)}</span>`;
      const delBtn = document.createElement('button');
      delBtn.textContent = 'حذف';
      delBtn.style.cssText = 'background:none;border:none;cursor:pointer;font-size:.85rem;margin-right:8px;';
      delBtn.onclick = async () => {
        EXPENSES = EXPENSES.filter(e => e.id !== ex.id);
        await Storage.saveExpenses(EXPENSES);
        renderAdminReportsTab(body);
      };
      row.appendChild(delBtn);
      expList.appendChild(row);
    });
    content.appendChild(expList);
  } else {
    const empty = document.createElement('p');
    empty.style.cssText = 'color:#888;text-align:center;padding:10px;font-size:.82rem;';
    empty.textContent = 'ما فيه مصروفات مسجّلة بهذي الفترة.';
    content.appendChild(empty);
  }
}

function renderSalariesSection(content, body){
  const salaryIntro = document.createElement('p');
  salaryIntro.style.cssText = 'color:#888;font-size:.76rem;margin:0 0 10px;';
  salaryIntro.textContent = 'يحدد راتب كل موظف الشهري من صفحة الموظف (الإعدادات → حسابات الموظفين). لما يُصرف الراتب فعليًا، اضغط الزر وينسجل تلقائيًا كمصروف.';
  content.appendChild(salaryIntro);

  const staffWithSalary = STAFF_ACCOUNTS.filter(a => a.monthlySalary > 0);
  if (!staffWithSalary.length){
    const empty3 = document.createElement('p');
    empty3.style.cssText = 'color:#888;text-align:center;padding:10px;font-size:.8rem;';
    empty3.textContent = 'ما فيه موظف محدد له راتب شهري بعد.';
    content.appendChild(empty3);
  } else {
    staffWithSalary.forEach(acc => {
      const thisMonthKey = new Date().toISOString().slice(0, 7);
      const alreadyPaid = EXPENSES.some(ex => ex.staffId === acc.id && ex.salaryMonth === thisMonthKey);
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;background:#f7faf8;border-radius:10px;padding:10px 12px;margin-bottom:8px;';
      row.innerHTML = `<span style="font-size:.84rem;font-weight:700;">${acc.name} — ${acc.monthlySalary.toFixed(2)} د.إ/شهر</span>`;
      const payBtn = document.createElement('button');
      payBtn.className = alreadyPaid ? 'admin-btn secondary small' : 'admin-btn small';
      payBtn.textContent = alreadyPaid ? 'انصرف هذا الشهر' : 'دفع الراتب الآن';
      payBtn.disabled = alreadyPaid;
      payBtn.onclick = () => {
        showInlineConfirm(`تأكيد صرف راتب "${acc.name}" (${acc.monthlySalary.toFixed(2)} د.إ) لشهر ${thisMonthKey}؟`, async () => {
          EXPENSES.unshift({
            id: 'exp-salary-' + Date.now(),
            description: `راتب ${acc.name} — شهر ${thisMonthKey}`,
            amount: acc.monthlySalary,
            date: new Date().toISOString(),
            staffId: acc.id,
            salaryMonth: thisMonthKey
          });
          await Storage.saveExpenses(EXPENSES);
          adminToast('تم تسجيل صرف الراتب');
          renderAdminReportsTab(body);
        });
      };
      row.appendChild(payBtn);
      content.appendChild(row);
    });
  }
}

function renderProfitLossSection(content, stats){
  const plCardsRow = document.createElement('div');
  plCardsRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;';
  const mkPlCard = (value, label, color) => {
    const c = document.createElement('div');
    c.style.cssText = 'background:#f7faf8;border-radius:12px;padding:10px;text-align:center;';
    c.innerHTML = `<div style="font-weight:800;font-size:.95rem;color:${color};">${value.toFixed(2)}</div><div style="font-size:.7rem;color:#666;margin-top:2px;">${label}</div>`;
    return c;
  };
  plCardsRow.appendChild(mkPlCard(stats.revenue, 'المبيعات', '#0d2818'));
  plCardsRow.appendChild(mkPlCard(stats.totalExpenses, 'إجمالي المصروفات', '#c0392b'));
  plCardsRow.appendChild(mkPlCard(stats.netProfit, 'صافي الربح', stats.netProfit >= 0 ? 'var(--hero-green,#0e7c3a)' : '#c0392b'));
  content.appendChild(plCardsRow);
}

function renderTopProductsSection(content, stats){
  if (!stats.topProducts.length){
    const empty = document.createElement('p');
    empty.style.cssText = 'color:#888;text-align:center;padding:16px;';
    empty.textContent = 'ما فيه مبيعات بهذي الفترة.';
    content.appendChild(empty);
  } else {
    stats.topProducts.forEach((p, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #f0f0f0;';
      row.innerHTML = `<span style="font-size:.88rem;"><b>${i + 1}.</b> ${p.name}</span>
        <span style="font-size:.82rem;color:#666;">${p.qty} قطعة — ${p.revenue.toFixed(2)} د.إ</span>`;
      content.appendChild(row);
    });
  }
}

function renderEmployeesSection(content, stats){
  if (!stats.byEmployee.length){
    const empty = document.createElement('p');
    empty.style.cssText = 'color:#888;text-align:center;padding:16px;';
    empty.textContent = 'ما فيه مبيعات موظفين بهذي الفترة.';
    content.appendChild(empty);
  } else {
    stats.byEmployee.forEach(e => {
      const card = document.createElement('div');
      card.style.cssText = 'background:#f7faf8;border-radius:12px;padding:12px 14px;margin-bottom:10px;';
      card.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-weight:800;font-size:.9rem;">${e.name}</span>
          <span style="font-weight:800;color:var(--hero-green,#0e7c3a);">${e.total.toFixed(2)} د.إ</span>
        </div>
        <div style="font-size:.78rem;color:#666;">${e.orderCount} طلب — أكثر منتج باعه: <b>${e.topProduct}</b> (${e.topProductQty} قطعة)</div>
      `;
      content.appendChild(card);
    });
  }
}

function renderPaymentsSection(content, stats){
  const payRow = document.createElement('div');
  payRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;';
  const payMethods = [
    ['cash', 'كاش', stats.paymentTotals.cash],
    ['card', 'بطاقة', stats.paymentTotals.card],
    ['applepay', ' Apple Pay', stats.paymentTotals.applepay]
  ];
  payMethods.forEach(([key, label, amount]) => {
    const card = document.createElement('div');
    card.style.cssText = 'background:#f7faf8;border-radius:12px;padding:10px;text-align:center;';
    card.innerHTML = `<div style="font-weight:800;font-size:1rem;color:#0d2818;">${amount.toFixed(2)}</div><div style="font-size:.72rem;color:#666;margin-top:2px;">${label}</div>`;
    payRow.appendChild(card);
  });
  content.appendChild(payRow);
}

function renderShiftsSection(content, start, end){
  const locale2 = LANG==='ar' ? 'ar-AE' : 'en-US';
  const shiftsInRange = SHIFTS.filter(s => {
    const d = new Date(s.startTime);
    return d >= start && d <= end;
  }).sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  const dailyMap2 = {};
  shiftsInRange.forEach(s => {
    const dayKey = new Date(s.startTime).toISOString().slice(0, 10);
    const key = dayKey + '|' + (s.staffId || s.staffName);
    if (!dailyMap2[key]) dailyMap2[key] = { day: dayKey, name: s.staffName, total: 0, orders: 0 };
    dailyMap2[key].total += (s.cashTotal || 0) + (s.cardTotal || 0);
    dailyMap2[key].orders += s.ordersCount || 0;
  });
  const dailyList2 = Object.values(dailyMap2).sort((a, b) => b.day.localeCompare(a.day));

  const monthlyMap2 = {};
  shiftsInRange.forEach(s => {
    const monthKey = new Date(s.startTime).toISOString().slice(0, 7);
    const key = monthKey + '|' + (s.staffId || s.staffName);
    if (!monthlyMap2[key]) monthlyMap2[key] = { month: monthKey, name: s.staffName, total: 0, orders: 0 };
    monthlyMap2[key].total += (s.cashTotal || 0) + (s.cardTotal || 0);
    monthlyMap2[key].orders += s.ordersCount || 0;
  });
  const monthlyList2 = Object.values(monthlyMap2).sort((a, b) => b.month.localeCompare(a.month));

  if (dailyList2.length){
    const dayHead2 = document.createElement('div');
    dayHead2.style.cssText = 'font-weight:700;font-size:.82rem;color:#28503a;margin-bottom:8px;';
    dayHead2.textContent = 'الإجمالي اليومي (لكل موظف)';
    content.appendChild(dayHead2);
    dailyList2.forEach(d => {
      const dateLabel = new Date(d.day).toLocaleDateString(locale2, { weekday: 'long', day: 'numeric', month: 'long' });
      const row2 = document.createElement('div');
      row2.style.cssText = 'display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f2f2f2;font-size:.8rem;';
      row2.innerHTML = `<span>${dateLabel} — ${d.name}</span><span style="font-weight:700;">${d.total.toFixed(2)} د.إ (${d.orders} طلب)</span>`;
      content.appendChild(row2);
    });
  }

  if (monthlyList2.length){
    const monthHead2 = document.createElement('div');
    monthHead2.style.cssText = 'font-weight:700;font-size:.82rem;color:#28503a;margin:14px 0 8px;';
    monthHead2.textContent = 'الإجمالي الشهري (لكل موظف)';
    content.appendChild(monthHead2);
    monthlyList2.forEach(m => {
      const monthLabel = new Date(m.month + '-01').toLocaleDateString(locale2, { year: 'numeric', month: 'long' });
      const row3 = document.createElement('div');
      row3.style.cssText = 'display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f2f2f2;font-size:.8rem;';
      row3.innerHTML = `<span>${monthLabel} — ${m.name}</span><span style="font-weight:700;">${m.total.toFixed(2)} د.إ (${m.orders} طلب)</span>`;
      content.appendChild(row3);
    });
  }

  const shiftDetailHead2 = document.createElement('div');
  shiftDetailHead2.style.cssText = 'font-weight:700;font-size:.82rem;color:#28503a;margin:14px 0 8px;';
  shiftDetailHead2.textContent = 'تفاصيل كل شفت';
  content.appendChild(shiftDetailHead2);

  if (!shiftsInRange.length){
    const empty2 = document.createElement('p');
    empty2.style.cssText = 'color:#888;text-align:center;padding:16px;font-size:.82rem;';
    empty2.textContent = 'ما فيه شفتات مسجّلة بهذي الفترة.';
    content.appendChild(empty2);
  } else {
    shiftsInRange.forEach(s => {
      const sTotal = (s.cashTotal || 0) + (s.cardTotal || 0);
      const card2 = document.createElement('div');
      card2.style.cssText = 'background:#fafafa;border:1px solid #eee;border-radius:12px;padding:10px 14px;margin-bottom:8px;';
      const startStr = new Date(s.startTime).toLocaleString(locale2, { weekday: 'short', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });
      const endStr = s.endTime ? new Date(s.endTime).toLocaleTimeString(locale2, { hour: '2-digit', minute: '2-digit' }) : (LANG==='ar' ? 'شغّال الحين' : 'ongoing');
      card2.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-weight:800;font-size:.85rem;">${s.staffName}</span>
          <span style="font-weight:800;color:var(--hero-green,#0e7c3a);">${sTotal.toFixed(2)} د.إ</span>
        </div>
        <div style="font-size:.75rem;color:#888;">${startStr} → ${endStr} (${s.endTime ? formatShiftDuration(s.startTime, s.endTime) : '—'}) — ${s.ordersCount} طلب</div>
        <div style="font-size:.72rem;color:#aaa;margin-top:2px;">كاش: ${(s.cashTotal||0).toFixed(2)} — بطاقة: ${(s.cardTotal||0).toFixed(2)}</div>
      `;
      content.appendChild(card2);
    });
  }
}

function renderEmployeeOrdersSection(content, start, end){
  const ordersInRange = RECEIPTS.filter(r => {
    if (r.cancelled) return false;
    const d = new Date(r.date);
    return d >= start && d <= end;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!ordersInRange.length){
    const empty = document.createElement('p');
    empty.style.cssText = 'color:#888;text-align:center;padding:16px;';
    empty.textContent = 'ما فيه طلبات بهذي الفترة.';
    content.appendChild(empty);
    return;
  }

  const locale = LANG==='ar' ? 'ar-AE' : 'en-US';
  ordersInRange.forEach(r => {
    const itemsSummary = (r.lines || []).map(l => `${l.qty}x ${l.name}`).join('، ');
    const dateStr = new Date(r.date).toLocaleString(locale, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    const row = document.createElement('div');
    row.style.cssText = 'background:#fafafa;border:1px solid #eee;border-radius:12px;padding:10px 14px;margin-bottom:8px;';
    row.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-weight:800;font-size:.85rem;">${r.employee || 'غير معروف'} — #${r.shortNo}</span>
        <span style="font-weight:800;color:var(--hero-green,#0e7c3a);">${r.total.toFixed(2)} د.إ</span>
      </div>
      <div style="font-size:.75rem;color:#888;margin-bottom:2px;">${dateStr}</div>
      <div style="font-size:.76rem;color:#555;">${itemsSummary}</div>
    `;
    content.appendChild(row);
  });
}

function renderScheduleViewSection(content){
  const note = document.createElement('p');
  note.style.cssText = 'color:#888;font-size:.76rem;margin:0 0 12px;';
  note.textContent = 'المشرف هو اللي يضيف ويعدّل جدول الشفتات من صفحة الموظف. هنا للعرض بس.';
  content.appendChild(note);

  if (!SHIFT_SCHEDULE.length){
    const empty = document.createElement('p');
    empty.style.cssText = 'color:#888;text-align:center;padding:16px;';
    empty.textContent = 'ما فيه مواعيد شفت مجدولة بعد.';
    content.appendChild(empty);
    return;
  }

  const DAYS = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const byDay = {};
  SHIFT_SCHEDULE.forEach(s => {
    if (!byDay[s.dayOfWeek]) byDay[s.dayOfWeek] = [];
    byDay[s.dayOfWeek].push(s);
  });

  DAYS.forEach((dayName, dayIdx) => {
    if (!byDay[dayIdx] || !byDay[dayIdx].length) return;
    const dayHead = document.createElement('div');
    dayHead.style.cssText = 'font-weight:800;font-size:.85rem;color:var(--hero-green,#0e7c3a);margin:14px 0 8px;';
    dayHead.textContent = dayName;
    content.appendChild(dayHead);
    byDay[dayIdx].forEach(s => {
      const row = document.createElement('div');
      row.style.cssText = 'background:#f7faf8;border-radius:10px;padding:10px 12px;margin-bottom:8px;font-size:.84rem;font-weight:700;';
      row.textContent = `${s.staffName} — ${s.startTime} إلى ${s.endTime}`;
      content.appendChild(row);
    });
  });
}

function renderAdminReportsTab(body){
  body.innerHTML = '';

  const { start, end, label } = getReportDateRange(reportPeriod);
  const stats = computeReportStats(start, end);

  const layout = document.createElement('div');
  layout.style.cssText = 'display:flex;align-items:flex-start;gap:0;';

  const sidebar = document.createElement('div');
  sidebar.style.cssText = 'width:92px;flex-shrink:0;border-left:2px solid #eee;';

  const sections = [
    ['home', 'الرئيسية'],
    ['expenses', 'المصروفات'],
    ['salaries', 'الرواتب'],
    ['profitloss', 'الربح والخسارة'],
    ['topproducts', 'الأكثر مبيعًا'],
    ['employees', 'مبيعات الموظفين'],
    ['orders', 'طلبات الموظفين'],
    ['schedule', 'جدول الشفتات'],
    ['payments', 'توزيع الدفع'],
    ['shifts', 'الشفتات والوقت']
  ];
  sections.forEach(([key, slabel], idx) => {
    const active = reportSection === key;
    const item = document.createElement('div');
    item.style.cssText = 'padding:12px 6px;text-align:center;cursor:pointer;' +
      (idx > 0 ? 'border-top:1px solid #f0f0f0;' : '') +
      'border-left:3px solid ' + (active ? 'var(--hero-green,#0e7c3a)' : 'transparent') + ';' +
      'background:' + (active ? '#f3fbf6' : 'transparent') + ';';
    item.innerHTML = `<div style="font-size:.68rem;font-weight:700;color:${active ? 'var(--hero-green,#0e7c3a)' : '#777'};line-height:1.3;">${slabel}</div>`;
    item.onclick = () => { reportSection = key; renderAdminReportsTab(body); };
    sidebar.appendChild(item);
  });

  const content = document.createElement('div');
  content.style.cssText = 'flex:1;min-width:0;padding-right:14px;';

  layout.appendChild(content);
  layout.appendChild(sidebar);
  body.appendChild(layout);

  if (reportSection !== 'home'){
    renderReportPeriodControls(content, () => renderAdminReportsTab(body));
    const hrTop = document.createElement('hr');
    hrTop.style.cssText = 'border:none;border-top:1px dashed #ddd;margin:0 0 14px;';
    content.appendChild(hrTop);
  } else {
    renderReportPeriodControls(content, () => renderAdminReportsTab(body));
  }

  if (reportSection === 'home') renderHomeSection(content, stats, label);
  else if (reportSection === 'expenses') renderExpensesSection(content, stats, body);
  else if (reportSection === 'salaries') renderSalariesSection(content, body);
  else if (reportSection === 'profitloss') renderProfitLossSection(content, stats);
  else if (reportSection === 'topproducts') renderTopProductsSection(content, stats);
  else if (reportSection === 'employees') renderEmployeesSection(content, stats);
  else if (reportSection === 'payments') renderPaymentsSection(content, stats);
  else if (reportSection === 'shifts') renderShiftsSection(content, start, end);
  else if (reportSection === 'orders') renderEmployeeOrdersSection(content, start, end);
  else if (reportSection === 'schedule') renderScheduleViewSection(content);
}
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
/* ---------- Staff priced modifier groups tab (owner-controlled add-ons for staff POS) ---------- */
function renderAdminModifiersTab(body){
  const intro = document.createElement('p');
  intro.className = 'admin-hint';
  intro.style.margin = '0 0 14px';
  intro.textContent = 'هذي إضافات مسعّرة (زي الحليب، السكر، الشراب المنكّه) تظهر بصفحة الموظف بس عند تفعيلها لمنتج معيّن. سوّي مجموعة، حط خياراتها وأسعارها، وبعدين فعّلها لأي منتج تحت من قسم "ربط المنتجات".';
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
    nameInput.style.cssText = 'width:100%;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:8px 10px;font-size:.85rem;margin-bottom:10px;';
    nameInput.addEventListener('blur', () => { grp.title = nameInput.value.trim() || grp.title; });
    fields.appendChild(nameInput);

    if (!grp.options) grp.options = [];

    const optsWrap = document.createElement('div');
    optsWrap.style.cssText = 'display:flex;flex-direction:column;gap:6px;margin-bottom:10px;';

    function renderOptions(){
      optsWrap.innerHTML = '';
      grp.options.forEach((opt, oIdx) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;gap:6px;align-items:center;';
        const nameI = document.createElement('input');
        nameI.value = opt.name || '';
        nameI.placeholder = 'اسم الخيار (مثال: حليب لوز)';
        nameI.style.cssText = 'flex:2;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
        nameI.addEventListener('blur', () => { opt.name = nameI.value.trim() || opt.name; });
        const priceI = document.createElement('input');
        priceI.type = 'number'; priceI.step = '0.01'; priceI.min = '0';
        priceI.value = opt.price || 0;
        priceI.placeholder = 'السعر';
        priceI.style.cssText = 'flex:1;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
        priceI.addEventListener('blur', () => { opt.price = parseFloat(priceI.value) || 0; });
        const delOptBtn = document.createElement('button');
        delOptBtn.className = 'admin-icon-btn del';
        delOptBtn.textContent = '🗑';
        delOptBtn.style.cssText = 'width:28px;height:28px;font-size:.75rem;';
        delOptBtn.onclick = () => { grp.options.splice(oIdx, 1); renderOptions(); };
        row.appendChild(nameI); row.appendChild(priceI); row.appendChild(delOptBtn);
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
  addGroupBtn.textContent = '+ إضافة مجموعة إضافات جديدة';
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
  saveBtn.textContent = '💾 حفظ ونشر مجموعات الإضافات';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    const okG = await Storage.saveModifierGroups(MODIFIER_GROUPS);
    const okM = await Storage.saveMenuOnly(MENU);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر مجموعات الإضافات';
    adminToast((okG && okM) ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);

  // ---- Link products to modifier groups ----
  const linkTitle = document.createElement('div');
  linkTitle.style.cssText = 'font-weight:800;font-size:.95rem;margin:6px 0 10px;';
  linkTitle.textContent = '🔗 ربط المنتجات بالإضافات';
  body.appendChild(linkTitle);

  if (!MODIFIER_GROUPS.length){
    const empty = document.createElement('p');
    empty.className = 'admin-hint';
    empty.textContent = 'سوّي مجموعة إضافات فوق أول شي، وبعدها تقدر تربطها بأي منتج من هنا.';
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

  renderDiscountPresetsSection(body);
}

/* ---------- Discount presets section (owner-controlled, used when staff order any product) ---------- */
function renderDiscountPresetsSection(body){
  const box = document.createElement('div');
  box.className = 'admin-cat';
  box.style.marginTop = '20px';

  const head = document.createElement('div');
  head.className = 'admin-cat-head';
  head.innerHTML = '<span>🏷️ قوائم الخصومات</span>';
  box.appendChild(head);

  const fields = document.createElement('div');
  fields.style.cssText = 'padding:12px 14px;';

  const intro = document.createElement('p');
  intro.className = 'admin-hint';
  intro.style.margin = '0 0 12px';
  intro.textContent = 'تظهر هذي الخصومات للموظف عند طلب أي منتج (زر خصم بنسبة معينة يختاره وقت الطلب).';
  fields.appendChild(intro);

  const listWrap = document.createElement('div');
  listWrap.style.cssText = 'display:flex;flex-direction:column;gap:8px;margin-bottom:10px;';

  function renderList(){
    listWrap.innerHTML = '';
    DISCOUNT_PRESETS.forEach((preset, idx) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:6px;align-items:center;';
      const labelI = document.createElement('input');
      labelI.value = preset.label || '';
      labelI.placeholder = 'اسم الخصم (مثال: خصم عائلي)';
      labelI.style.cssText = 'flex:2;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
      labelI.addEventListener('blur', () => { preset.label = labelI.value.trim() || preset.label; });
      const percentI = document.createElement('input');
      percentI.type = 'number'; percentI.min = '0'; percentI.max = '100';
      percentI.value = preset.percent;
      percentI.placeholder = 'النسبة %';
      percentI.style.cssText = 'flex:1;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
      percentI.addEventListener('blur', () => { preset.percent = Math.max(0, Math.min(100, parseFloat(percentI.value) || 0)); });
      const delBtn = document.createElement('button');
      delBtn.className = 'admin-icon-btn del';
      delBtn.textContent = '🗑';
      delBtn.style.cssText = 'width:28px;height:28px;font-size:.75rem;';
      delBtn.onclick = () => { DISCOUNT_PRESETS.splice(idx, 1); renderList(); };
      row.appendChild(labelI); row.appendChild(percentI); row.appendChild(delBtn);
      listWrap.appendChild(row);
    });
  }
  renderList();
  fields.appendChild(listWrap);

  const addBtn = document.createElement('button');
  addBtn.className = 'admin-btn secondary small';
  addBtn.textContent = '+ إضافة خصم جديد';
  addBtn.onclick = () => {
    DISCOUNT_PRESETS.push({ id: 'disc-' + Date.now(), label: '', percent: 10 });
    renderList();
  };
  fields.appendChild(addBtn);

  box.appendChild(fields);
  body.appendChild(box);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'admin-btn';
  saveBtn.style.marginTop = '10px';
  saveBtn.textContent = '💾 حفظ ونشر الخصومات';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    const ok = await Storage.saveDiscountPresets(DISCOUNT_PRESETS);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر الخصومات';
    adminToast(ok ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);
}

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
/* ---------- Individual staff accounts (owner-managed) ---------- */
/* ---------- Owner's own password change ---------- */
function renderOwnerPasswordSection(body){
  const box = document.createElement('div');
  box.className = 'admin-cat';

  const head = document.createElement('div');
  head.className = 'admin-cat-head';
  head.innerHTML = '<span>🔑 كلمة مرور المالك</span>';
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

function renderStaffAccountsSection(body){
  const box = document.createElement('div');
  box.className = 'admin-cat';

  const head = document.createElement('div');
  head.className = 'admin-cat-head';
  head.innerHTML = '<span>👥 حسابات الموظفين</span>';
  box.appendChild(head);

  const fields = document.createElement('div');
  fields.style.cssText = 'padding:12px 14px;';

  const intro = document.createElement('p');
  intro.className = 'admin-hint';
  intro.style.margin = '0 0 12px';
  intro.textContent = 'كل موظف يدخل باسمه وكلمة مروره الخاصة. "مشرف" يشوف كل المبيعات ويقدر يلغي أي طلب. "موظف" يشوف مبيعاته بس وما يقدر يلغي.';
  fields.appendChild(intro);

  const listWrap = document.createElement('div');
  listWrap.style.cssText = 'display:flex;flex-direction:column;gap:10px;margin-bottom:10px;';

  function renderList(){
    listWrap.innerHTML = '';
    STAFF_ACCOUNTS.forEach((acc, idx) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;background:#f7faf8;border-radius:10px;padding:8px;';
      const nameI = document.createElement('input');
      nameI.value = acc.name || '';
      nameI.placeholder = 'الاسم بالعربي';
      nameI.style.cssText = 'flex:1.2;min-width:90px;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
      nameI.addEventListener('blur', () => { acc.name = nameI.value.trim() || acc.name; });
      const nameEnI = document.createElement('input');
      nameEnI.value = acc.nameEn || '';
      nameEnI.placeholder = 'الاسم بالإنجليزي (اختياري)';
      nameEnI.style.cssText = 'flex:1.2;min-width:90px;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;direction:ltr;';
      nameEnI.addEventListener('blur', () => { acc.nameEn = nameEnI.value.trim(); });
      const passI = document.createElement('input');
      passI.value = acc.password || '';
      passI.placeholder = 'كلمة المرور';
      passI.style.cssText = 'flex:1;min-width:90px;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
      passI.addEventListener('blur', () => { acc.password = passI.value.trim() || acc.password; });
      const roleSel = document.createElement('select');
      roleSel.style.cssText = 'flex:1;min-width:90px;box-sizing:border-box;border:1px solid #e2e2e2;border-radius:8px;padding:7px 9px;font-size:.8rem;';
      [['staff','موظف'], ['supervisor','مشرف']].forEach(([val, label]) => {
        const opt = document.createElement('option');
        opt.value = val; opt.textContent = label;
        if (acc.role === val) opt.selected = true;
        roleSel.appendChild(opt);
      });
      roleSel.addEventListener('change', () => { acc.role = roleSel.value; });
      const delBtn = document.createElement('button');
      delBtn.className = 'admin-icon-btn del';
      delBtn.textContent = '🗑';
      delBtn.style.cssText = 'width:28px;height:28px;font-size:.75rem;';
      delBtn.onclick = () => {
        if (STAFF_ACCOUNTS.length <= 1){ adminToast('لازم يبقى حساب واحد على الأقل'); return; }
        STAFF_ACCOUNTS.splice(idx, 1);
        renderList();
      };
      row.appendChild(nameI); row.appendChild(nameEnI); row.appendChild(passI); row.appendChild(roleSel); row.appendChild(delBtn);
      listWrap.appendChild(row);
    });
  }
  renderList();
  fields.appendChild(listWrap);

  const addBtn = document.createElement('button');
  addBtn.className = 'admin-btn secondary small';
  addBtn.textContent = '+ إضافة موظف جديد';
  addBtn.onclick = () => {
    STAFF_ACCOUNTS.push({ id: 'acc-' + Date.now(), name: '', password: '', role: 'staff' });
    renderList();
  };
  fields.appendChild(addBtn);

  box.appendChild(fields);
  body.appendChild(box);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'admin-btn';
  saveBtn.style.marginTop = '10px';
  saveBtn.textContent = '💾 حفظ ونشر حسابات الموظفين';
  saveBtn.onclick = async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = 'جاري الحفظ...';
    const ok = await Storage.saveStaffAccounts(STAFF_ACCOUNTS);
    saveBtn.disabled = false;
    saveBtn.textContent = '💾 حفظ ونشر حسابات الموظفين';
    adminToast(ok ? 'تم الحفظ بنجاح ✅' : 'تعذّر الحفظ، حاول مرة أخرى');
  };
  body.appendChild(saveBtn);
}

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
  staffColorInput.value = SETTINGS.staffAccentColor || '#0e7c3a';
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

  renderStaffAccountsSection(body);
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

/* ---------- Secret admin trigger (شعار الفوتر — 5 نقرات خلال 3 ثوانٍ) ----------
   لا يوجد أي زر ظاهر للعملاء. المالك فقط يعرف طريقة الفتح. */
(function setupSecretAdminTrigger(){
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
        if (safeSessionGet('filanbon_admin_auth') === '1'){
          renderAdminPanel();
        } else {
          showAdminLogin();
        }
        openAdminOverlay();
      }
    });
  }
  tryLogo();
})();

loadMenuData();

