const container = document.getElementById("repo-container");

if (container) {

    fetch("https://api.github.com/users/meno-cv/repos")
        .then(response => response.json())
        .then(repos => {

            repos.slice(0, 6).forEach(repo => {

                container.innerHTML += `

                <div class="col-lg-4">

                    <div class="repo-card">

                        <h4>${repo.name}</h4>

                        <p>${repo.description ?? "..."}</p>

                        <a href="${repo.html_url}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="btn project-btn">

                           View Repository

                        </a>

                    </div>

                </div>

                `;

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