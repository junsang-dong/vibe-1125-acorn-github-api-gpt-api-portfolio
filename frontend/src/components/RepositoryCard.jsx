import React, { useState } from 'react';
import { formatDate, formatNumber, getLanguageColor } from '../utils/formatters';

const RepositoryCard = ({ repo }) => {
  const [showFullSummary, setShowFullSummary] = useState(false);

  return (
    <div className="card hover:border-blue-500 transition-all duration-200">
      {/* 저장소 헤더 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            {repo.name}
          </a>
          {repo.description && (
            <p className="text-gray-400 mt-2">{repo.description}</p>
          )}
        </div>
      </div>

      {/* GPT 요약 */}
      {repo.gpt_summary && (
        <div className="bg-github-dark rounded-lg p-4 mb-4 border border-blue-500/30">
          <div className="flex items-center space-x-2 mb-3">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            <span className="text-sm font-semibold text-purple-400">AI 요약</span>
          </div>
          
          <div className="space-y-3">
            {repo.gpt_summary.overview && (
              <p className="text-gray-300 text-sm leading-relaxed">
                {repo.gpt_summary.overview}
              </p>
            )}
            
            {repo.gpt_summary.technologies && repo.gpt_summary.technologies.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-400 mb-2">기술 스택</h4>
                <div className="flex flex-wrap gap-2">
                  {repo.gpt_summary.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {repo.gpt_summary.features && repo.gpt_summary.features.length > 0 && (
              <div>
                <button
                  onClick={() => setShowFullSummary(!showFullSummary)}
                  className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                >
                  <span>주요 기능</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${showFullSummary ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {showFullSummary && (
                  <ul className="mt-2 space-y-1">
                    {repo.gpt_summary.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 text-xs flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 토픽 태그 */}
      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.map((topic, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* 저장소 정보 */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
        {repo.language && (
          <div className="flex items-center space-x-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            ></span>
            <span>{repo.language}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
          </svg>
          <span>{formatNumber(repo.stargazers_count)}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
          </svg>
          <span>{formatNumber(repo.forks_count)}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>업데이트: {formatDate(repo.updated_at)}</span>
        </div>
      </div>
    </div>
  );
};

export default RepositoryCard;

