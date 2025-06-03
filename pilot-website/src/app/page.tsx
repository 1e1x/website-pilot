"use client";

import type React from "react";
import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  User,
  Calendar,
  Trophy,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, } from "~/components/ui/card";
import Link from "next/link";
import { auth } from "~/server/auth";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Navigation from "~/components/ui/navigation";

// Data definitions
const membersData = [
  {
    id: "mem-hussain",
    name: "Hussain Abdul Kadhir",
    roles: ["Data Scientist", "UI Designer"],
    skills: ["Python", "SQL", "Figma", "Data Visualization", "UX Research"],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-aman",
    name: "Aman Mohammed",
    roles: ["Web Developer"],
    skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "Git"],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-sherin",
    name: "Sherin",
    roles: ["Frontend Developer"],
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-mishal",
    name: "Mishal",
    roles: ["Backend Developer"],
    skills: ["Python", "Django", "REST APIs", "PostgreSQL", "Cloud Deployment"],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-shahim",
    name: "Shahim",
    roles: ["Videographer", "Motion Graphics Artist"],
    skills: [
      "Adobe Premiere Pro",
      "After Effects",
      "Cinematography",
      "Storyboarding",
    ],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-zaid",
    name: "Zaid",
    roles: ["Videographer", "Social Media Manager"],
    skills: [
      "Videography",
      "Content Creation",
      "Community Management",
      "Social Media Strategy",
    ],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-amin",
    name: "Amin",
    roles: ["Graphic Designer", "Social Media Specialist"],
    skills: [
      "Adobe Photoshop",
      "Illustrator",
      "InDesign",
      "Branding",
      "Digital Marketing",
    ],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-naser",
    name: "Naser",
    roles: ["Deep Learning Engineer", "Database Administrator"],
    skills: ["TensorFlow", "PyTorch", "SQL", "Database Design", "Big Data"],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-abdulla",
    name: "Abdulla",
    roles: ["Cybersecurity Specialist", "Python Developer"],
    skills: [
      "Network Security",
      "Penetration Testing",
      "Python Scripting",
      "Ethical Hacking",
    ],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "mem-abdelhakim",
    name: "Abdelhakim",
    roles: ["Frontend Developer"],
    skills: ["Vue.js", "HTML", "CSS", "UI Development", "Git"],
    avatar_url: "/placeholder.svg?height=100&width=100",
  },
];

const projectsData = [
  {
    id: "proj-1e1x-website",
    name: "1E1X WEBSITE",
    description:
      "The official digital hub for 1E1X, showcasing all our innovative projects, talented members, exciting contests, and enriching workshops. Your go-to place for all things 1E1X!",
    image_url: "/placeholder.svg?height=200&width=300",
    owner_id: "mem-hussain",
    team_members: ["mem-sherin", "mem-mishal", "mem-aman", "mem-hussain"],
    tags: ["Web Development", "Platform", "UI/UX", "Community"],
    likes_count: 42,
    comments_count: 15,
  },
  {
    id: "proj-reli",
    name: "RELI",
    description:
      "RELI is an ambitious project focused on sustainable energy solutions, aiming to revolutionize urban living through smart, eco-friendly technologies. More details coming soon!",
    image_url: "/placeholder.svg?height=200&width=300",
    owner_id: "mem-sherin",
    team_members: [],
    tags: ["Sustainability", "Green Tech", "Innovation"],
    likes_count: 18,
    comments_count: 5,
  },
  {
    id: "proj-pinterest-food",
    name: "PINTEREST FOR FOOD",
    description:
      "An innovative platform designed to help food enthusiasts save and organize their favorite food reels in a highly UI-friendly way. It extracts and displays food and restaurant offers as interactive cards, making discovering new tastes a delightful experience.",
    image_url: "/placeholder.svg?height=200&width=300",
    owner_id: "mem-sherin",
    team_members: ["mem-sherin", "mem-abdulla", "mem-abdelhakim"],
    tags: ["FoodTech", "Social Media", "UI/UX", "Mobile App", "AI"],
    likes_count: 78,
    comments_count: 22,
  },
  {
    id: "proj-ai-study-assistant",
    name: "AI-Powered Study Assistant",
    description:
      "Get ready to transform how students learn! Our AI assistant is designed to be the ultimate study buddy, offering personalized plans, instant answers, and super-smart quizzes. We're building the future of education, one brilliant mind at a time!",
    image_url: "/placeholder.svg?height=200&width=300",
    owner_id: "mem-hussain",
    team_members: ["mem-hussain", "mem-aman", "mem-naser", "mem-abdulla"],
    tags: ["AI", "Education", "Machine Learning", "EdTech"],
    likes_count: 156,
    comments_count: 43,
  },
];

