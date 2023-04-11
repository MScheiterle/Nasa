export interface NavLink {
  name: string;
  link: boolean;
  destination: string;
}

export const navLinks: NavLink[] = [
  { name: "Projects", link: true, destination: "/Projects" },
  { name: "Tutorials", link: true, destination: "/Tutorials/home" },
  { name: "Tools", link: true, destination: "/Tools/home" },
];

export interface Tool {
  name: string;
  dateCreated: number; // Unix Mili Format
}

export const tools: Tool[] = [
  {
    name: "test",
    dateCreated: 1680881739000,
  },
];

export interface Tutorial {
  name: string;
  dateCreated: number; // Unix Mili Format
}

export const tutorials: Tutorial[] = [];

export interface Project {
  name: string;
  status: string;
  description: string;
  timespan?: string;
  rating?: string;
  githubLink?: string;
  technologies?: Array<String>;
  dateCreated: number; // Unix Mili Format
}

export const projects: Project[] = [
  {
    name: "Website",
    status: "finished",
    description:
      "Constantly working here to improve my front end design skill, adding themes and creating a dynamic content loading scheme to ensure that all themes work seamlessly with each other. This allows me a platform to display my talent and projects. Aswell as, make projects with a sophisticated back end using Firebase.",
    timespan: "Constant",
    rating: "6/10",
    githubLink: "https://github.com/MScheiterle/Simpl1f1ed.com",
    technologies: [
      "JS",
      "HTML",
      "CSS",
      "SASS",
      "TS",
      "FireBase",
      "React",
    ],
    dateCreated: 1680810698303,
  },
  {
    name: "Capstone Project",
    status: "finished",
    description:
      "This project was meant to be for 3 people and take 6 weeks, my classmates chose to not do anything so I did it alone in half the time since they decided to tell me late they weren't going to participate. This is a basic CRUD app that allows a user to create tasks and publish them for others to see. The rating of 3/10 is from the harsh colors and bad design choices. The functionality was all there but it was build on python Flask. Proud I got it done though.",
    timespan: "3 weeks",
    rating: "3/10",
    githubLink: "https://github.com/MScheiterle/Capstone-Project",
    technologies: ["Python", "Flask", "CSS", "HTML", "JS"],
    dateCreated: 1680810698303,
  },
  {
    name: "QuickMaths",
    status: "current",
    description:
      "This will be the foundation for a competative and practice math website, testing how fast people can do all forms of math problems. It will be hosted on this website until it is fully finished and in demand.",
    timespan: "",
    rating: "",
    githubLink: "",
    technologies: ["JS", "HTML", "CSS"],
    dateCreated: 1680810698303,
  },
  {
    name: "Open Intel",
    status: "planned",
    description:
      "This software will allow access to all Open Source Intelligence (OSINT) gathering tools. I hope this becomes something that people can use more than the other white pages copy sites that have fake information. This will be difficult though...",
    timespan: "",
    rating: "",
    githubLink: "",
    technologies: ["JS", "HTML", "CSS"],
    dateCreated: 1680810698303,
  },
  {
    name: "Image Comb",
    status: "planned",
    description:
      "This is planned as an image encryption and tagging website. The hope is to have public and easy access to free images with accurate tagging and search.",
    timespan: "",
    rating: "",
    githubLink: "",
    technologies: ["JS", "HTML", "CSS"],
    dateCreated: 1680810698303,
  },
];

export const validateEmail = (email: string): boolean => {
  return (
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]M(\.[^<>()[\]\\.,;:\s@"]M)*)|(".M"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]M\.)M[a-zA-Z]{2,}))$/
    ) !== null
  );
};

export const validateMediumPassword = (password: string): boolean => {
  return (
    password.match(/^(?=.[0-9])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{7,}$/) !== null
  );
};

export const validateUsername = (username: string): boolean => {
  return username.match(/^([A-Za-z0-9]|-._){4,20}$/) !== null;
};
