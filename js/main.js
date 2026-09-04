/**
 * Nayel Solutions - Interactive Frontend Logic, Sliders, Filters, Lightbox & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // 1. Top Scroll Progress Bar
  // ---------------------------------------------------------------------------
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgressBar.style.width = `${progress}%`;
  }

  // ---------------------------------------------------------------------------
  // 2. Mobile Menu Drawer
  // ---------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('translate-x-full');
    if (mobileDrawerOverlay) {
      mobileDrawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
      mobileDrawerOverlay.classList.add('opacity-100', 'pointer-events-auto');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('translate-x-full');
    if (mobileDrawerOverlay) {
      mobileDrawerOverlay.classList.add('opacity-0', 'pointer-events-none');
      mobileDrawerOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    }
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // ---------------------------------------------------------------------------
  // 3. Header Styling & Scroll-To-Top & ScrollSpy
  // ---------------------------------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');
  const desktopNavLinks = document.querySelectorAll('header nav a');
  const sections = document.querySelectorAll('section[id]');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  function updateScrollSpy() {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('nav-link-active');
      } else {
        link.classList.remove('nav-link-active');
      }
    });
  }

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateScrollSpy();

    if (mainHeader) {
      if (window.scrollY > 40) {
        mainHeader.classList.add('shadow-lg', 'shadow-cyan-950/40', 'bg-slate-950/95', 'py-1');
        mainHeader.classList.remove('bg-slate-950/70');
      } else {
        mainHeader.classList.remove('shadow-lg', 'shadow-cyan-950/40', 'bg-slate-950/95', 'py-1');
        mainHeader.classList.add('bg-slate-950/70');
      }
    }

    if (scrollToTopBtn) {
      if (window.scrollY > 350) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
        scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Mission & Vision Tab Switcher in About Us
  // ---------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.about-tab-btn');
  const tabPanes = document.querySelectorAll('.about-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      tabBtns.forEach(b => {
        b.classList.remove('active', 'bg-cyan-500', 'text-white');
        b.classList.add('bg-slate-900', 'text-slate-400');
      });
      btn.classList.add('active', 'bg-cyan-500', 'text-white');
      btn.classList.remove('bg-slate-900', 'text-slate-400');

      tabPanes.forEach(pane => {
        if (pane.id === `${targetTab}-pane`) {
          pane.classList.remove('hidden');
          pane.classList.add('block');
        } else {
          pane.classList.add('hidden');
          pane.classList.remove('block');
        }
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Animated Number Counters
  // ---------------------------------------------------------------------------
  const counterElements = document.querySelectorAll('.counter-val');
  let countersAnimated = false;

  function animateCounters() {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      let current = 0;
      const duration = 2000;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = `${target.toLocaleString()}${suffix}`;
          clearInterval(timer);
        } else {
          counter.textContent = `${Math.floor(current).toLocaleString()}${suffix}`;
        }
      }, stepTime);
    });
  }

  const statsSection = document.getElementById('statsSection') || document.querySelector('.counter-area');
  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(statsSection);
  }

  // ---------------------------------------------------------------------------
  // 5.5 FAQ Accordion Toggle
  // ---------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // ---------------------------------------------------------------------------
  // 6. Services Category & Automatic Moving Stream / 3D Grid Switcher
  // ---------------------------------------------------------------------------
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');
  const servicesGridView = document.getElementById('servicesGridView');
  const servicesMarqueeWrapper = document.getElementById('servicesMarqueeWrapper') || document.getElementById('servicesMovingView');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-service-filter') || btn.getAttribute('data-filter');

      // Update button active state with Corporate Light Theme styling
      serviceTabBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-cyan-600', 'via-blue-600', 'to-indigo-600', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md', 'shadow-cyan-500/20', 'border-transparent');
        b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200', 'shadow-xs');
      });

      btn.classList.add('bg-gradient-to-r', 'from-cyan-600', 'via-blue-600', 'to-indigo-600', 'text-white', 'shadow-md', 'shadow-cyan-500/20', 'border-transparent');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      if (filter === 'all') {
        // Show continuous moving stream of all 12 services
        if (servicesGridView) servicesGridView.classList.add('hidden');
        if (servicesMarqueeWrapper) {
          servicesMarqueeWrapper.classList.remove('hidden');
        }
      } else {
        // Specific category chosen: Hide moving stream, display 3-in-a-row 3D animated cards for this category
        if (servicesMarqueeWrapper) servicesMarqueeWrapper.classList.add('hidden');
        if (servicesGridView) {
          servicesGridView.classList.remove('hidden');
        }

        let matchedCount = 0;
        serviceCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (category === filter || (category && category.includes(filter))) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.animationDelay = `${matchedCount * 0.08}s`;
            card.classList.remove('animate-card-pop-in');
            void card.offsetWidth; // Trigger reflow
            card.classList.add('animate-card-pop-in', 'revealed');
            matchedCount++;
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.classList.remove('animate-card-pop-in');
          }
        });
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 6.5 Interactive Project Scope & Timeline Estimator Widget
  // ---------------------------------------------------------------------------
  const estimatorServiceBtns = document.querySelectorAll('.estimator-service-pill');
  const estimatorScaleBtns = document.querySelectorAll('.estimator-scale-pill');
  const estimatorSlider = document.getElementById('estimatorSlider');
  const estimatorBudgetValue = document.getElementById('estimatorBudgetValue');
  const estimatorSprints = document.getElementById('estimatorSprints');
  const estimatorTechStack = document.getElementById('estimatorTechStack');
  const estimatorTeam = document.getElementById('estimatorTeam');
  const estimatorWhatsAppBtn = document.getElementById('estimatorWhatsAppBtn');

  let selectedService = 'ERP / Cloud Web System';
  let selectedScale = 'Growth Scale';
  let selectedBudget = 12000;

  const techMapping = {
    'ERP / Cloud Web System': {
      tech: 'ASP.NET Core · Next.js · PostgreSQL · Docker · AWS',
      sprints: '4 - 6 Sprints (~8-12 Weeks)',
      team: '1 Solutions Architect, 2 Fullstack Devs, 1 QA Lead'
    },
    'Mobile iOS & Android App': {
      tech: 'Flutter 3 · Dart · Node.js · Firebase · REST API',
      sprints: '3 - 5 Sprints (~6-10 Weeks)',
      team: '1 Mobile Lead, 2 Flutter Devs, 1 UI/UX Specialist'
    },
    'AI & Automation Pipeline': {
      tech: 'Python · PyTorch · TensorRT · OpenAI · FastAPI',
      sprints: '4 - 8 Sprints (~8-14 Weeks)',
      team: '1 AI Research Engineer, 1 Backend Dev, 1 MLOps Dev'
    },
    'Hardware Simulator & Lab Rig': {
      tech: 'Embedded C++ · CANBus · STM32 · FPGA · Telemetry',
      sprints: '6 - 10 Sprints (~12-18 Weeks)',
      team: '1 Embedded Lead, 1 Hardware Engineer, 1 Firmware Dev'
    }
  };

  function updateEstimator() {
    const config = techMapping[selectedService] || techMapping['ERP / Cloud Web System'];
    if (estimatorSprints) estimatorSprints.textContent = config.sprints;
    if (estimatorTechStack) estimatorTechStack.textContent = config.tech;
    if (estimatorTeam) estimatorTeam.textContent = config.team;
    if (estimatorBudgetValue && estimatorSlider) {
      const val = parseInt(estimatorSlider.value, 10);
      estimatorBudgetValue.textContent = `$${val.toLocaleString()}`;
    }

    if (estimatorWhatsAppBtn) {
      const text = encodeURIComponent(`Hello Nayel Solutions, I used your Interactive Project Estimator:\n\n• Service: ${selectedService}\n• Scale: ${selectedScale}\n• Estimated Budget: $${estimatorSlider ? parseInt(estimatorSlider.value, 10).toLocaleString() : '12,000'}\n\nI would like to discuss this project architecture.`);
      estimatorWhatsAppBtn.href = `https://wa.me/923278564834?text=${text}`;
    }
  }

  if (estimatorServiceBtns.length > 0) {
    estimatorServiceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        estimatorServiceBtns.forEach(b => {
          b.classList.remove('bg-cyan-600', 'text-white', 'border-transparent', 'shadow-sm');
          b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
        });
        btn.classList.add('bg-cyan-600', 'text-white', 'border-transparent', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
        selectedService = btn.getAttribute('data-service-name') || btn.textContent.trim();
        updateEstimator();
      });
    });
  }

  if (estimatorScaleBtns.length > 0) {
    estimatorScaleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        estimatorScaleBtns.forEach(b => {
          b.classList.remove('bg-indigo-600', 'text-white', 'border-transparent', 'shadow-sm');
          b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
        });
        btn.classList.add('bg-indigo-600', 'text-white', 'border-transparent', 'shadow-sm');
        btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
        selectedScale = btn.getAttribute('data-scale-name') || btn.textContent.trim();
        updateEstimator();
      });
    });
  }

  if (estimatorSlider) {
    estimatorSlider.addEventListener('input', updateEstimator);
  }

  updateEstimator();


  // ---------------------------------------------------------------------------
  // 7. Projects & Screenshot Gallery Filter (Auto-Moving Stream + 3D Grid Switcher)
  // ---------------------------------------------------------------------------
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-wrapper');
  const allGalleryFilterBtns = document.querySelectorAll('.project-filter-btn, .gallery-tab-btn');
  const screenshotsMovingView = document.getElementById('screenshotsMovingView');
  const screenshotsGridView = document.getElementById('screenshotsGridView');
  const screenshotGridCards = document.querySelectorAll('.screenshot-grid-card');

  allGalleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || btn.getAttribute('data-gallery-filter');
      const isGalleryPageTab = btn.classList.contains('gallery-tab-btn');

      const siblingBtns = isGalleryPageTab 
        ? document.querySelectorAll('.gallery-tab-btn') 
        : document.querySelectorAll('.project-filter-btn');

      siblingBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-purple-500', 'to-cyan-500', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-lg', 'shadow-purple-500/25', 'shadow-cyan-500/25', 'border-transparent');
        b.classList.add('bg-slate-900/60', 'text-slate-400', 'border-slate-800');
      });

      if (isGalleryPageTab) {
        btn.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-lg', 'shadow-cyan-500/25', 'border-transparent');
      } else {
        btn.classList.add('bg-gradient-to-r', 'from-purple-500', 'to-cyan-500', 'text-white', 'shadow-lg', 'shadow-purple-500/25', 'border-transparent');
      }
      btn.classList.remove('bg-slate-900/60', 'text-slate-400', 'border-slate-800');

      // Check if this is the homepage screenshots section with moving stream & 3D grid
      if (screenshotsMovingView && screenshotsGridView) {
        if (filter === 'all') {
          screenshotsGridView.classList.add('hidden');
          screenshotsMovingView.classList.remove('hidden');
          screenshotsMovingView.classList.remove('animate-stream-fade-in');
          void screenshotsMovingView.offsetWidth; // Reflow
          screenshotsMovingView.classList.add('animate-stream-fade-in');
        } else {
          screenshotsMovingView.classList.add('hidden');
          screenshotsGridView.classList.remove('hidden');

          let matchedCount = 0;
          screenshotGridCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (category === filter || (category && category.includes(filter))) {
              card.style.display = 'flex';
              card.style.opacity = '1';
              card.style.animationDelay = `${matchedCount * 0.08}s`;
              card.classList.remove('animate-card-pop-in');
              void card.offsetWidth;
              card.classList.add('animate-card-pop-in', 'revealed');
              matchedCount++;
            } else {
              card.style.display = 'none';
              card.style.opacity = '0';
              card.classList.remove('animate-card-pop-in');
            }
          });
        }
      }

      // Standard gallery grid filtering for gallery.html & sub-pages
      if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category') || item.getAttribute('data-gallery-cat');
          if (filter === 'all' || category === filter || (category && category.includes(filter))) {
            item.style.display = '';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 250);
          }
        });
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 8. Image Lightbox Modal for Projects & Screenshots
  // ---------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const prevLightboxBtn = document.getElementById('prevLightboxBtn');
  const nextLightboxBtn = document.getElementById('nextLightboxBtn');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger, .open-lightbox-btn');

  let currentGalleryIndex = 0;
  let galleryImageArray = [];

  lightboxTriggers.forEach((trigger, index) => {
    const imgSrc = trigger.getAttribute('data-src') || trigger.getAttribute('src') || trigger.querySelector('img')?.getAttribute('src');
    const title = trigger.getAttribute('data-caption') || trigger.getAttribute('data-title') || trigger.getAttribute('alt') || 'Project Screenshot';
    if (imgSrc) {
      galleryImageArray.push({ src: imgSrc, title: title });
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        currentGalleryIndex = index;
        openLightbox(currentGalleryIndex);
      });
    }
  });

  function openLightbox(index) {
    if (!lightboxModal || !galleryImageArray[index]) return;
    const item = galleryImageArray[index];
    if (lightboxImage) lightboxImage.src = item.src;
    if (lightboxCaption) lightboxCaption.textContent = item.title;
    lightboxModal.classList.remove('hidden');
    lightboxModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImageArray.length;
    openLightbox(currentGalleryIndex);
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImageArray.length) % galleryImageArray.length;
    openLightbox(currentGalleryIndex);
  }

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (nextLightboxBtn) nextLightboxBtn.addEventListener('click', showNextImage);
  if (prevLightboxBtn) prevLightboxBtn.addEventListener('click', showPrevImage);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.id === 'lightboxBackdrop') {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'ArrowLeft') showPrevImage();
    }
  });

  // ---------------------------------------------------------------------------
  // 9. Testimonials Carousel / Slider
  // ---------------------------------------------------------------------------
  const testimonialSlides = document.querySelectorAll('.testimonial-slide-item');
  const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
  const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');
  const dotIndicators = document.querySelectorAll('.dot-indicator');
  let currentTestimonial = 0;
  let testimonialAutoInterval;

  function showTestimonial(index) {
    testimonialSlides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.remove('hidden', 'opacity-0');
        slide.classList.add('block', 'opacity-100');
      } else {
        slide.classList.add('hidden', 'opacity-0');
        slide.classList.remove('block', 'opacity-100');
      }
    });

    dotIndicators.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.remove('bg-slate-700', 'w-2.5');
        dot.classList.add('bg-cyan-400', 'w-8');
      } else {
        dot.classList.remove('bg-cyan-400', 'w-8');
        dot.classList.add('bg-slate-700', 'w-2.5');
      }
    });
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
  }

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
    showTestimonial(currentTestimonial);
  }

  if (nextTestimonialBtn) nextTestimonialBtn.addEventListener('click', nextTestimonial);
  if (prevTestimonialBtn) prevTestimonialBtn.addEventListener('click', prevTestimonial);

  dotIndicators.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      currentTestimonial = idx;
      showTestimonial(currentTestimonial);
    });
  });

  if (testimonialSlides.length > 0) {
    showTestimonial(0);
    testimonialAutoInterval = setInterval(nextTestimonial, 6000);

    const testimonialContainer = document.getElementById('testimonials');
    if (testimonialContainer) {
      testimonialContainer.addEventListener('mouseenter', () => clearInterval(testimonialAutoInterval));
      testimonialContainer.addEventListener('mouseleave', () => {
        clearInterval(testimonialAutoInterval);
        testimonialAutoInterval = setInterval(nextTestimonial, 6000);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 10. Product Specification Modal (delegated to Section 20)
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // 11. Interactive Contact Form with SweetAlert Style Modal Toast
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (!toastNotification) return;
    if (toastMessage) toastMessage.textContent = msg;
    toastNotification.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
    toastNotification.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

    setTimeout(() => {
      toastNotification.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      toastNotification.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `
        <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        <span>Sending Inquiry...</span>
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('Thank you! Your message has been sent successfully to Nayel Solutions.');
      }, 1200);
    });
  }

  // ---------------------------------------------------------------------------
  // 12. Advanced Scroll Reveal Animations with IntersectionObserver
  // ---------------------------------------------------------------------------
  document.documentElement.classList.add('js-loaded');
  const revealElements = document.querySelectorAll('.scroll-reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-fade, .stagger-parent');
  
  // Immediately reveal anything already visible in viewport
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
      el.classList.add('revealed');
      if (el.classList.contains('stagger-parent')) {
        Array.from(el.children).forEach((child, index) => {
          child.style.transitionDelay = `${(index * 0.08).toFixed(2)}s`;
          child.classList.add('revealed');
        });
      }
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // If it's a stagger container, also reveal its direct children smoothly
        if (entry.target.classList.contains('stagger-parent')) {
          Array.from(entry.target.children).forEach((child, index) => {
            child.style.transitionDelay = `${(index * 0.08).toFixed(2)}s`;
            child.classList.add('revealed');
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  revealElements.forEach(el => {
    if (!el.classList.contains('revealed')) {
      revealObserver.observe(el);
    }
  });

  // ---------------------------------------------------------------------------
  // 13. Interactive Hero Section (3D Parallax Wallpaper, Spotlight & Particles)
  // ---------------------------------------------------------------------------
  // 12. Ultra-Smooth Hero Parallax, Tech Video Controller & Particle Dynamics
  // ---------------------------------------------------------------------------
  const heroSection = document.getElementById('hero');
  const heroParallaxLayer = document.getElementById('heroParallaxLayer');
  const heroCursorLight = document.getElementById('heroCursorLight');
  const heroCanvas = document.getElementById('heroCanvas');
  const heroBgVideo = document.getElementById('heroBgVideo');
  const parallaxBadges = document.querySelectorAll('#hero [data-parallax-depth]');

  if (heroSection) {
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      isHovering: false,
      isHeroVisible: true,
      scrollY: 0
    };

    // Video Playback Controller (Autoplay on page load & on scroll)
    function ensureVideoPlayback() {
      if (heroBgVideo) {
        heroBgVideo.muted = true;
        const playPromise = heroBgVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay was prevented; play upon any user interaction or scroll
            const onFirstInteraction = () => {
              heroBgVideo.play().catch(() => {});
              window.removeEventListener('scroll', onFirstInteraction);
              window.removeEventListener('click', onFirstInteraction);
              window.removeEventListener('touchstart', onFirstInteraction);
            };
            window.addEventListener('scroll', onFirstInteraction, { passive: true, once: true });
            window.addEventListener('click', onFirstInteraction, { once: true });
            window.addEventListener('touchstart', onFirstInteraction, { passive: true, once: true });
          });
        }
      }
    }
    ensureVideoPlayback();

    // Track hero visibility so we pause video/calculations when offscreen to save battery & GPU
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        mouse.isHeroVisible = entry.isIntersecting;
        if (heroBgVideo) {
          if (entry.isIntersecting) {
            heroBgVideo.play().catch(() => {});
          } else {
            heroBgVideo.pause();
          }
        }
      });
    }, { threshold: 0.05 });
    heroObserver.observe(heroSection);

    // Scroll parallax depth effect
    window.addEventListener('scroll', () => {
      if (mouse.isHeroVisible) {
        mouse.scrollY = window.scrollY || document.documentElement.scrollTop;
        if (heroBgVideo && heroBgVideo.paused) {
          heroBgVideo.play().catch(() => {});
        }
      }
    }, { passive: true });

    // Mouse movement listener
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.targetX = (x - 0.5) * 2; // -1 to 1
      mouse.targetY = (y - 0.5) * 2; // -1 to 1
      mouse.isHovering = true;

      // Update CSS spotlight variables
      if (heroCursorLight) {
        heroCursorLight.style.setProperty('--spotlight-x', `${(x * 100).toFixed(1)}%`);
        heroCursorLight.style.setProperty('--spotlight-y', `${(y * 100).toFixed(1)}%`);
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
      mouse.isHovering = false;
    });

    // Dynamic Click Ripple Effect
    heroSection.addEventListener('click', (e) => {
      // Don't trigger ripple if clicking a link or interactive button
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.open-product-modal')) return;
      const rect = heroSection.getBoundingClientRect();
      const ripple = document.createElement('div');
      ripple.className = 'hero-ripple';
      const size = Math.max(rect.width, rect.height) * 0.4;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left}px`;
      ripple.style.top = `${e.clientY - rect.top}px`;
      heroSection.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);
    });

    // Smooth Parallax Animation Loop
    let scrollEaseY = 0;
    function renderParallax() {
      if (mouse.isHeroVisible) {
        // Easing interpolation for butter-smooth movement
        const ease = 0.07;
        mouse.currentX += (mouse.targetX - mouse.currentX) * ease;
        mouse.currentY += (mouse.targetY - mouse.currentY) * ease;
        scrollEaseY += (mouse.scrollY - scrollEaseY) * 0.08;

        // Move the video & background layer with mouse and scroll depth
        if (heroParallaxLayer) {
          const moveX = -mouse.currentX * 24;
          const moveY = -mouse.currentY * 18 + (scrollEaseY * 0.22);
          heroParallaxLayer.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) scale(1.05)`;
        }

        // Multi-depth 3D movement for badges & orbit rings
        parallaxBadges.forEach(badge => {
          const depth = parseFloat(badge.getAttribute('data-parallax-depth')) || 20;
          const bX = mouse.currentX * depth;
          const bY = mouse.currentY * depth;
          badge.style.transform = `translate3d(${bX.toFixed(2)}px, ${bY.toFixed(2)}px, 0)`;
        });
      }
      requestAnimationFrame(renderParallax);
    }
    renderParallax();

    // Mobile Device Orientation Gyro Tilt Support
    if (window.DeviceOrientationEvent && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      window.addEventListener('deviceorientation', (e) => {
        if (!mouse.isHovering && e.gamma !== null && e.beta !== null) {
          const clampGamma = Math.min(Math.max(e.gamma, -30), 30) / 30; // Left-Right
          const clampBeta = Math.min(Math.max(e.beta - 45, -30), 30) / 30; // Top-Bottom
          mouse.targetX = clampGamma * 0.7;
          mouse.targetY = clampBeta * 0.7;
        }
      }, { passive: true });
    }

    // -------------------------------------------------------------------------
    // Interactive HTML5 Tech Canvas Particle Engine
    // -------------------------------------------------------------------------
    if (heroCanvas) {
      const ctx = heroCanvas.getContext('2d');
      let width = 0;
      let height = 0;
      const particles = [];
      const particleCount = window.innerWidth < 768 ? 26 : 50;

      function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = heroSection.offsetWidth;
        height = heroSection.offsetHeight;
        heroCanvas.width = width * dpr;
        heroCanvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }

      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      class Particle {
        constructor() {
          this.reset(true);
        }

        reset(initial = false) {
          this.x = Math.random() * width;
          this.y = initial ? Math.random() * height : (Math.random() > 0.5 ? 0 : height);
          this.vx = (Math.random() - 0.5) * 0.6;
          this.vy = (Math.random() - 0.5) * 0.6;
          this.radius = Math.random() * 2 + 1;
          this.baseAlpha = Math.random() * 0.5 + 0.25;
          this.alpha = this.baseAlpha;
          const colors = ['rgba(6, 182, 212, ', 'rgba(56, 189, 248, ', 'rgba(168, 85, 247, ', 'rgba(255, 255, 255, '];
          this.colorBase = colors[Math.floor(Math.random() * colors.length)];
        }

        update(mouseX, mouseY, isHovering) {
          this.x += this.vx;
          this.y += this.vy;

          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;

          if (isHovering && mouseX !== undefined && mouseY !== undefined) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 140) {
              const force = (140 - dist) / 140;
              this.x -= (dx / dist) * force * 2.2;
              this.y -= (dy / dist) * force * 2.2;
              this.alpha = Math.min(1, this.baseAlpha + 0.4);
            } else {
              this.alpha = this.baseAlpha;
            }
          }
        }

        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${this.colorBase}${this.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }

      const heroMousePos = { x: -1000, y: -1000 };
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        heroMousePos.x = e.clientX - rect.left;
        heroMousePos.y = e.clientY - rect.top;
      });

      function animateParticles() {
        if (mouse.isHeroVisible) {
          ctx.clearRect(0, 0, width, height);

          const maxDist = window.innerWidth < 768 ? 85 : 120;
          for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            p1.update(heroMousePos.x, heroMousePos.y, mouse.isHovering);
            p1.draw();

            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < maxDist) {
                const lineAlpha = (1 - dist / maxDist) * 0.22;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }

            if (mouse.isHovering) {
              const mdx = p1.x - heroMousePos.x;
              const mdy = p1.y - heroMousePos.y;
              const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
              if (mdist < 140) {
                const mAlpha = (1 - mdist / 140) * 0.45;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(heroMousePos.x, heroMousePos.y);
                ctx.strokeStyle = `rgba(34, 211, 238, ${mAlpha})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
              }
            }
          }
        }
        requestAnimationFrame(animateParticles);
      }
      animateParticles();
    }
  }

  // ---------------------------------------------------------------------------
  // 14. Smooth 3D Tilt & Specular Light Reflection (Lightweight & Hardware Accelerated)
  // ---------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    let isTicking = false;

    card.addEventListener('mousemove', (e) => {
      if (isTicking) return;
      isTicking = true;

      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const maxTilt = 8;
        const rotateX = ((centerY - y) / centerY) * maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--glare-x', `${((x / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${((y / rect.height) * 100).toFixed(1)}%`);
        isTicking = false;
      });
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ---------------------------------------------------------------------------
  // 15. Staggered Scroll-Reveal Observer for 3-in-a-Row Rows
  // ---------------------------------------------------------------------------
  const staggerRows = document.querySelectorAll('.stagger-3-row');

  if ('IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    staggerRows.forEach(row => staggerObserver.observe(row));
  } else {
    staggerRows.forEach(row => row.classList.add('revealed'));
  }

  // ---------------------------------------------------------------------------
  // 16. Global Page Hero Video Autoplay, Scroll Sync & Battery Saver Observer
  // ---------------------------------------------------------------------------
  const pageHeroVideos = document.querySelectorAll('.page-hero-video');
  if (pageHeroVideos.length > 0) {
    pageHeroVideos.forEach(v => {
      v.muted = true;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          const startOnInteraction = () => {
            v.play().catch(() => {});
            window.removeEventListener('scroll', startOnInteraction);
            window.removeEventListener('click', startOnInteraction);
            window.removeEventListener('touchstart', startOnInteraction);
          };
          window.addEventListener('scroll', startOnInteraction, { passive: true, once: true });
          window.addEventListener('click', startOnInteraction, { once: true });
          window.addEventListener('touchstart', startOnInteraction, { passive: true, once: true });
        });
      }
    });

    if ('IntersectionObserver' in window) {
      const pageVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target.querySelector('video') || (entry.target.tagName === 'VIDEO' ? entry.target : null);
          if (video) {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          }
        });
      }, { threshold: 0.05 });

      document.querySelectorAll('.page-hero-banner-light').forEach(banner => {
        pageVideoObserver.observe(banner);
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 17. Scroll-Linked Moving Team Profile Avatars (Left-to-Right Glide Animation)
  // ---------------------------------------------------------------------------
  const teamTrackContainers = document.querySelectorAll('.team-track-container');
  if (teamTrackContainers.length > 0) {
    function updateTeamAvatarGlide() {
      const windowH = window.innerHeight;

      teamTrackContainers.forEach(container => {
        const mover = container.querySelector('.team-avatar-mover');
        const fill = container.querySelector('.team-track-fill');
        if (!mover) return;

        const rect = container.getBoundingClientRect();
        
        // Progress window: Start when top enters 85% of viewport, finish at 20% of viewport
        const startY = windowH * 0.85;
        const endY = windowH * 0.20;
        
        let progress = (startY - rect.top) / (startY - endY);
        progress = Math.max(0, Math.min(1, progress));

        const containerWidth = container.clientWidth;
        const moverWidth = mover.offsetWidth;
        const padding = 24; // 12px horizontal padding each side
        const maxTravel = Math.max(0, containerWidth - moverWidth - padding);

        const currentX = progress * maxTravel;
        mover.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;

        if (fill) {
          fill.style.width = `${(progress * 100).toFixed(1)}%`;
        }
      });
    }

    let isAvatarTicking = false;
    function onAvatarScroll() {
      if (!isAvatarTicking) {
        window.requestAnimationFrame(() => {
          updateTeamAvatarGlide();
          isAvatarTicking = false;
        });
        isAvatarTicking = true;
      }
    }

    window.addEventListener('scroll', onAvatarScroll, { passive: true });
    window.addEventListener('resize', onAvatarScroll, { passive: true });
    
    // Initial run
    setTimeout(updateTeamAvatarGlide, 100);
  }

  // ---------------------------------------------------------------------------
  // 18. Interactive Dynamic Card Spotlight Mouse Tracker
  // ---------------------------------------------------------------------------
  const spotlightCards = document.querySelectorAll('.card-spotlight, .product-card-elevated, .quick-access-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--spotlight-x', `${x}px`);
      card.style.setProperty('--spotlight-y', `${y}px`);
    });
  });

  // ---------------------------------------------------------------------------
  // 19. Interactive Product Feature Matrix Switcher (Products Page)
  // ---------------------------------------------------------------------------
  const productFeatureTabBtns = document.querySelectorAll('.product-feature-tab-btn');
  const productFeaturePanels = document.querySelectorAll('.product-feature-panel');

  if (productFeatureTabBtns.length > 0) {
    productFeatureTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        productFeatureTabBtns.forEach(b => {
          b.classList.remove('active', 'bg-gradient-to-r', 'from-cyan-600', 'to-blue-600', 'text-white', 'shadow-md');
          b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-200');
        });

        btn.classList.add('active', 'bg-gradient-to-r', 'from-cyan-600', 'to-blue-600', 'text-white', 'shadow-md');
        btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

        productFeaturePanels.forEach(panel => {
          if (panel.getAttribute('data-tab-content') === targetTab) {
            panel.classList.remove('hidden');
            panel.classList.add('animate-card-pop-in');
          } else {
            panel.classList.add('hidden');
            panel.classList.remove('animate-card-pop-in');
          }
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 20. Dynamic Product Modal Manager
  // ---------------------------------------------------------------------------
  const productDataMap = {
    'ai-erp': {
      badge: 'Flagship Enterprise ERP',
      title: 'Nayel AI-ERP Suite',
      desc: 'Complete all-in-one Enterprise Resource Planning suite unifying double-entry accounting, multi-warehouse inventory, automated payroll, AI financial forecasting, and multi-tax ledgers.',
      highlights: [
        'Automated Double-entry GAAP Ledger & Financial Reports (P&L, Balance Sheet)',
        'Barcode Scan Warehouse & Multi-Location Stock Transfer Engine',
        'Biometric Attendance Machine Integration & Auto Tax Deductions',
        'Customer Relationship Management (CRM) & Purchase Order Workflow',
        'Executive Real-Time Business Intelligence & AI Cash Flow Forecasting'
      ]
    },
    'academy': {
      badge: 'EdTech & Institute Portal',
      title: 'Nayel Academy LMS',
      desc: 'High-performance Learning Management System and College/School automation portal handling 15,000+ active concurrent learners with automated exam engines and fee management.',
      highlights: [
        'Live Video Classrooms with Screen Share & Whiteboard Integration',
        'Auto-Grading Quiz Engine with Randomized Question Banks',
        'Bank-Integrated Student Fee Voucher Generation & Digital Invoicing',
        'Parent Portal with WhatsApp & SMS Automated Attendance Alerts',
        'Cross-Platform Mobile Apps for iOS and Android with Offline Sync'
      ]
    },
    'hospital': {
      badge: 'HealthTech & Hospital HMS',
      title: 'Nayel Hospital HMS Suite',
      desc: 'Comprehensive Electronic Health Record (EHR) and clinical administration suite for clinics, specialized centers, and multi-bed hospital facilities.',
      highlights: [
        'Complete Electronic Medical Records (EMR) with Historical Prescription Audit',
        'Emergency OPD/IPD Bed Allotment & Nursing Station Console',
        'Automated Pharmacy Inventory with Batch Expiry & Re-Order Triggers',
        'Diagnostic Laboratory Equipment DICOM/HL7 Interface Sync',
        'Medical Insurance Claim Settlement & Multi-Doctor Commission Split'
      ]
    },
    'budget': {
      badge: 'FinTech & Capex Intelligence',
      title: 'Quantum Budgeting Suite',
      desc: 'Enterprise financial planning, expense allocation, and multi-tier variance forecasting designed for multinational conglomerates and holding companies.',
      highlights: [
        'Departmental & Project Cost Center Hierarchical Allocation',
        'Automated Multi-Tier Approval Matrix with Email & Mobile Notifications',
        'Real-Time Planned vs Actual Budget Variance Alerts',
        'Multi-Currency Exchange Rate Hedging & Cash Flow Modeling',
        'SOC2 & ISO 27001 Audit Trail Compliance Reporting'
      ]
    },
    'shopit': {
      badge: 'Global E-Commerce',
      title: 'Shopit Multi-Vendor Marketplace',
      desc: 'Full-featured enterprise marketplace platform supporting thousands of merchants, inventory tracking, and global payment gateways.',
      highlights: [
        'Merchant Multi-Vendor Dashboard with Automatic Payout Splits',
        'Stripe, PayPal, Apple Pay & Regional Gateway Integrations',
        'Real-Time Live Order Tracking & Logistics Webhook Bridges',
        'AI Product Recommendation Engine & Abandoned Cart Recovery',
        'Progressive Web App (PWA) with Push Notification System'
      ]
    },
    'pos': {
      badge: 'Retail & Quick Service POS',
      title: 'Nayel Smart POS Suite',
      desc: 'High-speed retail barcode billing, touch-screen restaurant kitchen display system, and offline-first cloud synchronization.',
      highlights: [
        'Ultra-Fast Sub-Second Barcode Scanning & Thermal Receipt Printing',
        'Offline Billing Engine with Auto-Sync when Internet Restores',
        'Kitchen Display System (KDS) & Table Order Tablet Integration',
        'Multi-Branch Consolidated Daily Cash Register Reconciliation',
        'Customer Loyalty Points & Digital SMS Invoice Delivery'
      ]
    }
  };

  const productModal = document.getElementById('productModal');
  const productModalBackdrop = document.getElementById('productModalBackdrop');
  const closeProductModalBtn = document.getElementById('closeProductModalBtn');
  const modalProductBadge = document.getElementById('modalProductBadge');
  const modalProductTitle = document.getElementById('modalProductTitle');
  const modalProductDesc = document.getElementById('modalProductDesc');
  const modalProductHighlights = document.getElementById('modalProductHighlights');

  function openProductModal(key) {
    const data = productDataMap[key] || productDataMap['ai-erp'];
    if (modalProductBadge) modalProductBadge.textContent = data.badge;
    if (modalProductTitle) modalProductTitle.textContent = data.title;
    if (modalProductDesc) modalProductDesc.textContent = data.desc;

    if (modalProductHighlights) {
      modalProductHighlights.innerHTML = data.highlights.map(h => `
        <li class="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100">
          <i class="fa-solid fa-circle-check text-cyan-600 mt-0.5 text-sm"></i>
          <span class="font-medium text-slate-800">${h}</span>
        </li>
      `).join('');
    }

    if (productModal) {
      productModal.classList.remove('hidden');
      productModal.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    }
  }

  function closeProductModal() {
    if (productModal) {
      productModal.classList.add('hidden');
      productModal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }
  }

  document.querySelectorAll('.open-product-modal').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const productKey = trigger.getAttribute('data-product') || 'ai-erp';
      openProductModal(productKey);
    });
  });

  if (closeProductModalBtn) {
    closeProductModalBtn.addEventListener('click', closeProductModal);
  }
  if (productModalBackdrop) {
    productModalBackdrop.addEventListener('click', closeProductModal);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal && !productModal.classList.contains('hidden')) {
      closeProductModal();
    }
  });

  // ---------------------------------------------------------------------------
  // 21. Dynamic Interactive Background UI Effect (Neural Particle Canvas & Spotlight)
  // ---------------------------------------------------------------------------
  function initDynamicBackgroundEffect() {
    // 1. Create or bind Global Cursor Spotlight
    let spotlight = document.getElementById('globalCursorSpotlight');
    if (!spotlight) {
      spotlight = document.createElement('div');
      spotlight.id = 'globalCursorSpotlight';
      document.body.appendChild(spotlight);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isMouseActive = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      isMouseActive = false;
    });

    // 2. Create or bind Background Canvas
    let canvas = document.getElementById('bgParticleCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'bgParticleCanvas';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ultra-Lightweight Ambient Floating Particles (Zero CPU/GPU Overhead)
    const colors = ['rgba(6, 182, 212,', 'rgba(99, 102, 241,', 'rgba(124, 58, 237,'];
    const particleCount = window.innerWidth < 768 ? 8 : 14;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 1;
        this.baseAlpha = Math.random() * 0.3 + 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.baseAlpha})`;
        ctx.fill();
      }
    }

    let particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });

    // 60FPS Lightweight Render Loop
    function render() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Update spotlight position with soft easing
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        if (spotlight) {
          spotlight.style.transform = `translate3d(${currentX.toFixed(0)}px, ${currentY.toFixed(0)}px, 0) translate(-50%, -50%)`;
        }

        // Draw soft ambient particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
      }

      requestAnimationFrame(render);
    }

    render();
  }

  // ---------------------------------------------------------------------------
  // 22. Cinematic 3D Page Depth Transition Engine ("Peeche Se Chal Ke Aaye")
  // ---------------------------------------------------------------------------
  function initCinematicPageTransitions() {
    let wipe = document.getElementById('pageTransitionWipe');
    if (!wipe) {
      wipe = document.createElement('div');
      wipe.id = 'pageTransitionWipe';
      document.body.appendChild(wipe);
    }

    let aura = document.getElementById('pageDepthAura');
    if (!aura) {
      aura = document.createElement('div');
      aura.id = 'pageDepthAura';
      document.body.appendChild(aura);
    }

    document.body.classList.add('page-entering');
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.body.classList.remove('page-entering');
        document.body.classList.add('page-entered');
      }, 30);
    });

    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('#') ||
        href.startsWith('javascript:') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('https://wa.me') ||
        link.getAttribute('target') === '_blank' ||
        link.getAttribute('download') ||
        e.ctrlKey || e.metaKey || e.shiftKey
      ) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      let targetUrl;
      try {
        targetUrl = new URL(href, window.location.href);
      } catch (err) {
        return;
      }

      if (
        (targetUrl.origin === currentUrl.origin || !href.includes('://')) &&
        (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search)
      ) {
        e.preventDefault();
        wipe.classList.add('active');
        document.body.classList.remove('page-entered');
        document.body.classList.add('page-exiting');

        setTimeout(() => {
          window.location.href = href;
        }, 240);
      }
    });

    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        wipe.classList.remove('active');
        document.body.classList.remove('page-exiting');
        document.body.classList.add('page-entered');
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 23. Native Hardware-Accelerated Smooth Anchor Navigation (Zero Lag & 100% Fluid)
  // ---------------------------------------------------------------------------
  function initSmoothAnchorNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 24. Gallery Category Filter & Interactive Lightbox Modal Viewer
  // ---------------------------------------------------------------------------
  function initGalleryInteractions() {
    const filterButtons = document.querySelectorAll('[data-gallery-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item-wrapper');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightboxBtn = document.getElementById('closeLightboxBtn');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.getAttribute('data-gallery-filter');

          filterButtons.forEach(btn => {
            btn.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md', 'shadow-cyan-500/25');
            btn.classList.add('bg-transparent', 'text-slate-600', 'hover:text-cyan-600', 'hover:bg-slate-50');
          });

          button.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-600', 'text-white', 'shadow-md', 'shadow-cyan-500/25');
          button.classList.remove('bg-transparent', 'text-slate-600', 'hover:text-cyan-600', 'hover:bg-slate-50');

          galleryItems.forEach(item => {
            const cat = item.getAttribute('data-gallery-cat');
            if (filter === 'all' || cat === filter) {
              item.style.display = 'flex';
              item.style.opacity = '0';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transition = 'opacity 0.35s ease';
              }, 20);
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }

    // Lightbox Modal Handling
    document.querySelectorAll('.open-lightbox-btn').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = trigger.getAttribute('data-src') || (trigger.querySelector('img') && trigger.querySelector('img').getAttribute('src'));
        const caption = trigger.getAttribute('data-caption') || 'Project Showcase Preview';

        if (lightboxModal && lightboxImage && src) {
          lightboxImage.src = src;
          if (lightboxCaption) lightboxCaption.textContent = caption;
          lightboxModal.classList.remove('hidden');
          lightboxModal.classList.add('flex');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      if (!lightboxModal) return;
      lightboxModal.classList.add('hidden');
      lightboxModal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    if (closeLightboxBtn) {
      closeLightboxBtn.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
          closeLightbox();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
          closeLightbox();
        }
      });
    }
  }

  // Initialize Gallery interactions
  initGalleryInteractions();

  // Initialize Smooth Anchor Navigation
  initSmoothAnchorNavigation();

  // Initialize Page Transitions
  initCinematicPageTransitions();

  // Initialize Dynamic Background
  initDynamicBackgroundEffect();
});

