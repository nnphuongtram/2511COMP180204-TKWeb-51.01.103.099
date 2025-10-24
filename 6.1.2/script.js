$(document).ready(function() {
    const audioSpook = new Audio('assets/audio/spook-sound-effect.mp3'); 
    $('#open-card-btn').on('click', function() {
        audioSpook.play();
        $(this).fadeOut(500, function() {
            $('#invitation-details').addClass('show');
        });
        $('.title').text('THIỆP MỜI CHÍNH THỨC ĐÃ MỞ!');
    });
    const backgroundMusic = $('#background-music')[0]; $('#toggle-music').on('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            $(this).text('🎶 Tắt Nhạc');
        } else {
            backgroundMusic.pause();
            $(this).text('🔇 Mở Nhạc');
        }
    });
    if (backgroundMusic.paused) {
        $('#toggle-music').text('🔇 Mở Nhạc');
    }
});
const productData = {
    robe: {
        title: "Áo Choàng Bóng Đêm",
        desc: "Áo choàng được dệt từ tơ nhện khổng lồ, phù hợp cho mọi nghi lễ gọi hồn. Chất liệu thoáng mát, chống thấm máu.",
        price: "300.000 VNĐ",
        img: "assets/images/product-robe.jpg"
    },
    mask: {
        title: "Mặt Nạ Huyết Quỷ",
        desc: "Mặt nạ da thật, giúp bạn nhập vai ma cà rồng quyền lực nhất. Đảm bảo gây ám ảnh tức thì.",
        price: "150.000 VNĐ",
        img: "assets/images/product-mask.jpg"
    }
};
$(document).ready(function() {
    $('.detail-btn').on('click', function() {
        const productId = $(this).data('id');
        const product = productData[productId];
        if (product) {
            $('#modal-title').text(product.title);
            $('#modal-img').attr('src', product.img);
            $('#modal-desc').text(product.desc);
            $('#modal-price').text(product.price);
            $('#product-modal').removeClass('hidden').hide().fadeIn(400); 
        }
    });
    $('.close-btn, .modal-overlay').on('click', function(e) {
        if ($(e.target).is('.close-btn') || $(e.target).is('.modal-overlay')) {
            $('#product-modal').fadeOut(300, function() {
                $(this).addClass('hidden');
            });
        }
    });
});
function checkTimelineVisibility() {
    const timelineEvents = $('.timeline-event');
    const windowHeight = $(window).height();

    timelineEvents.each(function() {
        const eventTop = $(this).offset().top;
        const eventHeight = $(this).outerHeight();
        if (eventTop < windowHeight * 0.75 + $(window).scrollTop() - eventHeight) {
            $(this).addClass('visible');
        }
    });
}
$(window).on('scroll', checkTimelineVisibility);
checkTimelineVisibility(); 
$('.gallery-image').on('click', function() {
    const fullSrc = $(this).data('full-src') || $(this).attr('src');
    $('#lightbox-img').attr('src', fullSrc);
    $('#gallery-lightbox').removeClass('hidden').hide().fadeIn(400); 
});
$('#gallery-lightbox .close-btn, #gallery-lightbox').on('click', function(e) {
    if ($(e.target).is('.close-btn') || $(e.target).is('#gallery-lightbox')) {
        $('#gallery-lightbox').fadeOut(300, function() {
            $(this).addClass('hidden');
        });
    }
});
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}
function handleValidation(formId) {
    const form = $(formId);
    form.find('input, textarea').on('blur', function() {
        validateField($(this));
    });
    form.on('submit', function(e) {
        e.preventDefault();
        let isValid = true;    
        form.find('input, textarea, select').each(function() {
            if (!validateField($(this))) {
                isValid = false;
            }
        });
        if (isValid) {
            alert('Đăng ký/Liên hệ Ma Quái thành công! Hẹn gặp bạn trong bóng đêm.');
            form[0].reset();
        } else {
            alert('Vui lòng kiểm tra lại các trường bị lỗi. Bóng đêm chưa chấp nhận bạn!');
        }
    });
}
function validateField(field) {
    const value = field.val().trim();
    const type = field.attr('type') || field.prop('tagName').toLowerCase();
    const name = field.attr('name');
    let error = '';
    if (field.prop('required') && value === '') {
        error = 'Trường này là bắt buộc, không được để trống!';
    } 
    else if (type === 'email' && !validateEmail(value)) {
        error = 'Email không hợp lệ. Hãy kiểm tra lại.';
    }
    else if (name === 'name' && value.length < 3) {
         error = 'Tên phải có ít nhất 3 ký tự.';
    }
    const errorMessageElement = field.siblings('.error-message');
    if (error) {
        field.addClass('error');
        if (errorMessageElement.length === 0) {
            field.after(`<div class="error-message">${error}</div>`);
        } else {
            errorMessageElement.text(error);
        }
        return false;
    } else {
        field.removeClass('error');
        errorMessageElement.remove();
        return true;
    }
}
$(document).ready(function() {   
    handleValidation('#register-form'); 
    handleValidation('#contact-form'); 
});