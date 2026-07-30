import SEO from "../components/ui/SEO";
import PageHero from "../components/ui/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import GamesArcade from "../components/games/GamesArcade";
import GamesPlayedCarousel from "../components/ui/GamesPlayedCarousel";
import GenreRadar from "../components/ui/GenreRadar";
import MediaRow from "../components/ui/MediaRow";
import Doodles from "../components/ui/Doodles";
import { gamesPlayed, webSeries, movies, anime } from "../data/entertainment";

export default function Entertainment() {
  return (
    <>
      <SEO title="Entertainment" description="Free browser mini-games, favorite games played, and top picks in web series, movies, and anime." />
      <PageHero
        eyebrow="Entertainment"
        title="Games, shows, and everything I unwind with"
        subtitle="Playable mini-games built right into this site, a log of what I've been playing, and my top picks in film & TV."
        theme="gaming"
      />

      <section className="py-14 px-5 md:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow="Play now" title="Take a break — play something right here" align="center" />
          <GamesArcade />
        </div>
      </section>

      <section className="relative overflow-hidden py-16 px-5 md:px-8">
        <Doodles theme="gaming" />
        <div className="relative mx-auto max-w-6xl">
          <SectionTitle eyebrow="Recently played" title="Games I've actually sunk hours into" />
          <GamesPlayedCarousel games={gamesPlayed} />
        </div>
      </section>

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Top picks · Web Series" title="Shows I'd recommend without hesitation" subtitle="Ratings pulled from IMDb — click any poster to open its IMDb page." />
          <MediaRow items={webSeries} />
        </div>
      </section>

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Top picks · Movies" title="Films on permanent rewatch rotation" />
          <MediaRow items={movies} />
        </div>
      </section>

      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle eyebrow="Top picks · Anime" title="Anime that pulled me in completely" />
          <MediaRow items={anime} />
        </div>
      </section>

      <section className="py-16 px-5 md:px-8 pb-28">
        <div className="mx-auto max-w-4xl">
          <SectionTitle eyebrow="Genre radar" title="What I actually gravitate toward" align="center" />
          <GenreRadar items={[...webSeries, ...movies, ...anime]} />
        </div>
      </section>
    </>
  );
}
