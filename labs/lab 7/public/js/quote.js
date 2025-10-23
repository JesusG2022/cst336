document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", validateQuoteForm);
});

function validateQuoteForm(event) {
    const quoteInput = event.target.querySelector("#quote");
    if (quoteInput && quoteInput.value.length < 10) {
        alert("The quote must be at least 10 characters long.");
        event.preventDefault(); // Prevent form submission
    }
}