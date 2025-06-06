"use client"

import { useState, useEffect, FormEvent } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const departments = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Data Science",
  "Business Administration",
]

export default function EditStudent() {
  const { id } = useParams()
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [department, setDepartment] = useState("")

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await axios.get(`http://localhost:3000/api/posts/${id}`)
        if (response.data.success) {
          setStudent(response.data.data)
          setDepartment(response.data.data.department)
        } else {
          setStudent(null)
        }
      } catch (error) {
        console.error("Error fetching student", error)
        setStudent(null)
      } finally {
        setLoading(false)
      }
    }
    fetchStudent()
  }, [id])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name")?.toString() ?? "",
      enrollmentNo: formData.get("enrollmentNumber")?.toString() ?? "",
      department: department,
      batch: formData.get("batch")?.toString() ?? "",
      contactNumber: formData.get("contactNumber")?.toString() ?? "",
      category: formData.get("category")?.toString() ?? "",
      description: formData.get("description")?.toString() ?? "",
      studentPhoto: formData.get("profileImage")?.toString() ?? "",
      socialMedia: {
        linkedin: formData.get("linkedin")?.toString() ?? "",
        twitter: formData.get("twitter")?.toString() ?? "",
        github: formData.get("github")?.toString() ?? "",
      },
    }

    try {
      const response = await axios.patch(`http://localhost:3000/api/posts/${id}`, data)
      if (response.data.success) {
        router.push(`/students/${id}`)
      } else {
        alert(response.data.message || "Failed to update student.")
      }
    } catch (error: any) {
      console.error("Error updating student:", error)
      alert(error.response?.data?.message || "An error occurred. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-blue-700">Loading...</p>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <p className="text-blue-700">Student not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-block mb-6">
        <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <Card className="max-w-3xl mx-auto border-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">Edit Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-700">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={student.name}
                  className="border-blue-200 focus:border-blue-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="enrollmentNumber" className="text-blue-700">
                  Enrollment Number
                </Label>
                <Input
                  id="enrollmentNumber"
                  name="enrollmentNumber"
                  defaultValue={student.enrollmentNumber}
                  className="border-blue-200 focus:border-blue-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-blue-700">Department</Label>
                <Select defaultValue={student.department} onValueChange={(value) => setDepartment(value)}>
                  <SelectTrigger className="border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="batch" className="text-blue-700">
                  Batch
                </Label>
                <Input
                  id="batch"
                  name="batch"
                  defaultValue={student.batch}
                  className="border-blue-200 focus:border-blue-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber" className="text-blue-700">
                  Contact Number
                </Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  defaultValue={student.contactNumber}
                  className="border-blue-200 focus:border-blue-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-blue-700">Category</Label>
                <Input
                  id="category"
                  name="category"
                  defaultValue={student.category}
                  className="border-blue-200 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700">Social Media Links</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="linkedin" className="text-sm text-blue-600">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    defaultValue={student.socialMedia?.linkedin}
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div>
                  <Label htmlFor="twitter" className="text-sm text-blue-600">
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    defaultValue={student.socialMedia?.twitter}
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
                <div>
                  <Label htmlFor="github" className="text-sm text-blue-600">
                    GitHub
                  </Label>
                  <Input
                    id="github"
                    name="github"
                    defaultValue={student.socialMedia?.github}
                    className="border-blue-200 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-blue-700">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={student.description}
                className="min-h-[100px] border-blue-200 focus:border-blue-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage" className="text-blue-700">
                Profile Image URL
              </Label>
              <Input
                id="profileImage"
                name="profileImage"
                defaultValue={student.profileImage}
                className="border-blue-200 focus:border-blue-400"
                placeholder="URL or upload image"
              />
              <p className="text-xs text-blue-500">
                Note: In a production app, this would be a file upload component
              </p>
            </div>

            <CardFooter className="flex justify-end space-x-2">
              <Link href="/">
                <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-100">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white">
                Update
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
