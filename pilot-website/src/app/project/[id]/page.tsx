"use client"

import { use } from "react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"

// Data definitions (shared with main page)
const membersData = [
	{
		id: "mem-hussain",
		name: "Hussain Abdul Kadhir",
		roles: ["Data Scientist", "UI Designer"],
		skills: ["Python", "SQL", "Figma", "Data Visualization", "UX Research"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-aman",
		name: "Aman Mohammed",
		roles: ["Web Developer"],
		skills: ["JavaScript", "React", "Node.js", "HTML/CSS", "Git"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-sherin",
		name: "Sherin",
		roles: ["Frontend Developer"],
		skills: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-mishal",
		name: "Mishal",
		roles: ["Backend Developer"],
		skills: ["Python", "Django", "REST APIs", "PostgreSQL", "Cloud Deployment"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-shahim",
		name: "Shahim",
		roles: ["Videographer", "Motion Graphics Artist"],
		skills: ["Adobe Premiere Pro", "After Effects", "Cinematography", "Storyboarding"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-zaid",
		name: "Zaid",
		roles: ["Videographer", "Social Media Manager"],
		skills: ["Videography", "Content Creation", "Community Management", "Social Media Strategy"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-amin",
		name: "Amin",
		roles: ["Graphic Designer", "Social Media Specialist"],
		skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Branding", "Digital Marketing"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-naser",
		name: "Naser",
		roles: ["Deep Learning Engineer", "Database Administrator"],
		skills: ["TensorFlow", "PyTorch", "SQL", "Database Design", "Big Data"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-abdulla",
		name: "Abdulla",
		roles: ["Cybersecurity Specialist", "Python Developer"],
		skills: ["Network Security", "Penetration Testing", "Python Scripting", "Ethical Hacking"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
	{
		id: "mem-abdelhakim",
		name: "Abdelhakim",
		roles: ["Frontend Developer"],
		skills: ["Vue.js", "HTML", "CSS", "UI Development", "Git"],
		avatar_url: "/placeholder.svg?height=80&width=80",
	},
]

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
]

// Helper function to get member by ID
function getMemberById(memberId: string) {
	return membersData.find((member) => member.id === memberId)
}

// Social media posts data
const socialPosts = [
	{
		platform: "Twitter",
		icon: "🐦",
		content: "Just hit a major milestone with our AI model! Accuracy is soaring! #EdTechRevolution #AIforGood",
		link: "https://twitter.com/example/status/12345",
	},
	{
		platform: "Instagram",
		icon: "📸",
		content: "Sneak peek at our new UI design! What do you think? Drop a comment! 👇 #DesignGoals #FutureOfLearning",
		link: "https://www.instagram.com/p/example_post_id/",
	},
	{
		platform: "LinkedIn",
		icon: "💼",
		content:
			"Thrilled to announce we're expanding the team! Looking for passionate Python devs to join our mission! Apply now! #Hiring #TechJobsQatar",
		link: "https://www.linkedin.com/posts/example_company_id",
	},
	{
		platform: "Facebook",
		icon: "📘",
		content: "Our weekly team huddle was full of breakthroughs! Exciting things are coming! #Teamwork #Innovation",
		link: "https://www.facebook.com/example/posts/12345",
	},
]

// Progress updates data
const progressUpdates = [
	{
		date: "May 20, 2025",
		title: "AI Model Breakthrough!",
		emoji: "🎉",
		description:
			"We've successfully completed the initial training phase for our core AI model, achieving an impressive 85% accuracy rate! This means our assistant is getting smarter by the day, ready to deliver precise and helpful responses. Next up: fine-tuning and expanding its knowledge base!",
	},
	{
		date: "May 10, 2025",
		title: "UI/UX Takes Shape!",
		emoji: "✨",
		description:
			"Our design team has finalized all the wireframes and high-fidelity mockups! The app is looking sleek, intuitive, and super user-friendly. Front-end development is now in full swing, bringing these beautiful designs to life. We're focusing on a seamless and engaging experience for every student.",
	},
	{
		date: "April 25, 2025",
		title: "User Feedback Frenzy!",
		emoji: "🗣️",
		description:
			"We held our first round of user feedback sessions with a diverse group of students. The insights were invaluable! We're already implementing key suggestions to make the assistant even more helpful and enjoyable. Thanks to everyone who participated – your input is gold!",
	},
	{
		date: "April 1, 2025",
		title: "Project Ignition!",
		emoji: "🔥",
		description:
			"It's official! The AI-Powered Study Assistant project has officially launched! Our core team is assembled, ideas are flowing, and the energy is electric. We're kicking things off with foundational research and setting up our development environment. The journey has just begun!",
	},
]

// Forum threads data
const forumThreads = [
	{
		title: "Deep Dive: Choosing the Right AI Libraries for Educational Platforms",
		author: "Sarah Al-Mahmoud",
		replies: 3,
	},
	{
		title: "Your Thoughts: UI/UX for Adaptive Quizzes - Make it Fun!",
		author: "Omar Al-Ansari",
		replies: 5,
	},
	{
		title: "Opportunity Knocks: Calling All Content Reviewers!",
		author: "Fatima Al-Kuwari",
		replies: 2,
	},
]

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)

	// Find the project by ID, default to AI Study Assistant if not found
	const project = projectsData.find((p) => p.id === id) ?? projectsData.find((p) => p.id === "proj-ai-study-assistant")!

	return (
		<div className="min-h-screen bg-white">
			{/* Navigation */}
			<nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="font-bold text-xl">1e1x</div>
						<div className="hidden md:flex space-x-8">
							<Link href="/#projects" className="text-gray-600 hover:text-black transition-colors">
								Projects
							</Link>
							<Link href="/#talent" className="text-gray-600 hover:text-black transition-colors">
								Talent
							</Link>
							<Link href="/#arena" className="text-gray-600 hover:text-black transition-colors">
								Arena
							</Link>
							<Link href="/#workshops" className="text-gray-600 hover:text-black transition-colors">
								Workshops
							</Link>
						</div>
						<div className="flex items-center space-x-4">
							<Button variant="outline" size="sm">
								Sign In
							</Button>
							<Button size="sm">Log In</Button>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
						{project.name}: Leveling Up Learning! 🚀
					</h1>
					<p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{project.description}</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" className="px-8">
							Join the Adventure!
						</Button>
						<Button variant="outline" size="lg" className="px-8">
							Meet the Brains Behind It
						</Button>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Our Awesome Team! 🧑‍💻</h2>
					{project.team_members && project.team_members.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{project.team_members.map((memberId) => {
								const member = getMemberById(memberId)
								if (!member) return null
								return (
									<Card key={member.id} className="text-center">
										<CardContent className="p-4">
											<Image
												src={member.avatar_url ?? "/placeholder.svg"}
												alt={member.name}
												className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-gray-200"
												fill
											/>
											<h3 className="font-semibold text-sm">{member.name}</h3>
											<p className="text-xs text-gray-600">{member.roles.join(", ")}</p>
										</CardContent>
									</Card>
								)
							})}
						</div>
					) : (
						<p className="text-center text-gray-500">No team members listed for this project yet!</p>
					)}
				</div>
			</section>

			{/* Videos Section */}
			<section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Catch Our Latest Videos! 🎬</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
							<iframe
								src="https://www.youtube.com/embed/dQw4w9WgXcQ"
								title="Project Intro Video"
								className="w-full h-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
						<div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
							<iframe
								src="https://www.youtube.com/embed/some_other_video_id"
								title="Behind the Scenes"
								className="w-full h-full"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Social Media Section */}
			<section className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">
						What We&apos;re Buzzing About on Social! 📣
					</h2>
					<div className="grid md:grid-cols-2 gap-4">
						{socialPosts.map((post, index) => (
							<Card key={index} className="bg-gray-50">
								<CardContent className="p-4">
									<div className="flex items-start gap-3">
										<span className="text-2xl">{post.icon}</span>
										<div className="flex-1">
											<p className="font-semibold text-sm mb-2">{post.platform}:</p>
											<p className="text-sm text-gray-700 mb-3">&quot;{post.content}&quot;</p>
											<Link
												href={post.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
											>
												View Post <ExternalLink className="ml-1 h-3 w-3" />
											</Link>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Pitch Deck Section */}
			<section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Our Vision in a Deck! 💡</h2>
					<Card className="text-center">
						<CardContent className="p-8">
							<p className="text-gray-600 mb-6">
								Ready to dive deeper? Our pitch deck lays out our grand vision, market potential, and how we&apos;re
								making it happen. Grab your copy!
							</p>
							<Button size="lg">Snag the Pitch Deck (PDF)</Button>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Progress Updates Section */}
			<section className="py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">
						Project Milestones: What&apos;s Cooking? 📈
					</h2>
					<div className="space-y-6">
						{progressUpdates.map((update, index) => (
							<Card key={index} className="bg-gray-50">
								<CardContent className="p-6">
									<div className="flex items-start gap-3">
										<span className="text-2xl">{update.emoji}</span>
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<Calendar className="h-4 w-4 text-gray-500" />
												<span className="text-sm text-gray-500">{update.date}</span>
											</div>
											<h3 className="font-bold text-lg mb-3">{update.title}</h3>
											<p className="text-gray-700">{update.description}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Forums Section */}
			<section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">
						Join the Conversation! Our Forums 💬
					</h2>
					<div className="space-y-4 mb-6">
						{forumThreads.map((thread, index) => (
							<Card key={index}>
								<CardContent className="p-4">
									<h3 className="font-semibold text-lg mb-2 hover:text-blue-600 cursor-pointer">
										{thread.title}
									</h3>
									<p className="text-sm text-gray-600">
										Started by {thread.author} - {thread.replies}{" "}
										{thread.replies === 1 ? "reply" : "replies"}!
									</p>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center">
						<Button variant="outline">Explore All Forum Threads</Button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto text-center">
					<p className="mb-6">© 2025 1e1x. All rights reserved.</p>
					<div className="flex justify-center space-x-6">
						<Link
							href="https://www.instagram.com/1e1x_qatar/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							Instagram
						</Link>
						<Link
							href="https://twitter.com/1e1x_qatar/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							Twitter
						</Link>
						<Link
							href="https://www.linkedin.com/company/1e1x/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							LinkedIn
						</Link>
						<Link
							href="https://www.facebook.com/1e1x.qatar/"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-white transition-colors"
						>
							Facebook
						</Link>
					</div>
				</div>
			</footer>
		</div>
	)
}
