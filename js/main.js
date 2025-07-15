// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果 - 移除背景色变化
    const header = document.getElementById('header');
    
    // 移除原来的滚动效果，保持header透明
    window.addEventListener('scroll', function() {
        // 不再修改header的背景色
        header.style.backgroundColor = 'transparent';
    });
    
    // 平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 获取所有部分
    const sections = document.querySelectorAll('section[id^="section"]');
    const navLinks = document.querySelectorAll('.side-nav-list a');
    const startLink = document.querySelector('.start-text a');
    
    // 检查和更新导航链接的激活状态
    function checkActiveSection() {
        let current = '';
        let scrollProgress = 0;
        
        // 计算页面滚动进度
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        scrollProgress = (scrollTop / (docHeight - winHeight)) * 100;
        
        // 更新侧边指示线高度 - 直接使用CSS变量，不需要选择伪元素
        document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        // 更新导航链接的激活状态
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.parentElement.classList.add('active');
            }
        });
        
        // 处理Start链接的激活状态
        if (current === 'section1') {
            startLink.classList.add('active');
        } else {
            startLink.classList.remove('active');
        }
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', checkActiveSection);
    
    // 页面加载时检查一次
    checkActiveSection();
}); 