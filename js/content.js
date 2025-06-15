const projectCards = document.querySelectorAll('.project-card'), projectsPerPage = 3;
let currentPage = 1;

function showProjects(page) {
    const startIndex = 3 * (page - 1), endIndex = startIndex + 3;
    projectCards.forEach((card, index) => {
        card.style.display = 'block',
        card.style.opacity = '0',
        card.style.transform = 'translateY(30px)',
        index >= startIndex && index < endIndex ?
            (card.style.display = 'block',
                setTimeout(() => {
                    card.style.opacity = '1',
                    card.style.transform = 'translateY(0)';
                }, index % 3 * 100))
            : card.style.display = 'none';
    })}

const observerOptions = {'threshold': 0.2, 'rootMargin': '0px 0px -100px 0px'},
    projectObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            entry.isIntersecting &&
            (entry.target.classList.contains('projects-container') &&
            !document.querySelector('.pagination .active') && showProjects(currentPage),
            observer.unobserve(entry.target));
        });
    }, observerOptions),
    projectsContainer = document.querySelector('.projects-container');

projectsContainer && projectObserver.observe(projectsContainer),
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('img');
        img && (img.style.transform = 'scale(1.05)');
    }),
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('img');
        img && (img.style.transform = 'scale(1)');
    });
});

const projectBtns = document.querySelectorAll('.project-btn');
projectBtns.forEach(btn => {
    btn.addEventListener('click', event => {
        if ('#' === btn.getAttribute('href')) {
            event.preventDefault();
            const card = btn.closest('.project-card'),
                description = card.querySelector('.project-description');
            description && description.classList.add('show');
        }
    });
});

const closeButtons = document.querySelectorAll('.close-description');

function startFSASlideshow() {
    const fsaImg = document.querySelector('.project-card img[alt="FSA"]');
    if (!fsaImg) return;
    const images = ['/public/assets/projects/project2-0.webp', '/public/assets/projects/project2-1.webp', '/public/assets/projects/project2-2.webp'];
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length,
        fsaImg.style.opacity = '0',
        setTimeout(() => {
            fsaImg.src = images[currentIndex],
            fsaImg.style.opacity = '1';
        }, 100);
    }, 10000);
}

function animateWebsiteButtons() {
    const websiteBtns = document.querySelectorAll('.website-btn'),
        websitesSection = document.querySelector('.websites-section');
    if (!websiteBtns.length || !websitesSection) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.isIntersecting &&
            (websiteBtns.forEach((btn, index) => {
                setTimeout(() => {
                    btn.style.opacity = '1',
                    btn.style.transform = 'translateY(0)';
                }, 150 * index);
            }),
            observer.unobserve(entry.target));
        });
    }, { 'threshold': 0.2 });
    observer.observe(websitesSection),
    websiteBtns.forEach(btn => {
        btn.style.opacity = '0',
        btn.style.transform = 'translateY(30px)',
        btn.style.transition = 'all 0.6s ease';
    });
}

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const description = btn.closest('.project-description');
        description.classList.remove('show');
    });
}),

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.webkitUserDrag = 'none',
    document.body.style.userSelect = 'none',
    document.body.style.MozUserSelect = 'none',
    document.addEventListener('keydown', event => {
        if ((event.ctrlKey || event.metaKey) && ('c' === event.key || 'C' === event.key))
            return event.preventDefault(), false;
    }),
    startFSASlideshow(),
    animateWebsiteButtons();
}),

document.addEventListener('DOMContentLoaded', function () {
    const skills = [
        { 'name': 'Python', 'level': 4, 'description': 'A simple and powerful programming language used for various applications, including web development and data science.' },
        { 'name': 'Java', 'level': 4, 'description': 'A powerful, object-oriented programming language known for its portability, security, and versatility in building applications across platforms.' },
        { 'name': 'HTML/CSS', 'level': 5, 'description': 'HTML structures content, while CSS styles and designs it to create visually appealing web pages.' },
        { 'name': 'JavaScript', 'level': 3, 'description': 'A dynamic, versatile programming language used to create interactive web pages and enhance user experiences.' },
        { 'name': 'SQL', 'level': 3, 'description': 'A powerful database language used to store, retrieve, and manage structured data efficiently.' },
        { 'name': 'MongoDB', 'level': 4, 'description': 'A flexible, document-oriented database designed for scalable, high-performance applications that handle large volumes of unstructured data.' },
        { 'name': 'Git', 'level': 5, 'description': 'A distributed version control system that helps track changes in code, collaborate efficiently, and manage project history.' },
        { 'name': 'GitHub', 'level': 5, 'description': 'A platform for code hosting and collaboration that simplifies version control and enables seamless teamwork on software projects.' }
    ],
        skillsContainer = document.querySelector('.skills-container');
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        const skillHeader = document.createElement('div');
        skillHeader.className = 'skill-header';
        const skillName = document.createElement('div');
        skillName.className = 'skill-name',
        skillName.textContent = skill.name;
        const skillLevel = document.createElement('div');
        skillLevel.className = 'skill-level';
        for (let i = 1; i <= 5; i++) {
            const dot = document.createElement('div');
            dot.className = i <= skill.level ? 'dot filled' : 'dot',
            skillLevel.appendChild(dot);
        }
        const skillInfo = document.createElement('div');
        skillInfo.className = 'skill-info',
        skillInfo.textContent = skill.description,
        skillHeader.appendChild(skillName),
        skillHeader.appendChild(skillLevel),
        skillCard.appendChild(skillHeader),
        skillCard.appendChild(skillInfo),
        skillsContainer.appendChild(skillCard);
    });
})

