import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Blog() {
  const posts = [
    {
      title: "The Future of Asynchronous Work",
      category: "Productivity",
      date: "Oct 24, 2024",
      image: "/images/blog-1.png",
      link: "#"
    },
    {
      title: "How to Record Perfect Tutorials",
      category: "Guides",
      date: "Oct 18, 2024",
      image: "/images/blog-2.png",
      link: "#"
    },
    {
      title: "Introducing ScreenFlow AI Editor",
      category: "Product",
      date: "Oct 12, 2024",
      image: "/images/blog-3.png",
      link: "#"
    }
  ];

  return (
    <section className="py-32 bg-white/[0.02] border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Latest from the lab.</h2>
            <p className="text-xl text-muted-foreground">Thoughts on productivity, design, and building great software.</p>
          </div>
          <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2 rounded-full px-6">
            View all articles <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-white/5 border border-white/10">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center gap-4 text-sm mb-3">
                <span className="text-primary font-medium">{post.category}</span>
                <span className="text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}