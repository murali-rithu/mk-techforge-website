/* ==========================================================================
   MK TECHFORGE - Live WhatsApp Integration (Target: +91 8129911207)
   ========================================================================== */

const WHATSAPP_NUMBER = '918129911207';

// Helper function to reliably open WhatsApp avoiding browser pop-up blockers
function openWhatsApp(messageText) {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
  // Using location.href guarantees opening WhatsApp without triggering browser pop-up blockers
  window.location.href = waUrl;
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initDiagnosticWidget();
  initPricingCalculator();
  initKnowledgeBaseSearch();
  initFaqAccordion();
  initTicketModal();
  initContactFormWhatsApp();
  initLiveChatBot();
  initSystemMetricsAnimation();
});

/* 1. Navbar Scroll Effect */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. Interactive Issue Diagnostic Tool */
const diagnosticData = {
  slow_pc: {
    title: 'Computer Running Extremely Slow or Freezing',
    solution: 'High CPU/RAM usage detected. Recommended fix: Clear background startup apps, perform temp disk cleanup, and run background OS system file repair.',
    estTime: '15 mins',
    mode: 'Remote Desktop Connect'
  },
  bsod_crash: {
    title: 'Windows Blue Screen (BSOD) or Mac Boot Error',
    solution: 'Corrupt system driver or memory failure detected. Recommended fix: Boot into Safe Mode, roll back update, or run memory hardware diagnostics.',
    estTime: '20 mins',
    mode: 'Remote / Guided Recovery'
  },
  printer_err: {
    title: 'Printer Not Connecting / Printing Blank Pages',
    solution: 'Print spooler error or Wi-Fi IP mismatch. Recommended fix: Restart spooler service, reinstall manufacturer driver, and re-bind printer IP.',
    estTime: '10 mins',
    mode: 'Remote Desktop Connect'
  },
  email_app: {
    title: 'Outlook / MS Office Application Crashing',
    solution: 'Corrupt Outlook PST profile or Excel add-in lockup. Recommended fix: Repair Office installation, rebuild Outlook index, and reset app credentials.',
    estTime: '15 mins',
    mode: 'Remote Desktop Connect'
  },
  hardware_fail: {
    title: 'No Power, Overheating, or Fan Noise',
    solution: 'Potential power supply failure, clogged heatsink, or thermal paste exhaustion. Recommended fix: Hardware component inspection and fan cleaning.',
    estTime: '30 mins',
    mode: 'In-Person / Repair Desk'
  }
};

function initDiagnosticWidget() {
  const select = document.getElementById('diagIssueSelect');
  const titleEl = document.getElementById('diagResultTitle');
  const solutionEl = document.getElementById('diagResultText');
  const severityEl = document.getElementById('diagResultSeverity');
  const slaEl = document.getElementById('diagResultSLA');
  const dispatchBtn = document.getElementById('diagDispatchBtn');

  if (!select) return;

  select.addEventListener('change', (e) => {
    const key = e.target.value;
    const issue = diagnosticData[key];
    
    if (issue) {
      titleEl.textContent = issue.title;
      solutionEl.textContent = issue.solution;
      severityEl.textContent = `Estimated Fix: ${issue.estTime}`;
      slaEl.textContent = `Mode: ${issue.mode}`;
    }
  });

  if (dispatchBtn) {
    dispatchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentIssueTitle = titleEl.textContent || "Computer Tech Issue";
      const waMsg = `Hi MK TechForge Support,\nI need help resolving this issue on my computer: *${currentIssueTitle}*.`;
      openWhatsApp(waMsg);
    });
  }
}

