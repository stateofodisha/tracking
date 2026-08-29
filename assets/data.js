/* =========================================================
   State of Odisha — Govt Project Tracker
   Project data
   -----------------------------------------------------------
   Add a new project by pushing another object into PROJECTS.
   Required fields: id, title, category, announcedOn, status,
   summary, location, hashtag
   Optional: budget, detailUrl (external/custom page),
   timeline (array of {date, text, badge})
   status.type must be one of:
     'stuck'      -> red, pulsing "stuck" indicator
     'progress'   -> amber, in motion
     'completed'  -> green, done
     'review'     -> grey, under review / announced only
   ========================================================= */

const PROJECTS = [
  {
    id: "bbi-t3",
    title: "Bhubaneswar Airport — T3 Terminal",
    category: "Infrastructure",
    announcedOn: "2025-08-25",
    status: { type: "stuck", label: "Days Pending" },
    summary: "New integrated terminal for Biju Patnaik International Airport, promised to reflect Odisha's temple heritage in its design.",
    location: "Bhubaneswar, Khordha",
    budget: "₹1,200 Cr (est.)",
    hashtag: "#T3ForBhubaneswar",
    detailUrl: "projects/bbi-t3-original.html",
    timeline: [
      { date: "Aug 25, 2025", text: "Union Minister announces T3, design to reflect Odisha's heritage", badge: "Announced" },
      { date: "Nov 2025", text: "Detailed project report awaited from AAI", badge: "Pending" },
      { date: "Today", text: "No construction start date confirmed yet", badge: "Stuck" }
    ]
  },
  {
    id: "puri-konark-marine-drive",
    title: "Puri–Konark Marine Drive Beautification",
    category: "Tourism & Urban Development",
    announcedOn: "2024-11-10",
    status: { type: "progress", label: "In Progress" },
    summary: "Beachfront corridor linking Puri and Konark with promenades, lighting and heritage-styled facades along the marine drive.",
    location: "Puri district",
    budget: "₹412 Cr",
    hashtag: "#PuriKonarkMarineDrive",
    timeline: [
      { date: "Nov 10, 2024", text: "Odisha Tourism announces beautification corridor", badge: "Announced" },
      { date: "Feb 2025", text: "Contractor mobilised, phase 1 earthwork begins", badge: "Started" },
      { date: "Jul 2025", text: "Promenade lighting tender floated for phase 2", badge: "Ongoing" }
    ]
  },
  {
    id: "cuttack-flyover",
    title: "Cuttack Smart City Flyover — Badambadi",
    category: "Urban Infrastructure",
    announcedOn: "2023-05-02",
    status: { type: "stuck", label: "Days Delayed" },
    summary: "Elevated flyover to decongest the Badambadi bus-stand junction, originally slated for a 24-month completion.",
    location: "Cuttack",
    budget: "₹268 Cr",
    hashtag: "#CuttackFlyover",
    timeline: [
      { date: "May 2, 2023", text: "Tender awarded, groundbreaking held", badge: "Started" },
      { date: "Jun 2024", text: "Original deadline passes, 41% work complete", badge: "Missed deadline" },
      { date: "Today", text: "Revised deadline still awaited from CDA", badge: "Stuck" }
    ]
  },
  {
    id: "bbs-puri-rail-doubling",
    title: "Bhubaneswar–Puri Rail Line Doubling",
    category: "Railways",
    announcedOn: "2022-01-15",
    status: { type: "completed", label: "Completed" },
    summary: "Doubling of the Bhubaneswar–Puri rail line to cut travel time and add capacity for pilgrim traffic.",
    location: "Khordha & Puri",
    budget: "₹696 Cr",
    hashtag: "#RailDoubling",
    timeline: [
      { date: "Jan 15, 2022", text: "East Coast Railway sanctions doubling project", badge: "Announced" },
      { date: "2023", text: "Civil works completed in phases", badge: "Progress" },
      { date: "Mar 2025", text: "Commissioned and opened for traffic", badge: "Completed" }
    ]
  },
  {
    id: "paradip-port-expansion",
    title: "Paradip Port Expansion — Phase II",
    category: "Ports & Logistics",
    announcedOn: "2024-03-20",
    status: { type: "review", label: "Under Review" },
    summary: "Additional deep-draft berths and container handling capacity at Paradip Port under Sagarmala.",
    location: "Paradip, Jagatsinghpur",
    budget: "₹1,890 Cr (proposed)",
    hashtag: "#ParadipPortExpansion",
    timeline: [
      { date: "Mar 20, 2024", text: "Union Ministry proposes Phase II expansion", badge: "Proposed" },
      { date: "Sep 2024", text: "Environmental clearance filed", badge: "Under review" }
    ]
  },
  {
    id: "rourkela-water-supply",
    title: "Rourkela Steel City Water Supply Augmentation",
    category: "Public Utilities",
    announcedOn: "2025-01-05",
    status: { type: "progress", label: "In Progress" },
    summary: "New intake wells and pipeline network to fix chronic water shortage in Rourkela's steel township wards.",
    location: "Rourkela, Sundargarh",
    budget: "₹154 Cr",
    hashtag: "#RourkelaWaterSupply",
    timeline: [
      { date: "Jan 5, 2025", text: "RMC announces augmentation scheme", badge: "Announced" },
      { date: "Apr 2025", text: "Pipeline laying begins in Ward 12–18", badge: "Started" }
    ]
  }
];
