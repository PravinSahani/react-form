import React, { useState } from "react";

function Form() {
    const intialValues = { name: "", email: "", gender: "male", phoneNumber: "", password: "", allError: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [userName, setUserName] =  useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        let emailVal = formValues.email;
        const arr = emailVal.split("@");
        setUserName(arr[0]);

    }

    function validate(values) {
        const errors = {};
        // let alphanumeric = new RegExp("(^[A-Za-z0-9? ,_-]+$)");

        const lowerCase = new RegExp('(?=.*[a-z])');
        const upperCase = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const specialChar = new RegExp('(?=.*?[#?!@$%^&*-])');

        if (!values.name) {
            errors.allError = "All fields are mandatory";
            errors.name = "Name Error";
        }
        else if (!values.email) {
            errors.allError = "All fields are mandatory";
            errors.email = "Email Error";
        }
        else if (!values.gender) {
            errors.allError = "All fields are mandatory";
        }
        else if (!values.phoneNumber) {
            errors.allError = "All fields are mandatory";
            errors.phoneNumber = "Phone Number Error";
        }
        else if (!values.password) {
            errors.allError = "All fields are mandatory";
            errors.password = "Password Error";
        }

        else if (!lowerCase.test(values.name) || !upperCase.test(values.name) || !number.test(values.name) || !specialChar.test(values.name)) {
            errors.name = "Name is not alphanumeric";
        }

        else if (!specialChar.test(values.email)) {
            errors.email = "Email must contain @";
        }

        else if (values.gender === "Select Gender") {
            errors.gender = "Please identify as male, female or other";
        }
        else if (!number.test(values.phoneNumber)) {
            errors.phoneNumber = "Phone Number must contain only numbers";
        }

        else if (values.password.length < 6) {
            errors.password = "Password must contain atleast 6 letters";
        }

        return errors;
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        {
                            Object.keys(formErrors).length === 0 && isSubmit ?(
                                <div>Hello {userName}</div>
                            ):("")
                        }
                    </div>
                    <label for="name">Name
                        <input type="text" name="name" data-testid='name' value={formValues.name} onChange={handleChange} />
                    </label>
                </div>
                <p>{formErrors.name}</p>

                <div>
                    <label for="name">Email
                        <input type="text" name="email" data-testid='email' value={formValues.email} onChange={handleChange} />
                    </label>
                </div>
                <p>{formErrors.email}</p>

                <div>
                    <label for="name">Gender
                        <select data-testid='gender' name="gender" value={formValues.gender} onChange={handleChange}>
                            <option data-testid='gender' value="Select Gender">Select Gender</option>
                            <option data-testid='gender' value="male" selected >Male</option>
                            <option data-testid='gender' value="female">Female</option>
                            <option data-testid='gender' value="other">Other</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label for="name">Phone Number
                        <input type="text" name="phoneNumber" data-testid='phoneNumber' value={formValues.phoneNumber} onChange={handleChange} />
                    </label>
                </div>
                <p>{formErrors.phoneNumber}</p>

                <div>
                    <label for="name">Password
                        <input type="password" name="password" data-testid='password' value={formValues.password} onChange={handleChange} />
                    </label>
                </div>
                <p>{formErrors.password}</p>



                <p>{formErrors.allError}</p>

                <div>
                    <input type="submit" value="submit" data-testid='submit' />
                </div>
            </form>

        </div>
    )
}

export default Form;