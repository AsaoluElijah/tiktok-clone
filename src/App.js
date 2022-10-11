import { createClient } from "pexels";
import { useState, useEffect } from "react";

import BottomNav from "./components/BottomNav";
import VideoCard from "./components/VideoCard";

function App() {
  const [videos, setvideos] = useState([]);
  const [videosLoaded, setvideosLoaded] = useState(false);

  const randomQuery = () => {
    const queries = ["Food", "Random", "Business", "Travel"];
    return queries[Math.floor(Math.random() * queries.length)];
  };

  const getVideos = (length) => {
    const client = createClient("YOUR_PEXELS_API_KEY");

    const query = randomQuery();
    client.videos
      .search({ query, per_page: length })
      .then((result) => {
        setvideos((oldVideos) => [...oldVideos, ...result.videos]);
        setvideosLoaded(true);
      })
      .catch((e) => setvideosLoaded(false));
  };
  useEffect(() => {
    getVideos(3);
  }, []);

  return (
    <main>
      <div className="slider-container">
        {videosLoaded && videos.length > 0 ? (
          <>
            {videos.map((video, id) => (
              <VideoCard
                key={id}
                index={id}
                author={video.user.name}
                videoURL={video.video_files[0].link}
                authorLink={video.user.url}
                lastVideoIndex={videos.length - 1}
                getVideos={getVideos}
              />
            ))}
          </>
        ) : (
          <>Loading...</>
        )}
      </div>

      <BottomNav />
    </main>
  );
}

export default App;
