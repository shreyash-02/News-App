const API_KEY = "d8ace64f9783473991480e63aab88ca3";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles); //data hmko object k articles me milta he isliye console me check krna console.log(data) krke
}

function bindData(articles) {
  const cardContainer = document.querySelector("#card-container");
  const newsCardTemplate = document.querySelector("#template-news-card");

  cardContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return; //jis article me image ho usko mat lo bs image wale news ko card medalo
    const cardClone = newsCardTemplate.content.cloneNode(true); //isse card ka cone create hoga
    fillData(cardClone, article);
    cardContainer.appendChild(cardClone);
  });
}

//filling information on each cardclone
function fillData(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage; //all this urlToImage, title, Description are keywords present inside article array
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/jakarta",
  }); //date ko hme publishAt se uthana he pr vo alag format me present he articl k ander usko readable form me badla he yaha

  newsSource.innerHTML = `${article.source.name} 📆⏰ ${date}`; //emojis hme keyboard se add kiye he windows + . daba k

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  }); //jo b card k first element pr click hoga vo uske url ko khol deha _blank matlb new tab pr khol dega
}

//handling navbar item links
let curselectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);

  curselectedNav?.classList.remove("active"); //shurvat me to null he pr jab hamari curselectedNav null nhi he to uski current selected nav he usko remove kr do
  curselectedNav = navItem; //uske bad curselectedNav hamra cliked nav item ban jayega
  curselectedNav.classList.add("active"); //selected wala active rahega or koi or select kiya to purana wala remove ho jayega or naya wala active ho jaega
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curselectedNav?.classList.remove("active");
  curselectedNav = null;
});
