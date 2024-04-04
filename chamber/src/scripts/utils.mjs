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
    try {
        //const navTemplate = await loadHeaderFooter("./public/navigation.html");
        //const navElement = document.querySelector("#navA");
        const headerTemplate = await loadTemplate("/header.html");
        const headerElement = document.querySelector("#header");
        const footerTemplate = await loadTemplate("/footer.html");
        const footerElement = document.querySelector("#footerA");
    
        //renderWithTemplate(navTemplate, navElement);
        renderWithTemplate(headerTemplate, headerElement);
        renderWithTemplate(footerTemplate, footerElement);
    } catch(error) {
         console.error('Error loading header and footer:', error);

    }
}