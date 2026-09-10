let skills = [
    { name: "HTML", category: "frontend" },
    { name: "CSS", category: "frontend" },
    { name: "JavaScript", category: "frontend" },
    { name: "Flexbox", category: "css" },
    { name: "Grid", category: "css" },
    { name: "Responsive Design", category: "css" },
    { name: "DOM Manipulation", category: "js" },
    { name: "Git & GitHub", category: "tools" },
    { name: "VS Code", category: "tools" }
];

let projects = [
    {
        title: "CSS Selectors & Styling",
        description: "A webpage demonstrating CSS selectors, colors, fonts, and text alignment.",
        tags: ["HTML", "CSS"],
        category: "html-css"
    },
    {
        title: "Flexbox & Grid Layout",
        description: "Responsive layouts built with CSS Flexbox and Grid including a photo gallery and dashboard.",
        tags: ["HTML", "CSS"],
        category: "html-css"
    },
    {
        title: "JavaScript Basics",
        description: "Programs covering variables, operators, conditionals, and loops in JavaScript.",
        tags: ["JavaScript"],
        category: "javascript"
    },
    {
        title: "DOM & Events",
        description: "Interactive webpage with click, input, change, submit, and keyboard events.",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "javascript"
    },
    {
        title: "To-Do List App",
        description: "A task manager app with add, delete, done toggle, and priority levels.",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "full-project"
    },
    {
        title: "Task Management App",
        description: "Full-featured task manager with search, filter, edit, and localStorage.",
        tags: ["HTML", "CSS", "JavaScript"],
        category: "full-project"
    }
];

let skillsGrid = document.getElementById("skills-grid");
let projectsGrid = document.getElementById("projects-grid");
let filterButtons = document.getElementById("filter-buttons");
let themeToggle = document.getElementById("theme-toggle");
let menuToggle = document.getElementById("menu-toggle");
let navLinks = document.getElementById("nav-links");
let contactForm = document.getElementById("contact-form");
let formSuccess = document.getElementById("form-success");

function renderSkills() {
    skillsGrid.innerHTML = "";
    for (let i = 0; i < skills.length; i++) {
        let div = document.createElement("div");
        div.className = "skill-card";
        div.textContent = skills[i].name;
        skillsGrid.appendChild(div);
    }
}

function renderProjects(filter) {
    projectsGrid.innerHTML = "";

    let filtered = projects;
    if (filter !== "all") {
        filtered = projects.filter(function (project) {
            return project.category === filter;
        });
    }

    for (let i = 0; i < filtered.length; i++) {
        let card = document.createElement("div");
        card.className = "project-card";

        let title = document.createElement("h3");
        title.textContent = filtered[i].title;

        let desc = document.createElement("p");
        desc.textContent = filtered[i].description;

        let tagsDiv = document.createElement("div");
        for (let j = 0; j < filtered[i].tags.length; j++) {
            let tag = document.createElement("span");
            tag.className = "project-tag";
            tag.textContent = filtered[i].tags[j];
            tagsDiv.appendChild(tag);
        }

        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(tagsDiv);
        projectsGrid.appendChild(card);
    }
}

filterButtons.addEventListener("click", function (e) {
    if (e.target.classList.contains("filter-btn")) {
        let allBtns = filterButtons.querySelectorAll(".filter-btn");
        for (let i = 0; i < allBtns.length; i++) {
            allBtns[i].classList.remove("active");
        }
        e.target.classList.add("active");

        let filter = e.target.getAttribute("data-filter");
        renderProjects(filter);
    }
});

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "☀️";
    } else {
        themeToggle.textContent = "🌙";
    }
});

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");
});

navLinks.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
        navLinks.classList.remove("show");
    }
});

function validateForm() {
    let name = document.getElementById("contact-name").value.trim();
    let email = document.getElementById("contact-email").value.trim();
    let message = document.getElementById("contact-message").value.trim();
    let nameError = document.getElementById("name-error");
    let emailError = document.getElementById("email-error");
    let messageError = document.getElementById("message-error");
    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    if (name.length < 2) {
        nameError.textContent = "Name must be at least 2 characters.";
        isValid = false;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        emailError.textContent = "Please enter a valid email.";
        isValid = false;
    }

    if (message.length < 10) {
        messageError.textContent = "Message must be at least 10 characters.";
        isValid = false;
    }

    return isValid;
}

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    formSuccess.textContent = "";

    if (validateForm()) {
        formSuccess.textContent = "Message sent successfully!";
        contactForm.reset();
    }
});

renderSkills();
renderProjects("all");
