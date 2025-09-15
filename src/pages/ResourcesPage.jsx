import { useEffect, useMemo, useState } from "react";

/** Minimal, clean styles (base) */
const baseStyles = {
  page: { padding: "24px 12px", maxWidth: 1100, margin: "0 auto" },
  title: { fontWeight: 800, fontSize: 36, marginBottom: 8 },
  subtitle: { color: "#555", marginBottom: 24 },
  tabs: {
    wrap: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 16,
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      paddingBottom: 4,
    },
    btn: (active) => ({
      padding: "10px 14px",
      borderRadius: 9999,
      border: `1px solid ${active ? "#4a6cf7" : "#e6e8f0"}`,
      background: active ? "#eef2ff" : "#fff",
      color: active ? "#1a1a1a" : "#333",
      cursor: "pointer",
      fontWeight: 600,
      whiteSpace: "nowrap",
      flex: "0 0 auto",
    }),
  },
  grid: {
    card: {
      border: "1px solid #e6e8f0",
      borderRadius: 12,
      padding: 14,
      background: "#fff",
      minWidth: 0,
    },
    h3: { fontSize: 18, fontWeight: 700, margin: "4px 0 10px" },
    list: { display: "grid", gap: 10 },
    item: {
      border: "1px solid #eef1f6",
      borderRadius: 10,
      padding: 10,
      background: "#fafbff",
    },
    link: {
      fontWeight: 600,
      color: "#1f3af2",
      textDecoration: "none",
      wordBreak: "break-word",
    },
    meta: { fontSize: 12, color: "#5b6473", marginTop: 2 },
  },
  badge: {
    base: {
      display: "inline-block",
      fontSize: 11,
      borderRadius: 999,
      padding: "3px 8px",
      border: "1px solid #e6e8f0",
      color: "#444",
      background: "#fff",
      marginLeft: 8,
    },
  },
};

