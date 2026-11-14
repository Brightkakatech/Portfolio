import { useState } from "react";
import { useJsonData } from "../hooks/useJsonData";
import DataStatus from "../components/DataStatus";

// The site's base address – keeps image paths working after deployment
const base = import.meta.env.BASE_URL;

/**
 * Photo grid with a large view, read from data/gallery.json. Clicking a
 * thumbnail stores that photo in state, which opens the large view;
 * closing it sets the state back to null.
 */
function PictureGallery() {
  // Remembers which photo is open in the large view (null = none)
  const [selected, setSelected] = useState(null);

  const { data: gallery, error } = useJsonData("gallery");
  if (!gallery) return <DataStatus error={error} />;

  return (
    <section>
      <h1>Pictures Gallery</h1>
      <p className="page-intro">
        Moments from my studies, work and life. Click a photo to enlarge it.
      </p>

      {/* Grid of thumbnails */}
      <div className="gallery-grid">
        {gallery.map((photo) => (
          <button
            className="gallery-item"
            key={photo.file}
            onClick={() => setSelected(photo)}
          >
            <img
              src={`${base}images/gallery/${photo.file}`}
              alt={photo.caption}
              loading="lazy"
            />
            <span className="gallery-caption">{photo.caption}</span>
          </button>
        ))}
      </div>

      {/* Large view – only shown when a photo has been selected */}
      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <button
            className="lightbox-close"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={`${base}images/gallery/${selected.file}`}
            alt={selected.caption}
          />
          <p>{selected.caption}</p>
        </div>
      )}
    </section>
  );
}

export default PictureGallery;
