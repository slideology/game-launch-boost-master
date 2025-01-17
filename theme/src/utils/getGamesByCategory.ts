import type { Folder, MdxFile, PageMapItem } from 'nextra'
import type { FrontMatter } from '../types'
import themeConfig from '../../../theme.config'

function isMdxFile(item: PageMapItem): item is MdxFile {
    return 'frontMatter' in item && 'name' in item;
}

function isFolder(item: PageMapItem): item is Folder {
    return 'children' in item && 'name' in item;
}

// 获取指定目录下的所有游戏
export function getGamesByCategory(pageMap: PageMapItem[], category: string, locale: string = 'en') {
    const games: FrontMatter[] = [];
    const i18nEnabled = themeConfig.features?.i18n;

    // 递归遍历页面树
    const traverse = (items: PageMapItem[]) => {
        items.forEach(item => {
            if (isFolder(item)) {
                traverse(item.children);
            } else if (isMdxFile(item) && item.name !== 'index') {
                const route = item.route || '';
                // 根据是否启用国际化来检查路径
                const shouldInclude = i18nEnabled
                    ? route.startsWith(`/${locale}/${category}/`)
                    : route.startsWith(`/${category}/`);
                
                if (shouldInclude) {
                    const { frontMatter = {} } = item;
                    games.push({
                        ...frontMatter,
                        slug: route
                    });
                }
            }
        });
    };

    traverse(pageMap);
    return games;
}

// 获取当前目录下的所有游戏
export function getGamesInCurrentDirectory(pageMap: PageMapItem[], currentPath: string, locale: string = 'en') {
    const games: FrontMatter[] = [];
    const i18nEnabled = themeConfig.features?.i18n;
    
    // 标准化路径处理
    const cleanPath = currentPath.replace(/\/index$/, '');
    const pathWithoutLocale = i18nEnabled 
        ? cleanPath.replace(new RegExp(`^/${locale}`), '')
        : cleanPath;
    const targetPath = i18nEnabled
        ? `/${locale}${pathWithoutLocale}`.replace(/\/$/, '')
        : pathWithoutLocale.replace(/\/$/, '');

    // console.log('=== getGamesInCurrentDirectory Debug ===');
    // console.log('Input Path:', currentPath);
    // console.log('Clean Path:', cleanPath);
    // console.log('Path Without Locale:', pathWithoutLocale);
    // console.log('Target Path:', targetPath);
    // console.log('I18n Enabled:', i18nEnabled);

    // 递归遍历页面树
    const traverse = (items: PageMapItem[]) => {
        items.forEach(item => {
            if (isFolder(item)) {
                const folderPath = (item.route || '').replace(/\/$/, '');
                
                // console.log('Checking folder:', {
                //     name: item.name,
                //     path: folderPath,
                //     targetPath: targetPath,
                //     matches: folderPath === targetPath
                // });

                // 检查是否是目标目录
                if (folderPath === targetPath) {
                    // console.log('Found matching folder:', folderPath);
                    // 处理当前目录下的文件
                    item.children.forEach(child => {
                        if (isMdxFile(child) && child.name !== 'index') {
                            const { frontMatter = {} } = child;
                            console.log('Adding game:', {
                                title: frontMatter.title,
                                slug: child.route
                            });
                            games.push({
                                ...frontMatter,
                                slug: child.route
                            });
                        }
                    });
                }
                
                traverse(item.children);
            }
        });
    };

    traverse(pageMap);
    // console.log('Found games:', games.length);
    // console.log('Games:', games);
    // console.log('=== End Debug ===');
    
    return games;
}