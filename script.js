const container = document.getElementById("repo-container");

if (container) {

    const featuredRepos = [

        {
            name: "Portfolio",
            description:
                "Responsive personal portfolio website showcasing my projects, skills, and software engineering journey."
        },

        {
            name: "The-Golden-Grill",
            description:
                "Restaurant management system built with Java Swing, MySQL, and object-oriented programming."
        },

        {
            name: "Guess-The-Number",
            description:
                "Interactive number guessing game built with HTML, CSS, and JavaScript."
        },

        {
            name: "Salary-Information-System",
            description:
                "Java application for managing employee salary information using object-oriented programming."
        },

        {
            name: "Weather-APP",
            description:
                "Responsive weather application displaying real-time weather data using a weather API."
        },

        {
            name: "Calculator---Java-Swing-Applications",
            description:
                "Java Swing calculator demonstrating GUI development, event handling, and OOP concepts."
        }

    ];

    const repoObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    // Animate only once
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    featuredRepos.forEach((featuredRepo, index) => {

        fetch(
            `https://api.github.com/repos/meno-cv/${featuredRepo.name}`
        )

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        `${featuredRepo.name} → HTTP ${response.status}`
                    );

                }

                return response.json();

            })

            .then(repo => {

                /* Create Bootstrap column */

                const column = document.createElement("div");

                column.className =
                    "col-lg-4 col-md-6 repo-reveal";

                column.style.transitionDelay =
                    `${index * 0.1}s`;



                column.innerHTML = `

                    <article class="repo-card">

                        <div class="repo-card-header">

                            <h4>
                                ${repo.name}
                            </h4>

                            <span class="repo-language">
                                ${repo.language || "Code"}
                            </span>

                        </div>


                        <p class="repo-description">
                            ${featuredRepo.description}
                        </p>


                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn project-btn"
                        >
                            View Repository →
                        </a>

                    </article>

                `;

                container.appendChild(column);

                repoObserver.observe(column);

            })

            .catch(error => {

                console.error(
                    "GitHub Repository Error:",
                    error.message
                );

            });

    });

}




const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.2
});


reveals.forEach(element => {
    observer.observe(element);
});