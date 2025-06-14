import "./VideoProductAd.css";

function VideoProductAd({ videoUrl, title, description, ctaUrl }) {
  return (
    <section className="video-product-ad">
      <h3 className="video-product-ad-title">{title}</h3>
      <div className="video-product-ad-player">
        <video controls width="100%" poster="">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="video-product-ad-desc">{description}</p>
      {ctaUrl && (
        <a href={ctaUrl} className="video-product-ad-cta" target="_blank" rel="noopener noreferrer">
          View Product
        </a>
      )}
    </section>
  );
}

export default VideoProductAd;