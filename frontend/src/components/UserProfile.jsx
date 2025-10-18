import React from 'react';
import { formatDate, formatNumber } from '../utils/formatters';

const UserProfile = ({ user }) => {
  if (!user) return null;

  return (
    <div className="card mb-8">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* 프로필 이미지 */}
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="w-32 h-32 rounded-full border-4 border-github-border"
        />
        
        {/* 사용자 정보 */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-2">
            {user.name || user.login}
          </h2>
          <p className="text-gray-400 mb-4">@{user.login}</p>
          
          {user.bio && (
            <p className="text-gray-300 mb-4">{user.bio}</p>
          )}
          
          {/* 통계 */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {formatNumber(user.public_repos)}
              </div>
              <div className="text-sm text-gray-400">저장소</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {formatNumber(user.followers)}
              </div>
              <div className="text-sm text-gray-400">팔로워</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {formatNumber(user.following)}
              </div>
              <div className="text-sm text-gray-400">팔로잉</div>
            </div>
          </div>
          
          {/* 추가 정보 */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {user.location && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{user.location}</span>
              </div>
            )}
            {user.created_at && (
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>가입: {formatDate(user.created_at)}</span>
              </div>
            )}
          </div>
          
          {/* GitHub 링크 */}
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 btn-primary"
          >
            GitHub 프로필 보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

