import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-primary-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          GoalSetter
        </Link>
        <nav className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="px-3 py-2 rounded-md hover:bg-primary-500 transition duration-200"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-primary-100 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 rounded-md hover:bg-primary-500 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-primary-600 px-4 py-2 rounded-md hover:bg-primary-100 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header