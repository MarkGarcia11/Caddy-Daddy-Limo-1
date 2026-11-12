export type Photo = {
  id: string;
  extension?: "jpeg" | "png";
  alt: string;
};

export type Car = {
  id: string;
  name: string;
  year: string;
  model: string;
  color: string;
  capacity: number;
  tagline: string;
  description: string;
  features: string[];
  photos: Photo[];
};

// Replace the sample contact details, map location, and image slots before launch.
export const SITE_CONFIG = {
  name: "Caddy Daddy Limo",
  phoneDisplay: "(202) 555-0198",
  phoneHref: "+12025550198",
  email: "hello@caddydaddylimo.com",
  city: "Your City, State",
  serviceArea: "Your City and the surrounding counties",
  responseTime: "Usually within one business day",
  hours: "Daily by appointment; evening events welcome",
  mapQuery: "Your City, State",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
};

export const BOOKED_DATES: string[] = [];

export const photos = {
  hero: {
    id: "34677207",
    alt: "Newlyweds pause beside a classic car in the warm light of their wedding day",
  },
  introduction: {
    id: "35269852",
    extension: "png" as const,
    alt: "The chrome hood of a vintage 1950 Cadillac glowing in the last light of the day",
  },
  owner: {
    id: "8096269",
    alt: "A classic car owner stands beside a vintage car in a city garage",
  },
  celebration: {
    id: "5123325",
    alt: "A newly married couple laughs together as their guests celebrate",
  },
};

export const cars: Car[] = [
  {
    id: "golden",
    name: "The Golden One",
    year: "1950",
    model: "Cadillac Series 62",
    color: "Champagne cream",
    capacity: 3,
    tagline: "For the entrance everyone remembers.",
    description:
      "Long lines, a little extra legroom, and chrome that catches the sunset just right. She makes even a short trip feel like the start of a story.",
    features: ["Chauffeur driven", "Photo-stop friendly", "Classic chrome details"],
    photos: [
      {
        id: "35269852",
        extension: "png",
        alt: "Golden-hour detail of a 1950 Cadillac Series 62",
      },
      {
        id: "34677207",
        alt: "A wedding couple beside a classic Cadillac at sunset",
      },
      {
        id: "32170359",
        alt: "Close view of vintage Cadillac chrome and headlight details",
      },
    ],
  },
  {
    id: "ruby",
    name: "Ruby Tuesday",
    year: "1960s",
    model: "Cadillac Fleetwood",
    color: "Cherry red",
    capacity: 3,
    tagline: "A little old-school. A lot unforgettable.",
    description:
      "Ruby brings that polished, movie-premiere kind of magic. A lovely choice for a wedding, a birthday, or simply because the evening deserves it.",
    features: ["Chauffeur driven", "Elegant rear seating", "A true conversation starter"],
    photos: [
      {
        id: "16458055",
        alt: "A cherry-red vintage Cadillac parked on a quiet cobbled street",
      },
      {
        id: "30011917",
        alt: "Front view of a red classic Cadillac with bright chrome trim",
      },
      {
        id: "35532911",
        alt: "Sculptural tail fins on a red vintage Cadillac",
      },
    ],
  },
  {
    id: "fleetwood",
    name: "The Fleetwood",
    year: "1960s",
    model: "Cadillac Fleetwood",
    color: "Soft ivory",
    capacity: 3,
    tagline: "Quietly grand. Impossible to miss.",
    description:
      "A graceful silhouette, soft ivory paint, and room to take a breath before the big moment. The Fleetwood knows how to make an arrival feel easy.",
    features: ["Chauffeur driven", "Room for a small bridal party", "Timeless ivory finish"],
    photos: [
      {
        id: "9175391",
        alt: "An ivory vintage Cadillac Fleetwood resting in an open green field",
      },
      {
        id: "8063127",
        alt: "A bride and groom pause beside a blue classic car",
      },
      {
        id: "19356917",
        alt: "A red classic Cadillac cruising along a tree-lined street",
      },
    ],
  },
];

export const occasions = [
  {
    id: "weddings",
    title: "Weddings",
    note: "The first look. The first ride. The first just-married photo.",
    photo: { id: "32632278", alt: "A newly married couple with a classic blue car" },
  },
  {
    id: "anniversaries",
    title: "Anniversaries",
    note: "A little time together, with the good stories on repeat.",
    photo: { id: "10905827", alt: "A couple sharing a quiet moment in a vintage car" },
  },
  {
    id: "proms",
    title: "Proms & graduations",
    note: "Make the photos, the entrance, and the group chat.",
    photo: { id: "16458072", alt: "A polished red classic Cadillac on a city street" },
  },
  {
    id: "birthdays",
    title: "Birthdays",
    note: "Because another year deserves more than another dinner.",
    photo: { id: "30011917", alt: "The bright chrome front end of a red classic Cadillac" },
  },
  {
    id: "photoshoots",
    title: "Photo shoots",
    note: "A beautiful backdrop that knows how to hold a pose.",
    photo: { id: "8063127", alt: "A couple and a blue vintage car in a field" },
  },
  {
    id: "datenights",
    title: "Date nights",
    note: "Pick a place. We will bring the butterflies.",
    photo: { id: "19356917", alt: "A classic Cadillac framed by a leafy neighborhood street" },
  },
  {
    id: "tours",
    title: "Private tours",
    note: "Take the scenic way. We know a few good turns.",
    photo: { id: "9128916", alt: "A vintage car on a quiet open road at golden hour" },
  },
];