/* 3. Helpdesk & Hardware Support Rate Calculator */
function initPricingCalculator() {
  const endpointSlider = document.getElementById('endpointSlider');
  const serverSlider = document.getElementById('serverSlider');
  const endpointVal = document.getElementById('endpointVal');
  const serverVal = document.getElementById('serverVal');
  const totalPriceEl = document.getElementById('totalPriceDisplay');
  const planTypeBadge = document.getElementById('planTypeBadge');
  const lockQuoteBtn = document.getElementById('pricingLockQuoteBtn');

  if (!endpointSlider || !serverSlider) return;

  function updatePrice() {
    const pcs = parseInt(endpointSlider.value, 10);
    const printers = parseInt(serverSlider.value, 10);
    
    endpointVal.textContent = `${pcs} Computers`;
    serverVal.textContent = `${printers} Printers/Devices`;

    const baseFee = 54;
    const pcCost = pcs * 15;
    const printerCost = printers * 10;
    const totalMonthly = baseFee + pcCost + printerCost;

    totalPriceEl.textContent = `$${totalMonthly.toLocaleString()}`;

    if (pcs > 25 || printers > 8) {
      planTypeBadge.textContent = 'Pro Enterprise Helpdesk';
    } else if (pcs > 5) {
      planTypeBadge.textContent = 'Standard Business Helpdesk';
    } else {
      planTypeBadge.textContent = 'Basic Home / Office Tech';
    }
  }

  endpointSlider.addEventListener('input', updatePrice);
  serverSlider.addEventListener('input', updatePrice);
  updatePrice();

  if (lockQuoteBtn) {
    lockQuoteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const pcs = endpointSlider.value;
      const printers = serverSlider.value;
      const price = totalPriceEl.textContent;
      const plan = planTypeBadge.textContent;

      const waMsg = `Hi MK TechForge Support,\nI would like to get support for:\n- Computers: ${pcs}\n- Printers/Devices: ${printers}\n- Plan: ${plan} (${price}/mo)`;
      openWhatsApp(waMsg);
    });
  }
}

/* 4. Searchable Knowledge Base Filter */
function initKnowledgeBaseSearch() {
  const searchInput = document.getElementById('kbSearchInput');
  const faqItems = document.querySelectorAll('.faq-item');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    faqItems.forEach(item => {
      const qText = item.querySelector('.faq-question').textContent.toLowerCase();
      const aText = item.querySelector('.faq-answer').textContent.toLowerCase();

      if (qText.includes(query) || aText.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* 5. FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 6. Support Ticket Submission -> Sends Live WhatsApp to 8129911207 */
function initTicketModal() {
  const modal = document.getElementById('ticketModal');
  const openBtns = document.querySelectorAll('.open-ticket-btn');
  const closeBtn = document.getElementById('modalCloseBtn');
  const form = document.getElementById('supportTicketForm');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('ticketName').value.trim();
      const phone = document.getElementById('ticketEmail').value.trim();
      const category = document.getElementById('ticketSeverity').value;
      const desc = document.getElementById('ticketDesc').value.trim();

      const ticketId = 'MK-HELP-' + Math.floor(100000 + Math.random() * 900000);

      const waMessage = `*NEW REMOTE SUPPORT REQUEST*\n` +
                        `------------------------------\n` +
                        `*Ticket Code:* ${ticketId}\n` +
                        `*Name:* ${name}\n` +
                        `*Contact:* ${phone}\n` +
                        `*Device/Category:* ${category}\n` +
                        `*Issue:* ${desc}\n` +
                        `------------------------------\n` +
                        `Please connect with me for assistance.`;

      modal.classList.remove('active');
      openWhatsApp(waMessage);
      form.reset();
    });
  }
}

/* 7. Contact Form Submission -> Sends Live WhatsApp to 8129911207 */
function initContactFormWhatsApp() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const contactInfo = document.getElementById('contactEmail').value.trim();
    const deviceType = document.getElementById('contactCompany').value.trim() || 'Not specified';
    const message = document.getElementById('contactMsg').value.trim();

    const waMessage = `*NEW WEBSITE INQUIRY*\n` +
                      `------------------------------\n` +
                      `*Name:* ${name}\n` +
                      `*Contact:* ${contactInfo}\n` +
                      `*Device:* ${deviceType}\n` +
                      `*Message:* ${message}\n` +
                      `------------------------------\n` +
                      `Sent via MK TechForge Website`;

    openWhatsApp(waMessage);
    contactForm.reset();
  });
}

