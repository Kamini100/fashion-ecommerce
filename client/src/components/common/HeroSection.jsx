import heroImage from "../../assets/hero/hero-banner.jpg";

function HeroSection(){
    return(
        <section className="section relative overflow-hidden bg-gray-100">
      <div className="container grid min-h-[500px] items-center gap-10 md:grid-cols-2">

        {/* ⭐ ADDED: Hero Content */}
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pink-500">
            New Season
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            Discover Your
            <span className="block">New Style</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-gray-600">
            Explore the latest fashion trends, carefully curated
            for your everyday style.
          </p>

          {/* ⭐ ADDED: CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-md bg-pink-500 px-7 py-3 font-medium text-white transition hover:bg-pink-600">
              Shop Men
            </button>

            <button className="rounded-md border border-gray-900 px-7 py-3 font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white">
              Shop Women
            </button>
          </div>
        </div>

        <div className="h-[400px] overflow-hidden rounded-2xl">
          <img
            src={heroImage} // ⭐ ADDED
            alt="Latest fashion collection" // ⭐ ADDED
            className="h-full w-full object-cover" // ⭐ ADDED
          />
          </div>

      </div>
    </section>
    )
}

export default HeroSection;