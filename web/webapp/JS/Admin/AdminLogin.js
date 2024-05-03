
function checkId() {

    const IdInput = document.getElementById('adminId');
    const PwdInput = document.getElementById('adminPwd');
    const Id = IdInput.value;
    const Pwd = PwdInput.value;

    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    const reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;


    if(Id.length == 0){
        alert("아이디를 입력해주세요.");
        document.getElementById('adminId').focus();
        return false;

    }else if (!email_regex.test(Id)) {
        alert("올바르지 않은 이메일 형식입니다.");
        document.getElementById('adminId').focus();
        return false;

    }else if(false === reg.test(Pwd)) {
        alert('비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.');
        return false;

    }else if(/(\w)\1\1\1/.test(Pwd)){
        alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
        return false;

    }else if(Pwd.search(Id) > -1){
        alert("비밀번호에 아이디가 포함되었습니다.");
        return false;

    }else if(Pwd.search(/\s/) != -1){
        alert("비밀번호는 공백 없이 입력해주세요.");
        return false;

    }else if(korean.test(Pwd)){
        alert("비밀번호에 한글을 사용 할 수 없습니다.");
        return false;

    }else {
        document.getElementById('adminId').value = Id;
        document.getElementById('adminPwd').value = Pwd;
        return true;
    }
}

$('aside .sidebar a').click(function() {
    const text = $(this).find('h3').text();
    if (text === '로그아웃') {
        if (confirm('로그아웃 하시겠습니까?')) {
            location.href = 'admin_logout.go';
        } else {
            return false;
        }
    }
});
