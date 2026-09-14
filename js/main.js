// 모바일 메뉴 토글 + 현재 페이지 nav 활성화 + 섹션 스크롤 트래킹
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });

  const pageLinks = document.querySelectorAll(".page-nav a");
  if (!pageLinks.length) return;

  const sections = Array.from(pageLinks)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = (id) => {
    pageLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + id)
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
});
