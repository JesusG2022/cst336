document.querySelector("form").addEventListener("submit", validateAuthorForm);

function validateAuthorForm(event) {
    // Prevent form submission

    let first_name = document.querySelector("#first_name").value;
    if (first_name.length < 2) {
        alert("Please enter a first name");
        event.preventDefault();
    }

    let last_name = document.querySelector("#last_name").value;
    if (last_name.length < 0) {
        alert("Please enter a last name");
        event.preventDefault();
        return;
    }

    let birth_date = document.querySelector("#birth_date").value;
    if (birth_date.length === 0) {
        alert("Please enter a birth date");
        event.preventDefault();
        return;
    }

    let sex = document.querySelector("input[name='sex']:checked")?.value;
    if (!sex) {
        alert("Please select a gender")
        event.preventDefault();;
        return;
    }

    let pro = document.querySelector("#pro").value;
    if (pro.length < 2) {
        alert("Please enter a profession");
        event.preventDefault();
        return;
    }

    let country = document.querySelector("#country").value;
    if (country.length < 2) {
        alert("Please enter a country");
        event.preventDefault();
        return;
    }

    let pic = document.querySelector("#pic").value;
    if (pic.length <= 8) {
        alert("Please enter a picture URL");
        event.preventDefault();
        return;
    }

    let bio = document.querySelector("#bio").value;
    if (bio.length <= 10) {
        alert("Please enter a biography");
        event.preventDefault();
        return;
    }

    event.target.submit(); // Submit the form if all validations pass
}

