const dot = document.getElementById('cursor-dot');
const outline = document.getElementById('cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 242, 254, 0.25)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 65; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

const words = ["Machine Learning Engineer", "LLM & GenAI Explorer", "Computer Vision Specialist", "MLOps & Backend Developer"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.querySelector('.typing-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 90);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.querySelector('.typing-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            typingEffect();
            return false;
        }
        timer = setTimeout(loopDeleting, 40);
    };
    loopDeleting();
}

typingEffect();

const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('term-output');

if (termInput) {
    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputVal = termInput.value.trim().toLowerCase();
            termInput.value = '';

            let response = '';
            if (inputVal === 'about') {
                response = '<p class="term-response">Mahek Bajpai | CSE-AIML Student @ AKTU Lucknow. Focused on Deep Learning, LLMs & MLOps.</p>';
            } else if (inputVal === 'skills') {
                response = '<p class="term-response">Top Stack: Python, PyTorch, TensorFlow, OpenCV, Docker, FastAPI, SQL, Scikit-learn.</p>';
            } else if (inputVal === 'certs') {
                response = '<p class="term-response">Certifications: freeCodeCamp ML, Oracle AI Associate, AWS ML Ready, IBM Python DS, Unstop DSA.</p>';
            } else if (inputVal === 'contact') {
                response = '<p class="term-response">LinkedIn: connections 500+ | Location: Lucknow, India</p>';
            } else if (inputVal === 'clear') {
                termOutput.innerHTML = '';
                return;
            } else {
                response = `<p class="term-response" style="color:#ef4444">Command not recognized: '${inputVal}'. Type 'help'.</p>`;
            }

            termOutput.innerHTML += `<p class="term-line"><span class="term-prompt">user@guest:~$</span> ${inputVal}</p>` + response;
            document.getElementById('term-body').scrollTop = document.getElementById('term-body').scrollHeight;
        }
    });
}

const bioTags = document.querySelectorAll('.bio-clickable-tag');
bioTags.forEach(tag => {
    tag.addEventListener('click', () => {
        bioTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const targetId = tag.getAttribute('data-target');
        document.querySelectorAll('.bio-content-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
    });
});

const tabBtns = document.querySelectorAll('.tab-btn');
const skillCards = document.querySelectorAll('.skill-matrix-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const tab = btn.getAttribute('data-tab');
        skillCards.forEach(card => {
            if (tab === 'all' || card.getAttribute('data-category') === tab) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 120;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
reveal();

function openCertModal(title, issuer, date, credId) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalIssuer').innerText = issuer;
    document.getElementById('modalDate').innerText = date;
    document.getElementById('modalID').innerText = credId;
    document.getElementById('certModal').style.display = 'block';
}

function closeCertModal() {
    document.getElementById('certModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('certModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