/** Data model (unchanged) */
const DATA = {
  Web: {
    websites: [
      { title: "MDN Web Docs", url: "https://developer.mozilla.org/" },
      { title: "React Docs", url: "https://react.dev/" },
      { title: "web.dev (Google)", url: "https://web.dev/" },
      { title: "CSS-Tricks", url: "https://css-tricks.com/" },
      { title: "Frontend Masters Guides", url: "https://frontendmasters.com/guides/" },
      { title: "WAI-ARIA (a11y)", url: "https://www.w3.org/WAI/ARIA/apg/" },
      { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
      { title: "Next.js Docs", url: "https://nextjs.org/docs" },
      { title: "Node.js Docs", url: "https://nodejs.org/en/docs" },
      { title: "Can I Use", url: "https://caniuse.com/" },
    ],
    books: [
      { title: "You Don’t Know JS (Yet)", url: "https://github.com/getify/You-Dont-Know-JS" },
      { title: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" },
      { title: "JavaScript: The Definitive Guide (Flanagan)", url: "https://www.oreilly.com/library/view/javascript-the-definitive/9781491952016/" },
      { title: "Secrets of the JavaScript Ninja", url: "https://www.manning.com/books/secrets-of-the-javascript-ninja-second-edition" },
      { title: "CSS Secrets (Lea Verou)", url: "https://www.oreilly.com/library/view/css-secrets/9781449372736/" },
      { title: "Refactoring UI", url: "https://www.refactoringui.com/book/" },
      { title: "Designing Interfaces", url: "https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051954/" },
      { title: "The Pragmatic Programmer", url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/" },
      { title: "Clean Code", url: "https://www.pearson.com/en-us/subject-catalog/p/clean-code-a-handbook-of-agile-software-craftsmanship/P200000003507/9780132350884" },
      { title: "Learning Patterns", url: "https://www.patterns.dev/" },
    ],
    videos: [
      { title: "Web Dev Simplified (Channel)", url: "https://www.youtube.com/@WebDevSimplified" },
      { title: "Traversy Media (Channel)", url: "https://www.youtube.com/@TraversyMedia" },
      { title: "The Net Ninja (Channel)", url: "https://www.youtube.com/@NetNinja" },
      { title: "React Docs Tutorial (Official)", url: "https://react.dev/learn" },
      { title: "CS50 Web (Harvard)", url: "https://cs50.harvard.edu/web/" },
      { title: "freeCodeCamp Responsive Web Course", url: "https://www.youtube.com/watch?v=srvUrASNj0s" },
      { title: "Fireship (Channel)", url: "https://www.youtube.com/@Fireship" },
      { title: "Google I/O web talks (Playlist)", url: "https://www.youtube.com/playlist?list=PLNYkxOF6rcICcHeQY02XLvoGL34rZFWZn" },
      { title: "Next.js Crash Course", url: "https://www.youtube.com/watch?v=1WmNXEVia8I" },
      { title: "TypeScript in 100 Mins", url: "https://www.youtube.com/watch?v=zQnBQ4tB3ZA" },
    ],
  },

  Java: {
    websites: [
      { title: "Oracle Java Tutorials", url: "https://docs.oracle.com/javase/tutorial/" },
      { title: "Baeldung", url: "https://www.baeldung.com/" },
      { title: "Spring Docs", url: "https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/" },
      { title: "JetBrains Guide", url: "https://www.jetbrains.com/guide/java/" },
      { title: "GeeksforGeeks Java", url: "https://www.geeksforgeeks.org/java/" },
      { title: "LeetCode", url: "https://leetcode.com/" },
      { title: "Mkyong", url: "https://mkyong.com/" },
      { title: "Javadoc (API)", url: "https://docs.oracle.com/javase/8/docs/api/" },
      { title: "JUnit5", url: "https://junit.org/junit5/docs/current/user-guide/" },
      { title: "Mockito", url: "https://site.mockito.org/" },
    ],
    books: [
      { title: "Effective Java (Bloch)", url: "https://www.pearson.com/en-us/subject-catalog/p/effective-java/P200000003493/9780134685991" },
      { title: "Head First Java", url: "https://www.oreilly.com/library/view/head-first-java/0596009208/" },
      { title: "Java Concurrency in Practice", url: "https://jcip.net/" },
      { title: "Core Java, Vol I–II", url: "https://horstmann.com/corejava/" },
      { title: "Clean Code", url: "https://www.pearson.com/en-us/subject-catalog/p/clean-code-a-handbook-of-agile-software-craftsmanship/P200000003507/9780132350884" },
      { title: "Spring in Action", url: "https://www.manning.com/books/spring-in-action-sixth-edition" },
      { title: "Test-Driven Development", url: "https://www.pearson.com/en-us/subject-catalog/p/test-driven-development-by-example/P200000003548/9780321146533" },
      { title: "Head First Design Patterns", url: "https://www.oreilly.com/library/view/head-first-design/0596007124/" },
      { title: "Algorithms (Sedgewick/Wayne)", url: "https://algs4.cs.princeton.edu/home/" },
      { title: "Pro Git (for workflow)", url: "https://git-scm.com/book/en/v2" },
    ],
    videos: [
      { title: "freeCodeCamp Java Full Course", url: "https://www.youtube.com/watch?v=GoXwIVyNvX0" },
      { title: "Bro Code Java Course", url: "https://www.youtube.com/watch?v=xk4_1vDrzzo" },
      { title: "Java Brains (Spring)", url: "https://www.youtube.com/@JavaBrainsChannel" },
      { title: "Telusko (Java DS/Algo)", url: "https://www.youtube.com/@Telusko" },
      { title: "Spring Boot Crash Course", url: "https://www.youtube.com/watch?v=9SGDpanrc8U" },
      { title: "JUnit5 Testing", url: "https://www.youtube.com/watch?v=rfb5vVgI2_U" },
      { title: "Microservices with Spring", url: "https://www.youtube.com/watch?v=BnknNTN8icw" },
      { title: "Maven in 1 Hr", url: "https://www.youtube.com/watch?v=ptc0N0TtQFY" },
      { title: "Docker for Java Devs", url: "https://www.youtube.com/watch?v=GGhIhrS4Q6s" },
      { title: "System Design Basics", url: "https://www.youtube.com/watch?v=UzLMhqg3_Wc" },
    ],
  },

  "C#": {
    websites: [
      { title: ".NET Docs", url: "https://learn.microsoft.com/dotnet/" },
      { title: "C# Language Ref", url: "https://learn.microsoft.com/dotnet/csharp/language-reference/" },
      { title: "ASP.NET Core Docs", url: "https://learn.microsoft.com/aspnet/core" },
      { title: "EF Core", url: "https://learn.microsoft.com/ef/core/" },
      { title: "Awesome .NET", url: "https://github.com/quozd/awesome-dotnet" },
      { title: "Dapper", url: "https://github.com/DapperLib/Dapper" },
      { title: "xUnit", url: "https://xunit.net/" },
      { title: "Serilog", url: "https://serilog.net/" },
      { title: "Polly", url: "https://www.thepollyproject.org/" },
      { title: "FluentValidation", url: "https://docs.fluentvalidation.net/en/latest/" },
    ],
    books: [
      { title: "C# in Depth (Skeet)", url: "https://www.manning.com/books/c-sharp-in-depth-fourth-edition" },
      { title: "Pro ASP.NET Core", url: "https://link.springer.com/book/10.1007/978-1-4842-7957-6" },
      { title: "CLR via C#", url: "https://www.pearson.com/en-us/subject-catalog/p/clr-via-c/P200000003476/9780735667457" },
      { title: "Dependency Injection in .NET", url: "https://www.manning.com/books/dependency-injection-in-dot-net" },
      { title: "Clean Architecture", url: "https://www.pearson.com/en-us/subject-catalog/p/clean-architecture-a-craftsman-s-guide-to-software-structure-and-design/P200000003504/9780134494166" },
      { title: "Unit Testing Principles", url: "https://www.manning.com/books/unit-testing" },
      { title: "The Pragmatic Programmer", url: "https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/" },
      { title: "Hands-On Domain-Driven Design", url: "https://www.packtpub.com/product/hands-on-domain-driven-design-with-net-core/9781788834094" },
      { title: "Head First Design Patterns", url: "https://www.oreilly.com/library/view/head-first-design/0596007124/" },
      { title: "Refactoring", url: "https://martinfowler.com/books/refactoring.html" },
    ],
    videos: [
      { title: "dotNET (Official Channel)", url: "https://www.youtube.com/@dotNET" },
      { title: "IAmTimCorey (C#/.NET)", url: "https://www.youtube.com/@IAmTimCorey" },
      { title: "Nick Chapsas", url: "https://www.youtube.com/@nickchapsas" },
      { title: "ASP.NET Core Crash Course", url: "https://www.youtube.com/watch?v=1RZ8ZkHRZ1I" },
      { title: "Entity Framework Core", url: "https://www.youtube.com/watch?v=R9b2JjL9hE8" },
      { title: "C# for Beginners (FreeCodeCamp)", url: "https://www.youtube.com/watch?v=GhQdlIFylQ8" },
      { title: "Design Patterns in C#", url: "https://www.youtube.com/watch?v=v9ejT8FO-7I" },
      { title: "xUnit Testing", url: "https://www.youtube.com/watch?v=2bW4le1q3vE" },
      { title: "Minimal APIs in ASP.NET Core", url: "https://www.youtube.com/watch?v=FbfRZfTV9Z8" },
      { title: "gRPC with .NET", url: "https://www.youtube.com/watch?v=InQS9JQWQWw" },
    ],
  },

  C: {
    websites: [
      { title: "ISO C (cppreference C section)", url: "https://en.cppreference.com/w/c" },
      { title: "C FAQ (c-faq.com mirror)", url: "https://c-faq.com/" },
      { title: "Beej’s Guide to C", url: "https://beej.us/guide/bgc/" },
      { title: "GNU C Manual", url: "https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html" },
      { title: "TutorialsPoint C", url: "https://www.tutorialspoint.com/cprogramming/index.htm" },
      { title: "Learn C (Learn-C.org)", url: "https://www.learn-c.org/" },
      { title: "Build Systems (CMake)", url: "https://cmake.org/cmake/help/latest/" },
      { title: "Valgrind", url: "https://valgrind.org/" },
      { title: "GCC Manual", url: "https://gcc.gnu.org/onlinedocs/" },
      { title: "Makefile Guide", url: "https://www.gnu.org/software/make/manual/make.html" },
    ],
    books: [
      { title: "The C Programming Language (K&R)", url: "https://www.pearson.com/en-us/subject-catalog/p/c-programming-language/P200000003485/9780131103627" },
      { title: "C Programming: A Modern Approach", url: "https://www.pearson.com/en-us/subject-catalog/p/c-programming-a-modern-approach/P200000007458/9780393979503" },
      { title: "Expert C Programming: Deep C Secrets", url: "https://www.pearson.com/en-us/subject-catalog/p/expert-c-programming-deep-c-secrets/P200000003486/9780131774293" },
      { title: "21st Century C", url: "https://www.oreilly.com/library/view/21st-century-c/9781491904428/" },
      { title: "Head First C", url: "https://www.oreilly.com/library/view/head-first-c/9781449335649/" },
      { title: "Algorithms in C (Sedgewick)", url: "https://www.pearson.com/en-us/subject-catalog/p/algorithms-in-c-parts-1-4-fundamentals-data-structures-sorting-searching/P200000004157/9780201314526" },
      { title: "Understanding and Using C Pointers", url: "https://www.oreilly.com/library/view/understanding-and-using/9781449344535/" },
      { title: "C Interfaces and Implementations", url: "https://www.pearson.com/en-us/subject-catalog/p/c-interfaces-and-implementations-techniques-for-creating-reusable-software/P200000003482/9780201498417" },
      { title: "The Linux Programming Interface", url: "https://man7.org/tlpi/" },
      { title: "Programming in C (Kochen/Stephen Kochan)", url: "https://www.pearson.com/en-us/subject-catalog/p/programming-in-c/P200000003487/9780321776419" },
    ],
    videos: [
      { title: "CS50 (Intro C)", url: "https://cs50.harvard.edu/x/2024/" },
      { title: "FreeCodeCamp C Course", url: "https://www.youtube.com/watch?v=KJgsSFOSQv0" },
      { title: "Pointers Deep Dive", url: "https://www.youtube.com/watch?v=2ybLD6_2gKM" },
      { title: "GCC & Make Crash", url: "https://www.youtube.com/watch?v=V7xZrVbXbQE" },
      { title: "Valgrind Basics", url: "https://www.youtube.com/watch?v=Hq8F3q5ly2o" },
      { title: "Linked Lists in C", url: "https://www.youtube.com/watch?v=6wXZ_m3SbEs" },
      { title: "Structs & Memory Layout", url: "https://www.youtube.com/watch?v=_8-ht2AKyH4" },
      { title: "Socket Programming (Beej-inspired)", url: "https://www.youtube.com/watch?v=LtXEMwSG5-8" },
      { title: "CMake Intro", url: "https://www.youtube.com/watch?v=6o78lJQ0K9w" },
      { title: "Unit Testing in C (Unity)", url: "https://www.youtube.com/watch?v=l3hWlJ5RtmY" },
    ],
  },

  DSA: {
    websites: [
      { title: "CLRS Companion Site", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/" },
      { title: "CP-Algorithms", url: "https://cp-algorithms.com/" },
      { title: "VisuAlgo", url: "https://visualgo.net/" },
      { title: "USACO Guide", url: "https://usaco.guide/" },
      { title: "LeetCode", url: "https://leetcode.com/" },
      { title: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-structures/" },
      { title: "InterviewBit", url: "https://www.interviewbit.com/" },
      { title: "Big-O Cheat Sheet", url: "https://www.bigocheatsheet.com/" },
      { title: "AlgoExpert IO (ref)", url: "https://www.algoexpert.io/" },
      { title: "Princeton Algorithms", url: "https://algs4.cs.princeton.edu/home/" },
    ],
    books: [
      { title: "Introduction to Algorithms (CLRS)", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/" },
      { title: "Algorithms (Sedgewick/Wayne)", url: "https://algs4.cs.princeton.edu/home/" },
      { title: "Grokking Algorithms", url: "https://www.manning.com/books/grokking-algorithms" },
      { title: "Elements of Programming Interviews", url: "https://elementsofprogramminginterviews.com/" },
      { title: "Cracking the Coding Interview", url: "https://www.careercup.com/book" },
      { title: "Competitive Programming 4", url: "https://cpbook.net/" },
      { title: "Algorithm Design (Kleinberg/Tardos)", url: "https://www.pearson.com/en-us/subject-catalog/p/algorithm-design/P200000004062/9780321295354" },
      { title: "The Algorithm Design Manual", url: "https://www.springer.com/gp/book/9781849967204" },
      { title: "Programming Pearls", url: "https://www.pearson.com/en-us/subject-catalog/p/programming-pearls/P200000003552/9780201657883" },
      { title: "Pearls of Functional Algorithm Design", url: "https://www.cambridge.org/core/books/pearls-of-functional-algorithm-design/9EAC5F44C034EE97F02B5E3EC7D251B7" },
    ],
    videos: [
      { title: "MIT 6.006 (Intro to Algorithms)", url: "https://www.youtube.com/playlist?list=PLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb" },
      { title: "Abdul Bari DSA", url: "https://www.youtube.com/playlist?list=PLfqMhTWNBTe3LtFWcvWPWcxVQvZkda99Q" },
      { title: "CS50 Data Structures", url: "https://cs50.harvard.edu/x/2024/" },
      { title: "Tushar Roy", url: "https://www.youtube.com/@tusharroy2525" },
      { title: "freeCodeCamp Algorithms", url: "https://www.youtube.com/watch?v=8hly31xKli0" },
      { title: "Errichto Competitive Programming", url: "https://www.youtube.com/@Errichto" },
      { title: "Code N Code (CP)", url: "https://www.youtube.com/@CodeNCode" },
      { title: "Stanford Algorithms (Tim Roughgarden)", url: "https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRTbCNr9rb7v4R8GqzZ" },
      { title: "NeetCode Roadmap", url: "https://neetcode.io/roadmap" },
      { title: "Back to Back SWE", url: "https://www.youtube.com/@backtobackswe" },
    ],
  },

  Python: {
    websites: [
      { title: "Python Docs", url: "https://docs.python.org/3/" },
      { title: "Real Python", url: "https://realpython.com/" },
      { title: "Hitchhiker’s Guide", url: "https://docs.python-guide.org/" },
      { title: "Flask Docs", url: "https://flask.palletsprojects.com/" },
      { title: "Django Docs", url: "https://docs.djangoproject.com/en/stable/" },
      { title: "Pandas Docs", url: "https://pandas.pydata.org/docs/" },
      { title: "FastAPI Docs", url: "https://fastapi.tiangolo.com/" },
      { title: "NumPy", url: "https://numpy.org/doc/" },
      { title: "PyPI", url: "https://pypi.org/" },
      { title: "pytest", url: "https://docs.pytest.org/en/stable/" },
    ],
    books: [
      { title: "Python Crash Course", url: "https://nostarch.com/pythoncrashcourse2e" },
      { title: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/" },
      { title: "Fluent Python", url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/" },
      { title: "Effective Python", url: "https://effectivepython.com/" },
      { title: "Serious Python", url: "https://www.oreilly.com/library/view/serious-python/9781491929568/" },
      { title: "Two Scoops of Django", url: "https://www.twoscoopspress.com/products/two-scoops-of-django-3-0" },
      { title: "High Performance Python", url: "https://www.oreilly.com/library/view/high-performance-python/9781492055013/" },
      { title: "Black Hat Python", url: "https://nostarch.com/blackhatpython2e" },
      { title: "Think Python", url: "https://greenteapress.com/wp/think-python-2e/" },
      { title: "Introduction to Machine Learning with Python", url: "https://www.oreilly.com/library/view/introduction-to-machine/9781449369880/" },
    ],
    videos: [
      { title: "Corey Schafer (Channel)", url: "https://www.youtube.com/@coreyms" },
      { title: "freeCodeCamp 12-hr Python", url: "https://www.youtube.com/watch?v=rfscVS0vtbw" },
      { title: "FastAPI Full Course", url: "https://www.youtube.com/watch?v=0sOvCWFmrtA" },
      { title: "Django Crash", url: "https://www.youtube.com/watch?v=UmljXZIypDc" },
      { title: "Pandas Tutorial (Data)", url: "https://www.youtube.com/watch?v=vmEHCJofslg" },
      { title: "Testing with pytest", url: "https://www.youtube.com/watch?v=etosV2IWBF0" },
      { title: "OOP in Python (Telusko)", url: "https://www.youtube.com/watch?v=JeznW_7DlB0" },
      { title: "Asyncio Basics", url: "https://www.youtube.com/watch?v=tSLDcRkgTsY" },
      { title: "NumPy Fundamentals", url: "https://www.youtube.com/watch?v=QUT1VHiLmmI" },
      { title: "Data Structures in Python", url: "https://www.youtube.com/watch?v=R-HLU9Fl5ug" },
    ],
  },

  "CCNA / Networking": {
    websites: [
      { title: "Cisco Learning Network", url: "https://learningnetwork.cisco.com/" },
      { title: "Cisco Packet Tracer", url: "https://www.netacad.com/courses/packet-tracer" },
      { title: "GNS3", url: "https://www.gns3.com/" },
      { title: "RFC Editor (Standards)", url: "https://www.rfc-editor.org/" },
      { title: "Subnetting Practice", url: "https://subnetting.org/" },
      { title: "NetworkLessons", url: "https://networklessons.com/" },
      { title: "Cisco Press", url: "https://www.ciscopress.com/" },
      { title: "Wireshark Docs", url: "https://www.wireshark.org/docs/" },
      { title: "Juniper Day One", url: "https://www.juniper.net/documentation/en_US/day-one-books/" },
      { title: "NetDevOps Live", url: "https://developer.cisco.com/netdevops/live/" },
    ],
    books: [
      { title: "CCNA 200-301 Official Cert Guide Library", url: "https://www.ciscopress.com/store/ccna-200-301-official-cert-guide-library-9781587206805" },
      { title: "Routing TCP/IP Vol 1–2", url: "https://www.ciscopress.com/store/routing-tcp-ip-volume-i-9781587052020" },
      { title: "TCP/IP Illustrated (Stevens)", url: "https://www.pearson.com/en-us/subject-catalog/p/tcpip-illustrated-volume-1-the-protocols/P200000003630/9780132808188" },
      { title: "Network Warrior", url: "https://www.oreilly.com/library/view/network-warrior-2nd/9781449307974/" },
      { title: "Wireshark Network Analysis", url: "https://www.wiresharkbook.com/" },
      { title: "IPv6 Essentials", url: "https://www.oreilly.com/library/view/ipv6-essentials-3rd/9781449335298/" },
      { title: "The Illustrated Network", url: "https://www.elsevier.com/books/the-illustrated-network/goff/978-0-12-374541-5" },
      { title: "MPLS Fundamentals", url: "https://www.ciscopress.com/store/mpls-fundamentals-9781587051979" },
      { title: "Troubleshooting IP Routing Protocols", url: "https://www.ciscopress.com/store/troubleshooting-ip-routing-protocols-9781587050477" },
      { title: "CCNA Portable Command Guide", url: "https://www.ciscopress.com/store/ccna-200-301-portable-command-guide-9780135937823" },
    ],
    videos: [
      { title: "Jeremy’s IT Lab CCNA", url: "https://www.youtube.com/playlist?list=PLD0D-6g0x_1ffbvB9xq6x1muY0Zyo0tF1" },
      { title: "David Bombal (Channel)", url: "https://www.youtube.com/@davidbombal" },
      { title: "Cisco Networking Academy", url: "https://www.netacad.com/courses/networking" },
      { title: "Subnetting Masterclass", url: "https://www.youtube.com/watch?v=Kf8wKZ5nZxg" },
      { title: "Wireshark Basics", url: "https://www.youtube.com/watch?v=7nprq2u5Gaw" },
      { title: "Packet Tracer Labs", url: "https://www.youtube.com/watch?v=5W3rFf8LhDc" },
      { title: "BGP Intro", url: "https://www.youtube.com/watch?v=X8bdZ8nZ6Zs" },
      { title: "OSPF Deep Dive", url: "https://www.youtube.com/watch?v=1sAnr1Q0nYI" },
      { title: "Spanning Tree Explained", url: "https://www.youtube.com/watch?v=0mi5b2Vt8xY" },
      { title: "NAT & PAT", url: "https://www.youtube.com/watch?v=FvZMs6KSmrA" },
    ],
  },

  "Cyber Security": {
    websites: [
      { title: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten/" },
      { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" },
      { title: "Hack The Box Academy", url: "https://academy.hackthebox.com/" },
      { title: "NIST 800-53", url: "https://csrc.nist.gov/publications/sp800" },
      { title: "MITRE ATT&CK", url: "https://attack.mitre.org/" },
      { title: "Kali Tools", url: "https://www.kali.org/tools/" },
      { title: "Security Headers", url: "https://securityheaders.com/" },
      { title: "CISA Alerts", url: "https://www.cisa.gov/news-events/alerts" },
      { title: "Have I Been Pwned", url: "https://haveibeenpwned.com/" },
      { title: "TryHackMe", url: "https://tryhackme.com/" },
    ],
    books: [
      { title: "The Web Application Hacker’s Handbook", url: "https://www.wiley.com/en-us/The+Web+Application+Hacker%27s+Handbook%3A+Finding+and+Exploiting+Security+Flaws%2C+2nd+Edition-p-9781118026472" },
      { title: "Hacking: The Art of Exploitation", url: "https://www.nostarch.com/hacking2.htm" },
      { title: "Practical Malware Analysis", url: "https://nostarch.com/malware" },
      { title: "Black Hat Python", url: "https://nostarch.com/blackhatpython2e" },
      { title: "Serious Cryptography", url: "https://www.nostarch.com/seriouscrypto" },
      { title: "Applied Cryptography", url: "https://www.wiley.com/en-us/Applied+Cryptography%3A+Protocols%2C+Algorithms%2C+and+Source+Code+in+C%2C+20th+Anniversary+Edition-p-9781119096726" },
      { title: "Blue Team Field Manual", url: "https://www.btfm-book.com/" },
      { title: "Red Team Field Manual", url: "https://www.rtfm-book.com/" },
      { title: "The Tangled Web", url: "https://www.oreilly.com/library/view/the-tangled-web/9781593273880/" },
      { title: "The Hacker Playbook 3", url: "https://www.amazon.com/Hacker-Playbook-Practical-Penetration-Testing/dp/1980901759" },
    ],
    videos: [
      { title: "OWASP Top 10 Crash", url: "https://www.youtube.com/watch?v=i9x8F5PHJwE" },
      { title: "PortSwigger Labs Walkthroughs", url: "https://www.youtube.com/@PortSwigger" },
      { title: "HackerSploit (Channel)", url: "https://www.youtube.com/@HackerSploit" },
      { title: "Network Pentesting Basics", url: "https://www.youtube.com/watch?v=3Kq1MIfTWCE" },
      { title: "TryHackMe Beginner Path", url: "https://tryhackme.com/path/outline/beginner" },
      { title: "Malware Analysis Intro", url: "https://www.youtube.com/watch?v=U0xQeZP4oBk" },
      { title: "Burp Suite Fundamentals", url: "https://www.youtube.com/watch?v=vHkQmGdVbV4" },
      { title: "Secure Headers", url: "https://www.youtube.com/watch?v=1VwSxGkpYWM" },
      { title: "Threat Modeling", url: "https://www.youtube.com/watch?v=G2_8cQ2bX8Q" },
      { title: "TLS/HTTPS Explained", url: "https://www.youtube.com/watch?v=SJJmoDZ3il8" },
    ],
  },

  "ML / AI": {
    websites: [
      { title: "scikit-learn", url: "https://scikit-learn.org/stable/" },
      { title: "TensorFlow", url: "https://www.tensorflow.org/" },
      { title: "PyTorch", url: "https://pytorch.org/" },
      { title: "Hugging Face", url: "https://huggingface.co/" },
      { title: "Kaggle", url: "https://www.kaggle.com/" },
      { title: "fast.ai", url: "https://www.fast.ai/" },
      { title: "Papers with Code", url: "https://paperswithcode.com/" },
      { title: "Google AI Blog", url: "https://ai.googleblog.com/" },
      { title: "OpenAI Cookbook", url: "https://cookbook.openai.com/" },
      { title: "Distill (archives)", url: "https://distill.pub/" },
    ],
    books: [
      { title: "Hands-On ML with Scikit-Learn, Keras & TF (Géron)", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/" },
      { title: "Deep Learning (Goodfellow, Bengio, Courville)", url: "https://www.deeplearningbook.org/" },
      { title: "Pattern Recognition and ML (Bishop)", url: "https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/" },
      { title: "Dive into Deep Learning", url: "https://d2l.ai/" },
      { title: "Probabilistic ML (Murphy)", url: "https://probml.github.io/pml-book/" },
      { title: "Grokking Machine Learning", url: "https://www.manning.com/books/grokking-machine-learning" },
      { title: "Practical Deep Learning for Coders (fast.ai)", url: "https://course.fast.ai/Resources/book.html" },
      { title: "Bayesian Reasoning and Machine Learning", url: "http://web4.cs.ucl.ac.uk/staff/D.Barber/textbook/031013.pdf" },
      { title: "Natural Language Processing with Transformers", url: "https://www.oreilly.com/library/view/natural-language-processing/9781098136789/" },
      { title: "Reinforcement Learning (Sutton & Barto)", url: "http://incompleteideas.net/book/the-book.html" },
    ],
    videos: [
      { title: "Andrew Ng ML Course", url: "https://www.coursera.org/learn/machine-learning" },
      { title: "fast.ai Practical DL", url: "https://course.fast.ai/" },
      { title: "3Blue1Brown — Neural Nets", url: "https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab" },
      { title: "StatQuest (ML Intuition)", url: "https://www.youtube.com/@statquest" },
      { title: "Hugging Face Course", url: "https://huggingface.co/learn" },
      { title: "PyTorch Official Tutorials", url: "https://pytorch.org/tutorials/" },
      { title: "TensorFlow in Practice", url: "https://www.coursera.org/specializations/tensorflow-in-practice" },
      { title: "Kaggle Micro-courses", url: "https://www.kaggle.com/learn" },
      { title: "DeepMind x UCL RL Lectures", url: "https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ" },
      { title: "Stanford CS231n", url: "https://www.youtube.com/playlist?list=PLC1qU-LWwrF64f4QKQT-Vg5Wr4qEE1Zxk" },
    ],
  },
};

/* ---------- UI helpers ---------- */
const CATEGORIES = Object.keys(DATA);

function Section({ title, items }) {
  return (
    <div style={baseStyles.grid.card}>
      <h3 style={baseStyles.grid.h3}>{title}</h3>
      <div style={baseStyles.grid.list}>
        {items.map(({ title, url, note }, i) => (
          <div key={i} style={baseStyles.grid.item}>
            <a href={url} target="_blank" rel="noreferrer" style={baseStyles.grid.link}>
              {title}
            </a>
            {note ? <div style={baseStyles.grid.meta}>{note}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Small hook to track viewport width for responsive inline styles */
function useViewport() {
  const [w, setW] = useState(
    typeof window === "undefined" ? 1200 : window.innerWidth
  );
  useEffect(() => {
    const onR = () => setW(window.innerWidth);
    window.addEventListener("resize", onR, { passive: true });
    return () => window.removeEventListener("resize", onR);
  }, []);
  return w;
}

export default function ResourcesPage() {
  const [tab, setTab] = useState(CATEGORIES[0]);
  const pack = useMemo(() => DATA[tab], [tab]);

  const width = useViewport();

  // Responsive knobs
  const cols = width < 640 ? 1 : width < 992 ? 2 : 3;
  const pagePad = width < 480 ? "18px 10px" : width < 768 ? "22px 12px" : "24px 12px";
  const titleSize = width < 480 ? 24 : width < 768 ? 30 : 36;

  // Computed container grid style
  const gridWrapStyle = useMemo(
    () => ({
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: 16,
      alignItems: "start",
    }),
    [cols]
  );

  return (
    <section style={{ ...baseStyles.page, padding: pagePad }}>
      <h1 style={{ ...baseStyles.title, fontSize: titleSize }}>Developer Resources</h1>
      <p style={baseStyles.subtitle}>
        Curated, evergreen links for learning and mastery. Books, courses, and docs — hand-picked for quality.
      </p>

      <div style={baseStyles.tabs.wrap}>
        {CATEGORIES.map((c) => (
          <button key={c} style={baseStyles.tabs.btn(c === tab)} onClick={() => setTab(c)}>
            {c}
          </button>
        ))}
      </div>

      <div style={gridWrapStyle}>
        <Section title="Top Websites / Docs" items={pack.websites} />
        <Section title="Books" items={pack.books} />
        <Section title="Videos / Courses" items={pack.videos} />
      </div>

      <div
        style={{
          marginTop: 24,
          padding: 14,
          border: "1px solid #e6e8f0",
          borderRadius: 12,
          background: "#f9fafc",
          fontSize: width < 480 ? 13 : 14,
        }}
      >
        Pro tip: Save this page. Pick one track, then follow this loop — read → build → ask → refactor → repeat.
      </div>
    </section>
  );
}
