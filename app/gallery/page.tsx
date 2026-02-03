"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, X, MapPin, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";

interface Photo {
  id: number;
  title: string;
  description: string;
  image: string;
  location?: string;
  date?: string;
}

function PhotoModal({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        <div className="bg-dark-900 rounded-2xl overflow-hidden">
          <div className="aspect-[4/3] bg-dark-800 flex items-center justify-center">
            {photo.image ? (
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-contain"
              />
            ) : (
              <Camera className="text-dark-600" size={80} />
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{photo.title}</h3>
            <p className="text-dark-400 mb-4">{photo.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-dark-500">
              {photo.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {photo.location}
                </span>
              )}
              {photo.date && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {photo.date}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PhotoCard({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative aspect-square bg-dark-800 rounded-xl overflow-hidden cursor-pointer border border-dark-700 hover:border-primary-500/50 transition-all duration-300"
      onClick={onClick}
    >
      {photo.image ? (
        <img
          src={photo.image}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Camera className="text-dark-600" size={40} />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="text-white font-medium truncate">{photo.title}</h4>
          {photo.location && (
            <p className="text-dark-400 text-sm flex items-center gap-1">
              <MapPin size={12} />
              {photo.location}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const { gallery, personal } = portfolioData;
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <main className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="bg-dark-900/80 backdrop-blur-lg border-b border-dark-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-dark-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </Link>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              {personal.name.split(" ")[0]}.
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Photo <span className="text-primary-400">Gallery</span>
          </h1>
          <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
          <p className="text-dark-400 max-w-2xl mx-auto">
            Capturing moments through my lens
          </p>
        </motion.div>

        {gallery && gallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                onClick={() => setSelectedPhoto(photo)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Camera className="mx-auto text-dark-600 mb-4" size={60} />
            <p className="text-dark-500">No photos yet. Add your photos to get started.</p>
          </div>
        )}

        {/* Add photos hint */}
        {gallery && gallery.length === 1 && (
          <p className="text-center text-dark-500 mt-8 text-sm">
            Add your photos to /public/images/gallery/ and update the gallery array in portfolio.json
          </p>
        )}
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>
    </main>
  );
}
