
function updateActiveNav() {
    let path = window.location.pathname;
    
    let links = document.querySelectorAll('a');

    links.forEach(link => {
        if (path.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function createHeader() {
    let header = document.getElementsByTagName('header')[0];
    let center = document.createElement('center');
    let nav = document.createElement('nav');

    let links = [
        { url: 'index.html', text: 'Home' },
        { url: 'contact.html', text: 'Contact' },
        { url: 'https://esdras-cavalcanti.vercel.app', text: 'Resumo' },
        { url: 'snake.html', text: 'Snake' },
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
}

window.onload = function() {
    createHeader();
    updateActiveNav();
}