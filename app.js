const preview = document.querySelector("#meme-preview");
const previewTopText = preview.querySelector("p.top");
const previewbotText = preview.querySelector("p.bot");
const previewImg = preview.querySelector("img");

const form = document.querySelector("#meme-form");

const formList = form.querySelector("#meme-form-list");
let formListImg;
let selectedImg;

function setImgFirst() {
  formListImg = formList.querySelectorAll("img");
  for (img of formListImg) {
    img.classList.remove("selected");
  }
  selectedImg = formListImg[0].getAttribute("src");
  formListImg[0].classList.add("selected");
  previewImg.setAttribute("src", selectedImg);
}
setImgFirst();

formList.addEventListener("click", function(e) {
  for (img of formListImg) {
    img.classList.remove("selected");
  }
  e.target.classList.add("selected");
  selectedImg = e.target.getAttribute("src");
  previewImg.setAttribute("src", selectedImg);
});

const formImgGroup = form.querySelector(".image-add");
const formImgInput = formImgGroup.querySelector("input");
const formImgAdd = formImgGroup.querySelector("button.add");
formImgAdd.addEventListener("click", function(e) {
  e.preventDefault();
  const image = document.createElement("img");
  image.setAttribute("src", formImgInput.value);
  formList.prepend(image);
  formImgInput.value = "";
  setImgFirst();
});

const fromTopTextGroup = form.querySelector(".top-text-group");
const formTopText = form.querySelector("#top-text");
const formTopCol = form.querySelector("#top-col");
const formTopPx = form.querySelector("#top-px");
fromTopTextGroup.addEventListener("input", function(e) {
  if (e.target.id === "top-text") previewTopText.innerText = formTopText.value;
  if (e.target.id === "top-col") previewTopText.style.color = formTopCol.value;
  if (e.target.id === "top-px")
    previewTopText.style.fontSize = `${formTopPx.value}px`;
});

const fromBotTextGroup = form.querySelector(".bot-text-group");
const formBotText = form.querySelector("#bot-text");
const formBotCol = form.querySelector("#bot-col");
const formBotPx = form.querySelector("#bot-px");
fromBotTextGroup.addEventListener("input", function(e) {
  if (e.target.id === "bot-text") previewbotText.innerText = formBotText.value;
  if (e.target.id === "bot-col") previewbotText.style.color = formBotCol.value;
  if (e.target.id === "bot-px")
    previewbotText.style.fontSize = `${formBotPx.value}px`;
});

function setVals() {
  previewTopText.innerText =
    formTopText.value || formTopText.getAttribute("placeHolder");
  previewTopText.style.color = formTopCol.value;
  previewTopText.style.fontSize = `${formTopPx.value}px`;
  previewbotText.innerText =
    formBotText.value || formBotText.getAttribute("placeHolder");
  previewbotText.style.color = formBotCol.value;
  previewbotText.style.fontSize = `${formBotPx.value}px`;
}
setVals();

const memeStorage = document.querySelector("#meme-storage-list");

const formSave = form.querySelector(".save");
formSave.addEventListener("click", function(e) {
  e.preventDefault();
  let memeObj = {
    img: selectedImg,
    topText: formTopText.value || formTopText.getAttribute("placeHolder"),
    topCol: formTopCol.value,
    topPx: formTopPx.value,
    botText: formBotText.value || formBotText.getAttribute("placeHolder"),
    botCol: formBotCol.value,
    botPx: formBotPx.value
  };
  console.log(memeObj);
  const meme = document.createElement("div");
  meme.classList.add("meme");
  meme.innerHTML = `<p class="top" style="color:${memeObj.topCol}; font-size: ${memeObj.topPx}px;" >${memeObj.topText}</p>
  <img src=${memeObj.img} />
  <p class="bot" style="color:${memeObj.botCol}; font-size: ${memeObj.botPx}px;">${memeObj.botText}</p>`;
  memeStorage.append(meme);
});
