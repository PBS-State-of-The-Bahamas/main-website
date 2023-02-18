
import Link from 'next/link';
export const mainNav = {
    'main': {
      'History': '/history',
      'Current Board': '/board',
      'Life Members': '/life-members'
    },
    'chapter': {
      'Lineage': '/lineage'
    }
}
export const subNav = {
    'Beta Beta Lambda': '/chapter/BBL',
    'Delta Epsilon Sigma': '/chapter/DES',
    'Omicron Pi Sigma': '/chapter/OPS'
}

export const renderNavigationLinks = (navigation) => {
  const pageList = []
  for (const [key, value] of Object.entries(navigation)) {
    pageList.push(<Link href={value}>{key}</Link>)
  }
  return pageList
}