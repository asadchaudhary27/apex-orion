import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECT_DETAILS } from '../data/projectDetails';
import SEO from '../components/common/SEO';

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

  const projectSchema = [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://apexoriontech.com/'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: 'https://apexoriontech.com/projects'
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: project.name,
          item: `https://apexoriontech.com/project/${id}`
        }
      ]
    },
    {
      '@type': 'CreativeWork',
      name: project.name,
      headline: `${project.name} Deployment & Case Study`,
      description: project.description,
      creator: {
        '@type': 'Organization',
        name: 'Apex Orion Global Solutions'
      },
      keywords: project.tags ? project.tags.join(', ') : undefined
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <SEO
        title={`${project.name} | Case Study & Architecture`}
        description={project.description}
        canonical={`/project/${id}`}
        schema={projectSchema}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Semantic Breadcrumbs & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/projects" 
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center space-x-2 text-xs text-gray-500">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-[#FF5722] font-medium">{project.name}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="mb-16 space-y-6">
          {project.category && (
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#FF5722]/10 border border-[#FF5722]/30 text-[#FF5722] text-xs font-semibold uppercase tracking-wider">
              {project.category}
            </span>
          )}
          <h1 className="text-4xl sm:text-6xl font-bold text-white">
            {project.name}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#FF5722] text-white font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,87,34,0.4)]"
            >
              <span>Build a Similar Solution</span>
            </Link>
          </div>
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
