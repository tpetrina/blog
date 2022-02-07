function today() {
  const date = new Date();

  const m =
    date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const d = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  return `${date.getFullYear()}-${m}-${d}`;
}

module.exports = function (plop) {
  plop.setGenerator("til", {
    description: "Create a TIL file",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Title please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "data/til/{{date}}-{{dashCase name}}.md",
        templateFile: "plop-templates/til.hbs",
        data: {
          date: today(),
          name: "override here",
        },
      },
    ],
  });

  plop.setGenerator("post", {
    description: "Create a blog post file",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Title please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "data/posts/{{date}}-{{dashCase name}}.md",
        templateFile: "plop-templates/post.hbs",
        data: {
          date: today(),
          name: "override here",
        },
      },
    ],
  });
};
