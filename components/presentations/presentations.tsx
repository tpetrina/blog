const presentations = [
  {
    title: "Async in C#",
    url: "https://presentation-async.netlify.app",
  },
  {
    title: "Refactoring to CQRS",
    url: "https://presentation-refactoringtocqrs.netlify.app/",
  },
  {
    title: "EF Core and GraphQL",
    url: "https://presentation-efcoregraphql.netlify.app/",
  },
  {
    title: "Why is building forms in React so hard",
    url: "https://reactmeetup-forms-react-2019.netlify.app/",
  },
];

export default function Presentations() {
  return (
    <ul className="list-disc ml-4">
      {presentations.map((presentation) => (
        <li key={presentation.url}>
          <a href={presentation.url}>{presentation.title}</a>
        </li>
      ))}
    </ul>
  );
}
