import React from "react";
import Cookies from "js-cookie";

class CookieManager extends React.Component {
  constructor(props) {
    super(props);
    const cookieSetting = Cookies.get("Simpl1f1ed.com-cookieSetting");
    this.state = {
      allowed: cookieSetting ? true : false,
    };
  }

  componentDidMount() {
    const cookieSetting = Cookies.get("Simpl1f1ed.com-cookieSetting");
    if (cookieSetting === "true") {
      this.setState({ allowed: true });
    }
  }

  setCookie(name, value, options = {}) {
    if (this.state.allowed) {
      Cookies.set(name, value, options);
    }
  }

  setCookiePrime(name, value, options = {}) {
    Cookies.set(name, value, options);
  }

  removeCookiePrime(name) {
    Cookies.remove(name);
  }

  removeCookie(name, options = {}) {
    if (this.state.allowed) {
      Cookies.remove(name, options);
    }
  }

  getCookie(name) {
    if (this.state.allowed) {
      return Cookies.get(name);
    }
    return null;
  }

  render() {
    // Render the child components that need to use the cookie manager
    return this.props.children({
      setCookie: this.setCookie.bind(this),
      setCookiePrime: this.setCookiePrime(this),
      removeCookiePrime: this.removeCookiePrime(this),
      removeCookie: this.removeCookie.bind(this),
      getCookie: this.getCookie.bind(this),
    });
  }
}

export default CookieManager;
