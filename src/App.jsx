import React, { useState, useEffect } from 'react';
import { Search, Bell, MessageSquare, User } from 'lucide-react';
import './index.css';

const StarryBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('starry-bg');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 200;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas id="starry-bg" className="fixed top-0 left-0 w-full h-full pointer-events-none" />;
};

const FreelanceAssassins = () => {
  const [activeTab, setActiveTab] = useState('freelancers');

  const freelancers = [
    { name: 'Valerie Ferguson', handle: '@valerie_ui', location: 'Vancouver, British Columbia, Canada', rate: '$30', rating: 4.7, reviews: 26, speciality: 'SOFTWARE DEVELOPER' },
    { name: 'Jermaine Mooney', handle: '@jermaine-mooney-des', location: 'Vienna, Austria', rate: '$65-$75', rating: 4.2, reviews: 83, speciality: 'WEB DESIGN' },
    { name: 'Elodie Hardin', handle: '@elhardin.3dart', location: 'Rotterdam, Netherlands', rate: '$40', rating: 5.0, reviews: 18, speciality: 'GRAPHIC DESIGNER' },
  ];

  const courses = [
    { title: 'The Ultimate Guide To Stealth and Infiltration', instructor: 'Leila Calderon', lessons: 6, students: 21, rating: 4.5, price: '$65', image: '/api/placeholder/400/200' },
    { title: 'Become a Master Assassin', instructor: 'Anthony Clark', lessons: 8, students: 35, rating: 4.5, price: '$50-$75', image: '/api/placeholder/400/200' },
    { title: 'Digital Espionage', instructor: 'Anthony Clark', lessons: 6, students: 21, rating: 4.5, price: 'Free', image: '/api/placeholder/400/200' },
    { title: 'Strategic Planning for High-Risk Missions', instructor: 'Leila Calderon', lessons: 7, students: 28, rating: 4.5, price: '$80', image: '/api/placeholder/400/200' },
  ];

  return (
    <div className="bg-black text-cyan-400 min-h-screen relative overflow-hidden">
      <StarryBackground />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="header">
          <h1 className="text-4xl font-bold" style={{ textShadow: '0 0 10px #00FFFF' }}>Freelance Assassins</h1>
          <div className="nav-icons">
            <Search className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
            <Bell className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
            <MessageSquare className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
            <User className="w-6 h-6 hover:text-white transition-colors cursor-pointer" />
          </div>
        </header>

        <nav className="tabs">
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${activeTab === 'freelancers' ? 'active' : ''}`}
            onClick={() => setActiveTab('freelancers')}
          >
            Freelancers
          </button>
          <button
            className={`px-6 py-3 rounded-full text-lg font-semibold transition-all ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
        </nav>

        <main>
          {activeTab === 'freelancers' && (
            <div className="grid">
              {freelancers.map((freelancer, index) => (
                <div key={index} className="freelancer-card">
                  <div>
                    <h2>{freelancer.name}</h2>
                    <p>{freelancer.handle}</p>
                    <p className="tag">{freelancer.speciality}</p>
                    <p>{freelancer.location}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="price">{freelancer.rate}</p>
                      <p>per hour</p>
                    </div>
                    <div>
                      <p className="rating">{freelancer.rating} ★</p>
                      <p>{freelancer.reviews} reviews</p>
                    </div>
                  </div>
                  <button className="invite-btn">
                    Invite
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="grid">
              {courses.map((course, index) => (
                <div key={index} className="card">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div>
                    <span className="tag">{course.price}</span>
                    <h2>{course.title}</h2>
                    <p>by {course.instructor}</p>
                    <div className="flex justify-between">
                      <p>{course.rating} ★ • {course.lessons} Lessons</p>
                      <p>{course.students} Students</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FreelanceAssassins;
