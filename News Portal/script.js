const API_KEY = "2b884160186249c5a9a8c5752f683236";
const url = "https://newsapi.org/v2/everything?q=";

// Fetch data function with error handling
async function fetchData(query) {
    try {
        showLoadingSpinner();
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data); // Log API response
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        hideLoadingSpinner();
    }
}

// Initial fetch to render news
fetchData("all").then(data => {
    if (data && data.articles && data.articles.length > 0) {
        renderMain(data.articles);
    } else {
        document.querySelector("main").innerHTML = "<p>No news articles found.</p>";
    }
});

// Show loading spinner
function showLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "block";
}

// Hide loading spinner
function hideLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "none";
}

// Render news articles
function renderMain(articles) {
    let mainHTML = '';
    articles.forEach(article => {
        if (article.urlToImage) {
            mainHTML += `
                <div class="card">
                    <a href="${article.url}" target="_blank" rel="noopener noreferrer">
                        <img src="${article.urlToImage}" loading="lazy" alt="News Image"/>
                        <h4>${article.title}</h4>
                        <div class="publishbyDate">
                            <p>${article.source.name}</p>
                            <span>•</span>
                            <p>${new Date(article.publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                           ${article.description}
                        </div>
                    </a>
                </div>
            `;
        }
    });
    document.querySelector("main").innerHTML = mainHTML;
}

// Search form for desktop and mobile
const searchFormDesktop = document.getElementById("searchForm");
const searchFormMobile = document.getElementById("searchFormMobile");
const searchInputDesktop = document.getElementById("searchInput");
const searchInputMobile = document.getElementById("searchInputMobile");

searchFormDesktop.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInputDesktop.value.trim();
    if (query) {
        const data = await fetchData(query);
        if (data && data.articles && data.articles.length > 0) {
            renderMain(data.articles);
        } else {
            document.querySelector("main").innerHTML = "<p>No news articles found.</p>";
        }
    }
});

searchFormMobile.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = searchInputMobile.value.trim();
    if (query) {
        const data = await fetchData(query);
        if (data && data.articles && data.articles.length > 0) {
            renderMain(data.articles);
        } else {
            document.querySelector("main").innerHTML = "<p>No news articles found.</p>";
        }
    }
});

// Function to search and render articles based on query
async function search(query) {
    const data = await fetchData(query);
    if (data && data.articles && data.articles.length > 0) {
        renderMain(data.articles);
    } else {
        document.querySelector("main").innerHTML = "<p>No news articles found.</p>";
    }
}

// Search button event listeners
const searchIconDesktop = document.getElementById("searchIconDesktop");
const searchIconMobile = document.getElementById("searchIconMobile");

searchIconDesktop.addEventListener("click", () => {
    const query = searchInputDesktop.value.trim();
    if (query) {
        search(query);
    }
});

searchIconMobile.addEventListener("click", () => {
    const query = searchInputMobile.value.trim();
    if (query) {
        search(query);
    }
});
