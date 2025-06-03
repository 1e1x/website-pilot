"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// Mock user data - in real app this would come from your database
const talentData = [
  {
    id: "user-123",
    firstName: "Hussain",
    lastName: "Abdul Kadhir",
    username: "hussain_ak",
    bio: "Passionate data scientist and UI designer building the future of innovation in Qatar.",
    location: "Doha, Qatar",
    avatar_url: "/placeholder.svg?height=120&width=120",
    roles: ["Data Scientist", "UI Designer"],
    skills: ["Python", "SQL", "Figma", "Data Visualization", "UX Research"],
    projects: 8,
  },
  {
    id: "user-124",
    firstName: "Aman",
    lastName: "Mohammed",
    username: "aman_m",
    bio: "Web developer specializing in React and Node.js. Building innovative solutions for Qatar's tech ecosystem.",
    location: "Doha, Qatar",
    avatar_url: "/placeholder.svg?height=120&width=120",
    roles: ["Web Developer"],
    skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "Git"],
    projects: 12,
  },
  {
    id: "user-125",
    firstName: "Sherin",
    lastName: "Al-Najjar",
    username: "sherin",
    bio: "Frontend developer with a passion for creating beautiful, responsive interfaces.",
    location: "Doha, Qatar",
    avatar_url: "/placeholder.svg?height=120&width=120",
    roles: ["Frontend Developer"],
    skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    projects: 15,
  },
  {
    id: "user-126",
    firstName: "Mishal",
    lastName: "Al-Thani",
    username: "mishal",
    bio: "Backend developer focused on building scalable APIs and database solutions.",
    location: "Doha, Qatar",
    avatar_url: "/placeholder.svg?height=120&width=120",
    roles: ["Backend Developer"],
    skills: ["Python", "Django", "REST APIs", "PostgreSQL", "Cloud Deployment"],
    projects: 10,
  },
  {
    id: "user-127",
    firstName: "Shahim",
    lastName: "Khan",
    username: "shahim",
    bio: "Videographer and motion graphics artist creating stunning visual content.",
    location: "Doha, Qatar",
    avatar_url: "/placeholder.svg?height=120&width=120",
    roles: ["Videographer", "Motion Graphics Artist"],
    skills: ["Adobe Premiere Pro", "After Effects", "Cinematography", "Storyboarding"],
    projects: 6,
  },
  {
    id: "user-128",
    firstName: "Zaid",
    lastName: "Al-Mahmoud",
    username: "zaid",
    bio: "Videographer and social media manager with a knack for engaging content.",
    location: "Doha, Qatar",
    avatar_url: "/placeholder.svg?height=120&width=120",
    roles: ["Videographer", "Social Media Manager"],
    skills: ["Videography", "Content Creation", "Community Management", "Social Media Strategy"],
    projects: 9,
  },
]

export default function TalentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  // Extract all unique skills and roles for filters
  const allSkills = Array.from(new Set(talentData.flatMap((user) => user.skills)))
  const allRoles = Array.from(new Set(talentData.flatMap((user) => user.roles)))

  // Filter talent based on search term, skills, and roles
  const filteredTalent = talentData.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSkills = selectedSkills.length === 0 || selectedSkills.every((skill) => user.skills.includes(skill))

    const matchesRoles = selectedRoles.length === 0 || selectedRoles.some((role) => user.roles.includes(role))

    return matchesSearch && matchesSkills && matchesRoles
  })

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl">1e1x</div>
            <div className="hidden md:flex space-x-8">
              <a href="/#projects" className="text-gray-600 hover:text-black transition-colors">
                Projects
              </a>
              <a href="/#talent" className="text-gray-600 hover:text-black transition-colors">
                Talent
              </a>
              <a href="/#arena" className="text-gray-600 hover:text-black transition-colors">
                Arena
              </a>
              <a href="/#workshops" className="text-gray-600 hover:text-black transition-colors">
                Workshops
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <a href="/login">Sign In</a>
              </Button>
              <Button size="sm">
                <a href="/login">Log In</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Discover Talent 🌟</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with brilliant minds driving innovation in Qatar. Find collaborators, mentors, or future team
              members.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by name, username, or bio..."
                className="pl-10 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Filter by Role:</h3>
                <div className="flex flex-wrap gap-2">
                  {allRoles.map((role) => (
                    <Badge
                      key={role}
                      variant={selectedRoles.includes(role) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleRole(role)}
                    >
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Filter by Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Talent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalent.map((user) => (
              <a href={`/profile/${user.username}`} key={user.id} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={user.avatar_url || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">@{user.username}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {user.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="bg-blue-100 text-blue-700">
                            {role}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-gray-700 line-clamp-2">{user.bio}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Location:</span> {user.location}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Projects:</span> {user.projects}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {user.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {filteredTalent.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No talent found matching your criteria</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSkills([])
                  setSelectedRoles([])
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}