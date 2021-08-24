const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmarks-container");

let bookmarks = [];
let defaultBookmarks = [
  {
    name: "Custom Countdown",
    url: "https://luisluft.github.io/luftCustomCountdown/",
  },
];

function showModal() {
  modal.classList.add("show-modal");
  websiteName.focus();
}

function buildBookmarks() {
  bookmarkContainer.textContent = "";

  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;

    const item = document.createElement("div");
    item.classList.add("item");

    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-window-close");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("id", "delete-bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);

    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");

    const favicon = document.createElement("img");
    favicon.setAttribute("src", `https://www.google.com/s2/u/0/favicons?domain=${url}`);
    favicon.setAttribute("alt", "Favicon");

    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;

    // Append all the different previously created html elements
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarkContainer.appendChild(item);
  });
}

function deleteBookmark(url) {
  bookmarks.forEach((bookmark, i) => {
    if (bookmark.url === url) {
      bookmarks.splice(i, 1);
    }
  });

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

function fetchBookmarks() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    bookmarks = defaultBookmarks;
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

function storeBookmark(event) {
  event.preventDefault();
  const nameValue = websiteName.value;
  let urlValue = websiteUrl.value;
  if (!urlValue.includes("http://") && !urlValue.includes("https://")) urlvalue = `https://${urlValue}`;
  if (!validateForm(nameValue, urlValue)) return false;

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteName.focus();
}

function validateForm(nameValue, urlValue) {
  const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  if (urlValue.match(regex)) {
    alert("Successful match");
  } else {
    alert("Please provide a valid address");
    return false;
  }
  return true;
}

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"));
window.addEventListener("click", (e) => (e.target === modal ? modal.classList.remove("show-modal") : false));
bookmarkForm.addEventListener("submit", storeBookmark);

// On load
fetchBookmarks();
