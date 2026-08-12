import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiClock, FiLayers } from 'react-icons/fi';
import PublicLayout from '../../layouts/PublicLayout.jsx';
import { publicService } from '../../services/publicService';

const programImage = (slug) => new URL(`../../assets/images/programs/${slug}.jpg`, import.meta.url).href;

const ProgramDetailPage = () => {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setProgram(null);
    setError(false);
    publicService
      .getProgramBySlug(slug)
      .then(({ data }) => setProgram(data.data))
      .catch(() => setError(true));
  }, [slug]);

  return (
    <PublicLayout>
      <div className="pt-20 lg:pt-24">
        <section className="py-10">
          <div className="container-xl">
            <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brass-400 mb-8">
              <FiArrowLeft /> Back to programs
            </Link>

            {error && (
              <div className="card p-8 text-center">
                <p className="text-parchment-100 font-display text-2xl">Program not found</p>
                <p className="mt-3 text-slate-400 text-sm">This program page could not be loaded.</p>
              </div>
            )}

            {!program && !error && (
              <div className="card p-8 text-center">
                <p className="text-slate-400 text-sm">Loading program details...</p>
              </div>
            )}

            {program && (
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                <div className="card overflow-hidden">
                  <img
                    src={programImage(program.slug)}
                    alt={program.name}
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                </div>

                <div className="card p-7 sm:p-8">
                  <p className="eyebrow mb-3">Program Detail</p>
                  <h1 className="font-display text-3xl sm:text-4xl text-parchment-100">{program.name}</h1>
                  {program.tagline && <p className="mt-3 text-brass-400 text-sm uppercase tracking-[0.22em] font-mono">{program.tagline}</p>}

                  <div className="mt-6">
                    <Link to="/contact" className="btn-primary inline-flex">
                      Enroll in {program.name}
                    </Link>
                  </div>

                  <div className="mt-6 space-y-6 text-slate-300 text-sm leading-relaxed">
                    

                    {program.introduction && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-2">Introduction</p>
                        <p>{program.introduction}</p>
                      </div>
                    )}

                    {program.training_details && (
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-2">Training Details</p>
                        <p>{program.training_details}</p>
                      </div>
                    )}

                    {program.training_schedule && (
                      <div className="flex items-start gap-3">
                        <FiClock className="mt-0.5 text-brass-500 shrink-0" />
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-2">Training Schedule</p>
                          <p>{program.training_schedule}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {program.benefits?.length > 0 && (
                    <div className="mt-7">
                      <div className="flex items-center gap-2 mb-3 text-brass-500 text-xs uppercase tracking-[0.22em] font-mono">
                        <FiLayers /> Benefits
                      </div>
                      <ul className="space-y-2 text-slate-300 text-sm leading-relaxed list-disc pl-5">
                        {program.benefits.map((benefit) => (
                          <li key={benefit} className="line-clamp-2 flex items-start gap-2">
                            <FiCheckCircle className="mt-0.5 text-brass-500 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {program.levels?.length > 0 && (
                    <div className="mt-7">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500 mb-3">Levels / Belts</p>
                      <div className="flex flex-wrap gap-2">
                        {program.levels.map((level) => (
                          <span key={level} className="text-[11px] px-2.5 py-1 rounded-full bg-brass-500/10 text-brass-400 border border-brass-500/20">
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default ProgramDetailPage;

const Meta = ({ label, value }) => (
  <div className="rounded-md border border-parchment-100/10 bg-ink-950/40 px-4 py-3">
    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">{label}</p>
    <p className="text-sm text-parchment-100 break-words">{value}</p>
  </div>
);
