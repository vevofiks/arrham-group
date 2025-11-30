export const groupCompanies = [
  {
    id: "arrham-canada",
    country: "CANADA - Head Office",
    name: "ARRHAM GROUP INC.",
    address: "102A, Church Street, Keswick, Ontario L4P 0J4",
    phone: "+1 111 100 4444",
  },
  {
    id: "arrham-contracting-ksa",
    country: "SAUDI ARABIA",
    name: "ARRHAM AL ARABIA COMPANY",
    address:
      "Building No. 2581, Street 11, Al Khobar, Postal Code 34611, Kingdom of Saudi Arabia.",
    phone: "+966 54 129 0883",
  },
  {
    id: "arrham-trading-bahrain",
    country: "BAHRAIN",
    name: "ARRHAM TRADING AND CONTRACTING W.L.L",
    address:
      "1445A, Road 4630, Block 646, Nuwaidrat, Sitrah 644, Kingdom of Bahrain",
    phone: "+973 1747 3535",
  },
  {
    id: "arrham-healthcare-bahrain",
    country: "BAHRAIN",
    name: "ARRHAM HEALTHCARE SOLUTIONS",
    address:
      "1445G, Road 4630, Block 646, Nuwaidrat, Sitrah 644, Kingdom of Bahrain",
    phone: "+973 1747 3535",
  },
];

