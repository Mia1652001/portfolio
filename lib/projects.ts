// All project content for the work section lives here.
// Change text, links, numbers or screenshots in this file and the site updates.
// Screenshots go in public/projects; paths start with "/projects/".

export type Stat = {
  label: string;
  value: number;
  prefix?: string; // shown before the number, e.g. "July"
  suffix?: string; // shown after the number, e.g. "+"
  isYear?: boolean; // years are shown without a comma (2024, not 2,024)
};

export type Project = {
  id: string; // used for links that scroll to this project, e.g. "#wearhouse"
  name: string;
  line: string;
  tags: string[];
  link?: { label: string; href: string }; // leave out when there is no live site
  image: { src: string; width: number; height: number }; // full-page screenshot
};

// Featured case study
export const veflow = {
  id: "veflow",
  name: "VeFlow",
  line: "Car rental software used by rental companies across Mauritius.",
  badges: ["My own SaaS product", "Paying customers", "English and French", "New releases every week"],
  link: { label: "Visit veflowapp.com", href: "https://veflowapp.com" },

  stats: [
    { label: "Rental companies", value: 11 },
    { label: "Cars managed", value: 290, suffix: "+" },
    { label: "Bookings handled", value: 640, suffix: "+" },
    { label: "Live since", value: 2026, prefix: "July", isYear: true },
  ] as Stat[],

  // Screenshots for the laptop and phone in the case study
  laptopImage: "/projects/veflow-booking.png",
  phoneImage: "/projects/veflow-phone.png",

  quote: {
    text: "So far, the system has been quite helpful, especially in terms of saving time and making the overall process more convenient. It reduces the amount of manual work involved and helps minimise human errors, particularly when dealing with repetitive tasks. It also helps to have an instant view on revenue and expenses.",
    name: "Arshad",
    company: "Oasis Car Rental",
    detail: "28 cars",
  },
};

// Smaller project cards shown under VeFlow
export const projects: Project[] = [
  {
    id: "betty-beach",
    name: "Betty Beach",
    line: "Swimwear brand store with custom branding.",
    tags: ["E-commerce", "Brand design", "Next.js"],
    link: { label: "bettybeachstudios.com", href: "https://bettybeachstudios.com" },
    image: { src: "/projects/betty-beach.png", width: 2874, height: 5924 },
  },
  {
    id: "wearhouse",
    name: "WEARhouse",
    line: "Clothing store for a client with a bold, playful brand.",
    tags: ["Shopify", "Client work"],
    link: { label: "wearhouse.mu", href: "https://wearhouse.mu" },
    image: { src: "/projects/wearhouse.png", width: 1440, height: 3620 },
  },
];

// Services section cards
export type Service = {
  icon: "website" | "store" | "system";
  title: string;
  text: string;
  includes?: string[];
  proof?: string;
  target: string; // id of the project that "See it in action" scrolls to
};

// The rental company count comes from the VeFlow numbers above, so it stays in sync
const rentalCompanies = veflow.stats.find((stat) => stat.label === "Rental companies")?.value;

export const services: Service[] = [
  {
    icon: "website",
    title: "Websites",
    text: "Fast, modern websites for businesses and brands, designed around your brand and made to look great on every phone.",
    includes: ["Custom design", "Mobile first", "Contact forms"],
    target: "betty-beach",
  },
  {
    icon: "store",
    title: "Online stores",
    text: "Stores that make buying easy, on Shopify or fully custom.",
    includes: ["Product pages", "Checkout", "Brand design"],
    proof: "Betty Beach and WEARhouse",
    target: "wearhouse",
  },
  {
    icon: "system",
    title: "Systems and tools",
    text: "Custom software for how your business actually works, like booking systems, dashboards and team logins.",
    proof: rentalCompanies
      ? `VeFlow, used by ${rentalCompanies} rental companies`
      : "VeFlow, used by rental companies",
    target: "veflow",
  },
];