const contestsData = [
  {
    id: "con-promptathon",
    name: "Promptathon",
    description:
      "Unleash your creativity in crafting innovative AI prompts and see who can generate the most impactful outputs. A challenge for AI enthusiasts!",
    status: "Upcoming",
    event_date: "2025-08-15",
    prize_pool: "QAR 10,000",
    teams_registered_count: 12,
  },
  {
    id: "con-vibecoding",
    name: "Vibecoding Challenge",
    description:
      "A high-energy coding competition focusing on speed, style, and effective problem-solving. Show off your coding rhythm and debugging prowess!",
    status: "Upcoming",
    event_date: "2025-08-20",
    prize_pool: "QAR 25,000",
    teams_registered_count: 8,
  },
  {
    id: "con-competitive-prog",
    name: "Competitive Programming Night",
    description:
      "Test your algorithmic skills and compete with the best in challenging coding puzzles. Sharpen your logic and problem-solving abilities.",
    status: "Upcoming",
    event_date: "2025-08-05",
    prize_pool: "QAR 5,000",
    teams_registered_count: 25,
  },
  {
    id: "con-hack-evening",
    name: "Hack Evening",
    description:
      "A rapid-fire hackathon where teams build quick prototypes to solve pressing issues in just a few hours. Innovation under pressure!",
    status: "Upcoming",
    event_date: "2025-08-25",
    prize_pool: "QAR 15,000",
    teams_registered_count: 18,
  },
];

const workshopsData = [
  {
    id: "ws-foundations",
    name: "Foundations: Bootcamp for Rapid Prototyping in the Age of Vibe Coding",
    description:
      "Learn the essentials of quick prototyping and modern 'vibe coding' techniques to bring your ideas to life faster than ever. Perfect for aspiring innovators!",
    image_url: "/placeholder.svg?height=180&width=300",
    event_date: "2025-06-01",
    event_time: "10:00 AM",
    location: "Online",
  },
  {
    id: "ws-web-dev",
    name: "Web Development Unlocked",
    description:
      "Demystify the world of web development! This workshop covers HTML, CSS, JavaScript, and modern frameworks to get you building dynamic websites from scratch.",
    image_url: "/placeholder.svg?height=180&width=300",
    event_date: "2025-06-08",
    event_time: "02:00 PM",
    location: "Campus Hub",
  },
  {
    id: "ws-machine-learning",
    name: "Machine Learning Unlocked",
    description:
      "Dive into the basics of Machine Learning, understanding core algorithms, data processing, and building your first predictive models. No prior ML experience needed!",
    image_url: "/placeholder.svg?height=180&width=300",
    event_date: "2025-06-15",
    event_time: "04:00 PM",
    location: "Innovation Center",
  },
  {
    id: "ws-api-fastapi",
    name: "API Forgery - Discovering the Power of API using FastAPI",
    description:
      "Explore how APIs work and learn to build powerful, efficient APIs using FastAPI, a modern Python web framework. Master the art of backend communication.",
    image_url: "/placeholder.svg?height=180&width=300",
    event_date: "2025-06-22",
    event_time: "10:00 AM",
    location: "Online",
  },
];

// Helper function to get member by ID
function getMemberById(memberId: string) {
  return membersData.find((member) => member.id === memberId);
}

