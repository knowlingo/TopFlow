import Link from "next/link"
import { Calendar, Clock, Tag } from "lucide-react"
import type { BlogPost } from "@/lib/blog/blog-data"

interface BlogListViewProps {
  posts: BlogPost[]
}

export function BlogListView({ posts }: BlogListViewProps) {
  return (
    <div className="space-y-0">
      {posts.map((post, index) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className={`block group hover:bg-muted/50 transition-colors ${index !== posts.length - 1 ? "border-b border-border" : ""}`}
        >
          <div className="py-6 px-4">
            <div className="flex items-start gap-6">
              {/* Category Badge */}
              <div className="flex-shrink-0 w-24">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.publishedAt}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
