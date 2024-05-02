$('#addButton').on('click', function() {
    const viewContainer = $('.view-container');
    if (viewContainer.find('.Picture').length > 0) {
        return; // 이미 요소가 생성되었으면 추가로 생성하지 않음
    }

    const imageContainer = $('<div>').addClass('Picture');
    let selectedFile = null;

    const closeButton = $('<i>').addClass('bi bi-x Picture-close').on('click', function() {
        imageContainer.remove(); // 'x' 버튼을 누르면 요소 삭제
        selectedFile = null;
    });

    const imageInput = $('<input>').attr({ type: 'file', id: 'file' }).addClass('image-input');

    const uploadLabel = $('<label>').addClass('upload').attr('for', 'file')
        .html('<i class="bi bi-journal-plus"></i>').append(imageInput);

    const imagePreview = $('<img>').addClass('Picture-img');

    const textPreview = $('<div>').addClass('Picture-note');

    imageContainer.append(closeButton, uploadLabel, imagePreview, textPreview);

    imageInput.on('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
            selectedFile = file; // 파일을 전역 변수에 저장
        } else {
            selectedFile = null; // 파일 선택이 취소된 경우 전역 변수를 null 로 설정
        }
    });

    $('#plusButton').on('click', function() {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            $.ajax({
                url: "imageUpload.go",
                type: "POST",
                data: formData,
                processData: false, // 파일 업로드 시 필수
                contentType: false, // 파일 업로드 시 필수
                success: function(data) {
                    alert('이미지 업로드 성공');
                    imageContainer.remove(); // 이미지 업로드 성공 시 요소 삭제
                },
                error: function() {
                    alert('이미지 업로드 실패');
                }
            });
        }
    });

    viewContainer.append(imageContainer);
});

$('#textBox').on('input', function(e) {
    const textPreview = $('.Picture-note');
    if (textPreview.length > 0) {
        textPreview.text(e.target.value);
    }
});

$(document).ready(function() {
    // 모든 .circle 요소를 가져옵니다.
    const circles = $('.circle');

    // 각 .circle 요소에 대해 클릭 이벤트 리스너를 추가합니다.
    circles.on('click', function () {
        // 클릭된 .circle 요소의 배경색을 가져옵니다.
        const color = $(this).css('background-color');

        // 중앙 컨테이너 미리보기의 이미지 div를 가져옵니다.
        const imageContainer = $('.Picture');

        // 이미지 div의 배경색을 클릭된 .circle 요소의 배경색으로 설정합니다.
        if ( imageContainer.length > 0 ) {
            imageContainer.css('background-color', color);
        }
    });
});
