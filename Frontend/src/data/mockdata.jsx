export const mockIssues = [
  {
    id: 1,
    title: "Potholes on Main Road",
    description: "Large potholes near the temple causing traffic issues and vehicle damage. This has been a problem for 2 months.",
    category: "Roads & Infrastructure",
    location: "Near Village Temple, Main Road",
    status: "pending",
    date: "2024-01-15",
    coordinates: [28.6129, 77.2295],
    updates: "Reported to municipal corporation - waiting for response",
    votes: 12,
    reporter: "Anonymous"
  },
  {
    id: 2,
    title: "Drainage Blockage in Market Area",
    description: "Sewage water overflowing near market area causing health hazards and bad smell.",
    category: "Drainage & Sanitation",
    location: "Market Street, Near Grocery Shop",
    status: "in-progress",
    date: "2024-01-10",
    coordinates: [28.6135, 77.2301],
    updates: "Work started by sanitation department - expected completion in 3 days",
    votes: 8,
    reporter: "Ramesh S."
  },
  {
    id: 3,
    title: "Street Lights Not Working",
    description: "5 street lights not working on School Road, making it unsafe for evening walks.",
    category: "Electricity",
    location: "School Road, Near Primary School",
    status: "resolved",
    date: "2024-01-05",
    coordinates: [28.6122, 77.2288],
    updates: "Lights repaired by electricity department on Jan 12th",
    votes: 15,
    reporter: "Priya M."
  }
];



