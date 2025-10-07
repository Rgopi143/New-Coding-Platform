import { Quote, Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  avatar: string;
}

const TestimonialCard = ({ name, role, company, feedback, rating, avatar }: TestimonialCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <Quote className="w-10 h-10 text-orange-500 mb-4" />
      <p className="text-gray-700 mb-6 leading-relaxed">{feedback}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {avatar}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-600">{role} at {company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
