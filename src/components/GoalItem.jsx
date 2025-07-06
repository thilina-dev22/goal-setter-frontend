import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import useAuth from '../hooks/useAuth'
import goalService from '../services/goalService'
import { toast } from 'react-toastify'

const GoalItem = ({ goal, onGoalUpdated, onGoalDeleted }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(goal.text)
  const { user } = useAuth()

  const handleUpdate = async () => {
    if (!text) {
      toast.error('Please add a goal text')
      return
    }

    try {
      const updatedGoal = await goalService.updateGoal(
        goal._id,
        { text },
        user.token
      )
      onGoalUpdated(updatedGoal)
      setIsEditing(false)
      toast.success('Goal updated successfully!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update goal')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await goalService.deleteGoal(goal._id, user.token)
        onGoalDeleted(goal._id)
        toast.success('Goal deleted successfully!')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete goal')
      }
    }
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={handleUpdate}
            className="bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition duration-200"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <p className="text-gray-800">{goal.text}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-primary-600 hover:text-primary-800 transition duration-200"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 transition duration-200"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoalItem