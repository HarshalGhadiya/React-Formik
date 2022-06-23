import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Reactcaptch = () => {
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  return (
    <div>
      <ReCAPTCHA sitekey="6Lf7NskbAAAAALEbzuQ6Hv_sfQYVMyX4z38uobpQ" onChange={onChange} />,
    </div>
  );
};
export default Reactcaptch;
