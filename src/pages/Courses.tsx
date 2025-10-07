import { Search } from 'lucide-react';
import { useState } from 'react';
import CourseCard from '../components/CourseCard';
import { coursesData } from '../data/coursesData';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Explore Our Courses</h1>
            <p className="text-xl mb-8">
              Industry-leading courses designed to help you master in-demand skills
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Available
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No courses found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
