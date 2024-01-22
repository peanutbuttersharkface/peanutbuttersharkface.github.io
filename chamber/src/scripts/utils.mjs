async function loadTemplate(path){
    const html = await fetch(path);
    const template = await html.text();
    return template;
}

export async function loadHeaderFooter(){
    const navTemplate = await loadHeaderFooter("./HTML/navigation.html");
    const navElement = document.querySelector("#navA");
    const headerTemplate = await loadTemplate("./HTML/header.html");
    const headerElement = document.querySelector("#header");
    const footerTemplate = await loadTemplate("./HTML/footer.html");
    const footerElement = document.querySelector("#footerA");
    renderWithTemplate(navTemplate, navElement);
    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
}