export const mockLeaders = [
  {
    id: 1,
    name: "Ramesh Kumar",
    position: "Ward Councillor",
    area: "Ward 5 - South Zone",
    party: "Independent",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    contact: {
      phone: "+91 98765 43210",
      email: "ramesh.ward5@email.com",
      office: "Village Council Office, Main Road"
    },
    bio: "Serving the community for 5 years with focus on infrastructure development and public welfare. Previously worked as a teacher before entering public service.",
    wardMap: [28.6129, 77.2295],
    responsibilities: [
      "Addressing civic issues in Ward 5",
      "Infrastructure development projects",
      "Public grievance resolution",
      "Budget allocation for local development"
    ],
    initiatives: [
      {
        title: "Road Repair Project",
        description: "Comprehensive repair of all major roads in South Zone",
        status: "In Progress"
      },
      {
        title: "Clean Water Initiative",
        description: "Ensuring 24x7 clean water supply to all households",
        status: "Planning Phase"
      }
    ]
  },
  {
    id: 2,
    name: "Sunita Patel",
    position: "Sarpanch",
    area: "Entire Village",
    party: "Village Development Party",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    contact: {
      phone: "+91 98765 43211",
      email: "sunita.sarpanch@email.com",
      office: "Gram Panchayat Office, Center Point"
    },
    bio: "Working towards holistic village development with special focus on women empowerment and education. Former social worker with 15 years of experience.",
    wardMap: [28.6129, 77.2295],
    responsibilities: [
      "Overall village administration",
      "Women empowerment programs",
      "Education initiatives",
      "Healthcare infrastructure"
    ],
    initiatives: [
      {
        title: "Women Self-Help Groups",
        description: "Establishing 20+ self-help groups for women entrepreneurship",
        status: "Completed"
      },
      {
        title: "Digital Literacy Program",
        description: "Training villagers in digital skills and online services",
        status: "Ongoing"
      }
    ]
  },
  {
    id: 3,
    name: "Ajay Singh",
    position: "Ward Councillor",
    area: "Ward 3 - North Zone",
    party: "People's Alliance",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    contact: {
      phone: "+91 98765 43212",
      email: "ajay.ward3@email.com",
      office: "Community Center, North Zone"
    },
    bio: "Young and dynamic leader focused on technology integration in governance and youth development programs. Engineering graduate turned public servant.",
    wardMap: [28.6145, 77.2310],
    responsibilities: [
      "Youth development programs",
      "Digital governance implementation",
      "Sports infrastructure",
      "Ward 3 development"
    ],
    initiatives: [
      {
        title: "Smart Village Project",
        description: "Implementing digital solutions for village services",
        status: "Planning Phase"
      },
      {
        title: "Youth Sports League",
        description: "Organizing inter-ward sports competitions",
        status: "Ongoing"
      }
    ]
  },
  {
    id: 4,
    name: "Priya Sharma",
    position: "Education Officer",
    area: "Education Department",
    party: "Independent",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    contact: {
      phone: "+91 98765 43213",
      email: "priya.education@email.com",
      office: "Education Office, Near Primary School"
    },
    bio: "Dedicated to improving educational infrastructure and quality. Former principal with 20 years of experience in education sector.",
    wardMap: [28.6132, 77.2285],
    responsibilities: [
      "School infrastructure development",
      "Teacher training programs",
      "Student scholarship schemes",
      "Educational quality monitoring"
    ],
    initiatives: [
      {
        title: "Digital Classroom Initiative",
        description: "Equipping all schools with smart classroom technology",
        status: "Completed"
      },
      {
        title: "After-School Tutoring",
        description: "Free tutoring for underprivileged students",
        status: "Ongoing"
      }
    ]
  },
  {
    id: 5,
    name: "Vikram Mehta",
    position: "Health Officer",
    area: "Health Department",
    party: "United Front",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    contact: {
      phone: "+91 98765 43214",
      email: "vikram.health@email.com",
      office: "Health Center, Main Road"
    },
    bio: "Medical professional turned administrator. Focused on improving healthcare accessibility and preventive care programs.",
    wardMap: [28.6120, 77.2300],
    responsibilities: [
      "Healthcare facility management",
      "Public health programs",
      "Medical camp organization",
      "Health awareness campaigns"
    ],
    initiatives: [
      {
        title: "Mobile Health Clinic",
        description: "Weekly mobile clinic for remote areas",
        status: "Ongoing"
      },
      {
        title: "Vaccination Drive",
        description: "Complete vaccination coverage for all children",
        status: "Completed"
      }
    ]
  },
  {
    id: 6,
    name: "Anita Desai",
    position: "Women & Child Officer",
    area: "Women & Child Department",
    party: "Village Development Party",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    contact: {
      phone: "+91 98765 43215",
      email: "anita.wcd@email.com",
      office: "Women Center, Market Area"
    },
    bio: "Social activist working for women and child welfare. Instrumental in implementing various government schemes at village level.",
    wardMap: [28.6138, 77.2292],
    responsibilities: [
      "Women empowerment programs",
      "Child welfare schemes",
      "Gender equality initiatives",
      "Skill development for women"
    ],
    initiatives: [
      {
        title: "Working Women Hostel",
        description: "Safe accommodation for working women",
        status: "Planning Phase"
      },
      {
        title: "Child Care Centers",
        description: "Day care facilities for working mothers",
        status: "Ongoing"
      }
    ]
  }
];







export const villageInfo = {
  name: " आपला Jath",
  district: "Jath",
  state: "Sample State",
  population: "5,200",
  area: "12.5 sq km",
  established: "1850",
  description: "A peaceful village known for its agricultural heritage, community spirit, and balanced approach to modern development while preserving traditional values. Our village is a model of sustainable living and community cooperation.",
  location: {
    latitude: 28.6129,
    longitude: 77.2295
  },
  demographics: {
    literacyRate: "85%",
    employmentRate: "78%",
    averageIncome: "₹25,000 per month",
    mainOccupations: ["Agriculture", "Small Business", "Government Service", "Handicrafts"]
  },
  infrastructure: {
    roads: "25 km",
    electricity: "100% coverage",
    waterSupply: "98% coverage",
    internet: "95% coverage"
  }
};


// Add this after the mockLeaders array

