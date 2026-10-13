function substituirTexto(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        const regex = /Raphael\s+(?:Guimaraes\s+|Guimarães\s+)?Torres/gi;
        if (regex.test(node.nodeValue)) {
            node.nodeValue = node.nodeValue.replace(regex, 'Raphael 𝗧𝗢𝗥𝗥𝗘𝗦');
        }
    } else {
        // Ignora elementos de script para nao quebrar a pagina
        if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE' && node.nodeName !== 'TEXTAREA' && node.nodeName !== 'INPUT') {
            for (const child of node.childNodes) {
                substituirTexto(child);
            }
        }
    }
}

// Executa na pagina inicial carregada
substituirTexto(document.body);

// Monitora alteraaoes dinamicas na pagina (conteudo carregado via AJAX/scroll infinito)
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const addedNode of mutation.addedNodes) {
            substituirTexto(addedNode);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});