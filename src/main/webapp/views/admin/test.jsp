<%@ page contentType="text/html;charset=UTF-8" %>
<!Doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Insert title here</title>
    <script type="text/javascript">


        function checkId() {

            var IdInput = document.getElementById('adminId');
            var Id = IdInput.value;

            var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

            if (Id.length == 0) {
                alert("아이디를 입력해주세요.");
                document.getElementById('adminId').focus();
                return false;

            } else if (!email_regex.test(Id)) {
                alert("올바르지 않은 아이디 형식입니다.");
                document.getElementById('adminId').focus();
                return false;

            } else if (IdInput.innerHTML == "") {
                alert("아이디 중복검사를 해주세요.");
                return false;

            } else if (IdInput.innerHTML == "이미 존재하는 아이디입니다.") {
                alert("아이디가 중복되었습니다.");
                document.getElementById('adminId').focus();
                return false;

            } else {
                document.getElementById('adminId').value = Id;
                return true;
            }

        }

        function checkPwd() {

            var PwdInput = document.getElementById('adminPwd');
            var Pwd = PwdInput.value;
            var PwdInputCheck = document.getElementById('adminPwdCheck');
            var PwdCheck = PwdInputCheck.value;
            var NameInput = document.getElementById('adminName');
            var Name = NameInput.value;
            var PhoneInput = document.getElementById('adminPhone');
            var Phone = PhoneInput.value;

            var reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            var hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

            if (false === reg.test(Pwd)) {
                alert('비밀번호는 8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.');
                return false;

            } else if (/(\w)\1\1\1/.test(Pwd)) {
                alert('같은 문자를 4번 이상 사용하실 수 없습니다.');
                return false;

            } else if (Pwd.search(Id) > -1) {
                alert("비밀번호에 아이디가 포함되었습니다.");
                return false;

            } else if (Pwd.search(/\s/) != -1) {
                alert("비밀번호는 공백 없이 입력해주세요.");
                return false;

            } else if (hangulcheck.test(Pwd)) {
                alert("비밀번호에 한글을 사용 할 수 없습니다.");
                return false;

            } else if(PwdCheck == ""){
                alert("비밀번호를 확인해주세요.");
                document.getElementById('adminPwdCheck').focus();
                return false;

            } else if (Pwd != PwdCheck){
                alert("비밀번호를 다시 확인해주세요.");
                document.getElementById('adminPwd').focus();
                return false;

            } else if (Name.length == 0) {
                alert("이름을 입력하세요.");
                document.getElementById('adminName').focus();
                return true;

            } else if (Phone.length == 0) {
                alert("연락처를 입력하세요.");
                document.getElementById('adminPhone').focus();
                return true;

            } else {
                document.getElementById('adminPwd').value = Pwd;
                document.getElementById('adminPwdCheck').value = PwdCheck;
                document.getElementById('adminName').value = Name;
                document.getElementById('adminPhone').value = Phone;
                return true;
            }
        }
    </script>
</head>
<body>
<div align="center">
    <form action="admin_input_ok.go">

        <table border="1" width="400">
            <tr>
                <th>아이디</th>
                <td>
                    <input id="adminId" name="admin_id" maxlength="50" placeholder="abc@naver.com" required>
                    <input type="submit" value="중복확인" onclick="return ">
                </td>
            </tr>
            <tr>
                <th>비밀번호</th>
                <td><input type="password" id="adminPwd" name="admin_pwd" placeholder="숫자, 대문자, 소문자, 특수문자 포함 8자 이상"></td>
            </tr>
            <tr>
                <th>비밀번호 확인</th>
                <td><input type="password" id="adminPwdCheck" name="admin_pwdCheck" placeholder="비밀번호확인"></td>
            </tr>
            <tr>
                <th>이름</th>
                <td><input id="adminName" name="admin_name" placeholder="홍길동"></td>
            </tr>
            <tr>
                <th>연락처</th>
                <td><input id="adminPhone" name="admin_phone" placeholder="-없이 입력"></td>
            </tr>
            <tr>
                <th>주소</th>
                <td><input id="adminAddr" name="admin_addr" placeholder="주소 입력"></td>
            </tr>
            <tr>
                <th>생년월일</th>
                <td><input id="adminBirth" name="admin_birth" placeholder="2002-04-02"></td>
            </tr>
            <tr>
                <th>등급</th>
                <td><input id="adminGrade" name="admin_grade" placeholder="1"></td>
            </tr>
            <tr>
                <th>팀</th>
                <td><input id="adminTeam" name="admin_team" placeholder="팀 입력"></td>
            </tr>

        </table>
        <br> <br>

        <input type="submit" onclick="return " value="회원가입">&nbsp;&nbsp;&nbsp;
        <input type="reset" value="다시작성">
    </form>

</div>

</body>
</html>
