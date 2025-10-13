import { useEffect, useState, useRef } from "react"
import AdminLayout from "../../components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import {
  getAllQuizQuestions,
  addQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  addQuizQuestionBatch,
  getAllBatches,
  deleteBatch,
} from "../../lib/firebase-service"
import { Plus, Pencil, Trash2, Loader2, Upload, Layers, List, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { useToast } from "../../hooks/use-toast"

export default function AdminQuiz() {
  const [questions, setQuestions] = useState([])
  const [batches, setBatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState(null)
  const [viewMode, setViewMode] = useState("batches") // "batches" or "all"
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: 0,
    explanation: "",
    category: "current-affairs",
  })

  const fileInputRef = useRef(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [allQuestions, allBatches] = await Promise.all([
      getAllQuizQuestions(),
      getAllBatches()
    ])
    setQuestions(allQuestions)
    setBatches(allBatches)
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const questionData = {
      question: formData.question,
      options: [formData.option1, formData.option2, formData.option3, formData.option4],
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation,
      category: formData.category,
      createdAt: new Date().toISOString(),
    }

    if (editingQuestion) {
      const success = await updateQuizQuestion(editingQuestion.id, questionData)
      if (success) {
        toast({ title: "Question updated successfully" })
        loadData()
        resetForm()
      } else {
        toast({ title: "Failed to update question", variant: "destructive" })
      }
    } else {
      const id = await addQuizQuestion(questionData)
      if (id) {
        toast({ title: "Question added successfully" })
        loadData()
        resetForm()
      } else {
        toast({ title: "Failed to add question", variant: "destructive" })
      }
    }
  }

  const handleEdit = (question) => {
    setEditingQuestion(question)
    setFormData({
      question: question.question,
      option1: question.options[0] || "",
      option2: question.options[1] || "",
      option3: question.options[2] || "",
      option4: question.options[3] || "",
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || "",
      category: question.category,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this question?")) {
      const success = await deleteQuizQuestion(id)
      if (success) {
        toast({ title: "Question deleted successfully" })
        loadData()
      } else {
        toast({ title: "Failed to delete question", variant: "destructive" })
      }
    }
  }

  const handleImportJSON = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const importedQuestions = JSON.parse(text)

      if (!Array.isArray(importedQuestions)) {
        toast({ title: "Invalid JSON format. Expected an array of questions.", variant: "destructive" })
        return
      }

      // Validate questions
      const validQuestions = []
      let errorCount = 0

      for (const q of importedQuestions) {
        if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || typeof q.correctAnswer !== "number") {
          errorCount++
          continue
        }

        validQuestions.push({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || "",
          category: q.category || "current-affairs",
        })
      }

      // Add as batch (automatically assigns batch number and handles cleanup)
      const result = await addQuizQuestionBatch(validQuestions)

      if (result.success) {
        toast({
          title: `Batch ${result.batchNumber} imported successfully!`,
          description: `${result.count} questions added${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
        })
      } else {
        toast({ title: "Failed to import batch", variant: "destructive" })
      }

      loadData()
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      toast({ title: "Failed to parse JSON file", variant: "destructive" })
    }
  }

  const handleDeleteBatch = async (batchNumber) => {
    if (confirm(`Are you sure you want to delete Batch ${batchNumber}? This will delete all questions in this batch.`)) {
      const success = await deleteBatch(batchNumber)
      if (success) {
        toast({ title: `Batch ${batchNumber} deleted successfully` })
        loadData()
      } else {
        toast({ title: "Failed to delete batch", variant: "destructive" })
      }
    }
  }

  const resetForm = () => {
    setFormData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: 0,
      explanation: "",
      category: "current-affairs",
    })
    setEditingQuestion(null)
    setShowForm(false)
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Quiz Management</h1>
            <p className="text-muted-foreground">Manage current affairs quiz questions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Import JSON
            </Button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</CardTitle>
              <CardDescription>Fill in the details for the quiz question</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="option1">Option 1</Label>
                    <Input
                      id="option1"
                      value={formData.option1}
                      onChange={(e) => setFormData({ ...formData, option1: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="option2">Option 2</Label>
                    <Input
                      id="option2"
                      value={formData.option2}
                      onChange={(e) => setFormData({ ...formData, option2: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="option3">Option 3</Label>
                    <Input
                      id="option3"
                      value={formData.option3}
                      onChange={(e) => setFormData({ ...formData, option3: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="option4">Option 4</Label>
                    <Input
                      id="option4"
                      value={formData.option4}
                      onChange={(e) => setFormData({ ...formData, option4: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correctAnswer">Correct Answer (0-3)</Label>
                  <Input
                    id="correctAnswer"
                    type="number"
                    min="0"
                    max="3"
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="explanation">Explanation (Optional)</Label>
                  <Textarea
                    id="explanation"
                    value={formData.explanation}
                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingQuestion ? "Update Question" : "Add Question"}</Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="batches" className="space-y-4">
          <TabsList>
            <TabsTrigger value="batches">
              <Layers className="h-4 w-4 mr-2" />
              Batches View
            </TabsTrigger>
            <TabsTrigger value="all">
              <List className="h-4 w-4 mr-2" />
              All Questions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="batches">
            <Card>
              <CardHeader>
                <CardTitle>Question Batches ({batches.length} batches)</CardTitle>
                <CardDescription>
                  Each batch contains 50 questions. System automatically rotates batches daily and deletes batches older than 30 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batches.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No batches found. Import your first batch using the "Import JSON" button.
                    </p>
                  ) : (
                    batches.map((batch) => (
                      <div key={batch.batchNumber} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold">Batch {batch.batchNumber}</h3>
                              <Badge variant="secondary">
                                {batch.questionCount} questions
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Added: {new Date(batch.batchDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteBatch(batch.batchNumber)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Batch
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Quiz Questions ({questions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question) => (
                    <div key={question.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{question.question}</h3>
                            {question.batchNumber && (
                              <Badge variant="outline" className="text-xs">
                                Batch {question.batchNumber}
                              </Badge>
                            )}
                          </div>
                          <div className="mt-2 space-y-1">
                            {question.options.map((option, index) => (
                              <div
                                key={index}
                                className={`text-sm ${index === question.correctAnswer ? "text-green-600 font-medium" : "text-muted-foreground"}`}
                              >
                                {index + 1}. {option} {index === question.correctAnswer && "✓"}
                              </div>
                            ))}
                          </div>
                          {question.explanation && (
                            <p className="text-sm text-muted-foreground mt-2">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(question)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(question.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
