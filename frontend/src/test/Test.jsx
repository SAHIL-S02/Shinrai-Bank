import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

function Form() {
  const [captcha, setCaptcha] = useState(null);
  const [verified, setVerified] = useState(false);

  const handleCaptcha = (token) => {
    setCaptcha(token);
    setVerified(true); // TEMP: assume valid
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!verified) {
      alert("Please complete CAPTCHA");
      return;
    }

    // TEMP submission logic
    console.log("Form submitted with token:", captcha);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <ReCAPTCHA
        sitekey="YOUR_SITE_KEY"
        onChange={handleCaptcha}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;