import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

interface GameCardProps {
    title: string;
    description?: string;
    cover?: string;
    href: string;
    category?: string;
    date?: string;
    tags?: string[];
    author?: string;
}

export function GameCard({ 
    title, 
    description, 
    cover = '/default-cover.jpg',
    href,
    category,
    date,
    tags,
    author
}: GameCardProps) {
    return (
        <div className="group bg-white dark:bg-[#242424] rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
            <Link href={href} className="block">
                {/* 封面图区域 */}
                <div className="relative aspect-[16/9] overflow-hidden">
                    {/* 游戏封面 */}
                    <img 
                        src={cover} 
                        alt={title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    
                    {/* 播放按钮遮罩 */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                            <Icon icon="material-symbols:play-arrow-rounded" className="w-8 h-8" />
                        </div>
                    </div>

                    {/* 分类标签 */}
                    {category && (
                        <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 text-xs font-medium bg-black/50 text-white rounded-md backdrop-blur-sm">
                                {category}
                            </span>
                        </div>
                    )}
                </div>

                {/* 内容区域 */}
                <div className="p-4">
                    {/* 标题 */}
                    <h3 className="text-lg font-bold text-theme-text-primary line-clamp-1 mb-2">
                        {title}
                    </h3>

                    {/* 描述 */}
                    {description && (
                        <p className="text-sm text-theme-text-secondary line-clamp-2 mb-3">
                            {description}
                        </p>
                    )}

                    {/* 标签 */}
                    {tags && tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {tags.map(tag => (
                                <span 
                                    key={tag}
                                    className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-theme-text-secondary rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* 底部信息 */}
                    <div className="flex items-center justify-between text-xs text-theme-text-secondary">
                        {/* 作者 */}
                        {author && (
                            <div className="flex items-center gap-1">
                                <Icon icon="material-symbols:person-outline" className="w-4 h-4" />
                                <span>{author}</span>
                            </div>
                        )}
                        
                        {/* 日期 */}
                        {date && (
                            <div className="flex items-center gap-1">
                                <Icon icon="material-symbols:calendar-today-outline" className="w-4 h-4" />
                                <span>{new Date(date).toISOString().split('T')[0]}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
} 