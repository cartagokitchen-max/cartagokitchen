// ===== التنقل =====
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        document.querySelectorAll('.nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ===== القائمة المتنقلة =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.flexDirection = 'column';
        nav.style.background = 'var(--white)';
        nav.style.padding = '20px';
        nav.style.boxShadow = 'var(--shadow)';
    });
}

// ===== تبويبات المنتجات =====
const tabBtns = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // إزالة النشاط من جميع الأزرار
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== نافذة تفاصيل المنتج =====
function showProductDetails(title, description) {
    const modal = document.getElementById('productModal');
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = description;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// إغلاق النافذة بالنقر خارجها
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// إغلاق النافذة بمفتاح Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== نموذج التواصل =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // إنشاء رسالة واتساب
    const message = `مرحباً، لدي طلب من موقع Cartago Kitchen:%0A%0A` +
        `👤 الاسم: ${data.name}%0A` +
        `🏢 الشركة: ${data.company || 'غير محدد'}%0A` +
        `📧 البريد: ${data.email}%0A` +
        `📱 الهاتف: ${data.phone}%0A` +
        `📦 نوع الطلب: ${data.order_type}%0A` +
        `🛒 المنتجات: ${data.products || 'غير محدد'}%0A` +
        `📝 ملاحظات: ${data.message || 'لا توجد'}`;

    // فتح واتساب
    window.open(`https://wa.me/21600000000?text=${message}`, '_blank');

    // إظهار رسالة نجاح
    showNotification('تم إرسال طلبك! سيتم توجيهك لواتساب...');

    // إعادة تعيين النموذج
    contactForm.reset();
});

// ===== إشعار =====
function showNotification(text) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--primary);
        color: white;
        padding: 15px 30px;
        border-radius: 30px;
        font-weight: 600;
        z-index: 3000;
        animation: slideDown 0.3s ease;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    notification.textContent = text;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== تأثيرات الظهور عند التمرير =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// تطبيق الظهور على العناصر
document.querySelectorAll('.feature-card, .product-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== Header شفاف عند التمرير =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(255,255,255,0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--white)';
        header.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
});

// ===== CSS Animations للـ JS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    @keyframes slideUp {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);

console.log('🫒 Cartago Kitchen - الموقع جاهز!');