/* 8. Live Bot & 24/7 WhatsApp Chat Integration */
function initLiveChatBot() {
  const toggleBtn = document.getElementById('chatToggleBtn');
  const chatBox = document.getElementById('chatBoxWidget');
  const closeBtn = document.getElementById('chatCloseBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  const chipWhatsapp = document.getElementById('chipWhatsapp');
  const chipTicket = document.getElementById('chipTicket');
  const chipCall = document.getElementById('chipCall');

  if (!toggleBtn || !chatBox) return;

  toggleBtn.addEventListener('click', () => {
    chatBox.classList.toggle('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      chatBox.classList.remove('active');
    });
  }

  if (chipWhatsapp) {
    chipWhatsapp.addEventListener('click', () => {
      openWhatsApp("Hello MK TechForge Helpdesk, I need assistance with my computer/printer.");
    });
  }

  if (chipTicket) {
    chipTicket.addEventListener('click', () => {
      chatBox.classList.remove('active');
      const ticketModal = document.getElementById('ticketModal');
      if (ticketModal) ticketModal.classList.add('active');
    });
  }

  if (chipCall) {
    chipCall.addEventListener('click', () => {
      appendMessage("Calling MK TechForge Support Desk: +91 8129911207", 'bot');
    });
  }

  const botResponses = {
    hello: "Hello! Welcome to MK TechForge Helpdesk. Do you need help fixing a computer, laptop, printer, or software application today?",
    whatsapp: `Opening WhatsApp chat with our technician (+91 8129911207)...`,
    printer: "For printer issues (offline, driver error, paper jam), make sure your printer is connected to the same Wi-Fi network as your computer or restart the Print Spooler service.",
    slow: "For slow computers or freezing applications, we recommend running disk cleanup, closing heavy background apps, or scheduling a quick 10-minute remote screen assist.",
    bsod: "If you are getting a Blue Screen (BSOD) or startup error, our technician can guide you through Safe Mode recovery or repair corrupt system files.",
    human: `Connecting you directly with an MK TechForge Helpdesk Technician on WhatsApp (+91 8129911207)...`,
    default: `Thank you for reaching out to MK TechForge Helpdesk! For instant assistance, chat with us directly on WhatsApp (+91 8129911207).`
  };

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msgText = chatInput.value.trim();
      if (!msgText) return;

      appendMessage(msgText, 'user');
      chatInput.value = '';

      setTimeout(() => {
        const lower = msgText.toLowerCase();
        let reply = botResponses.default;
        if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) reply = botResponses.hello;
        else if (lower.includes('whatsapp') || lower.includes('wa') || lower.includes('phone') || lower.includes('mobile')) {
          reply = botResponses.whatsapp;
          setTimeout(() => {
            openWhatsApp("Hi MK TechForge Support, I need help: " + msgText);
          }, 800);
        }
        else if (lower.includes('printer') || lower.includes('scan') || lower.includes('print')) reply = botResponses.printer;
        else if (lower.includes('slow') || lower.includes('freeze') || lower.includes('stuck')) reply = botResponses.slow;
        else if (lower.includes('blue') || lower.includes('bsod') || lower.includes('crash') || lower.includes('boot')) reply = botResponses.bsod;
        else if (lower.includes('human') || lower.includes('agent') || lower.includes('person')) reply = botResponses.human;

        appendMessage(reply, 'bot');
      }, 500);
    });
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerHTML = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

/* 9. Live Ticker */
function initSystemMetricsAnimation() {
  const avgWaitEl = document.getElementById('liveAvgWait');
  if (!avgWaitEl) return;

  const waitTimes = ['1m 15s', '0m 45s', '1m 30s', '0m 50s'];
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % waitTimes.length;
    avgWaitEl.textContent = waitTimes[idx];
  }, 6000);
}
