/* =========================================================
   MK TECHFORGE — INTERACTIVE APPLICATION SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons if loaded
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Mobile Navigation Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 3. Smooth Scrolling Active State Highlight
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Interactive Diagnostics Triage Tool
    const diagOptions = document.querySelectorAll('.diagnostic-option');
    const diagFill = document.getElementById('diag-fill');
    const diagStatus = document.getElementById('diag-status');
    const diagPercent = document.getElementById('diag-percent');
    const diagResult = document.getElementById('diag-result');
    const diagTitle = document.getElementById('diag-title');
    const diagDesc = document.getElementById('diag-desc');

    const diagnosisData = {
        'slow': {
            title: 'Diagnostic Finding: High Disk / CPU Utilization & Thermal Throttling',
            desc: 'Primary bottlenecks detected in background processes, thermal paste degradation, or fragmented storage. Recommended fix: Deep disk optimization, background process audit, and hardware thermal cleaning.'
        },
        'network': {
            title: 'Diagnostic Finding: DNS Configuration & Gateway Handshake Failure',
            desc: 'Network interface layer unable to resolve IP gateway routing. Recommended fix: Gateway reset, DHCP lease renewal, and encrypted DNS server reconfiguration.'
        },
        'blue-screen': {
            title: 'Diagnostic Finding: Kernel Driver Fault / RAM Hardware Error',
            desc: 'Critical system stop error code (BSOD) caused by outdated graphics/chipset drivers or memory sector corruption. Recommended fix: RAM module stress test & driver rollback/update.'
        },
        'virus': {
            title: 'Diagnostic Finding: Unauthorized Process & Malware Adware Detected',
            desc: 'Malicious background executable consuming system bandwidth and triggering popups. Recommended fix: System isolation, rootkit eradication, and endpoint firewall hardening.'
        }
    };

    let isScanning = false;

    diagOptions.forEach(opt => {
        opt.addEventListener('click', function () {
            if (isScanning) return;
            isScanning = true;

            // Highlight active option
            diagOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');

            const issueKey = this.getAttribute('data-issue');
            const data = diagnosisData[issueKey];

            // Reset progress & hide result
            diagFill.style.width = '0%';
            diagPercent.textContent = '0%';
            diagStatus.textContent = 'Initializing telemetry scan...';
            diagResult.classList.remove('active');

            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 18) + 8;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);

                    diagFill.style.width = '100%';
                    diagPercent.textContent = '100%';
                    diagStatus.textContent = 'Diagnostic Complete!';

                    setTimeout(() => {
                        diagTitle.textContent = data.title;
                        diagDesc.textContent = data.desc;
                        diagResult.classList.add('active');
                        isScanning = false;
                    }, 200);
                } else {
                    diagFill.style.width = `${progress}%`;
                    diagPercent.textContent = `${progress}%`;

                    if (progress < 40) {
                        diagStatus.textContent = 'Analyzing system hardware metrics...';
                    } else if (progress < 75) {
                        diagStatus.textContent = 'Inspecting network & kernel telemetry...';
                    } else {
                        diagStatus.textContent = 'Compiling remediation report...';
                    }
                }
            }, 120);
        });
    });

    // 5. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (questionBtn) {
            questionBtn.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));

                // Toggle current if it was not open
                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 6. Floating Support Chat Assistant Window
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    if (chatToggleBtn && chatWindow) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            if (chatWindow.classList.contains('active') && chatInput) {
                chatInput.focus();
            }
        });
    }

    if (chatCloseBtn && chatWindow) {
        chatCloseBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
    }

    // Automated chat bot response logic
    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            // Add user message
            appendMessage(text, 'user');
            chatInput.value = '';

            // Simulate bot thinking & reply
            setTimeout(() => {
                const botReply = generateBotResponse(text);
                appendMessage(botReply, 'bot');
            }, 600);
        });
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function generateBotResponse(query) {
        const q = query.toLowerCase();
        if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('plan')) {
            return "Our managed IT support packages start with flexible flat-rate options. Would you like us to send a custom quote to your email?";
        } else if (q.includes('remote') || q.includes('screen') || q.includes('help')) {
            return "You can start an instant remote session! Click the WhatsApp button or fill in our support form to get connected in under 2 minutes.";
        } else if (q.includes('hour') || q.includes('time') || q.includes('open')) {
            return "Our emergency IT helpdesk operates 24/7/365. Standard office consulting is available Mon-Fri 8am-6pm.";
        } else if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
            return "Hello! How can MK TechForge assist your business or system today?";
        } else {
            return "Thank you for reaching out. A tech forge engineer has received your note. For immediate urgent support, click our WhatsApp link below!";
        }
    }

    // 7. Toast Notification Handler
    const toast = document.getElementById('toast-notification');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // 8. Contact Support Form Submission
    const supportForm = document.getElementById('support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = supportForm.querySelector('button[type="submit"]');

            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
                supportForm.reset();
                showToast("✓ Thank you! Support ticket #TK-8492 submitted. An engineer will contact you within 15 mins.");
            }, 900);
        });
    }
});
// ============================================================
// CONTACT FORM → WHATSAPP
// ============================================================

const WHATSAPP_NUMBER = "8129911207";

const supportForm = document.getElementById("support-form");

if (supportForm) {
    supportForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const serviceElement = document.getElementById("service-type");
        const service = serviceElement.options[serviceElement.selectedIndex].text;
        const message = document.getElementById("message").value.trim();

        // Create WhatsApp message
        const whatsappMessage =
`*NEW SUPPORT REQUEST - MK TECHFORGE*

*Customer Name:* ${name}
*Phone:* ${phone}
*Email:* ${email}
*Service Required:* ${service}

*Issue / Requirement:*
${message}

Please contact me regarding this request.`;

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp URL
        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

        // Optional success notification
        const toast = document.getElementById("toast-notification");

        if (toast) {
            toast.textContent = "Opening WhatsApp...";
            toast.classList.add("show");

            setTimeout(() => {
                toast.classList.remove("show");
            }, 3000);
        }

        // Clear form
        supportForm.reset();
    });
}
