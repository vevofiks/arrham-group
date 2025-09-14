import { Eye, Target, Award, Users, Zap, Facebook, Twitter, Linkedin, Instagram, } from "lucide-react";

const navLinks = [
    { name: "Home", href: "home", path: "/" },
    { name: "About Us", href: "about", path: "/" },
    { name: "Companies", href: "company", path: "/" },
    { name: "News", href: "", path: "/news" },
    {name:"Support", href: "", path: "/support" },
    {name:"Careers", href:"" , path:"/careers"},
    // {
    //     name: "Services",
    //     href: "services",
    //     path: "/services",
    //     subLinks: [
    //         { name: "Commercial Window", href: "commercial", path: "/services" },
    //         { name: "Architectural", href: "architectural", path: "/services" },
    //         { name: "Renewable Energy", href: "renewable", path: "/services" },
    //         { name: "Automotive", href: "automotive", path: "/services" },
    //         { name: "3M Products", href: "products-3m", path: "/services" },
    //     ],
    // },
    { name: "Contact", href: "contact", path: "/" },
];


const servicesData = [
    {

        image: "/services/auto-film-20.jpg",
        title: "3M Automotive Window Film Crystalline Series 20",
        description:
            "Enhance your vehicle’s look, comfort, and protection with...",
    },
    {
        image: "/services/auto-film-35.jpeg",
        title:
            "3M Automotive Window film Ceramic IR Series 35 – Application Service",
        description:
            "Our 3M paint protection films and advanced tinting solutions protect aga...",
    },
    {
        image: "/services/auto-film-15.jpg",
        title:
            "3M Automotive Window film Ceramic IR Series 15 – Application Service",
        description:
            "Custom wraps designed to protect and transform vehicle exteriors with a ...",
    },
    {
        image: "/services/ev-charging.jpg",
        title: "Energy Storage & EV Charging",
        description:
            "Smart storage solutions and EV charging systems for seamless energy mana...",
    },
    {
        image: "/services/solar.webp",
        title: "Solar Engineering & Installation",
        description:
            "Complete solar system design and deployment, enhancing energy independe...",
    },
    {
        image: "/services/wood-grain.jpg",
        title:
            "3M DI-NOC Architectural Finish Wood Grain – Wall and Furniture Application Service",
        description:
            "Comprehensive sourcing and installation of quality materials, including:...",
    },
];

export const AboutData = [
    {
        title: "Our Vision",
        content: "To be a global leader in engineering, construction, and automotive services, recognized for our commitment to innovation, quality, and sustainability.",
        icon: Eye
    },
    {
        title: "Our Mission",
        content: "To deliver exceptional engineering and automotive solutions that exceed client expectations through innovation, expertise, and a dedication to sustainability.",
        icon: Target
    },
];

export const CompanyAbout = [
    {
        id : 1,
        aboutText: "Founded in Canada in 2019, Arrham Al Arabia has built a strong reputation for delivering high-quality projects with professionalism, precision, and a commitment to exceeding client expectations. Guided by our core principles of dedication and integrity, we have rapidly expanded our operations into the Middle East, with an active presence in the Kingdom of Bahrain and the Kingdom of Saudi Arabia.",

    }
]

const stats = [
    { number: 30, suffix: "K+", label: "Projects Completed", icon: Award },
    { number: 25, suffix: "+", label: "Years Experience", icon: Zap },
    { number: 20, suffix: "K+", label: "Happy Clients", icon: Users },
    { number: 20, suffix: "+", label: "Ongoing Projects", icon: Target },
    { number: 40, suffix: "+", label: "Certified Applications", icon: Target },
];

const socialIcons = [
    { icon: Facebook, href: "#", color: "hover:bg-blue-500/20 hover:border-blue-500", iconColor: "text-[#1877F2]" },
    { icon: Twitter, href: "#", color: "hover:bg-sky-500/20 hover:border-sky-500", iconColor: "text-[#1DA1F2]" },
    { icon: Linkedin, href: "#", color: "hover:bg-blue-600/20 hover:border-blue-600", iconColor: "text-[#0A66C2]" },
    { icon: Instagram, href: "#", color: "hover:bg-pink-500/20 hover:border-pink-500", iconColor: "text-[#E4405F]" },
]

const imageLogos = [
    { src: "/major_client_logo_1.png", alt: "Company 1", href: "#" },
    { src: "/major_client_logo_2.png", alt: "Company 2", href: "#" },
    { src: "/major_client_logo_3.png", alt: "Company 3", href: "#" },
    { src: "/major_client_logo_4.png", alt: "Company 3", href: "#" },
]


export const branchesOverview = [
    {
        name: "Arrham Contracting Company (Arrham Al Arabia)",
        location: "Al Khobar, Saudi Arabia",
        shortDescription: "Specializes in turnkey contracting, engineering design, and fit-out works.",
        link: "/about-us/arrham-arabia"
    },
    {
        name: "Arrham Trading and Contracting Company",
        location: "Sitrah, Bahrain",
        shortDescription: "Provides construction, fit-out, 3M films, and smart glass technology solutions.",
        link: "/about-us/arrham-bahrain"
    },
    {
        name: "Arrham Groups (Canada)",
        location: "Head Office, Canada",
        shortDescription: "Oversees global operations and manages construction projects in Canada.",
        link: "/about-us/arrham-canada"
    },
    {
        name: "Arrham Healthcare and Solutions (Hidaya Healthcare Solutions)",
        location: "Sitrah, Bahrain",
        shortDescription: "Focused on healthcare design, construction, and turnkey medical facilities.",
        link: "/about-us/arrham-healthcare"
    }
];

  const mapData = [
    {
      name: "Arrham Trading & Contracting",
      lat: 26.4207,
      lng: 50.0888, 
    },
    {
      name: "Arrham Contracting Company",
      lat: 26.2172,
      lng: 50.1971, 
    },
    {
      name: "Arrham Group",
      lat: 24.7136,
      lng: 46.6753, 
    },
    {
      name: "Arrham Health Care Solutions",
      lat: 26.0667,
      lng: 50.5577, 
    },
  ];


export { navLinks, servicesData, stats, socialIcons, imageLogos, mapData }
