export const pages = [{ name: "Projects" }];

export const projects = [
  {
    name: "Website",
    status: "finished",
    description:
      "This allowed me a platform to display the projects I've done over my time coding. I hope to improve this project by changing the design to allow for a more dynamic and interactive experiance. Rating 6 becuase I gave up on some cool features due to performance issues that I couldn't figure out. Will change this someday but not today.",
    timespan: "3 Weeks",
    rating: "6/10",
    githubLink: "https://github.com/MScheiterle/Simpl1f1ed.com",
  },
  {
    name: "Capstone Project",
    status: "finished",
    description:
      "This project was meant to be for 3 people and take 6 weeks, my classmates chose to not do anything so I did it alone in half the time since they decided to tell me late they weren't going to participate. This is a basic CRUD app that allows a user to create tasks and publish them for others to see. The rating of 3/10 is from the harsh colors and bad design choices. The functionality was all there but it was build on python Flask. Proud I got it done though.",
    timespan: "3 weeks",
    rating: "3/10",
    githubLink: "https://github.com/MScheiterle/Capstone-Project",
  },
  {
    name: "Open Intel",
    status: "current",
    description:
      "This software will allow access to all Open Source Intelligence (OSINT) gathering tools. I hope this becomes something that people can use more than the other white pages copy sites that have fake information. This will be difficult though...",
    timespan: "",
    rating: "",
    githubLink: "",
  },
  {
    name: "Image Comb",
    status: "planned",
    description:
      "This is planned as an image encryption and tagging website. The hope is to have public and easy access to free images with accurate tagging and search.",
    timespan: "",
    rating: "",
    githubLink: "",
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
