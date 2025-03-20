
// Add header
let header = document.createElement('header');
let center = document.createElement('center');
let nav = document.createElement('nav');

let links = [
    { url: './', text: 'Home' },
    { url: './contact', text: 'Contact' },
    { url: 'https://esdras-cavalcanti.vercel.app', text: 'Resumo' },
    { url: './snake', text: 'Snake' },
]

let ul = document.createElement('ul')
links.forEach(link => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = link.url;
    a.innerText = link.text;
    if (a.host != window.location.host) {
        a.target = '_blank';
    }
    li.appendChild(a);
    ul.appendChild(li);
});

nav.appendChild(ul);
center.appendChild(nav);
header.appendChild(center);
document.body.prepend(header);

// Change select

let path = window.location.pathname;

let a_tags = document.querySelectorAll('a');

a_tags.forEach(link => {
    console.log(link.getAttribute('href'));
    console.log(path);
    if (path.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});