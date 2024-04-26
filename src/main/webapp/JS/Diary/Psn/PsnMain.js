document.getElementById('addButton').addEventListener('click', function() {
    const viewContainer = document.querySelector('.view-container');
    if (viewContainer.querySelector('.Picture')) {
        return; // 이미 요소가 생성되었으면 추가로 생성하지 않음
    }

    const imageContainer = document.createElement('div');
    imageContainer.className = 'Picture';

    const closeButton = document.createElement('i');
    closeButton.className = 'bi bi-x Picture-close';
    closeButton.addEventListener('click', function() {
        viewContainer.removeChild(imageContainer); // 'x' 버튼을 누르면 요소 삭제
    });

    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.id = 'file';
    imageInput.className = 'image-input';

    const uploadLabel = document.createElement('label');
    uploadLabel.className = 'upload';
    uploadLabel.htmlFor = 'file';
    uploadLabel.insertAdjacentHTML('afterbegin', '<i class="bi bi-journal-plus"></i>');
    uploadLabel.appendChild(imageInput);

    const imagePreview = document.createElement('img');
    imagePreview.className = 'Picture-img';

    const textPreview = document.createElement('div');
    textPreview.className = 'Picture-note';

    imageContainer.appendChild(closeButton);
    imageContainer.appendChild(uploadLabel);
    imageContainer.appendChild(imagePreview);
    imageContainer.appendChild(textPreview);

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });

    viewContainer.appendChild(imageContainer);
});

document.getElementById('textBox').addEventListener('input', function(e) {
    const textPreview = document.querySelector('.Picture-note');
    if (textPreview) {
        textPreview.textContent = e.target.value;
    }
});

$(document).ready(function() {
// 모든 .circle 요소를 가져옵니다.
    const circles = document.querySelectorAll('.circle');

// 각 .circle 요소에 대해 클릭 이벤트 리스너를 추가합니다.
    circles.forEach(circle => {
        circle.addEventListener('click', function () {
            // 클릭된 .circle 요소의 배경색을 가져옵니다.
            const color = getComputedStyle(circle).backgroundColor;

            // 중앙 컨테이너 미리보기의 이미지 div를 가져옵니다.
            const imageContainer = document.querySelector('.Picture');

            // 이미지 div의 배경색을 클릭된 .circle 요소의 배경색으로 설정합니다.
            if ( imageContainer ) {
                imageContainer.style.backgroundColor = color;
            }
        });
    });

});
