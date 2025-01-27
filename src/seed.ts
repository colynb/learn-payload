import fs from 'fs'
import { xmlToJson } from './lib/xml-parse'
const xmlContent = fs.readFileSync('src/data/content.xml', 'utf8')
const content = await xmlToJson(xmlContent)
const postMetaMapper = (meta: PostMeta) => {
  //fave_property_images
  if (meta['wp:meta_key'] === 'fave_property_images') {
    return {
      ['meta_key']: meta['wp:meta_key'],
      ['meta_value']: attachments.find((a) => a.postId === meta['wp:meta_value']),
    }
  }
  return {
    ['meta_key']: meta['wp:meta_key'],
    ['meta_value']: meta['wp:meta_value'],
  }
}
const attachmentMapper = (item: Item) => {
  return {
    url: item['wp:attachment_url'],
    postId: item['wp:post_id'],
  }
}
const mapper = (item: Item) => {
  return {
    title: item.title,
    link: item.link,
    description: item.description,
    pubDate: item.pubDate,
    creator: item['dc:creator'],
    content: item['content:encoded'],
    excerpt: item['excerpt:encoded'],
    postId: item['wp:post_id'],
    postDate: item['wp:post_date'],
    postDateGmt: item['wp:post_date_gmt'],
    commentStatus: item['wp:comment_status'],
    pingStatus: item['wp:ping_status'],
    postName: item['wp:post_name'],
    status: item['wp:status'],
    postParent: item['wp:post_parent'],
    menuOrder: item['wp:menu_order'],
    postType: item['wp:post_type'],
    postPassword: item['wp:post_password'],
    isSticky: item['wp:is_sticky'],
    attachmentUrl: item['wp:attachment_url'],
    postMeta: item['wp:postmeta'].map(postMetaMapper),
  }
}
interface WordPressExport {
  title: string
  link: string
  description: string
  pubDate: string
  language: string
  'wp:wxr_version': string
  'wp:base_site_url': string
  'wp:base_blog_url': string
  'wp:author': Author[]
  'wp:category': Category[]
  item: Item[]
}

interface Author {
  'wp:author_id': string
  'wp:author_login': string
  'wp:author_email': string
  'wp:author_display_name': string
  'wp:author_first_name': string
  'wp:author_last_name': string
}

interface Category {
  'wp:term_id': string
  'wp:category_nicename': string
  'wp:category_parent': string
  'wp:cat_name': string
}

interface Item {
  title: string
  link: string
  pubDate: string
  'dc:creator': string
  guid: {
    _: string
    $: {
      isPermaLink: string
    }
  }
  description: string
  'content:encoded': string
  'excerpt:encoded': string
  'wp:post_id': string
  'wp:post_date': string
  'wp:post_date_gmt': string
  'wp:comment_status': string
  'wp:ping_status': string
  'wp:post_name': string
  'wp:status': string
  'wp:post_parent': string
  'wp:menu_order': string
  'wp:post_type': string
  'wp:post_password': string
  'wp:is_sticky': string
  'wp:attachment_url': string
  'wp:postmeta': PostMeta[]
}

interface PostMeta {
  [key: string]: string
  'wp:meta_key': string
  'wp:meta_value': string
}

// Example usage:
const data: WordPressExport = content.rss.channel

const postTypes = new Set(data.item.map((item) => item['wp:post_type']))

const attachments = data.item
  .filter((i) => i['wp:post_type'] === 'attachment')
  .map(attachmentMapper)
const properties = data.item.filter((i) => i['wp:post_type'] === 'property').map(mapper)
const posts = data.item.filter((i) => i['wp:post_type'] === 'post').map(mapper)
const pages = data.item.filter((i) => i['wp:post_type'] === 'page').map(mapper)

fs.writeFileSync('src/data/content.json', JSON.stringify(data, null, 2))
fs.writeFileSync('src/data/properties.json', JSON.stringify(properties, null, 2))
fs.writeFileSync('src/data/posts.json', JSON.stringify(posts, null, 2))
fs.writeFileSync('src/data/pages.json', JSON.stringify(pages, null, 2))
fs.writeFileSync('src/data/attachments.json', JSON.stringify(attachments, null, 2))
fs.writeFileSync('src/data/post-types.json', JSON.stringify(postTypes, null, 2))
