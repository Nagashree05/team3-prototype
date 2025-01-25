"use client";

export default function LoginPage() {
    var handleSignup = () => {
        window.location.href = "/signup";
    };

    return (
      <div className="h-screen bg-gradient-to-b from-[#96a86c] to-[#5c6b47] flex items-center justify-center relative overflow-hidden">
        <div className="w-[500px] bg-[#f7f2d8] p-10 rounded-lg shadow-lg z-10">
          {/* Navigation Tabs */}
          <div className="flex justify-between mb-6">
            {/* <button className="flex-1 text-center py-2 bg-[#a65c1c] text-white font-semibold rounded-t-lg">
              Admin
            </button>
            <button className="flex-1 text-center py-2 bg-[#d7b294] text-white font-semibold rounded-t-lg">
              Professor
            </button> */}
            <button className="flex-1 text-center py-2 bg-[#a65c1c] text-white font-semibold rounded-t-lg">
              Student
            </button>
          </div>
  
          {/* Title */}
          <h2 className="text-2xl font-extrabold text-[#a65c1c] text-center mb-6">
            Discrete Mathematical Structures
          </h2>
  
          {/* Form */}
          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-[#a65c1c] text-black"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-[#a65c1c] text-black"
              />
            </div>
  
            <button
              type="submit"
              className="w-full py-3 bg-[#a65c1c] text-white font-bold rounded-lg hover:bg-[#8e4e18]"
            >
              LOGIN
            </button>
          </form>
  
          {/* Forgot Password & Create Account Links */}
          <div className="mt-4 text-center">
            <a href="#" className="text-[#a65c1c] underline">
              Forgot password?
            </a>
          </div>
  
          <div className="flex items-center justify-center my-4">
            <hr className="w-1/4 border-t border-gray-400" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="w-1/4 border-t border-gray-400" />
          </div>
  
          <button className="w-full py-3 bg-[#a65c1c] text-white font-bold rounded-lg hover:bg-[#8e4e18]" id="signup" onClick={handleSignup}>
            CREATE ACCOUNT
          </button>
        </div>
  
        {/* Decorative Elements */}
        {/* Decorative Elements */}
        <div className="absolute top-10 right-20 text-black text-4xl transform rotate-[10deg] font-bold">
          x ∉ A
        </div>
        <div className="absolute bottom-10 right-20 text-black text-3xl font-bold">
          f(x)
        </div>
        <div className="absolute top-5 left-10 text-black text-4xl font-bold transform rotate-[-20deg]">
          f(x)
        </div>

        {/* Hexagonal Symbol */}
        <div className="absolute top-1/3 right-1/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2l6.9 4v8l-6.9 4-6.9-4V6z"
            />
          </svg>
        </div>

        {/* Graph Illustration */}
        <div className="absolute bottom-16 left-20 z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 h-40 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="6" cy="6" r="1.5" fill="currentColor" />
            <circle cx="18" cy="6" r="1.5" fill="currentColor" />
            <circle cx="6" cy="18" r="1.5" fill="currentColor" />
            <circle cx="18" cy="18" r="1.5" fill="currentColor" />
            <path d="M6 6L18 18M6 18L18 6" />
          </svg>
        </div>
      </div>
    );
  }