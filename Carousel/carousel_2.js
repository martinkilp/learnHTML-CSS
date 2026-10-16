

const carousel = document.querySelector('.carousel');
const track = document.querySelector('.track');
const originalGroup = document.querySelector('.group');

let groupWidth = 0;
let position = 0;
let speed = 0.05;
let lastTime = 0;


function createGroups() {

    // Eemalda kõik vanad kloonid
    track.querySelectorAll('.group.clone').forEach(group => {
        group.remove();
    });

    // Mõõdame originaalgrupi laiuse
    groupWidth = originalGroup.getBoundingClientRect().width;

    // Mitu gruppi on vaja carousel'i täitmiseks?
    const requiredGroups = Math.ceil(
        carousel.clientWidth / groupWidth
    ) + 2;

    // Loome vajalikud koopiad
    for (let i = 0; i < requiredGroups; i++) {

        const clone = originalGroup.cloneNode(true);

        clone.classList.add('clone');
        clone.setAttribute('aria-hidden', 'true');

        track.appendChild(clone);
    }

    // Nullime asukoha
    position = 0;
    track.style.transform = `translateX(0px)`;
}


function animate(time) {

    if (!lastTime) {
        lastTime = time;
    }

    const delta = time - lastTime;
    lastTime = time;

    // Liiguta vasakule
    position -= speed * delta;

    // Kui esimene grupp on täielikult kadunud,
    // tõsta see visuaalselt uuesti lõppu.
    if (Math.abs(position) >= groupWidth) {
        position += groupWidth;
    }

    track.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(animate);
}


createGroups();

window.addEventListener('resize', () => {
    createGroups();
    lastTime = 0;
});

requestAnimationFrame(animate);