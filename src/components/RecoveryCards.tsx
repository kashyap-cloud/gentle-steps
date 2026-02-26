import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

import cardBrain from "@/assets/card-brain.png";
import cardCloud from "@/assets/card-cloud.png";
import cardFeelings from "@/assets/card-feelings.png";
import cardThought from "@/assets/card-thought.png";
import cardWalking from "@/assets/card-walking.png";
import cardBreathing from "@/assets/card-breathing.png";
import cardSleep from "@/assets/card-sleep.png";
import cardMeal from "@/assets/card-meal.png";
import cardCaffeine from "@/assets/card-caffeine.png";
import cardHeart from "@/assets/card-heart.png";

const cards = [
  {
    image: cardBrain,
    heading: "Label the Thought",
    text: "Notice it gently and say, \"This is an OCD thought.\" Naming creates distance.",
  },
  {
    image: cardCloud,
    heading: "Allow Uncertainty",
    text: "You don't need to solve it immediately. Uncertainty can exist without action.",
  },
  {
    image: cardFeelings,
    heading: "Let Feelings Exist",
    text: "Uncomfortable feelings are not failures. They can be present without judgment.",
  },
  {
    image: cardThought,
    heading: "Thoughts Are Mental Events",
    text: "A thought is not a fact. It is not an intention. It is simply a mental event.",
  },
  {
    image: cardWalking,
    heading: "Return to the Present",
    text: "Focus on what you are doing now. Not on \"what if\" scenarios.",
  },
  {
    image: cardBreathing,
    heading: "Slow Your Breathing",
    text: "Inhale slowly. Exhale even slower. Let your nervous system settle.",
  },
  {
    image: cardSleep,
    heading: "Protect Your Sleep",
    text: "Consistent sleep supports emotional regulation. Rest strengthens resilience.",
  },
  {
    image: cardMeal,
    heading: "Eat Regularly",
    text: "Low energy can increase anxiety. Balanced meals stabilize mood.",
  },
  {
    image: cardCaffeine,
    heading: "Notice Caffeine Effects",
    text: "If caffeine increases restlessness, consider reducing it gently.",
  },
  {
    image: cardHeart,
    heading: "Be Kind to Yourself",
    text: "Recovery happens step by step. Not perfectly. Effort matters.",
  },
];

const RecoveryCards = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    setShowFinal(idx === cards.length - 1 && emblaApi.canScrollNext() === false);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Check if we're past the last card
  const isLastCard = selectedIndex === cards.length - 1;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto px-4">
      {!showFinal ? (
        <>
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="flex-none w-full min-w-0 px-3"
                >
                  <div className="bg-card rounded-lg card-shadow p-6 flex flex-col items-center text-center space-y-5 animate-fade-in-up">
                    <div className="w-40 h-40 flex items-center justify-center">
                      <img
                        src={card.image}
                        alt={card.heading}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {card.heading}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center gap-2 mt-8">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-muted-foreground/30"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          {selectedIndex === 0 && (
            <p className="text-muted-foreground/50 text-xs mt-4 animate-fade-in-up">
              Swipe to continue →
            </p>
          )}

          {/* Show final screen button on last card */}
          {isLastCard && (
            <button
              onClick={() => setShowFinal(true)}
              className="mt-6 text-sm text-primary font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Continue
            </button>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center text-center space-y-6 py-12 animate-fade-in-up">
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Small steps build change.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
            You don't need to apply everything at once. Even one gentle shift supports progress.
          </p>
          <button
            onClick={() => {
              setShowFinal(false);
              emblaApi?.scrollTo(0);
            }}
            className="mt-4 bg-primary text-primary-foreground font-medium text-sm px-8 py-3 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            I'll keep practicing
          </button>
        </div>
      )}
    </div>
  );
};

export default RecoveryCards;
