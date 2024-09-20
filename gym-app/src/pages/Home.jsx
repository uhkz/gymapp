import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { BsBarChartFill } from "react-icons/bs";
import { BiRun } from "react-icons/bi";

const Home = () => {
  const navigate = useNavigate();

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8">
      <div className="text-left mb-8 w-full max-w-5xl">
        <span className="inline-block bg-gray-300 text-gray-700 rounded-full px-4 py-1 text-sm font-semibold mb-2">
          Gym Tracker
        </span>
        <h1 className="text-3xl font-bold">{getGreeting()}!</h1>
        <p className="text-gray-600">
          Welcome to your personal fitness dashboard. Track your workouts,
          monitor your progress, and stay motivated!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl w-full">
        <div
          onClick={() => navigate("/workoutplan")}
          className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105"
        >
          <div className="flex items-center justify-center h-24 rounded mb-4">
            <BiRun size={48} />
          </div>
          <h3 className="text-lg font-semibold">Workout Plan</h3>
          <p className="text-gray-600">
            Create and manage your personalized workout plans to achieve your
            fitness goals efficiently and effectively.
          </p>
        </div>
        <div
          onClick={() => navigate("/log")}
          className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105"
        >
          <div className="flex items-center justify-center h-24 rounded mb-4">
            <BsBarChartFill size={48} />
          </div>
          <h3 className="text-lg font-semibold">Log Progress</h3>
          <p className="text-gray-600">
            Log your workout progress and monitor your improvement over time to
            stay on top of your fitness journey.
          </p>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105"
        >
          <div className="flex items-center justify-center h-24 rounded mb-4">
            <BsFillPersonVcardFill size={48} />
          </div>
          <h3 className="text-lg font-semibold">Profile</h3>
          <p className="text-gray-600">
            Update your personal information and profile picture to keep your
            fitness account up-to-date.
          </p>
        </div>
        <div
          onClick={() => navigate("")}
          className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105"
        >
          <div className="flex items-center justify-center h-24 rounded mb-4">
            <span className="text-2xl font-semibold">WIP</span>
          </div>
          <h3 className="text-lg font-semibold">Work in progress</h3>
          <p className="text-gray-600">
            Exciting new features are on the way. Stay tuned for updates and
            enhancements!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
