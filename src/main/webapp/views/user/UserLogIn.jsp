<%--
  Created by IntelliJ IDEA.
  User: patrick
  Date: 24. 4. 9.
  Time: 오후 3:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<h2>로그인 테스트 입니다</h2>

<div class="login-container">
    <form action="user_login_action.go" method="post">
        <table class="login-tbl">
            <tr>
                <th>유저 아이디</th>
                <td><input type="text" id="user_id" name="user_id" /></td>
            </tr>
            <tr>
                <th>유저 패스워드</th>
                <td><input type="password" id="user_pwd" name="user_pwd" /></td>
            </tr>
            <tr>
                <td colspan="2" class="login-btn-area">
                    <input type="submit" value="로그인" />
                </td>
            </tr>
        </table>
    </form>
</div>

</body>
</html>