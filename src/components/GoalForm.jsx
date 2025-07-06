import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'
import goalService from '../services/goalService'
import { toast } from 'react-toastify'

const GoalForm = ({ onGoalAdded }) => {
  const [text, setText] = useState('')
  const { user } = useAuth()

  const onSubmit = async (e) => {
    e.preventDefault()

    if (!text) {
      toast.error('Please add a goal text')
      return
    }

    try {
      const goalData = { text }
      const newGoal = await goalService.createGoal(goalData, user.token)
      onGoalAdded(newGoal)
      setText('')
      toast.success('Goal added successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add goal')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your goal..."
          className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          type="submit"
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition duration-200 flex items-center gap-2"
        >
          <FaPlus /> Add Goal
        </button>
      </div>
    </form>
  )
}

export default GoalForm