export interface NavLink {
  name: string;
  link: boolean;
  destination: string;
}

export const navLinks: NavLink[] = [
  { name: "Projects", link: true, destination: "/Projects" },
];

export interface Project {
  name: string;
  status: string;
  description: string;
  timespan?: string;
  githubLink?: string;
  technologies?: Array<string>;
  dateCreated?: number; // Unix Milli Format
}

export const projects: Project[] = [
  {
    name: "OpenIntel",
    status: "current",
    description:
      "A tool for all the Sherlock Holmes wannabes out there who want to get the inside scoop on everyone and everything. With this software, you'll have access to all the Open Source Intelligence (OSINT) gathering tools. Who knows what secrets you'll uncover? Probably nothing too exciting, but still worth a try.",
    timespan: "",
    githubLink: "",
    technologies: ["JS", "HTML", "React", "Firebase", "SASS"],
    dateCreated: 1681418904000,
  },
  {
    name: "Simpl1f1ed.com",
    status: "current",
    description:
      "This is where I show off my mad front-end skills and create fancy themes that work so seamlessly with each other that even the best professional illusionists would be jealous. It's also where I store my top-secret stash of sloth memes.",
    timespan: "Constant",
    githubLink: "https://github.com/MScheiterle/Simpl1f1ed.com",
    technologies: ["JS", "HTML", "CSS", "SASS", "TS", "Firebase", "React"],
    dateCreated: 1681418904000,
  },
  {
    name: "Capstone Project",
    status: "finished",
    description:
      "This project was an exercise in perseverance in the face of difficulty. Despite struggling with technical aspects and encountering difficulties with teammates who were unable or unwilling to help, I remained determined and committed to seeing the project through to the end. In the end, I completed the project on my own and was proud to have done it better and faster than most of the other teams.",
    timespan: "3 weeks",
    githubLink: "https://github.com/MScheiterle/Capstone-Project",
    technologies: ["Python", "Flask", "CSS", "HTML", "JS"],
    dateCreated: 1680810698303,
  },
  {
    name: "SwiftSolve",
    status: "planned",
    description:
      "This project is like a personal trainer for your brain. It will test your math and reading skills in a fun and challenging way, just like how working out with a personal trainer is both fun and challenging, except without the sweating.",
    timespan: "",
    githubLink: "",
    technologies: ["JS", "HTML", "React", "Firebase", "SASS"],
    dateCreated: 1680810698303,
  },
  {
    name: "ImageComb",
    status: "planned",
    description:
      "A website that encrypts and tags images to make them easily searchable and shareable.",
    timespan: "",
    githubLink: "",
    technologies: ["JS", "HTML", "React", "Firebase", "SASS"],
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