export const politicalRepresentatives = [
  {
    id: 1,
    name: "GOPICHAND KUNDLIK PADALKAR",
    position: "Member of Legislative Assembly (MLA)",
    constituency: "Jath",
    party: "Bharatiya Janata Party",
    partyColor: "bg-orange-100 text-orange-800 border-orange-300",
    photo: "https://files.prokerala.com/news/photos/imgs/1024/gopichand-padalkar-1535770.jpg",
    contact: {
      phone: "+91 98765 43220",
      email: "GOPICHANDPADALKAR.mla@email.com",
      office: "MLA Office, District Headquarters",
      website: "www.rajeshverma.com"
    },
    bio: "Serving as MLA since 2018. Focused on rural development, education, and healthcare infrastructure. Former professor of political science.",
    responsibilities: [
      "Representing constituency in state assembly",
      "Allocating local area development funds",
      "Addressing public grievances in the constituency",
      "Overseeing implementation of state government schemes"
    ],
    achievements: [
      "Secured ₹50 crore for road development in the region",
      "Established 10 new primary health centers",
      "Implemented digital literacy program in 50 villages",
      "Started scholarship program for meritorious students"
    ],
    currentInitiatives: [
      "Smart Village Project for digital infrastructure",
      "Agricultural modernization program",
      "Women entrepreneurship development"
    ]
  },
  {
    id: 2,
    name: "Vishal Prakashbapu Patil",
    position: "Member of Parliament (MP)",
    constituency: "Central District Parliamentary Constituency",
    party: "Indian National Congress",
    partyColor: "bg-blue-100 text-blue-800 border-blue-300",
    photo: "https://images.tv9hindi.com/wp-content/uploads/2024/06/vishal-patil.jpg?w=1280",
    contact: {
      phone: "+91 98765 43221",
      email: "vishalpatil.mp@email.com",
      office: "MP Office, Parliament House, New Delhi",
      website: "www.anjalipatil.mp.in"
    },
    bio: "Serving as MP since 2014. Advocate for women's rights and rural development. Former social activist and lawyer.",
    responsibilities: [
      "Representing constituency in Parliament",
      "Participating in law-making process",
      "Utilizing MPLADS funds for development",
      "Addressing national-level issues affecting constituency"
    ],
    achievements: [
      "Secured ₹100 crore for railway infrastructure",
      "Established women's college in the district",
      "Implemented clean drinking water project in 100 villages",
      "Started skill development centers for youth"
    ],
    currentInitiatives: [
      "National Rural Employment Guarantee Scheme enhancement",
      "Digital India implementation at grassroots",
      "Sustainable agriculture practices promotion"
    ]
  },
  {
    id: 3,
    name: "Shri Mohan Singh",
    position: "Sarpanch",
    constituency: "Jath Gram Panchayat",
    party: "Independent",
    partyColor: "bg-gray-100 text-gray-800 border-gray-300",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    contact: {
      phone: "+91 98765 43222",
      email: "mohan.sarpanch@email.com",
      office: "Gram Panchayat Office, Green Valley Village",
      website: null
    },
    bio: "Elected as Sarpanch in 2020. Former agriculture officer with 25 years of experience. Focus on village infrastructure and youth employment.",
    responsibilities: [
      "Heading the Gram Panchayat",
      "Implementing rural development schemes",
      "Maintaining village infrastructure",
      "Resolving local disputes and issues"
    ],
    achievements: [
      "Completed 100% toilet construction under Swachh Bharat",
      "Implemented solar street lighting project",
      "Started village library and digital center",
      "Improved water supply system"
    ],
    currentInitiatives: [
      "Village beautification project",
      "Organic farming promotion",
      "Youth skill development program"
    ]
  },
  {
    id: 4,
    name: "Kavita Reddy",
    position: "Zilla Parishad Member",
    constituency: "District Zone 3",
    party: "Telangana Rashtra Samithi",
    partyColor: "bg-pink-100 text-pink-800 border-pink-300",
    photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face",
    contact: {
      phone: "+91 98765 43223",
      email: "kavita.zp@email.com",
      office: "Zilla Parishad Office, District Headquarters",
      website: null
    },
    bio: "Young dynamic leader focused on education and women empowerment. Former teacher and social worker.",
    responsibilities: [
      "Overseeing development projects in district zone",
      "Monitoring implementation of government schemes",
      "Addressing issues at district level",
      "Coordinating between villages and district administration"
    ],
    achievements: [
      "Established 5 new Anganwadi centers",
      "Implemented midday meal quality improvement",
      "Started computer education in government schools",
      "Organized health camps in remote areas"
    ],
    currentInitiatives: [
      "Digital education in government schools",
      "Women self-help group expansion",
      "Child nutrition improvement program"
    ]
  }
];