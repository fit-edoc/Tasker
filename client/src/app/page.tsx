'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Layout } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: 'Lighting Fast',
      description: 'Built with Next.js and optimized for speed and performance.',
    },
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: 'Secure Authentication',
      description: 'JWT-based authentication with bcrypt password hashing.',
    },
    {
      icon: <Layout className="w-6 h-6 text-blue-400" />,
      title: 'Responsive Dashboard',
      description: 'Manage tasks effortlessly with our intuitive dashboard.',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] w-[100vw]  bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl p-8 relative overflow-hidden shadow-xl">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 mt-12 lg:mt-0"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black/70">Tasks</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          The ultimate platform to organize, track, and complete your daily goals with style and efficiency.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/register"
            className="group px-8 py-3 bg-black text-white rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-black/30 flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-black border border-indigo-200 rounded-full font-semibold text-lg hover:bg-neutral-200 hover:text-white transition-all shadow-sm hover:shadow-md"
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
