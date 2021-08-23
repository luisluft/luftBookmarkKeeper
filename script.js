const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");
const bookmarkContainer = document.getElementById("bookmarks-container");

function showModal() {
  modal.classList.add("show-modal");
  websiteName.focus();
}

function storeBookmark(event) {
  event.preventDefault();
  const nameValue = websiteName.value;
  let urlValue = websiteUrl.value;
  if (!urlValue.includes("http://") && !urlValue.includes("https://")) urlvalue = `https://${urlValue}`;
  if (!validateForm(nameValue, urlValue)) return false;
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
