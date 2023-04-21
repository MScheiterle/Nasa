export interface NavLink {
  name: string;
  link: boolean;
  destination: string;
}

export const navLinks: NavLink[] = [
  { name: "Projects", link: true, destination: "/Projects" },
  { name: "SpotifyMatch", link: true, destination: "/SpotifyMatch" },
];

export interface Project {
  name: string;
  status: string;
  description: string;
  timespan?: string;
  githubLink?: string;
  technologies?: Array<string>;
  dateCreated?: number; // Unix Milli Format
  link?: string;
}

export const projects: Project[] = [
  {
    name: "Trade My Data",
    status: "current",
    description:
      "A tool for all the Sherlock Holmes wannabes out there who want to get the inside scoop on everyone and everything. With this software, you'll have access to all the Open Source Intelligence (OSINT) gathering tools. Who knows what secrets you'll uncover? Probably nothing too exciting, but still worth a try.",
    timespan: "",
    githubLink: "",
    technologies: ["JS", "HTML", "React", "Firebase", "SASS"],
    dateCreated: 1681418904000,
    link: "https://trademydata.net/",
  },
  {
    name: "Spotify Match",
    status: "current",
    description:
      "Enabling Spotify users to compare their music listening data with others can lead to a fun and insightful experience. This feature can help users discover new music, understand their own habits better, and connect with their community.",
    timespan: "",
    githubLink:
      "https://github.com/MScheiterle/Simpl1f1ed.com/tree/master/src/Components/Layout/SpotifyMatch",
    technologies: ["JS", "HTML", "React", "Firebase", "SASS"],
    dateCreated: 1681418904000,
    link: "/spotifymatch/",
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
      "This website provides users with a unique and secure way to share images online. By encrypting and tagging images with metadata, users can easily search for and discover images they may have otherwise missed. The added layer of security also ensures that the images remain protected from unauthorized access and distribution.",
    timespan: "",
    githubLink: "",
    technologies: ["JS", "HTML", "React", "Firebase", "SASS"],
    dateCreated: 1680810698303,
  },
];

export const validateEmail = (email: string): boolean => {
  return (
    email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) !== null
  );
};

export const validateMediumPassword = (password: string): boolean => {
  return (
    password.match(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&^\\]{8,}$/
    ) !== null
  );
};

export const validateUsername = (username: string): boolean => {
  return username.match(/^([A-Za-z0-9]|-._){4,20}$/) !== null;
};
