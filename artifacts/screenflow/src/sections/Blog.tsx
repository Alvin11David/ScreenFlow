import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
  {
    title: "The Future of Asynchronous Work",
    excerpt: "How teams are replacing live meetings with beautifully recorded walkthroughs, and why it's making everyone more productive.",
    category: "Productivity",
    categoryColor: "text-violet-500 bg-violet-500/10",
    date: "Oct 24, 2024",
    readTime: "6 min",
    image: "/images/blog-1.png",
    gradient: "from-violet-500/20 to-purple-500/5",
  },
  {
    title: "How to Record Perfect Tutorials",
    excerpt: "The exact setup, script structure, and post-processing workflow that 10x creators use to make tutorials people actually finish.",
    category: "Guides",
    categoryColor: "text-cyan-500 bg-cyan-500/10",
    date: "Oct 18, 2024",
    readTime: "8 min",
    image: "/images/blog-2.png",
    gradient: "from-cyan-500/20 to-blue-500/5",
  },
  {
    title: "Introducing ScreenFlow AI Editor",
    excerpt: "We trained a model that removes filler words, silences, and background noise — all locally, without ever touching your cloud.",
    category: "Product",
    categoryColor: "text-amber-500 bg-amber-500/10",
    date: "Oct 12, 2024",
    readTime: "4 min",
    image: "/images/blog-3.png",
    gradient: "from-amber-500/20 to-orange-500/5",
  },
];

export function Blog() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold tracking-widest uppercase text-primary mb-4"
            >
              Blog
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
            >
              Latest from the lab.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground"
            >
              Thoughts on productivity, design, and building great software.
            </motion.p>
          </div>
          <motion.a
            href="/#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            data-testid="link-view-all-articles"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors whitespace-nowrap group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className={`aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-gradient-to-br ${post.gradient} bg-muted border border-border relative`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-overlay opacity-80"
                />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.categoryColor}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime} read
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug text-foreground">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Read more
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
