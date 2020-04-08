
<img src="spiderJS/spider.png" alt="" width="300"/>

# SpiderJS
A simple web crawler that looks for instances of a given word (search engine imitation)

The program creates a spider (multithreading on progress), that searches for a given word throughout a page. It queues the links, in the page and crawls them until the queue is empty. It requests webpages in the queue. It can continue queuing pages
until the given tree depth, by the user.

**v1.0.1** Spider can also crawl in local files (relative-absolute independent).
**v1.0.2** External data is accumulated in a single json file (neater)
