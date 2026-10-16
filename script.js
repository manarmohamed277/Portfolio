document.addEventListener('DOMContentLoaded', () => {
    // 1. إدارة نافذة ملء الشاشة (Fullscreen Lightbox)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-img');

    // فتح الصورة بالحجم الكامل عند الضغط على غلاف الصورة
    galleryItems.forEach(img => {
        img.closest('.project-img-wrapper').addEventListener('click', () => {
            const fullSrc = img.getAttribute('src');
            const title = img.getAttribute('data-title') || '';
            const desc = img.getAttribute('data-desc') || '';

            lightboxImg.src = fullSrc;
            lightboxCaption.innerHTML = `<strong>${title}</strong><br><span style="color:#8b949e; font-size:0.9rem;">${desc}</span>`;
            
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // منع التمرير أثناء العرض
        });
    });

    // دالة إغلاق النافذة
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // إعادة التمرير
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    };

    // إغلاق عند الضغط على زر (X)
    closeBtn.addEventListener('click', closeLightbox);

    // إغلاق عند الضغط على الخلفية الداكنة خارج الصورة
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
            closeLightbox();
        }
    });

    // إغلاق عند الضغط على مفتاح Escape (ESC) من الكيبورد
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // 2. قائمة الهاتف (Mobile Toggle)
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // إغلاق القائمة تلقائياً عند النقر على أي رابط بداخلها
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
});