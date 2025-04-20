"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

interface JobFormData {
  title: string
  company: string
  companyLogo: string
  location: string
  isRemote: boolean
  type: string
  category: string
  batch: string
  qualification: string
  stream: string
  salary: string
  description: string
}

export default function NewJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company: "",
    companyLogo: "/placeholder.svg?height=80&width=80",
    location: "",
    isRemote: false,
    type: "Full-time",
    category: "",
    batch: "",
    qualification: "",
    stream: "",
    salary: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isRemote: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would be an API call
    setTimeout(() => {
      // Get existing jobs from localStorage or use empty array
      const existingJobs = JSON.parse(localStorage.getItem("jobListings") || "[]")

      // Create new job with generated ID and current date
      const newJob = {
        ...formData,
        id: Date.now(), // Use timestamp as ID
        postedDate: "Just now",
      }

      // Add new job to the beginning of the array
      const updatedJobs = [newJob, ...existingJobs]

      // Save to localStorage
      localStorage.setItem("jobListings", JSON.stringify(updatedJobs))

      // Redirect to dashboard
      router.push("/admin/dashboard")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-3xl font-bold">Add New Job</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Enter the details for the new job listing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="e.g. TechCorp Inc."
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyLogo">Company Logo URL</Label>
                <Input
                  id="companyLogo"
                  name="companyLogo"
                  placeholder="https://example.com/logo.png"
                  value={formData.companyLogo}
                  onChange={handleChange}
                />
                <p className="text-sm text-muted-foreground">Leave default for placeholder image</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. San Francisco, CA"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Job Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Job Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select job category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Developer">Software Developer</SelectItem>
                    <SelectItem value="Web Developer">Web Developer</SelectItem>
                    <SelectItem value="Devops and Cloud">DevOps and Cloud</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                    <SelectItem value="Data Engineer">Data Engineer</SelectItem>
                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                    <SelectItem value="Testing">Testing</SelectItem>
                    <SelectItem value="Android">Android</SelectItem>
                    <SelectItem value="System Engineer">System Engineer</SelectItem>
                    <SelectItem value="Business Analyst">Business Analyst</SelectItem>
                    <SelectItem value="Sales/Marketing">Sales/Marketing</SelectItem>
                    <SelectItem value="Consultant">Consultant</SelectItem>
                    <SelectItem value="Non-Tech Roles">Non-Tech Roles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch">Batch (Passout Year) *</Label>
                <Input
                  id="batch"
                  name="batch"
                  placeholder="e.g. 2020-2023"
                  value={formData.batch}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  name="qualification"
                  placeholder="e.g. B.Tech in CS/IT"
                  value={formData.qualification}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stream">Stream</Label>
                <Select value={formData.stream} onValueChange={(value) => handleSelectChange("stream", value)}>
                  <SelectTrigger id="stream">
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary *</Label>
                <Input
                  id="salary"
                  name="salary"
                  placeholder="e.g. $80,000 - $100,000"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isRemote" checked={formData.isRemote} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="isRemote">Remote Position</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter job description, responsibilities, requirements, etc."
                value={formData.description}
                onChange={handleChange}
                className="min-h-[200px]"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/admin/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Job Listing"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
