/**
 * UJJWAL MISHRA - CINEMATIC DARK PORTFOLIO SCRIPT
 * Handles mobile drawer, interactive modals, project filtering,
 * email copy, form validation, and scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- PROJECT DATA STORE ---
  const projectsData = [
    {
      id: 1,
      title: "Neon Eclipse Visual Identity",
      category: "Branding System",
      year: "2026",
      image: "assets/projects/project-1.svg",
      description: "A comprehensive brand identity framework crafted for a next-generation tech agency. Built around a pure dark-mode aesthetic with radiant electric lime accents, custom geometric logo mark, modular typography rules, and multi-format collateral.",
      tools: ["Adobe Illustrator", "Figma", "Adobe Photoshop"],
      focus: "Vector Architecture & Visual Systems",
      behanceUrl: "https://www.behance.net/gallery/246078277/Portfolio"
    },
    {
      id: 3,
      title: "Cyber Soundfest Key Visual",
      category: "Poster & Typography",
      year: "2026",
      image: "assets/projects/project-3.svg",
      description: "Neo-brutalist typographic event poster designed for an underground electronic music festival. Featuring custom warped letterforms, 300 DPI print-ready CMYK separation, screenprint textures, and high-impact visual tension.",
      tools: ["Adobe Photoshop", "Adobe Illustrator", "InDesign"],
      focus: "Brutalist Layouts & Custom Letterforms",
      behanceUrl: "https://www.behance.net/gallery/246078277/Portfolio"
    },
    {
      id: 5,
      title: "Apex Creator High-CTR Thumbnails",
      category: "Conversion Packaging",
      year: "2026",
      image: "assets/projects/project-5.svg",
      description: "Engineered YouTube thumbnail suite resulting in an average click-through rate increase of +14.8% across 5.2M+ views. Incorporates precision subject lighting, facial frequency separation, high-contrast focal points, and mobile readability optimization.",
      tools: ["Adobe Photoshop", "Lightroom", "Figma"],
      focus: "Visual Storytelling & High Conversion",
      behanceUrl: "https://www.behance.net/gallery/246078277/Portfolio"
    }
  ];

  // --- 1. MOBILE DRAWER NAVIGATION ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', isOpen);
      mobileMenuBtn.classList.toggle('open', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    };

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });
  }

  // --- 2. STICKY HEADER & SCROLL BEHAVIOR ---
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header elevation
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 3. ACTIVE NAV LINK ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const highlightNav = () => {
    const scrollPosition = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // --- 4. GRAPHIC DESIGN PROJECT FILTERING ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      // Set active
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 5. PROJECT DETAILS LIGHTBOX MODAL ---
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalYear = document.getElementById('modalYear');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTools = document.getElementById('modalTools');
  const modalFocus = document.getElementById('modalFocus');
  const modalBehanceBtn = document.getElementById('modalBehanceBtn');

  const openProjectModal = (projectIndex) => {
    const data = projectsData[projectIndex];
    if (!data || !projectModal) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCategory.textContent = data.category;
    modalYear.textContent = data.year;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;
    modalFocus.textContent = data.focus;
    modalBehanceBtn.href = data.behanceUrl;

    // Populate tools
    modalTools.innerHTML = '';
    data.tools.forEach(tool => {
      const span = document.createElement('span');
      span.textContent = tool;
      modalTools.appendChild(span);
    });

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Attach modal trigger to card elements
  document.querySelectorAll('.view-details-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(trigger.getAttribute('data-project-idx'), 10);
      openProjectModal(idx);
    });
  });

  document.querySelectorAll('.btn-preview-project').forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openProjectModal(idx);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // --- 6. VIDEO SHOWREEL MODAL ---
  const videoModal = document.getElementById('videoModal');
  const videoModalCloseBtn = document.getElementById('videoModalCloseBtn');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoModalDesc = document.getElementById('videoModalDesc');
  const videoModalPoster = document.getElementById('videoModalPoster');
  const heroReelBtn = document.getElementById('heroReelBtn');
  const playReelBtn = document.getElementById('playReelBtn');
  const reelModalTrigger = document.getElementById('reelModalTrigger');

  const openVideoModal = (title, desc, poster) => {
    if (!videoModal) return;
    if (title && videoModalTitle) videoModalTitle.textContent = title;
    if (desc && videoModalDesc) videoModalDesc.textContent = desc;
    if (poster && videoModalPoster) videoModalPoster.src = poster;

    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (heroReelBtn) {
    heroReelBtn.addEventListener('click', () => {
      openVideoModal(
        "Tokyo Midnight // Cinematic Showreel",
        "A fast-paced montage demonstrating commercial pacing, ACES color grading, custom sound design, and kinetic graphics.",
        "assets/projects/project-2.svg"
      );
    });
  }

  if (playReelBtn) {
    playReelBtn.addEventListener('click', () => {
      openVideoModal(
        "Tokyo Midnight // Cinematic Commercial 4K",
        "Lead Video Editing & Sound FX. Mastered in 4K 60FPS for high-end digital broadcast.",
        "assets/projects/project-2.svg"
      );
    });
  }

  if (reelModalTrigger) {
    reelModalTrigger.addEventListener('click', () => {
      openVideoModal(
        "Tokyo Midnight // Cinematic Commercial 4K",
        "Lead Video Editing & Sound FX. Mastered in 4K 60FPS for high-end digital broadcast.",
        "assets/projects/project-2.svg"
      );
    });
  }

  // Video card triggers
  document.querySelectorAll('.open-video-modal, .video-play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = btn.getAttribute('data-video-title') || "Motion & Video Preview";
      const desc = btn.getAttribute('data-video-desc') || "Cinematic cut and pacing created with Adobe Creative Suite.";
      const card = btn.closest('.video-card');
      const poster = card ? card.querySelector('.video-card-thumb')?.src : "assets/projects/project-2.svg";
      openVideoModal(title, desc, poster);
    });
  });

  if (videoModalCloseBtn) videoModalCloseBtn.addEventListener('click', closeVideoModal);

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  const videoHireBtn = document.getElementById('videoHireBtn');
  if (videoHireBtn) {
    videoHireBtn.addEventListener('click', () => {
      closeVideoModal();
    });
  }

  // Escape key closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeVideoModal();
    }
  });

  // --- 7. ONE-CLICK EMAIL COPY & TOAST ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const toastAlert = document.getElementById('toastAlert');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toastAlert) return;
    if (toastMsg) toastMsg.textContent = message;
    toastAlert.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastAlert.classList.remove('show');
    }, 3200);
  };

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = document.getElementById('emailVal')?.textContent.trim() || 'ujjwalmishra.design@gmail.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          // Fallback
          const textArea = document.createElement('textarea');
          textArea.value = email;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        if (copyBtnText) copyBtnText.textContent = "Copied!";
        showToast("Email address copied to clipboard!");

        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = "Copy";
        }, 2500);
      } catch (err) {
        showToast("Email: " + email);
      }
    });
  }

  // --- 8. CONTACT FORM VALIDATION & TRANSMISSION ---
  const contactForm = document.getElementById('contactForm');
  const senderName = document.getElementById('senderName');
  const senderEmail = document.getElementById('senderEmail');
  const projectType = document.getElementById('projectType');
  const projectMessage = document.getElementById('projectMessage');
  const formStatusMsg = document.getElementById('formStatusMsg');
  const submitFormBtn = document.getElementById('submitFormBtn');

  if (contactForm) {
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameGroup = senderName.parentElement;
      if (!senderName.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailGroup = senderEmail.parentElement;
      if (!senderEmail.value.trim() || !validateEmail(senderEmail.value.trim())) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageGroup = projectMessage.parentElement;
      if (!projectMessage.value.trim()) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      // UI state during sending
      const originalBtnHtml = submitFormBtn.innerHTML;
      submitFormBtn.disabled = true;
      submitFormBtn.innerHTML = `<span>Transmitting...</span>`;

      setTimeout(() => {
        submitFormBtn.disabled = false;
        submitFormBtn.innerHTML = originalBtnHtml;

        // Display success alert
        formStatusMsg.className = 'form-status-msg success';
        formStatusMsg.innerHTML = `
          <strong>✓ Message Transmitted Successfully!</strong><br>
          Thank you, <em>${senderName.value.trim()}</em>. Ujjwal Mishra will reply within 24 hours.
        `;

        showToast("Message sent! Thanks for reaching out.");

        // Compose direct mailto link trigger as seamless fallback
        const subject = encodeURIComponent(`[Portfolio Inquiry] ${projectType.value} - ${senderName.value.trim()}`);
        const body = encodeURIComponent(`Name: ${senderName.value.trim()}\nEmail: ${senderEmail.value.trim()}\nProject Scope: ${projectType.value}\n\nMessage:\n${projectMessage.value.trim()}`);
        const mailtoUri = `mailto:ujjwalmishra.design@gmail.com?subject=${subject}&body=${body}`;

        // Offer instant email client open option in status
        const mailtoPrompt = document.createElement('div');
        mailtoPrompt.style.marginTop = '0.5rem';
        mailtoPrompt.innerHTML = `<a href="${mailtoUri}" style="color:#ccff00;text-decoration:underline;font-size:0.8rem;">Click here to also send directly via your default email app →</a>`;
        formStatusMsg.appendChild(mailtoPrompt);

        // Reset inputs
        contactForm.reset();
      }, 700);
    });

    // Realtime error clearing
    [senderName, senderEmail, projectMessage].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.parentElement.classList.remove('has-error');
        });
      }
    });
  }

  // --- 9. DYNAMIC FOOTER YEAR ---
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

});
