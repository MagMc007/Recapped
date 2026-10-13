'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import type { MediaItem, RecapSource } from '@/types/media';
import { rateMovie } from '@/features/movies/api';

interface MovieDetailViewProps {
  movie: MediaItem;
}

export const MovieDetailView: React.FC<MovieDetailViewProps> = ({ movie }) => {
  const router = useRouter();

  const fallbackSource: RecapSource = {
    id: 'default',
    youtubeVideoId: '',
    channelName: 'Recapped Library',
    channelAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=recapped',
    channelUrl: 'https://www.youtube.com',
    channelSubscribers: ' Recap',
    recapTitle: `${movie.title} Story Breakdown`,
    recapDuration: 'Recap',
    recapStyle: 'Plot Recap',
    viewsCount: '',
    uploadDate: String(movie.year),
    summaryHighlight: 'Complete narrative breakdown and ending explanation.',
  };

  const initialSource = movie.recapSources && movie.recapSources.length > 0
    ? movie.recapSources[0]
    : fallbackSource;

  const [selectedSource, setSelectedSource] = useState<RecapSource>(initialSource);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [ratingMessage, setRatingMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const pathname = usePathname();
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  const stopPlayback = React.useCallback(() => {
    setIsPlaying(false);
    const iframe = iframeRef.current;
    if (iframe) {
      try {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'stopVideo', args: '' }),
          '*'
        );
      } catch {}
      try {
        iframe.src = 'about:blank';
      } catch {}
    }
  }, []);

  // 1. Teardown active playback whenever isPlaying switches to false or component unmounts
  React.useEffect(() => {
    if (!isPlaying) return;
    const currentIframe = iframeRef.current;
    return () => {
      if (currentIframe) {
        try {
          currentIframe.contentWindow?.postMessage(
            JSON.stringify({ event: 'command', func: 'stopVideo', args: '' }),
            '*'
          );
        } catch {}
        try {
          currentIframe.src = 'about:blank';
        } catch {}
      }
    };
  }, [isPlaying]);

  // 2. Stop playback whenever pathname changes
  React.useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [pathname, stopPlayback]);

  // 3. Global capture: halt playback immediately as soon as ANY navigation link or anchor is clicked
  React.useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        if (href && (href.startsWith('/') || !href.includes('://')) && !href.startsWith('#')) {
          stopPlayback();
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    window.addEventListener('popstate', stopPlayback);
    window.addEventListener('pagehide', stopPlayback);
    window.addEventListener('beforeunload', stopPlayback);

    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true });
      window.removeEventListener('popstate', stopPlayback);
      window.removeEventListener('pagehide', stopPlayback);
      window.removeEventListener('beforeunload', stopPlayback);
    };
  }, [stopPlayback]);


  const handleBack = () => {
    stopPlayback();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/movies');
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRate = async (score: number) => {
    setUserRating(score);
    setIsSubmittingRating(true);
    try {
      await rateMovie(movie.title, score, movie.type === 'series');
      setRatingMessage(`Rated ${score}/5!`);
    } catch {
      setRatingMessage(`Rated ${score}/5`);
    } finally {
      setIsSubmittingRating(false);
      setTimeout(() => setRatingMessage(null), 3500);
    }
  };

  const activeAverageRating = userRating > 0
    ? ((movie.communityRating.average * (movie.communityRating.count || 1) + userRating) / ((movie.communityRating.count || 1) + 1)).toFixed(1)
    : (movie.communityRating.average > 0 ? movie.communityRating.average.toFixed(1) : (movie.omdbRating?.imdb !== 'N/A' ? movie.omdbRating.imdb : '—'));

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* ── Sub-Nav Compact Header ── */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg2)',
          padding: '8px 16px',
          position: 'sticky',
          top: 64,
          zIndex: 40,
          backdropFilter: 'blur(16px)',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <button
            onClick={handleBack}
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '6px 12px',
              color: 'var(--text)',
              fontSize: 12,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 500,
              flexShrink: 0,
              transition: 'background var(--transition), border-color var(--transition)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            ← Back to Movies
          </button>

          <div
            className="font-bebas"
            style={{
              fontSize: 'clamp(16px, 3.5vw, 22px)',
              letterSpacing: 1.5,
              color: 'var(--text)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textAlign: 'center',
              padding: '0 8px',
            }}
          >
            {movie.title} ({movie.year})
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              onClick={handleShare}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 6,
                padding: '6px 10px',
                color: copied ? 'var(--gold)' : 'var(--muted)',
                fontSize: 12,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                transition: 'all 0.2s',
              }}
            >
              {copied ? '✓ Link Copied' : '🔗 Share'}
            </button>

            {selectedSource.youtubeVideoId && (
              <a
                href={`https://www.youtube.com/watch?v=${selectedSource.youtubeVideoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--accent)',
                  border: 'none',
                  borderRadius: 6,
                  padding: '6px 12px',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px var(--accent-glow)',
                }}
              >
                YouTube ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '16px 16px 80px' }}>
        {/* ── 1. YouTube Player Section ── */}
        <section className="fade-up" style={{ marginBottom: 16 }}>
          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 24px var(--accent-glow)',
              position: 'relative',
              background: '#000',
              maxWidth: isTheater ? '100%' : '980px',
              margin: '0 auto',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* Corner brackets */}
            {['top:0;left:0', 'top:0;right:0', 'bottom:0;left:0', 'bottom:0;right:0'].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  ...Object.fromEntries(pos.split(';').map((p) => p.split(':'))),
                  width: 16,
                  height: 16,
                  borderColor: 'var(--accent)',
                  borderStyle: 'solid',
                  borderWidth: 0,
                  ...(i === 0
                    ? { borderTopWidth: 2, borderLeftWidth: 2 }
                    : i === 1
                    ? { borderTopWidth: 2, borderRightWidth: 2 }
                    : i === 2
                    ? { borderBottomWidth: 2, borderLeftWidth: 2 }
                    : { borderBottomWidth: 2, borderRightWidth: 2 }),
                  zIndex: 10,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Top Player Status Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 14px',
                background: 'rgba(8,14,26,0.94)',
                borderBottom: '1px solid rgba(99,140,255,0.12)',
                fontSize: 12,
                color: 'var(--muted)',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                <span
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    padding: '2px 6px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  HD RECAP
                </span>
                <span
                  style={{
                    color: 'var(--text)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 12,
                  }}
                >
                  {selectedSource.recapTitle || `${movie.title} Recap`}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{ color: 'var(--accent-light)', fontFamily: 'monospace', fontWeight: 600, fontSize: 11 }}>
                  🎬 {selectedSource.channelName}
                </span>

                <button
                  type="button"
                  onClick={() => setIsTheater((t) => !t)}
                  style={{
                    background: isTheater ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
                    color: isTheater ? '#fff' : 'var(--text)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    padding: '3px 8px',
                    fontSize: 11,
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                  }}
                >
                  {isTheater ? 'Exit Theater' : '⛶ Theater'}
                </button>
              </div>
            </div>

            {/* 16:9 Video Canvas */}
            <div
              style={{
                position: 'relative',
                paddingBottom: isTheater ? '50%' : '56.25%',
                height: 0,
                background: '#000',
                overflow: 'hidden',
              }}
            >
              {!selectedSource.youtubeVideoId ? (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                    color: 'var(--muted)',
                  }}
                >
                  <div style={{ fontSize: 48 }}>🎬</div>
                  <div className="font-bebas" style={{ fontSize: 24, letterSpacing: 1.5, color: 'var(--text)' }}>
                    Recap Video Coming Soon
                  </div>
                  <div style={{ fontSize: 13 }}>
                    A video recap for this title has not been linked yet.
                  </div>
                </div>
              ) : !isPlaying ? (
                <div
                  onClick={() => setIsPlaying(true)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Background preview thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${selectedSource.youtubeVideoId}/hqdefault.jpg`}
                    alt={selectedSource.recapTitle || movie.title}
                    onError={(e) => {
                      if (movie.backdropUrl || movie.posterUrl) {
                        e.currentTarget.src = movie.backdropUrl || movie.posterUrl;
                      }
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.5)',
                      transition: 'transform 0.4s ease, filter 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.filter = 'brightness(0.65)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.filter = 'brightness(0.5)';
                    }}
                  />

                  {/* Vignette Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at center, rgba(0,0,0,0.3) 0%, rgba(7,13,26,0.85) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Play Button & Call to Action */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 14,
                      textAlign: 'center',
                      padding: '0 20px',
                    }}
                  >
                    <button
                      type="button"
                      aria-label="Play Recap Video"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(true);
                      }}
                      style={{
                        width: 76,
                        height: 76,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                        color: '#fff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 0 36px var(--accent-glow), 0 8px 30px rgba(0,0,0,0.7)',
                        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      <span style={{ fontSize: 28, marginLeft: 4, lineHeight: 1 }}>▶</span>
                    </button>

                    <div>
                      <div
                        className="font-bebas"
                        style={{
                          fontSize: 'clamp(22px, 4.5vw, 32px)',
                          letterSpacing: 2,
                          color: '#fff',
                          textShadow: '0 2px 12px rgba(0,0,0,0.9)',
                          lineHeight: 1.1,
                        }}
                      >
                        Click to Play Recap Stream
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--accent-light)', marginTop: 4, fontWeight: 500 }}>
                        Narrated by <span style={{ color: '#fff', fontWeight: 600 }}>{selectedSource.channelName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  key={selectedSource.youtubeVideoId}
                  src={`https://www.youtube-nocookie.com/embed/${selectedSource.youtubeVideoId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1&color=white&playsinline=1`}
                  title={selectedSource.recapTitle || `${movie.title} Recap`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              )}

            </div>

          </div>
        </section>

        {/* ── 2. Active Narrator Switcher Strip ── */}
        {movie.recapSources && movie.recapSources.length > 0 && (
          <section className="fade-up" style={{ maxWidth: '980px', margin: '0 auto 16px' }}>
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <img
                    src={selectedSource.channelAvatar}
                    alt={selectedSource.channelName}
                    style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--accent)', flexShrink: 0 }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {selectedSource.channelName}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: 'var(--accent-light)',
                          background: 'var(--accent-glow)',
                          padding: '1px 6px',
                          borderRadius: 4,
                          fontWeight: 600,
                        }}
                      >
                        Narrator
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {selectedSource.summaryHighlight || 'Full story recap breakdown'}
                    </div>
                  </div>
                </div>

                {selectedSource.channelUrl && (
                  <a
                    href={selectedSource.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--accent)',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: 12,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: '4px 10px',
                      borderRadius: 6,
                      background: 'var(--bg2)',
                      border: '1px solid var(--border)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    Channel Page ↗
                  </a>
                )}
              </div>

              {/* If multiple sources available, show switcher tabs */}
              {movie.recapSources.length > 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    paddingTop: 8,
                    borderTop: '1px solid var(--border)',
                    overflowX: 'auto',
                  }}
                >
                  <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0 }}>
                    Switch Recap ({movie.recapSources.length}):
                  </span>
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    {movie.recapSources.map((source) => {
                      const isSelected = source.id === selectedSource.id;
                      return (
                        <button
                          key={source.id}
                          type="button"
                          onClick={() => setSelectedSource(source)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '4px 10px',
                            borderRadius: 6,
                            border: '1px solid',
                            borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                            background: isSelected ? 'var(--accent-glow)' : 'var(--bg2)',
                            color: isSelected ? 'var(--accent-light)' : 'var(--muted)',
                            cursor: 'pointer',
                            fontSize: 11,
                            fontWeight: isSelected ? 700 : 500,
                            transition: 'all 0.15s',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span>{source.channelName}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── 3. Movie Context Deck ── */}
        <section
          className="fade-up"
          style={{
            maxWidth: '980px',
            margin: '0 auto',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 160px) minmax(0, 1fr)', gap: 24 }}>
            {/* Left Column: Poster + 1-5 Star Verdict */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: 'var(--bg2)',
                  aspectRatio: '2/3',
                  width: '100%',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                }}
              >
                {movie.posterUrl ? (
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: 12,
                      fontSize: 12,
                      color: 'var(--muted)',
                    }}
                  >
                    {movie.title}
                  </div>
                )}
              </div>

              {/* 1-5 Star Interactive Rating Hub */}
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '12px 10px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 10, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>
                  Rate This Recap
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginBottom: 6 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={isSubmittingRating}
                      onClick={() => handleRate(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: isSubmittingRating ? 'wait' : 'pointer',
                        fontSize: 20,
                        padding: 0,
                        lineHeight: 1,
                        color: (hoverRating || userRating) >= star ? 'var(--gold)' : 'var(--muted)',
                        transform: (hoverRating || userRating) >= star ? 'scale(1.2)' : 'scale(1)',
                        transition: 'transform 0.15s ease, color 0.15s ease',
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600 }}>
                  ★ {activeAverageRating} 
                </div>

                {ratingMessage && (
                  <div style={{ fontSize: 10, color: 'var(--accent-light)', marginTop: 4, animation: 'fadeIn 0.2s' }}>
                    {ratingMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Title, Metadata, Specs, Synopsis */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span
                    style={{
                      background: movie.type === 'series' ? 'var(--accent2)' : 'var(--accent)',
                      color: '#fff',
                      borderRadius: 4,
                      padding: '3px 8px',
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    {movie.type === 'series' ? '📺 TV Series' : '🎬 Feature Film'}
                  </span>

                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--muted)',
                      background: 'var(--bg2)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      border: '1px solid var(--border)',
                    }}
                  >
                    📅 {movie.year}
                  </span>

                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--muted)',
                      background: 'var(--bg2)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      border: '1px solid var(--border)',
                    }}
                  >
                    🌍 {movie.country}
                  </span>

                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--accent-light)',
                      background: 'var(--accent-glow)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      border: '1px solid var(--accent)',
                      fontWeight: 700,
                    }}
                  >
                    ⚠️ {movie.spoilerLevel}
                  </span>
                </div>

                <h1
                  className="font-bebas"
                  style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    letterSpacing: 2,
                    lineHeight: 1,
                    margin: '4px 0 2px',
                    color: 'var(--text)',
                  }}
                >
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <div style={{ fontSize: 13, color: 'var(--accent-light)', fontStyle: 'italic', marginTop: 4 }}>
                    "{movie.tagline}"
                  </div>
                )}
              </div>

              {/* Genres & Production Specifications */}
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong style={{ color: 'var(--accent-light)', minWidth: 64 }}>Genres:</strong>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {movie.genres.map((g) => (
                      <span
                        key={g}
                        style={{
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: 'var(--bg3)',
                          border: '1px solid var(--border)',
                          color: 'var(--accent-light)',
                          fontSize: 11,
                          fontWeight: 500,
                        }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong style={{ color: 'var(--accent-light)', minWidth: 64 }}>Country:</strong>
                  <span style={{ color: 'var(--text)' }}>{movie.country}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong style={{ color: 'var(--accent-light)', minWidth: 64 }}>Format:</strong>
                  <span style={{ color: 'var(--text)' }}>{movie.runtime}</span>
                </div>
              </div>

              {/* Synopsis / Story Overview */}
              <div
                style={{
                  background: 'var(--bg2)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  padding: '12px 14px',
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: 'var(--muted)',
                }}
              >
                <div style={{ fontSize: 10, color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, marginBottom: 6 }}>
                  📖 Story Overview & Breakdown
                </div>
                <p style={{ margin: 0, color: 'var(--text)', opacity: 0.9 }}>
                  {movie.synopsis}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
