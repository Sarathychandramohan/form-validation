document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("regForm");
    const modal = document.getElementById("successModal");
    const closeBtn = document.querySelector(".close-btn");

    // Close the modal when the close button is clicked
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let valid = true;

        // A generic function to validate and show/hide errors
        function validateField(inputId, errorId, regex, errorMessage) {
            const input = document.getElementById(inputId);
            const errorElement = document.getElementById(errorId);
            const value = input.value.trim();
            
            if (!value) {
                errorElement.innerText = "This field is required.";
                errorElement.style.display = "block";
                valid = false;
            } else if (regex && !regex.test(value)) {
                errorElement.innerText = errorMessage;
                errorElement.style.display = "block";
                valid = false;
            } else {
                errorElement.innerText = "";
                errorElement.style.display = "none";
            }
        }

        // Regex Patterns
        const nameRegex = /^[A-Za-z ]{2,}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@kpriet\.ac\.in$/;
        const phoneRegex = /^\d{10}$/;
        const aadharRegex = /^\d{12}$/;
        const addressRegex = /^[A-Za-z0-9\s,./-]{5,}$/;
        const pinRegex = /^[0-9]{6}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        // Field Validations
        validateField("firstName", "firstNameError", nameRegex, "Enter a valid First Name (min 2 letters).");
        validateField("lastName", "lastNameError", nameRegex, "Enter a valid Last Name (min 2 letters).");
        validateField("email", "emailError", emailRegex, "Enter a valid KPRIET email (example@kpriet.ac.in).");
        validateField("phone", "phoneError", phoneRegex, "Enter a valid 10-digit phone number.");
        validateField("aadhar", "aadharError", aadharRegex, "Enter a valid 12-digit Aadhar number.");
        validateField("addressLine1", "addressLine1Error", addressRegex, "Enter a valid Address Line 1.");
        validateField("city", "cityError", nameRegex, "Enter a valid City name.");
        validateField("state", "stateError", nameRegex, "Enter a valid State name.");
        validateField("pincode", "pincodeError", pinRegex, "Enter a valid 6-digit PIN code.");
        validateField("password", "passwordError", passwordRegex, "Password must be 8+ chars with uppercase, lowercase, digit & special char.");

        // Confirm Password
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        if (password !== confirmPassword) {
            confirmPasswordError.innerText = "Passwords do not match.";
            confirmPasswordError.style.display = "block";
            valid = false;
        } else {
            confirmPasswordError.innerText = "";
            confirmPasswordError.style.display = "none";
        }
        
        // DOB Validation
        const dobInput = document.getElementById("dob").value;
        const dobError = document.getElementById("dobError");
        if (!dobInput) {
            dobError.innerText = "Date of Birth is required.";
            dobError.style.display = "block";
            valid = false;
        } else {
            const dob = new Date(dobInput);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            if (age < 15 || age > 100) {
                dobError.innerText = "Age must be between 15 and 100.";
                dobError.style.display = "block";
                valid = false;
            } else {
                dobError.innerText = "";
                dobError.style.display = "none";
            }
        }

        // Gender Validation
        const gender = document.querySelector('input[name="gender"]:checked');
        const genderError = document.getElementById("genderError");
        if (!gender) {
            genderError.innerText = "Select gender.";
            genderError.style.display = "block";
            valid = false;
        } else {
            genderError.innerText = "";
            genderError.style.display = "none";
        }

        // Terms & Conditions
        const termsChecked = document.getElementById("terms").checked;
        const termsError = document.getElementById("termsError");
        if (!termsChecked) {
            termsError.innerText = "You must accept Terms & Conditions.";
            termsError.style.display = "block";
            valid = false;
        } else {
            termsError.innerText = "";
            termsError.style.display = "none";
        }

        // Final check
        if (valid) {
            // Show the modal pop-up
            modal.style.display = "block";
            
            // Optionally, clear the form after a successful submission
            form.reset(); 
        }
    });
});