import p1 from "@/assets/proj-1.jpg";
import p2 from "@/assets/proj-2.jpg";
import p3 from "@/assets/proj-3.jpg";
import p4 from "@/assets/proj-4.jpg";
import p5 from "@/assets/proj-5.jpg";
import p6 from "@/assets/proj-6.jpg";

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  span: string;
  client: string;
  year: string;
  location: string;
  description: string;
  services: string[];
  area?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Dubai Mall Flagship Pavilion",
    category: "Exhibition Booth",
    image: p1,
    span: "row-span-2",
    client: "Luxury Automotive Brand",
    year: "2024",
    location: "Dubai, UAE",
    description:
      "A 400 m² immersive brand pavilion combining structural glass, brushed aluminum, and hand-finished oak. Built for a global automotive launch, the stand featured a rotating vehicle plinth, private client lounge, and integrated media walls.",
    services: ["Exhibition Booth", "Custom Woodwork", "Lighting Design"],
    area: "400 m²",
  },
  {
    id: "02",
    title: "Geneva Headquarters Showroom",
    category: "Corporate Interior",
    image: p2,
    span: "",
    client: "Swiss Watch Maison",
    year: "2023",
    location: "Geneva, Switzerland",
    description:
      "A refined showroom and reception suite for a heritage watchmaker. The space pairs blackened steel fixtures with warm walnut wall panels, backlit acrylic brand messaging, and bespoke display cabinetry.",
    services: ["Interior Fit-Out", "Acrylic Signage", "Retail Fixtures"],
    area: "180 m²",
  },
  {
    id: "03",
    title: "Riyadh Retail Facade",
    category: "Aluminum Cladding",
    image: p3,
    span: "",
    client: "Regional Fashion Retailer",
    year: "2024",
    location: "Riyadh, Saudi Arabia",
    description:
      "A complete storefront envelope using anodized aluminum louvers and low-iron structural glass. The facade is engineered for extreme solar exposure while maintaining a lightweight, sculptural presence.",
    services: ["Aluminum Cladding", "Structural Glass", "Turnkey Construction"],
    area: "320 m²",
  },
  {
    id: "04",
    title: "Milan Design Week Installation",
    category: "Exhibition Booth",
    image: p4,
    span: "",
    client: "Italian Furniture House",
    year: "2023",
    location: "Milan, Italy",
    description:
      "A temporary gallery space built around a single sculptural form. CNC-routed solid surfaces, seamless joinery, and calibrated lighting created a museum-like environment for limited-edition pieces.",
    services: ["Exhibition Booth", "CNC Fabrication", "Lighting Design"],
    area: "250 m²",
  },
  {
    id: "05",
    title: "Abu Dhabi Cultural Centre",
    category: "Turnkey Construction",
    image: p5,
    span: "row-span-2",
    client: "Government Cultural Authority",
    year: "2022",
    location: "Abu Dhabi, UAE",
    description:
      "A full-scale cultural fit-out spanning reception, exhibition halls, and archive spaces. The project combined acoustic wood slat ceilings, glass partitions, and wayfinding signage within a heritage-listed building.",
    services: ["Turnkey Construction", "Interior Fit-Out", "Acrylic Signage"],
    area: "1,200 m²",
  },
  {
    id: "06",
    title: "London Pop-Up Gallery",
    category: "Retail Store",
    image: p6,
    span: "",
    client: "Contemporary Art Platform",
    year: "2024",
    location: "London, UK",
    description:
      "A six-month retail gallery in a converted industrial unit. The design uses raw steel frames, modular plywood volumes, and programmable LED coves to adapt the space for rotating exhibitions.",
    services: ["Retail Store", "Custom Woodwork", "Lighting Design"],
    area: "150 m²",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
