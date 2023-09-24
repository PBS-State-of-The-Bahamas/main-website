
import Link from 'next/link';

export const getMainLinks = (currentUrl: string) => {
  return renderNavigationLinks(buildMainLinks(currentUrl))
}

export const getChapterPages = () => {
  return renderNavigationLinks({
    'Beta Beta Lambda': '/chapter/BBL',
    'Delta Epsilon Sigma': '/chapter/DES',
    'Omicron Pi Sigma': '/chapter/OPS'
  })
}

const renderNavigationLinks = (navigation: {[key: string]: string;}) => {
  const pageList = []
  if (!navigation) return pageList;
  for (const [key, value] of Object.entries(navigation)) {
    pageList.push(<Link href={value}>{key}</Link>)
  }
  return pageList
}

const buildMainLinks = (url: string) => {
  if (url && url.toLowerCase().includes('/chapter')) {
    const chapterUrl = url.toLowerCase().split('/chapter');
    const chapterAbv = chapterUrl[1].split('/')[1];
    return {
      'Lineage': `/chapter/${chapterAbv}/lineage`,
      'Line History': `/chapter/${chapterAbv}/line`
    }
  }
  return {
    'History': '/history',
    'Current Board': '/board',
    'Life Members': '/life-members'
  }  
}


