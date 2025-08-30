const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    {
        name: "Services",
        href: "#services",
        subLinks: [
            { name: "Commercial Window", href: "#commercial" },
            { name: "Architectural", href: "#architectural" },
            { name: "Renewable Energy", href: "#renewable" },
            { name: "Automotive", href: "#automotive" },
            { name: "3M Products", href: "#3m-products" },
        ],
    }, ,
    { name: "Contact", href: "#contact" },
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

export { navLinks, servicesData }