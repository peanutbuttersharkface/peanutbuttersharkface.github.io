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


