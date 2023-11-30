export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}
export function getLocalStorage(key) {
    const localStorageData = localStorage.getItem(key);
  
    return localStorageData != null ? JSON.parse(localStorageData) : [];
}
export function setLocalStorage(key, data) {
    const localStorageItems = getLocalStorage(key);
  
    const itemIndex = localStorageItems.findIndex((item) => item.product.Id === data.Id);
  
    if(itemIndex !== -1) {
      localStorage.setItem(key, JSON.stringify(
        localStorageItems.map((item, index) => index === itemIndex ? {
          ...item,
          quantity: item.quantity + 1
        } : item)));
    } else {
      localStorage.setItem(key, JSON.stringify([
        ...localStorageItems,
        {
          product: data,
          quantity: 1
        }
      ]))
    }
  
}
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}
async function loadTemplate(path){
  const html = await fetch(path);
  const template = await html.text();
  return template;
}
export async function loadHeaderFooter(){
    const headerTemplate = await loadTemplate("./html/header.html");
    const headerElement = document.querySelector("#header");
    const footerTemplate = await loadTemplate("./html/footer.html");
    const footerElement = document.querySelector("#footer");
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
  }