// Carousel component
function Carousel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef) {
      const scrollAmount = 320;
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : scrollPosition + scrollAmount;

      containerRef.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full bg-white shadow-lg"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div
        ref={setContainerRef}
        className={`flex gap-6 overflow-x-hidden scroll-smooth pb-4 ${className}`}
      >
        {children}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full bg-white shadow-lg"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Project Card component
function ProjectCard({ project }: { project: (typeof projectsData)[0] }) {
  const owner = getMemberById(project.owner_id);

  return (
    <a href={`/project/${project.id}`} className="block">
      <Card className="w-80 flex-shrink-0 transition-shadow hover:shadow-lg">
        <div className="aspect-video overflow-hidden rounded-t-lg bg-gray-100">
          <img
            src={project.image_url || "/placeholder.svg"}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="mb-2 truncate text-lg font-semibold">
            {project.name}
          </h3>
          <p className="mb-4 line-clamp-3 text-sm text-gray-600">
            {project.description}
          </p>
          <div className="mb-3 flex items-center text-sm text-gray-500">
            <User className="mr-2 h-4 w-4" />
            <span>{owner ? owner.name : "Unknown"}</span>
          </div>
          <div className="mb-4 flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Heart className="mr-1 h-4 w-4" />
              <span>{project.likes_count}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="mr-1 h-4 w-4" />
              <span>{project.comments_count}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

// Talent Card component
function TalentCard({ member }: { member: (typeof membersData)[0] }) {
  return (
    <Card className="w-72 flex-shrink-0 transition-shadow hover:shadow-lg">
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <img
            src={member.avatar_url || "/placeholder.svg"}
            alt={member.name}
            className="mx-auto h-20 w-20 rounded-full border-2 border-gray-200 object-cover"
          />
        </div>
        <h3 className="mb-1 text-lg font-semibold">{member.name}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {member.roles.join(", ")}
        </p>
        <p className="mb-4 line-clamp-3 text-xs text-gray-500">
          {member.skills.join(", ")}
        </p>
        <Button size="sm" className="w-full">
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}

// Contest Card component
function ContestCard({ contest }: { contest: (typeof contestsData)[0] }) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-yellow-100 text-yellow-800";
      case "live":
        return "bg-green-100 text-green-800";
      case "past":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-80 flex-shrink-0 transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <span
          className={`mb-3 inline-block rounded px-3 py-1 text-xs font-medium ${getStatusColor(contest.status)}`}
        >
          {contest.status}
        </span>
        <h3 className="mb-2 text-lg font-semibold">{contest.name}</h3>
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {contest.description}
        </p>
        <div className="mb-4 space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{contest.event_date}</span>
          </div>
          <div className="flex items-center">
            <Trophy className="mr-2 h-4 w-4" />
            <span>{contest.prize_pool}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{contest.teams_registered_count} Teams</span>
          </div>
        </div>
        <Button size="sm" className="w-full">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}

// Workshop Card component
function WorkshopCard({ workshop }: { workshop: (typeof workshopsData)[0] }) {
  return (
    <Card className="w-80 flex-shrink-0 transition-shadow hover:shadow-lg">
      <div className="aspect-video overflow-hidden rounded-t-lg bg-gray-100">
        <img
          src={workshop.image_url || "/placeholder.svg"}
          alt={workshop.name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
          {workshop.name}
        </h3>
        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {workshop.description}
        </p>
        <div className="mb-4 space-y-1 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{workshop.event_date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{workshop.event_time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{workshop.location}</span>
          </div>
        </div>
        <Button size="sm" className="w-full">
          Details
        </Button>
      </CardContent>
    </Card>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Object | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const currentSession = await getSession();
      setSession(currentSession);

      // if (!currentSession) {
      //   router.push("/login");
      //   console.log("No session", currentSession);
      // } else {
      //   console.log("Session found", currentSession);
      // }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* <Navigation/> */}

      {/* Hero Section */}
      <section className="bg-gray-50 px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-black md:text-5xl">
            Ignite Your Ideas. Build the Future. 🔥
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Connect with brilliant minds, launch groundbreaking projects, and
            elevate your skills in Qatar's premier innovation ecosystem.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="cursor-pointer px-8">
              Explore Projects
            </Button>
            <Button variant="outline" size="lg" className="cursor-pointer px-8">
              Find Talent
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Featured Projects ✨
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Dive into innovative ventures shaping tomorrow. Discover, support,
              and join impactful projects!
            </p>
          </div>
          <Carousel>
            {projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Carousel>
          <div className="mt-12 text-center">
            <Button variant="outline">View All Projects</Button>
          </div>
        </div>
      </section>

      {/* Featured Talent */}
      <section id="talent" className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Featured Talent 🌟
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Meet the brilliant minds driving innovation. Find collaborators,
              mentors, or future team members.
            </p>
          </div>
          <Carousel>
            {membersData.map((member) => (
              <TalentCard key={member.id} member={member} />
            ))}
          </Carousel>
          <div className="mt-12 text-center">
            <Button variant="outline">View All Talent</Button>
          </div>
        </div>
      </section>

      {/* Arena Challenges */}
      <section id="arena" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Arena Challenges 🏆
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Test your skills, compete, and win! Join our thrilling coding
              competitions and hackathons.
            </p>
          </div>
          <Carousel>
            {contestsData.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </Carousel>
          <div className="mt-12 text-center">
            <Button variant="outline">View All Challenges</Button>
          </div>
        </div>
      </section>

      {/* Workshops & Training */}
      <section id="workshops" className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Workshops & Training 📚
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Level up your expertise with our hands-on workshops and intensive
              training programs.
            </p>
          </div>
          <Carousel>
            {workshopsData.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </Carousel>
          <div className="mt-12 text-center">
            <Button variant="outline">View All Workshops</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-gray-400 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="mb-6">© 2025 1e1x. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/1e1x_qatar/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/1e1x_qatar/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/1e1x/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/1e1x.qatar/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
