// For Jquery $('button').on('click')
var formEl = document.querySelector("#search-form");
var resultsEl = document.querySelector("#results-container");
var inputEl = document.querySelector('[name=search]');
formEl.addEventListener('submit', function(event){
    event.preventDefault();
    resultsEl.textContent="Working? " + inputEl.value;
});

