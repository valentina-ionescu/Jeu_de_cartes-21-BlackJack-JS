(() => {

    let elForms = document.querySelectorAll('[data-js-form]');

    for (let i = 0, l = elForms.length; i < l; i++) {
        new Board(elForms[i]);
    }
    
})();