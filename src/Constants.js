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

export const errorParser = (err, fields) => {
  const availableFields = ["email", "name", "password"];

  let erroredFields = [];

  availableFields.forEach((value) => {
    if (err.includes(value)) {
      erroredFields.push(value);
    }
  });

  Array.from(fields).forEach((value) => {
    if (erroredFields.includes(value.id)) {
      value.parentElement.classList.add("errored");
    }
  });
};
