// JARVIS - IZAX Full Powerful Agent
// Rules: English by default, No Emojis, No Tanglish, Auto-detect client language

const chat = document.getElementById('chat');
const input = document.getElementById('input');
const langLabel = document.getElementById('langLabel');

let memory = {
  clientName: null,
  lastService: null,
  orders: []
};

function addMsg(who, text) {
  const div = document.createElement('div');
  div.className = 'msg ' + (who === 'JARVIS' ? 'jarvis' : 'user');
  div.innerHTML = `<div class="label">${who}</div>${text}`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function detectLanguage(text) {
  const t = text.toLowerCase();
  // Sinhala Unicode range
  if (/[\u0D80-\u0DFF]/.test(text)) return 'Sinhala';
  // Tamil Unicode range
  if (/[\u0B80-\u0BFF]/.test(text)) return 'Tamil';
  // Hindi / Devanagari
  if (/[\u0900-\u097F]/.test(text)) return 'Hindi';
  // Sinhala Romanized
  if (t.includes('ayubowan') || t.includes('kohomada') || t.includes('mama') || t.includes('one') || t.includes('ekak')) return 'Sinhala';
  // Tamil Romanized
  if (t.includes('vanakkam') || t.includes('eppadi') || t.includes('venum') || t.includes('seiyya')) return 'Tamil';
  // Hindi Romanized
  if (t.includes('namaste') || t.includes('chahiye') || t.includes('kya') || t.includes('kaise')) return 'Hindi';
  return 'English';
}

function getReply(text, lang) {
  const t = text.toLowerCase();

  // LANGUAGE-SPECIFIC REPLIES
  if (lang === 'Sinhala') {
    if (t.includes('logo') || t.includes('ekak')) return "Ayubowan. IZAX eken logo ekak hadanna puluwan. Company eka mokakda? Konda colour ekakda oyata one? Price eka Rs. 4,999. Order eka danna kamathi da?";
    if (t.includes('price') || t.includes('gana')) return "Ayubowan. Me price list eka: Logo Design - Rs. 4,999. Website - Rs. 14,999. Instagram Post Pack - Rs. 2,999. Mokakda oyata one?";
    if (t.includes('website')) return "Ayubowan. Website ekak hadanna puluwan. Oyage business eka mokakda? Website eka Rs. 14,999. Order eka danna da?";
    return "Ayubowan. Mama JARVIS. IZAX eke AI Agent. Oyata logo, website, nathnam design ekak one da? Kiyanna.";
  }

  if (lang === 'Tamil') {
    if (t.includes('logo')) return "Vanakkam. IZAX il logo seiya mudiyum. Ungal company peyar enna? Enna colour venum? Price Rs. 4,999. Order seiyya virumbukireergala?";
    if (t.includes('price') || t.includes('vilai')) return "Vanakkam. Price list: Logo Design - Rs. 4,999. Website - Rs. 14,999. Instagram Post Pack - Rs. 2,999. Edhu venum?";
    if (t.includes('website')) return "Vanakkam. Website seiya mudiyum. Ungal business enna? Website Rs. 14,999. Order seiyyalama?";
    return "Vanakkam. Naan JARVIS. IZAX in AI Agent. Ungalukku logo, website alladhu design venuma? Sollungal.";
  }

  if (lang === 'Hindi') {
    if (t.includes('logo')) return "Namaste. IZAX me logo ban sakta hai. Aapki company ka naam kya hai? Kaunsa colour chahiye? Price Rs. 4,999 hai. Order karna hai?";
    return "Namaste. Main JARVIS hoon. IZAX ka AI Agent. Aapko logo, website ya design chahiye? Batayein.";
  }

  // ENGLISH - DEFAULT, NO TANGLISH, NO EMOJIS
  if (t.includes('logo')) {
    memory.lastService = 'Logo Design';
    return "Hello. I am JARVIS, IZAX AI Agent.\n\nI can create a professional logo for you.\n\nPlease share:\n1. Your company name\n2. Your preferred color\n3. Your business type\n\nPrice: Rs. 4,999\nDelivery: Within 24 hours\n\nWould you like to place the order?";
  }
  if (t.includes('website') || t.includes('web')) {
    memory.lastService = 'Website';
    return "Hello. I can create a complete website for your business.\n\nPrice: Rs. 14,999\nIncludes: Home Page, Services, Order Form, WhatsApp Connect\nDelivery: 2-3 days\n\nWhat is your business name?";
  }
  if (t.includes('price') || t.includes('cost') || t.includes('rate')) {
    return "Here is the IZAX Price List:\n\nLogo Design - Rs. 4,999\nWebsite - Rs. 14,999\nInstagram Post Pack (10 Posts) - Rs. 2,999\nBusiness Starter Pack - Rs. 9,999\n\nWhich service do you need?";
  }
  if (t.includes('order') || t.includes('buy') || t.includes('place')) {
    memory.orders.push(memory.lastService || 'General');
    return "Thank you. Your order request is noted.\n\nService: " + (memory.lastService || 'To be confirmed') + "\n\nTo confirm, please share your name and WhatsApp number. I will forward your order to IZAX team for payment and delivery.";
  }
  if (t.includes('hi') || t.includes('hello') || t.includes('hey')) {
    return "Hello. I am JARVIS, IZAX AI Agent.\n\nHow can I help you today?\n\nYou can ask for:\n- Logo Design\n- Website\n- Prices\n- Place an Order";
  }
  if (t.includes('who are you') || t.includes('your name')) {
    return "I am JARVIS. I am the AI Agent for IZAX. I work 24/7. I can take orders, answer questions, and help clients in their own language.";
  }
  if (t.includes('thank')) {
    return "You are welcome. If you need anything else, I am available 24/7. Thank you for choosing IZAX.";
  }

  return "Thank you for your message. I am JARVIS, IZAX AI Agent.\n\nI can help you with Logo Design, Website, Prices, or Placing an Order.\n\nWhat do you need?";
}

function send() {
  const text = input.value.trim();
  if (!text) return;
  const lang = detectLanguage(text);
  langLabel.textContent = 'Detected Language: ' + lang;
  addMsg('YOU', text);
  input.value = '';
  setTimeout(() => {
    const reply = getReply(text, lang);
    addMsg('JARVIS', reply);
  }, 500);
}

function quick(text) {
  input.value = text;
  send();
}

// Initial message - English only, No Emojis
addMsg('JARVIS', "Hello. I am JARVIS, IZAX AI Agent.\n\nI am online and ready to help you 24/7.\n\nWhat do you need? Logo Design, Website, Prices, or Place an Order?");
