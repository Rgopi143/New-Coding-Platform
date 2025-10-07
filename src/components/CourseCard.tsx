import { Clock, Users, Star } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  students: string;
  rating: number;
  price: string;
  image: string;
}

const CourseCard = ({ title, description, duration, students, rating, price, image }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
        <span className="text-6xl">{image}</span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">{price}</span>
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
