'use strict';
const MenuBtn = document.getElementById('js-menubtn');
const Nav = document.querySelector('.nav');
const NavLinks = document.querySelectorAll('.nav__link');

MenuBtn.addEventListener('click', () => {
      
    MenuBtn.classList.toggle('active');
    Nav.classList.toggle('active');
    const isActive = Nav.classList.contains('active');
    
    NavItems.forEach(item => {
        item.setAttribute('tabindex', isActive ? '0' : '-1');
    });
});
// ハンバーガーメニュー

NavLinks.forEach(link =>{
    // クリックした情報を保存
    link.addEventListener('click', ()=>{
   localStorage.setItem('activeLink',link.getAttribute('href'));
  });
});

const ActiveLink = localStorage.getItem('activeLink');
if(ActiveLink){
 NavLinks.forEach(link =>{
    if(link.getAttribute('href') === ActiveLink){
        link.classList.add('active__link');
    }
 })
}
