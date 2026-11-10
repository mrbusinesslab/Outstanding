'use strict';
const projects = document.querySelector('#projects');
const dialog = document.querySelector('#project-dialog');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const cases = window.OUTSTANDING_CASES;
function renderProjects(filter = 'all') {
 const selected = cases.filter(p => filter === 'all' || p.category === filter);
 projects.innerHTML = selected.map(p => `<button class="project" data-id="${p.id}" aria-label="查看${p.title}案例"><div class="project-image"><img src="assets/${p.image}.webp" alt="${p.title}實際案場" loading="lazy" width="900" height="680"><span class="project-type">${p.type}</span><span class="project-arrow" aria-hidden="true">↗</span></div><div class="project-meta"><div><p>${p.location}</p><h3>${p.title}</h3></div><span>${p.year} /</span></div></button>`).join('');
}
renderProjects();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
 document.querySelectorAll('[data-filter]').forEach(b => {b.classList.toggle('active',b === button);b.setAttribute('aria-pressed',String(b === button));});
 renderProjects(button.dataset.filter);
}));
projects.addEventListener('click', event => {
 const button = event.target.closest('[data-id]'); if (!button) return;
 const p = cases.find(p => p.id === button.dataset.id);
 document.querySelector('#dialog-content').innerHTML = `<div class="dialog-heading"><p class="eyebrow">${p.type} / ${p.location}</p><h2 id="dialog-title">${p.title}</h2><p>${p.description}</p><dl><div><dt>施作／合作內容</dt><dd>${p.scope}</dd></div><div><dt>一起完成的夥伴</dt><dd>${p.credit}</dd></div></dl></div><div class="dialog-gallery">${p.images.map((image,i)=>`<img src="assets/${image}.webp" alt="${p.title}案場照片 ${i+1}" width="1000" height="750">`).join('')}</div><a class="button" href="https://line.me/R/ti/p/~newjacktw" target="_blank" rel="noopener noreferrer">討論類似的空間需求 ↗</a>`;
 dialog.showModal(); dialog.scrollTop=0; document.body.classList.add('modal-open');
});
function closeProject(){dialog.close();}
document.querySelector('.dialog-close').addEventListener('click',closeProject);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeProject();}});
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'關閉選單':'開啟選單');nav.classList.toggle('open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','開啟選單');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}});
document.querySelector('#copy-line').addEventListener('click',async()=>{
 const button=document.querySelector('#copy-line');
 try{await navigator.clipboard.writeText('newjacktw');button.querySelector('span').textContent='已複製 ✓';document.querySelector('#copy-status').textContent='已複製 LINE ID：newjacktw';}
 catch{button.querySelector('span').textContent='長按 ID 複製';document.querySelector('#copy-status').textContent='請選取 newjacktw 後複製。';}
});
document.querySelector('#year').textContent=new Date().getFullYear();
