"use client";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import {
  Camera,
  Edit3,
  Save,
  X,
  Plus,
  MapPin,
  LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { getUserByIdAction } from "~/app/actions/server-actions";

export default function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [newSkill, setNewSkill] = useState("");
  const [newRole, setNewRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  const router = useRouter();

  const [session, setSession] = useState<Object | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const currentSession = await getSession();
      setSession(currentSession);
    }
    checkAuth();
  }, []);

  useEffect(() => {
    async function loadUser() {
      try {
        if (session?.user?.id) {
          console.log("Session ID:", session.user.id);

          const fetchedUserData = await getUserByIdAction(session.user.id);
          console.log(fetchedUserData);

          if (fetchedUserData) {
            setUserData(fetchedUserData);
            setEditData(fetchedUserData);
            setIsCurrentUser(username === fetchedUserData.name);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    }
    loadUser();
  }, [session]);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUserData(editData);
    setIsEditing(false);
    setIsLoading(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
    setNewSkill("");
    setNewRole("");
  };

  // Skills
  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter(
        (skill: string) => skill !== skillToRemove,
      ),
    });
  };

  //Roles
  const addRole = () => {
    if (newRole.trim() && !editData.roles.includes(newRole.trim())) {
      setEditData({
        ...editData,
        roles: [...editData.roles, newRole.trim()],
      });
      setNewRole("");
    }
  };

  const removeRole = (roleToRemove: string) => {
    setEditData({
      ...editData,
      roles: editData.roles.filter((role: string) => role !== roleToRemove),
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData({
      ...editData,
      [field]: value,
    });
  };

  if (isLoadingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-t-black border-r-gray-200 border-b-gray-200 border-l-gray-200"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 pt-20">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold">User not found</h2>
          <p className="mb-6 text-gray-600">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                {/* Avatar Section */}
                <div className="relative">
                  <img
                    src={userData.image || "/placeholder.svg"}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  {isEditing && (
                    <button className="absolute right-2 bottom-2 rounded-full bg-black p-2 text-white transition-colors hover:bg-gray-800">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        {userData.name}
                      </h1>
                      <p className="mb-2 text-gray-600">
                        @{userData.email.split("@")[0]}
                      </p>
                      <div className="mb-3 flex flex-wrap gap-2">
                        {/* {userData.roles.map((role: string) => (
                          <Badge
                            key={role}
                            variant="secondary"
                            className="bg-gray-100 text-gray-700"
                          >
                            {role}
                          </Badge>
                        ))} */}
                      </div>
                    </div>
                    {isCurrentUser && !isEditing && (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                    {/* {!isCurrentUser && (
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Follow
                      </Button>
                    )} */}
                  </div>

                  {/* Stats */}
                  <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {/* {userData.projects} */}
                        20
                      </div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {userData.contributions}
                        10
                      </div>
                      <div className="text-sm text-gray-600">Contributions</div>
                    </div>
                    {/* <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {userData.followers}
                      </div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div> */}
                    <div className="text-center">
                      {/* <div className="text-2xl font-bold text-gray-900">
                        {userData.following}
                      </div>
                      <div className="text-sm text-gray-600">Following</div> */}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="mb-4 text-gray-700">
                    {userData.bio
                      ? userData.bio
                      : "Add a bio to share your interests!"}
                  </p>

                  {/* Quick Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {userData.location ? userData.location : "Not Given"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined{" "}
                      {new Date(
                        userData.joinDate ? userData.joinDate : "Not Given",
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {userData.email}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form */}
          {isEditing && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Edit Profile
                  <div className="flex gap-2">
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} size="sm">
                      {isLoading ? (
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save Changes
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={editData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={editData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={editData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="City, Country"
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Social Links</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <LinkIcon className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="website"
                          value={editData.website}
                          onChange={(e) =>
                            handleInputChange("website", e.target.value)
                          }
                          placeholder="https://yourwebsite.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <div className="relative">
                        <Github className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="github"
                          value={editData.github}
                          onChange={(e) =>
                            handleInputChange("github", e.target.value)
                          }
                          placeholder="username"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <div className="relative">
                        <Linkedin className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="linkedin"
                          value={editData.linkedin}
                          onChange={(e) =>
                            handleInputChange("linkedin", e.target.value)
                          }
                          placeholder="username"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <div className="relative">
                        <Twitter className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="twitter"
                          value={editData.twitter}
                          onChange={(e) =>
                            handleInputChange("twitter", e.target.value)
                          }
                          placeholder="username"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Roles */}
                <div>
                  <Label>Roles</Label>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {editData.roles.map((role: string) => (
                      <Badge
                        key={role}
                        variant="secondary"
                        className="flex items-center gap-1 bg-blue-100 text-blue-700"
                      >
                        {role}
                        <button
                          onClick={() => removeRole(role)}
                          className="hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="Add a role..."
                      onKeyPress={(e) => e.key === "Enter" && addRole()}
                    />
                    <Button onClick={addRole} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <Label>Skills</Label>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {/* {editData.skills.map((skill: string) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="flex items-center gap-1 bg-green-100 text-green-700"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-green-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))} */}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill..."
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm" variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills & Expertise */}
          {!isEditing && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  Skills here
                  {/* {userData.skills.map((skill: string) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-green-100 text-green-700"
                    >
                      {skill}
                    </Badge>
                  ))} */}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Social Links */}
          {!isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {!userData.website && (
                    <a
                      href={userData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                    >
                      <LinkIcon className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">Website</span>
                    </a>
                  )}
                  {!userData.github && (
                    <a
                      href={`https://github.com/${userData.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                    >
                      <Github className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                  )}
                  {!userData.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${userData.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                    >
                      <Linkedin className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                  )}
                  {!userData.twitter && (
                    <a
                      href={`https://twitter.com/${userData.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border p-3 transition-colors hover:bg-gray-50"
                    >
                      <Twitter className="h-5 w-5 text-gray-600" />
                      <span className="text-sm font-medium">Twitter</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
