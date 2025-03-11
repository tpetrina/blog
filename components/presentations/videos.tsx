function YoutubeVideo(props: { src: string }) {
  return (
    <iframe
      className="shadow-lg"
      width="255"
      height="150"
      src={props.src}
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  );
}

const videos = [
  {
    title: "Asynchronous UX",
    url: "https://www.youtube.com/watch?v=1ASvTw0Hl7M",
    description: "React Advanced 2021",
  },
  {
    title: "Refactoring to CQRS",
    url: "https://vimeo.com/372379878",
    description: "Øredev, Malmø 2019",
  },
  {
    title: "Why is building forms in React difficult",
    url: "https://www.youtube.com/watch?v=VRdEQzAmefY",
    description: "React Copenhagen Meetup, 2019",
  },
  {
    title: "The Async Nightmare",
    url: "https://www.youtube.com/watch?v=YJ1jwbBvEfE",
    description: "WebCamp 2018, Zagreb, Croatia",
  },
  {
    title: "Immutable code in .NET",
    url: "https://www.youtube.com/watch?v=gDgppIEqdTM",
    description: "Update Conference Prague 2018",
  },
  {
    title: "Immutable code for highly mutable apps",
    url: "https://www.youtube.com/watch?v=efxWL6pKmK0",
    description: "ChangeCon 2018, Zagreb, Croatia",
  },
  {
    title: "Awesome things you can do with Roslyn",
    url: "https://www.youtube.com/watch?v=vTEIgJFUhqY",
    description: "DevWeek 2015, London, UK",
  },
];

export default function Videos() {
  return (
    <ul className="">
      {videos.map((video) => {
        if (video.url.indexOf("youtube") === -1) {
          return null;
        }

        return (
          <li className="mr-4 mb-4 w-full" key={video.url}>
            <section className="flex flex-col-reverse sm:flex-row w-full sm:space-x-4">
              <YoutubeVideo src={video.url.replace("watch?v=", "embed/")} />

              <section className="flex flex-col">
                <h4 className="text-lg leading-tight">
                  <a href={video.url}>{video.title}</a>
                </h4>

                <p className="">{video.description}</p>
              </section>
            </section>
          </li>
        );
      })}
      
      <li className="mr-4 mb-4 w-full">
        <VimeoVideoCQRS />
      </li>
    </ul>
  );
}

function VimeoVideoCQRS() {
  return (
    <section className="flex flex-col-reverse sm:flex-row w-full sm:space-x-4">
      <iframe
        src="https://player.vimeo.com/video/372379878?h=7c9b415891&color=ffffff"
        width="266"
        height="150"
        frameBorder={0}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
      <p>
        <a href="https://vimeo.com/372379878">
          Toni Petrina - Refactoring to CQRS | &Oslash;redev 2019
        </a>{" "}
        from <a href="https://vimeo.com/oredev">&Oslash;redev Conference</a> on{" "}
        <a href="https://vimeo.com">Vimeo</a>.
      </p>
    </section>
  );
}
