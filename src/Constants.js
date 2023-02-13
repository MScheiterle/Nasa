export const projects = [
  {
    name: "OpenIntel",
    desc: "Make intelligence more approachable for the average joe.",
  },
  {
    name: "ImageComb",
    desc: "Analyze all images on the internet and tag them allowing for easier searches.",
  },
  {
    name: "BlindDate",
    desc: "Dating without faces, allow people to meet based on attributes about the without any view of them.",
  },
  {
    name: "Website",
    desc: "This website.",
  },
];

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Not used ATM
export const validateStrongPassword = (password) => {
  return password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
  );
};

export const validateMediumPassword = (password) => {
  return password.match(
    /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/
  );
};

export const validateUsername = (username) => {
  return username.match(/^([A-Za-z0-9]|[-._](?![-._])){4,20}$/);
};