export const branchesData = {
  branches: [
    {
      id: "arrham-canada",
      name: "Arrham Group Inc.",
      companyIcon: "/arrham-canada.png",
      color: ["from-lgreen/80", "to-teal-400"],
      primaryColor: {
        border: "border-teal-400",
        text: "text-white",
        hoverBorder: "hover:border-teal-400",
        hoverText: "hover:text-teal-300",
        shadow: "shadow-teal-900/30",
      },

      map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1397.4249441231043!2d-79.4617054!3d44.2458664!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ab5d187847e6f%3A0xb7033e4e1ac36744!2s102A%20Church%20St%2C%20Keswick%2C%20ON%20L4P%200J4%2C%20Canada!5e1!3m2!1sen!2sin!4v1764503371775!5m2!1sen!2sin",
      companyImg: "/companyDummy.png",
      country: "Canada",
      location: "Canada (Head Office)",
      shortDescription:
        "Head office overseeing group operations, Canada-based construction & warehousing projects.",
      description:
        "Arrham Group Inc., headquartered in Canada, serves as the central hub for the group's international operations—overseeing global project coordination, investment strategies, and the execution of local initiatives including manufacturing facilities and warehouse developments across North America.",
      services: [
        "Project oversight and group operations.",
        "Construction & engineering support for Canadian projects.",
        "Logistics & warehouse development.",
      ],
      projects: [
        {
          id: 1,
          name: "Krystallaite GT Inc Manufacturing Facility",
          location: "North York, Canada",
          status: "Completed",
          img: ["/project-1.png", "/project-2.png", "/project-4.png"],
        },
        {
          id: 2,
          name: "Fergus Warehouse Project",
          location: "Fergus, Canada",
          status: "Completed",
          img: ["/arrham3.png"],
        },
      ],
      clients: ["Local manufacturing clients", "Regional logistics firms"],
      accreditations: [],
      contact: {
        address: "102A, Church Street Keswick, Ontario L4p 0j4",
        phone: "+1 111 100 4444",
        email: "info@arrhamgroup.com",
        website: "https://www.arrhamgroup.com",
      },
      otherDetails: {},
    },

    {
      id: "arrham-contracting-ksa",
      name: "Arrham Al Arabia Contracting Company",
      color: ["from-lgreen/80", "to-teal-400"],
      primaryColor: {
        border: "border-teal-400",
        text: "text-white",
        hoverBorder: "hover:border-teal-400",
        hoverText: "hover:text-teal-300",
        shadow: "shadow-teal-900/30",
      },

      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4438391195013!2d50.1867873!3d26.2070345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49c33596a3d8fd%3A0x5ea2a267152ba24b!2s11%2C%20Al%20Khuzama%2C%20Al%20Khobar%2034719%2C%20Saudi%20Arabia!5e1!3m2!1sen!2sin!4v1764503439772!5m2!1sen!2sin",
      companyIcon: "/arrham-logo.png",
      companyImg: "/companyDummy.png",
      country: "Kingdom of Saudi Arabia",
      location: "Al Khobar Al Janubiyah Dist., Kingdom of Saudi Arabia",
      shortDescription:
        "Turnkey contracting, E&I, cathodic protection, fit-out works for industrial & commercial clients.",
      description:
        "Specializes in turnkey contracting, electrical & instrumentation, engineering design, cathodic protection and interior fit-outs. Experienced on Aramco & large industrial clients, shutdowns and complex plant installations.",
      services: [
        "Engineering Design: load lists, load flows, single-line diagrams, arc flash.",
        "E&I: MV/LV switchgear, transform, SCADA, DCS, loop checking, commissioning.",
        "Cathodic Protection: anode installation and corrosion control.",
        "Fit-Out & Interiors: joinery, HVAC, MEP, finishes and FF&E.",
        "Specialized Films & Facades: 3M Fasara, DI-NOC installations.",
      ],
      keyPersonnel: [
        {
          name: "Azhar Peerzada",
          role: "General Manager",
          experience: "20+ years delivering Aramco-scale projects",
        },
        {
          name: "Shabab Karuparamban",
          role: "Operations Manager",
          experience: "15+ years in interior fit-outs and project execution",
        },
      ],
      projects: [
        {
          id: 1,
          name: "Krystallaite GT Inc Manufacturing Facility",
          location: "North York, Canada",
          status: "Completed",
          value: "1,916,243 SAR",
          img: ["/project-1.png"],
        },
        {
          id: 2,
          name: "Al Khushaybi 380/132 kV Substation",
          location: "Khushaybi, KSA",
          status: "Ongoing",
          value: "371,000 SAR",
          img: ["/project-2.png"],
        },
        {
          id: 3,
          name: "The Avenues Mall Fit-Out",
          location: "Khobar, KSA",
          status: "Ongoing",
          value: "2,603,550 SAR",
          img: ["/project-4.png"],
        },
      ],
      sampleWorks: [
        {
          id: 1,
          image: "/arhamarabiaworks/work1.jpg",
          category: "Interior Design",
          height: 250,
        },
        {
          id: 2,
          image: "/arhamarabiaworks/work2.jpg",
          category: "Branding",
          height: 320,
        },
        {
          id: 3,
          image: "/arhamarabiaworks/work3.jpg",
          category: "UI/UX Design",
          height: 280,
        },
        {
          id: 4,
          image: "/arhamarabiaworks/work4.jpg",
          category: "Web Design",
          height: 300,
        },
        {
          id: 5,
          image: "/arhamarabiaworks/work5.jpg",
          category: "Marketing",
          height: 260,
        },
        {
          id: 6,
          image: "/arhamarabiaworks/work6.jpg",
          category: "Photography",
          height: 290,
        },
        {
          id: 7,
          image: "/arhamarabiaworks/work7.jpg",
          category: "Architecture",
          height: 310,
        },
        {
          id: 8,
          image: "/arhamarabiaworks/work8.jpg",
          category: "Digital Marketing",
          height: 240,
        },
      ],
      electricalMEP: {
        name: "Electrical & MEP Works",
        description:
          "At Arrham Al Arabia Contracting Company, we specialize in delivering comprehensive Electrical and MEP (Mechanical, Electrical & Plumbing) solutions for industrial, residential, and commercial projects. Our expertise ensures safe, efficient, and sustainable systems tailored to client requirements and international standards.",
        services: [
          {
            title: "Our Electrical Works Include",
            points: [
              "MV & LV Switchgears – installation, testing, and commissioning.",
              "Power Transformers (Step-down).",
              "GIS Installations – 380kV, 132kV, and 33kV.",
              "Overhead Transmission Lines & Gantries.",
              "U/G and A/G Power Cables (MV & LV) – supply, pulling, termination, and testing.",
              "Cable Trays – AL ladder type and GI trays.",
              "Main Distribution Boards, Power & Lighting Panels.",
              "Earthing & Lightning Protection Systems.",
              "SCADA Development & Integration.",
              "DCS/ESD Cabinets & Control Systems.",
              "Fire Alarm Security & Low Current Systems (CCTV, Access Control, Data Networks) - Installation, Testing and Commissioning .",
            ],
          },
          {
            title: "Our Mechanical & Plumbing (MEP) Works Include",
            points: [
              "Complete HVAC Systems (installation, testing, commissioning).",
              "Chilled Water Systems – pumps, piping, and connections.",
              "Plumbing & Drainage Systems – water supply, piping, sanitary installations.",
              "Compressed Air & Instrument Air Tubing.",
              "Firefighting Systems – sprinkler, hydrant, and suppression systems.",
              "Mechanical Equipment Installations – pumps, tanks, chillers, boilers.",
            ],
          },
        ],
        industries: [
          "Industrial Projects – factories, warehouses, power plants.",
          "Commercial Projects – offices, malls, retail centers, hospitals, hotels.",
          "Residential Projects – villas, apartments, residential towers.",
          "Infrastructure Projects – utilities, substations, data centers.",
        ],
        keyAdvantages: [
          "Skilled engineering and technical workforce.",
          "Compliance with IEC, IEEE, BS, and NFPA standards.",
          "In-house resources for design, supply, installation, and testing.",
          "Proven track record in turnkey projects.",
          "Commitment to safety, quality, and timely delivery.",
        ],
      },
      clients: [
        "Saudi Aramco",
        "Saudi Electricity Company",
        "Sabic",
        "Hadeed",
        "Royal Commission",
      ],
      accreditations: ["ISO 45001:2018", "ISO 9001:2015", "ISO 14001:2015"],
      contact: {
        address:
          "Bulding No. 2581, Street 11, Al khobar, Postal Code 34611, Kingdom of Saudi Arabia.",
        phone: "+966 54 129 0883",
        email: "info@arrhamgroup.com",
        website: "https://www.arrhamgroup.com",
      },
      otherDetails: {
        expertise:
          "Project Managers, Electrical & Instrumentation Engineers, Supervisors, electricians, heavy equipment.",
      },
    },

    {
      id: "arrham-trading-bahrain",
      name: "Arrham Trading and Contracting W.L.L.",
      color: ["from-lgreen/80", "to-teal-400"],
      primaryColor: {
        border: "border-teal-400",
        text: "text-white",
        hoverBorder: "hover:border-teal-400",
        hoverText: "hover:text-teal-300",
        shadow: "shadow-teal-900/30",
      },

      map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3502.5334232355817!2d50.5827767!3d26.1374613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49afb630d98309%3A0xdb8632bd0384242f!2s3M%20Authorized%20Auto%20Care%20Center!5e1!3m2!1sen!2sin!4v1764503271556!5m2!1sen!2sin",
      companyIcon: "/arrham-ksa.png",
      companyImg: "/companyDummy.png",
      country: "Kingdom of Bahrain",
      location:
        "1445A, Road 4630, Block 646, Nuwaidrat, Sitrah 644, Kingdom of Bahrain",
      shortDescription:
        "Construction & fit-outs, 3M window films dealer, automotive window films & architectural finishes.",
      description:
        "Multifaceted firm offering commercial/residential/industrial fit-outs, 3M window films, smart glass, automotive films, and architectural finishes. Ideal for retail, offices, and automotive spaces.",

      services: [
        "Concept design, 3D visualization, and space planning.",
        "Selection of themes, colors, and finishes aligned with client requirements.",
        "Complete turnkey solutions for residential, commercial, retail, and hospitality spaces.",
        "Execution of partitions, ceilings, flooring, wall finishes, and joinery.",
        "MEP (Mechanical, Electrical, Plumbing) integration within interiors.",
        "Bespoke furniture design and fabrication.",
        "Built-in cabinets, wardrobes, reception desks, and feature walls.",
        "Wall cladding, 3M DI-NOC finishes, and decorative glass films (Fasara).",
        "Lighting design and smart automation integration.",
        "Cost control, procurement, and scheduling.",
        "Quality assurance and on-time delivery.",
      ],

      industries: [
        "Residential Villas & Apartments",
        "Corporate Offices",
        "Retail Stores & Showrooms",
        "Restaurants & Cafés",
        "Hotels & Resorts",
        "Healthcare Facilities",
      ],

      keyAdvantages: [
        "Turnkey solutions from concept to completion.",
        "Skilled workforce with technical expertise.",
        "Premium materials and finishes (including 3M Architectural Solutions).",
        "Cost-effective, sustainable, and modern design solutions.",
      ],

      threeM: {
        logo: "/threeM.png",
        description:
          "At Arrham Trading & Contracting W.L.L., we are proud to be an authorized distributor and applicator of 3M Automotive Solutions in Bahrain. Our services combine advanced technology with professional installation to ensure protection, performance, and style for every vehicle.",
        services: [
          {
            title: "3M™ Paint Protection Film (PPF)",
            description: [
              "Protects vehicle paint from scratches, chips, stains, and weather damage.",
              "Available in Gloss & Matte finishes (Pro Series 200).",
              "Self-healing technology for minor scratches.",
              "Backed by up to 10 years warranty.",
            ],
          },
          {
            title: "3M™ Automotive Window Films",
            description: [
              "Heat rejection for cooler cabin comfort.",
              "UV protection (blocks up to 99.9% of harmful rays).",
              "Enhanced safety with anti-shatter properties.",
              "Options include FX, Color Stable, Ceramic IR, and Crystalline series.",
            ],
          },
          {
            title:
              "3M™ Fasara™ & Decorative Films (optional for premium clients)",
            description: [
              "Stylish privacy and decorative films for vehicle customization.",
            ],
          },
          {
            title: "3M™ Detailing Solutions",
            description: ["Ceramic coatings for extended paint protection."],
          },
        ],
        keyAdvantages: [
          "Authorized 3M Applicators in Bahrain.",
          "Professional installation with warranty certificate.",
          "Genuine 3M products only.",
          "Custom packages to suit individual car owners and fleet clients.",
        ],
      },

      electricalMEP: {
        name: "Electrical & MEP Works",
        description:
          "At Arrham Trading & Contracting W.L.L., we specialize in delivering comprehensive Electrical and MEP (Mechanical, Electrical & Plumbing) solutions for industrial, residential, and commercial projects. Our expertise ensures safe, efficient, and sustainable systems tailored to client requirements and international standards.",
        services: [
          {
            title: "Our Electrical Works Include",
            points: [
              "MV & LV Switchgears – installation, testing, and commissioning.",
              "Power Transformers (Step-down).",
              "GIS Installations – 380kV, 132kV, and 33kV.",
              "Overhead Transmission Lines & Gantries.",
              "U/G and A/G Power Cables (MV & LV) – supply, pulling, termination, and testing.",
              "Cable Trays – AL ladder type and GI trays.",
              "Main Distribution Boards, Power & Lighting Panels.",
              "Earthing & Lightning Protection Systems.",
              "SCADA Development & Integration.",
              "DCS/ESD Cabinets & Control Systems.",
              "Fire Alarm & Low Current Systems (CCTV, Access Control, Data Networks).",
            ],
          },
          {
            title: "Our Mechanical & Plumbing (MEP) Works Include",
            points: [
              "Complete HVAC Systems (installation, testing, commissioning).",
              "Chilled Water Systems – pumps, piping, and connections.",
              "Plumbing & Drainage Systems – water supply, piping, sanitary installations.",
              "Compressed Air & Instrument Air Tubing.",
              "Firefighting Systems – sprinkler, hydrant, and suppression systems.",
              "Mechanical Equipment Installations – pumps, tanks, chillers, boilers.",
            ],
          },
        ],
        industries: [
          "Industrial Projects – factories, warehouses, power plants.",
          "Commercial Projects – offices, malls, retail centers, hospitals, hotels.",
          "Residential Projects – villas, apartments, residential towers.",
          "Infrastructure Projects – utilities, substations, data centers.",
        ],
        keyAdvantages: [
          "Skilled engineering and technical workforce.",
          "Compliance with IEC, IEEE, BS, and NFPA standards.",
          "In-house resources for design, supply, installation, and testing.",
          "Proven track record in turnkey projects.",
          "Commitment to safety, quality, and timely delivery.",
        ],
      },
      keyPersonnel: [
        {
          name: "Shabab Karuparamban",
          role: "Operations Manager",
          experience: "15+ years in interior fit-outs and project execution",
        },
      ],
      projects: [
        {
          id: 1,
          name: "Nuwaidrat Retail Fit-Out",
          location: "Sitrah, Bahrain",
          status: "Completed",
        },
        {
          id: 2,
          name: "AutoCare Center Setup",
          location: "Sitrah, Bahrain",
          status: "Completed",
        },
      ],
      sampleWorks: [
        {
          id: 1,
          title: "Modern Office Design",
          image: "/works/work1.jpg",
          description:
            "Complete office renovation with modern aesthetics and sustainable materials",
          category: "Interior Design",
          height: 250,
        },
        {
          id: 2,
          title: "Brand Identity Package",
          image: "/works/work2.jpg",
          description:
            "Full branding suite for tech startup including logo, guidelines, and collateral",
          category: "Branding",
          height: 320,
        },
        {
          id: 3,
          title: "Mobile App UI/UX",
          image: "/works/work3.jpg",
          description:
            "E-commerce mobile application design with seamless user experience",
          category: "UI/UX Design",
          height: 280,
        },
        {
          id: 4,
          title: "Website Redesign",
          image: "/works/work4.jpg",
          description: "Corporate website overhaul with modern tech stack",
          category: "Web Design",
          height: 300,
        },
        {
          id: 5,
          title: "Marketing Campaign",
          image: "/works/work5.jpg",
          description:
            "Multi-channel marketing strategy execution across digital platforms",
          category: "Marketing",
          height: 260,
        },
        {
          id: 6,
          title: "Product Photography",
          image: "/works/work6.jpg",
          description: "Professional product shoot for e-commerce platform",
          category: "Photography",
          height: 290,
        },
        {
          id: 7,
          title: "Architectural Visualization",
          image: "/works/work7.jpg",
          description:
            "3D rendering and architectural planning for commercial space",
          category: "Architecture",
          height: 310,
        },
        {
          id: 8,
          title: "Social Media Strategy",
          image:
            "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800",
          description:
            "Comprehensive social media management and content creation",
          category: "Digital Marketing",
          height: 240,
        },
      ],
      clients: ["Local retail chains", "Independent automotive dealers", "3M"],
      contact: {
        address:
          "1445A, Road 4630, Block 646, Nuwaidrat, Sitrah 644, Kingdom of Bahrain",
        phone: "+973 1747 3535",
        email: "info@arrhamgroup.com",
        website: "https://www.arrhamgroup.com",
      },
      otherDetails: {
        partners: ["3M", "Dream Glass Group"],
        expertise:
          "Redefine automotive comfort & protection using advanced window film solutions.",
      },
    },

    {
      id: "arrham-healthcare-bahrain",
      name: "Arrham Healthcare Solutions W.L.L.",
      companyIcon: "/arrham-healthcare.png",
      companyImg: "/companyDummy.png",
      country: "Kingdom of Bahrain",
      color: ["from-lgreen/40", "to-teal-400"],
      primaryColor: {
        border: "border-teal-400",
        text: "text-white",
        hoverBorder: "hover:border-teal-400",
        hoverText: "hover:text-teal-300",
        shadow: "shadow-teal-900/30",
      },

      map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3502.5334232355817!2d50.5827767!3d26.1374613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49afb630d98309%3A0xdb8632bd0384242f!2s3M%20Authorized%20Auto%20Care%20Center!5e1!3m2!1sen!2sin!4v1764503271556!5m2!1sen!2sin",
      location:
        "1445G, Road 4630, Block 646, Nuwaidrat, Sitrah 644, Kingdom of Bahrain",
      shortDescription:
        "Design & turnkey construction of healthcare facilities with medical compliance focus.",
      description:
        "Dedicated to planning, designing and delivering healthcare facilities—hospitals, clinics, labs—meeting clinical workflows, hygiene protocols and medical-grade finishes.",
      services: [
        "Turnkey Healthcare Construction: end-to-end from concept to handover.",
        "Medical Planning & Workflow Optimization.",
        "Cleanrooms & Sterile Environments.",
        "Medical Gas Systems & Nurse Call Systems.",
        "Healthcare Interiors & Modular Systems.",
      ],
      keyPersonnel: [
        {
          name: "Dr. Hidaya Al-Karim",
          role: "Healthcare Projects Director",
          experience: "Clinical planning and healthcare facility design lead",
        },
      ],
      projects: [
        {
          id: 1,
          name: "Specialist Clinic Fit-Out",
          location: "Sitrah, Bahrain",
          status: "Completed",
          value: "120,000 BHD",
        },
      ],
      clients: ["Private clinics", "Wellness centers", "Regional hospitals"],
      accreditations: [
        "Healthcare construction & compliance expertise (internal)",
      ],
      contact: {
        address:
          "1445G, Road 4630, Block 646, Nuwaidrat, Sitrah 644, Kingdom of Bahrain",
        phone: "+973 1747 3535",
        email: "info@arrhamgroup.com",
        website: "https://www.arrhamgroup.com",
      },
      otherDetails: {
        expertise:
          "Clinical planning, medical gas, cleanroom builds, radiology shielding, sterile finishes.",
      },
    },
  ],
};
