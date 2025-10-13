import { useEffect, useState } from "react"
import { SiteHeader } from "../components/SiteHeader"
import { SiteFooter } from "../components/SiteFooter"
import SEO from "../components/SEO"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { getTodaysBatchQuestions, addQuizCompletion } from "../lib/firebase-service"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import BreadcrumbNav from "../components/BreadcrumbNav"

export default function CurrentAffairsPage() {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [completionSaved, setCompletionSaved] = useState(false)

  useEffect(() => {
    loadQuestions()
  }, [])

  async function loadQuestions() {
    setLoading(true)
    const data = await getTodaysBatchQuestions()
    setQuestions(data)
    setLoading(false)
  }

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (optionIndex) => {
    if (showResult) return
    setSelectedAnswer(optionIndex)
  }

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null) return

    setShowResult(true)
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    const newScore = isCorrect ? score + 1 : score
    
    if (isCorrect) {
      setScore(newScore)
    }
    
    const newAnsweredQuestions = [...answeredQuestions, currentQuestionIndex]
    setAnsweredQuestions(newAnsweredQuestions)
    
    // Check if this was the last question and save completion
    if (newAnsweredQuestions.length === questions.length && !completionSaved) {
      const completionData = {
        totalQuestions: questions.length,
        score: newScore,
        percentage: Math.round((newScore / questions.length) * 100),
      }
      const id = await addQuizCompletion(completionData)
      if (id) {
        setCompletionSaved(true)
      }
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnsweredQuestions([])
    setCompletionSaved(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8">
            <BreadcrumbNav items={[{ label: "Current Affairs Quiz" }]} />
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>No Questions Available</CardTitle>
                <CardDescription>Check back later for new quiz questions.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const isQuizComplete = answeredQuestions.length === questions.length

  return (
    <div className="flex min-h-screen flex-col">
      <SEO
        title="Current Affairs Quiz"
        description="Test your knowledge of current events and affairs with our interactive quiz. Stay updated and challenge yourself with the latest current affairs questions."
        keywords="current affairs quiz, current events quiz, general knowledge, quiz, test knowledge, current affairs"
      />
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav items={[{ label: "Current Affairs Quiz" }]} />

          <div className="mt-6 max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Current Affairs Quiz</CardTitle>
                  <Badge variant="secondary">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </Badge>
                </div>
                <CardDescription>Test your knowledge of current events and affairs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isQuizComplete ? (
                  <>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold leading-relaxed">{currentQuestion.question}</h3>

                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => {
                          const isSelected = selectedAnswer === index
                          const isCorrect = index === currentQuestion.correctAnswer
                          const showCorrect = showResult && isCorrect
                          const showWrong = showResult && isSelected && !isCorrect

                          return (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={showResult}
                              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                showCorrect
                                  ? "border-green-500 bg-green-50 dark:bg-green-950"
                                  : showWrong
                                    ? "border-red-500 bg-red-50 dark:bg-red-950"
                                    : isSelected
                                      ? "border-primary bg-primary/5"
                                      : "border-border hover:border-primary/50"
                              } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{option}</span>
                                {showCorrect && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                                {showWrong && <XCircle className="h-5 w-5 text-red-600" />}
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {showResult && currentQuestion.explanation && (
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm font-medium mb-1">Explanation:</p>
                          <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                        Previous
                      </Button>

                      {!showResult ? (
                        <Button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}>
                          Submit Answer
                        </Button>
                      ) : (
                        <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                          Next Question
                        </Button>
                      )}
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                      Score: {score} / {answeredQuestions.length}
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-4 py-8">
                    <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                    <p className="text-lg">
                      Your final score: <span className="font-bold text-primary">{score}</span> out of{" "}
                      <span className="font-bold">{questions.length}</span>
                    </p>
                    <p className="text-muted-foreground">
                      You got {Math.round((score / questions.length) * 100)}% correct!
                    </p>
                    <Button onClick={resetQuiz} className="mt-4">
                      Restart Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
