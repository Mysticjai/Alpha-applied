import React from 'react';
import { siteContent } from '../../content/siteContent';
import { AnimatedContent } from '../ui/AnimatedContent';
import { cardImages } from '../../data/cardImages';

export const WhoWeServeSection: React.FC = () => {
  const { whoWeServe } = siteContent;

  const audienceImages = [
    cardImages.whoWeServe.lawFirms,
    cardImages.whoWeServe.corporateCounsel,
    cardImages.whoWeServe.financialInstitutions,
  ];

  const audienceNumbers = ['01', '02', '03'];

  const audienceLinks = [
    '/litigationservices.html',
    '/divorcefamilylaw.html',
    '/litigationsupport.html',
  ];

  return (
    <section
      id="who-we-serve"
      className="section-padding bg-surface-warm-light/70 border-b border-brand-border/60 relative scroll-mt-20 overflow-hidden"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
          {/* Left Column: 4-Line Serif Heading & Supporting Paragraph */}
          <div className="lg:col-span-5">
            <AnimatedContent distance={20} duration={0.6} threshold={0.15}>
              {/* Editorial 4-line Serif Heading */}
              <h2 className="font-serif font-normal text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.06] tracking-tight text-primary">
                Built for <br />
                <span className="text-brand-taupe">Legal &amp;</span> <br />
                <span className="text-brand-taupe">Financial</span> <br />
                Professionals.
              </h2>

              {/* Supporting Subtitle Paragraph */}
              <p className="mt-5 sm:mt-6 text-sm sm:text-base text-brand-slate leading-relaxed max-w-sm font-normal">
                {whoWeServe.subtitle}
              </p>
            </AnimatedContent>
          </div>

          {/* Right Column: 3 Interactive Audience Cards with Coordinated Image Scale & Text Highlight */}
          <div className="lg:col-span-7">
            <AnimatedContent
              distance={22}
              duration={0.65}
              stagger={0.11}
              threshold={0.15}
              className="flex flex-col gap-3 sm:gap-4"
            >
              {whoWeServe.audiences.map((audience, idx) => (
                <a
                  key={audience.id}
                  href={audienceLinks[idx]}
                  aria-label={`${audience.title} — View Practice Discipline`}
                  className="block no-underline select-text group rounded-xl bg-transparent hover:bg-white/80 p-4 sm:p-5 sm:py-7 border border-brand-border/70 hover:border-brand-border hover:shadow-xs transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer sm:min-h-[168px] flex flex-col justify-center"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Large Two-Digit Number */}
                    <div className="shrink-0 w-8 sm:w-12 select-none">
                      <span className="font-serif text-3xl sm:text-4xl text-brand-taupe group-hover:text-primary transition-colors duration-250 leading-none font-normal block">
                        {audienceNumbers[idx]}
                      </span>
                    </div>

                    {/* Interactive Image Frame with Clipped Parallax & Gradient Overlay */}
                    <div className="relative w-full sm:w-36 h-28 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-brand-surface border border-brand-border/60">
                      <img
                        src={audienceImages[idx].src}
                        alt={audienceImages[idx].alt}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-108 transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#004643]/75 via-[#004643]/20 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Audience Heading & Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-[1.5rem] text-primary group-hover:text-primary-dark transition-colors duration-200 font-normal tracking-tight leading-snug">
                        {audience.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-[14px] text-brand-slate leading-relaxed max-w-xl">
                        {audience.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </AnimatedContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeServeSection;
