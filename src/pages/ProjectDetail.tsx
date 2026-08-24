import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECT_DETAILS } from '../data/projectDetails';

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = id ? PROJECT_DETAILS[id] : null;

  useEffect(() => {
    if (!project && id) {
      navigate('/projects');
    }
    window.scrollTo(0, 0);
  }, [project, id, navigate]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          to="/projects" 
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            {project.name}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Gallery Section */}
        <div className="space-y-12">
          <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                <img 
                  src={img} 
                  alt={`${project.name} screenshot`} 
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
