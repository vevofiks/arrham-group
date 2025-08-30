import { Eye, Target, Award, Users, Zap, Facebook, Twitter, Linkedin, Instagram, } from "lucide-react";

const navLinks = [
    { name: "Home", href: "#home", path: "/" },
    { name: "About Us", href: "#about", path: "/about-us" },
    {
        name: "Services",
        href: "#services",
        path: "/services",
        subLinks: [
            { name: "Commercial Window", href: "#commercial", path: "/services" },
            { name: "Architectural", href: "#architectural", path: "/services" },
            { name: "Renewable Energy", href: "#renewable", path: "/services" },
            { name: "Automotive", href: "#automotive", path: "/services" },
            { name: "3M Products", href: "#3m-products", path: "/services" },
        ],
    }, ,
    { name: "Contact", href: "#contact", path: "/" },
];

const servicesData = [
    {
        image: "/services/auto-film-20.jpg",
        title: "3M Automotive Window Film Crystalline Series 20",
        description:
            "Extending our expertise to interior and exterior spaces, we offer Di-Noc...",
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


export { navLinks, servicesData, stats, socialIcons }
