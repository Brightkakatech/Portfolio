import videos from "../data/videos";

// The site's base address – keeps video paths working after deployment
const base = import.meta.env.BASE_URL;

function VideoGallery() {
  return (
    <section>
      <h1>Video Gallery</h1>
      <p className="page-intro">
        Moments captured on video. Press play to watch.
      </p>

      <div className="video-grid">
        {videos.map((video) => (
          <article className="video-card" key={video.file}>
            <div className="video-frame">
              <video controls preload="metadata" playsInline>
                <source src={`${base}videos/${video.file}`} type="video/mp4" />
                Your browser does not support this video.
              </video>
            </div>

            <div className="video-info">
              <h3>{video.title}</h3>
              {/* Only show a description if one is provided */}
              {video.description && <p>{video.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default VideoGallery;