export const packages = [
  {
    id: "grand-entrance",
    name: "The Grand Entrance",
    startingAt: "$450",
    duration: "A lovely beginning",
    description: "A classic-car arrival, handled with care from pickup to drop-off.",
    includes: ["Private chauffeur", "One pickup and drop-off", "A little time for photos"],
  },
  {
    id: "wedding-day",
    name: "The Wedding Day",
    startingAt: "$850",
    duration: "Room for the moments",
    description: "A relaxed plan for the ceremony, the portraits, and the just-married ride.",
    includes: ["Pre-day route planning", "Flexible photo stops", "Decorative ribbon on request"],
    featured: true,
  },
  {
    id: "make-a-day",
    name: "Make a Day of It",
    startingAt: "$1,200",
    duration: "Your day, at your pace",
    description: "A little more time for multiple stops, happy detours, and the people you love.",
    includes: ["Extended private hire", "Custom route and timing", "Planned photo-stop window"],
  },
];

export const gallery = [
  {
    id: "just-married",
    category: "Weddings",
    caption: "The just-married glow",
    photo: { id: "34677207", alt: "Newlyweds beside a vintage car in warm evening light" },
  },
  {
    id: "chrome",
    category: "Little details",
    caption: "Chrome in the sunshine",
    photo: { id: "32170359", alt: "Close-up of a classic Cadillac's chrome details" },
  },
  {
    id: "blue-car",
    category: "Weddings",
    caption: "A quiet minute before the party",
    photo: { id: "8063127", alt: "A couple posing beside a blue vintage car" },
  },
  {
    id: "red-car",
    category: "The cars",
    caption: "Ruby, looking very much herself",
    photo: { id: "16458055", alt: "A red Cadillac parked on a cobbled street" },
  },
  {
    id: "family-laugh",
    category: "Weddings",
    caption: "A little happy chaos",
    photo: { id: "5123325", alt: "A couple laughing together during their wedding celebration" },
  },
  {
    id: "tail-fins",
    category: "Little details",
    caption: "Made for one more look",
    photo: { id: "35532911", alt: "The tail fins of a bright red classic Cadillac" },
  },
  {
    id: "fleetwood",
    category: "The cars",
    caption: "A timeless silhouette",
    photo: { id: "9175391", alt: "An ivory vintage Cadillac in a quiet green field" },
  },
  {
    id: "arrival",
    category: "Weddings",
    caption: "The moment the door opens",
    photo: { id: "32632278", alt: "A bride and groom beside their classic wedding car" },
  },
];

// Illustrative review copy only. Replace these entries with approved guest reviews.
export const reviews = [
  {
    quote:
      "The door opened, the whole room smiled, and suddenly the nerves were gone. It felt like the day had officially begun.",
    name: "A wedding-day favorite",
    occasion: "Example review · replace with a verified guest review",
    verified: false,
  },
  {
    quote:
      "We planned one quick photo stop. We took our time, laughed a lot, and kept talking about that ride all evening.",
    name: "A little birthday magic",
    occasion: "Example review · replace with a verified guest review",
    verified: false,
  },
  {
    quote:
      "The car was beautiful. The best part was how calm everything felt. We could just be there with our daughter.",
    name: "For the proud parents",
    occasion: "Example review · replace with a verified guest review",
    verified: false,
  },
];

export const faqs = [
  {
    question: "Are the cars licensed and insured for events?",
    answer:
      "Yes. Our cars are operated as a licensed, commercially insured service. If your venue or planner needs current documentation, ask and we will share it before your date.",
  },
  {
    question: "How much does a classic car limousine cost?",
    answer:
      "Most bookings start with the guide prices above. Your written quote is based on the date, hours, route, car, and any stops or add-ons. There are no surprise extras added after we agree the plan.",
  },
  {
    question: "How do deposits and cancellations work?",
    answer:
      "A date is held once the written quote and booking terms are accepted. Deposit and cancellation details are shared in that quote before you decide. Nothing is a surprise after the fact.",
  },
  {
    question: "What will the chauffeur wear?",
    answer:
      "Ed arrives neat, polished, and dressed to suit the occasion. If your event has a dress code or a special request, tell us while we plan the day.",
  },
  {
    question: "How many people can ride?",
    answer:
      "Capacity depends on the car and local regulations. The cars shown here have room for up to three passengers, plus the chauffeur. We will confirm the right fit before you book.",
  },
  {
    question: "Can we add ribbons, a toast, or photo stops?",
    answer:
      "Absolutely. Ribbons, a red-carpet moment, a toast, or a few extra photos can be arranged ahead of time. Please mention decorations or beverages in your enquiry so we can confirm what is suitable for the car.",
  },
  {
    question: "How far do you travel?",
    answer:
      "We serve Your City and nearby communities. Longer trips may be possible, depending on the date and route. Send the pickup and drop-off locations and we will give you a clear answer.",
  },
  {
    question: "When should we book?",
    answer:
      "As soon as you have your date, especially for spring and autumn weekends. It is always worth asking, though. A good day sometimes opens up at the last minute.",
  },
];

export const journeySteps = [
  {
    number: "01",
    title: "The arrival",
    text: "A polished Cadillac. A held-open door. One deep breath before the moment begins.",
    photo: { id: "32632278", alt: "A couple arriving beside a blue classic car" },
  },
  {
    number: "02",
    title: "The ride",
    text: "A softer pace, a familiar voice up front, and a little room to take it all in.",
    photo: { id: "10905827", alt: "A couple sharing a quiet moment inside a vintage car" },
  },
  {
    number: "03",
    title: "The photos",
    text: "We leave a little breathing room for the pictures you will keep on the mantel.",
    photo: { id: "35269852", extension: "png" as const, alt: "Sunlight catching the chrome of a classic Cadillac" },
  },
  {
    number: "04",
    title: "The memory",
    text: "Long after the flowers are gone, you will still remember how that door sounded.",
    photo: { id: "34677207", alt: "Newlyweds smiling beside their classic wedding car" },
  },
];