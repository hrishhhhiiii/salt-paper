// Restaurant contact - change here and it updates every link that uses it
const RESTAURANT_PHONE = '+918961727684';
const RESTAURANT_WHATSAPP = '918961727684';

// Salt & Pepper - Belghoria Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCategory = 'all';
  let searchQuery = '';
  let vegOnlyFilter = false;
  let tray = [];

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const menuContainer = document.getElementById('menuListGrid');
  const searchInput = document.getElementById('menuSearchInput');
  const catTabs = document.querySelectorAll('.cat-tab-btn');
  const dietFilterPills = document.querySelectorAll('.diet-filter-pill');
  
  // Tray DOM Elements
  const trayBtn = document.getElementById('trayBtn');
  const trayOverlay = document.getElementById('trayOverlay');
  const trayDrawer = document.getElementById('trayDrawer');
  const closeTrayBtn = document.getElementById('closeTrayBtn');
  const trayItemsContainer = document.getElementById('trayItemsContainer');
  const trayTotalAmount = document.getElementById('trayTotalAmount');
  const trayCountBadge = document.getElementById('trayCountBadge');
  const toastNotice = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMsg');
  const reservationForm = document.getElementById('reservationForm');

  // Sticky Navbar Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // Render Reviews
  const reviewsContainer = document.getElementById('reviewsContainer');
  if (reviewsContainer && typeof REVIEWS_DATA !== 'undefined') {
    reviewsContainer.innerHTML = REVIEWS_DATA.map(rev => `
      <div class="review-card">
        <div class="review-stars">${'★'.repeat(rev.rating)}</div>
        <p class="review-quote">"${rev.text}"</p>
        <div class="review-author">
          <div class="author-avatar">&#9733;</div>
          <div class="author-details">
            <h6>${rev.name}</h6>
            <p>${rev.role}${rev.dish ? ` • <span style="color:var(--primary);">${rev.dish}</span>` : ''}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Menu Items
  function renderMenu() {
    if (!menuContainer || typeof MENU_DATA === 'undefined') return;

    let filtered = MENU_DATA.filter(item => {
      const matchesCat = currentCategory === 'all' || item.category === currentCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet = !vegOnlyFilter || item.isVeg;
      return matchesCat && matchesSearch && matchesDiet;
    });

    if (filtered.length === 0) {
      menuContainer.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <i style="font-size: 2.2rem; display: block; margin-bottom: 12px; color: var(--primary);">🍽️</i>
          <h4>No delicious dishes matched your search.</h4>
          <p style="font-size: 0.9rem; margin-top: 6px;">Try adjusting your keywords or category filters!</p>
        </div>
      `;
      return;
    }

    menuContainer.innerHTML = filtered.map(item => `
      <div class="menu-item-row" data-id="${item.id}">
        <div class="menu-item-thumb">
          <img src="${item.image}" alt="${item.name}" width="800" height="597" loading="lazy" decoding="async">
        </div>
        <div class="menu-item-info">
          <div class="item-header">
            <h4 class="item-name">${item.name}</h4>
            <span class="item-diet-dot ${item.isVeg ? 'diet-dot-veg' : 'diet-dot-nonveg'}" title="${item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}"></span>
          </div>
          <p class="item-desc-text">${item.description}</p>
          <div class="item-bottom-bar">
            <div class="item-price"><span>₹</span>${item.price}</div>
            <button class="btn-add-tray" onclick="addToTray('${item.id}')">
              <span>+</span> Add to Tray
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Category Filtering
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderMenu();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderMenu();
    });
  }

  // Diet Filter Toggle
  dietFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      vegOnlyFilter = !vegOnlyFilter;
      pill.classList.toggle('active', vegOnlyFilter);
      renderMenu();
    });
  });

  // Tray Logic
  window.addToTray = function(itemId) {
    const item = MENU_DATA.find(i => i.id === itemId);
    if (!item) return;

    const existing = tray.find(i => i.id === itemId);
    if (existing) {
      existing.qty += 1;
    } else {
      tray.push({ ...item, qty: 1 });
    }
    updateTrayUI();
    showToast(`Added "${item.name}" to your estimated tray!`);
  };

  window.changeQty = function(itemId, delta) {
    const item = tray.find(i => i.id === itemId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      tray = tray.filter(i => i.id !== itemId);
    }
    updateTrayUI();
  };

  function updateTrayUI() {
    const totalCount = tray.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = tray.reduce((sum, i) => sum + (i.price * i.qty), 0);

    if (trayCountBadge) {
      trayCountBadge.textContent = totalCount;
    }
    if (trayTotalAmount) {
      trayTotalAmount.textContent = `₹${totalPrice}`;
    }

    if (!trayItemsContainer) return;

    if (tray.length === 0) {
      trayItemsContainer.innerHTML = `
        <div class="tray-empty-state">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">🍽️</div>
          <p>Your estimation tray is empty.</p>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Click "+ Add to Tray" on any dish to plan your feast!</p>
        </div>
      `;
    } else {
      trayItemsContainer.innerHTML = tray.map(item => `
        <div class="tray-item-card">
          <div class="tray-item-left">
            <h5>${item.name}</h5>
            <p>₹${item.price} × ${item.qty} = <strong>₹${item.price * item.qty}</strong></p>
          </div>
          <div class="tray-qty-ctrls">
            <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
            <span style="font-weight: 700; min-width: 18px; text-align: center;">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Tray Drawer Open/Close
  function openTray() {
    if (trayOverlay && trayDrawer) {
      trayOverlay.classList.add('active');
      trayDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeTray() {
    if (trayOverlay && trayDrawer) {
      trayOverlay.classList.remove('active');
      trayDrawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (trayBtn) trayBtn.addEventListener('click', openTray);
  if (closeTrayBtn) closeTrayBtn.addEventListener('click', closeTray);
  if (trayOverlay) trayOverlay.addEventListener('click', closeTray);

  // Toast Functionality
  function showToast(message) {
    if (!toastNotice || !toastMsg) return;
    toastMsg.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3200);
  }

  // Reservation Form Handling
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('resName').value.trim();
      const phone = document.getElementById('resPhone').value.trim();
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('resGuests').value;

      const occasion = (document.getElementById('resOccasion') || {}).value || '';

      if (!name || !phone || !date || !time) {
        alert('Please fill out all required reservation fields.');
        return;
      }

      // The form previously showed "Reservation confirmed" and sent the booking
      // NOWHERE - no email, no API, no message. Guests believed they had a table.
      // It now hands the request to WhatsApp so it actually reaches the restaurant,
      // and the wording makes clear it is a REQUEST awaiting confirmation.
      const lines = [
        'New table request from the website',
        '',
        'Name: ' + name,
        'Phone: ' + phone,
        'Date: ' + date,
        'Time: ' + time,
        'Guests: ' + guests
      ];
      if (occasion) lines.push('Request: ' + occasion);

      // %0A is an encoded newline - built this way so the URL needs no escapes
      var waUrl = 'https://wa.me/' + RESTAURANT_WHATSAPP + '?text=' +
                  lines.map(encodeURIComponent).join('%0A');
      window.open(waUrl, '_blank', 'noopener');

      showToast('Opening WhatsApp so you can send your request. We will confirm by phone.');
      reservationForm.reset();
    });
  }

  // Initial render
  renderMenu();
  updateTrayUI();
});
