import { useEffect, useState } from 'react'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import useAuth from '../hooks/useAuth'
import goalService from '../services/goalService'

const Dashboard = () => {
  const [goals, setGoals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const fetchedGoals = await goalService.getGoals(user.token)
        setGoals(fetchedGoals)
      } catch (error) {
        console.error('Failed to fetch goals:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchGoals()
    }
  }, [user])

  const handleGoalAdded = (newGoal) => {
    setGoals([newGoal, ...goals])
  }

  const handleGoalUpdated = (updatedGoal) => {
    setGoals(goals.map((goal) => (goal._id === updatedGoal._id ? updatedGoal : goal)))
  }

  const handleGoalDeleted = (deletedGoalId) => {
    setGoals(goals.filter((goal) => goal._id !== deletedGoalId))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Goals</h1>
      <GoalForm onGoalAdded={handleGoalAdded} />
      {goals.length > 0 ? (
        <div className="grid gap-4">
          {goals.map((goal) => (
            <GoalItem
              key={goal._id}
              goal={goal}
              onGoalUpdated={handleGoalUpdated}
              onGoalDeleted={handleGoalDeleted}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No goals yet. Add one above!</p>
      )}
    </div>
  )
}

export default Dashboard