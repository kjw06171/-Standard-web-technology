/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 
/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 
document.addEventListener('DOMContentLoaded', function () {
  const cartIcon = document.getElementById('cart-icon');
  const mainContent = document.getElementById('main-content');
  const cartPage = document.getElementById('cart-page');
  const cartItems = document.querySelector('.cart-items');
  const cartMessage = document.getElementById('cart-message');
  const navbar = document.getElementById('mainNav');
  const backBtn = document.getElementById('back-btn');
  const logoLink = document.querySelector('.navbar-brand');
  const navbarToggler = document.querySelector('.navbar-toggler');
  
  

  // ✅ Shrink navbar
  const navbarShrink = function () {
    if (!navbar) return;
    if (window.scrollY === 0) {
      navbar.classList.remove('navbar-shrink');
    } else {
      navbar.classList.add('navbar-shrink');
    }
  };
  navbarShrink();
  document.addEventListener('scroll', navbarShrink);

  // ✅ ScrollSpy
  if (navbar) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      rootMargin: '0px 0px -40%',
    });
  }

  // ✅ Nav 링크 클릭 시 반응형 닫기 + 장바구니 아닐 때만 main 보여주기
  const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const isCart = link.id === 'cart-icon';
      if (!isCart) {
        // 메인 콘텐츠 보여주기
        mainContent.style.display = 'block';
        cartPage.style.display = 'none';
        document.body.classList.remove('cart-open');
        navbar.classList.remove('navbar-solid');
      }

      // 작은 화면에서 메뉴 접기
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

  // ✅ 로고 클릭 시 메인 복귀
  if (logoLink) {
    logoLink.addEventListener('click', function (event) {
      event.preventDefault();
      mainContent.style.display = 'block';
      cartPage.style.display = 'none';
      document.body.classList.remove('cart-open');
      navbar.classList.remove('navbar-solid');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ✅ 장바구니 버튼 클릭 시 페이지 전환
  if (cartIcon) {
    cartIcon.addEventListener('click', function () {
      mainContent.style.display = 'none';
      cartPage.style.display = 'block';
      document.body.classList.add('cart-open');
      navbar.classList.add('navbar-solid');
      window.scrollTo(0, 0);
    });
  }

  // ✅ 장바구니 추가 중복 방지
  document.querySelectorAll('.cart-icon').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest('.card');
      const title = card.dataset.title;
      const price = card.dataset.price;
      const img = card.dataset.img;
      const link = card.dataset.link || card.querySelector('a')?.href || '#'; 

      // 중복 체크
      const isAlreadyInCart = Array.from(cartItems.children).some(item =>
        item.querySelector('p')?.textContent === title
      );
      if (isAlreadyInCart) return;

      cartMessage.style.display = 'none';
      const itemHTML = `
        <div class="cart-item" style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem;">
          <img src="${img}" alt="${title}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
          <div style="flex-grow: 1;">
            <p style="font-weight: bold; margin: 0;">${title}</p>
            <p style="margin: 0;">${price}</p>
          </div>
          <a href="${link}" target="_blank">
            <img src="assets/img/website.png" alt="이동" style="width: 20px; height: 20px ;">
          </a>
          <button class="delete-btn" style="background: none; border: none; cursor: pointer;">
            <img src="assets/img/trash.png" alt="삭제" style="width: 20px; height: 20px;">
          </button>
        </div>
      `;
      cartItems.insertAdjacentHTML('beforeend', itemHTML);
    });
  });

  // ✅ 장바구니 항목 삭제
  cartItems.addEventListener('click', function (event) {
    if (event.target.closest('.delete-btn')) {
      const cartItem = event.target.closest('.cart-item');
      cartItem.remove();
      if (cartItems.children.length === 0) {
        cartMessage.style.display = 'block';
      }
    }
  });

  // ✅ 장바구니에서 뒤로가기
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      cartPage.style.display = 'none';
      mainContent.style.display = 'block';
      document.body.classList.remove('cart-open');
      navbar.classList.remove('navbar-solid');
    });
  }
});

